import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthenticationService {

  constructor(private auth: AngularFireAuth) {
    this.user = auth.authState;
  }

  user: Observable<firebase.User>;

  loginWithGoogle() {
    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.auth.signOut();
  }

}
