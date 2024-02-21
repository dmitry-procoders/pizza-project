import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryEntity } from './entities/delivery.entity';
import { DeliveryService } from './services/delivery.service';
import { DeliveryController } from './controllers/delivery.controller';
import { OrderModule } from 'src/order/order.module';
import { DeliveryRepositoryService } from './services/delivery-repository.service';
import { DeliveryPickUpService } from './services/delivery-pickup-service';
import { DeliveryPickUpJob } from './jobs/delivery-pickup-job';
import { DeliveryCompletionService } from './services/delivery-completion-service';
import { DeliveryCompletionJob } from './jobs/delivery-completion-job';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryEntity]),
    forwardRef(() => OrderModule),
  ],
  exports: [DeliveryService, DeliveryRepositoryService],
  controllers: [DeliveryController],
  providers: [
    DeliveryService,
    DeliveryRepositoryService,
    DeliveryPickUpService,
    DeliveryPickUpJob,
    DeliveryCompletionService,
    DeliveryCompletionJob,
  ],
})
export class DeliveryModule {}
