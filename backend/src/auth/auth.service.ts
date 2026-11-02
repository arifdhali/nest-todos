import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto.js';
import { PrismaService } from '../prismaConfig/prisma.service.js';
import { Username } from './type/type.js';
import { Prisma } from '../generated/prisma/client.js';
import { LoginDto } from './dtos/login.dto.js';
import { generatePassword } from 'password-generator';
import { passwordMinLength } from '../common/constant/constant.js';
import bcrypt from "bcrypt"
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { SignOptions } from "jsonwebtoken";
import { createHash, randomUUID } from 'crypto';
import ms from 'ms';
import { CurrentUser } from '../common/decorator/current-user.decorator.js';
@Injectable()
export class AuthService {

    private readonly expiresAt = null;
    private readonly refExpiresTimeAt = null;

    private readonly hashAlog = 'sha256';
    constructor(private readonly prismaService: PrismaService, private readonly configService: ConfigService, private readonly jwt: JwtService) { }

    async register(body: RegisterDto) {

        try {
            const isUserExists = await this.prismaService.users.findFirst({
                where: {

                    OR: [
                        { email: body.email, },
                        { phone: body?.phone }
                    ]
                }
            })
            if (isUserExists) {
                throw new UnauthorizedException("Email is already registered");
            }

            let username = await this.createUserName({ firstName: body.first_name, email: body.email });
            let randomPassword = await generatePassword(passwordMinLength);
            let hashedPasword = await bcrypt.hash(randomPassword, Number(this.configService.getOrThrow('PASSWORD_SALT')))

            let registered = await this.prismaService.users.create({
                data: {
                    user_name: username,
                    first_name: body.first_name,
                    last_name: body.last_name,
                    email: body.email.toLowerCase(),
                    dob: body.dob ? new Date(body.dob) : null,
                    phone: body.phone,
                    country_code: body.country_code,
                    address: body.address,
                    preferences: body.preferences as Prisma.InputJsonValue | undefined,
                    password: hashedPasword
                },
                select: {
                    user_name: true,
                    email: true
                }
            })

            if (!registered) {
                throw new BadRequestException("Registration failed!")
            }

            // sending email

            console.log('registered password', randomPassword)

            return {
                message: "User registered successfully",
                user: registered,
            };
        } catch (err) {
            throw err;
        }

    }

    private async createUserName(data: Username): Promise<string> {
        const NAME_MAX_LENGTH = 10;
        let username = "";
        let suffix = 1;
        const { firstName, email } = data;
        username = firstName.toLowerCase().substring(0, NAME_MAX_LENGTH / 2).concat(email.toLowerCase().substring(0, 4));

        let usernameExits = await this.prismaService.users.findFirst({
            where: {
                user_name: username
            }
        })

        if (usernameExits) {
            suffix++;
            username = `${username}${suffix}`
        }

        return username;
    }

    async login(body: LoginDto) {

        try {

            let isUser = await this.prismaService.users.findFirst({
                where: {
                    email: body.email,
                    status: true
                },
                select: {
                    id: true,
                    email: true,
                    password: true,
                    user_name: true
                }
            })

            if (!isUser) {
                throw new ConflictException("User not found ");
            }
            let password = body.password.trim();

            const comparedPassword = await bcrypt.compare(password, isUser?.password)
            if (!comparedPassword) {
                throw new UnauthorizedException("Credentials do not match our records")
            }
            let loginPayload = {
                sub: isUser.id,
                username: isUser.user_name,
                email: isUser.email,
            }

            let loginToken = await this.jwt.signAsync(loginPayload, {
                secret: this.configService.getOrThrow<string>("JWT_SECRET"),
                expiresIn: this.configService.getOrThrow<string>("JWT_LOGIN_EXPIRES") as SignOptions["expiresIn"]
            })


            const sessionID = randomUUID();
            let refreshPayload = {
                sub: isUser.id,
                sid: sessionID,
                username: isUser.user_name,
                email: isUser.email,
            }


            let refExpiresTimeAt = this.configService.getOrThrow<string>("JWT_REFRESH_EXPIRES") as SignOptions["expiresIn"];
            let refreshToken = await this.jwt.signAsync(refreshPayload, {
                secret: this.configService.getOrThrow<string>("JWT_SECRET"),
                expiresIn: refExpiresTimeAt
            });

            let expiresAt = new Date(Date.now() + ms(refExpiresTimeAt as number));
            let hashRefToken = createHash(this.hashAlog).update(refreshToken).digest("hex")

            await this.prismaService.userSession.create({
                data: {
                    session_id: sessionID,
                    user_id: isUser.id,
                    refreshTokenHash: hashRefToken,
                    expiresAt
                }
            })

            return {
                login_token: loginToken,
                refresh_token: refreshToken
            }

        } catch (err) {
            throw err;
        }

    }

    async refresh(token: string, user: any) {

        try {

            let jwtSecret = await this.configService.getOrThrow('JWT_SECRET')

            let oldPayload = await this.jwt.verifyAsync(token, {
                secret: jwtSecret
            })
            let session = await this.prismaService.userSession.findFirst({
                where: {
                    session_id: oldPayload.sid,
                    expiresAt: {
                        gt: new Date()
                    }
                }
            })

            if (!session) {
                throw new UnauthorizedException('Somthing went wrong. Please login again');
            }
            if (session.revokedAt != null) {

                // remove this token from the  DB
                await this.prismaService.userSession.delete({
                    where: {
                        id: session.id
                    }
                })
                throw new UnauthorizedException('Somthing went wrong. Please login again');
            }


            let newoldPayload = {
                sub: oldPayload.id,
                sid: session.session_id,
                username: oldPayload.user_name,
                email: oldPayload.email,
            }

            const { sid, ...accessPayload } = newoldPayload;

            let newToken = await this.jwt.signAsync(accessPayload, {
                secret: this.configService.getOrThrow<string>("JWT_SECRET"),
                expiresIn: this.configService.getOrThrow<string>("JWT_LOGIN_EXPIRES") as SignOptions["expiresIn"]
            })

            let refExpiresTimeAt = this.configService.getOrThrow<string>("JWT_REFRESH_EXPIRES") as SignOptions["expiresIn"];
            let newRefreshToken = await this.jwt.signAsync(newoldPayload, {
                secret: this.configService.getOrThrow<string>("JWT_SECRET"),
                expiresIn: refExpiresTimeAt
            });

            let hashToken = createHash(this.hashAlog).update(newRefreshToken).digest("hex")
            let expiresAt = new Date(Date.now() + ms(refExpiresTimeAt as number));

            let insertedNewToken = await this.prismaService.userSession.update({
                where: {
                    session_id: sid
                },
                data: {
                    refreshTokenHash: hashToken,
                    expiresAt
                }
            })

            if (!insertedNewToken) {
                throw new UnauthorizedException('Somthing went wrong. Please login again');
            }

            return {
                access_token: newToken,
                refresh_token: newRefreshToken,
            }


        } catch (err) {
            console.log(err)
            throw err;
        }

    }


    async logout(user: any) {

        const session = await this.prismaService.userSession.updateMany({
            where: {
                user_id: user.sub,
                session_id: user.sid,
                revokedAt: null
            },
            data: {
                revokedAt: new Date()
            }
        });

        if (session.count === 0) {
            throw new UnauthorizedException("Session already expired or revoked");
        }

        return true
    }
}
