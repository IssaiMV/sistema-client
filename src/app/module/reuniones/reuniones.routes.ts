import { RouterModule, Routes } from "@angular/router";
import { MostrarReunionesComponent } from "./pages/mostrar-reuniones/mostrar-reuniones.component";
import { AgregarReunionComponent } from "./pages/agregar-reunion/agregar-reunion.component";
import { EditarReunionComponent } from "./pages/editar-reunion/editar-reunion.component";
import { DetallesReunionComponent } from "./pages/detalles-reunion/detalles-reunion.component";

const v2Routes: Routes = [
    {
        path: '',
        component: MostrarReunionesComponent,
    },
    {
        path: 'agregar',
        component: AgregarReunionComponent,
    },
    {
        path: ':id/editar',
        component: EditarReunionComponent,
    },
    {
        path: ':id',
        component: DetallesReunionComponent,
    }

]

export const REUNIONES_ROUTES = RouterModule.forChild(v2Routes);