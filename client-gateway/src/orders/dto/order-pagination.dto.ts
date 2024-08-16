import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { OrderStatusList, OrderStatus } from "../enum/order.enum";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class OrderPaginationDto extends PaginationDto {

  @ApiPropertyOptional({
    description: 'Estado de la orden',
    example: 'PENDING',
    default: 'PENDING'
  })
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Valid status are ${OrderStatusList}`
  })
  status: OrderStatus;
}