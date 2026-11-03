import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto.js';
import { CompletedState } from './find-todo.dto.js';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {

    @IsOptional()
    @IsEnum(CompletedState)
    completed?: CompletedState

}
