import { Component } from '@angular/core';
import {AuthenticationService} from "./authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public logged: Boolean;
  constructor(private authenticationService: AuthenticationService) {

    this.authenticationService.user.subscribe((user) => {
      this.logged = !!user;
    })

  }

  doLogout(){
    this.authenticationService.logout();
  }
}
