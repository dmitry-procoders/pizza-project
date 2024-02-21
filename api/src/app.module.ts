import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { BillingModule } from './billing/billing.module';
import { DeliveryModule } from './delivery/delivery.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { OrderModule } from './order/order.module';
import { PizzaModule } from './pizza/pizza.module';

@Module({
  imports: [
    BillingModule,
    DeliveryModule,
    KitchenModule,
    OrderModule,
    PizzaModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: 5432,
        host: configService.get('TYPEORM_HOST'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
        migrations: [
          __dirname + '/**/migrations/*.ts',
          __dirname + '/**/migrations/*.js',
        ],
        synchronize: false,
        migrationsRun: true,
        dropSchema: false,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
