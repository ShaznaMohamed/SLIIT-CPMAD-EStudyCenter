import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SessionDetailPage } from '../session-detail/session-detail';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-facility-detail',
  templateUrl: 'facility-detail.html'
})
export class FacilityDetailPage {
  speaker: any;
  camptype: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public confData: ConferenceData,) {
    this.speaker = this.navParams.data.speaker;

  }

   ionViewDidLoad() {

    this.confData.getCampTypes().subscribe((camptype: any[]) => {
      this.camptype = camptype;
    });
   
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, {
      name: session.name,
      session: session
    });
  }
}
