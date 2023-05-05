import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestarEncuestaComponent } from './pages/contestar-encuesta/contestar-encuesta.component';
import { MostrarEncuestasComponent } from './pages/mostrar-encuestas/mostrar-encuestas.component';
import { ENCUESTAS_ROUTES } from './encuestas.routes';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContestarEncuestaComponent,
    MostrarEncuestasComponent
  ],
  imports: [
    CommonModule,
    ENCUESTAS_ROUTES,
    ReactiveFormsModule
  ]
})
export class EncuestasModule { }
