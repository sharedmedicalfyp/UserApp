import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { Bookings } from './../../model/bookings/bookings.model';
import { BookingListService } from '../../services/booking-list/booking-list.service';
import { ToastService } from './../../services/toast/toast.service';
import { BookingPage } from '../../pages/booking/booking';
import { BookingdetailsPage } from '../../pages/bookingdetails/bookingdetails';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormsModule } from '@angular/forms';
import firebase from 'firebase';

/**
 * Generated class for the UpdatebookingdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updatebookingdetails',
  templateUrl: 'updatebookingdetails.html',
})
export class UpdatebookingdetailsPage {

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
      Contact: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],
     // SecContact: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],
      EscortsGender: ['', Validators.required],
    })
  }

  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('Bookings');
  public itemRefs: firebase.database.Reference;

  // public items: Array<any> = [];
  // public itemRef: firebase.database.Reference = firebase.database().ref('Bookings');

  // ionViewWillLoad() {
  //  // this.item = this.navParams.get('item');
  // }

  // saveItem(item: Bookings) {
  //   this.booking.editItem(item).then(() => {
  //     this.toast.show(`${item.Destination} saved!`);
  //     this.navCtrl.setRoot(BookingPage);
  //   });
  // }

    ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatebookingdetailsPage');

    this.email = window.localStorage.getItem('Email');
    this.key = this.navParams.get('key');

     this.itemRef.child(this.key).once('value', (itemkeySnapshot) => {

        this.items.push(itemkeySnapshot.val());
        console.log(this.items);

        this.pickup = itemkeySnapshot.child("Pickup").val();
        this.destination = itemkeySnapshot.child("Destination").val();
        this.startTime = itemkeySnapshot.child("startTime").val();
        this.escortsgender = itemkeySnapshot.child("EscortsGender").val();
        this.asst = itemkeySnapshot.child("Assistance").val();
        this.contact = itemkeySnapshot.child("Contact").val();

        this.itemRefs = firebase.database().ref('Bookings/' + this.key);
      });

  }

  Update() {
    try {
      this.isenabled = false;
      this.itemRefs.update({
        Destination: this.myForm.value.Destination,
        Pickup: this.myForm.value.Pickup,
        startTime: this.myForm.value.startTime,
        Contact: this.myForm.value.Contact,
        SecondaryContact: this.myForm.value.SecContact,
        EscortsGender: this.myForm.value.EscortsGender,
        Assistance: this.myForm.value.Assistance

      });
      console.log(this.itemRefs);
      let alert = this.alertCtrl.create({
        title: 'Booking details updated!',
        buttons: [
          {
            text: 'OK',
            handler: data => {
                   this.navCtrl.push(BookingdetailsPage);
                   this.navCtrl.setRoot(BookingdetailsPage).then(() =>{
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
}
