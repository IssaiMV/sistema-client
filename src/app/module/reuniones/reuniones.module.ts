import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarReunionesComponent } from './pages/mostrar-reuniones/mostrar-reuniones.component';
import { REUNIONES_ROUTES } from './reuniones.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarReunionComponent } from './pages/agregar-reunion/agregar-reunion.component';
import { EditarReunionComponent } from './pages/editar-reunion/editar-reunion.component';



@NgModule({
  declarations: [
    MostrarReunionesComponent,
    AgregarReunionComponent,
    EditarReunionComponent
  ],
  imports: [
    CommonModule,
    REUNIONES_ROUTES,
    ReactiveFormsModule
  ]
})
export class ReunionesModule { }
