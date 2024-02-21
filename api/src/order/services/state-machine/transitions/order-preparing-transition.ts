import { OrderEntity } from '../../../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderBaseTransition } from './order-base-transition';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderRepositoryService } from '../../order-repository.service';
import { KitchenRepositoryService } from 'src/kitchen/services/kitchen-repository.service';

@Injectable()
export class OrderPreparingTransition extends OrderBaseTransition {
  constructor(
    private orderRepositoryService: OrderRepositoryService,
    private kitchenService: KitchenRepositoryService,
  ) {
    super();
  }

  validInitialStates = [OrderStatuses.Confirmed];

  async moveToFinalState(order: OrderEntity) {
    await this.orderRepositoryService.updateOrderStatus(
      order,
      OrderStatuses.Preparing,
    );
    await this.kitchenService.markAsStartedPreparing(order.kitchen);
  }
}
