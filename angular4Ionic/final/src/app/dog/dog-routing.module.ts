import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DogCrudComponent} from "./crud/crud.component";
import {DogListComponent} from "./list/list.component";
import {DogDetailsComponent} from "./details/details.component";

const routes: Routes = [
  {
    path: 'dog',
    component: DogCrudComponent,
    children: [
      {path: '', component: DogListComponent},
      {path: 'details/:id', component: DogDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DogRoutingModule {
}
