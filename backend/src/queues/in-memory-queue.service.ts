import { Injectable } from "@nestjs/common";

export interface QueueJob<T = any> {
    id: number;
    name: string;
    data: T;
}

@Injectable()
export class InMemoryQueueService {
    private jobs: QueueJob[] = [];
    private jobId = 1;

    add(name: string, data: any) {

        const job: QueueJob = {
            id: this.jobId++,
            name,
            data
        }
        this.jobs.push(job);
        console.log('Job added:', job);

    }
    getNextJob() {
        return this.jobs.shift()
    }

    getPendingJobs() {
        return this.jobs;
    }
}