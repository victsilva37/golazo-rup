import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import 'dotenv/config';

//JUGADOR
import { JugadorModule } from './jugador/jugador.module';
import { Jugador } from './jugador/jugador.entity';

//CATEGORIA
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/categoria.entity';

//ESTADISTICA_GOL
import { EstadisticaGolModule } from './estadistica_gol/estadistica_gol.module';
import { EstadisticaGol } from './estadistica_gol/estadistica_gol.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: process.env.DB_HOST, // o la IP de tu servidor Oracle
      port: Number(process.env.DB_PORT),        // puerto por defecto de Oracle
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      serviceName: process.env.DB_SERVICE_NAME,         // o el nombre de servicio (service name)
      synchronize: false, // No cambies a true en producción
      entities: [Jugador, Categoria, EstadisticaGol],
    }),
    JugadorModule,
    CategoriaModule,
    EstadisticaGolModule
  ],
  providers: [AppService],
})
export class AppModule {}
