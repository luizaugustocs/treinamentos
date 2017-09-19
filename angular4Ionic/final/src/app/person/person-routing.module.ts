import { PersonDetailsComponent } from './details/details.component';
import { PersonListComponent } from './list/list.component';
import { PersonCrudComponent } from './crud/crud.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'person',
    component:PersonCrudComponent,
    children:[
      { path:'',component:PersonListComponent },
      { path:'details/:id',component:PersonDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
