import { AngularFireModule } from '@angular/fire';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AgmCoreModule } from '@agm/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { PlacePage } from '../pages/place/place';
import { ChatsPage } from '../pages/chats/chats';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { UserProvider } from '../providers/user/user';
import { ContactPage } from '../pages/contact/contact';
import { ChatsProvider } from '../providers/chats/chats';
import { AddPlacePage } from '../pages/add-place/add-place';
import { AlertsProvider } from '../providers/alerts/alerts';
import { ChatUsersPage } from '../pages/chat-users/chat-users';
import { FriendsProvider } from '../providers/friends/friends';
import { ChannelsProvider } from '../providers/channels/channels';
import { RequestsProvider } from '../providers/requests/requests';
import { SetLocationPage } from '../pages/set-location/set-location';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ChatSelectedPage } from '../pages/chat-selected/chat-selected';
import { AuthorizationProvider } from '../providers/authorization/authorization';

export const config = {
    apiKey: "AIzaSyBwDzEQisYfF87ovoqdCxO9zgeu0W3mi38",
    authDomain: "alcoholapp-531f5.firebaseapp.com",
    databaseURL: "https://alcoholapp-531f5.firebaseio.com",
    projectId: "alcoholapp-531f5",
    storageBucket: "alcoholapp-531f5.appspot.com",
    messagingSenderId: "426245460320"
};

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    AddPlacePage,
    PlacePage,
    SetLocationPage,
    SigninPage,
    SignupPage,
    ChatsPage,
    EditProfilePage,
    ChatUsersPage,
    ChatSelectedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAobBv016tRPMQwEQddlo8RSZ0YENEK5q4'
    })
  ],
  bootstrap: [IonicApp],    
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    AddPlacePage,
    PlacePage,
    SetLocationPage,
    SigninPage,
    SignupPage,
    ChatsPage,
    EditProfilePage,
    ChatUsersPage,
    ChatSelectedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthorizationProvider,
    AlertsProvider,
    ChannelsProvider,
    ChatsProvider,
    FriendsProvider,
    RequestsProvider,
    UserProvider
  ]
})
export class AppModule {}
