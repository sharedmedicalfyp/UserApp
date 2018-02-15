import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import * as moment from 'moment';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../model/profile';
import { CalendarComponent } from "ionic2-calendar/calendar";
import firebase from 'firebase';
import { BookingdetailsPage } from '../bookingdetails/bookingdetails';

/**
 * Generated class for the CalendarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  //public itemRef: firebase.database.Reference = firebase.database().ref('Bookings');
  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  email = window.localStorage.getItem('Email');
  events = [];

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private alertCtrl: AlertController
  ,private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private toast: ToastController) {
   // Retrieve list of items
 // this.items = afDatabase.list('Bookings').valueChanges();
     this.itemsRef = afDatabase.list('Bookings');
}

  ionViewDidLoad() {
          this.loadEvents();
      }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data.email && data.uid){
        this.toast.create({
        message: 'Welcome!',
        duration: 3000
      }).present();

      }
      else{
        this.toast.create({
        message: 'Could not find authentication details.',
        duration: 3000
      }).present();

      }
    });
  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  addCarpool() {
    let modal = this.modalCtrl.create('CarpoolPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    // let start = moment(event.startTime).format('LLLL');
    // let end = moment(event.endTime).format('LLLL');
    
    // let alert = this.alertCtrl.create({
    //   title: '' + event.title,
    //   // subTitle: 'From: ' + start + '<br>To: ' + end,
    //   subTitle: 'On: ' + event.startTime ,
    //   buttons: ['OK'],
    // })
    // alert.present();

    this.navCtrl.push(BookingdetailsPage, {
            key: event.key,
           // Status: 'Accepted'
        });
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

   markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

    loadEvents() {
        this.events = [];
        this.eventSource = this.createRandomEvents();
    }

    createRandomEvents() {
        this.events.length = 0;
        this.itemsRef.snapshotChanges().map(changes => {

            return changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() }))
                .filter(items => items.Email === this.email
                && items.Status === 'Accepted' || items.Status === 'Pending');
        }).subscribe(time => {
            this.events.length = 0;

            time.map(r => {
              
                  var startTime = (new Date(r.Date + " " + r.startTime));
                  var EndTime = (new Date(r.Date + " " + r.endTime));
                  if(r.Patient3Name){
                      this.events.push({
                        title:  r.PatientName + ", " + r.Patient2Name + ", " + r.Patient3Name,
                        key: r.key,
                        startTime: startTime,
                        endTime: EndTime,
                        allDay: false
                    });
                  }
                  else if(r.Patient2Name){
                      this.events.push({
                          title:  r.PatientName + ", " + r.Patient2Name ,
                          key: r.key,
                          startTime: startTime,
                          endTime: EndTime,
                          allDay: false
                      });
                  }
                  else{
                        this.events.push({
                          title: r.PatientName,
                          key: r.key,
                          startTime: startTime,
                          endTime: EndTime,
                          allDay: false
                      });
                  }

                  this.myCalendar.loadEvents();
              }
            );
            this.myCalendar.loadEvents();
            console.log(this.events);
        });
          return this.events;
    }

}
