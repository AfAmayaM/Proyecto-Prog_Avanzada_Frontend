import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Alerta } from 'src/app/modelo/alerta';
import { SesionDTO } from 'src/app/modelo/sesion-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  sesion: SesionDTO;
  loginForm!: FormGroup;
  alerta!: Alerta;

  constructor(private formBuilder: FormBuilder, private authServicio: AuthService, private tokenServicio: TokenService, private toast: ToastrService) {
    this.sesion = new SesionDTO();
  }

  public login() {
    const objeto = this;
    this.authServicio.login(this.sesion).subscribe({
      next: data => {
        objeto.tokenServicio.login(data.respuesta.token);
        this.toast.info("Bienvenido " + this.tokenServicio.getEmail());
      },
      error: error => {
        this.toast.error(error.error.respuesta);
      }
    });

  }
}
