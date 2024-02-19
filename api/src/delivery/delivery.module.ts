import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryEntity } from './entities/delivery.entity';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryEntity]), OrderModule],
  controllers: [],
  providers: [DeliveryEntity],
})
export class DeliveryModule {}
