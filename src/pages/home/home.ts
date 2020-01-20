import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, } from 'ionic-angular';
import chartJs from 'chart.js';

import { AddPlacePage } from '../add-place/add-place';
import { SigninPage } from '../signin/signin';
import { Place } from '../../models/place';
import { AuthorizationProvider } from '../../providers/authorization/authorization';
import { PlacesProvider } from '../../providers/places/places';
import { PlacePage } from '../place/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('pieCanvas') pieCanvas;

  pieChart: any;
  page;

  homePage = true;
  chatsPage = false;
  profilePage = false;

  places: Place[] = [];

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public authService: AuthorizationProvider,
              private placeService: PlacesProvider) {
    this.page = "home";
  }

  ionViewWillEnter() {
    this.places = this.placeService.loadPlaces();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.pieChart = this.getPieChart();
    }, 350);

  }

  updateData() {
    this.pieChart.data.datasets[0].data = [Math.random() * 1000, Math.random() * 1000];
    this.pieChart.update();
  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
  }

  getPieChart() {
    const data = {
      labels: ['Не можна', 'Можна'],
      datasets: [
        {
          data: [250, 150],
          backgroundColor: ['#191970', '#ff6600'],
          // hoverBackgroundColor: ['#191970', '#ff6600'],
        }]
    };
    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);

  }

  addPlacePage = AddPlacePage;


  placeTapped(place) {
    alert(place.name + ' was tapped.');
  }

  openDialog() {
    this.openModal('LawPage');
  }

  openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
                  .present();
  }

}
