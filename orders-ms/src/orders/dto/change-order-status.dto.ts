import { IsEnum, IsUUID } from "class-validator";
import { OrderStatusList } from "../enum/order.enum";
import { OrderStatus } from "@prisma/client";

export class changeOrderStatusDto{

  @IsUUID(4)
  id:string;

  @IsEnum(OrderStatusList,{
    message: `Valid status arre ${OrderStatusList}`
  })
  status: OrderStatus
}