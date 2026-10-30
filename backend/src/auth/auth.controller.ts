import { Body, Controller, NotFoundException, Post, Req, Res } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto.js';
import { MetaResponse } from '../common/interceptor/response.interceptor.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dtos/login.dto.js';
import type { Request, Response } from 'express';
import ms, { StringValue } from 'ms';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly configService: ConfigService) { }

    @Post("register")
    async register(@Body() body: RegisterDto): Promise<MetaResponse> {


        let user = await this.authService.register(body);

        return {
            message: user.message,
            data: user.user
        }

    }
    @Post("login")
    async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response): Promise<MetaResponse> {

        let loggedIn = await this.authService.login(body);
        let JWT_EXPIRES = this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES');
        let expires = ms(JWT_EXPIRES as StringValue);

        if (!loggedIn.refresh_token) {
            throw new NotFoundException("Refresh token not recieved")
        }

        res.cookie('refresh_token', loggedIn.refresh_token, {
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            path: "/auth/refresh",
            maxAge: expires
        })

        return {
            message: "Login successfull",
            data: loggedIn.login_token
        }
    }

    @Post("refresh")
    async refreshToken(@Res({ passthrough: true }) res: Response, @Req() request: Request) {


        console.log(request.cookies)
        // let newRefresh = await this.authService.refresh()

    }
}
