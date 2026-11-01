import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from './prismaConfig/prisma.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly prismaService: PrismaService) { }


  @Cron('0 0 2 * * *', {
    name: "all-delete",
    timeZone: 'Asia/Kolkata',
  })

  async cleanupRevokedSessions() {
    const result = await this.prismaService.userSession.deleteMany({
      where: {
        revokedAt: {
          not: null
        }
      }
    })

    console.log(`Permanently deleted ${result.count} revoked sessions.`);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
