import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';


/**
 * Generated class for the BookingdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookingdetails',
  templateUrl: 'bookingdetails.html',
})
export class BookingdetailsPage {
  public index;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('Bookings');

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BookingdetailsPage');

    this.index = this.navParams.get('index');
    this.itemRef.on('value', itemSnapshot => {
    
        var key = Object.keys(itemSnapshot.val())[this.index];
        this.itemRef.child(key).on('value', itemkeySnapshot => {
        this.items.push( itemkeySnapshot.val());
     
        });

        return false;

      });
  }

}
