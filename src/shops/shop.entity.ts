import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'float', nullable: false, default: 0 })
  balance: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  comission: number;
}
