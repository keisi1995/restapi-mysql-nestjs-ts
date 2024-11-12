import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileEntity } from './entities/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ProfileEntity])
	],
	exports: [
	],
	controllers: [ProfileController],
	providers: [ProfileService],
})
export class ProfileModule { }
