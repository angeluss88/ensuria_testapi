import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Payment, PaymentStatus } from './payments.entity';
import { PaymentCreateDto } from './dto/payment-create.dto';
import { PaymentStatusUpdateDto } from './dto/payment-status-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Not, Repository } from 'typeorm';
import { Shop } from 'src/shops/shop.entity';
import { ShopsService } from 'src/shops/shops.service';
import { ComissionsService } from 'src/comissions/comissions.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @Inject(forwardRef(() => ShopsService))
    private readonly shopsService: ShopsService,
    private readonly comissionssService: ComissionsService,
  ) {}

  async getPayments(): Promise<Payment[]> {
    return this.paymentsRepository.find({
      where: { id: Not(IsNull()) },
      relations: { shop: true },
    });
  }
  async getPayment(id: number): Promise<Payment | null> {
    return this.paymentsRepository.findOne({
      where: { id },
      relations: { shop: true },
    });
  }

  async createPayment(data: PaymentCreateDto): Promise<Payment> {
    const shop: Shop = await this.shopsService.getShop(data.shopId);
    return this.paymentsRepository.save(
      this.paymentsRepository.create({
        amount: data.amount,
        status: PaymentStatus.pending,
        shop: shop,
      }),
    );
  }

  async updatePaymentStatus(
    id: number,
    data: PaymentStatusUpdateDto,
  ): Promise<Payment> {
    const payment: Payment | null = await this.paymentsRepository.findOneOrFail(
      {
        where: { id },
        relations: { shop: true },
      },
    );

    if (!payment) {
      return payment;
    }

    if (data.status === PaymentStatus.handled && !payment.wasHandled) {
      await this.handlePayment(payment.amount, payment.shop);
      payment.wasHandled = true;
    }

    if (data.status === PaymentStatus.done && !payment.wasDone) {
      await this.unholdComissionD(payment.amount, payment.shop);
      payment.wasDone = true;
    }

    if (data.status === PaymentStatus.paid && !payment.wasPaid) {
      await this.payToShop(payment.shop);
      payment.wasPaid = true;
    }

    return this.paymentsRepository.save(Object.assign(payment, data));
  }

  async handlePayment(amount: number, shop: Shop): Promise<void> {
    const { comission_A, comission_B, comission_D } =
      await this.comissionssService.getComissions();

    const paymentAmount =
      amount - comission_A - amount * comission_B - amount * shop.comission;
    if (paymentAmount > 0) {
      shop.balance += paymentAmount;
      shop.holded += amount * comission_D;
      this.shopsService.updateShop(shop.id, shop);
    }
  }

  async unholdComissionD(amount: number, shop: Shop): Promise<void> {
    const { comission_D } = await this.comissionssService.getComissions();

    const amountToUnhold = amount * comission_D;

    shop.holded =
      shop.holded > amountToUnhold ? shop.holded - amountToUnhold : 0;
    this.shopsService.updateShop(shop.id, shop);
  }

  async payToShop(shop: Shop): Promise<void> {
    const availableBalance = shop.balance - shop.holded;

    const paymentsToPay: Payment[] = await this.paymentsRepository.find({
      where: {
        status: PaymentStatus.done,
        shop: {
          id: shop.id,
        },
      },
      relations: {
        shop: true,
      },
      order: {
        amount: 'ASC',
      },
    });

    const { amountToPay, paymentIdsToClose, paymentIdsToUnhold } =
      paymentsToPay.reduce(
        (acc: PayToShopReducerInterface, curr: Payment, i, arr) => {
          if (acc.amountToPay + curr.amount < availableBalance) {
            acc.amountToPay += curr.amount;
            acc.paymentIdsToClose.push(curr.id);
            curr.status === PaymentStatus.handled &&
              acc.paymentIdsToUnhold.push(curr.id);
          } else {
            arr.splice(1);
          }

          return acc;
        },
        { amountToPay: 0, paymentIdsToClose: [], paymentIdsToUnhold: [] },
      );

    shop.balance -= amountToPay;

    this.shopsService.updateShop(shop.id, shop);
    this.paymentsRepository.update(
      { id: In(paymentIdsToUnhold) },
      { wasDone: true, status: PaymentStatus.done },
    );
    this.paymentsRepository.update(
      { id: In(paymentIdsToClose) },
      { wasPaid: true, status: PaymentStatus.paid },
    );
  }
}

export interface PayToShopReducerInterface {
  amountToPay: number;
  paymentIdsToClose: number[];
  paymentIdsToUnhold: number[];
}
