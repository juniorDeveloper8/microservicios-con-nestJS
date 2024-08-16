
import { IsNumber, IsPositive, IsEnum, IsOptional, IsBoolean } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {

  @ApiProperty({
    description: 'total del monto',
    example: '100',
    minimum: 0,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  totalAmount: number;
  
  @ApiProperty({
    description: 'numero de articulos adquiridos',
    example: '2',
    minimum: 0,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  totalItems: number;

  @ApiProperty({
    description: 'estado de la order opcional',
    example: 'PENDING',
  })
  @IsEnum(OrderStatusList, {
    message: `Posebel valores de estado ${OrderStatusList}`
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING
  
  @IsBoolean() 
  @IsOptional()
  paid?: boolean = false;

}
