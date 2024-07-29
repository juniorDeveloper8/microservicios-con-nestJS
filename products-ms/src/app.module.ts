import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './errors/http-exception.filter';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  }],
})
export class AppModule { }
