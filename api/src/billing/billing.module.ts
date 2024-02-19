import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/order/order.module';
import { BillingEntity } from './entities/billing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillingEntity]), OrderModule],
  controllers: [],
  providers: [],
})
export class BillingModule {}
