import { OrderReviewService } from '../services/order-review.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class OrderReviewJob {
  constructor(private orderReviewService: OrderReviewService) {}

  @Cron('*/30 * * * * *')
  handleCron() {
    this.orderReviewService.reviewPendingOrders();
  }
}
