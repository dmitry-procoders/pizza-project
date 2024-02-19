import {
  IsOptional,
  IsNumber,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsObject,
  IsArray,
} from 'class-validator';

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
  @IsObject()
  pizzaSize: {
    id: number;
  };

  @IsNotEmpty()
  @IsObject()
  pizzaType: {
    id: number;
  };

  @IsOptional()
  @IsArray()
  pizzaExtraComponents;
}
