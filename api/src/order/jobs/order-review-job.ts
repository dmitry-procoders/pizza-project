import { OrderReviewService } from '../services/order-review.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

/**
 * This class handles the cron job for reviewing pending orders.
 * It is triggered by a scheduled task to review all pending orders using the OrderReviewService.
 */
@Injectable()
export class OrderReviewJob {
  constructor(private orderReviewService: OrderReviewService) {}

  /**
   * Handles the cron job for reviewing pending orders.
   * This method is triggered by a scheduled task to review
   * all pending orders using the orderReviewService.
   */
  @Cron('*/30 * * * * *')
  handleCron() {
    this.orderReviewService.reviewPendingOrders();
  }
}
