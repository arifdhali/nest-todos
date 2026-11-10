import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './prismaConfig/prisma.module.js';
import { ScheduleModule } from "@nestjs/schedule"
import { TodosModule } from './todos/todos.module.js';
import { UsersModule } from './users/users.module.js';
import { InMemoryQueueService } from './queues/in-memory-queue.service.js';
import { OrderWorker } from './workers/order.worker.js';
import { OrderService } from './orders/orders.service.js';
import { OrderModule } from './orders/orders.module.js';
import { WorkerModule } from './workers/workers.module.js';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot({ cronJobs: true }),
    AuthModule,
    PrismaModule,
    TodosModule,
    UsersModule,
    OrderModule,
    WorkerModule
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
