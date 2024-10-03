import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { UserEntity } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ResponseUserDto } from '../../modules/user/dto/response-user.dto';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) { }

	private async getUserOrFail(id: number): Promise<UserEntity> {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user) throw new NotFoundException('Usuario no encontrado');
		return user;
	}

	async filter(nombre: string, correo: string): Promise<ResponseUserDto[]> {
		const where: any = {
			...(nombre && { nombre: Like(`%${nombre}%`) }),
			...(correo && { correo })
		};

		const users = await this.userRepository.find({ where });
		return UserMapper.mapToDto(users);
	}

	async paginate(options: IPaginationOptions): Promise<Pagination<ResponseUserDto>> {
		const paginatedResult = await paginate<UserEntity>(this.userRepository, options);
		const usersMap = UserMapper.mapToDto(paginatedResult.items);

		return new Pagination<ResponseUserDto>(usersMap, paginatedResult.meta, paginatedResult.links);
	}

	async findAll(): Promise<ResponseUserDto[]> {
		const users = await this.userRepository.find();

		return UserMapper.mapToDto(users);
	}

	async findOne(id: number): Promise<ResponseUserDto> {
		const user = await this.getUserOrFail(id);
		return UserMapper.mapToDtoSingle(user);
	}

	async findOneByEmail(correo: string): Promise<UserEntity> {
		const user = await this.userRepository.findOne({ where: { correo } });

		if (!user) throw new BadRequestException('Usuario no encontrado');

		return user;
	}

	async create(createUserDto: CreateUserDTO): Promise<ResponseUserDto> {
		const userExists = await this.userRepository.findOneBy({ correo: createUserDto.correo });

		if (userExists) throw new BadRequestException('El usuario ya se encuentra registrado');

		const userEntity = await UserMapper.toEntityCreate(createUserDto);
		const savedUser = await this.userRepository.save(userEntity);

		return UserMapper.mapToDtoSingle(savedUser);
	}

	async update(id: number, updateUserDto: UpdateUserDTO): Promise<ResponseUserDto> {
		const existingUser = await this.getUserOrFail(id);
		const userWithSameEmail = updateUserDto.correo && await this.userRepository.findOne({ where: { correo: updateUserDto.correo } });

		if (userWithSameEmail && userWithSameEmail.id !== id) {
			throw new BadRequestException('El correo ya está registrado en otro usuario');
		}

		const updatedUserEntity: UserEntity = await UserMapper.toEntityUpdate(updateUserDto, existingUser);
		const updatedUser = await this.userRepository.save(updatedUserEntity);

		return UserMapper.mapToDtoSingle(updatedUser);
	}

	async remove(id: number): Promise<ResponseUserDto> {
		const user = await this.getUserOrFail(id);
		await this.userRepository.softDelete(id);

		return UserMapper.mapToDtoSingle(user);
	}

}
