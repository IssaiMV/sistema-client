import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./module/auth/auth.module').then(
        (module) => module.AuthModule
      )
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/home/home.module').then(
        (module) => module.HomeModule
      )
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/usuarios/usuarios.module').then(
        (module) => module.UsuariosModule
      )
  },
  {
    path: 'mi-perfil',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/perfil/perfil.module').then(
        (module) => module.PerfilModule
      )
  },
  {
    path: 'reuniones',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/reuniones/reuniones.module').then(
        (module) => module.ReunionesModule
      )
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
