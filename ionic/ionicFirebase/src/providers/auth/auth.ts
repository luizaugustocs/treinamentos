import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import * as firebase from 'firebase/app';
import {AngularFireAuth} from "angularfire2/auth";


@Injectable()
export class AuthProvider {


  user: Observable<firebase.User>;

  constructor(private auth: AngularFireAuth) {
    this.user = this.auth.authState;


  }

  loginWithEmail({email, password}) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    return this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  registerUser({email, password}) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password)
  }

  resetPassword(email: string) {
    return this.auth.auth.sendPasswordResetEmail(email);
  }

  logout() {
    return this.auth.auth.signOut();
  }

}
