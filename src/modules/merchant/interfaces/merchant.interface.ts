import { UserMerchantEntity } from 'src/modules/user_merchant/entities/user_merchant.entity';

export interface IMerchant {
	id: number;
	name: string;
	address: string;
	mcc: string;
	ruc: string;
	created_at: Date;
	updated_at: Date;
}
