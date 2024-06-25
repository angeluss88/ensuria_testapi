import { Module, forwardRef } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { Shop } from './shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  imports: [TypeOrmModule.forFeature([Shop]), forwardRef(() => PaymentsModule)],
  exports: [ShopsService],
})
export class ShopsModule {}
