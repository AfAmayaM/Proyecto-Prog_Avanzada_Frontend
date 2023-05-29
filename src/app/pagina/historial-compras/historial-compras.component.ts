import { Component } from '@angular/core';
import { PublicacionGetDTO } from 'src/app/modelo/publicacion-get-dto';
import { CompraService } from 'src/app/servicios/compra.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ToastrService } from 'ngx-toastr';
import { CompraGetDTO } from 'src/app/modelo/compra-get-dto';
import { PublicacionService } from 'src/app/servicios/publicacion.service';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent {
  historial!: CompraGetDTO[];
  compras!: PublicacionGetDTO[];
  infoMostrar: {detalle: any, publicacion: any, valorTotal: any}[];

  constructor(private compraServicio: CompraService, private publicacionServicio: PublicacionService, private tokenServicio: TokenService, private toast: ToastrService) {
    this.historial = [];
    this.compras = [];
    this.infoMostrar = [];
    this.compraServicio.listarCompras(tokenServicio.getCodigoCuenta()).subscribe({
      next: data => {
        console.log(data.respuesta);
        this.historial = data.respuesta;
        console.log(this.historial);
        this.cargarCompras();
        console.log(this.compras);
      },
      error: error => {
        this.toast.error(error.error.respuesta);
      }
    });
  }

  private cargarCompras() {
    for (let compra of this.historial) {
      for (let detalle of compra.detalleCompra) {
        this.publicacionServicio.obtener(detalle.codigoPublicacion).subscribe({
          next: data => {
            const publicacion = data.respuesta;
            compra.valorTotal = detalle.unidades * publicacion.producto.precio;
            const info = {detalle: detalle, publicacion: data.respuesta, valorTotal: compra.valorTotal};
            this.infoMostrar.push(info);
            
          },
          error: error => {
            this.toast.error(error.error.respuesta);
          }
        });
      }
    }
  }

}