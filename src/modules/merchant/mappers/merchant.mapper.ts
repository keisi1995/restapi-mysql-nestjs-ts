import { MerchantEntity } from '../entities/merchant.entity';
import { ResponseMerchantDTO } from '../dto/response-merchant.dto';
import { CreateMerchantDTO } from '../dto/create-merchant.dto';
import { UpdateMerchantDTO } from '../dto/update-merchant.dto';

export class ProfileMapper {

	static toDto(profile: MerchantEntity): ResponseMerchantDTO {
		return {
			id: profile.id,
			name: profile.name,
			address: profile.address,
			mcc: profile.mcc,
			ruc: profile.ruc,
			createdAt: profile.created_at,
			updatedAt: profile.updated_at,
		};
	}

	static async toEntityCreate(createMerchantDto: CreateMerchantDTO): Promise<MerchantEntity> {
		const merchantEntity = new MerchantEntity();
		merchantEntity.name = createMerchantDto.name;
		merchantEntity.address = createMerchantDto.address;
		merchantEntity.mcc = createMerchantDto.mcc;
		merchantEntity.ruc = createMerchantDto.ruc;

		return merchantEntity;
	}

	static async toEntityUpdate(updateMerchantDto: UpdateMerchantDTO, existingMerchant: MerchantEntity): Promise<MerchantEntity> {
		const merchantEntity = { ...existingMerchant, ...updateMerchantDto };
		return merchantEntity;
	}

	static mapToDto(objEntity: MerchantEntity[]): ResponseMerchantDTO[] {
		return objEntity.map((obj) => this.toDto(obj));
	}

	static mapToDtoSingle(objEntity: MerchantEntity): ResponseMerchantDTO {
		return this.toDto(objEntity);
	}
}