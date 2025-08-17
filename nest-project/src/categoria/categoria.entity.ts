import { EstadisticaGol } from "src/estadistica_gol/estadistica_gol.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'CATEGORIA'})
export class Categoria{

    @PrimaryColumn({name: 'ID_CATEGORIA'})
    id_categoria: number

    @Column({name: 'NOMBRE'})
    nombre: string

    @Column({name: 'MULTIPLICADOR'})
    multiplicador: number
    
    @OneToMany(() => EstadisticaGol, estadistica => estadistica.jugador)
    estadisticasGoles: EstadisticaGol[];
}