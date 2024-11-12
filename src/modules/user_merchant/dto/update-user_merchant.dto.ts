import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMerchantDTO } from './create-user_merchant.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserMerchantDTO extends PartialType(CreateUserMerchantDTO) {
	@ApiPropertyOptional()
	user_id: number;

	@ApiPropertyOptional()
	merchant_id: number;
}