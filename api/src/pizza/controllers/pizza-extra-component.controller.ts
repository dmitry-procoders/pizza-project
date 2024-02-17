import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { PizzaExtraComponentEntity } from '../entities/pizza-extra-component.entity';
import { PizzaExtraComponentService } from '../services/pizza-extra-component.service';
import { CreatePizzaExtraComponentDto } from './../dto/extra-component/create-pizza-extra-component.dto';
import { UpdatePizzaExtraComponentDto } from '../dto/extra-component/update-pizza-extra-component.dto';
import { ReplacePizzaExtraComponentDto } from '../dto/extra-component/replace-pizza-extra-component.dto';

@Crud({
  model: {
    type: PizzaExtraComponentEntity,
  },
  dto: {
    create: CreatePizzaExtraComponentDto,
    update: UpdatePizzaExtraComponentDto,
    replace: ReplacePizzaExtraComponentDto,
  },
})
@Controller('pizza-extra-component')
export class PizzaExtraComponentController
  implements CrudController<PizzaExtraComponentEntity>
{
  constructor(public service: PizzaExtraComponentService) {}
}
