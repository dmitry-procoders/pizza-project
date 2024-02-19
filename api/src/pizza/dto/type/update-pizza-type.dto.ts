import {
  IsOptional,
  IsNumber,
  IsBoolean,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdatePizzaTypeDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  value: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  image: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
