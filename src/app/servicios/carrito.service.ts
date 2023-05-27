import { Injectable } from '@angular/core';
import { DetalleCompraDTO } from '../modelo/detalle-compra-dto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  publicaciones: DetalleCompraDTO[];

  constructor() {
    this.publicaciones = [];
  }

  public agregar(detalle: DetalleCompraDTO) {
    let index = this.publicaciones.findIndex(p => p.codigoPublicacion === detalle.codigoPublicacion);
    if(index !== -1) {
      this.publicaciones[index].unidades += detalle.unidades;
    } else {
      this.publicaciones.push(detalle);
    }
  }

  public quitar(detalle: DetalleCompraDTO) {
    let indice = this.publicaciones.indexOf(detalle);
    this.publicaciones.splice(indice, 1);
  }

  public listar(): DetalleCompraDTO[] {
    return this.publicaciones;
  }
}
