import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { USUARIOS_ROUTES } from './usuarios.routes';
import { AgregarUsuarioComponent } from './pages/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    USUARIOS_ROUTES,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
