import { IsNumber, IsString } from 'class-validator';

export class PaymentCreateDto {
  @IsString()
  amount: number;

  @IsNumber()
  shopId: number;
}
