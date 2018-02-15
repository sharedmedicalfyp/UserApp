import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import { Bookings } from './../../model/bookings/bookings.model';
import { BookingListService } from '../../services/booking-list/booking-list.service';
import { ToastService } from './../../services/toast/toast.service';
import { BookingPage } from '../../pages/booking/booking';
import { CalendarPage } from '../../pages/calendar/calendar';
import { BookinghistoryPage } from '../../pages/bookinghistory/bookinghistory';
import { UpdatebookingdetailsPage } from '../../pages/updatebookingdetails/updatebookingdetails';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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
  // public key;
  // public name;
   status;
  // isenabled: boolean = true;
  // email;
   button: boolean;
  
  myForm: FormGroup;
  public ages: string;
  public AgeError: boolean = false;
  isenabled: boolean = true;
  public key;
  public date;
  public email;
  public gender;
  public pickup;
  public destination;
  public startTime; 
  public escortsgender;
  public asst;
  public contact;
  public secContact;
  changeDate = '';
  correct_data;
  public myDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public formBuilder: FormBuilder) {
  this.myForm = formBuilder.group({
      Destination: ['', Validators.required],
      Pickup: ['', Validators.required],
      Assistance: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      Contact: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],
      SecContact: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],
      EscortsGender: ['', Validators.required],
      patientName: ['', Validators.required],
      patient2Name: ['', Validators.required],
      patient3Name: ['', Validators.required],
    })
  }

  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('Bookings');
  public itemRefs: firebase.database.Reference;



  ionViewDidLoad() {
    // console.log('ionViewDidLoad BookingdetailsPage');

    this.email = window.localStorage.getItem('Email');
    this.key = this.navParams.get('key');
    this.status = this.navParams.get('Status');
    
    console.log(this.status);
    console.log(this.key);
    console.log(this.index);
    
    if(this.status ==='Pending'){
      this.button = true;
    }
    if(this.status ==='Accepted'){
      this.button = false;
    }
    if(this.status === 'Cancelled'){
      this.button = false;
    }

    this.itemRef.child(this.key).once('value', (itemkeySnapshot) => {

        this.items.push(itemkeySnapshot.val());
        console.log(this.items);
        this.itemRefs = firebase.database().ref('Bookings/' + this.key);
      });

    return false;

   // this.item = this.navParams.get('item');

  }

   Update() {
    try {
      this.isenabled = false;

        this.itemRefs.update({

          Destination: this.myForm.value.Destination,
          Pickup: this.myForm.value.Pickup,
          startTime: this.myForm.value.startTime,
          endTime: this.myForm.value.endTime,
          Contact: this.myForm.value.Contact,
          SecondaryContact: this.myForm.value.SecContact,
          EscortsGender: this.myForm.value.EscortsGender,
          Assistance: this.myForm.value.Assistance,
          PatientName: this.myForm.value.patientName,
          Patient2Name: this.myForm.value.patient2Name,
          Patient3Name: this.myForm.value.patient3Name,

      });
      console.log(this.itemRefs);
      let alert = this.alertCtrl.create({
        title: 'Booking details updated!',
        buttons: [
          {
            text: 'OK',
            handler: data => {
                   this.navCtrl.push(CalendarPage);
                   this.navCtrl.setRoot(CalendarPage).then(() =>{
                   this.navCtrl.popToRoot();
                   
            });
          }
          }
        ],

      });
      alert.present();

    } catch (e) {
      console.log(e);

    }
  }

  Cancel() {
    try {
      this.isenabled = false;
      this.itemRefs.update({
        Status: "Cancelled",
        CancelledAt: firebase.database.ServerValue.TIMESTAMP
      })
      let alert = this.alertCtrl.create({
          title: 'You have cancelled the booking!',
          buttons: ['OK']
        });
        alert.present();
      
      this.navCtrl.push(BookinghistoryPage);
      this.navCtrl.setRoot(BookinghistoryPage)
      .then(() =>{
      this.navCtrl.popToRoot();           
            });
    }
    catch (e) {
      console.log(e);

    }
  }

  // saveItem(item: Bookings) {
  //   this.booking.editItem(item).then(() => {
  //     this.toast.show(`${item.Destination} saved!`);
  //     this.navCtrl.setRoot(BookingPage);
  //   });
  // }

  //  cancelItem(item: Bookings) {
  //   this.booking.cancelItem(item).then(() => {
  //     this.toast.show(`${item.Destination} cancelled!`);
  //     this.navCtrl.setRoot(BookingPage);
  //   });
  // }


  // removeItem(item: Bookings) {
  //   this.booking.removeItem(item).then(() => {
  //     this.toast.show(`${item.Destination} cancelled!`);
  //     this.navCtrl.setRoot(BookingPage);
  //   });
  // }

  Delete(){
    // this.itemRef.on('value', itemSnapshot => {
    //    this.index = this.navParams.get('index');
    //     var key = Object.keys(itemSnapshot.val())[this.index];
    //     this.itemRef.child(key).on('value', itemkeySnapshot => {
    //     itemkeySnapshot.ref.remove();
     
    //     });

    //     //return false;
    //     this.navCtrl.push(BookingdetailsPage);

    //   });

    // const bookings = this.db.object('/bookings');
    // bookings.remove('key');
  }

}
