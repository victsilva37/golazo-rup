import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroJugador } from './components/filtro-jugador/filtro-jugador';
import { PanelCategorias } from './components/panel-categorias/panel-categorias';

interface Jugador {
  id_jugador: number;
  nombre_jugador: string;
  foto_jugador: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FiltroJugador, PanelCategorias],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  jugadorSeleccionado?: Jugador;
}
