import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

//Importación de interfaces
import { Jugador } from '../../interfaces/Jugador';
import { CategoriaVM } from '../../interfaces/Categoria';



@Component({
  selector: 'app-panel-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-categorias.html',
  styleUrls: ['./panel-categorias.css']
})
export class PanelCategorias implements OnInit, OnChanges {


  /*----------------------------------------------------
    ------------------Inicio CONSTRUCTOR----------------
    ---------------------------------------------------*/
    constructor(private http: HttpClient) {}
  /*----------------------------------------------------
    ------------------Fin CONSTRUCTOR-------------------
    ---------------------------------------------------*/


  

  
  //SECCIÓN TÍTULO

    //sin contenido


  //LISTA DE CATEGORÍAS

    //CONTADOR TOTAL DE GOLES

      contadorGoles: number = 0
      meta: number = 50

    categorias: CategoriaVM[] = [];

    cargarPanel() {
      this.http.get<CategoriaVM[]>('http://localhost:3000/estadistica-gol/panel')
        .subscribe({
          next: data => this.categorias = data ?? [],
          error: err => console.error('Error cargando panel', err)
        });
    }

    //NOMBRE DE LA CATEGORÍA

      //sin contenido


    //MULTIPLICADOR

      //sin contenido


    //BOTÓN ASIGNAR

      @Input() jugador?: Jugador;
      @Output() categoriaAsignada = new EventEmitter<void>();

      jugadorAsignado: boolean = false

      asignarCategoria(cat: CategoriaVM) {
        if (!this.jugador) return;

        this.http.post<{ goles: number }>(
          `http://localhost:3000/estadistica-gol/actualizar/${this.jugador.id_jugador}/${cat.id_categoria}`, {}
        ).subscribe({
          next: res => {
            // Actualiza visualmente
            const golesUI = (res.goles ?? 0);
            Object.assign(cat, {
              asignada: true,
              goles: golesUI,
              jugador: {
                id_jugador: this.jugador!.id_jugador,
                nombre_jugador: this.jugador!.nombre_jugador,
                foto_jugador: this.jugador!.foto_jugador
              }
            });

            // ✅ Deshabilitar todos los demás botones de asignar
            this.jugadorAsignado = true;

            this.contadorGoles = this.contadorGoles + golesUI

            if (this.contadorGoles >= this.meta){
              alert("HISTORIAAAAAAAAA")
            }

            // Avisar al padre para habilitar "Filtrar jugador"
            this.categoriaAsignada.emit();

            this.jugadorAsignado = false;
          },
          error: err => {
            if (err?.status === 409) {
              alert('La categoría ya está asignada.');
              this.cargarPanel();
            } else {
              console.error('Error al asignar categoría', err);
            }
          }
        });
      }


    //GOLES

      //sin contenido


    
  /*------------------------------------------------------------------
    -----------------------Inicio ON-INIT, ONCHANGES------------------
    -----------------------------------------------------------------*/
    ngOnInit() {
      this.cargarPanel(); // carga inicial
    }

    ngOnChanges(changes: SimpleChanges) {
    // si cambia el jugador, no hace falta recargar panel (es global),
    // pero puedes refrescar si quieres para estar 100% al día:
    if (changes['jugador']) this.cargarPanel();
  }
  /*------------------------------------------------------------------
    -----------------------Fin ON-INIT, ONCHANGES---------------------
    -----------------------------------------------------------------*/
}


