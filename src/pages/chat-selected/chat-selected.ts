import { Component, ViewChild } from '@angular/core';
import { Events, Content, ModalController } from 'ionic-angular';

import { ChatsProvider } from '../../providers/chats/chats';
import { UserProvider } from '../../providers/user/user';

import { SelectedPhotoPage } from '../selected-photo/selected-photo';

@Component({
  selector: 'page-chat-selected',
  templateUrl: 'chat-selected.html',
})

export class ChatSelectedPage {
  @ViewChild('content') content: Content;

  selectedFriend: any;
  currentUser: any = {};
  message: any = {};
  messages: Array<any> = [];

  constructor(
    public chatsProvider: ChatsProvider,
    public modalCtrl: ModalController,
    public events: Events,
    public userProvider: UserProvider
  ) {}

  ionViewDidLoad() {
    this.getMessages();
    this.getCurrentUser();
  }

  getMessages() {
    this.chatsProvider.getChatMessages();

    this.selectedFriend = this.chatsProvider.selectedFriend;
    this.messages = this.chatsProvider.chatMessages;

    this.scrollToBottom();

    this.events.subscribe('gotMessage', () => {
      if (this.messages.length !== this.chatsProvider.chatMessages.length) {
        let newMessages = this.chatsProvider.chatMessages.slice(this.messages.length);

        this.messages.push.apply(this.messages, newMessages);
      }

      this.scrollToBottom();
    });
  }

  getCurrentUser() {
    this.userProvider.getCurrentUser().then((res) => {
      this.currentUser = res;

      if (res.chatBackground && res.chatBackground.gradient) {
        this.content.setElementStyle('background', res.chatBackground.gradient);
      }
    });
  }

  addMessage(message) {
    this.chatsProvider.addMessage(message).then(() => {
      this.scrollToBottom();
    });
  }

  addText() {
    let message = {
      type: 'text',
      text: this.message.text
    };

    this.message.text = null;

    this.addMessage(message);
  }

  addPhoto(photo: string) {
    let message = {
      type: 'photo',
      photo
    };

    this.addMessage(message);
  }

  // openCamera() {
  //   this.imageProvider.openCamera().then((res) => {
  //     this.addPhoto(res);
  //   });
  // }

  // openGallery() {
  //   this.imageProvider.openGallery().then((res) => {
  //     this.addPhoto(res);
  //   });
  // }

  selectPhoto(photo) {
    let profileModal = this.modalCtrl.create(SelectedPhotoPage, { photo });

    profileModal.present();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (!this.content._scroll) return;

      this.content.scrollToBottom();
    }, 1000);
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotMessage');
  }

}
