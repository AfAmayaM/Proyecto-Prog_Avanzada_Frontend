import { Injectable } from '@angular/core';
import { ProductoGetDTO } from '../modelo/producto-get-dto';
import { ProductoDTO } from '../modelo/producto-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: ProductoGetDTO[];
  constructor() {
    this.productos = [];
    this.productos.push(new ProductoGetDTO(1, "Televisor LG 4K", "Descripcion 1", 2, 3500000,
      ["https://picsum.photos/450/225", "https://picsum.photos/450/225"], ["TECNOLOGIA"]));
    this.productos.push(new ProductoGetDTO(2, "Tenis Nike CR7", "Descripcion 2", 650000, 4,
      ["https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e1f6eb98-921b-4ad5-90f7-c660082a9095/calzado-de-fútbol-para-terreno-firme-zoom-mercurial-superfly-9-elite-cr7-fg-sb8gJK.png", "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3c8b3552-0ead-489f-a8d9-15258e646c76/calzado-de-fútbol-para-terreno-firme-zoom-mercurial-superfly-9-elite-cr7-fg-sb8gJK.png", "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/af102b20-b68f-41a6-ae57-1cb3125b3bf3/calzado-de-fútbol-para-terreno-firme-zoom-mercurial-superfly-9-elite-cr7-fg-sb8gJK.png", "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/aa278a37-db17-40b9-b9db-6f8aa40fbcbb/calzado-de-fútbol-para-terreno-firme-zoom-mercurial-superfly-9-elite-cr7-fg-sb8gJK.png", "https://static.nike.com/a/images/t_default/2d468e08-20fb-43ea-8edc-237aa0b2ce8c/calzado-de-fútbol-para-terreno-firme-zoom-mercurial-superfly-9-elite-cr7-fg-sb8gJK.png"], ["ROPA", "DEPORTE"]));
    this.productos.push(new ProductoGetDTO(3, "Tenis Nike", "Descripcion 2", 650000, 4,
      ["https://picsum.photos/450/225"], ["MODA", "DEPORTES"]));
    this.productos.push(new ProductoGetDTO(4, "Tenis Nike", "Descripcion 2", 650000, 4,
      ["https://picsum.photos/450/225"], ["MODA", "DEPORTES"]));
    this.productos.push(new ProductoGetDTO(5, "Tenis Nike", "Descripcion 2", 650000, 4,
      ["https://picsum.photos/450/225"], ["MODA", "DEPORTES"]));
    this.productos.push(new ProductoGetDTO(6, "Tenis Nike", "Descripcion 2", 650000, 4,
      ["https://picsum.photos/450/225"], ["MODA", "DEPORTES"]));
    this.productos.push(new ProductoGetDTO(7, "Tenis Nike", "Descripcion 2", 650000, 4,
      ["https://picsum.photos/450/225"], ["MODA", "DEPORTES"]));
    this.productos.push(new ProductoGetDTO(8, "Tenis Nike", "Descripcion 2", 650000, 4,
      ["https://picsum.photos/450/225"], ["MODA", "DEPORTES"]));
  }

  public crear(producto: ProductoDTO) {

  }

  public listar(): ProductoGetDTO[] {
    return this.productos;
  }

  public obtener(codigo:number):ProductoGetDTO | undefined{
    return this.productos.find(p => p.codigo == codigo);
  }
}
