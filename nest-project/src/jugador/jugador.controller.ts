import { Controller, Get, Param } from '@nestjs/common';
import { JugadorService } from './jugador.service';

@Controller('jugadores')
export class JugadorController {
  constructor(private readonly jugadorService: JugadorService) {}

  // Endpoint para disparar la carga iterativa desde la API
    @Get('cargar')
    async cargarJugadores(): Promise<string> {
        await this.jugadorService.cargarJugadoresIterativo();
        return 'Carga de jugadores iniciada';
    }

  // Endpoint para listar todos los jugadores almacenados
    @Get()
    async listarJugadores(): Promise<any> {
        return await this.jugadorService.listarJugadores();
    }

}
