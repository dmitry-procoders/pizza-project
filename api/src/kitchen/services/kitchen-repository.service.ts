import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { KitchenEntity } from '../entities/kitchen.entity';
import { KitchenStatuses } from '../constants/kitchen-statuses';
import { OrderEntity } from 'src/order/entities/order.entity';
import { cookingTimeInMinutes } from '../constants/cooking-params';

/**
 * Service for handling operations related to the KitchenEntity repository.
 *
 * @param repository - The repository instance for KitchenEntity, injected by the @InjectRepository decorator.
 */
@Injectable()
export class KitchenRepositoryService {
  constructor(
    @InjectRepository(KitchenEntity)
    private repository: Repository<KitchenEntity>,
  ) {}

  /**
   * Retrieves a kitchen entity along with its associated order by the given ID.
   *
   * @param id - The unique identifier of the kitchen entity to retrieve.
   * @returns A promise that resolves to the kitchen entity with its associated order.
   * @throws An error if the kitchen entity is not found.
   */
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

  /**
   * Retrieves a kitchen record associated with a specific order ID.
   *
   * @param id - The ID of the order to find the associated kitchen record.
   * @returns A promise that resolves to the `KitchenEntity` associated with the given order ID.
   * @throws Will throw an error if no kitchen record is found for the given order ID.
   */
  async getKitchenRecordByOrder(id: number): Promise<KitchenEntity> {
    return await this.repository.findOneOrFail({
      where: { order: { id } },
      relations: ['order'],
    });
  }

  /**
   * Retrieves a list of kitchen orders that are ready for preparing.
   *
   * This method queries the repository to find all orders with a status of `Pending`.
   * It also includes related entities such as order items, pizza size, pizza type,
   * and extra components for each item.
   *
   * @returns {Promise<KitchenEntity[]>} A promise that resolves to an array of `KitchenEntity` objects
   * representing the orders ready for preparing.
   */
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

  /**
   * Retrieves all kitchen orders that are currently in the "Preparing" state.
   *
   * @returns {Promise<KitchenEntity[]>} A promise that resolves to an array of KitchenEntity objects
   * representing the orders in the "Preparing" state. The returned entities include related order details,
   * such as items, pizza sizes, pizza types, and extra components.
   */
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

  /**
   * Retrieves a list of kitchen orders that are currently in the "Preparing" status
   * and were created before a certain time threshold.
   *
   * @returns {Promise<KitchenEntity[]>} A promise that resolves to an array of KitchenEntity objects
   *                                     representing the orders that are being prepared.
   */
  async getPreparingOrders(): Promise<KitchenEntity[]> {
    return await this.repository.find({
      where: {
        status: KitchenStatuses.Preparing,
        createdAt: LessThan(new Date(Date.now() - cookingTimeInMinutes)),
      },
      relations: ['order', 'order.items', 'order.delivery'],
    });
  }

  /**
   * Retrieves a list of kitchen orders that are ready for pick-up.
   *
   * @returns {Promise<KitchenEntity[]>} A promise that resolves to an array of KitchenEntity objects representing the orders ready for pick-up.
   *
   * The returned orders include the following related entities:
   * - `order`: The associated order.
   * - `order.items`: The items within the order.
   * - `order.items.pizzaSize`: The size of the pizza for each item.
   * - `order.items.pizzaType`: The type of pizza for each item.
   * - `order.items.pizzaExtraComponents`: Any extra components added to the pizza for each item.
   */
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

  /**
   * Creates a new kitchen record with the status set to Pending and associates it with the given order.
   * @param {OrderEntity} order - The order entity to associate with the new kitchen record.
   * @returns {Promise<KitchenEntity>} A promise that resolves to the created kitchen entity.
   */
  async createKitchenRecord(order: OrderEntity): Promise<KitchenEntity> {
    const kitchenRecord = new KitchenEntity();
    kitchenRecord.status = KitchenStatuses.Pending;
    kitchenRecord.order = Object.assign(new OrderEntity(), {
      id: order.id,
    });
    return await this.repository.save(kitchenRecord);
  }

  /**
   * Marks the given kitchen entity as prepared by updating its status to 'Ready'
   * and setting the finishedAt timestamp to the current date and time.
   * @param kitchen - The kitchen entity to be marked as prepared.
   * @returns A promise that resolves to the updated kitchen entity.
   */
  async markAsPrepared(kitchen: KitchenEntity): Promise<KitchenEntity> {
    kitchen.status = KitchenStatuses.Ready;
    kitchen.finishedAt = new Date();
    return await this.repository.save(kitchen);
  }

  /**
   * Marks the given kitchen entity as started preparing by updating its status
   * to `Preparing` and setting the `createdAt` timestamp to the current date and time.
   * @param kitchen - The kitchen entity to be updated.
   * @returns A promise that resolves to the updated kitchen entity.
   */
  async markAsStartedPreparing(kitchen: KitchenEntity): Promise<KitchenEntity> {
    kitchen.status = KitchenStatuses.Preparing;
    kitchen.createdAt = new Date();
    return await this.repository.save(kitchen);
  }

  /**
   * Marks the specified kitchen entity as taken for delivery by updating its status.
   *
   * @param kitchen - The kitchen entity to be marked as taken for delivery.
   * @returns A promise that resolves when the update operation is complete.
   */
  async markAsTakenForDelivery(kitchen: KitchenEntity): Promise<void> {
    await this.repository.update(kitchen.id, {
      status: KitchenStatuses.TakenForDelivery,
    });
  }
}
