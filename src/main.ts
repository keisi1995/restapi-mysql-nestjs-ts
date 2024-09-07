import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { CORS } from './constants/cors';
import * as morgan from 'morgan';
import { config } from './config/swagger.config';
import { ResponseInterceptor } from './config/response.interceptor';
import { GlobalExceptionFilter } from './config/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(CORS);
  app.use(morgan('dev'));

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ),
    // Middleware personalizado para establecer Cache-Control 10 dias
    // app.use((req, res, next) => {
    //   res.setHeader('Cache-Control', 'max-age=864000');
    //   next();
    // });

    await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on test xd dasdasd: ${await app.getUrl()}`);
}

bootstrap();
