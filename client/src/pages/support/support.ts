import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertController, NavController,Config, ToastController, ActionSheetController } from 'ionic-angular';


@Component({
  selector: 'page-user',
  templateUrl: 'support.html'
})
export class SupportPage {

  submitted: boolean = false;
  supportMessage: string;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public config: Config,
  ) {

  }

  ionViewDidEnter() {
    // let toast = this.toastCtrl.create({
    //   message: 'This does not actually send a support request.',
    //   duration: 3000
    // });
    // toast.present();
  }

  submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.supportMessage = '';
      this.submitted = false;

      let toast = this.toastCtrl.create({
        message: 'Your support request has been sent. you will be contacted via email ',
        duration: 3000
      });
      toast.present();
    }
  }

  // If the user enters text in the support question and then navigates
  // without submitting first, ask if they meant to leave the page
  ionViewCanLeave(): boolean | Promise<boolean> {
    // If the support message is empty we should just navigate
    if (!this.supportMessage || this.supportMessage.trim().length === 0) {
      return true;
    }

    return new Promise((resolve: any, reject: any) => {
      let alert = this.alertCtrl.create({
        title: 'Leave this page?',
        message: 'Are you sure you want to leave this page? Your support message will not be submitted.'
      });
      alert.addButton({ text: 'Stay', handler: reject });
      alert.addButton({ text: 'Leave', role: 'cancel', handler: resolve });

      alert.present();
    });
  }

    openContact(speaker: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact Student Support Center',
      buttons: [
        // {
        //   text: `Email ( mohamed.shazna@gmail.com )`,
        //   icon: mode !== 'ios' ? 'mail' : null,
        //   handler: () => {
        //     window.open('mailto: mohamed.shazna@gmail.com');
        //   }
        // },
        {
          text: `Call ( +94711033004 )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel: +94711033004');
          }
        }
      ]
    });

    actionSheet.present();
  }
}
