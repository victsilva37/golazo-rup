import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'CATEGORIA'})
export class Categoria{

    @PrimaryColumn({name: 'ID_CATEGORIA'})
    id_categoria: number

    @Column({name: 'NOMBRE'})
    nombre: string

    @Column({name: 'MULTIPLICADOR'})
    multiplicador: number
    
}