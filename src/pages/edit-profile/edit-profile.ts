import { Component } from '@angular/core';
import { ViewController, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StatusBar } from '@ionic-native/status-bar';

import { UserProvider } from '../../providers/user/user';
import { AuthorizationProvider } from '../../providers/authorization/authorization';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})

export class EditProfilePage {
  currentUserForm: FormGroup;

  currentUser: any = {};

  constructor(
    public userProvider: UserProvider,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    private statusBar: StatusBar,
    private authenticationProvider: AuthorizationProvider,
    private appCtrl: App
  ) {
    this.setForms();
  }

  ionViewDidLoad() {
    this.statusBar.backgroundColorByHexString('#212121');
    this.statusBar.styleLightContent();

    this.getCurrentUser();
  }

  ionViewDidLeave() {
    this.statusBar.backgroundColorByHexString('#ffffff');
    this.statusBar.styleDefault();
  }

  setForms() {
    this.currentUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      picture: [''],
      bio: ['']
    });
  }

  getCurrentUser() {
    this.userProvider.getCurrentUser().then((res) => {
      this.currentUserForm.patchValue({ ...res });

      this.currentUser = res;
    });
  }

  updateProfile() {
    if (this.currentUserForm.invalid) return;

    let currentUser = this.currentUserForm.value;

    this.currentUser.firstName = currentUser.firstName;
    this.currentUser.lastName = currentUser.lastName;
    this.currentUser.bio = currentUser.bio ? currentUser.bio : null;
    this.currentUser.username = currentUser.username;

    this.userProvider.updateUser(this.currentUser).then((res) => {
      this.getCurrentUser();

    });
  }

  signout() {
    this.authenticationProvider.logout().then((res) => {
      this.appCtrl.getRootNav().setRoot(SigninPage);
    });
  }

}
