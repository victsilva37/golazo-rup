import { Component, signal } from '@angular/core';
import { FiltroJugador } from './components/filtro-jugador/filtro-jugador';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FiltroJugador],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('angular-project');
}
