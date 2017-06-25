import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { DestinationListPage } from '../destination-list/destination-list';
import { CampingPage } from '../Camping/camping';
import { MapLocationPage } from '../map-location/map-location';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = DestinationListPage;
  // tab2Root: any = MapLocationPage;
  tab3Root: any = SchedulePage;
  tab4Root: any = CampingPage;
  tab5Root: any = HomePage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
