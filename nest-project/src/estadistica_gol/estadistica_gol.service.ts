import { Injectable, ConflictException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadisticaGol } from './estadistica_gol.entity';
import { Jugador } from '../jugador/jugador.entity';
import { Categoria } from '../categoria/categoria.entity';

@Injectable()
export class EstadisticaGolService {
  private readonly API_URL = 'https://v3.football.api-sports.io/players';
  private readonly API_KEY = process.env.API_TOKEN;

  constructor(
    @InjectRepository(EstadisticaGol)
    private readonly estadisticaRepo: Repository<EstadisticaGol>,
    @InjectRepository(Jugador)
    private readonly jugadorRepo: Repository<Jugador>,
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
    private readonly httpService: HttpService,
  ) {}

  async getPanel() {
    const categorias = await this.categoriaRepo.find();
    const ocupadas = await this.estadisticaRepo.find({ relations: ['categoria', 'jugador'] });

    const mapOcupadas = new Map<number, EstadisticaGol>();
    ocupadas.forEach(e => mapOcupadas.set(e.categoria.id_categoria, e));

    return categorias.map(cat => {
      const est = mapOcupadas.get(cat.id_categoria);
      return {
        id_categoria: cat.id_categoria,
        nombre: cat.nombre,
        multiplicador: cat.multiplicador,
        asignada: !!est,
        goles: est?.goles ?? 0,
        jugador: est ? {
          id_jugador: est.jugador.id_jugador,
          nombre_jugador: (est.jugador as any).nombre_jugador,
          foto_jugador: (est.jugador as any).foto_jugador
        } : null
      };
    });
  }

  async actualizarGolesJugadorCategoria(id_jugador: number, id_categoria: number) {
    const jugador = await this.jugadorRepo.findOne({ where: { id_jugador } });
    const categoria = await this.categoriaRepo.findOne({ where: { id_categoria } });
    if (!jugador || !categoria) throw new Error('Jugador o categoría no encontrados');

    // ❗ Evitar reasignar una categoría ya ocupada
    const yaOcupada = await this.estadisticaRepo.findOne({
      where: { categoria: { id_categoria } },
      relations: ['categoria'],
    });
    if (yaOcupada) {
      throw new ConflictException('La categoría ya está asignada');
    }

    // Calcular goles desde la API (2021-2023)
    let totalGoles = 0;
    for (const temporada of [2021, 2022, 2023]) {
      const { data } = await this.httpService.axiosRef.get(this.API_URL, {
        params: { id: jugador.id_jugador, season: temporada },
        headers: { 'x-apisports-key': this.API_KEY },
      });

      for (const resp of data.response) {
        // 🚫 EXCLUIR PORTEROS
        if (resp.player?.position === 'Goalkeeper') {
          continue; // saltar este jugador
        }

        for (const stat of resp.statistics) {
          // ----------------------------
          // CASO ESPECIAL: Country
          // ----------------------------
          if (categoria.nombre === 'Country') {
            if (
              stat.league?.country === 'World' &&
              ['Copa America', 'World Cup', 'UEFA Nations League', 'World Cup - Qualification South America', 'Friendlies']
                .includes(stat.league?.name)
            ) {
              totalGoles += stat.goals?.total ?? 0;
            }
            continue; // no evaluar otros casos
          }

          // ----------------------------
          // CASO ESPECIAL: Total Goals
          // ----------------------------
          if (categoria.nombre === 'Total Goals') {
            if (
              stat.league?.name !== 'Friendlies Clubs' &&
              !stat.league?.name.includes('U21')
            ) {
              totalGoles += stat.goals?.total ?? 0;
            }
            continue;
          }

          // ----------------------------
          // CASO GENERAL: demás categorías
          // ----------------------------
          if (stat.league?.name?.toLowerCase().trim() === categoria.nombre.toLowerCase().trim()) {
            totalGoles += stat.goals?.total ?? 0;
          }
        }
      }
    }

    const nueva = this.estadisticaRepo.create({
      jugador,
      categoria,
      goles: totalGoles,
      estado: 'asignada',
    });

    return this.estadisticaRepo.save(nueva);
  }
}
