import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { ProfileEntity } from './entities/profile.entity';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { ResponseProfileDTO } from './dto/response-profile.dto';
import { ProfileMapper } from './mappers/profile.mapper';

@Injectable()
export class ProfileService {

	constructor(
		@InjectRepository(ProfileEntity)
		private readonly profileRepository: Repository<ProfileEntity>,
	) { }

	private async findOrFail(id: number): Promise<ProfileEntity> {
		const profile = await this.profileRepository.findOne({ where: { id } });
		if (!profile) throw new NotFoundException('Perfil no encontrado');
		return profile;
	}

	async filter(name: string): Promise<ResponseProfileDTO[]> {
		const where: any = {
			...(name && { name: Like(`%${name}%`) }),
		};

		const profiles = await this.profileRepository.find({ where });
		return ProfileMapper.mapToDto(profiles);
	}

	async paginate(options: IPaginationOptions): Promise<Pagination<ResponseProfileDTO>> {
		const paginatedResult = await paginate<ProfileEntity>(this.profileRepository, options);
		const profiles = ProfileMapper.mapToDto(paginatedResult.items);

		return new Pagination<ResponseProfileDTO>(profiles, paginatedResult.meta, paginatedResult.links);
	}

	async findAll(): Promise<ResponseProfileDTO[]> {
		const profiles = await this.profileRepository.find({
			relations: ['users']
		});

		const respt = ProfileMapper.mapToDto(profiles);
		console.log(respt);
		return respt;
	}

	async findOne(id: number): Promise<ResponseProfileDTO> {
		const profile = await this.profileRepository.findOne({
			where: { id },
			relations: ['users'],
		});

		if (!profile) throw new NotFoundException('Perfil no encontrado');

		return ProfileMapper.mapToDtoSingle(profile);
	}

	async create(createProfileDto: CreateProfileDTO): Promise<ResponseProfileDTO> {
		const profileExists = await this.profileRepository.findOneBy({ name: createProfileDto.name });

		if (profileExists) throw new BadRequestException('El perfil ya se encuentra registrado');

		const profileEntity = await ProfileMapper.toEntityCreate(createProfileDto);
		const savedProfile = await this.profileRepository.save(profileEntity);

		return ProfileMapper.mapToDtoSingle(savedProfile);
	}

	async update(id: number, updateProfileDto: UpdateProfileDTO): Promise<ResponseProfileDTO> {
		const existingProfile = await this.findOrFail(id);
		const validatedProfile = updateProfileDto.name && await this.profileRepository.findOne({ where: { name: updateProfileDto.name } });

		if (validatedProfile.id !== id) {
			throw new BadRequestException('El ya se encuentra en otro registro');
		}

		const updatedProfileEntity: ProfileEntity = await ProfileMapper.toEntityUpdate(updateProfileDto, existingProfile);
		const updatedUser = await this.profileRepository.save(updatedProfileEntity);

		return ProfileMapper.mapToDtoSingle(updatedUser);
	}

	async remove(id: number): Promise<ResponseProfileDTO> {
		const profile = await this.findOrFail(id);
		await this.profileRepository.delete(id);

		return ProfileMapper.mapToDtoSingle(profile);
	}

}
