import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserMerchantEntity } from './entities/user_merchant.entity';
import { UserMerchantController } from './user_merchant.controller';
import { UserMerchantService } from './user_merchant.service';

import { UserModule } from 'src/modules/user/user.module';
import { MerchantModule } from 'src/modules/merchant/merchant.module';
import { UserEntity } from '../user/entities/user.entity';
import { MerchantEntity } from '../merchant/entities/merchant.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserMerchantEntity, UserEntity, MerchantEntity]),
	],
	controllers: [UserMerchantController],
	providers: [UserMerchantService],
})

export class UserMerchantModule { }
