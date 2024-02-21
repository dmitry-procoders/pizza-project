import {
  IsOptional,
  IsNumber,
  IsString,
  MaxLength,
  IsNotEmpty,
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
  @IsString()
  @MaxLength(255)
  address: string;
}
