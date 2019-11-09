import { Component } from '@angular/core';
import { NavController, Events, ItemSliding } from 'ionic-angular';

import { RequestsProvider } from '../../providers/requests/requests';
import { FriendsProvider } from '../../providers/friends/friends';
import { ChatsProvider } from '../../providers/chats/chats';

import { ChatSelectedPage } from '../chat-selected/chat-selected';
import { ChatUsersPage } from '../chat-users/chat-users';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})

export class ChatsPage {
  requests: Array<any> = [];
  friends: Array<any> = [];
  messages: Array<any> = [];
  filteredFriends: Array<any> = [];
  friendsLoading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public requestsProvider: RequestsProvider,
    public chatsProvider: ChatsProvider,
    public friendsProvider: FriendsProvider
  ) {}

  ionViewWillEnter() {
    this.getRequests();
    this.getFriends();
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotRequests');
    this.events.unsubscribe('gotFriends');
    this.events.unsubscribe('gotMessages');
  }

  getMessages() {
    this.chatsProvider.getMessages();

    this.messages = this.chatsProvider.messages;

    this.events.subscribe('gotMessages', () => {
      this.messages = this.chatsProvider.messages;

      this.filteredFriends.forEach((friend) => {
        if (this.messages && this.messages[friend.uid]) {
          let messageKeys = Object.keys(this.messages[friend.uid]);
          let lastMessageKey = messageKeys[messageKeys.length - 1];
          let lastMessage = this.messages[friend.uid][lastMessageKey];

          friend.lastMessage = lastMessage.text;
        }
      });
    });
  }

  getRequests() {
    this.requestsProvider.getRequests();

    this.requests = this.requestsProvider.requests;

    this.events.subscribe('gotRequests', () => {
      this.requests = this.requestsProvider.requests;
    });
  }

  getFriends() {
    this.friendsLoading = true;

    this.friendsProvider.getFriends();

    this.friends = this.friendsProvider.friends;
    this.filteredFriends = this.friendsProvider.friends;

    this.getMessages();

    this.events.subscribe('gotFriends', () => {
      this.friends = this.friendsProvider.friends;
      this.filteredFriends = this.friendsProvider.friends;

      this.getMessages();

      this.friendsLoading = false;
    });
  }

  acceptRequest(user) {
    this.friendsProvider.acceptRequest(user);
  }

  cancelRequest(user) {
    this.requestsProvider.cancelRequest(user);
  }

  goToUsers() {
    this.navCtrl.push(ChatUsersPage);
  }

  selectChat(friend) {
    this.chatsProvider.selectChat(friend);

    this.navCtrl.push(ChatSelectedPage);
  }

  deleteChat(slidingItem: ItemSliding, friend) {
    slidingItem.close();

    this.friendsProvider.deleteFriend(friend);
  }

  search(event) {
    this.filteredFriends = this.friends;

    let q = event.target.value;

    if (q.trim() === '') return;

    this.filteredFriends = this.filteredFriends.filter((user) => {
      let fullName = `${user.firstName} ${user.lastName}`;

      if (fullName.toLowerCase().indexOf(q.toLowerCase()) > -1) return true;

      return false;
    });
  }

}
