import { Injectable } from '@nestjs/common';
import { OrderStateMachineService } from 'src/order/services/state-machine/order-state-machine-service';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { KitchenRepositoryService } from './kitchen-repository.service';

@Injectable()
export class KitchenPrepareService {
  constructor(
    private kitchenService: KitchenRepositoryService,
    private orderStateMachineService: OrderStateMachineService,
  ) {}

  async reviewPrepared() {
    const preparedOrders = await this.kitchenService.getPreparingOrders();
    for (const kitchenRecord of preparedOrders) {
      const order = Object.assign({}, kitchenRecord.order);
      order.kitchen = kitchenRecord;
      console.log('preparedOrders: ', order);
      this.orderStateMachineService.moveOrderToState(
        order,
        OrderStatuses.ReadyForPickup,
      );
    }
  }
}
