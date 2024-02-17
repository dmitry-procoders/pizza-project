import {
  IsNumber,
  IsBoolean,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class ReplacePizzaSizeDto {
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
  @IsBoolean()
  status: boolean;
}
