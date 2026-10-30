import { ConfigService } from "@nestjs/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

export const createPrismaClient = (configService: ConfigService) => {

    let url = new URL(configService.getOrThrow<string>("DATABASE_URL"));
    if (url.protocol !== 'mysql:') {
        throw new Error('DATABASE_URL must use the mysql:// protocol');
    }
    let dbName = decodeURIComponent(url.pathname.slice(1))
    let adapter = new PrismaMariaDb({
        host: decodeURIComponent(url.hostname),
        port: Number(decodeURIComponent(url.port ?? 5000)),
        user: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
        database: dbName
    })
    return adapter;
}