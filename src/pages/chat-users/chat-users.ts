import { Component } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar';

import { UserProvider } from '../../providers/user/user';
import { RequestsProvider } from '../../providers/requests/requests';
import { AuthorizationProvider } from '../../providers/authorization/authorization';

@Component({
  selector: 'page-chat-users',
  templateUrl: 'chat-users.html',
})

export class ChatUsersPage {
  users = [];
  filteredUsers = [];
  currentUser: any = {};

  constructor(
    public userProvider: UserProvider,
    public requestsProvider: RequestsProvider,
    public authenticationProvider: AuthorizationProvider,
    private statusBar: StatusBar
  ) {
    this.currentUser = this.authenticationProvider.currentUser;
  }

  ionViewDidLoad() {
    this.statusBar.backgroundColorByHexString('#212121');
    this.statusBar.styleLightContent();

    this.getUsers();
  }

  ionViewDidLeave() {
    this.statusBar.backgroundColorByHexString('#ffffff');
    this.statusBar.styleDefault();
  }

  getUsers() {
    this.userProvider.getUsers().then(usersRes => {
      this.userProvider.getFriends().then(friendsRes => {
        let currentUserId = this.currentUser.uid;
        let removeIndex = usersRes.map((user) => user.uid).indexOf(currentUserId);

        usersRes.splice(removeIndex, 1);

        friendsRes.forEach(friend => {
          let removeIndex = usersRes.map((user) => user.uid).indexOf(friend.uid);

          usersRes.splice(removeIndex, 1);
        });

        this.users = usersRes;
        this.filteredUsers = usersRes;
      });
    });
  }

  sendRequest(user) {
    let request = {
      sender: this.currentUser.uid,
      recipient: user.uid
    };

    this.requestsProvider.sendRequest(request).then((res) => {
      let selectedUser = this.filteredUsers.indexOf(user);

      this.filteredUsers.splice(selectedUser, 1);
    });
  }

  searchUser(event) {
    this.filteredUsers = this.users;

    let q = event.target.value;

    if (q.trim() === '') return;

    this.filteredUsers = this.filteredUsers.filter((user) => {
      let fullName = user.firstName + ' ' + user.lastName;

      if (fullName.toLowerCase().indexOf(q.toLowerCase()) > -1) return true;

      return false;
    });
  }

}
