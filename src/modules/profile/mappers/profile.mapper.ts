import { ProfileEntity } from '../entities/profile.entity';
import { ResponseProfileDTO } from '../dto/response-profile.dto';
import { CreateProfileDTO } from '../dto/create-profile.dto';
import { UpdateProfileDTO } from '../dto/update-profile.dto';

export class ProfileMapper {

	static toDto(profile: ProfileEntity): ResponseProfileDTO {
		return {
			id: profile.id,
			name: profile.name,
			status: profile.status,
			users: profile.users,
			createdAt: profile.created_at,
			updatedAt: profile.updated_at,
		};
	}

	static async toEntityCreate(createProfileDto: CreateProfileDTO): Promise<ProfileEntity> {
		const profileEntity = new ProfileEntity();
		profileEntity.name = createProfileDto.name;
		profileEntity.status = createProfileDto.status;

		return profileEntity;
	}

	static async toEntityUpdate(updateProfileDto: UpdateProfileDTO, existingProfile: ProfileEntity): Promise<ProfileEntity> {
		const profileEntity = { ...existingProfile, ...updateProfileDto };
		return profileEntity;
	}

	static mapToDto(objEntity: ProfileEntity[]): ResponseProfileDTO[] {
		return objEntity.map((userEntity: ProfileEntity) => this.toDto(userEntity));
	}

	static mapToDtoSingle(objEntity: ProfileEntity): ResponseProfileDTO {
		return this.toDto(objEntity);
	}
}