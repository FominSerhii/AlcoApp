import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-law',
  templateUrl: 'law.html',
})
export class LawPage {
  myParam: string;

  constructor(
    public viewCtrl: ViewController,
    params: NavParams
  ) {
    this.myParam = params.get('myParam');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
