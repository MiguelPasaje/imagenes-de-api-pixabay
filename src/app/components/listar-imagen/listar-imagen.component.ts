import { Component } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css'],
})
export class ListarImagenComponent {
  termino = '';
  subscription: Subscription;
  listImagenes: any[] = [];
  loading: boolean = false;

  imagenesPorPagina: number = 30;
  paginaActual: number = 1;
  totalPaginas: number = 0;

  constructor(private _imagenService: ImagenService) {
    this.subscription = this._imagenService
      .getTerminoBusqueda()
      .subscribe((data) => {
        this.paginaActual = 1;

        this.loading = true;
        //console.log(data, 'a');
        this.termino = data;
        this.obtenerImagenes();
      });
  }

  obtenerImagenes() {
    this._imagenService
      .getImagenes(this.termino, this.imagenesPorPagina, this.paginaActual)
      .subscribe(
        (data) => {
          console.log(data);
          this.loading = false;
          if (data.hits.length == 0) {
            this._imagenService.setError(
              `No se encontro ningun resultado para ${this.termino}`
            );
            return;
          }
          this.totalPaginas = Math.ceil(
            data.totalHits / this.imagenesPorPagina
          );
          console.log(this.totalPaginas, 'totalpaginas');

          this.listImagenes = data.hits;
        },
        (error) => {
          this._imagenService.setError(`Upss.. ocurrio un error.`);
          this.loading = false;
        }
      );
  }

  paginaAnterior() {
    this.paginaActual--;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes()
  }
  paginaSiguiente() {
    this.paginaActual++;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes()
  }
  /*   paginaAnteriorClass(){

  } */
}
