import { Controller, Post } from '@nestjs/common';
import { OrderWorker } from './order.worker.js';

@Controller('workers')
export class WorkersController {
    constructor(private readonly worker: OrderWorker) { }

    @Post('process')
    processJobs() {
        return this.worker.processJobs();
    }
}