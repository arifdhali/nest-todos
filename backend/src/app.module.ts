import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './prismaConfig/prisma.module.js';
import { ScheduleModule } from "@nestjs/schedule"
import { TodosModule } from './todos/todos.module.js';
import { UsersModule } from './users/users.module.js';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot({ cronJobs: true }),
    UserModule,
    AuthModule,
    PrismaModule,
    TodosModule,
    UsersModule
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
