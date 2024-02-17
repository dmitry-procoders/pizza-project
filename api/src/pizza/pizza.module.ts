import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaExtraComponentController } from './controllers/pizza-extra-component.controller';
import { PizzaTypeController } from './controllers/pizza-type.controller';
import { PizzaSizeController } from './controllers/pizza-size.controller';
import { PizzaSizeEntity } from './entities/pizza-size.entity';
import { PizzaTypeEntity } from './entities/pizza-type.entity';
import { PizzaExtraComponentEntity } from './entities/pizza-extra-component.entity';
import { PizzaSizeService } from './services/pizza-size.service';
import { PizzaTypeService } from './services/pizza-type.service';
import { PizzaExtraComponentService } from './services/pizza-extra-component.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PizzaSizeEntity,
      PizzaTypeEntity,
      PizzaExtraComponentEntity,
    ]),
    ConfigModule,
  ],
  controllers: [
    PizzaTypeController,
    PizzaSizeController,
    PizzaExtraComponentController,
  ],
  providers: [PizzaSizeService, PizzaTypeService, PizzaExtraComponentService],
})
export class PizzaModule {}
