import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { MapComponent } from '../components/map/map';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { Geolocation } from '@ionic-native/geolocation';
import { PickupDirective } from '../components/pickup/pickup';

// AngularFire
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabaseModule} from 'angularfire2/database-deprecated'; // deprecated
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { BookingPage } from '../pages/booking/booking';
import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';
import { SplitPane } from '../providers/split-pane/split-pane';
import { CarpoolPage } from '../pages/carpool/carpool';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarPage } from '../pages/calendar/calendar';
import {AccordionComponent} from '../components/accordion/accordion';
import { FaqPage } from '../pages/faq/faq';
import { HttpModule } from '@angular/http';
import { BookingdetailsPage } from '../pages/bookingdetails/bookingdetails';
import { ProfilePage } from '../pages/profile/profile';
import { ProfiledetailsPage } from '../pages/profiledetails/profiledetails';
import { RegisterPage } from '../pages/register/register';
import { ForgotpwdPage } from '../pages/forgotpwd/forgotpwd';
import { BookingListService } from './../services/booking-list/booking-list.service';
import { ToastService } from './../services/toast/toast.service';
import { BookinghistoryPage } from '../pages/bookinghistory/bookinghistory';
import { UpdateprofilePage } from '../pages/updateprofile/updateprofile';
import { AutocompletePage } from '../pages/Autocomplete/autocomplete';
import { AddprofilePage } from '../pages/addprofile/addprofile';
import { FamilyProfilePage } from '../pages/family-profile/family-profile';
import { UpdatefamilydetailsPage } from '../pages/updatefamilydetails/updatefamilydetails';
// import { BookingdetailsModule } from '../pages/bookingdetails/bookingdetails.module';
import { UpdatebookingdetailsPage } from '../pages/updatebookingdetails/updatebookingdetails';
import { RatingsPage } from '../pages/ratings/ratings';
import { Camera, CameraOptions } from '@ionic-native/camera';

// AF2 Settings
export const firebaseConfig = {
 apiKey: "AIzaSyCFU9g3inPp81yQU14fYANC7vf31SpkqKk",
    authDomain: "sharedmedicalfyp-1cfcf.firebaseapp.com",
    databaseURL: "https://sharedmedicalfyp-1cfcf.firebaseio.com",
    projectId: "sharedmedicalfyp-1cfcf",
    storageBucket: "sharedmedicalfyp-1cfcf.appspot.com",
    messagingSenderId: "865840865908"
  };

@NgModule({
  declarations: [
    MyApp,
    BookingPage,
    HomePage,
    MapComponent,
    ProfilePage,
    LoginPage,
    AboutPage,
    ContactPage,
    TabsPage,
    CarpoolPage,
    CalendarPage,
    AccordionComponent,
    FaqPage,
    UpdatebookingdetailsPage,
    BookingdetailsPage,
    UpdatefamilydetailsPage,
    AutocompletePage,
    BookinghistoryPage, 
    UpdateprofilePage,
    AddprofilePage,
    FamilyProfilePage,
    ProfiledetailsPage,
    RegisterPage,
    ForgotpwdPage,
    PickupDirective,
    RatingsPage
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    //AngularFireModule.initializeApp(environment.firebase), // Connection string
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,    // AngularFire
    //AngularFireDatabaseModule,
    NgCalendarModule,   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BookingPage,
    HomePage,
    MapComponent,
    ProfilePage,
    LoginPage,
    AboutPage,
    ContactPage,
    TabsPage,
    CarpoolPage,
    CalendarPage,
    FaqPage,
    UpdatebookingdetailsPage,
    BookingdetailsPage,
    AutocompletePage,
    UpdateprofilePage,
    AddprofilePage,
    FamilyProfilePage,
    UpdatefamilydetailsPage,
    ProfiledetailsPage,
    BookinghistoryPage,
    RegisterPage,
    ForgotpwdPage,
    PickupDirective,
    RatingsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplitPane,
     Camera,
   // AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireDatabase,
    BookingListService,
    ToastService

  ]
})
export class AppModule {}
