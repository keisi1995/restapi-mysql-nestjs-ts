import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
	type: 'mysql',
	host: configService.get<string>('MYSQL_HOST', 'localhost'),
	port: configService.get<number>('MYSQL_PORT', 3306),
	username: configService.get<string>('MYSQL_USER', 'root'),
	password: configService.get<string>('MYSQL_PASSWORD', 'password'),
	database: configService.get<string>('MYSQL_DATABASE', 'mydb'),
	entities: [__dirname + '/../**/*.entity{.ts,.js}'],
	synchronize: configService.get<boolean>('DB_SYNC', true),
});
