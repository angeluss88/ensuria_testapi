import { Payment, PaymentStatus } from '../payments.entity';

export class PaymentReturnDto {
  id?: number;
  amount: number;
  status: PaymentStatus;
  shopId: number;

  static transform(payment: Payment): PaymentReturnDto {
    return {
      id: payment.id,
      amount: payment.amount,
      status: payment.status,
      shopId: payment.shop.id,
    };
  }
}
