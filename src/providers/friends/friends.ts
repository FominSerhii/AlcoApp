import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import * as firebase from 'firebase/app';

import { UserProvider } from '../user/user';
import { AuthorizationProvider } from '../authorization/authorization';
import { RequestsProvider } from '../requests/requests';

@Injectable()

export class FriendsProvider {
  private friendsRef = firebase.database().ref('/friends');

  public friends: Array<any> = [];

  constructor(
    private events: Events,
    private userProvider: UserProvider,
    private requestsProvider: RequestsProvider,
    private authProvider: AuthorizationProvider
  ) {}

  getFriends() {
    let currentUser = this.authProvider.currentUser;

    this.friendsRef
      .child(currentUser.uid)
      .on('value', (snapshot) => {
        let allFriends = snapshot.val();
        let myFriends = [];

        this.friends = [];

        for (let friend in allFriends) {
          myFriends.push(allFriends[friend].uid)
        };

        // Remove duplicates
        myFriends = myFriends.filter((v, i) => myFriends.indexOf(v) === i);

        this.userProvider.getUsers().then((res) => {
          let allUsers = res;

          for (let friend in myFriends) {
            for (let user in allUsers) {
              if (myFriends[friend] === allUsers[user].uid) {
                this.friends.push(allUsers[user]);
              }
            }
          }

          this.events.publish('gotFriends');
        });
      });
  }

  deleteFriend(user) {
    let currentUser = this.authProvider.currentUser;

    return new Promise<any>((resolve, reject) => {
      this.friendsRef
        .child(currentUser.uid)
        .orderByChild('uid')
        .equalTo(user.uid)
        .once('value', (snapshot) => {
          let userId = null;

          for (let key in snapshot.val()) userId = key;

          this.friendsRef
            .child(currentUser.uid)
            .child(userId)
            .remove()
            .then(() => {
              this.friendsRef
                .child(user.uid)
                .orderByChild('uid')
                .equalTo(currentUser.uid)
                .once('value', (snapshot) => {
                  let userId = null;

                  for (let key in snapshot.val()) userId = key;

                  this.friendsRef
                    .child(user.uid)
                    .child(userId)
                    .remove()
                    .then(() => {
                      resolve();
                    });
                });
            });
        });
    });
  }

  acceptRequest(user) {
    let currentUser = this.authProvider.currentUser;

    return new Promise<any>((resolve, reject) => {
      this.friendsRef
        .child(currentUser.uid).push({
          uid: user.uid
        }).then(() => {
          this.friendsRef
            .child(user.uid).push({
              uid: currentUser.uid
            }).then(() => {
              this.requestsProvider.cancelRequest(user).then((res) => {
                resolve(res);
              });
            });
        });
    });
  }

}
