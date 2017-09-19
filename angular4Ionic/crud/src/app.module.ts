import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BeerService } from './beer.service';
import { AppComponent } from './app.component';
import { BeerEditComponent } from './beer-edit.component';
import { BeerListComponent } from './beer-list.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [AppComponent, BeerEditComponent, BeerListComponent],
  providers: [BeerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
