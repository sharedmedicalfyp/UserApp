import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { BookingdetailsPage } from '../bookingdetails/bookingdetails';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the BookinghistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookinghistory',
  templateUrl: 'bookinghistory.html',
})
export class BookinghistoryPage {

  history;
  email;
  items: Observable<any[]>;
  cancelled : Observable<any[]>;
  itemsRef: AngularFireList<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,  afDatabase: AngularFireDatabase) {
       this.itemsRef = afDatabase.list('Bookings',
      ref => ref.orderByChild('Date')
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookinghistoryPage');

     this.history = "cancelled";
     this.email = window.localStorage.getItem('Email');
     console.log('ionViewDidLoad HistoryPage');
      this.getInitialItems();
  }

   getInitialItems() {

    this.items = this.itemsRef.snapshotChanges().map(changes => {

      return changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })).filter(items =>
          (items.Status === 'Completed') && items.Email === this.email);
    });
    
    this.cancelled = this.itemsRef.snapshotChanges().map(changes => {

      return changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })).filter(items =>
          (items.Status === 'Cancelled') && items.Email === this.email);
    });


  }
    gotoPage(key) {
    console.log(key);
    this.navCtrl.push(BookingdetailsPage, {
      key: key,
      Status:'Cancelled'
    });

  }

}
