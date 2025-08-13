import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Categoria {
  id_categoria: number;
  nombre: string;
  multiplicador: number;
}

@Component({
  selector: 'app-panel-categorias',
  imports: [CommonModule],
  templateUrl: './panel-categorias.html',
  styleUrl: './panel-categorias.css'
})
export class PanelCategorias {

  categorias: Categoria[] = [];

  constructor(private http: HttpClient) { }

  cargarCategorias(): void {
    this.http.get<Categoria[]>('http://localhost:3000/categorias') // Ajusta la URL de tu API
      .subscribe({
        next: (data) => this.categorias = data,
        error: (err) => console.error('Error al obtener categorías', err)
      });
  }

  /*-------------------------------------------------
    -----------------Inicio OnInit-------------------
    -------------------------------------------------*/
  ngOnInit(): void {
    this.cargarCategorias();
  }
  /*-------------------------------------------------
    -----------------Inicio OnInit-------------------
    -------------------------------------------------*/

}
