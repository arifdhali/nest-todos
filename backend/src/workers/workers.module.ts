import { Module } from "@nestjs/common";
import { WorkersController } from "./workers.controller.js";
import { QueuesModule } from "../queues/queues.module.js";
import { OrderWorker } from "./order.worker.js";


@Module({
    imports: [QueuesModule],
    controllers: [WorkersController],
    providers: [OrderWorker]
})

export class WorkerModule { }