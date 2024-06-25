import { Shop } from 'src/shops/shop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum PaymentStatus {
  pending = 'pending',
  handled = 'handled',
  done = 'done',
  paid = 'paid',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  amount: number;

  @Column({
    type: 'simple-enum',
    enum: PaymentStatus,
    nullable: false,
    default: PaymentStatus.pending,
  })
  status: PaymentStatus;

  @Column({ type: 'boolean', nullable: false, default: false })
  wasHandled: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  wasDone: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  wasPaid: boolean;

  @ManyToOne(() => Shop, (shop: Shop) => shop.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shop_id', referencedColumnName: 'id' })
  shop: Shop;
}
