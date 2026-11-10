import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller.js";
import { OrderService } from "./orders.service.js";
import { QueuesModule } from "../queues/queues.module.js";

@Module({
    imports: [QueuesModule],
    controllers: [OrdersController],
    providers: [OrderService,]
})

export class OrderModule { }