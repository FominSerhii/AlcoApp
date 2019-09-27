import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelUsersPage } from './channel-users';

@NgModule({
  declarations: [
    ChannelUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelUsersPage),
  ],
})
export class ChannelUsersPageModule {}
