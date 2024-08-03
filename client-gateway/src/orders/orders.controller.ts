import { Controller, Get, Post, Body,  Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDERS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';

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
  @ApiResponse({ status: 200, description: 'El codigo de respusta exitoso.' })
  @ApiResponse({ status: 400, description: 'datos o input invalido' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersClient.send('findAllOrders', paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna una orden' })
  @ApiResponse({ status: 200, description: 'El codigo de respusta exitoso.' })
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

}
