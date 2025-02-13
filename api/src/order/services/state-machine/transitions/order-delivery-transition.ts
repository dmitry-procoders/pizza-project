import { OrderEntity } from '../../../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderBaseTransition } from './order-base-transition';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderRepositoryService } from '../../order-repository.service';
import { DeliveryRepositoryService } from 'src/delivery/services/delivery-repository.service';

@Injectable()
export class OrderDeliveryTransition extends OrderBaseTransition {
  constructor(
    private orderRepositoryService: OrderRepositoryService,
    private deliveryService: DeliveryRepositoryService,
  ) {
    super();
  }

  validInitialStates = [OrderStatuses.ReadyForPickup];

  /**
   * Moves the given order to its final state by performing the necessary delivery and status update operations.
   * @param {OrderEntity} order - The order entity to be moved to the final state.
   * @returns {Promise<void>} A promise that resolves when the order has been successfully moved to the final state.
   */
  async moveToFinalState(order: OrderEntity) {
    await this.deliveryService.pickOrderForDelivery(order.delivery);
    await this.orderRepositoryService.updateOrderStatus(
      order,
      OrderStatuses.Delivery,
    );
  }
}
