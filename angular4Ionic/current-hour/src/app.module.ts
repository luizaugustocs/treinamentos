import { CurrentHourComponent } from './current-hour.component';
import { CurrentHourService } from './current-hour.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, CurrentHourComponent],
  providers: [CurrentHourService],
  bootstrap: [AppComponent]
})
export class AppModule { }
