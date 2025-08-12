import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Jugador } from './jugador.entity';
import { JugadorService } from './jugador.service';
import { JugadorController } from './jugador.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Jugador]),
    HttpModule, // necesario para hacer peticiones HTTP a la API externa
  ],
  providers: [JugadorService],
  controllers: [JugadorController],
})
export class JugadorModule {}
