import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PizzaTypeEntity } from '../entities/pizza-type.entity';

@Injectable()
export class PizzaTypeService {
  constructor(
    @InjectRepository(PizzaTypeEntity)
    private repository: Repository<PizzaTypeEntity>,
  ) {}

  async getList(): Promise<PizzaTypeEntity[]> {
    return await this.repository.find();
  }
}
