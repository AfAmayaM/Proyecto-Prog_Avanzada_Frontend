import { Component } from '@angular/core';
import { CompraDTO } from 'src/app/modelo/compra-dto';
import { TarjetaDTO } from 'src/app/modelo/tarjeta-dto';
import { CompraService } from 'src/app/servicios/compra.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {

  compra: CompraDTO;
  tarjeta: TarjetaDTO;
  metodoTarjeta: boolean = false;
  metodoEfectivo: boolean = false;

  constructor(private compraServicio: CompraService, private tokenServicio: TokenService) {
    this.compra = new CompraDTO();
    this.tarjeta = new TarjetaDTO();
  }

  public pagar() {
    console.log(this.tarjeta);
    this.compraServicio.cambiarEmail(this.tokenServicio.getEmail());
    this.compraServicio.comprar().subscribe({
      next: data => {
        console.log(data.respuesta);
      },
      error: error => {
        console.log(error.error);
      }
    });
  }

  public toggle(metodo: number) {
    this.compraServicio.cambiarMetodoPago(this.compra.metodoPago);
    if(metodo === 1) {
      this.metodoTarjeta = true;
      this.metodoEfectivo = false;
    } else if (metodo === 2) {
      this.metodoEfectivo = true;
      this.metodoTarjeta = false;
    }
  }
}
