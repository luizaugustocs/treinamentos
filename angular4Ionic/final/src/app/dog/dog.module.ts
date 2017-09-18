import { DogService } from './dog.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogRoutingModule } from './dog-routing.module';
import { DogCrudComponent } from './crud/crud.component';
import { DogListComponent } from './list/list.component';
import { DogDetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    DogRoutingModule
  ],
  providers: [DogService],
  declarations: [DogCrudComponent, DogListComponent, DogDetailsComponent]
})
export class DogModule { }
