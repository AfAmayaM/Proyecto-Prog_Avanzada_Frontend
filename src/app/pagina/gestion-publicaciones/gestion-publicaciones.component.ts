import { Component, OnInit } from '@angular/core';
import { PublicacionGetDTO } from 'src/app/modelo/publicacion-get-dto';
import { PublicacionService } from 'src/app/servicios/publicacion.service';

@Component({
  selector: 'app-gestion-publicaciones',
  templateUrl: './gestion-publicaciones.component.html',
  styleUrls: ['./gestion-publicaciones.component.css']
})
export class GestionPublicacionesComponent implements OnInit {
  publicaciones: PublicacionGetDTO[];
  seleccionados: PublicacionGetDTO[];
  textoBtnEliminar: string;

  constructor(private publicacionServicio: PublicacionService) {
    this.publicaciones = [];
    this.seleccionados = [];
    this.textoBtnEliminar = "";
  }

  ngOnInit() {
    //this.publicaciones = this.publicacionServicio.listarNombre();
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
      this.publicaciones = this.publicaciones.filter(i => i != e);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }
}
