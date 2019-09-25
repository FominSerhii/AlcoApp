import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';

// import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { SigninPage } from '../signin/signin';
import { AuthorizationProvider } from '../../providers/authorization/authorization';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
  signupLoading: boolean = false;

  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public navctrl: NavController,
              public authService: AuthorizationProvider) {
    this.setForms();
  }

  setForms() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required]
    });
  }


  ionViewDidLoad() {}

  signup() {
    if (this.signupForm.invalid) return;

    let user = this.signupForm.value;

    this.signupLoading = true;

    this.authService.signupUser(user).then((res) => {
      this.authService.signinUser(user).then((res) => {
        this.navCtrl.setRoot(HomePage);
      }, (rej) => {
        this.signupLoading = false;
      });
    }, (rej) => {
      this.signupLoading = false;
    });
  }

  goToSignin() {
    this.navCtrl.setRoot(SigninPage);
  }


  goBack() {
    this.navctrl.pop();
  }

}
