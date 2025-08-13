import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  // Devuelve todas las categorías con nombre y multiplicador
  async listarCategorias(): Promise<{ nombre: string; multiplicador: number }[]> {
    const categorias = await this.categoriaRepository.find();
    return categorias.map(c => ({
      nombre: c.nombre,
      multiplicador: c.multiplicador,
    }));
  }
}