import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadisticaGol } from './estadistica_gol.entity';
import { Jugador } from '../jugador/jugador.entity';
import { Categoria } from '../categoria/categoria.entity';
import { EstadisticaGolService } from './estadistica_gol.service';
import { EstadisticaGolController } from './estadistica_gol.controller';
import { HttpModule as AxiosModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstadisticaGol, Jugador, Categoria]),
    AxiosModule,
  ],
  providers: [EstadisticaGolService],
  controllers: [EstadisticaGolController],
  exports: [EstadisticaGolService],
})
export class EstadisticaGolModule {}
