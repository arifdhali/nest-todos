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

  @Get("")
  async findAll(@CurrentUser() user: userType, @Query() query: FindTodoQueryDto): Promise<MetaResponse> {
    let todo = await this.todosService.findAll(user, query);
    return {
      message: "Todo retrived successfull",
      data: todo
    }
  }



  @Post("create")
  async create(@CurrentUser() user: userType, @Body() createTodo: CreateTodoDto): Promise<MetaResponse> {

    let inserted = await this.todosService.create(user, createTodo)

    return {
      message: inserted.msg,
      data: inserted.todo
    }

  }



  @Get(":id")
  async findOne(@CurrentUser() user: userType, @Param() params: { id: string }): Promise<MetaResponse> {
    const { id: todoID } = params;

    let todo = await this.todosService.findOne(user, todoID);

    return {
      message: "Todo retrived successfull",
      data: todo
    }

  }


  @Delete(":id")
  async delete(@CurrentUser() user: userType, @Param() params: { id: string }, @Query() query: { forceDelete: boolean }): Promise<MetaResponse> {
    const { id: todoID } = params;
    const { forceDelete } = query

    let todo = await this.todosService.remove(user, todoID, forceDelete);
    const { message, ...others } = todo;
    return {
      message: message,
      data: others
    }
  }


  @Patch(":id/edit")
  async update(@Param() params: { id: string }, @CurrentUser() user: userType, @Body() body: UpdateTodoDto): Promise<MetaResponse> {

    await this.todosService.update(params, user, body)

    return {
      message: "Todo updated successfully",
    }
  }


}
