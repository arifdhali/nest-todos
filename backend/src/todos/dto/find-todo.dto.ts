import { Type } from "class-transformer";
import { IsEnum, IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export enum CompletedState {
    completed = 'completed',
    progress = 'progress',
    incompleted = 'incompleted',
}



export class FindTodoQueryDto {

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    perPage: number = 10;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;


    @IsOptional()
    @IsEnum(CompletedState)
    status?: CompletedState


    @IsOptional()
    @IsString()
    search?: string;

}