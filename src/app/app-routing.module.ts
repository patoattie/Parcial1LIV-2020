import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ErrorComponent } from './componentes/error/error.component';
import { ListadoPeliculasComponent } from './componentes/listado-peliculas/listado-peliculas.component';
import { DetallePeliculaComponent } from './componentes/detalle-pelicula/detalle-pelicula.component';

// Import canActivate guard services
import { AuthGuard } from './guard/auth.guard';
import { SecureInnerPagesGuard } from './guard/secure-inner-pages.guard';

const routes: Routes =
[
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'Login' ,
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'Registro' ,
    component: RegistroComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'Principal' ,
    component: PrincipalComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Peliculas',
        component: ListadoPeliculasComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Pelicula/:id',
        component: DetallePeliculaComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '**' ,
    component: ErrorComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
