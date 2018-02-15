import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { CalendarPage } from '../calendar/calendar';
/**
 * Generated class for the RatingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ratings',
  templateUrl: 'ratings.html',
})
export class RatingsPage {

  imgsource;
  email;
  appData;
  public key;
  base64Image;

  // rating
  rating: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController  ) {
  }

  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('Escorts');
  public itemsRef: firebase.database.Reference;
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingsPage');

    this.items = [];

    //this.appData = window.localStorage.getItem('Email');

    this.itemRef.orderByChild("Email").equalTo(this.appData).once('value', (snap) => {
      this.key = Object.keys(snap.val());
      console.log(this.key);
      snap.forEach(itemSnap => {
        this.items.push(itemSnap.val());
        this.base64Image = itemSnap.child("Pic").val();
        return false;

      });
      this.itemsRef = firebase.database().ref('Escorts/' + this.key);
    });
  }

  // call when click to stars
  rate(star) {
    this.rating = star;
  }

  // submit rating

    // this.tripService.rateTrip(this.trip.$key, this.rating).then(() => {
    //   this.viewCtrl.dismiss();
    // });

  submit() { // update escorts' profile rating

    // try {

    //   this.itemsRef.update({

    //     Ratings: '';
      
    //   });
    //   console.log(this.itemsRef);
    //   let alert = this.alertCtrl.create({
    //     title: 'Escorts has been rated!',
    //     buttons: [
    //       {
    //         text: 'OK',
    //         handler: data => {
    //                this.navCtrl.push(CalendarPage);
    //                this.navCtrl.setRoot(CalendarPage).then(() =>{
    // this.navCtrl.popToRoot();
                   
    //         });
    //       }
    //       }
    //     ],

    //   });
    //   alert.present();

    
    // } catch (e) {
    //   console.log(e);

    // }
  }
  

}
