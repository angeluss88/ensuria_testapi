import { Module } from '@nestjs/common';
import { ComissionsController } from './comissions.controller';
import { ComissionsService } from './comissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comissions } from './comissions.entity';

@Module({
  controllers: [ComissionsController],
  providers: [ComissionsService],
  imports: [TypeOrmModule.forFeature([Comissions])],
  exports: [ComissionsService],
})
export class ComissionsModule {}
