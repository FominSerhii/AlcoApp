import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, } from 'ionic-angular';
import chartJs from 'chart.js';

import { AddPlacePage } from '../add-place/add-place';
import { SigninPage } from '../signin/signin';
import { AuthorizationProvider } from '../../providers/authorization/authorization';

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

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public authService: AuthorizationProvider) {
    this.page = "home";
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

  cards = [
    {
      imageUrl: 'assets/imgs/advance-card-map-paris.png',
      name: 'Paris Map',
      ETA: '26 min',
      distance: 8.1,
      places: [
        {
          name: 'General Pharmacy',
          address: '1 Avenue Faux, 75010 Paris, France',
          icon: 'leaf'
        }
      ]
    },
  ];

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

  onLogout() {
    this.authService.logout();
    this.navCtrl.setRoot(SigninPage);
    console.log('logout')
  }

  home() {
    this.homePage = true;
    this.chatsPage = false;
    this.profilePage = false;
  }

  chats() {
    this.homePage = false;
    this.chatsPage = true;
    this.profilePage = false;
  }

  profile() {
    this.homePage = false;
    this.chatsPage = false;
    this.profilePage = true;
  }

}
