import { UserEntity } from 'src/modules/user/entities/user.entity';
import { MerchantEntity } from 'src/modules/merchant/entities/merchant.entity';

export interface IUserMerchant {
	id: number,
	user: UserEntity;
	merchant: MerchantEntity;
	created_at: Date;
	updated_at: Date;
}
