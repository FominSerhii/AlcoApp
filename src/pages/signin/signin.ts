import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { AuthorizationProvider } from '../../providers/authorization/authorization';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signupPage: SignupPage;
  signinForm: FormGroup;
  signinLoading: boolean = false;

  constructor(public formBuilder: FormBuilder,
              public navctrl: NavController,
              public authService: AuthorizationProvider
  ) {
    this.setForms();
  }

  ionViewDidLoad() {}

  setForms() {
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignin() {
    if (this.signinForm.invalid) return;

    let user = this.signinForm.value;

    this.signinLoading = true;

    this.authService.signinUser(user).then((res) => {
      this.signinLoading = false;

      this.navctrl.setRoot(TabsPage);
    }, (rej) => {
      this.signinLoading = false;
    });

  }

  goBack() {
    this.navctrl.pop();
  }

  goSignupPage() {
    this.navctrl.setRoot(TabsPage);
  }

}
