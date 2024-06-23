import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comissions')
export class Comissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false, default: 0 })
  comission_A: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  comission_B: number;

  @Column({ type: 'integer', nullable: false, default: 0 })
  comission_D: number;
}
