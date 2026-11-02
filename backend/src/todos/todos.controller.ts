import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service.js';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { CurrentUser } from '../common/decorator/current-user.decorator.js';
import { AuthGuard } from '../auth/guard/auth.guard.js';
import { MetaResponse } from '../common/interceptor/response.interceptor.js';


@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }



  @Post("create")
  async create(@CurrentUser() user: any, @Body() createTodo: CreateTodoDto): Promise<MetaResponse> {

    let inserted = await this.todosService.create(user, createTodo)

    return {
      message: inserted.msg,
      data: inserted.todo
    }

  }

}
