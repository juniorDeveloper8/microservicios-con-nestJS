import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Put, Patch, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDERS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {

  constructor(

    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,

  ) { }

  @Post()
  @ApiOperation({ summary: 'Agrega una nueva orden de compra' })
  @ApiResponse({ status: 201, description: 'El codigo de respusta exitoso.' })
  @ApiResponse({ status: 400, description: 'datos o input invalido' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna las ordenes de compra hechas y sus estados' })
  @ApiResponse({
    status: 200, description: 'El codigo de respusta exitoso.',
    schema: {
      example: {
        page: 1,
        limit: 5,
        status: 'DELIVERED'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'datos o input invalido' })
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', orderPaginationDto);
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Retorna una orden' })
  @ApiResponse({
    status: 200, description: 'El codigo de respusta exitoso.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'datos o input invalido' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {

    try {
      const order = await firstValueFrom(

        this.ordersClient.send('findOneOrder', { id })
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }

  }

  @Get(':status')
  @ApiOperation({ summary: 'Retorna ordenes que coincidan con el statos' })
  @ApiResponse({ status: 200, description: 'El codigo de respusta exitoso.' })
  @ApiResponse({ status: 400, description: 'datos o input invalido' })
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {


    try {
      return this.ordersClient.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      });

    } catch (error) {
      throw new RpcException(error);
    }

  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza el estado de la orden' })
  @ApiResponse({
    status: 200,
    description: 'El estado de la orden se actualizó exitosamente.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        status: 'DELIVERED'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Datos o input inválido.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Los datos proporcionados son inválidos.',
        error: 'Bad Request'
      }
    }
  })
  async changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() StatusDto: StatusDto,
  ) {

    try {
      return this.ordersClient.send('changeOrderStatus', { id, status: StatusDto.status })
    } catch (error) {
      throw new RpcException(error);
    }
  }

}
