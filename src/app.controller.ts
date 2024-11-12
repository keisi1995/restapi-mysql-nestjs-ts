import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppConfig } from './interfaces/app-config.interface';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	getDataConfig(): AppConfig {
		return this.appService.getDataConfig();
	}

	@Get('/get-port')
	getPort(): string {
		return this.appService.getPort();
	}
}
