import { Controller, Get, Param } from '@nestjs/common';
import { CategoriaService } from './categoria.service';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  // Endpoint para listar todas las categorías
  @Get()
  async listarCategorias() {
    return await this.categoriaService.listarCategorias();
  }

}
