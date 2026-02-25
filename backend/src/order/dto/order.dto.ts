import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export class CreateOrderResDto {
  total: number;
  items: CreateOrderDto[];
}
