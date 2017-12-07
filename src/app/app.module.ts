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
import { environment } from '../environments/environment';

import { BookingPage } from '../pages/booking/booking';
import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';
import { SplitPane } from '../providers/split-pane/split-pane';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapComponent,
    LoginPage,
    AboutPage,
    BookingPage,
    ContactPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase), // AngularFire
    AngularFireAuthModule    // AngularFire
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
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplitPane
  ]
})
export class AppModule {}
