import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchantDTO } from './create-merchant.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMerchantDTO extends PartialType(CreateMerchantDTO) {
	@ApiPropertyOptional()
	name: string;

	@ApiPropertyOptional()
	address: string;

	@ApiPropertyOptional()
	mcc: string;

	@ApiPropertyOptional()
	ruc: string;
}