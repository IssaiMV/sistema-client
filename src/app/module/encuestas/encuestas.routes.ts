import { RouterModule, Routes } from "@angular/router";
import { MostrarEncuestasComponent } from "./pages/mostrar-encuestas/mostrar-encuestas.component";
import { ContestarEncuestaComponent } from "./pages/contestar-encuesta/contestar-encuesta.component";

const v2Routes: Routes = [
    {
        path: '',
        component: MostrarEncuestasComponent,
    },
    {
        path: 'contestar',
        component: ContestarEncuestaComponent,
    }

]

export const ENCUESTAS_ROUTES = RouterModule.forChild(v2Routes);