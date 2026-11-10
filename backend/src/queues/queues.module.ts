import { Module } from "@nestjs/common";
import { InMemoryQueueService } from "./in-memory-queue.service.js";


@Module({
    providers: [InMemoryQueueService],
    exports: [InMemoryQueueService]
})

export class QueuesModule { }    