import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { RevisionDTO } from '../modelo/revision-dto';
@Injectable({
  providedIn: 'root'
})
export class ModeradorService {
  private moderadorUrl = 'https://proyecto-progavanzada-production.up.railway.app/api/moderador';
  constructor(private http: HttpClient) { }

  public revisarPublicacion(revision: RevisionDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.moderadorUrl}/revisarPublicacion`, revision);
  }
  
  }

