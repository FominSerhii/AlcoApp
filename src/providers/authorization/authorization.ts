import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';

@Injectable()
export class AuthorizationProvider {

  token: string;
  user: Observable<firebase.User>;
  userDetails: firebase.User = null;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signupUser(email: string, password: string) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then((value) => {
      console.log('Success!', value)
    }).catch(error => console.log('error'));
  }

  signinUser(email: string, password: string) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
        response => {
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
        }
        )
      .catch(
        error => console.log('error'),
      );
  }

  logout() {
    this.firebaseAuth.auth.signOut();
    this.token = null;
  }

  isLoggedIn(): boolean {
    if (this.userDetails !== null) {
      return true;
    }
  }

  isAuthenticated() {
    return this.token != null;
  }

}
