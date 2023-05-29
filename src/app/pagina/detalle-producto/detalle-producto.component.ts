import { Component, OnInit } from '@angular/core';
import { PublicacionGetDTO } from 'src/app/modelo/publicacion-get-dto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ActivatedRoute } from '@angular/router';
import { PublicacionService } from 'src/app/servicios/publicacion.service';
import { DetalleCompraDTO } from 'src/app/modelo/detalle-compra-dto';
import { ComentarioDTO } from 'src/app/modelo/comentario-dto';
import { ComentarioService } from 'src/app/servicios/comentario.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ToastrService } from 'ngx-toastr';
import { CompraService } from 'src/app/servicios/compra.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { UsuarioGetDTO } from 'src/app/modelo/usuario-get-dto';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';

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
  comentarios: { usuario: any, comentario: any }[];
  limiteCaracteres: number = 255;
  favorito: boolean = false;
  favoritos: PublicacionGetDTO[];
  vendedor: UsuarioGetDTO;
  usuarioComentario: UsuarioGetDTO;

  constructor(private usuarioServicio: UsuarioService, private carritoServicio: CarritoService, private publicacionServicio: PublicacionService, private comentarioServicio: ComentarioService, private compraServicio: CompraService, private tokenServicio: TokenService, private toast: ToastrService, private route: ActivatedRoute) {
    this.publicaciones = [];
    this.publicacion = new PublicacionGetDTO(0, 0, 0, new Date(), "", [], 0, [], new ProductoGetDTO(0, "", "", 0, 0, [], []));
    this.favoritos = [];
    this.vendedor = new UsuarioGetDTO(0, "", "", "", "", "", "");
    this.usuarioComentario = new UsuarioGetDTO(0, "", "", "", "", "", "");;
    this.comentarios = [];
    this.comentario = new ComentarioDTO();
    this.detalle = new DetalleCompraDTO(this.codigoPublicacion, 1);
    this.route.params.subscribe(params => {
      this.codigoPublicacion = parseInt(params['codigo']);
      this.publicacionServicio.obtener(this.codigoPublicacion).subscribe({
        next: data => {
          this.publicacion = data.respuesta;
          this.imgSelect = this.publicacion.producto.imagenes[0];
          this.usuarioServicio.obtener(this.publicacion.codigoCuenta).subscribe({
            next: data => {
              this.vendedor = data.respuesta;
            },
            error: error => {
              this.toast.error(error.error.respuesta);
            }
          });
        },
        error: error => {
          this.toast.error(error.error.respuesta);
        }
      });
    });
    if (tokenServicio.getCodigoCuenta() !== -1) {
      this.publicacionServicio.listarFavoritos(this.tokenServicio.getCodigoCuenta()).subscribe({
        next: data => {
          this.favoritos = data.respuesta;
          const index = this.favoritos.findIndex(p => p.codigo === this.codigoPublicacion);
          this.favorito = index === -1 ? false : true;
        },
        error: error => {
          this.toast.error(error.error.respuesta);
        }
      });
    }
    this.cargarComentario();
  }

  ngOnInit(): void {
    //const codigo = this.route.snapshot.paramMap.get('codigo');
    //this.codigoProducto = codigo ? parseInt(codigo) : 0;
  }

  public agregarCarrito() {
    this.carritoServicio.agregar(new DetalleCompraDTO(this.codigoPublicacion, this.detalle.unidades));
    this.toast.success("Producto agregado al carrito.");
  }

  public comprar() {
    const detalle = this.detalle;
    detalle.codigoPublicacion = this.codigoPublicacion;
    detalle.valorTotal = this.publicacion.producto.precio * this.detalle.unidades;
    detalle.precioUnidad = this.publicacion.producto.precio;
    this.compraServicio.agregarDetalles(Array.of(detalle));
  }

  public publicarComentario() {
    this.comentario.codigoPublicacion = this.codigoPublicacion;
    this.comentario.codigoUsuario = this.tokenServicio.getCodigoCuenta();
    console.log(this.comentario);
    this.comentarioServicio.publicarComentario(this.comentario).subscribe({
      next: data => {
        this.toast.success(data.respuesta);
        this.comentarios = [];
        this.cargarComentario();
        this.comentario.mensaje = "";
      },
      error: error => {
        this.toast.error(error.error.respuesta);
      }
    });
  }

  quitarCarrito(): void {
    this.carritoServicio.quitar(new DetalleCompraDTO(this.codigoPublicacion, this.detalle.unidades));
    this.toast.success("Producto eliminado del carrito.");
  }

  OnChangeImgSelected(newImg: string) {
    this.imgSelect = newImg;
  }
  public agregarFavorito() {
    if (this.tokenServicio.getCodigoCuenta() !== -1) {
      this.favorito = !this.favorito;
      this.usuarioServicio.favoritoAgregar(this.tokenServicio.getCodigoCuenta(), this.codigoPublicacion).subscribe({
        next: (data) => {
          this.toast.success(data.respuesta);
        },
        error: (error) => {
          this.toast.error(error.error.respuesta);
        }
      });
    } else {
      this.toast.info("Debes iniciar sesión para agregar un favorito");
    }
  }

  public eliminarFavorito() {
    this.favorito = !this.favorito;
    this.usuarioServicio.favoritoEliminar(this.tokenServicio.getCodigoCuenta(), this.codigoPublicacion).subscribe({
      next: (data) => {
        this.toast.success(data.respuesta);
      },
      error: (error) => {
        this.toast.error(error.error.respuesta);
      }
    });
  }

  public cargarComentario() {
    this.publicacionServicio.obtener(this.codigoPublicacion).subscribe({
      next: data => {
        const publicacion: PublicacionGetDTO = data.respuesta;
        publicacion.comentarios.forEach(c => {
          this.usuarioServicio.obtener(c.codigoUsuario).subscribe({
            next: data => {
              this.usuarioComentario = data.respuesta;
              this.comentarios.push({ usuario: this.usuarioComentario, comentario: c });
            },
            error: error => {
              this.toast.error(error.error.respuesta);
            }
          });
        })
      },
      error: error => {
        this.toast.error(error.error.respuesta);
      }
    })

  }
}

