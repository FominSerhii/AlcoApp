import { Component } from '@angular/core';
import { IonicPage, 
         NavController, 
         NavParams, 
         ModalController, 
         LoadingController, 
         ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';
import { PlacesProvider } from '../../providers/places/places';

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
  imageUrl = '';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private modalCtrl: ModalController, 
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private camera: Camera,
              private placeService: PlacesProvider) {
  }

  onSubmit(form: NgForm) {
    this.placeService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location = {
      lat: 46.88,
      lng: 32.0
    };
    this.imageUrl = '';
    this.locationIsSet = false;
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
    const loader = this.loadingCtrl.create({
      content: "Отримуємо ваше місцезнаходження"
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          console.log(error);
          const toast = this.toastCtrl.create({
            message: 'Не можемо вас знайти6 будь-ласка позначте його самостійно',
            duration: 2500
          });
          toast.present();
        }
      );
  }


  onTakePhoto() {
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    })
    .then(
      imageData => {
        this.imageUrl = imageData;
      }
    )
    .catch(
      err => {
        console.log(err);
      }
    );
  }
}
