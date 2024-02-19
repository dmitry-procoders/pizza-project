import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KitchenService } from './services/kitchen.service';
import { KitchenEntity } from './entities/kitchen.entity';
import { OrderModule } from 'src/order/order.module';
import { KitchenController } from './controllers/kitchen.controller';

@Module({
  imports: [TypeOrmModule.forFeature([KitchenEntity]), OrderModule],
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}
