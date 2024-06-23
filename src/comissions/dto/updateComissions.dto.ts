import { IsNumber, IsOptional } from 'class-validator';

export class UpdateComissionsDto {
  @IsOptional()
  @IsNumber()
  comission_A?: number;

  @IsOptional()
  @IsNumber()
  comission_B?: number;

  @IsOptional()
  @IsNumber()
  comission_D?: number;
}
