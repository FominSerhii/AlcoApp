import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelInfoPage } from './channel-info';

@NgModule({
  declarations: [
    ChannelInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelInfoPage),
  ],
})
export class ChannelInfoPageModule {}
