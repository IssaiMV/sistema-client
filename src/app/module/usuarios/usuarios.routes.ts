import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AgregarUsuarioComponent } from "./pages/agregar-usuario/agregar-usuario.component";
import { EditarUsuarioComponent } from "./pages/editar-usuario/editar-usuario.component";

const v2Routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
    {
        path: 'agregar',
        component: AgregarUsuarioComponent,
    },
    {
        path: 'editar/:id',
        component: EditarUsuarioComponent,
    }

]

export const USUARIOS_ROUTES = RouterModule.forChild(v2Routes);