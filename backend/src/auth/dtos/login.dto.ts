import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { passwordMinLength } from "../../common/constant/constant.js";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(passwordMinLength, {
        message: `Password must be at-least ${passwordMinLength}.`
    })
    password: string;
}