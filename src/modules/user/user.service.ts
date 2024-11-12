import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { UserEntity } from './entities/user.entity';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ResponseUserDTO } from './dto/response-user.dto';
import { ResponseUserMerchantDTO } from './dto/response-user_merchant.dto';

import { UserMapper } from './mappers/user.mapper';
import { UserMerchantMapper } from './mappers/user_merchant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,

		@InjectRepository(ProfileEntity)
		private readonly profileRepository: Repository<ProfileEntity>,

		private configService: ConfigService,
	) { }

	getPort(): string {
		return this.configService.get<string>('API_NAME');
	}

	private async findOrFail(id: number): Promise<UserEntity> {
		const user = await this.userRepository.findOne({ where: { id } });

		if (!user) throw new NotFoundException('Usuario no encontrado');
		return user;
	}

	async filter(email: string): Promise<ResponseUserDTO[]> {
		const where: any = {
			...(email && { email })
		};

		const users = await this.userRepository.find({ where });
		return UserMapper.mapToDto(users);
	}

	async paginate(options: IPaginationOptions): Promise<Pagination<ResponseUserDTO>> {
		const paginatedResult = await paginate<UserEntity>(this.userRepository, options);
		const usersMap = UserMapper.mapToDto(paginatedResult.items);

		return new Pagination<ResponseUserDTO>(usersMap, paginatedResult.meta, paginatedResult.links);
	}

	async findAll(): Promise<ResponseUserDTO[]> {
		const users = await this.userRepository.find();

		return UserMapper.mapToDto(users);
	}

	async findOne(id: number): Promise<ResponseUserDTO> {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ['profile'],
		});

		if (!user) throw new NotFoundException('Usuario no encontrado');

		return UserMapper.mapToDtoSingle(user);
	}

	async findOneMerchant(id: number): Promise<ResponseUserMerchantDTO> {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ['profile', 'userMerchants', 'userMerchants.merchant'],
		});

		if (!user) throw new NotFoundException('Usuario no encontrado');

		return UserMerchantMapper.mapToDtoSingle(user);
	}

	async findOneByEmail(email: string): Promise<UserEntity> {
		const user = await this.userRepository.findOne({ where: { email } });

		if (!user) throw new BadRequestException('Usuario no encontrado');

		return user;
	}

	async create(createUserDto: CreateUserDTO): Promise<ResponseUserDTO> {
		const userExists = await this.userRepository.findOneBy({ email: createUserDto.email });

		if (userExists) throw new BadRequestException('El usuario ya se encuentra registrado');

		const profile = await this.profileRepository.findOneBy({
			name: createUserDto.profile,
		});

		if (!profile) { throw new BadRequestException('Perfil no encontrado'); }

		const userEntity = await UserMapper.toEntityCreate(createUserDto, profile);
		const savedUser = await this.userRepository.save(userEntity);

		return UserMapper.mapToDtoSingle(savedUser);
	}

	async update(id: number, updateUserDto: UpdateUserDTO): Promise<ResponseUserDTO> {
		const existingUser = await this.findOrFail(id);

		if (updateUserDto.email) {
			const userWithSameEmail = await this.userRepository.findOne({
				where: { email: updateUserDto.email },
			});

			if (userWithSameEmail && userWithSameEmail.id !== id) {
				throw new BadRequestException('El correo ya está registrado en otro usuario');
			}
		}

		let profile = existingUser.profile;
		if (updateUserDto.profile) {
			profile = await this.profileRepository.findOneBy({
				name: String(updateUserDto.profile),
			});

			if (!profile) {
				throw new BadRequestException('Perfil no encontrado');
			}
		}

		const userUpdate: Partial<UserEntity> = {
			...existingUser,
			...updateUserDto,
			profile,
		};

		const updatedUserEntity: UserEntity = await UserMapper.toEntityUpdate(userUpdate);
		const updatedUser = await this.userRepository.save(updatedUserEntity);

		return UserMapper.mapToDtoSingle(updatedUser);
	}


	async remove(id: number): Promise<ResponseUserDTO> {
		const user = await this.findOrFail(id);
		await this.userRepository.softDelete(id);

		return UserMapper.mapToDtoSingle(user);
	}

}
