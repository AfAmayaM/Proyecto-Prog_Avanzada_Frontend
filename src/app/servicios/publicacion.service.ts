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
  private publicacionUrl = 'https://proyecto-progavanzada-production.up.railway.app/api/publicacion';

  publicaciones: PublicacionGetDTO[];
  constructor(
    private productoServicio: ProductoService,
    private usuarioServicio: UsuarioService,
    private tokenServicio: TokenService,
    private http: HttpClient
  ) {
    this.publicaciones = [];
  }

  public crear(producto: ProductoDTO): Observable<MensajeDTO> {
    let publicacion = new PublicacionDTO();
    publicacion.codigoCuenta = this.tokenServicio.getCodigoCuenta();
    publicacion.descuento = 0;
    publicacion.producto = producto;
    return this.http.post<MensajeDTO>(`${this.publicacionUrl}/crear`, publicacion);
  }

  public actualizar(codigo:number, publicacion: PublicacionDTO): Observable<MensajeDTO>{
    return this.http.put<MensajeDTO>(`${this.publicacionUrl}/actualizar/${codigo}`, publicacion);
  }

  public eliminar(codigo:number): Observable<MensajeDTO>{
    return this.http.delete<MensajeDTO>(`${this.publicacionUrl}/eliminar/${codigo}`);
  }

  public obtener(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicacionUrl}/obtener/${codigo}`);
  }

  public listarNombre(nombre: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicacionUrl}/listarNombre?nombre=${nombre}`);
  }

  public listarPrecio(precioMinimo:number, precioMaximo:number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicacionUrl}/listarPrecio?precioMinimo=${precioMinimo}&precioMaximo=${precioMaximo}`);
  }

  public listarCategoria(categoria:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicacionUrl}/listarCategoria?categoria=${categoria}`);
  }

  public listarEstado(estado:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicacionUrl}/listarEstado?estado=${estado}`);
  }

  public listar():Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.publicacionUrl}/listar`);
  }

  public listarFavoritos(codigoUsuario:number):Observable<MensajeDTO>{
   return this.http.get<MensajeDTO>(`${this.publicacionUrl}/favoritos/${codigoUsuario}`);
  }
  
  public listarUsuario(codigoUsuario:number):Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.publicacionUrl}/listar/${codigoUsuario}`);
  }
  public listarOfertas():Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.publicacionUrl}/listarOfertas`);
  }
}
