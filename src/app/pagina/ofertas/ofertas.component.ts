import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { PublicacionGetDTO } from 'src/app/modelo/publicacion-get-dto';
import { PublicacionService } from 'src/app/servicios/publicacion.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent {

  
  ofertas!:PublicacionGetDTO[];
  producto!: ProductoGetDTO[];

  constructor(private publicacionServicio: PublicacionService, private toast: ToastrService){
    //this.ofertas = publicacionServicio.listarNombre().filter(p => p.descuento !== 0);
    this.ofertas = [];
    this.producto = [];
  }
  ngOnInit(): void {
    this.obtenerOfertas();
  }
  obtenerOfertas(): void {
    this.publicacionServicio.listarOfertas().subscribe({
      next: (data) => {
        this.ofertas = data.respuesta;
      },
      error: (error) => {
        this.toast.error(error.error.respuesta);
      }
    });
  }

}
