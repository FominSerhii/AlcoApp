import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { HomePage } from '../pages/home/home';

import * as firebase from 'firebase';

export const config = {
    apiKey: "AIzaSyBwDzEQisYfF87ovoqdCxO9zgeu0W3mi38",
    authDomain: "alcoholapp-531f5.firebaseapp.com",
    databaseURL: "https://alcoholapp-531f5.firebaseio.com",
    projectId: "alcoholapp-531f5",
    storageBucket: "alcoholapp-531f5.appspot.com",
    messagingSenderId: "426245460320"
};

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  rootPage:any = HomePage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);

    if (JSON.parse(localStorage.getItem('user'))) {
      this.rootPage = HomePage;
      
    } else {
      this.rootPage = SigninPage;
    }

  }
}
