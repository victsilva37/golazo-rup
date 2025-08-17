export interface CategoriaVM {
  id_categoria: number;
  nombre: string;
  multiplicador: number;
  asignada: boolean;
  goles: number;
  jugador: { id_jugador: number; nombre_jugador: string; foto_jugador: string } | null;
}