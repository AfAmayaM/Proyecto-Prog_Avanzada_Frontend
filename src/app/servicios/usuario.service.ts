import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private userUrl = 'https://proyecto-progavanzada-production.up.railway.app/api/usuarios';
  constructor(private http: HttpClient) { }

  public obtener(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/obtener/${codigo}`);
  }
  
  public eliminar(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userUrl}/${codigo}`);
  }

  public actualizar(codigo: number, usuario: UsuarioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.userUrl}/actualizar/${codigo}`, usuario);
  }

  public favoritoAgregar(codigoCuenta: number, codigoPublicacion: number): Observable<MensajeDTO> {
    const params = new HttpParams().set('codigoCuenta', codigoCuenta).set('codigoPublicacion', codigoPublicacion);
    return this.http.post<MensajeDTO>(`${this.userUrl}/favoritoAgregar`, null, {params: params});
  }

  public favoritoEliminar(codigoCuenta: number, codigoPublicacion: number): Observable<MensajeDTO> {
    const params = new HttpParams().set('codigoCuenta', codigoCuenta).set('codigoPublicacion', codigoPublicacion);
    return this.http.delete<MensajeDTO>(`${this.userUrl}/favoritoEliminar`, {params: params});
  }
}
