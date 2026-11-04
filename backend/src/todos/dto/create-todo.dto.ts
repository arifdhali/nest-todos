import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";


export class SharedPermissionDto {
    @IsInt()
    id: number;


    @IsBoolean()
    read: boolean = true;

    @IsBoolean()
    write: boolean = false;
}

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SharedPermissionDto)
    shared_with?: SharedPermissionDto[];
}
