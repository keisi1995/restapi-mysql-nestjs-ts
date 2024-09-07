import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { TipoPersona } from './entities/tipo_persona.entity';
import { CreateTipoPersonaDTO, UpdateTipoPersonaDTO } from './dto/tipo_persona.dto';

@Injectable()
export class TipoPersonaService {

  constructor(
    @InjectRepository(TipoPersona)
    private readonly tipoPersonaRepository: Repository<TipoPersona>,
  ) { }

  async filter(descripcion: string): Promise<TipoPersona[]> {
    return this.tipoPersonaRepository.find({
      where: {
        descripcion: descripcion && Like(`%${descripcion}%`)
      },
    });
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<TipoPersona>> {
    return paginate<TipoPersona>(this.tipoPersonaRepository, options);
  }

  // async findAll() {
  //   return await this.tipoPersonaRepository.find();
  // }

  async findOne(id: number) {
    const tipo_persona = await this.tipoPersonaRepository.findOne({
      where: { id },
      relations: ['personas'],
    });

    if (!tipo_persona) { throw new BadRequestException('Tipo persona no encontrado'); }
    return tipo_persona;
  }

  async create(createTipoPersonaDto: CreateTipoPersonaDTO) {
    const tipo_persona = this.tipoPersonaRepository.create(createTipoPersonaDto);
    return await this.tipoPersonaRepository.save(tipo_persona);
  }

  async update(id: number, updatePlanetDto: UpdateTipoPersonaDTO) {
    const tipo_persona = await this.tipoPersonaRepository.findOneBy({ id });

    if (!tipo_persona) { throw new BadRequestException('Tipo de persona no encontrado'); }

    const updatedPlanet = { ...updatePlanetDto };

    return await this.tipoPersonaRepository.update(id, updatedPlanet);
  }

  async remove(id: number) {
    const tipo_persona = await this.tipoPersonaRepository.findOneBy({ id });

    if (!tipo_persona) { throw new BadRequestException('Tipo de persona no encontrado'); }

    return await this.tipoPersonaRepository.softDelete(id);
  }

}
