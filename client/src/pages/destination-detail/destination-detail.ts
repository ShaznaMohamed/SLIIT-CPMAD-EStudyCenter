import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SessionDetailPage } from '../session-detail/session-detail';

@Component({
  selector: 'page-destination-detail',
  templateUrl: 'destination-detail.html'
})
export class DestinationDetailPage {
  speaker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.speaker = this.navParams.data.speaker;
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, {
      name: session.name,
      session: session
    });
  }
}
