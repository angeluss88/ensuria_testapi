import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ComissionsService } from './comissions.service';
import { Comissions } from './comissions.entity';
import { UpdateComissionsDto } from './dto/updateComissions.dto';

@Controller('comissions')
export class ComissionsController {
  constructor(private readonly comissisonsService: ComissionsService) {}

  @Get()
  async getComissions(): Promise<Comissions> {
    return await this.comissisonsService.getComissions();
  }

  @Patch()
  async setComissions(@Body() data: UpdateComissionsDto): Promise<void> {
    await this.comissisonsService.updateComissions(data);
  }
}
