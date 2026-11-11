import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptor/response.interceptor.js';
import { GlobalFiltersFilter } from './common/filters/global-filters.filter.js';
import cookieParser from 'cookie-parser';
let port = process.env.SERVER_PORT;
async function bootstrap() {


  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: [
        'http://localhost:3000',
      ],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true,
    });
    app.use(cookieParser());
    app.setGlobalPrefix("api", {
      exclude: ['/health']
    })
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      // exceptionFactory(errors) {
      //   console.log(errors)
      // },
    }))

    app.enableShutdownHooks()
    app.useGlobalInterceptors(new ResponseInterceptor())
    app.useGlobalFilters(new GlobalFiltersFilter())
    await app.listen(port ?? 3000);
    console.log(`Application listening in port: http://localhost:${port}`);
  } catch (error) {
    console.log('Applications bootstrap error', error)
    process.exit(1)
  }
}
await bootstrap();
