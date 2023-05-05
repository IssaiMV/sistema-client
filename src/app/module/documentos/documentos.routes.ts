import { RouterModule, Routes } from "@angular/router";
import { MostrarDocumentosComponent } from "./pages/mostrar-documentos/mostrar-documentos.component";
import { CrearDocumentoComponent } from "./pages/crear-documento/crear-documento.component";
import { EditarDocumentoComponent } from "./pages/editar-documento/editar-documento.component";

const v2Routes: Routes = [
    {
        path: '',
        component: MostrarDocumentosComponent,
    },
    {
        path: 'crear',
        component: CrearDocumentoComponent,
    },
    {
        path: ':id/editar',
        component: EditarDocumentoComponent,
    },


]

export const DOCUMENTOS_ROUTES = RouterModule.forChild(v2Routes);