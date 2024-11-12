import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../interfaces/app-config.interface';

export const getAppConfig = (configService: ConfigService): AppConfig => ({
	port: configService.get<number>('API_PORT', 3000),
	environment: configService.get<string>('API_ENV', 'development'),
	apiVersion: configService.get<string>('API_VERSION', 'v1'),
	appName: configService.get<string>('API_NAME', 'MyApp'),
	jwtSecret: configService.get<string>('JWT_SECRET'),
	apiPrefix: configService.get<string>('API_PREFIX', 'api'),
});
