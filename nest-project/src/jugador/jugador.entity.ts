// jugador.entity.ts
import { EstadisticaGol } from 'src/estadistica_gol/estadistica_gol.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity({ name: 'JUGADOR' })
export class Jugador {
  @PrimaryColumn({name: 'ID_JUGADOR'})
  id_jugador: number; // viene de la API, no autoincrementable

  @Column({ length: 50, name: 'NOMBRE_JUGADOR' })
  nombre_jugador: string; // nombre corto (campo 'name' de la API)

  @Column({ length: 255, nullable: true, name: 'FOTO_JUGADOR'})
  foto_jugador?: string; // URL foto jugador

  @OneToMany(() => EstadisticaGol, estadistica => estadistica.categoria)
  estadisticasGoles: EstadisticaGol[];
}
