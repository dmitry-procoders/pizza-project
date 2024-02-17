import {
  IsNumber,
  IsBoolean,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class ReplacePizzaTypeDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  value: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  image: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
