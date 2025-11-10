import { Optional } from '@nestjs/common';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsString()
  @Optional()
  description?: string;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsUUID(4)
  user_id: string;

  @IsNumber()
  price: number;
}

export class UpdateInventoryDto {
  @IsString()
  @Optional()
  name: string;

  @IsString()
  @Optional()
  category: string;

  @IsString()
  @Optional()
  description?: string;

  @IsNumber()
  @Optional()
  quantity: number;

  @IsNumber()
  @Optional()
  price: number;
}
