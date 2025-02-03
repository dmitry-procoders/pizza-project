import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryEntity } from '../entities/delivery.entity';
import { DeliveryStatuses } from '../constants/delivery-statuses';
import { OrderEntity } from 'src/order/entities/order.entity';

/**
 * Service responsible for handling delivery-related operations.
 * @param repository - The repository instance for managing DeliveryEntity objects.
 */
@Injectable()
export class DeliveryRepositoryService {
  constructor(
    @InjectRepository(DeliveryEntity)
    private repository: Repository<DeliveryEntity>,
  ) {}

  /**
   * Retrieves a delivery order by its ID.
   * @param {number} id - The ID of the delivery order to retrieve.
   * @returns {Promise<DeliveryEntity>} A promise that resolves to the delivery entity.
   * @throws Will throw an error if the delivery order is not found.
   */
  async getDeliveryOrder(id: number): Promise<DeliveryEntity> {
    const delivery = await this.repository.findOneOrFail({
      where: { id },
      relations: ['order'],
    });
    return delivery;
  }

  /**
   * Retrieves a list of delivery orders that are ready for delivery.
   * This method queries the repository to find all delivery entities
   * with a status of `Pending`. It also includes related `order` and 
   * `order.kitchen` entities in the result.
   * @returns {Promise<DeliveryEntity[]>} A promise that resolves to an array of delivery entities
   * that are ready for delivery.
   */
  async getOrdersReadyForDelivery(): Promise<DeliveryEntity[]> {
    return await this.repository.find({
      where: {
        status: DeliveryStatuses.Pending,
      },
      relations: ['order', 'order.kitchen'],
    });
  }

  /**
   * Retrieves all orders that are currently in the delivery process.
   * @returns {Promise<DeliveryEntity[]>} A promise that resolves to an array of DeliveryEntity objects
   *                                      representing the orders in delivery.
   */
  async getOrdersInDelivery(): Promise<DeliveryEntity[]> {
    return await this.repository.find({
      where: {
        status: DeliveryStatuses.Delivering,
      },
      relations: ['order'],
    });
  }

  /**
   * Marks the given order as ready for pickup by creating a new delivery entity
   * with the status set to Pending and associating it with the provided order.
   * @param {OrderEntity} order - The order entity to be marked as ready for pickup.
   * @returns {Promise<void>} A promise that resolves when the delivery entity has been saved.
   */
  async markAsReadyForPickup(order: OrderEntity): Promise<void> {
    const delivery = new DeliveryEntity();
    delivery.status = DeliveryStatuses.Pending;
    delivery.order = Object.assign(new OrderEntity(), {
      id: order.id,
    });
    await this.repository.save(delivery);
  }

  /**
   * Updates the status of a delivery order to "Delivering" and sets the current date as the creation date.
   * @param delivery - The delivery entity containing the order details.
   * @returns A promise that resolves when the update operation is complete.
   */
  async pickOrderForDelivery(delivery: DeliveryEntity): Promise<void> {
    await this.repository.update(delivery.id, {
      status: DeliveryStatuses.Delivering,
      createdAt: new Date(),
    });
  }

  /**
   * Marks the specified order as delivered by updating its status to 'Ready' and setting the finishedAt timestamp.
   * @param {DeliveryEntity} delivery - The delivery entity representing the order to be marked as delivered.
   * @returns {Promise<void>} A promise that resolves when the order has been successfully marked as delivered.
   */
  async markOrderAsDelivered(delivery: DeliveryEntity): Promise<void> {
    await this.repository.update(delivery.id, {
      status: DeliveryStatuses.Ready,
      finishedAt: new Date(),
    });
  }
}
