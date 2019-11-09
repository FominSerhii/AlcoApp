import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SigninPage } from '../signin/signin';
import { ChatsPage } from '../chats/chats';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ChatsPage;
  tab3Root = EditProfilePage;

  constructor() {

  }
}
