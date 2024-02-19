import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/services/order.service';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { BillingEntity } from '../entities/billing.entity';
import { BillingStatuses } from '../constants/billing-statuses';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(BillingEntity)
    private repository: Repository<BillingEntity>,
    private orderService: OrderService,
  ) {}

  async getBillingOrder(id: number): Promise<BillingEntity> {
    const bill = await this.repository.findOneOrFail({
      where: { id },
      relations: ['order'],
    });
    if (bill.order.status !== OrderStatuses.AwaitingBilling) {
      throw new Error('Order is not in awaiting billing status');
    }
    return bill;
  }

  async payOrder(id: number): Promise<void> {
    const delivery = await this.getBillingOrder(id);
    if (delivery.status !== BillingStatuses.Pending) {
      throw new Error('Delivery is not pending');
    }
    await this.repository.update(id, {
      status: BillingStatuses.Paid,
      paidAt: new Date(),
    });
    await this.orderService.confirmOrder(delivery.order.id);
  }
}
