import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, NgForm } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { AuthorizationProvider } from '../../providers/authorization/authorization';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

backgrounds = [
    'assets/imgs/background-1.jpg',
    'assets/imgs/background-2.jpg',
    'assets/imgs/background-3.jpg',
    'assets/imgs/background-4.jpg'
  ];
  public loginForm: any;

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public formBuilder: FormBuilder,
              public navctrl: NavController,
              public authService: AuthorizationProvider) {}

  ionViewDidLoad() {}

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);
    this.navctrl.setRoot(TabsPage);
  }

  goBack() {
    this.navctrl.pop();
  }

}
