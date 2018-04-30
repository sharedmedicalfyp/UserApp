import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, Loading, MenuController } from 'ionic-angular';
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
  //public itemRef: firebase.database.Reference = firebase.database().ref('Escorts');
  itemRef:any;
  email: '';
  password: '';
  name="";

  items: Observable<any[]>;
 // items2: AngularFireList<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public afAuth: AngularFireAuth
  ,public alertCtrl: AlertController,  public loading: LoadingController, private afDB: AngularFireDatabase, private menu: MenuController) {
   this.itemRef = this.afDB.database.ref('Users');    
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
    let loader = this.loading.create({
      content: "Logging in..."
    });
    loader.present();
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((result) => {
      
      try {
        let user = this.afAuth.auth.currentUser; 
            if (user.emailVerified) {
              window.localStorage.setItem('Email', this.email.toLocaleLowerCase());
              this.itemRef.orderByChild("Email").equalTo(this.email.toLowerCase()).once('value', (snap) => {
                //checks if record exists
                if(snap.exists()){ 
                //user record exists
                snap.forEach(itemSnap => {
            
                  this.name = itemSnap.child("Name").val();
                  console.log(this.name);
                   window.localStorage.setItem('Name', this.name);
                });
                this.navCtrl.setRoot(CalendarPage);//proceed to next page
                this.menu.swipeEnable(true);
                loader.dismiss();
              }else{ 
                  //user record does not exist, throw error
                  let toast = this.toastCtrl.create({
                    message: "There is no user record corresponding to this identifier. The user may have been deleted.",
                    duration: 3000
                  });
                  loader.dismiss();
                  toast.present();
                }
              });
            }
            else{
              let toast = this.toastCtrl.create({
                message: "Email not verified. Please verify again.",
                duration: 3000
              });
              loader.dismiss();
              toast.present();
              user.sendEmailVerification();
            }

        } 
        catch (err) {
          let toast = this.toastCtrl.create({
            message: err.message,
            duration: 1000
          });
          loader.dismiss();
          toast.present();
        }
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 1000
        });
        loader.dismiss();
        toast.present();
      });

  }

 

  

}
