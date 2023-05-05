import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarDocumentosComponent } from './pages/mostrar-documentos/mostrar-documentos.component';
import { DOCUMENTOS_ROUTES } from './documentos.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearDocumentoComponent } from './pages/crear-documento/crear-documento.component';
import { EditarDocumentoComponent } from './pages/editar-documento/editar-documento.component';



@NgModule({
  declarations: [
    MostrarDocumentosComponent,
    CrearDocumentoComponent,
    EditarDocumentoComponent
  ],
  imports: [
    CommonModule,
    DOCUMENTOS_ROUTES,
    ReactiveFormsModule
  ]
})
export class DocumentosModule { }
