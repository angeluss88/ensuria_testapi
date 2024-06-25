import { IsNumber, IsOptional } from 'class-validator';
import { ShopCreateDto } from './shop-create.dto';
import { PartialType } from '@nestjs/swagger';

export class ShopUpdateDto extends PartialType(ShopCreateDto) {
  @IsNumber()
  @IsOptional()
  balance?: number;
}
