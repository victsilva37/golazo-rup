import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


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
  styleUrl: './filtro-jugador.css'
})

export class FiltroJugador {
  jugadores: Jugador[] = [];
  jugadorMostrado: Jugador | null = null;
  intervalId: any;
  cicloMax = 30; // cantidad de cambios rápidos
  cicloActual = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarJugadores();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cargarJugadores() {
  this.http.get<Jugador[]>(`http://localhost:3000/jugadores`).subscribe({
    next: (data) => {
      this.jugadores = data ?? [];  // Asegura que sea array
      if (this.jugadores.length > 0) {
        this.iniciarFiltro();
      } else {
        console.warn('No hay jugadores para filtrar');
      }
    },
    error: (err) => {
      console.error('Error cargando jugadores:', err);
      this.jugadores = [];
    }
  });
}


  iniciarFiltro() {
    if (!this.jugadores || this.jugadores.length === 0) {
      console.warn('No hay jugadores para iniciar filtro');
      return;
    }

    this.cicloActual = 0;
    this.intervalId = setInterval(() => {
      const idx = Math.floor(Math.random() * this.jugadores.length);
      this.jugadorMostrado = this.jugadores[idx];
      this.cicloActual++;

      if (this.cicloActual >= this.cicloMax) {
        clearInterval(this.intervalId);
        console.log('Jugador seleccionado:', this.jugadorMostrado);
      }
    }, 100);
}

}
