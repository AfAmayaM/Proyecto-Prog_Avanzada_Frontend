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

  private compraUrl = "https://proyecto-progavanzada-production.up.railway.app/api/compra";

  private static compra: CompraDTO = new CompraDTO();

  constructor(private http: HttpClient) { }

  public agregarDetalles(detalles: DetalleCompraDTO[]) {
    CompraService.compra.detalleCompra = detalles;
    console.log(CompraService.compra.detalleCompra);
  }

  public cambiarMetodoPago(metodoPago: string) {
    CompraService.compra.metodoPago = metodoPago;
  }

  public cambiarCodigoUsuario(codigo: number) {
    CompraService.compra.codigoUsuario = codigo;
  }

  public comprar(): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.compraUrl}/crear`, CompraService.compra);
  }

  public listarCompras(codigoUsuario: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.compraUrl}/listar/${codigoUsuario}`);
  }
}
