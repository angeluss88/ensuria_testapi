import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Shop } from './shop.entity';
import { ShopsService } from './shops.service';
import { ShopCreateDto } from './dto/shop-create.dto';
import { ShopIdDto } from './dto/shop-id.dto';
import { ShopReturnDto } from './dto/shop-return.dto';
import { ShopCreateReturnDto } from './dto/shop-create-return.dto';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get('/')
  async getShops(): Promise<ShopReturnDto[]> {
    const shops: Shop[] = await this.shopsService.getShops();

    return shops.map((shop) => ShopReturnDto.transform(shop));
  }

  @Get('/:id')
  async getShop(@Param() { id }: ShopIdDto): Promise<ShopReturnDto> {
    const shop: Shop | null = await this.shopsService.getShop(id);

    return shop ? ShopReturnDto.transform(shop) : ({} as ShopReturnDto);
  }

  @Post('/')
  async setComissions(
    @Body() data: ShopCreateDto,
  ): Promise<ShopCreateReturnDto> {
    const shop: Shop = await this.shopsService.createShop(data);

    return ShopCreateReturnDto.transform(shop);
  }

  @Get('/:id/payout')
  async shopPayout(@Param() { id }: ShopIdDto): Promise<void> {
    this.shopsService.doPayout(id);
  }
}
