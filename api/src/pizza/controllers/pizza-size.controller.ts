import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { PizzaSizeService } from '../services/pizza-size.service';
import { PizzaSizeEntity } from '../entities/pizza-size.entity';
import { CreatePizzaSizeDto } from '../dto/size/create-pizza-size.dto';
import { UpdatePizzaSizeDto } from '../dto/size/update-pizza-size.dto';
import { ReplacePizzaSizeDto } from '../dto/size/replace-pizza-size.dto';

@Crud({
  model: {
    type: PizzaSizeEntity,
  },
  dto: {
    create: CreatePizzaSizeDto,
    update: UpdatePizzaSizeDto,
    replace: ReplacePizzaSizeDto,
  },
})
@Controller('pizza-size')
export class PizzaSizeController implements CrudController<PizzaSizeEntity> {
  constructor(public service: PizzaSizeService) {}
}
