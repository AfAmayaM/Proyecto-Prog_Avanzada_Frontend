import { Component } from '@angular/core';
import { PublicacionDTO } from 'src/app/modelo/publicacion-dto';
import { ProductoDTO } from 'src/app/modelo/producto-dto';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {
  publicacion: PublicacionDTO;
  producto: ProductoDTO;

  constructor() {
    this.publicacion = new PublicacionDTO;
    this.producto = new ProductoDTO;
  }
}

