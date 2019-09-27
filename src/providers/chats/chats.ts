import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import * as firebase from 'firebase/app';

import { AuthorizationProvider } from '../authorization/authorization';

/*
  Generated class for the ChatsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class ChatsProvider {
  private chatsRef = firebase.database().ref('/chats');

  public messages: Array<any> = [];
  public chatMessages: Array<any> = [];
  public selectedFriend: any = {};

  constructor(
    private events: Events,
    private authProvider: AuthorizationProvider
  ) {}

  selectChat(friend) {	
    this.selectedFriend = friend;
  }

  getMessages() {
    let currentUser = this.authProvider.currentUser;

    this.chatsRef
      .child(currentUser.uid)
      .on('value', (snapshot) => {
        let allMessages = snapshot.val();

        this.messages = allMessages;

        this.events.publish('gotMessages');
      });
  }

  getChatMessages() {
    let currentUser = this.authProvider.currentUser;

    this.chatsRef
      .child(currentUser.uid)
      .child(this.selectedFriend.uid)
      .on('value', (snapshot) => {
        let allMessages = snapshot.val();

        this.chatMessages = [];

        for (let message in allMessages) {
          this.chatMessages.push(allMessages[message]);
        }

        this.events.publish('gotMessage');
      });
  }

  addMessage(message) {
    let currentUser = this.authProvider.currentUser;

    return new Promise<any>((resolve, reject) => {
      this.chatsRef
        .child(currentUser.uid)
        .child(this.selectedFriend.uid)
        .push({
          sentBy: currentUser.uid,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          ...message
        }).then(() => {
          this.chatsRef
            .child(this.selectedFriend.uid)
            .child(currentUser.uid).push({
              sentBy: currentUser.uid,
              timestamp: firebase.database.ServerValue.TIMESTAMP,
              ...message
            }).then(() => {
              resolve();
            });
          });
    });
  }

}
