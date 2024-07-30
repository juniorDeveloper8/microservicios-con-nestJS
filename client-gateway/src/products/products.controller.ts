import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {

  constructor(

    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,

  ) { }


  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_product' }, paginationDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.productsClient.send({ cmd: 'find_one_product' }, { id })
  }


  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return 'esta funcion elimina el producto' + id;
  }

  @Patch(':id')
  updateProduct(

    @Param('id') id: string,
    @Body() body: any

  ) {
    return 'esta funcion actualiza el  producto' + id;
  }

}
