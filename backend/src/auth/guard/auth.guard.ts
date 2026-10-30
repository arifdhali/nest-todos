import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService, private readonly cofigService: ConfigService) { }
  async canActivate(context: ExecutionContext,): Promise<boolean> {
    let ctx = context.switchToHttp();
    const req = ctx.getRequest();

    let authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Bearer must be include with token");
    }

    let token = authHeader.split(" ")[1]

    try {
      let payload = await this.jwt.verifyAsync(token, {
        secret: this.cofigService.getOrThrow<string>("JWT_SECRET"),
      });
      req["user"] = payload;
      return true;

    } catch (error: any) {
      throw new UnauthorizedException(error.message)
    }


  }
}
