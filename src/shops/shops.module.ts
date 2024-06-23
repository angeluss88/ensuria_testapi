import { Module } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { Shop } from './shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  imports: [TypeOrmModule.forFeature([Shop])],
  exports: [ShopsService],
})
export class ShopsModule {}
