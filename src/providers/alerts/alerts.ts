import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()

export class AlertsProvider {
  constructor(
    private alertCtrl: AlertController
  ) {}

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: 'Close',
          handler: () => {}
        }
      ]
    });

    alert.present();
  }

}
