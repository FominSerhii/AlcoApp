import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatSelectedPage } from './chat-selected';

@NgModule({
  declarations: [
    ChatSelectedPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatSelectedPage),
  ],
})
export class ChatSelectedPageModule {}
