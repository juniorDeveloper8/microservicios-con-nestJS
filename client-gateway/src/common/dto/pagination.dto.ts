import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsPositive, IsOptional } from "class-validator";

export class PaginationDto {

  @ApiPropertyOptional({
    description: 'Número de página para la paginación',
    example: 1,
    default: 1,
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;
  
  @ApiPropertyOptional({
    description: 'Número de elementos por página',
    example: 5,
    default: 5,
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 5;
}