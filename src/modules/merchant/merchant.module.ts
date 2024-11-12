import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MerchantEntity } from './entities/merchant.entity';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([MerchantEntity])
	],
	exports: [
	],
	controllers: [MerchantController],
	providers: [MerchantService],
})
export class MerchantModule { }
