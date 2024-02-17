import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { PizzaTypeService } from '../services/pizza-type.service';
import { PizzaTypeEntity } from '../entities/pizza-type.entity';
import { CreatePizzaTypeDto } from '../dto/type/create-pizza-type.dto';
import { UpdatePizzaTypeDto } from '../dto/type/update-pizza-type.dto';
import { ReplacePizzaTypeDto } from '../dto/type/replace-pizza-type.dto';

@Crud({
  model: {
    type: PizzaTypeEntity,
  },
  dto: {
    create: CreatePizzaTypeDto,
    update: UpdatePizzaTypeDto,
    replace: ReplacePizzaTypeDto,
  },
})
@Controller('pizza-type')
export class PizzaTypeController implements CrudController<PizzaTypeEntity> {
  constructor(public service: PizzaTypeService) {}
}
