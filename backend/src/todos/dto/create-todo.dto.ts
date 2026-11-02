import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";


class SharedPermissionDto {
    @IsNotEmpty()
    @IsBoolean()
    read: boolean = true;

    @IsNotEmpty()
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
    @IsInt({ each: true })
    shared_with?: number[];


    @ValidateIf((o) => o.shared_with && o.shared_with.length > 0)
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => SharedPermissionDto)
    shared_permission: SharedPermissionDto
}
