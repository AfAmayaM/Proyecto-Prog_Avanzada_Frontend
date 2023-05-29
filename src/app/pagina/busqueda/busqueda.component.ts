import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { PublicacionGetDTO } from 'src/app/modelo/publicacion-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { PublicacionService } from 'src/app/servicios/publicacion.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  valor: string;
  categoria: string;
  precioMax: number;
  precioMin: number;
  publicaciones!: PublicacionGetDTO[];
  filtro!: PublicacionGetDTO[];
  categorias: string[];

  constructor(private route: ActivatedRoute, private publicacionServicio: PublicacionService, private categoriaServicio: CategoriaService, private toast: ToastrService) {
    this.valor = "";
    this.categoria = "";
    this.precioMin = 1000;
    this.precioMax = 1000;
    this.categorias = [];

    this.route.params.subscribe(params => {
      if (params['valor'] !== undefined) {
        this.valor = params['valor'];
        this.publicacionServicio.listarNombre(this.valor).subscribe({
          next: data => {
            this.filtro = data.respuesta;
          },
          error: error => {
            this.toast.error(error.error.respuesta);
          }
        });
      } else if (params['categoria'] !== undefined) {
        this.categoria = params['categoria'];
        this.publicacionServicio.listarCategoria(this.categoria).subscribe({
          next: data => {
            this.filtro = data.respuesta;
          },
          error: error => {
            this.toast.error(error.error.respuesta);
          }
        });
      } else if (params['precioMax'] !== undefined && params['precioMin'] !== undefined) {
        this.precioMax = params['precioMax'];
        this.precioMin = params['precioMin'];
        this.publicacionServicio.listarPrecio(this.precioMax, this.precioMin).subscribe({
          next: data => {
            this.filtro = data.respuesta;
          },
          error: error => {
            this.toast.error(error.error.respuesta);
          }
        })
      }
    });

    this.categoriaServicio.listar().subscribe({
      next: data => {
        this.categorias = data.respuesta;
      },
      error: error => {
        this.toast.error(error.error.respuesta);
      }
    });
  }

  public filtrarPrecio() {
    console.log("min: " + this.precioMin + ", max: " + this.precioMax);
    this.publicacionServicio.listarPrecio(this.precioMin, this.precioMax).subscribe({
      next: data => {
        this.filtro = data.respuesta;
      },
      error: error => {
        this.toast.error(error.error.respuesta);
      }
    });
  }

  public filtrarCategoria() {

  }
}
