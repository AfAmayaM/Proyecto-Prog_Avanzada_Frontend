import { Component, OnInit } from '@angular/core';
import { PublicacionGetDTO } from 'src/app/modelo/publicacion-get-dto';
import { PublicacionService } from 'src/app/servicios/publicacion.service';

@Component({
  selector: 'app-revisar-publicacion',
  templateUrl: './revisar-publicacion.component.html',
  styleUrls: ['./revisar-publicacion.component.css']
})

export class RevisarPublicacionComponent {
  publicaciones: PublicacionGetDTO[];

  constructor(private publicacionServicio: PublicacionService) {
    this.publicaciones = [];
  }

  ngOnInit() {
    /*this.publicaciones = this.publicacionServicio.listarNombre();
    this.publicacionServicio.listarNombre().subscribe({
      next: data => {
        this.publicaciones = data.respuesta;
      }
    });*/
  }
}
