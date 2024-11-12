import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { MerchantEntity } from './entities/merchant.entity';
import { CreateMerchantDTO } from './dto/create-merchant.dto';
import { UpdateMerchantDTO } from './dto/update-merchant.dto';
import { ResponseMerchantDTO } from './dto/response-merchant.dto';
import { ProfileMapper } from './mappers/merchant.mapper';

@Injectable()
export class MerchantService {

	constructor(
		@InjectRepository(MerchantEntity)
		private readonly merchantRepository: Repository<MerchantEntity>,
	) { }

	private async findOrFail(id: number): Promise<MerchantEntity> {
		const merchant = await this.merchantRepository.findOne({ where: { id } });
		if (!merchant) throw new NotFoundException('Negocio no encontrado');
		return merchant;
	}

	async filter(name: string): Promise<ResponseMerchantDTO[]> {
		const where: any = {
			...(name && { name: Like(`%${name}%`) }),
		};

		const profiles = await this.merchantRepository.find({ where });
		return ProfileMapper.mapToDto(profiles);
	}

	async paginate(options: IPaginationOptions): Promise<Pagination<ResponseMerchantDTO>> {
		const paginatedResult = await paginate<MerchantEntity>(this.merchantRepository, options);
		const profilesMap = ProfileMapper.mapToDto(paginatedResult.items);

		return new Pagination<ResponseMerchantDTO>(profilesMap, paginatedResult.meta, paginatedResult.links);
	}

	async findAll(): Promise<ResponseMerchantDTO[]> {
		const profiles = await this.merchantRepository.find();
		return ProfileMapper.mapToDto(profiles);
	}

	async findOne(id: number): Promise<ResponseMerchantDTO> {
		const profile = await this.findOrFail(id);
		return ProfileMapper.mapToDtoSingle(profile);
	}

	async create(createProfileDto: CreateMerchantDTO): Promise<ResponseMerchantDTO> {
		const profileExists = await this.merchantRepository.findOneBy({ name: createProfileDto.name });

		if (profileExists) throw new BadRequestException('El perfil ya se encuentra registrado');

		const profileEntity = await ProfileMapper.toEntityCreate(createProfileDto);
		const savedProfile = await this.merchantRepository.save(profileEntity);

		return ProfileMapper.mapToDtoSingle(savedProfile);
	}

	async update(id: number, updateProfileDto: UpdateMerchantDTO): Promise<ResponseMerchantDTO> {
		const existingProfile = await this.findOrFail(id);
		const validatedProfile = updateProfileDto.name && await this.merchantRepository.findOne({ where: { name: updateProfileDto.name } });

		if (validatedProfile.id !== id) {
			throw new BadRequestException('El ya se encuentra en otro registro');
		}

		const updatedProfileEntity: MerchantEntity = await ProfileMapper.toEntityUpdate(updateProfileDto, existingProfile);
		const updatedUser = await this.merchantRepository.save(updatedProfileEntity);

		return ProfileMapper.mapToDtoSingle(updatedUser);
	}

	async remove(id: number): Promise<ResponseMerchantDTO> {
		const profile = await this.findOrFail(id);
		await this.merchantRepository.delete(id);

		return ProfileMapper.mapToDtoSingle(profile);
	}

}
