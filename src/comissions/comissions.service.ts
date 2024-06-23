import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comissions } from './comissions.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class ComissionsService {
  constructor(
    @InjectRepository(Comissions)
    private readonly comissisonsRepository: Repository<Comissions>,
  ) {}

  async getComissions(): Promise<Comissions> {
    let comissions = await this.comissisonsRepository.findOne({
      where: {
        id: Not(IsNull()),
      },
      select: ['comission_A', 'comission_B', 'comission_D'],
    });

    if (!comissions) {
      comissions = this.comissisonsRepository.create({
        comission_A: 0,
        comission_B: 0,
        comission_D: 0,
      });

      await this.comissisonsRepository.save(comissions);
    }

    return (
      comissions ??
      ({ comission_A: 0, comission_B: 0, comission_D: 0 } as Comissions)
    );
  }

  async updateComissions(data: Comissions): Promise<void> {
    const comissions = await this.comissisonsRepository.findOne({});

    if (comissions) {
      this.comissisonsRepository.save(Object.assign(comissions, data));
    } else {
      await this.comissisonsRepository.save(
        this.comissisonsRepository.create({
          comission_A: data.comission_A ?? 0,
          comission_B: data.comission_B ?? 0,
          comission_D: data.comission_D ?? 0,
        }),
      );
    }
  }
}
