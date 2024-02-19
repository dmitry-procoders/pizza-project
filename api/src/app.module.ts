import { KitchenModule } from './kitchen/kitchen.module';
import { OrderModule } from './order/order.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaModule } from './pizza/pizza.module';

@Module({
  imports: [
    KitchenModule,
    OrderModule,
    PizzaModule,
    ConfigModule.forRoot(),
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
