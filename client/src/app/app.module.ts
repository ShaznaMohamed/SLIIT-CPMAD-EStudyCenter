import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera } from '@ionic-native/camera'

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { DestinationDetailPage } from '../pages/destination-detail/destination-detail';
import { DestinationFilterPage } from '../pages/destination-filter/destination-filter';
import { DestinationListPage } from '../pages/destination-list/destination-list';
import { FacilityDetailPage } from '../pages/facility-detail/facility-detail';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { ProfilePage } from '../pages/profile/profile';
import { CampingPage } from '../pages/Camping/camping';
import { CampTypePage } from '../pages/camp-type/camp-type';
import { MapLocationPage } from '../pages/map-location/map-location';
import { ScheduleAddPage } from '../pages/schedule-add/schedule-add';
import { ChatsPage } from '../pages/chats/chats';
import { ChatViewPage } from '../pages/chat-view/chat-view';
import { UsersPage } from '../pages/users/users';
import { HomePage } from '../pages/home/home';
import { AddReviewPage } from '../pages/add-review/add-review';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { UserService } from '../providers/user-service';
import { AuthService } from '../providers/auth-service';
import { ChatsService } from '../providers/chats-service';
import { UtilService } from '../providers/utils';
import { ReviewsProvider } from '../providers/reviews/reviews';

export const firebaseConfig = {
  apiKey: "AIzaSyDBlm0BRKSMUoLt_kgPiQBEBdeF056ge3w",
  authDomain: "mooncamp-e2a5f.firebaseapp.com",
  databaseURL: "https://mooncamp-e2a5f.firebaseio.com",
  projectId: "mooncamp-e2a5f",
  storageBucket: "mooncamp-e2a5f.appspot.com",
  messagingSenderId: "157585095452"
};


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    DestinationDetailPage,
    DestinationFilterPage,
    DestinationListPage,
    FacilityDetailPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    ProfilePage,
    CampingPage,
    CampTypePage,
    MapLocationPage,
    ScheduleAddPage,
    UsersPage,
    ChatsPage,
    ChatViewPage,
    HomePage,
    AddReviewPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'Tabs', segment: 'tabs' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:name' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: DestinationListPage, name: 'DestinationList', segment: 'speakerList' },
        { component: DestinationFilterPage, name: 'DestinationFilter', segment: 'speakerList' },
        { component: DestinationDetailPage, name: 'DestinationDetail', segment: 'speakerDetail/:name' },
        { component: FacilityDetailPage, name: 'FacilityDetail', segment: 'speakerDetail/:name' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: ProfilePage, name: 'ProfilePage', segment: 'profile' },
        { component: CampingPage, name: 'CampingPage', segment: 'camping' },
        { component: CampTypePage, name: 'CampTypePage', segment: 'speakerDetail/:name' },
        { component: MapLocationPage, name: 'MapLocationPage', segment: 'location' },
        { component: ScheduleAddPage, name: 'ScheduleAddPage', segment: 'scheduleAdd' },
        { component: UsersPage, name: 'UsersPage', segment: 'users' },
        { component: ChatsPage, name: 'ChatsPage', segment: 'chats' },
        { component: ChatViewPage, name: 'ChatViewPage', segment: 'chatview' },
        { component: HomePage, name: 'HomePage', segment: 'homepage' },
        { component: AddReviewPage, name: 'AddReviewPage', segment: 'addreviewpage' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    DestinationDetailPage,
    DestinationFilterPage,
    DestinationListPage,
    FacilityDetailPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    ProfilePage,
    CampingPage,
    CampTypePage,
    MapLocationPage,
    ScheduleAddPage,
    UsersPage,
    ChatsPage,
    ChatViewPage,
    HomePage,
    AddReviewPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    AuthService,
    UserService,
    UtilService,
    ChatsService,
    InAppBrowser,
    SplashScreen,
    AuthService,
    AngularFireAuth,
    Geolocation,
    Camera,
    ReviewsProvider
  ]
})
export class AppModule { }
