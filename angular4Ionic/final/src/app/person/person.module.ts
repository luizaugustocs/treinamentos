import {PersonService} from "./person.service";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PersonRoutingModule} from "./person-routing.module";
import {PersonCrudComponent} from "./crud/crud.component";
import {PersonListComponent} from "./list/list.component";
import {PersonDetailsComponent} from "./details/details.component";
import {ButtonModule, DataTableModule, InputTextModule, PanelModule, SharedModule} from "primeng/primeng";

@NgModule({
  imports: [CommonModule, PersonRoutingModule, FormsModule, InputTextModule,
    PanelModule, ButtonModule, DataTableModule, SharedModule],
  providers: [PersonService],
  declarations: [
    PersonCrudComponent,
    PersonListComponent,
    PersonDetailsComponent
  ]
})
export class PersonModule {
}
