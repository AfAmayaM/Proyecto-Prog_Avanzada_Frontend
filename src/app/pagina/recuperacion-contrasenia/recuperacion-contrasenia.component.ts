import { Component } from '@angular/core';
import { CuentaDTO } from 'src/app/modelo/cuenta-dto';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recuperacion-contrasenia',
  templateUrl: './recuperacion-contrasenia.component.html',
  styleUrls: ['./recuperacion-contrasenia.component.css']
})
export class RecuperacionContraseniaComponent {

  cuentaEmail: string;

  constructor(private cuentaServicio: CuentaService, private toast: ToastrService) {
    this.cuentaEmail = "";
  }

  public recuperarContra() {
    this.cuentaServicio.recuperarContra(this.cuentaEmail).subscribe({
      next: data => {
        this.toast.success(data.respuesta);
      },
      error: error => {
        this.toast.error(error.error.respuesta);
      }
    });
  }

}
