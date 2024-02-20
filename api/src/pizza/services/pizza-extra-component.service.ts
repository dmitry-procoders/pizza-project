import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PizzaExtraComponentEntity } from '../entities/pizza-extra-component.entity';

@Injectable()
export class PizzaExtraComponentService {
  constructor(
    @InjectRepository(PizzaExtraComponentEntity)
    private repository: Repository<PizzaExtraComponentEntity>,
  ) {}

  async getList(): Promise<PizzaExtraComponentEntity[]> {
    return await this.repository.find();
  }
}
