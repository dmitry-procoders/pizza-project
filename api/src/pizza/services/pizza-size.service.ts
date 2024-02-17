import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PizzaSizeEntity } from '../entities/pizza-size.entity';

@Injectable()
export class PizzaSizeService extends TypeOrmCrudService<PizzaSizeEntity> {
  constructor(
    @InjectRepository(PizzaSizeEntity) repository: Repository<PizzaSizeEntity>,
  ) {
    super(repository);
  }
}
