import {
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsObject,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsObject()
  @IsNotEmpty()
  pizzaSize: { id: number };

  @IsObject()
  @IsNotEmpty()
  pizzaType: { id: number };
}
