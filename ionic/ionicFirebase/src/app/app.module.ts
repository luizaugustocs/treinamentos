import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthProvider} from '../providers/auth/auth';
import {BeerProvider} from '../providers/beer/beer';
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {LogoffPage} from "../pages/logoff/logoff";
import {BeerPage} from "../pages/beer/beer";

export const firebaseConfig = {
  apiKey: "AIzaSyDzoBLj5L5QC3NoP27HbfLnyF6I4eNf-do",
  authDomain: "ionicfirebase-2a1d6.firebaseapp.com",
  databaseURL: "https://ionicfirebase-2a1d6.firebaseio.com",
  projectId: "ionicfirebase-2a1d6",
  storageBucket: "",
  messagingSenderId: "168258134283"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    LogoffPage,
    RegisterPage,
      BeerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    LogoffPage,
    RegisterPage,
      BeerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    BeerProvider
  ]
})
export class AppModule {
}
