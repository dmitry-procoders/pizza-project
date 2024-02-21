import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DeliveryPickUpService } from '../services/delivery-pickup-service';

@Injectable()
export class DeliveryPickUpJob {
  constructor(private deliveryPickUpService: DeliveryPickUpService) {}

  @Cron('0 */1 * * * *')
  handleCron() {
    console.log('Looking for orders ready for deliver ...');
    this.deliveryPickUpService.reviewOrdersReadyForPickup();
  }
}
