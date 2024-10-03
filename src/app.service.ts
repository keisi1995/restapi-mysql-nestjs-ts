import { Inject, Injectable } from '@nestjs/common';
import { AppConfig } from './interfaces/app-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(
    private configService: ConfigService,
    @Inject('APP_CONFIG') private appConfig: AppConfig,
  ) { }

  getHello(): AppConfig {
    // return 'Hello World xd!';
    return this.appConfig;
  }

  getPort(): number {
    return this.configService.get<number>('APP_ENV');
  }
}
