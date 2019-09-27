import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelCreatePage } from './channel-create';

@NgModule({
  declarations: [
    ChannelCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelCreatePage),
  ],
})
export class ChannelCreatePageModule {}
