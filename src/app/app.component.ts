import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './servicios/token.service';
import { SesionService } from './servicios/sesion.service';
import { CuentaGetDTO } from './modelo/cuenta-get-dto';
import { CuentaService } from './servicios/cuenta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Unimarket';
  fecha = 'Mayo de 2023';
  isLogged = false;
  email: string = '';
  productosCarrito: number = 0;
  cuenta!: CuentaGetDTO;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private cuentaServicio: CuentaService,
    private sesionServicio: SesionService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    const objeto = this;
    this.sesionServicio.currentMessage.subscribe({
      next: (data) => {
        objeto.actualizarSesion(data);
      }
    });
    this.actualizarSesion(this.tokenService.isLogged());
  }

  private actualizarSesion(estado: boolean) {
    this.isLogged = estado;
    if (estado) {
      this.email = this.tokenService.getEmail();
      this.cuentaServicio.buscarCuenta(this.email).subscribe({
        next: data => {
          this.cuenta = data.respuesta;
        },
        error: error => {
          this.toast.error(error.error.respuesta);
        }
      });
    } else {
      this.email = "";
    }
  }

  public logout() {
    this.isLogged = false;
    this.tokenService.logout();
  }

  public iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(['/busqueda', valor]);
    }
  }
}
