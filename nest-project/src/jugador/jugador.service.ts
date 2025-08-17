// jugador.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jugador } from './jugador.entity';
import { firstValueFrom } from 'rxjs';
import 'dotenv/config'

@Injectable()
export class JugadorService implements OnModuleInit{
  private readonly logger = new Logger(JugadorService.name);
  private readonly apiToken = process.env.API_TOKEN; // Reemplaza con tu token real
  private readonly baseUrl = 'https://v3.football.api-sports.io/players'; // Cambia por la URL real

  constructor(
    @InjectRepository(Jugador)
    private jugadorRepository: Repository<Jugador>,
    private httpService: HttpService,
  ) {}


  // Método para obtener datos de un jugador y temporada
  private async fetchJugadorByIdAndSeason(id: number, season: number): Promise<Jugador | null> {
    const headers = {
      'x-apisports-key': this.apiToken,
    };

    try {
      const url = `${this.baseUrl}?id=${id}&season=${season}`;
      const response$ = this.httpService.get(url, { headers });
      const response = await firstValueFrom(response$);

      if (response.data && response.data.results > 0) {
        const data = response.data.response[0].player;

        return {
          id_jugador: data.id,
          nombre_jugador: data.name,
          foto_jugador: data.photo,
          estadisticasGoles: []
        };
      }
      // Si no hay resultados, retorna null
      return null;
    } catch (error) {
      this.logger.error(`Error fetch jugador id=${id} season=${season}: ${error.message}`);
      return null;
    }
  }

  // Método para iterar por ids y temporadas
  async cargarJugadoresIterativo(): Promise<void> {
    const seasons = [2021, 2022, 2023];
    const maxId = 100;

    for (let id = 1; id <= maxId; id++) {
      for (const season of seasons) {
        const jugador = await this.fetchJugadorByIdAndSeason(id, season);
        if (jugador) {
          const existe = await this.jugadorRepository.findOneBy({ id_jugador: jugador.id_jugador });
          if (!existe) {
            await this.jugadorRepository.save(jugador);
            this.logger.log(`Guardado jugador: ${jugador.nombre_jugador} (ID ${jugador.id_jugador}) temporada ${season}`);
          } else {
            this.logger.log(`Jugador ya existe: ${jugador.nombre_jugador} (ID ${jugador.id_jugador})`);
          }
        }
        // Opcional: para no saturar la API, espera 100ms antes del siguiente request
        await new Promise(res => setTimeout(res, 100));
      }
    }
  }

  // Método para listar todos los jugadores guardados
  async listarJugadores(): Promise<any[]> {
  const jugadores = await this.jugadorRepository.find();

  // Opcional: mapear a objeto plano para evitar problemas de serialización
  return jugadores.map(j => ({
    id_jugador: j.id_jugador,
    nombre_jugador: j.nombre_jugador,
    foto_jugador: j.foto_jugador,
  }));
}


  async obtenerJugadoresAleatorios(cantidad: number): Promise<Jugador[]> {
    return this.jugadorRepository
        .createQueryBuilder('jugador')
        .orderBy('DBMS_RANDOM.VALUE') // En Oracle para aleatorio
        .limit(cantidad)
        .getMany();
    }

    //------------------------------------------------------------------------------
    // ------------------------Inicio MODULE INIT-----------------------------------
    //------------------------------------------------------------------------------
    async onModuleInit() {
        console.log('Inicializando carga automática de jugadores...');
        await this.cargarJugadoresIterativo();
    }
    //------------------------------------------------------------------------------
    // ------------------------Fin MODULE INIT--------------------------------------
    //------------------------------------------------------------------------------
}
