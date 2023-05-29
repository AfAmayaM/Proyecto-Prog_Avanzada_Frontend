import { Component } from '@angular/core';
import { CompraDTO } from 'src/app/modelo/compra-dto';
import { DetalleCompraDTO } from 'src/app/modelo/detalle-compra-dto';
import { PublicacionGetDTO } from 'src/app/modelo/publicacion-get-dto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { CompraService } from 'src/app/servicios/compra.service';
import { PublicacionService } from 'src/app/servicios/publicacion.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  detalles: DetalleCompraDTO[];
  publicaciones: PublicacionGetDTO[];
  valorTotal: number;
  valorProducto: number;
  mostrarModal: boolean = false;
  productoBorrar!: DetalleCompraDTO;
  infoMostrar!: { publicacion: any, detalle: any }[];

  constructor(private carritoService: CarritoService, private publicacionServicio: PublicacionService, private compraServicio: CompraService) {
    this.detalles = [];
    this.publicaciones = [];
    this.infoMostrar = [];
    this.valorTotal = 0;
    this.valorProducto = 0;
    this.detalles = this.carritoService.listar();
    if (this.detalles.length > 0) {
      for (let detalle of this.detalles) {
        this.publicacionServicio.obtener(detalle.codigoPublicacion).subscribe({
          next: data => {
            const publicacion = data.respuesta;
            if (publicacion != null) {
              this.publicaciones.push(publicacion);
              detalle.precioUnidad = publicacion.producto.precio;
              detalle.valorTotal = (publicacion.producto.precio * (1 - (publicacion.descuento/100)))* detalle.unidades;
              this.valorTotal += detalle.valorTotal;
              const info = { publicacion: publicacion, detalle: detalle};
              this.infoMostrar.push(info);
            }
          },
          error: error => {
            console.log(error.error);
          }
        });
      }
    }
  }

  public actualizarUnidades(info: any, unidades: any) {
    info.detalle.unidades = Number.parseInt(unidades);
  }

  public calcularValor(info: any) {
    info.detalle.valorTotal = (info.publicacion.producto.precio * (1 - (info.publicacion.descuento/100))) * info.detalle.unidades;

    let total = 0;
    for (let info of this.infoMostrar) {
      total += info.detalle.valorTotal;
    }
    this.valorTotal = total;
  }

  public abrirModal(info: any) {
    if (info.detalle.unidades === 0) {
      this.mostrarModal = true;
      this.productoBorrar = info.detalle;
    } else {
      this.mostrarModal = false;
      //this.productoBorrar = null;
    }
  }

  public borrarProducto(borrar: boolean) {
    let index = this.infoMostrar.findIndex(i => i.detalle.codigoPublicacion === this.productoBorrar.codigoPublicacion);
    console.log(index);
    if (borrar) {
      this.infoMostrar.splice(index, 1);
      this.detalles.splice(index, 1);
      this.publicaciones.splice(index, 1);
    } else {
      this.detalles[index].unidades = 1;
    }
  }

  public pagar() {
    this.compraServicio.agregarDetalles(this.detalles);
  }
}