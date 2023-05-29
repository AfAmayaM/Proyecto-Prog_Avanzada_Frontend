import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { CuentaDTO } from '../modelo/cuenta-dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private cuentaUrl = "https://proyecto-progavanzada-production.up.railway.app/api/cuenta"

  constructor(private http: HttpClient) { }

  public buscarCuenta(email: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.cuentaUrl}/obtenerCuentaEmail?email=${email}`);
  }

  public recuperarContra(email: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.cuentaUrl}/recuperarContra?email=${email}`);
  }

  public cambiarContra(cuenta: CuentaDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.cuentaUrl}/cambiarContra`, cuenta);
  }
}
