import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

const v2Routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    }

]

export const HOME_ROUTES = RouterModule.forChild(v2Routes);