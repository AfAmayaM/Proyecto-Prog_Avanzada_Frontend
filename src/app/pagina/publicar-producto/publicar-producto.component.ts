import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { PublicacionDTO } from 'src/app/modelo/publicacion-dto';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { PublicacionService } from 'src/app/servicios/publicacion.service';
@Component({
  selector: 'app-publicar-producto',
  templateUrl: './publicar-producto.component.html',
  styleUrls: ['./publicar-producto.component.css']
})

export class PublicarProductoComponent implements OnInit {

  categorias: Categoria[] = [
    { label: 'Tecnologia', name: 'TECNOLOGIA', checked: false },
    { label: 'Hogar', name: 'HOGAR', checked: false },
    { label: 'Moda', name: 'MODA', checked: false },
    { label: 'Mercado', name: 'MERCADO', checked: false },
    { label: 'Juguetes', name: 'JUGUETES', checked: false },
    { label: 'Deportes', name: 'DEPORTES', checked: false },
    { label: 'Herramientas', name: 'HERRAMIENTAS', checked: false },
    { label: 'Electrodomésticos', name: 'ELECTRODOMESTICOS', checked: false },
    { label: 'Vehiculos', name: 'VEHICULOS', checked: false },
  ];
  publicacion: PublicacionDTO;
  producto: ProductoDTO;
  archivos!: File[];
  esEdicion: boolean;
  codigoProducto: number;
  alerta!: Alerta;

  constructor(private router: ActivatedRoute, private productoServicio: ProductoService, private publicacionServicio: PublicacionService, private imagenServicio: ImagenService, private categoriaServicio: CategoriaService) {
    this.publicacion = new PublicacionDTO;
    this.producto = new ProductoDTO;
    this.publicacion.producto = this.producto;
    this.esEdicion = false;
    this.codigoProducto = 0;
    this.router.params.subscribe(params => {
      this.codigoProducto = params["codigo"];
      let objetoProducto = this.productoServicio.obtener(this.codigoProducto);
      if (objetoProducto != null) {
        this.producto = objetoProducto;
        this.esEdicion = true;
      }
    });
    this.cargarCategorias();
    if (this.esEdicion) {
      this.cargarCategoriasProducto();
    }
  }

  ngOnInit(): void {
  }

  onCategoriasChange() {
    const names = this.categorias.filter(categoria => categoria.checked).map(categoria => categoria.name);
    this.producto.categorias = names;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.archivos = files;
      const archivosArray: File[] = Array.from(this.archivos);
      //this.producto.imagenes = files;
      //this.producto.imagenes = archivosArray;
    }
  }

  getObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }

  public crearPublicacion() {
    if (this.producto.imagenes.length > 0) {
      const objeto = this;
      this.publicacionServicio.crear(this.producto).subscribe({
        next: (data) => {
          objeto.alerta = new Alerta(data.respuesta, "success");
        },
        error: (error) => {
          objeto.alerta = new Alerta(error.respuesta, "success");
        }
      });
    } else {
      console.log('Debe seleccionar al menos una imagen y subirla');
    }
  }

  public subirImagenes() {
    if (this.archivos != null && this.archivos.length > 0) {
      const objeto = this;
      const formData = new FormData();
      for (let file of this.archivos) {
        formData.append('file', file);
        this.imagenServicio.subir(formData).subscribe({
          next: (data) => {
            objeto.producto.imagenes.push(data.respuesta.url);
            console.log("Imagenes subidas " + data.respuesta.url);
            objeto.alerta = new Alerta(data.respuesta, "success");
          },
          error: (error) => {
            objeto.alerta = new Alerta(error.respuesta, "error");
          }
        });
      }
      console.log(objeto.producto.imagenes);
    } else {
      console.log('Debe seleccionar al menos una imagen y subirla');
    }
  }

  private cargarCategorias() {
    this.categoriaServicio.listar().subscribe({
      next: data => {
        ;
      },
      error: error => {
        console.log(error.error);
      }
    });
  }

  private cargarCategoriasProducto() {
    for (let categoria of this.producto.categorias) {
      let index = this.categorias.findIndex(c => c.name === categoria);
      if (index !== -1) {
        this.categorias[index].checked = true;
      }
    }
  }


}

interface Categoria {
  label: string;
  name: string;
  checked: boolean;
}
