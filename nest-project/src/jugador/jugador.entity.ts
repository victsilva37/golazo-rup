// jugador.entity.ts
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'JUGADOR' })
export class Jugador {
  @PrimaryColumn({name: 'ID_JUGADOR'})
  id_jugador: number; // viene de la API, no autoincrementable

  @Column({ length: 50, name: 'NOMBRE_JUGADOR' })
  nombre_jugador: string; // nombre corto (campo 'name' de la API)

  @Column({ length: 255, nullable: true, name: 'FOTO_JUGADOR'})
  foto_jugador?: string; // URL foto jugador
}
