import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import * as firebase from 'firebase/app';

import { UserProvider } from '../user/user';
import { AuthorizationProvider } from '../authorization/authorization';

@Injectable()

export class RequestsProvider {
  private requestsRef = firebase.database().ref('/requests');

  public requests: Array<any> = [];

  constructor(
    private events: Events,
    private userProvider: UserProvider,
    private authProvider: AuthorizationProvider
  ) {}

  getRequests() {
    let currentUser = this.authProvider.currentUser;

    this.requestsRef
      .child(currentUser.uid)
      .on('value', (snapshot) => {
        let allRequests = snapshot.val();
        let myRequests = [];

        this.requests = [];

        for (let request in allRequests) {
          myRequests.push(allRequests[request].sender);
        }

        // Remove duplicates
        myRequests = myRequests.filter((v, i) => myRequests.indexOf(v) === i);

        this.userProvider.getUsers().then((res) => {
          let allUsers = res;

          for (let request in myRequests) {
            for (let user in allUsers) {
              if (myRequests[request] === allUsers[user].uid) {
                this.requests.push(allUsers[user]);
              }
            }
          }

          this.events.publish('gotRequests');
        });
      });
  }

  sendRequest(req) {
    return new Promise<any>((resolve, reject) => {
      this.requestsRef
        .child(req.recipient).push({
          sender: req.sender
        }).then((res) => {
          resolve(res);
        }, (error) => {
          reject(error);
        });
    });
  }

  cancelRequest(user) {
    let currentUser = this.authProvider.currentUser;

    return new Promise<any>((resolve, reject) => {
      this.requestsRef
        .child(currentUser.uid)
        .orderByChild('sender')
        .equalTo(user.uid)
        .once('value', (snapshot) => {
          let someKey = null;

          for (let key in snapshot.val()) someKey = key;

          this.requestsRef
            .child(currentUser.uid)
            .child(someKey)
            .remove()
            .then((res) => {
              resolve(res);
            });
        });
    });
  }

}
