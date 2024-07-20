import { IsString, IsNumber, Min } from "class-validator";

export class CreateProductDto {

  @IsString()
  public name:string;

  @IsNumber({
    maxDecimalPlaces:4
  })
  @Min(0)
  public price: number;
}
