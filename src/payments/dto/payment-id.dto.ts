import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaymentIdDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
