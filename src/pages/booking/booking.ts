import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, MenuController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { BookingdetailsPage } from '../bookingdetails/bookingdetails';
import { Bookings } from './../../model/bookings/bookings.model';
import { BookingListService } from '../../services/booking-list/booking-list.service';

/**
 * Generated class for the BookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// export interface PageInterface {
//   title: string;
//   pageName: string;
//   tabComponent?: any;
//   index?: number;
//   icon: string;
// }

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  //declare
  // bookings: Observable<any[]>;
  // itemRef: AngularFireList<any>;
  today = new Date().toJSON().split('T')[0];
  email;
  // Declare
  // bookingList$: Observable<Bookings[]>;

  bookings;
  items: Observable<any[]>;
  accepted : Observable<any[]>;
  itemsRef: AngularFireList<any>;

  // For FB
  // items: Observable<any[]>;
  // public itemsList:Array<any>;
  // public loadeditemsList:Array<any>;
  public itemRef: firebase.database.Reference = firebase.database().ref('Bookings');

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public navParams: NavParams, public afDatabase: AngularFireDatabase, 
  public alertCtrl: AlertController, private booking: BookingListService,) {
    
    // const itemRef = afDatabase.object('Bookings');
    // this.bookings = afDatabase.list('/booking').valueChanges();
    // this.itemRef = afDatabase.list('Bookings');

    //Works START
    this.itemsRef = afDatabase.list('Bookings',
      ref => ref.orderByChild('Date')
    );

    // this.items = this.itemsRef.snapshotChanges().map(changes => {
    //   return changes.map(c =>
    //     ({ key: c.payload.key, ...c.payload.val() }))
    //     .filter(items => (items.Status === 'Pending' || items.Status === 'Accepted') && items.Email === this.email);
    // });
    
    // this.itemRef.on('value', itemsList => {
    //  let items = [];
    //  itemsList.forEach(item => {
    //     items.push(item.val());
    //     return false;
    //   });

    //   this.itemsList = items;
    //   this.loadeditemsList = items;
    // });

    // Work end

    // this.bookingList$ = this.booking
    //   .getBookingList() // DB LIST
    //   .snapshotChanges() // Key and Value
    //   .map(changes => {
    //     return changes.map(c => ({
    //       key: c.payload.key,
    //       ...c.payload.val(),
    //     }))
    //     // .filter(items =>
    //     //   (items.Status === 'Pending' || items.Status === 'Cancelled') && items.Date >= this.today);
    //   });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BookingdetailsPage');

    this.email = window.localStorage.getItem('Email');
    console.log(this.email);
    this.bookings = "pending";
    this.getInitialItems();

  }

  gotoPage(key) {
  console.log(key);
    this.navCtrl.push(BookingdetailsPage, {
      key: key,
      Status: 'Accepted'
    });

  }

   getInitialItems() {
    //Pending
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })).filter(items =>
          (items.Status === 'Pending') && items.Email === this.email);
    });

    //Accepted
     this.accepted = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })).filter(items =>
          (items.Status === 'Accepted') && items.Email === this.email);
    });

  }



  // initializeItems(){
  //   this.itemsList = this.loadeditemsList;
  // }

  // getItems(searchbar) {
  //   // Reset items back to all of the items
  //   this.initializeItems();
    
  //   // set q to the value of the searchbar
  //   var q = searchbar.srcElement.value;

  //   // if the value is an empty string don't filter the items
  //   if (!q) {
  //     return;
  //   }

  //   this.itemsList = this.itemsList.filter((v) => {
  //     if(v.name && q) {
  //       if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
  //         return true;
  //       }
  //       return false;
  //     }
  //   });

  //   console.log(q, this.itemsList.length);

  // }

  // getItems(ev: any) {
    
  //   this.getInitialItems();
  //   // set val to the value of the searchbar
  //   let val = ev.target.value;

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.items = this.items.map(item => {

  //       return item.filter(items =>
  //         (items.Destination.toLowerCase().indexOf(val.toLowerCase()) > -1
  //         )
  //       )
  //     })
  //   }
  // }

  // gotoPage(i){
  //   this.navCtrl.push(BookingdetailsPage,{
  //     index:i
  //   });

  // }

//  openMenu() {
//    this.menuCtrl.open();
//  }
//   toggleMenu() {
//    this.menuCtrl.toggle();
//  }
//   ionViewDidLoad() {
//     this.itemRef.on('value', itemSnapshot => {
//     this.items = [];
//     itemSnapshot.forEach( itemSnap => {
//       this.items.push(itemSnap.val());
//       return false;
     
//     });

//   });

// }

}
