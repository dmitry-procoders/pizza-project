import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PizzaTypeEntity } from '../entities/pizza-type.entity';

@Injectable()
export class PizzaTypeService extends TypeOrmCrudService<PizzaTypeEntity> {
  constructor(
    @InjectRepository(PizzaTypeEntity) repository: Repository<PizzaTypeEntity>,
  ) {
    super(repository);
  }
}
