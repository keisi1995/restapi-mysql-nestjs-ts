import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../entities/user.entity';
import { ResponseUserDTO } from '../dto/response-user.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';

export class UserMapper {

	static toDto(user: UserEntity): ResponseUserDTO {
		return {
			userid: user.id,
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email,
			isActive: user.is_active,
			profile: user.profile
		};
	}

	static async toEntityCreate(createUserDto: CreateUserDTO, profile: ProfileEntity): Promise<UserEntity> {
		const userEntity = new UserEntity();
		userEntity.first_name = createUserDto.first_name;
		userEntity.last_name = createUserDto.last_name;
		userEntity.email = createUserDto.email;
		userEntity.is_active = true;
		userEntity.profile = profile;

		const salt = await bcrypt.genSalt(10);
		userEntity.password = await bcrypt.hash(createUserDto.password, salt);
		return userEntity;
	}

	static async toEntityUpdate(updateUserDto: Partial<UserEntity>): Promise<UserEntity> {
		const updatedEntity = new UserEntity();

		Object.assign(updatedEntity, updateUserDto);

		if (updateUserDto.password) {
			updatedEntity.password = await bcrypt.hash(updateUserDto.password, 10);
		}

		return updatedEntity;
	}

	static mapToDto(users: UserEntity[]): ResponseUserDTO[] {
		return users.map((userEntity: UserEntity) => this.toDto(userEntity));
	}

	static mapToDtoSingle(user: UserEntity): ResponseUserDTO {
		return this.toDto(user);
	}
}