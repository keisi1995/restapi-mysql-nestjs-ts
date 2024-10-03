import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppConfig } from './interfaces/app-config.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): AppConfig {
    return this.appService.getHello();
  }

  @Get('/get-port')
  getPort(): number {
    return this.appService.getPort();
  }
}
