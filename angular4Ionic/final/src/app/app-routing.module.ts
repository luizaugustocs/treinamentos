import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {CerberusGuard} from "./cerberus.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  //{ path: 'admin', component: AdminComponent,canActivate:[AtenticadorGuard] },
  // { path: '**', component: HomeComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(r: Router) {
    this.associateGuard(r.config);
  }

  associateGuard(routes: Routes) {

    routes.forEach((route) => {
      if (route.children) {
        route.canActivate = [CerberusGuard];
        this.associateGuard(route.children)
      }
    })
  }
}
