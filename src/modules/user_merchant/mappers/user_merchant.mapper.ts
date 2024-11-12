import { UserMerchantEntity } from '../entities/user_merchant.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { MerchantEntity } from 'src/modules/merchant/entities/merchant.entity';

import { ResponseUserMerchantDTO } from '../dto/response-user_merchant.dto';

export class UserMerchantMapper {

	static toDto(userMerchant: UserMerchantEntity): ResponseUserMerchantDTO {
		return {
			id: userMerchant.id,
			user: userMerchant.user,
			merchant: userMerchant.merchant,
			createdAt: userMerchant.created_at,
			updatedAt: userMerchant.updated_at
		};
	}

	static async toEntityCreate(user: UserEntity, merchant: MerchantEntity): Promise<UserMerchantEntity> {
		const userMerchantEntity = new UserMerchantEntity();
		userMerchantEntity.user = user;
		userMerchantEntity.merchant = merchant;

		return userMerchantEntity;
	}

	static mapToDto(userMerchants: UserMerchantEntity[]): ResponseUserMerchantDTO[] {
		return userMerchants.map((userMerchant: UserMerchantEntity) => this.toDto(userMerchant));
	}

	static mapToDtoSingle(userMerchant: UserMerchantEntity): ResponseUserMerchantDTO {
		return this.toDto(userMerchant);
	}
}