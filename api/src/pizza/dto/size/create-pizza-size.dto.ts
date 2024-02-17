import {
  IsOptional,
  IsNumber,
  IsBoolean,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreatePizzaSizeDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  value: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
