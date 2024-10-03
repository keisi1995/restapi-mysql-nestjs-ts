import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../entities/user.entity';
import { ResponseUserDto } from '../dto/response-user.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';

export class UserMapper {

	static toDto(user: UserEntity): ResponseUserDto {
		return {
			id: user.id,
			name: `${user.nombre}`,
			email: user.correo,
		};
	}

	static async toEntityCreate(createUserDto: CreateUserDTO): Promise<UserEntity> {
		const userEntity = new UserEntity();
		userEntity.nombre = createUserDto.nombre;
		userEntity.correo = createUserDto.correo;

		const salt = await bcrypt.genSalt(10);
		userEntity.clave = await bcrypt.hash(createUserDto.clave, salt);
		return userEntity;
	}

	static async toEntityUpdate(updateUserDto: UpdateUserDTO, existingUser: UserEntity): Promise<UserEntity> {
		const userEntity = { ...existingUser };

		if (updateUserDto.nombre) userEntity.nombre = updateUserDto.nombre;
		if (updateUserDto.correo) userEntity.correo = updateUserDto.correo;

		if (updateUserDto.clave) {
			const salt = await bcrypt.genSalt(10);
			userEntity.clave = await bcrypt.hash(updateUserDto.clave, salt);
		}

		return userEntity;
	}

	static mapToDto(users: UserEntity[]): ResponseUserDto[] {
		return users.map((userEntity: UserEntity) => this.toDto(userEntity));
	}

	static mapToDtoSingle(user: UserEntity): ResponseUserDto {
		return this.toDto(user);
	}
}