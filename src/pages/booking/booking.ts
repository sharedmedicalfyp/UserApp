import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, MenuController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { BookingdetailsPage } from '../bookingdetails/bookingdetails';
/**
 * Generated class for the BookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  //declare
  // bookings: Observable<any[]>;
  // itemRef: AngularFireList<any>;

  public items:Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('Bookings');

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public navParams: NavParams, public afDatabase: AngularFireDatabase, 
  public alertCtrl: AlertController) {
    
    // const itemRef = afDatabase.object('Bookings');
    // // Init
    // this.bookings = afDatabase.list('/booking').valueChanges();

    // this.itemRef = afDatabase.list('Bookings');
  }

  gotoPage(i){
 this.navCtrl.push(BookingdetailsPage,{
   index:i
 });

}
 openMenu() {
   this.menuCtrl.open();
 }
  toggleMenu() {
   this.menuCtrl.toggle();
 }
  ionViewDidLoad() {
    this.itemRef.on('value', itemSnapshot => {
    this.items = [];
    itemSnapshot.forEach( itemSnap => {
      this.items.push(itemSnap.val());
      return false;
     
    });

  });

}

}
