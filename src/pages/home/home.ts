import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import chartJs from 'chart.js';

import { AddPlacePage } from '../add-place/add-place';
import { AuthorizationProvider } from '../../providers/authorization/authorization';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('pieCanvas') pieCanvas;

  pieChart: any;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public authService: AuthorizationProvider) { }

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
      labels: ['Можна', 'Не можна'],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: ['green', 'red'],
          hoverBackgroundColor: ['green','red'],
          image: ['https://thumbs.dreamstime.com/z/%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C-%D0%B0%D0%B2%D0%B0%D1%80%D0%B8%D0%B8-14055867.jpg', 'https://gx.net.ua/news_images/1499957358.jpg']
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
        // {
        //   name: 'Museum of Information',
        //   address: '44 Rue de Info, 75010 Paris, France',
        //   icon: 'information-circle'
        // },
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

  getDirections(card) {
    alert('Getting directions to ' + card.name);
  }

  seeInMap(card) {
    alert('Seeing ' + card.name + ' on maps.');
  }

  // showLongToast(position: string) {
  //   let toast = this.toastCtrl.create({
  //     message: 'Если водитель впервые, сел за руль в состоянии опьянения. То согласно административного кодекса Украины ст. 130 ч.1 предусматривается сумма штрафа в размере 600 необлагаемых минимумов граждан или 10200 грн + изъятие водительского удостоверения на срок 1 год. Других вариантов согласно админ кодекса "искупить вину" — нет, как это было ранее. За повторное нарушение в течении текущего года на водителя накладывается штраф в размере 1200 нмдг или 20400 грн + изъятие прав сроком на 3 года.',
  //     showCloseButton: true,
  //     closeButtonText: 'Ok'
  //   });
  //   toast.present();
  // }

  openDialog() {
    this.openModal('LawPage');
  }

  openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
                  .present();
  }

  onLogout() {
    this.authService.logout();
    console.log('logout')
  }
}
