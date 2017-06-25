import { Component } from '@angular/core';

import { NavParams, ViewController, ToastController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-schedule-add',
  templateUrl: 'schedule-add.html'
})
export class ScheduleAddPage {
  tracks: Array<{name: string, isChecked: boolean}> = [];
  title: any;
  time : any;
  description : any;
  inputData: Array<{title: string, time: string, description:string}> = [];

  constructor(
    public confData: ConferenceData,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController
  ) {
    // passed in array of track names that should be excluded (unchecked)
    // let excludedTrackNames = this.navParams.data;

    // this.confData.getTracks().subscribe((trackNames: string[]) => {

    //   trackNames.forEach(trackName => {
    //     this.tracks.push({
    //       name: this.title,
    //       isChecked: (excludedTrackNames.indexOf(trackName) === -1)
    //     });
    //   });

    // });
  }

  resetFilters() {
   
    this.time = "";
    this.title = "";
    this.description = "";
  }

  applyFilters(data?: any) {
    // Pass back a new array of track names to exclude
    //let excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    
    //this.confData.addScheduleData();

   

     let toast = this.toastCtrl.create({
        message: this.title+' Schedule is succesfully added.',
        duration: 3000
      });
      toast.present();
    this.viewCtrl.dismiss(data);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
