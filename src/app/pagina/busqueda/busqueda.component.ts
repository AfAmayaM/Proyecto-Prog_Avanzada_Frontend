import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { PublicacionGetDTO } from 'src/app/modelo/publicacion-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { PublicacionService } from 'src/app/servicios/publicacion.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  valor: string;
  categoria: string;
  publicaciones!: PublicacionGetDTO[];
  filtro!: PublicacionGetDTO[];

  constructor(private route: ActivatedRoute, private publicacionServicio: PublicacionService) {
    this.valor = "";
    this.categoria = "";
    //this.publicaciones = this.publicacionServicio.listarNombre();
    this.route.params.subscribe(params => {
      if(params['valor'] !== undefined) {
        this.valor = params['valor'];
        this.publicacionServicio.listarNombre(this.valor).subscribe({
          next: data => {
            console.log(data.respuesta);
            this.filtro = data.respuesta;
            console.log("publicaciones: " + this.filtro);
          },
          error: error => {
            console.log(error.error);
          }
        });
      } else if(params['categoria'] !== undefined) {

      }
    });
  }  
}
