import { Component } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent {
  nombreImagen: string

  constructor(
    private _imagenService:ImagenService
  ){
    this.nombreImagen = ''
  }

  buscarImagenes(){

    if (this.nombreImagen === '') {
      this._imagenService.setError('Campo vacio, Agrega un texto para la busqueda.')
    }

  }

}
