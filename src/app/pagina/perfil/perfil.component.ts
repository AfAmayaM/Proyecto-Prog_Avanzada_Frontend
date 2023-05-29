import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  usuario: UsuarioDTO;

  constructor(private usuarioServicio: UsuarioService, private cuentaServicio: CuentaService, private tokenServicio: TokenService, private toast: ToastrService) {
    this.usuario = new UsuarioDTO();
    this.usuarioServicio.obtener(tokenServicio.getCodigoCuenta()).subscribe({
      next: data => {
        this.usuario = data.respuesta;
        this.usuario.contrasenia = " ";
      },
      error: error => {
        this.toast.error(error.error.respuesta);
      }
    });
  }

  public modificarCuenta() {
    this.usuarioServicio.actualizar(this.tokenServicio.getCodigoCuenta(), this.usuario).subscribe({
      next: data=>{
        this.toast.success(data.respuesta);
      },
      error: error=>{
        this.toast.error(error.error.respuesta);
      }
    })
    
  }
  
  public recuperarContra() {
    this.cuentaServicio.recuperarContra(this.usuario.email).subscribe({
      next: data => {
        this.toast.success(data.respuesta);
      },
      error: error => {
        this.toast.error(error.error.respuesta);
      }
    });
  }

  desactivar(input: HTMLInputElement) {
    input.disabled = false;
  }
}
