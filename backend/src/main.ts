import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptor/response.interceptor.js';
import { GlobalFiltersFilter } from './common/filters/global-filters.filter.js';

let port = process.env.SERVER_PORT;
async function bootstrap() {


  try {


    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api", {
      exclude: ['/health']
    })
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    }))


    app.enableShutdownHooks()
    app.useGlobalInterceptors(new ResponseInterceptor())
    app.useGlobalFilters(new GlobalFiltersFilter())
    await app.listen(port ?? 3000);
    console.log(`Application listening in port: ${port}`);
  } catch (error) {
    console.log('Applications bootstrap error', error)
    process.exit(1)
  }
}
await bootstrap();
