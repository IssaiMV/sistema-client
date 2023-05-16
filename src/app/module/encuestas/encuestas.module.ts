import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestarEncuestaComponent } from './pages/contestar-encuesta/contestar-encuesta.component';
import { MostrarEncuestasComponent } from './pages/mostrar-encuestas/mostrar-encuestas.component';
import { ENCUESTAS_ROUTES } from './encuestas.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarEncuestaComponent } from './pages/editar-encuesta/editar-encuesta.component';



@NgModule({
  declarations: [
    ContestarEncuestaComponent,
    MostrarEncuestasComponent,
    EditarEncuestaComponent
  ],
  imports: [
    CommonModule,
    ENCUESTAS_ROUTES,
    ReactiveFormsModule
  ]
})
export class EncuestasModule { }
