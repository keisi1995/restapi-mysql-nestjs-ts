import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { CORS } from './constants/cors';
import * as morgan from 'morgan';
import { config } from './config/swagger.config';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const configService = app.get(ConfigService);
	const port = configService.get<number>('APP_PORT', 3000);
	const apiPrefix = configService.get<string>('API_PREFIX', 'api');

	app.setGlobalPrefix(apiPrefix);
	app.enableCors(CORS);
	app.use(morgan('dev'));

	app.useGlobalInterceptors(new ResponseInterceptor());
	app.useGlobalFilters(new HttpExceptionFilter());

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-docs', app, document);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	// Middleware personalizado para establecer Cache-Control 10 dias
	// app.use((req: Request, res: Response, next: NextFunction) => {
	// 	res.setHeader('Cache-Control', 'max-age=864000');
	// 	next();
	// });

	await app.listen(port);
	console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
