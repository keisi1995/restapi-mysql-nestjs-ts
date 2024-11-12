import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MerchantModule } from './modules/merchant/merchant.module';
import { UserMerchantModule } from './modules/user_merchant/user_merchant.module';

import { getDatabaseConfig } from './config/database.config';
import { getAppConfig } from './config/app.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env'],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getDatabaseConfig,
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'images'),
			serveStaticOptions: {
				maxAge: 30 * 24 * 60 * 60,
				index: false,
			},
		}),
		AuthModule,
		UserModule,
		ProfileModule,
		MerchantModule,
		UserMerchantModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: 'APP_CONFIG',
			inject: [ConfigService],
			useFactory: getAppConfig,
		},
	],
	// exports: ['APP_CONFIG'],
})
export class AppModule { }
