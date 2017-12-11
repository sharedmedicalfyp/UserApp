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
// import { PickupDirective } from '../components/pickup/pickup';

// AngularFire
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { BookingPage } from '../pages/booking/booking';
import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';
import { SplitPane } from '../providers/split-pane/split-pane';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarPage } from '../pages/calendar/calendar';

// AF2 Settings
export const firebaseConfig = {
 apiKey: "AIzaSyCFU9g3inPp81yQU14fYANC7vf31SpkqKk",
    authDomain: "sharedmedicalfyp-1cfcf.firebaseapp.com",
    databaseURL: "https://sharedmedicalfyp-1cfcf.firebaseio.com",
    projectId: "sharedmedicalfyp-1cfcf",
    storageBucket: "",
    messagingSenderId: "865840865908"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapComponent,
    LoginPage,
    AboutPage,
    BookingPage,
    ContactPage,
    TabsPage,
    CalendarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //AngularFireModule.initializeApp(environment.firebase), // Connection string
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,    // AngularFire
    AngularFireDatabaseModule,
    NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapComponent,
    LoginPage,
    AboutPage,
    BookingPage,
    ContactPage,
    TabsPage,
    CalendarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplitPane,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ]
})
export class AppModule {}
