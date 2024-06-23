import { Shop } from '../shop.entity';

export class ShopReturnDto {
  id: number;
  name: string;
  balance: number;
  comission: number;

  static transform(shop: Shop): ShopReturnDto {
    return {
      id: shop.id,
      name: shop.name,
      balance: shop.balance,
      comission: shop.comission,
    };
  }
}
