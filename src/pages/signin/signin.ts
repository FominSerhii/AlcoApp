import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, NgForm } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { AuthorizationProvider } from '../../providers/authorization/authorization';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signupPage: SignupPage;


  backgrounds = [
    'assets/imgs/background-1.jpg',
    'assets/imgs/background-2.jpg',
    'assets/imgs/background-3.jpg',
    'assets/imgs/background-4.jpg'
  ];
  public loginForm: any;

  signinForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public formBuilder: FormBuilder,
              public navctrl: NavController,
              public authService: AuthorizationProvider) {}

  ionViewDidLoad() {}

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
    this.navctrl.setRoot(TabsPage);
  }

  goBack() {
    this.navctrl.pop();
  }

  goSignupPage() {
    this.navctrl.setRoot(SignupPage);
  }

}
