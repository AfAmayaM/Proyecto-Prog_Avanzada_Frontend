import { Component } from '@angular/core';
import { CuentaDTO } from 'src/app/modelo/cuenta-dto';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']
})
export class CambiarContraseniaComponent {

  cuenta: CuentaDTO;

  constructor(private cuentaServicio: CuentaService, private toast: ToastrService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.cuenta = new CuentaDTO();
    this.activatedRoute.params.subscribe(param => {
      this.cuenta.email = param['cuentaEmail'];
    });
  }

  public cambiarContra() {
    console.log(this.cuenta);
    this.cuentaServicio.cambiarContra(this.cuenta).subscribe({
      next: data => {
        this.toast.success(data.respuesta);
        this.router.navigate(["/"]);
      },
      error: error => {
        this.toast.error(error.error.respuesta);
      }
    });
  }
}
