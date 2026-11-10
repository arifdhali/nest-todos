import { Injectable } from "@nestjs/common";
import { InMemoryQueueService } from "../queues/in-memory-queue.service.js";

@Injectable()
export class OrderService {
    constructor(private readonly queue: InMemoryQueueService) { }


    async createOrder() {

        const order = {
            id: 101,
            email: 'customer@gmail.com',
            total: 2500,
        };


        await this.queue.add("send-order-email", {
            orderId: order.id,
            email: order.email,
            total: order.total,
        })


        return {
            message: 'Order created successfully',
            order,
        };
    }
}