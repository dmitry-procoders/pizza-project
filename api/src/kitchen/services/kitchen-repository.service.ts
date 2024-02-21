import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { KitchenEntity } from '../entities/kitchen.entity';
import { KitchenStatuses } from '../constants/kitchen-statuses';
import { OrderEntity } from 'src/order/entities/order.entity';
import { cookingTimeInMinutes } from '../constants/cooking-params';

@Injectable()
export class KitchenRepositoryService {
  constructor(
    @InjectRepository(KitchenEntity)
    private repository: Repository<KitchenEntity>,
  ) {}

  async getOrderOnKitchen(id: number): Promise<KitchenEntity> {
    const kitchen = await this.repository.findOne({
      where: { id },
      relations: ['order'],
    });
    if (!kitchen) {
      throw new Error('Kitchen record not found');
    }

    return kitchen;
  }

  async getKitchenRecordByOrder(id: number): Promise<KitchenEntity> {
    return await this.repository.findOneOrFail({
      where: { order: { id } },
      relations: ['order'],
    });
  }

  async getOrdersReadyForPreparing(): Promise<KitchenEntity[]> {
    return await this.repository.find({
      where: { status: KitchenStatuses.Pending },
      relations: [
        'order',
        'order.items',
        'order.items.pizzaSize',
        'order.items.pizzaType',
        'order.items.pizzaExtraComponents',
      ],
    });
  }

  async getOrdersInPreparingState(): Promise<KitchenEntity[]> { 
    return await this.repository.find({
      where: { status: KitchenStatuses.Preparing },
      relations: [
        'order',
        'order.items',
        'order.items.pizzaSize',
        'order.items.pizzaType',
        'order.items.pizzaExtraComponents',
      ],
    });
  }

  async getPreparingOrders(): Promise<KitchenEntity[]> {
    return await this.repository.find({
      where: {
        status: KitchenStatuses.Preparing,
        createdAt: LessThan(new Date(Date.now() - cookingTimeInMinutes)),
      },
      relations: ['order', 'order.items'],
    });
  }

  async getOrdersReadyForPickUp(): Promise<KitchenEntity[]> {
    return await this.repository.find({
      where: { status: KitchenStatuses.Ready },
      relations: [
        'order',
        'order.items',
        'order.items.pizzaSize',
        'order.items.pizzaType',
        'order.items.pizzaExtraComponents',
      ],
    });
  }

  async createKitchenRecord(order: OrderEntity): Promise<KitchenEntity> {
    const kitchenRecord = new KitchenEntity();
    kitchenRecord.status = KitchenStatuses.Pending;
    kitchenRecord.order = Object.assign(new OrderEntity(), {
      id: order.id,
    });
    return await this.repository.save(kitchenRecord);
  }

  async markAsPrepared(kitchen: KitchenEntity): Promise<KitchenEntity> {
    kitchen.status = KitchenStatuses.Ready;
    kitchen.finishedAt = new Date();
    return await this.repository.save(kitchen);
  }

  async markAsStartedPreparing(kitchen: KitchenEntity): Promise<KitchenEntity> {
    kitchen.status = KitchenStatuses.Preparing;
    kitchen.finishedAt = new Date();
    return await this.repository.save(kitchen);
  }
}
