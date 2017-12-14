import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { BookingPage } from '../booking/booking';
import { TabsPage }  from '../tabs/tabs';
import { CalendarPage } from '../calendar/calendar';
import { FaqPage } from '../faq/faq';

// Firebase
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  calendarPage = CalendarPage;
  aboutPage = AboutPage;
  bookingPage = BookingPage;
  faqPage = FaqPage;
  contactPage = ContactPage;

  items: Observable<any[]>;
 // items2: AngularFireList<any[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public angularFireAuth: AngularFireAuth
  , public alertCtrl: AlertController, afDB: AngularFireDatabase) {

    // Retrieve list of items
    this.items = afDB.list('Bookings').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  sendEmailVerification() {
    this.angularFireAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        })
      });
  }

  register(email, password) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
      this.sendEmailVerification()
    })
    .catch((err)=> {
      //Do as you please here
    });
  }

  login(username, password) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(username, password)
      .then((user) => {
        if(user.emailVerified) {
          // Redirect the user here 
          this.navCtrl.push(TabsPage);

        } else {
          // Tell the user to have a look at its mailbox 
           // Alert
          let alert = this.alertCtrl.create({
          title: 'Unverified email.',
          subTitle: 'Please check your inbox and try again.',
          buttons: ['Dismiss']
        });
        alert.present();  // End of alert
         
        }
      });
  }

  sendPassword(email) {
    this.angularFireAuth.auth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('email sent');
    })
  }

}
