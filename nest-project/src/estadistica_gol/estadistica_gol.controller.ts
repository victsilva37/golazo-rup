import { Controller, Param, Post, Get } from '@nestjs/common';
import { EstadisticaGolService } from './estadistica_gol.service';

@Controller('estadistica-gol')
export class EstadisticaGolController {
  constructor(private readonly estadisticaService: EstadisticaGolService) {}

  // Panel global: TODAS las categorías con estado (asignada/goles/jugador)
  @Get('panel')
  async panel() {
    return this.estadisticaService.getPanel();
  }

  @Post('actualizar/:id_jugador/:id_categoria')
  async actualizarGoles(
    @Param('id_jugador') id_jugador: number,
    @Param('id_categoria') id_categoria: number,
  ) {
    const estadistica = await this.estadisticaService.actualizarGolesJugadorCategoria(
      Number(id_jugador),
      Number(id_categoria),
    );
    return { goles: estadistica.goles }; // el frontend multiplica por el multiplicador visualmente
  }
}
