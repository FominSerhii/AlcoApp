import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {  } from '@ionic-native/core';

import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  location: Location = {
    lat: 46.88,
    lng: 32.0
  };

  locationIsSet = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();

    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      });
  }

  onLocate() {

  }

}
