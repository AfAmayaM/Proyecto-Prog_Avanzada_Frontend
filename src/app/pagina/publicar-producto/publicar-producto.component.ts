import { Component, OnInit } from '@angular/core';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { PublicacionDTO } from 'src/app/modelo/publicacion-dto';
@Component({
  selector: 'app-publicar-producto',
  templateUrl: './publicar-producto.component.html',
  styleUrls: ['./publicar-producto.component.css']
})
export class PublicarProductoComponent implements OnInit {

  categorias: string[];
  publicacion:PublicacionDTO;
  producto:ProductoDTO;
  archivos!:FileList;
  constructor() {
    this.categorias = [];
    this.publicacion = new PublicacionDTO;
    this.producto = new ProductoDTO;

  }

  ngOnInit(): void {
    this.categorias.push('Tecnología');
    this.categorias.push('Hogar');
    this.categorias.push('Deportes');
    this.categorias.push('Moda');
    this.categorias.push('Mascotas');
  }
  
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      console.log(files);
    }
  }
  public crearProducto(){
    if(this.archivos != null && this.archivos.length > 0){
    console.log(this.producto);
    }else{
    console.log('Debe seleccionar al menos una imagen');
    }
    }
}
