import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";


@Injectable()

export class RefreshGuard implements CanActivate {
    constructor(private readonly jwt: JwtService, private readonly cofigService: ConfigService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        let ctx = context.switchToHttp();
        const req = ctx.getRequest();

        let refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) {
            throw new UnauthorizedException("Refresh token is required");
        }

        try {
            let payload = await this.jwt.verifyAsync(refreshToken, {
                secret: this.cofigService.getOrThrow<string>("JWT_SECRET"),
            });
            if (!payload.sid) {
                throw new UnauthorizedException("Invalid refresh token");
            }
            req["user"] = payload;
            return true;

        } catch (error: any) {
            throw new UnauthorizedException(error.message)
        }

    }
}