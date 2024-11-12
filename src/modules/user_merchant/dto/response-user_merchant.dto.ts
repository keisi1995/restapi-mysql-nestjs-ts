import { UserEntity } from 'src/modules/user/entities/user.entity';
import { MerchantEntity } from 'src/modules/merchant/entities/merchant.entity';

export class ResponseUserMerchantDTO {
	id: number;
	user: UserEntity;
	merchant: MerchantEntity;
	createdAt: Date;
	updatedAt: Date;
}