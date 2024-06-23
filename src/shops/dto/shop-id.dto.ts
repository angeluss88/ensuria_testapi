import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ShopIdDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
