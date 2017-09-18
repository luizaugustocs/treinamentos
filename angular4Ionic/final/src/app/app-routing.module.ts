import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  //{ path: 'login', component: LoginComponent },
  //{ path: 'principal', component: PrincipalComponent },
  //{ path: 'admin', component: AdminComponent,canActivate:[AtenticadorGuard] },
  { path: '',   redirectTo: '/person',    pathMatch: 'full'  },
  //{ path: '**', component: NaoexisteComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
