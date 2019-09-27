import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';

import { AuthorizationProvider } from '../authorization/authorization';

@Injectable()

export class UserProvider {
  private userRef = firebase.database().ref('/users');
  private friendsRef = firebase.database().ref('/friends');

  constructor(
    private authProvider: AuthorizationProvider
  ) {}

  getCurrentUser() {
    let currentUser = this.authProvider.currentUser;

    return new Promise<any>((resolve, reject) => {
      this.userRef
        .child(currentUser.uid)
        .once('value', (snapshot) => {
          resolve(snapshot.val());
        }).catch(error => {
          reject(error);
        });
    });
  }

  getUser(id) {
    return new Promise<any>((resolve, reject) => {
      this.userRef
        .child(id)
        .once('value', (snapshot) => {
          resolve(snapshot.val());
        }).catch((error) => {
          reject(error);
        });
    });
  }

  deleteCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth()
        .currentUser
        .delete()
        .then((snapshot) => {
          resolve();
        }).catch((error) => {
          reject(error);
        });
    });
  }

  updateUser(user) {
    return new Promise<any>((resolve, reject) => {
      this.userRef
        .child(user.uid).update({
          ...user
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  getUsers() {
    return new Promise<any>((resolve, reject) => {
      this.userRef
        .orderByChild('uid')
        .once('value', (snapshot) => {
          let users = snapshot.val();
          let response = [];

          for (let key in users) {
            response.push(users[key]);
          }

          resolve(response);
        });
    });
  }

  getFriends() {
    let currentUser = this.authProvider.currentUser;

    return new Promise<any>((resolve, reject) => {
      this.friendsRef
        .child(currentUser.uid)
        .once('value', (snapshot) => {
          let friends = snapshot.val();
          let response = [];

          for (let key in friends) {
            response.push(friends[key]);
          }

          resolve(response);
        });
    });
  }

}
