import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Alerta } from 'src/app/modelo/alerta';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  usuario!: UsuarioDTO;
  registroForm!: FormGroup;
  alerta!: Alerta;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.usuario = new UsuarioDTO();
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      contrasenia: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      confirmaPassword: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  public registrar() {

    const objeto = this;

    this.authService.registrar(this.usuario).subscribe({
      next: (data) => {
        objeto.alerta = new Alerta(data.respuesta, "success")
      },
      error: (error) => {
        objeto.alerta = new Alerta(error.error.respuesta, "danger")
      },
    });
  }

  public sonIguales(): boolean {
    return this.usuario.contrasenia == this.usuario.confirmaPassword;
  }
}
