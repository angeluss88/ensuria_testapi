import { Shop } from '../shop.entity';

export class ShopCreateReturnDto {
  id: number;

  static transform(shop: Shop): ShopCreateReturnDto {
    return {
      id: shop.id,
    };
  }
}
