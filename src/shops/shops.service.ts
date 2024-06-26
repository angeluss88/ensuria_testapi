import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './shop.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { ShopCreateDto } from './dto/shop-create.dto';
import { ShopUpdateDto } from './dto/shop-update.dto';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopsRepository: Repository<Shop>,
    @Inject(forwardRef(() => PaymentsService))
    private readonly paymentsService: PaymentsService,
  ) {}

  async getShops(): Promise<Shop[]> {
    return this.shopsRepository.find({ where: { id: Not(IsNull()) } });
  }

  async getShop(id: number): Promise<Shop> {
    return this.shopsRepository.findOneOrFail({
      where: { id },
      relations: { payments: true },
    });
  }

  async createShop(data: ShopCreateDto): Promise<Shop> {
    return this.shopsRepository.save(
      this.shopsRepository.create({
        name: data.name,
        balance: 0,
        comission: data.comission,
      }),
    );
  }

  async updateShop(id: number, data: ShopUpdateDto): Promise<Shop> {
    const shop = await this.getShop(id);
    return this.shopsRepository.save(Object.assign(shop, data));
  }

  async doPayout(id: number) {
    const shop = await this.getShop(id);
    this.paymentsService.payToShop(shop);
  }
}
