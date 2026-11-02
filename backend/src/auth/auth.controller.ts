import { BadGatewayException, Body, Controller, Get, NotFoundException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto.js';
import { MetaResponse } from '../common/interceptor/response.interceptor.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dtos/login.dto.js';
import type { Request, Response } from 'express';
import ms, { StringValue } from 'ms';
import { ConfigService } from '@nestjs/config';
import { CurrentUser } from '../common/decorator/current-user.decorator.js';

import { RefreshGuard } from './guard/refresh.guard.js';
import type { userType } from '../common/constant/constant.js';

@Controller('auth')
export class AuthController {


    private readonly refreshTokenKEY: string = "refresh_token";
    private readonly cookiesStorePath: string = "/api/auth";

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

        res.cookie(this.refreshTokenKEY, loggedIn.refresh_token, {
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            path: this.cookiesStorePath,
            maxAge: expires
        })
        console.log('Refresh Token', loggedIn.refresh_token)
        return {
            message: "Login successfull",
            data: { token: loggedIn.login_token }
        }
    }


    @UseGuards(RefreshGuard)
    @Post("refresh")
    async refreshToken(@Res({ passthrough: true }) res: Response, @Req() request: Request): Promise<MetaResponse> {


        const refreshToken = request.cookies?.refresh_token;

        let newRefresh = await this.authService.refresh(refreshToken);

        let JWT_EXPIRES = this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES');

        let expires = ms(JWT_EXPIRES as StringValue);

        res.cookie(this.refreshTokenKEY, newRefresh.refresh_token, {
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            path: this.cookiesStorePath,
            maxAge: expires
        })
        console.log('new_ref token', newRefresh.refresh_token)
        return {
            message: "Refresh token  rotate successfully",
        }

    }

    @Get("logout")
    @UseGuards(RefreshGuard)
    async logout(@CurrentUser() user: userType, @Res({ passthrough: true }) res: Response): Promise<MetaResponse> {

        await this.authService.logout(user);

        res.clearCookie(this.refreshTokenKEY, {
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            path: this.cookiesStorePath,
        });

        return {
            message: "Logged out successfully"
        };
    }
}
