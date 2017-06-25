import { Component } from '@angular/core';

import { NavController, NavParams, FabContainer, ToastController, Config, ActionSheetController} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { SessionDetailPage } from '../session-detail/session-detail';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'camp-type-detail',
  templateUrl: 'camp-type.html'
})
export class CampTypePage {
  speaker: any;
  camptype: any;

  constructor(public navCtrl: NavController, public config: Config,  public actionSheetCtrl: ActionSheetController,public toastCtrl: ToastController,public navParams: NavParams,  public confData: ConferenceData, public inAppBrowser: InAppBrowser) {
    this.speaker = this.navParams.data.speaker;

  }

   ionViewDidLoad() {

    this.confData.getCampTypes().subscribe((camptype: any[]) => {
      this.camptype = camptype;
    });
   
  }

  enrollCourse(){
     let toast = this.toastCtrl.create({
        message: 'You are enrolled to this course',
        duration: 3000
      });
      toast.present();
  }

    openSocialTwitter(network: string, fab: FabContainer) {
    this.inAppBrowser.create(`https://twitter.com/login`, '_blank');
  }

  openSocialGoogle(network: string, fab: FabContainer) {
    this.inAppBrowser.create(`https://plus.google.com/collections/featured`, '_blank');
  }

  openSocialFacebook(network: string, fab: FabContainer) {
    this.inAppBrowser.create(`https://www.facebook.com/login`, '_blank');
  }

  MeetLecturer(){
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact Course Incharge Lecturer',
      buttons: [
        {
          text: `Email ( mohamed.shazna@gmail.com )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto: mohamed.shazna@gmail.com');
          }
        },
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
