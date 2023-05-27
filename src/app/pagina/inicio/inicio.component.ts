import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  categorias!: string[];
  alerta!: Alerta;

  constructor(private categoriaServicio: CategoriaService, private router: Router) {
    const objeto = this;
    categoriaServicio.listar().subscribe({
      next: (data) => {
        this.categorias = data.respuesta;
      },
      error: (error) => {
        objeto.alerta = new Alerta(error.respuesta, "success");
      }
    });
  }

  public iraBusqueda(categoria: string) {
    if (categoria) {
      this.router.navigate(['/busquedaCategoria', categoria]);
    }
  }
}
