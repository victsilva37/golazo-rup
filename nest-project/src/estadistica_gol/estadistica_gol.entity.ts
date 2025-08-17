import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Jugador } from 'src/jugador/jugador.entity';
import { Categoria } from 'src/categoria/categoria.entity';

@Entity({ name: 'ESTADISTICA_GOL' })
export class EstadisticaGol {
  @PrimaryGeneratedColumn({ name: 'ID_ESTADISTICA' })
  id_estadistica: number;

  @ManyToOne(() => Jugador, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ID_JUGADOR' })
  jugador: Jugador;

  @ManyToOne(() => Categoria, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ID_CATEGORIA' })
  categoria: Categoria;

  @Column({ type: 'number', default: 0, name: 'GOLES' })
  goles: number;

  @Column({ type: 'varchar', default: 'asignada', name: 'ESTADO' })
  estado: string; // 'asignada' | 'pendiente'
}
