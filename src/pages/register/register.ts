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
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

   constructor(public navCtrl: NavController, public navParams: NavParams, public angularFireAuth: AngularFireAuth
  , public alertCtrl: AlertController, afDB: AngularFireDatabase){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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

  sendEmailVerification() {
    this.angularFireAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        })
      });
  }


}
