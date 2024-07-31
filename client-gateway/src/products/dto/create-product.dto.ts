import { Type } from "class-transformer";
import { IsString, IsNumber, Min, IsNotEmpty } from "class-validator";

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber({
    maxDecimalPlaces: 4
  })
  @Min(0)
  @Type(() => Number)
  public price: number;
}
