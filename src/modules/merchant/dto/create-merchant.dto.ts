import { IsString, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMerchantDTO {
	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(5)
	@MaxLength(30)
	name: string;

	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(5)
	@MaxLength(50)
	address: string;

	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(5)
	@MaxLength(20)
	mcc: string;

	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(11)
	@MaxLength(11)
	ruc: string;
}
