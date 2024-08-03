import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

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

  async findAll(paginationDto: PaginationDto) {

    const statuses = [OrderStatus.PENDING, OrderStatus.DELIVERED, OrderStatus.CANCELLED];

    const { page, limit } = paginationDto;

    const totalPage = await this.order.count({ where: { status: { in: statuses } } });

    const lastPage = Math.ceil(totalPage / limit);

    return {
      data: await this.order.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          status: { in: statuses }
        }
      }),
      meta: {
        total: totalPage,
        page: page,
        lastPage: lastPage,
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

}
