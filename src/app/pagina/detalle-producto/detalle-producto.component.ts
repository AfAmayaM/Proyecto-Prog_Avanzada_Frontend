import { Component, OnInit } from '@angular/core';
import { PublicacionGetDTO } from 'src/app/modelo/publicacion-get-dto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ActivatedRoute } from '@angular/router';
import { PublicacionService } from 'src/app/servicios/publicacion.service';
import { DetalleCompraDTO } from 'src/app/modelo/detalle-compra-dto';
import { ComentarioDTO } from 'src/app/modelo/comentario-dto';
import { ComentarioService } from 'src/app/servicios/comentario.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  publicaciones!: PublicacionGetDTO[];
  publicacion!: PublicacionGetDTO;
  codigoPublicacion: number = 0;
  imgSelect: string = "";
  detalle!: DetalleCompraDTO;
  comentario!: ComentarioDTO;
  limiteCaracteres: number = 255;

  constructor(private carritoServicio: CarritoService, private publicacionServicio: PublicacionService, private comentarioServicio: ComentarioService, private tokenServicio: TokenService, private route: ActivatedRoute) {
    //this.publicaciones = publicacionServicio.listarNombre();
    this.publicaciones =[];
    this.comentario = new ComentarioDTO();
    this.detalle = new DetalleCompraDTO(this.codigoPublicacion, 1);
    this.route.params.subscribe(params => {
      this.codigoPublicacion = parseInt(params['codigo']);
      this.publicacionServicio.obtener(this.codigoPublicacion).subscribe({
        next: data => {
          const publicacion = data.respuesta;
          if(publicacion !== undefined) {
            this.publicacion = publicacion;
            this.imgSelect = this.publicacion.producto.imagenes[0];
          } else {
            console.log("No se encontró la publicación: " + this.codigoPublicacion)
          }
        },
        error: error => {
          console.log(error.error);
        }
      });
    });
  }

  ngOnInit(): void {
    //const codigo = this.route.snapshot.paramMap.get('codigo');
    //this.codigoProducto = codigo ? parseInt(codigo) : 0;
  }

  public agregarCarrito(){
    this.carritoServicio.agregar(new DetalleCompraDTO(this.codigoPublicacion, this.detalle.unidades));
  }

  public publicarComentario() {
    this.comentario.codigoPublicacion = this.codigoPublicacion;
    this.comentario.codigoUsuario = this.tokenServicio.getCodigoCuenta();
    console.log(this.comentario);
    this.comentarioServicio.publicarComentario(this.comentario).subscribe({
      next: data => {
        console.log(data.respuesta);
      },
      error: error => {
        console.log(error.error);
      }
    });
  }
  
  quitarCarrito(): void {
    this.carritoServicio.quitar(new DetalleCompraDTO(this.codigoPublicacion, this.detalle.unidades));
  }

  OnChangeImgSelected(newImg: string) {
    this.imgSelect = newImg;
  }
}

