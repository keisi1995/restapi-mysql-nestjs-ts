import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { UserMerchantService } from './user_merchant.service';
import { CreateUserMerchantDTO } from './dto/create-user_merchant.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
// import { CreateMerchantSwagger, UpdateMerchantSwagger, FindAllMerchantSwagger, FindByIdMerchantSwagger, DeleteMerchantSwagger } from './docs/merchant.swagger';

@ApiTags('Usuario Negocios')
@ApiExtraModels(CreateUserMerchantDTO)
@ApiBearerAuth('JWT-auth')

@UseGuards(AuthGuard)
@Controller('users-merchants')
export class UserMerchantController {

	constructor(private readonly userMerchantService: UserMerchantService) { }

	// @CreateMerchantSwagger()
	@Post()
	create(@Body() createUserMerchantDto: CreateUserMerchantDTO) {
		return this.userMerchantService.create(createUserMerchantDto);
	}

	// @FindByIdMerchantSwagger()
	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.userMerchantService.findOne(id);
	}

	// @DeleteMerchantSwagger()
	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.userMerchantService.remove(id);
	}
}
