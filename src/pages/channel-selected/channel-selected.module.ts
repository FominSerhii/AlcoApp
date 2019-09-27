import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelSelectedPage } from './channel-selected';

@NgModule({
  declarations: [
    ChannelSelectedPage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelSelectedPage),
  ],
})
export class ChannelSelectedPageModule {}
