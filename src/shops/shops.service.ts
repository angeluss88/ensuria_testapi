import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './shop.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { ShopCreateDto } from './dto/shop-create.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopsRepository: Repository<Shop>,
  ) {}

  getShops(): Promise<Shop[]> {
    return this.shopsRepository.find({ where: { id: Not(IsNull()) } });
  }

  getShop(id: number): Promise<Shop | null> {
    return this.shopsRepository.findOne({ where: { id } });
  }

  createShop(data: ShopCreateDto): Promise<Shop> {
    return this.shopsRepository.save(
      this.shopsRepository.create({
        name: data.name,
        balance: 0,
        comission: data.comission,
      }),
    );
  }

  async doPayout(id: number): Promise<void> {
    console.log(`Do Payout for shop #${id}`);
  }
}
