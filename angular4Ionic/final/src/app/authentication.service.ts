import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthenticationService {

  route = '';
  user: Observable<firebase.User>;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.user = auth.authState;
  }

  loginWithGoogle() {
    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.auth.signOut();
    this.router.navigate([''])
  }

}
