import { Controller, Get, Post } from '@nestjs/common';
import { ComissionsService } from './comissions.service';
import { Comissions } from './comissions.entity';
import { UpdateComissionsDto } from './updateComossions.dto';

@Controller('comissions')
export class ComissionsController {
  constructor(private readonly appService: ComissionsService) {}

  @Get()
  async getComissions(): Promise<Comissions> {
    return await this.appService.getComissions();
  }

  @Post()
  async setComissions(data: UpdateComissionsDto): Promise<void> {
    await this.appService.updateComissions(data);
  }
}
