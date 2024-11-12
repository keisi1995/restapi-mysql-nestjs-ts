import { Inject, Injectable } from '@nestjs/common';
import { AppConfig } from './interfaces/app-config.interface';

@Injectable()
export class AppService {

	constructor(
		@Inject('APP_CONFIG') private readonly appConfig: AppConfig,
	) { }

	getDataConfig(): AppConfig {
		return this.appConfig;
	}

	getPort(): string {
		return this.appConfig.environment;
	}
}
