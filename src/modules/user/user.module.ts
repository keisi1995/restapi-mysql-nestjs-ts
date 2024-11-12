import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileModule } from 'src/modules/profile/profile.module';
import { ProfileEntity } from '../profile/entities/profile.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity, ProfileEntity]),
	],
	exports: [
		UserService,
	],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule { }
