import { Component } from '@angular/core';
import { PublicacionGetDTO } from 'src/app/modelo/publicacion-get-dto';
import { PublicacionService } from 'src/app/servicios/publicacion.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent {

  ofertas!:PublicacionGetDTO[];

  constructor(private publicacionServicio: PublicacionService){
    //this.ofertas = publicacionServicio.listarNombre().filter(p => p.descuento !== 0);
    
  
  }

}
