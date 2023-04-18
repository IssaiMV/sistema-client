import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";

const v2Routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    }

]

export const AUTH_ROUTES = RouterModule.forChild(v2Routes);