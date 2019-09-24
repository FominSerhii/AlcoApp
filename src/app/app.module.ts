import { AngularFireModule } from '@angular/fire';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
// import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { PlacePage } from '../pages/place/place';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { ContactPage } from '../pages/contact/contact';
import { AddPlacePage } from '../pages/add-place/add-place';
import { SetLocationPage } from '../pages/set-location/set-location';
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
    // TabsPage,
    AddPlacePage,
    PlacePage,
    SetLocationPage,
    SigninPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    // TabsPage,
    AddPlacePage,
    PlacePage,
    SetLocationPage,
    SigninPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthorizationProvider
  ]
})
export class AppModule {}
