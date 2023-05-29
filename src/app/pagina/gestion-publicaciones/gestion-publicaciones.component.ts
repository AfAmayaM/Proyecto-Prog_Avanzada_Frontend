import { Component, OnInit } from '@angular/core';
import { PublicacionGetDTO } from 'src/app/modelo/publicacion-get-dto';
import { PublicacionService } from 'src/app/servicios/publicacion.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestion-publicaciones',
  templateUrl: './gestion-publicaciones.component.html',
  styleUrls: ['./gestion-publicaciones.component.css']
})
export class GestionPublicacionesComponent {
  publicaciones: PublicacionGetDTO[];
  seleccionados: PublicacionGetDTO[];
  textoBtnEliminar: string;

  constructor(private publicacionServicio: PublicacionService, private tokenServicio: TokenService, private toast: ToastrService) {
    this.publicaciones = [];
    this.seleccionados = [];
    this.textoBtnEliminar = "";
    this.publicacionServicio.listarUsuario(this.tokenServicio.getCodigoCuenta()).subscribe({
      next: data => {
        this.publicaciones = data.respuesta;
      },
      error: error => {
        this.toast.error(error.error.respuesta);
      }
    })
  }

  public seleccionar(publicacion: PublicacionGetDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(publicacion);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i != publicacion);
    }
    this.actualizarMensaje();
  }

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        
        this.textoBtnEliminar = "1 elemento";
      } else {
        this.textoBtnEliminar = tam + " elementos";
      }
    } else {
      this.textoBtnEliminar = "";
    }
  }

  public borrarProductos() {
    this.seleccionados.forEach(e => {
      //this.publicaciones = this.publicaciones.filter(i => i != e);
      this.publicacionServicio.eliminar(e.codigo).subscribe({
        next: data => {
          this.toast.success(data.respuesta);
          this.publicacionServicio.listarUsuario(this.tokenServicio.getCodigoCuenta()).subscribe({
            next: data => {
              this.publicaciones = data.respuesta;
            },
            error: error => {
              this.toast.error(error.error.respuesta);
            }
          })
        }, 
        error: error => {
          this.toast.error(error.error.respuesta);
        }
      });
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }
}
