import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './payments.entity';
import { PaymentReturnDto } from './dto/payment-return.dto';
import { PaymentIdDto } from './dto/payment-id.dto';
import { PaymentCreateDto } from './dto/payment-create.dto';
import { PaymentStatusUpdateDto } from './dto/payment-status-update.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('/')
  async getPayments(): Promise<PaymentReturnDto[]> {
    const payments: Payment[] = await this.paymentsService.getPayments();

    return payments.map((payment) => PaymentReturnDto.transform(payment));
  }

  @Get('/:id')
  async getPayment(@Param() { id }: PaymentIdDto): Promise<PaymentReturnDto> {
    const payment: Payment | null = await this.paymentsService.getPayment(id);

    return payment
      ? PaymentReturnDto.transform(payment)
      : ({} as PaymentReturnDto);
  }

  @Post('/')
  async createPayment(
    @Body() data: PaymentCreateDto,
  ): Promise<PaymentReturnDto> {
    const payment: Payment = await this.paymentsService.createPayment(data);

    return PaymentReturnDto.transform(payment);
  }

  @Patch('/:id')
  async updatePaymentStatus(
    @Param() { id }: PaymentIdDto,
    @Body() data: PaymentStatusUpdateDto,
  ): Promise<PaymentReturnDto> {
    const payment: Payment = await this.paymentsService.updatePaymentStatus(
      id,
      data,
    );

    return PaymentReturnDto.transform(payment);
  }
}
