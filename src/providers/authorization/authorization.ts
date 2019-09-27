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

  resetPassword(email: string) {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth
        .auth
        .sendPasswordResetEmail(email)
        .then((res) => {
          resolve(res);
        }, err => {
          reject(err);

          
        });
    });
  }

  logout() {
    localStorage.clear();

    return this.firebaseAuth.auth.signOut();

  }

  facebookSignin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();

      this.firebaseAuth
        .auth
        .signInWithPopup(provider)
        .then((res) => {
          this.usersRef
            .child(this.currentUser.uid)
            .once('value', (snapshot) => {
              if (snapshot.val().uid) {
                resolve();
              } else {
                this.usersRef
                  .child(this.currentUser.uid)
                  .update({
                    uid: this.currentUser.uid,
                    email: res.user.email,
                    firstName: res.user.displayName.split(' ')[0],
                    lastName: res.user.displayName.split(' ')[1],
                    username: res.user.email.split('@')[0],
                    picture: null
                  }).then(() => {
                    resolve(res);
                  });
              }
            });
        }, err => {
          reject(err);

          // this.alertsProvider.showAlert(err.message);
        });
    });
  }

  googleSignin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();

      provider.addScope('profile');
      provider.addScope('email');

      this.firebaseAuth
        .auth
        .signInWithPopup(provider)
        .then((res) => {
          this.usersRef
            .child(this.currentUser.uid)
            .once('value', (snapshot) => {
              if (snapshot.val().uid) {
                resolve();
              } else {
                this.usersRef
                  .child(this.currentUser.uid)
                  .update({
                    uid: this.currentUser.uid,
                    email: res.user.email,
                    firstName: res.user.displayName.split(' ')[0],
                    lastName: res.user.displayName.split(' ')[1],
                    username: res.user.email.split('@')[0],
                    picture: null
                  }).then(() => {
                    resolve(res);
                  });
              }
            });
        }, err => {
          reject(err);

          // this.alertsProvider.showAlert(err.message);
        });
    });
  }

  
  private updateOnDisconnect() {
    this.usersRef.child(this.currentUser.uid).onDisconnect().update({ status: 'offline' });
  }

  private updateOnConnect() {
    this.infoRef.on('value', (snapshot) => {
      let status = snapshot.val() ? 'online' : 'offline';

      this.updateStatus(status);
    });
  }

  private updateStatus(status) {
    if (!this.currentUser.uid) return;

    this.usersRef.child(this.currentUser.uid).update({ status: status });
  }


  // isLoggedIn(): boolean {
  //   if (this.userDetails !== null) {
  //     return true;
  //   }
  // }

  // isAuthenticated() {
  //   return this.token != null;
  // }

}
