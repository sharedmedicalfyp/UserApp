import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, MenuController, Events, LoadingController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MapComponent } from '../components/map/map';
import { AboutPage } from '../pages/about/about';
import { BookingPage } from '../pages/booking/booking';
import { TabsPage } from '../pages/tabs/tabs';
import { CalendarPage } from '../pages/calendar/calendar';
import { SplitPane } from '../providers/split-pane/split-pane';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../pages/profile/profile';
import { FaqPage } from '../pages/faq/faq';
import { ContactPage } from '../pages/contact/contact';
import { ProfiledetailsPage } from '../pages/profiledetails/profiledetails';
import { BookinghistoryPage } from '../pages/bookinghistory/bookinghistory';
import { FamilyProfilePage } from '../pages/family-profile/family-profile';
import { PickupDirective } from '../components/pickup/pickup';
import firebase from 'firebase';
import { RatingsPage } from '../pages/ratings/ratings';
import { AddprofilePage } from '../pages/addprofile/addprofile';

// import { AutocompletePage } from '../pages/autocomplete/autocomplete';

@Component({
  templateUrl: 'app.html',
})

export class MyApp {
  @ViewChild(Nav) nav: Nav; 
   bookingPage = BookingPage;
   calendarPage = CalendarPage;
   rootPage:any = LoginPage;
  // rootPage:any = TabsPage;
   shouldShowPane = false;
   imgsource;
   name;

  private currentUser: firebase.User;
  pages: Array<{title: string, component: any}>;
  activePage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  public splitPlane: SplitPane, public app:App, public menu: MenuController,
  private afAuth: AngularFireAuth , public events: Events, public load:LoadingController, public toast: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    this.events.subscribe('profileUpdated', () => {
      console.log(window.sessionStorage.getItem('uImage'))
      this.imgsource = window.sessionStorage.getItem('uImage');
    });

    this.events.subscribe('profileInserted', () => {
      console.log("hisdf");
      console.log(window.sessionStorage.getItem('Pic'));
      this.imgsource = window.sessionStorage.getItem('Pic');
      this.name = window.sessionStorage.getItem('Name');
    });

      console.log(this.currentUser);
      this.afAuth.authState.subscribe(auth => {
        if (auth)
          this.rootPage = CalendarPage;
        else
          console.log(auth);
        this.rootPage = LoginPage;
      });


       this.pages = [
        { title: 'My Profile', component: ProfilePage },
        { title: 'Add Family Profile', component: AddprofilePage },        
        { title: 'Family Profile', component: FamilyProfilePage },
        { title: 'Make a Booking', component: CalendarPage },
        { title: 'My Bookings', component: BookingPage },
        { title: 'Booking History', component: BookinghistoryPage },
        { title: 'About Us', component: AboutPage },
        { title: 'Contact Us', component: ContactPage  },
        { title: 'FAQ', component: FaqPage },
    ];
        this.activePage = this.pages[3];

    });
  }

  Logout() {
    let page = {component: LoginPage}
    let loading = this.load.create({
      content: "Signing Out"
    });
    loading.present();
    this.menu.close();
    this.menu.swipeEnable(false);
    this.activePage = this.pages[1];

    //clearing session and local storage
    window.sessionStorage.clear();
    window.localStorage.clear();

    firebase.auth().signOut();
    this.nav.setRoot(page.component);
    this.nav.popToRoot();
    loading.dismiss();
    this.toast.create({
      message: "Successfully signed out",
      duration: 1500,
    }).present();



    // this.menu.close();
    // window.localStorage.clear();
    // window.localStorage.isMySessionActive = "false";

    // console.log(window.localStorage.getItem('Email'));

    // firebase.auth().signOut().then(function () {
    //   // Sign-out successfully.
    //   // setTimeout(function () {
    //     window.location.reload();
    //   // }, 100);

    // }, function (error) {
    //   // An error happened.
    //   console.log(error);
    // });
  }

   openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  backToWelcome(){
    const root = this.app.getRootNav();
    root.popToRoot();
  }

}

