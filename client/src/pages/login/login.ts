import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { validateEmail } from '../../validators/email';
import { AuthService } from '../../providers/auth-service';
import { UserService } from '../../providers/user-service';
import { UtilService } from '../../providers/utils';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: any;
  constructor(public nav: NavController,
    public auth: AuthService,
    public userProvider: UserService,
    public util: UtilService,
    public storage: Storage,
    public userData: UserData) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, validateEmail]),
      password: new FormControl("", Validators.required)
    });
  }

  signin() {
    this.auth.signin(this.loginForm.value.email, this.loginForm.value.password)
      .then((data) => {
        this.userData.login(this.loginForm.value.email);
        this.storage.set('uid', data.uid);
        this.nav.push(TabsPage);
      }, (error) => {
        let alert = this.util.doAlert("Error", error.message, "Ok");
        alert.present();
      });
  };

  createAccount() {
    let credentials = this.loginForm.value;
    this.auth.createAccount(credentials.email, credentials.password)
      .then((data) => {
        this.storage.set('uid', data.uid);
        this.userProvider.createUser(credentials, data.uid);
      }, (error) => {
        let alert = this.util.doAlert("Error", error.message, "Ok");
        alert.present();
      });
  };
}