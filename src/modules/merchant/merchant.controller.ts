import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { MerchantService } from './merchant.service';
import { CreateMerchantDTO } from './dto/create-merchant.dto';
import { UpdateMerchantDTO } from './dto/update-merchant.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { CreateMerchantSwagger, UpdateMerchantSwagger, FindAllMerchantSwagger, FindByIdMerchantSwagger, DeleteMerchantSwagger } from './docs/merchant.swagger';

@ApiTags('Negocio')
@ApiExtraModels(CreateMerchantDTO)
@ApiBearerAuth('JWT-auth')

@UseGuards(AuthGuard)
@Controller('merchant')
export class MerchantController {

	constructor(private readonly merchantService: MerchantService) { }

	@CreateMerchantSwagger()
	@Post()
	create(@Body() createMerchantDto: CreateMerchantDTO) {
		return this.merchantService.create(createMerchantDto);
	}

	@FindAllMerchantSwagger()
	@Get()
	findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('name') name: string) {
		limit = limit > 100 ? 100 : limit;

		if (name) {
			return this.merchantService.filter(name);
		}

		return this.merchantService.paginate({
			limit: Number(limit) || 10,
			page: Number(page) || 1,
			route: `${process.env.API_URL}/merchant`,
		});
	}

	@FindByIdMerchantSwagger()
	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.merchantService.findOne(id);
	}

	@UpdateMerchantSwagger()
	@Patch(':id')
	update(@Param('id') id: number, @Body() updateMerchantDto: UpdateMerchantDTO) {
		return this.merchantService.update(id, updateMerchantDto);
	}

	@DeleteMerchantSwagger()
	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.merchantService.remove(id);
	}
}
