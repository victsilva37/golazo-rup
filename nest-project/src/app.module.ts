import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import 'dotenv/config';

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
      entities: [],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
