import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../generated/prisma/client.js";
import { ConfigService } from "@nestjs/config";
import { createPrismaClient } from "./prismaClient.js";


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(configService: ConfigService) {
        let client = createPrismaClient(configService);
        super({ adapter: client })
    }
    private readonly logger = new Logger(PrismaService.name)

    async onModuleInit() {


        await this.$connect()
        await this.$queryRaw`SELECT 1`


        this.logger.log('MySQL connected successfully');
    }
    async onModuleDestroy() {
        await this.$disconnect()
        this.logger.log('MySQL DISCONNECTED!!');

    }
}