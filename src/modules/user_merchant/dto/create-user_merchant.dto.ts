import { IsString, MinLength, MaxLength, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserMerchantDTO {
	@ApiProperty()
	@IsNumber()
	user_id: number;

	@ApiProperty()
	@IsNumber()
	merchant_id: number;
}
