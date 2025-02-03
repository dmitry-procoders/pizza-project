import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/services/order.service';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { BillingEntity } from '../entities/billing.entity';
import { BillingStatuses } from '../constants/billing-statuses';

/**
 * Service responsible for handling billing-related operations.
 * @param repository - The repository for managing BillingEntity instances.
 * @param orderService - The service for handling order-related operations.
 */
@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(BillingEntity)
    private repository: Repository<BillingEntity>,
    private orderService: OrderService,
  ) {}

  /**
   * Retrieves a billing order by its ID.
   * @param {number} id - The ID of the billing order to retrieve.
   * @returns {Promise<BillingEntity>} A promise that resolves to the billing entity.
   * @throws {Error} If the order is not in the awaiting billing status.
   */
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

  /**
   * Processes the payment for a billing order.
   * @param id - The unique identifier of the billing order to be paid.
   * @returns A promise that resolves when the payment process is complete.
   * @throws An error if the billing order is not in a pending status.
   */
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
