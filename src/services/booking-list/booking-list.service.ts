import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Bookings } from './../../model/bookings/bookings.model';

@Injectable()
export class BookingListService {

  itemsRef: AngularFireList<any>;

  private bookingListRef = this.db.list<Bookings>('Bookings', ref => ref.orderByChild('Date')); // Depends whether startTime/Date

  constructor(private db: AngularFireDatabase) {}

  getBookingList() {
    return this.bookingListRef;
  }

  addItem(item: Bookings) {
    return this.bookingListRef.push(item);
  }

  // cancelItem(item:Bookings){
  //    return this.bookingListRef.update(item.key, item);
  // }

  editItem(item: Bookings) {
    return this.bookingListRef.update(item.key, item);
  }

  removeItem(item: Bookings) {
    return this.bookingListRef.remove(item.key);
  }
}
