import { Controller, Post } from '@nestjs/common';
import { OrderService } from './orders.service.js';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrderService,
    ) { }

    @Post()
    createOrder() {
        return this.ordersService.createOrder();
    }
}