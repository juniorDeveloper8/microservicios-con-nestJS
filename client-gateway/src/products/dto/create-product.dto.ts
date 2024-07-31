import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNumber, Min, IsNotEmpty } from "class-validator";

export class CreateProductDto {

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Camiseta',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 19.99,
    minimum: 0,
    type: Number,
  })
  @IsNumber({
    maxDecimalPlaces: 4
  })
  @Min(0)
  @Type(() => Number)
  public price: number;
}
