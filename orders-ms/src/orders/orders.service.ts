import { BadRequestException, HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { changeOrderStatusDto, OrderPaginationDto, UpdateOrderDto } from './dto';
import { date } from 'joi';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly looger = new Logger('OrdersServices');


  async onModuleInit() {
    await this.$connect();

    this.looger.log('Base de datos Conectada 👻');
  }

  create(createOrderDto: CreateOrderDto) {
    return this.order.create({
      data: createOrderDto
    });
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {
    const totalPages = await this.order.count({
      where: {
        status: orderPaginationDto.status
      }
    });

    const currenPage = orderPaginationDto.page;
    const prePage = orderPaginationDto.limit;

    return {
      date: await this.order.findMany({
        skip: (currenPage - 1) * prePage,
        take: prePage,
        where: {
          status: orderPaginationDto.status
        }
      }),
      meta: {
        total: totalPages,
        page: currenPage,
        lastPage: Math.ceil(totalPages / prePage)
      }
    }
  }

  async findOne(id: string) {

    const order = await this.order.findFirst({
      where: { id }
    });

    if (!order) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: ` Orden con id ${id} no encontrada`
      });
    }

    return order;
  }



  async chageStatus(changeOrderStatus: changeOrderStatusDto) {
    const { id, status } = changeOrderStatus;

    const order = await this.findOne(id);

    if (order.status == status) {
      return order;
    }

    return this.order.update({
      where: { id },
      data: { status: status }
    });
  }

}
