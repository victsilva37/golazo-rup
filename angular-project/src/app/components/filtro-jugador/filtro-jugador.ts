import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

//Importación de interfaces
import { Jugador } from '../../interfaces/Jugador';

@Component({
  selector: 'app-filtro-jugador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtro-jugador.html',
  styleUrls: ['./filtro-jugador.css']
})

export class FiltroJugador {

  /*----------------------------------------------------
    ------------------Inicio CONSTRUCTOR----------------
    ---------------------------------------------------*/
    constructor(private http: HttpClient) {}
  /*----------------------------------------------------
    ------------------Fin CONSTRUCTOR-------------------
    ---------------------------------------------------*/

  

  jugadores: Jugador[] = [];
  

  
  //SECCIÓN FILTRO DE JUGADORES


      //SECCIÓN INFORMACIÓN DEL JUGADOR

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


          //Se habilita solo cuando el panel confirma una asignación
          filtrarHabilitado = false;

          habilitarFiltro() {
            this.filtrarHabilitado = true;
          }

          private deshabilitarFiltro() {
            this.filtrarHabilitado = false;
          }


      //SECCIÓN BOTÓN FILTRAR JUGADOR

          jugadorMostrado: Jugador | null = null;
          intervalId: any;
          cicloMax = 30;
          cicloActual = 0;

          @Output() jugadorSeleccionado = new EventEmitter<Jugador>();

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


  /*------------------------------------------------------------------
    -----------------------Inicio ON-INIT-----------------------------
    -----------------------------------------------------------------*/
    ngOnInit(): void {
      this.cargarJugadores();
    }

    ngOnDestroy(): void {
      if (this.intervalId) clearInterval(this.intervalId);
    }
  /*------------------------------------------------------------------
    -----------------------Fin ON-INIT--------------------------------
    -----------------------------------------------------------------*/

}
