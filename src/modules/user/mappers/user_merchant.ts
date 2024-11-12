import { UserEntity } from '../entities/user.entity';
import { ResponseUserMerchantDTO } from '../dto/response-user_merchant.dto';

export class UserMerchantMapper {

	static toDto(user: UserEntity): ResponseUserMerchantDTO {
		return {
			userid: user.id,
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email,
			isActive: user.is_active,
			type: user.profile.name,
			merchants: user.userMerchants.map(userMerchant => ({
				merchantId: userMerchant.id,
				name: userMerchant.merchant.name,
				address: userMerchant.merchant.address,
			}))
		};
	}


	static mapToDtoSingle(user: UserEntity): ResponseUserMerchantDTO {
		return this.toDto(user);
	}

	static mapToDto(users: UserEntity[]): ResponseUserMerchantDTO[] {
		return users.map((userEntity) => this.toDto(userEntity));
	}

}