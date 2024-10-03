import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../interfaces/app-config.interface';

export const getAppConfig = (configService: ConfigService): AppConfig => ({
    port: configService.get<number>('APP_PORT', 3000),
    environment: configService.get<string>('APP_ENV', 'development'),
    apiVersion: configService.get<string>('APP_VERSION', 'v1'),
    appName: configService.get<string>('APP_NAME', 'MyApp'),
    jwtSecret: configService.get<string>('JWT_SECRET'),
    apiPrefix: configService.get<string>('APP_PREFIX', 'api'),
});
