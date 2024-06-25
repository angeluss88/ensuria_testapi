import { Payment } from 'src/payments/payments.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @Column({ type: 'float', nullable: false, default: 0 })
  holded: number;

  @OneToMany(() => Payment, (payment) => payment.shop)
  payments?: Payment[];
}
