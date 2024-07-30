import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [

    ClientsModule.register([

      { 
        name: 'PRODUCT_SERVICE', 
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroServiceHost,
          port: envs.productsMicroServicePort
        } 
      },

    ]),
  ]
})
export class ProductsModule {}
