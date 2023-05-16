import { RouterModule, Routes } from "@angular/router";
import { MostrarEncuestasComponent } from "./pages/mostrar-encuestas/mostrar-encuestas.component";
import { ContestarEncuestaComponent } from "./pages/contestar-encuesta/contestar-encuesta.component";
import { EditarEncuestaComponent } from "./pages/editar-encuesta/editar-encuesta.component";

const v2Routes: Routes = [
    {
        path: '',
        component: MostrarEncuestasComponent,
    },
    {
        path: 'profesor/:id',
        component: MostrarEncuestasComponent,
    },
    {
        path: 'contestar',
        component: ContestarEncuestaComponent,
    },
    {
        path: ':id/editar',
        component: EditarEncuestaComponent,
    },


]

export const ENCUESTAS_ROUTES = RouterModule.forChild(v2Routes);