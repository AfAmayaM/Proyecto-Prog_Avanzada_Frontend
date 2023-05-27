import { Injectable } from '@angular/core';
import { PublicacionGetDTO } from '../modelo/publicacion-get-dto';
import { ProductoService } from './producto.service';
import { ProductoGetDTO } from '../modelo/producto-get-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { PublicacionDTO } from '../modelo/publicacion-dto';
import { ProductoDTO } from '../modelo/producto-dto';
import { HttpClient } from '@angular/common/http';
import { UsuarioGetDTO } from '../modelo/usuario-get-dto';
import { UsuarioService } from './usuario.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  private publicacionUrl = 'http://localhost:8080/api/publicacion';

  publicaciones: PublicacionGetDTO[];
  constructor(
    private productoServicio: ProductoService,
    private usuarioServicio: UsuarioService,
    private tokenServicio: TokenService,
    private http: HttpClient
  ) {
    this.publicaciones = [];
    /*const productos: ProductoGetDTO[] = productoServicio.listar();
    for (let i = 0; i < productos.length; i++) {
      let producto = productos[i];
      this.publicaciones.push(
        new PublicacionGetDTO(
          i + 1,
          new UsuarioGetDTO(
            i + 1,
            'Didier',
            'rosero',
            'didier@mail.com',
            '12345',
            'Plaza sesamo',
            '329912938'
          ),
          10,
          'hoy',
          'Rechazado',
          [],
          producto
        )
      );
    }*/
  }

  public crear(producto: ProductoDTO): Observable<MensajeDTO> {
    let publicacion = new PublicacionDTO();
    publicacion.codigoCuenta = this.tokenServicio.getCodigoCuenta();
    publicacion.descuento = 0;
    publicacion.producto = producto;
    return this.http.post<MensajeDTO>(
      `${this.publicacionUrl}/crear`,
      publicacion
    );
  }

  public obtener(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicacionUrl}/obtener/${codigo}`);
  }
  public listarNombre(nombre: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicacionUrl}/listarNombre?nombre=${nombre}`);
  }
  public listarPrecio(precioMaximo:number, precioMinimo:number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicacionUrl}/listarPrecio?precioMinimo=${precioMinimo}&precioMaximo=${precioMaximo}`);
  }
  public listarCategoria(categoria:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicacionUrl}/listarCategoria?categoria=${categoria}`);
  }
  public listarEstado(estado:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicacionUrl}/listarEstado?estado=${estado}`);
  }
}
