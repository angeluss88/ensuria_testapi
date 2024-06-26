import { Payment } from 'src/payments/payments.entity';
import { Shop } from '../shop.entity';

export class ShopReturnDto {
  id: number;
  name: string;
  balance: number;
  comission: number;
  payments: Payment[];
  holded: number;

  static transform(shop: Shop): ShopReturnDto {
    return {
      id: shop.id,
      name: shop.name,
      balance: shop.balance,
      holded: shop.holded,
      comission: shop.comission,
      payments: shop.payments ?? [],
    };
  }
}
