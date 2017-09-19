import { PersonModule } from './person/person.module';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ButtonModule, GrowlModule, InputTextModule, PanelModule, ToolbarModule} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {DogModule} from "./dog/dog.module";
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./authentication.service";
import {AngularFireAuth} from "angularfire2/auth";
import { HomeComponent } from './home/home.component';
import {CerberusGuard} from "./cerberus.guard";
import {MessageService} from "primeng/components/common/messageservice";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    PersonModule,
    DogModule,
    BrowserAnimationsModule,
    InputTextModule,
    PanelModule, ToolbarModule, ButtonModule, GrowlModule
  ],
  providers: [AuthenticationService, AngularFireAuth, CerberusGuard, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
