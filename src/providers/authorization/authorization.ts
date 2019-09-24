import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';

@Injectable()
export class AuthorizationProvider {

  token: string;
  user: Observable<firebase.User>;
  userDetails: firebase.User = null;
  private usersRef = firebase.database().ref('/users');
  private infoRef = firebase.database().ref('.info/connected');
  public currentUser: firebase.User;


  constructor(private firebaseAuth: AngularFireAuth) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));

    this.firebaseAuth.authState.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));

      this.currentUser = JSON.parse(localStorage.getItem('user'));
    });

  }

  signupUser(user) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const currentUserId = firebase.auth().currentUser.uid;

          this.usersRef
            .child(currentUserId)
            .set({
              uid: currentUserId,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              picture: null
            }).then(() => {
              resolve(res);
            });
          }, err => {
            reject(err);

            // this.alertsProvider.showAlert(err.message);
          });
    });
  }

  signinUser(user) {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          resolve(res);
        }, err => {
          reject(err);

          // this.alertsProvider.showAlert(err.message);
        });
    });
  }

  logout() {
    localStorage.clear();

    return this.firebaseAuth.auth.signOut();

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
