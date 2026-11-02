import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TodosService } from './todos.service.js';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { CurrentUser } from '../common/decorator/current-user.decorator.js';
import { AuthGuard } from '../auth/guard/auth.guard.js';
import { MetaResponse } from '../common/interceptor/response.interceptor.js';
import { FindTodoQueryDto } from './dto/find-todo.dto.js';
import type { userType } from '../common/constant/constant.js';


@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }



  @Post("create")
  async create(@CurrentUser() user: userType, @Body() createTodo: CreateTodoDto): Promise<MetaResponse> {

    let inserted = await this.todosService.create(user, createTodo)

    return {
      message: inserted.msg,
      data: inserted.todo
    }

  }


  @Get("")
  async findAll(@CurrentUser() user: userType, @Query() query: FindTodoQueryDto): Promise<MetaResponse> {


    let todo = await this.todosService.findAll(user, query);
    return {
      message: "Todo retrived successfull",
      data: todo
    }
  }

}
