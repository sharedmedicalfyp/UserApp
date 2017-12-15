import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';


/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public index;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

   public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('Bookings');

  ionViewDidLoad() {
   // console.log('ionViewDidLoad ProfilePage');

    this.itemRef.on('value', itemSnapshot => {
    this.items = [];
    itemSnapshot.forEach( itemSnap => {
      this.items.push(itemSnap.val());
      return false;
     
    });

  });

  }

}
