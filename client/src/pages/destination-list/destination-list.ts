import { Component,ViewChild } from '@angular/core';

import { ActionSheet, ActionSheetController, Config,  List,NavController , ToastController,ModalController} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { DestinationDetailPage } from '../destination-detail/destination-detail';
import { DestinationFilterPage } from '../destination-filter/destination-filter';
import { FacilityDetailPage } from '../facility-detail/facility-detail';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-destination-list',
  templateUrl: 'destination-list.html'
})
export class DestinationListPage {
  actionSheet: ActionSheet;
  speakers: any[] = [];


   @ViewChild('DestinationList', { read: List }) DestinationList: List;
   dayIndex = 0;
   queryText = '';
   segment = 'all';
   excludeTracks: any = [];
   groups: any = [];
   shownSessions: any = [];
   items: any = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public modalCtrl: ModalController,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) { }

  ionViewDidLoad() {
    this.confData.getDestinations().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
    this.updateSchedule();
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, {
      name: session.name,
      session: session
    });
  }

  goToDestinationDetail(speakerName: any) {
    this.navCtrl.push(DestinationDetailPage, {
      speaker: speakerName,
      name: speakerName.name
    });
  }

  goToDestinationMap(speaker: any) {
    //this.inAppBrowser.create(`https://twitter.com/${speaker.twitter}`, '_blank');
     let toast = this.toastCtrl.create({
        message: 'Your enrollment for '+speaker.name+'is valid until May, 2018',
        duration: 3000
      });
      toast.present();
  }

  gotToFacilityDetailpage(speaker: any){
    this.navCtrl.push(FacilityDetailPage, {
      speaker: speaker
    });
  }

  openDestinationShare(speaker: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: ($event: Event) => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if ((window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
              (window as any)['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  openContact(speaker: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        }
      ]
    });

    actionSheet.present();
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.DestinationList && this.DestinationList.closeSlidingItems();

    // this.confData.getDestinatonSearched(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
    //   this.shownSessions = data.shownSessions;
    //   this.groups = data.groups;
    //  //this.speakers = data.speaker;
    // });
  }

    presentFilter() {
    let modal = this.modalCtrl.create(DestinationFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

// getItems(ev: any) {
//     // Reset items back to all of the items
//    this.items = this.confData.data.speaker;
//     // set val to the value of the searchbar
//     let val = ev.target.value;

//     // if the value is an empty string don't filter the items
    
//     if (val && val.trim() != '') {
//       this.items = this.items.filter((item: any) => {
//         return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
//       })
//     }
//   }


}
