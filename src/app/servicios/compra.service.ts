import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { CompraDTO } from '../modelo/compra-dto';
import { ProductoDTO } from '../modelo/producto-dto';
import { DetalleCompraDTO } from '../modelo/detalle-compra-dto';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private compraUrl = "http://localhost:8080/api/compra";

  private static compra: CompraDTO = new CompraDTO();

  constructor(private http: HttpClient) { }

  public agregarDetalles(detalles: DetalleCompraDTO[]) {
    CompraService.compra.detalleCompra = detalles;
  }

  public cambiarMetodoPago(metodoPago: string) {
    CompraService.compra.metodoPago = metodoPago;
  }

  public cambiarEmail(email: string) {
    CompraService.compra.email = email;
  }

  public comprar(): Observable<MensajeDTO> {
    console.log(CompraService.compra);
    return this.http.post<MensajeDTO>(`${this.compraUrl}/crear`, CompraService.compra);
  }
}
