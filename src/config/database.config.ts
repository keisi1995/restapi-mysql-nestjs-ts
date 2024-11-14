import { DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

// export const getDataBaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
// 	type: 'mysql',
// 	host: configService.get<string>('DB_HOST', 'localhost'),
// 	port: configService.get<number>('DB_PORT', 3306),
// 	username: configService.get<string>('DB_USERNAME', 'root'),
// 	password: configService.get<string>('DB_PASSWORD', ''),
// 	database: configService.get<string>('DB_NAME', 'demo'),
// 	entities: [__dirname + '/../**/*.entity.{ts,js}'],
// 	migrations: [__dirname + '/../migrations/*.{ts,js}'],
// 	synchronize: false,
// 	migrationsRun: true,
// 	logging: true,
// 	charset: 'utf8mb4_unicode_ci',
// });

export const getDataSourceConfig = (configService: ConfigService): DataSourceOptions => {
	return {
		type: 'mysql',
		host: configService.get<string>('DB_HOST', 'localhost'),
		port: configService.get<number>('DB_PORT', 3306),
		username: configService.get<string>('DB_USERNAME', 'root'),
		password: configService.get<string>('DB_PASSWORD', ''),
		database: configService.get<string>('DB_NAME', 'demo'),
		entities: ['dist/modules/**/entities/*.entity.js'],
		migrations: [__dirname + '/../migrations/*.{ts,js}'],
		synchronize: false,
		migrationsRun: true,
		logging: true,
		charset: 'utf8mb4_unicode_ci',
	};
};