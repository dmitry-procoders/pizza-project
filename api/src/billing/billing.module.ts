import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingEntity } from './entities/billing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillingEntity])],
  controllers: [],
  providers: [],
})
export class BillingModule {}
