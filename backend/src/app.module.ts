import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './prismaConfig/prisma.module.js';
import { ScheduleModule } from "@nestjs/schedule"
import { TodosModule } from './todos/todos.module.js';
import { UsersModule } from './users/users.module.js';
import { FileMailTransport, FileTemplateEngine, MailModule } from '@nestjs/mail';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot({ cronJobs: true }),
    MailModule.forRoot({
      transport: new FileMailTransport({ directory: "var/mail" }),
      templates: new FileTemplateEngine({
        dir: join(import.meta.dirname, 'mail/templates'),
        layout: 'layout',
        cache: process.env.NODE_ENV == "porduction",
      }),
      from: `Test <test@gmail.com>`
    }),
    AuthModule,
    PrismaModule,
    TodosModule,
    UsersModule
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
