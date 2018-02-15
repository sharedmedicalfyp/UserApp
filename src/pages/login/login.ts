import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { BookingPage } from '../booking/booking';
import { TabsPage }  from '../tabs/tabs';
import { CalendarPage } from '../calendar/calendar';
import { FaqPage } from '../faq/faq';
import { RegisterPage } from '../register/register';
import { ForgotpwdPage } from '../forgotpwd/forgotpwd';
import { RatingsPage } from '../ratings/ratings';
import { BookinghistoryPage } from '../bookinghistory/bookinghistory';

// Firebase
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { UpdatefamilydetailsPage } from '../updatefamilydetails/updatefamilydetails';
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
  ratingPage = RatingsPage;
  historyPage = BookinghistoryPage;
  // updatefamilydetailsPage = UpdatefamilydetailsPage;

  private authState: Observable<firebase.User>;
  private currentUser: firebase.User;
  public itemRef: firebase.database.Reference = firebase.database().ref('Escorts');
  email: '';
  password: '';
  name="";
  public loading: Loading;

  items: Observable<any[]>;
 // items2: AngularFireList<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public afAuth: AngularFireAuth
  ,public alertCtrl: AlertController,  public loadingCtrl: LoadingController, private afDB: AngularFireDatabase) {
    
    // Retrieve list of items
    // this.items = afDB.list('Bookings').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // sendEmailVerification() {
  //   this.angularFireAuth.authState.subscribe(user => {
  //       user.sendEmailVerification()
  //       .then(() => {
  //         console.log('email sent');
  //       })
  //     });
  // }

  register(){
    //this.navCtrl.push('RegisterPage');
    this.navCtrl.push(RegisterPage);
  }

  sendPassword(){
    this.navCtrl.push(ForgotpwdPage);
  }

  // register(email, password) {
  //   this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
  //   .then((res) => {
  //     this.sendEmailVerification()
  //   })
  //   .catch((err)=> {
  //     //Do as you please here
  //   });
  // }

  // login(username, password) {
  //   this.afAuth.auth.signInWithEmailAndPassword(username, password)
  //     .then((user) => {
  //       if(user.emailVerified) {
  //         // Redirect the user here 
  //         //this.navCtrl.setRoot('ProfilePage');
  //         this.navCtrl.push(TabsPage);

  //       } else {
  //         // Tell the user to have a look at its mailbox 
  //          // Alert
  //         let alert = this.alertCtrl.create({
  //         title: 'Unverified email.',
  //         subTitle: 'Please check your inbox and try again.',
  //         buttons: ['Dismiss']
  //       });
  //       alert.present();  // End of alert
         
  //       }
  //     });
  // }

  Login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(auth => {
        try {
          firebase.auth().onAuthStateChanged((user) => {

            if (user.emailVerified) {
              window.localStorage.setItem('Email', this.email);
              this.itemRef.orderByChild("Email").equalTo(this.email).once('value', (snap) => {
                snap.forEach(itemSnap => {
            
                  this.name = itemSnap.child("Name").val();
                   window.localStorage.setItem('Name', this.name);
                  return false;

                });
              }),
                // this.navCtrl.push(CalendarPage);
              this.navCtrl.setRoot(CalendarPage);
            }
            else if (!user.emailVerified) {
              let alert = this.alertCtrl.create({
                message: "Email not verified. Please verify again.",
                buttons: [{ text: "Ok" }]
              });
              alert.present();
              user.sendEmailVerification();
            }

          });
        } 
        catch (err) {
          let toast = this.toastCtrl.create({
            message: err.message,
            duration: 1000
          });
          toast.present();
        }
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 1000
        });
        toast.present();
      });

  }

 

  

}
