import { Module } from '@nestjs/common';
import { TodosService } from './todos.service.js';
import { TodosController } from './todos.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [TodosController],
  providers: [TodosService],
  exports: []
})
export class TodosModule { }

