import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser = {email: '', password: ''};

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.newUser = {email: '', password: ''};

  }

  onSubmit(form: NgForm) {
    console.log('should register:', this.newUser);
    this.authenticationService.loginWithEmail(this.newUser.email, this.newUser.password).then(response => {
        if (this.authenticationService.url) {
          this.router.navigate([this.authenticationService.url]);
        }
      }
    )
  }

  loginWithGoogle(){
    this.authenticationService.loginWithGoogle();
  }

}
