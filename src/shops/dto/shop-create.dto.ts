import { IsNumber, IsString } from 'class-validator';

export class ShopCreateDto {
  @IsString()
  name: string;

  @IsNumber()
  comission: number;
}
