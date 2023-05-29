import { Component } from '@angular/core';
import { PublicacionGetDTO } from 'src/app/modelo/publicacion-get-dto';
import { PublicacionService } from 'src/app/servicios/publicacion.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioGetDTO } from 'src/app/modelo/usuario-get-dto';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {

  favoritos!: PublicacionGetDTO[];

  constructor(private usuarioServicio: UsuarioService, private publicacionServicio: PublicacionService, private tokenServicio: TokenService, private toast: ToastrService) {
    this.favoritos = [];

    this.publicacionServicio.listarFavoritos(tokenServicio.getCodigoCuenta()).subscribe({
      next: data => {
        this.favoritos = data.respuesta;
      },
      error: error => {
        this.toast.error(error.error.respuesta);
      }
    });
  }

  }

