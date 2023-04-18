import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { PERFIL_ROUTES } from './perfil.routes';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MiPerfilComponent
  ],
  imports: [
    CommonModule,
    PERFIL_ROUTES,
    ReactiveFormsModule
  ]
})
export class PerfilModule { }
