import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**

/**
 * Generated class for the EventModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  bookings: Observable<any[]>;
  itemRef: AngularFireList<any>;
  
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,public afDatabase: AngularFireDatabase) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;

    this.itemRef = afDatabase.list('Bookings');
  }
 
  cancel() {
    this.viewCtrl.dismiss();
  }
 
  // Firebase
  save(location, startTime, assistance, twowaytrip, duration, contact) {

    this.itemRef.push({
            // Title: title,

            Address: location,
            Starttime: startTime,
            Endtime: startTime,
            Duration: duration,
            Assistance: assistance,
            TwoWayTrip: twowaytrip,
            Contact: contact,
            Status: "",
            Driver: "",
            ROD: "",
            Payment: ""
           })
              //  console.log(startTime);

    this.viewCtrl.dismiss(this.event);

  }

  // JS
  //  save() {
  //   this.viewCtrl.dismiss(this.event);

  // }

}
