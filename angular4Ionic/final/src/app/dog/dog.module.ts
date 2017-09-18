import {DogService} from './dog.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DogRoutingModule} from './dog-routing.module';
import {DogCrudComponent} from './crud/crud.component';
import {DogListComponent} from './list/list.component';
import {DogDetailsComponent} from './details/details.component';
import {
  AutoCompleteModule,
  ButtonModule, DataTableModule, InputTextModule, PanelModule, SharedModule,
  ToggleButtonModule
} from "primeng/primeng";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    DogRoutingModule,FormsModule, InputTextModule,
    PanelModule, ButtonModule, DataTableModule, SharedModule, ToggleButtonModule, AutoCompleteModule
  ],
  providers: [DogService],
  declarations: [DogCrudComponent, DogListComponent, DogDetailsComponent]
})
export class DogModule {
}
