import { IsEnum, IsString } from 'class-validator';
import { PaymentStatus } from '../payments.entity';

export class PaymentStatusUpdateDto {
  @IsString()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
