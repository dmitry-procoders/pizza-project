import {
  IsOptional,
  IsNumber,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  address: string;

  @IsArray()
  @IsNotEmpty()
  items: CreateOrderItemDto[];
}
