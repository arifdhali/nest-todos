import { Injectable } from "@nestjs/common";
import { InMemoryQueueService } from "../queues/in-memory-queue.service.js";

@Injectable()
export class OrderWorker {
    constructor(private readonly queue: InMemoryQueueService) { }


    async processJobs() {
        let job;

        while (job = this.queue.getNextJob()) {

            try {

                console.log('Processing:', job.name);
                if (job.name == "send-order-email") {
                    await this.sendMail(job.data)
                }
                console.log('Completed:', job.id);

            } catch (error) {
                console.log('Job failed:', job.id, error);
            }

        }
    }

    private async sendMail(data: any) {
        console.log(`Sending email to ${data.email}`);

        await new Promise((resolve) => {
            setTimeout((resolve), 3000)
        })

        console.log('Email sent successfully');
    }
}