import { RouterModule, Routes } from "@angular/router";
import { MiPerfilComponent } from "./pages/mi-perfil/mi-perfil.component";

const v2Routes: Routes = [
    {
        path: '',
        component: MiPerfilComponent,
    }

]

export const PERFIL_ROUTES = RouterModule.forChild(v2Routes);