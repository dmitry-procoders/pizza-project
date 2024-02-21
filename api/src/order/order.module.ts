import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderRepositoryService } from './services/order-repository.service';
import { OrderStateMachineService } from './services/state-machine/order-state-machine-service';
import { OrderStateMachineTransitionFactory } from './services/state-machine/transitions/order-state-machine-transition-factory';
import { OrderCancelTransition } from './services/state-machine/transitions/order-cancel-transition';
import { OrderConfirmTransition } from './services/state-machine/transitions/order-confirm-transition';
import { KitchenModule } from 'src/kitchen/kitchen.module';
import { OrderReviewService } from './services/order-review.service';
import { OrderReviewJob } from './jobs/order-review-job';
import { OrderPreparingTransition } from './services/state-machine/transitions/order-preparing-transition';
import { OrderReadyForPickUpTransition } from './services/state-machine/transitions/order-ready-for-pickup-transition';
import { DeliveryModule } from 'src/delivery/delivery.module';
import { OrderDeliveringTransition } from './services/state-machine/transitions/order-delivering-transition';
import { OrderCompleteTransition } from './services/state-machine/transitions/order-complete-transition';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    forwardRef(() => KitchenModule),
    forwardRef(() => DeliveryModule),
  ],
  exports: [OrderRepositoryService, OrderStateMachineService],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepositoryService,
    OrderReviewService,
    OrderReviewJob,
    OrderStateMachineService,
    OrderStateMachineTransitionFactory,
    OrderCancelTransition,
    OrderConfirmTransition,
    OrderPreparingTransition,
    OrderReadyForPickUpTransition,
    OrderDeliveringTransition,
    OrderCompleteTransition,
  ],
})
export class OrderModule {}
