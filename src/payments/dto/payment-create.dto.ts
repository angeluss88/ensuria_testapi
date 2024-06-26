import { IsNumber } from 'class-validator';

export class PaymentCreateDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  shopId: number;
}
