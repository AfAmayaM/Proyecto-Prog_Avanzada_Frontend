import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicacionGetDTO } from 'src/app/modelo/publicacion-get-dto';
import { PublicacionService } from 'src/app/servicios/publicacion.service';
import { ModeradorService } from 'src/app/servicios/moderador.service';
import { ToastrService } from 'ngx-toastr';
import { RevisionDTO } from 'src/app/modelo/revision-dto';
import { MensajeDTO } from 'src/app/modelo/mensaje-dto';

@Component({
  selector: 'app-revisar-publicacion',
  templateUrl: './revisar-publicacion.component.html',
  styleUrls: ['./revisar-publicacion.component.css']
})

export class RevisarPublicacionComponent {
  title = 'Unimarket';
  estado: string;
  publicaciones: PublicacionGetDTO[];

  constructor(private publicacionServicio: PublicacionService, private toast: ToastrService, private moderadorServicio: ModeradorService) {
    this.estado = "";
    this.publicaciones = [];
    this.publicacionServicio.listar().subscribe({
      next: data => {
        this.publicaciones = data.respuesta;
      },
      error: error => {
        toast.error(error.error.respuesta);
      }
    });
  }

  public listarEstado() {
    this.publicacionServicio.listarEstado(this.estado).subscribe({
      next: data => {
        this.publicaciones = data.respuesta;
      },
      error: error => {
        this.toast.error(error.error.respuesta);
      }
    });
  }

  public cambiarEstado(codigoCuenta: number, codigoPublicacion: number, nuevoEstado: string) {
    console.log("cambiando estado...");
    const revision: RevisionDTO = {
      codigoCuenta: codigoCuenta,
      codigoPublicacion: codigoPublicacion,
      estado: nuevoEstado
    };

    this.moderadorServicio.revisarPublicacion(revision).subscribe({
      next: data => {
        this.toast.success('El estado de la publicación se ha cambiado correctamente.');
        this.publicaciones = [];
        this.publicacionServicio.listar().subscribe({
          next: data => {
            this.publicaciones = data.respuesta;
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
  }


}
