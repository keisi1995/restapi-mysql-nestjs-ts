import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserMerchantEntity } from './entities/user_merchant.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { MerchantEntity } from 'src/modules/merchant/entities/merchant.entity';
import { CreateUserMerchantDTO } from './dto/create-user_merchant.dto';
import { ResponseUserMerchantDTO } from './dto/response-user_merchant.dto';
import { UserMerchantMapper } from './mappers/user_merchant.mapper';

@Injectable()
export class UserMerchantService {

	constructor(
		@InjectRepository(UserMerchantEntity)
		private readonly userMerchantRepository: Repository<UserMerchantEntity>,

		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,

		@InjectRepository(MerchantEntity)
		private readonly merchantRepository: Repository<MerchantEntity>,
	) { }

	private async findOrFail(id: number): Promise<UserMerchantEntity> {
		const userMerchant = await this.userMerchantRepository.findOne({
			where: { id },
			relations: ['user', 'merchant'],
		});

		if (!userMerchant) throw new NotFoundException('Usuario Negocio no encontrado');
		return userMerchant;
	}

	async findAll(): Promise<ResponseUserMerchantDTO[]> {
		const userMerchants = await this.userMerchantRepository.find();
		return UserMerchantMapper.mapToDto(userMerchants);
	}

	async findOne(id: number): Promise<ResponseUserMerchantDTO> {
		const userMerchant = await this.findOrFail(id);
		return UserMerchantMapper.mapToDtoSingle(userMerchant);
	}

	async create(createUserMerchantDto: CreateUserMerchantDTO): Promise<ResponseUserMerchantDTO> {
		const userExists = await this.userRepository.findOneBy({ id: createUserMerchantDto.user_id });
		if (!userExists) throw new BadRequestException('El usuario no existe');

		const merchantExists = await this.merchantRepository.findOneBy({ id: createUserMerchantDto.merchant_id });
		if (!merchantExists) throw new BadRequestException('El negocio no existe');

		const userMerchantEntity = await UserMerchantMapper.toEntityCreate(userExists, merchantExists);
		const savedUserMerchant = await this.userMerchantRepository.save(userMerchantEntity);
		return UserMerchantMapper.mapToDtoSingle(savedUserMerchant);
	}

	async remove(id: number): Promise<ResponseUserMerchantDTO> {
		const userMerchant = await this.findOrFail(id);
		await this.userMerchantRepository.delete(id);

		return UserMerchantMapper.mapToDtoSingle(userMerchant);
	}

}
