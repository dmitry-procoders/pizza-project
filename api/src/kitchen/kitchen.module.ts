import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KitchenService } from './services/kitchen.service';
import { KitchenEntity } from './entities/kitchen.entity';
import { KitchenController } from './controllers/kitchen.controller';
import { OrderModule } from 'src/order/order.module';
import { KitchenPrepareJob } from './jobs/kitchen-prepare-job';
import { KitchenPrepareService } from './services/kitchen-prepare-service';
import { KitchenRepositoryService } from './services/kitchen-repository.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([KitchenEntity]),
    forwardRef(() => OrderModule),
  ],
  controllers: [KitchenController],
  providers: [
    KitchenService,
    KitchenRepositoryService,
    KitchenPrepareJob,
    KitchenPrepareService,
  ],
  exports: [KitchenRepositoryService],
})
export class KitchenModule {}
