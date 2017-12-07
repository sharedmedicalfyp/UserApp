import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MapComponent } from '../components/map/map';
import { AboutPage } from '../pages/about/about';
import { BookingPage } from '../pages/booking/booking';
import { TabsPage } from '../pages/tabs/tabs';
// import { PickupDirective } from '../components/pickup/pickup';
import {SplitPane} from '../providers/split-pane/split-pane';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage:any = HomePage;
   rootPage:any = LoginPage;
  // rootPage:any = TabsPage;
   shouldShowPane = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  public splitPlane: SplitPane, public app:App, public menu: MenuController ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  backToWelcome(){
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  logout(){
    localStorage.clear();
    this.menu.enable(false);
    setTimeout(()=> this.backToWelcome(), 1000);
  }
}

