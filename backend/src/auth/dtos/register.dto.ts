import { IsDateString, IsEmail, IsJSON, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    first_name: string

    @IsString()
    @IsNotEmpty()
    last_name: string

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string


    @IsOptional()
    @IsDateString({ strict: true, strictSeparator: true }, { message: 'The date must be a valid ISO 8601 format (e.g., YYYY-MM-DD)' })
    dob: string;

    @IsOptional()
    @IsString()
    @MinLength(10, {
        message: "Phone number must be at least 10 characters",
    })
    @MaxLength(15, {
        message: "Phone number cannot exceed 15 characters",
    })
    phone?: string;

    @ValidateIf((o) => o.phone !== undefined && o.phone !== null && o.phone !== "")
    @IsString()
    @IsNotEmpty({ message: "Country code is required when phone is provided" })
    country_code?: string;

    @IsOptional()
    @IsString()
    address?: string;


    @IsOptional()
    @IsObject()
    preferences?: Record<string, unknown>
}