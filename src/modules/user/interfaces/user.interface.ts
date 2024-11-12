import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { UserMerchantEntity } from 'src/modules/user_merchant/entities/user_merchant.entity';

export interface IUser {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	is_active: boolean;
	profile: ProfileEntity;
	userMerchants: UserMerchantEntity[];
	created_at: Date;
	updated_at: Date;
}
