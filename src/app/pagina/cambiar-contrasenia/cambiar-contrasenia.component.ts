import { Component } from '@angular/core';
import { CuentaDTO } from 'src/app/modelo/cuenta-dto';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']
})
export class CambiarContraseniaComponent {

  cuenta!: CuentaDTO;

  constructor() {
    this.cuenta = new CuentaDTO();
  }

  public cambiarContra() {

  }
}
