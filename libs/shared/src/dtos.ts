import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateNested } from 'class-validator';

export class CreateProductDto {
  @IsString() @IsNotEmpty()
  name!: string;

  @IsNumber() @IsPositive()
  price!: number;

  @IsInt() @Min(0)
  stock!: number;
}

export class SaleItemDto {
  @IsString() @IsNotEmpty()
  productId!: string;

  @IsInt() @IsPositive()
  qty!: number;
}

export class CreateSaleDto {
  @IsArray() @ValidateNested({ each: true }) @Type(() => SaleItemDto)
  items!: SaleItemDto[];
}