import { Module, forwardRef } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Payment } from './payments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopsModule } from 'src/shops/shops.module';
import { ComissionsModule } from 'src/comissions/comissions.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [
    TypeOrmModule.forFeature([Payment]),
    forwardRef(() => ShopsModule),
    ComissionsModule,
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
