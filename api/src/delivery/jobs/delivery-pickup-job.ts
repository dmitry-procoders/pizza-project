import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DeliveryPickUpService } from '../services/delivery-pickup-service';

@Injectable()
export class DeliveryPickUpJob {
  constructor(private deliveryPickUpService: DeliveryPickUpService) {}

  @Cron('*/10 * * * * *')
  handleCron() {
    this.deliveryPickUpService.reviewOrdersReadyForPickup();
  }
}
