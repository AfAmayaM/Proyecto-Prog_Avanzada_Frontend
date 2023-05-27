import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { PublicacionesComponent } from './pagina/publicaciones/publicaciones.component';
import { PublicarProductoComponent } from './pagina/publicar-producto/publicar-producto.component';
import { DetalleProductoComponent } from './pagina/detalle-producto/detalle-producto.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { RevisarPublicacionComponent } from './pagina/revisar-publicacion/revisar-publicacion.component';
import { GestionPublicacionesComponent } from './pagina/gestion-publicaciones/gestion-publicaciones.component';
import { PagoComponent } from './pagina/pago/pago.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesService as RolesGuard } from './guards/roles.service';
import { OfertasComponent } from './pagina/ofertas/ofertas.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'publicaciones', component: PublicacionesComponent },
  { path: 'publicar-producto', component: PublicarProductoComponent },
  { path: 'editar-producto/:codigo', component: PublicarProductoComponent },
  { path: 'detalle-producto/:codigo', component: DetalleProductoComponent },
  { path: 'revisar-publicacion', component: RevisarPublicacionComponent },
  { path: 'gestion-publicaciones', component: GestionPublicacionesComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pago', component: PagoComponent },
  { path: 'busqueda/:valor', component: BusquedaComponent },
  { path: 'busquedaCategoria/:categoria', component: BusquedaComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  { path: 'ofertas', component: OfertasComponent },
  {
    path: 'crear-producto',
    component: PublicarProductoComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: ['USUARIO'],
    },
  },
  {
    path: 'editar-producto/:codigo',
    component: PublicarProductoComponent,
    canActivate: [RolesGuard],
    data: { expectedRole: ['USUARIO'] },
  },
  {
    path: 'gestionar-productos',
    component: GestionPublicacionesComponent,
    canActivate: [RolesGuard],
    data: { expectedRole: ['USUARIO'] },
  },
  { path: "revisar-productos", component: RevisarPublicacionComponent, canActivate: [RolesGuard],
data: { expectedRole: ["MODERADOR"] } },

  { path: '**', pathMatch: 'full', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
