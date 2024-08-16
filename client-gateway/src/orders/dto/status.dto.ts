import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class StatusDto {

  @ApiPropertyOptional({
    description: 'Estado de la orden',
    example: 'PENDING',
    default: 'PENDING'
  })
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Valid status are ${OrderStatusList}`
  })
  status: OrderStatus
}