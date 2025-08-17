import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

interface Jugador {
  id_jugador: number;
  nombre_jugador: string;
  foto_jugador: string;
}

@Component({
  selector: 'app-filtro-jugador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtro-jugador.html',
  styleUrls: ['./filtro-jugador.css']
})
export class FiltroJugador {

  @Output() jugadorSeleccionado = new EventEmitter<Jugador>();

  jugadores: Jugador[] = [];
  jugadorMostrado: Jugador | null = null;
  intervalId: any;
  cicloMax = 30;
  cicloActual = 0;

  // 🔒 se habilita solo cuando el panel confirma una asignación
  filtrarHabilitado = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarJugadores();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  habilitarFiltro() {
    this.filtrarHabilitado = true;
  }

  private deshabilitarFiltro() {
    this.filtrarHabilitado = false;
  }

  cargarJugadores() {
    this.http.get<Jugador[]>('http://localhost:3000/jugadores').subscribe({
      next: data => {
        this.jugadores = data ?? [];
        if (this.jugadores.length > 0) {
          // Primer filtro automático
          this.iniciarFiltro();
        }
      },
      error: err => console.error('Error cargando jugadores:', err)
    });
  }

  iniciarFiltro() {
    if (!this.jugadores.length) return;
    this.deshabilitarFiltro(); // se vuelve a deshabilitar hasta próxima asignación

    this.cicloActual = 0;
    this.intervalId = setInterval(() => {
      const idx = Math.floor(Math.random() * this.jugadores.length);
      this.jugadorMostrado = this.jugadores[idx];
      this.cicloActual++;

      if (this.cicloActual >= this.cicloMax) {
        clearInterval(this.intervalId);
        this.jugadorSeleccionado.emit(this.jugadorMostrado!);
      }
    }, 100);

    
  }
}
