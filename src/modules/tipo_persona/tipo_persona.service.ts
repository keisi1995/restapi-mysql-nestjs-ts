import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult, DeleteResult } from 'typeorm';
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
      relations: ['personas'],
    });
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<TipoPersona>> {
    return paginate<TipoPersona>(this.tipoPersonaRepository, options);
  }

  async findAll(): Promise<TipoPersona[]> {
    return this.tipoPersonaRepository.find({
      relations: ['personas'],
    });
  }

  async findOne(id: number): Promise<TipoPersona> {
    const tipoPersona = await this.tipoPersonaRepository.findOne({
      where: { id },
      relations: ['personas'],
    });

    if (!tipoPersona) { throw new BadRequestException('Tipo persona no encontrado'); }

    return tipoPersona;
  }

  async create(createTipoPersonaDto: CreateTipoPersonaDTO): Promise<TipoPersona> {
    const tipoPersona: TipoPersona = await this.tipoPersonaRepository.findOneBy({
      descripcion: createTipoPersonaDto.descripcion,
    });

    if (tipoPersona) { throw new BadRequestException('El Tipo de persona ya se encuentra registrado'); }

    const tipoPersonaCreate = this.tipoPersonaRepository.create(createTipoPersonaDto);

    return this.tipoPersonaRepository.save(tipoPersonaCreate);
  }

  async update(id: number, updateTipoPersona: UpdateTipoPersonaDTO): Promise<UpdateResult> {
    const tipoPersona = await this.tipoPersonaRepository.findOneBy({ id });

    if (!tipoPersona) { throw new BadRequestException('Tipo de persona no encontrado'); }

    const tipoPersonaUpdate = {
      ...updateTipoPersona
    };

    return this.tipoPersonaRepository.update(id, tipoPersonaUpdate);
  }

  async remove(id: number): Promise<DeleteResult> {
    const tipoPersona = await this.tipoPersonaRepository.findOneBy({ id });

    if (!tipoPersona) { throw new BadRequestException('Tipo de persona no encontrado'); }

    return this.tipoPersonaRepository.softDelete(id);
  }

}
