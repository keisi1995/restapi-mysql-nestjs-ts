import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult, DeleteResult } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { Persona } from './entities/persona.entity';
import { TipoPersona } from 'src/tipo_persona/entities/tipo_persona.entity';
import { CreatePersonaDTO, UpdatePersonaDTO } from './dto/persona.dto';
import { Gender } from '../constants/gender';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,

    @InjectRepository(TipoPersona)
    private readonly tipoPersonaRepository: Repository<TipoPersona>,
  ) { }

  async filter(nombres: string, genero: Gender): Promise<Persona[]> {
    return this.personaRepository.find({
      where: {
        nombres: nombres && Like(`%${nombres}%`),
        genero
      },
      relations: ['tipo_persona'],
    });
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Persona>> {
    return paginate<Persona>(this.personaRepository, options);
  }

  async findAll(): Promise<Persona[]> {
    return this.personaRepository.find();
  }

  async findOne(id: number): Promise<Persona> {
    const persona = await this.personaRepository.findOne({
      where: { id },
      relations: ['tipo_persona'],
    });

    if (!persona) { throw new BadRequestException('Persona no encontrada'); }

    return persona;
  }

  async create(createPersonaDto: CreatePersonaDTO): Promise<Persona> {
    const tipoPersona: TipoPersona = await this.tipoPersonaRepository.findOneBy({
      descripcion: createPersonaDto.tipo_persona,
    });

    if (!tipoPersona) { throw new BadRequestException('Tipo persona no encontrado'); }

    const personaCreate: Persona = this.personaRepository.create({
      ...createPersonaDto,
      tipo_persona: tipoPersona,
    });

    return this.personaRepository.save(personaCreate);
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDTO): Promise<UpdateResult> {
    const persona = await this.personaRepository.findOneBy({ id });

    if (!persona) { throw new BadRequestException('Persona no encontrada'); }

    const tipoPersona: TipoPersona = await this.tipoPersonaRepository.findOneBy({
      descripcion: updatePersonaDto.tipo_persona,
    });

    if (!tipoPersona) { throw new BadRequestException('Tipo persona no encontrado'); }

    const personaUpdate = {
      ...updatePersonaDto,
      tipo_persona: tipoPersona
    };

    return this.personaRepository.update(id, personaUpdate);
  }

  async remove(id: number): Promise<DeleteResult> {
    const persona = await this.personaRepository.findOneBy({ id });

    if (!persona) { throw new BadRequestException('Persona no encontrada'); }

    return this.personaRepository.softDelete(id);
  }

}
