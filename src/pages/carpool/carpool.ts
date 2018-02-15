import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, LoadingController, Loading } from 'ionic-angular';
import * as moment from 'moment';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BookingPage } from '../booking/booking';
import { Bookings } from './../../model/bookings/bookings.model';
import { ToastService } from './../../services/toast/toast.service';
import { BookingListService } from './../../services/booking-list/booking-list.service';
import firebase from 'firebase';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormsModule } from '@angular/forms';
import { CalendarPage } from '../calendar/calendar';

/**
 * Generated class for the CarpoolPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carpool',
  templateUrl: 'carpool.html',
})
export class CarpoolPage {

  address;
  public key;
  email;
  contact;
  name;

  public ages: string;
  public AgeError: boolean = false;
  isenabled: boolean = false;
  public mismatchedPasswords: boolean = false;
  public age: number;
  myForm: FormGroup;
  public error: string;
 
  bookings: Observable<any[]>;
  familys: Observable<any[]>;
  familyRef: AngularFireList<any>;

  public Person = {};

  public items: Array<any> = [];
  public itemsRef: firebase.database.Reference = firebase.database().ref('Bookings');
  public itemRef2: firebase.database.Reference = firebase.database().ref('Users');
  public itemRef: firebase.database.Reference;

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();

constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,public afDatabase: AngularFireDatabase
  , private booking: BookingListService, private toast: ToastService, private modalCtrl: ModalController, public alertCtrl: AlertController
  , public loadingCtrl: LoadingController,  public formBuilder: FormBuilder) {

    // this.itemsRef = afDatabase.list('Bookings');  // Insert into Bookings table
     this.familyRef = afDatabase.list('FamilyProfile'
     //,ref => ref.orderByChild('Date')
    );

    this.familys = this.familyRef.snapshotChanges().map(changes => {
      return changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() }))
        .filter(familys => (familys.Email === this.email));
    });

      this.myForm = formBuilder.group({
      Date: ['', Validators.required],
      startTime: ['', Validators.required],
      duration: ['', Validators.required],
      Pickup: ['', Validators.required],
      destination: ['', Validators.required],
      Assistance: ['', Validators.required],
      EscortsGender: ['', Validators.required],
      carpool: ['', Validators.required],
      needs: ['', Validators.required],
      Name: ['', Validators.required],
      Secondarytel: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],

    })

    this.address = {
      place: ''
    };

    let preselectedDate = moment(this.navParams.get('selectedDay')).format("YYYY-MM-DD");

    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarpoolPage');

    this.key = this.navParams.get('key');
    this.email = window.localStorage.getItem('Email');

     this.items = [];
     var appData = window.localStorage.getItem('Email');

      this.itemRef2.orderByChild("Email").equalTo(appData).once('value', (snap) => {
      this.key = Object.keys(snap.val());
       
      console.log(this.key);
      snap.forEach(itemSnap => {
        this.items.push(itemSnap.val());
        this.contact = itemSnap.child("Tel").val();
        return false;

      });
      this.itemRef = firebase.database().ref('Users/' + this.key);

      console.log(this.contact);

      });
  }

  AddBooking(){
    try {
      this.isenabled = false;

      var start = this.myForm.value.startTime.split('-')[0];
      var end = this.myForm.value.startTime.split('-')[1];

      // Pickup region
      var pickup = this.myForm.value.Pickup;
      var postalpickup = pickup.substr(pickup.length - 6);
      var pickupregion = postalpickup.substr(0,3);

      // Dest region
      var destination = this.myForm.value.destination;
      var postaldest = destination.substr(destination.length - 6);
      var destregion = postaldest.substr(0,3);

      console.log(start);
      console.log(end);

      if((this.myForm.value.Name[2])) {
         
        console.log('3 fam patients');
        // Prompt max 3 members
        let alert = this.alertCtrl.create({
          title: 'Only 2 family members are allowed in a carpool booking!',
          buttons: ['OK']
        });
        alert.present();
       }

      else if ((this.myForm.value.Name[1])) {
        console.log('2 fam patients');

          this.itemsRef.push({
            Date: this.myForm.value.Date,
            startTime: start,
            endTime: end,
            Pickup: this.myForm.value.Pickup,
            PickupRegion: pickupregion,
            Destination: this.myForm.value.destination,
            DestinationRegion: destregion,
            Assistance: this.myForm.value.Assistance,
            EscortsGender: this.myForm.value.EscortsGender,
            Carpool: 'Yes',
            Needs: this.myForm.value.needs,
            Email: this.email,
            PatientName: this.myForm.value.Name[0],
            Patient2Name: this.myForm.value.Name[1],
            Status: 'Pending',
            Payment: '',
            ROD: '',
            Image: '',
            Duration: this.myForm.value.duration,
            Driver: '',
            Contact: this.contact,
            SecondaryContact: this.myForm.value.Secondarytel,

            });
          let alert = this.alertCtrl.create({
            title: 'A booking has been made!',
            buttons: ['OK']
          });
          alert.present();

          // this.myForm.reset();
          this.viewCtrl.dismiss();
          // this.navCtrl.push(CalendarPage);
          // this.navCtrl.setRoot(CalendarPage)
          // .then(() => {
          //   this.navCtrl.popToRoot();

          // });
  }
      else if ((this.myForm.value.Name[0])) {
      
        this.itemsRef.push({
            Date: this.myForm.value.Date,
            startTime: start,
            endTime: end,
            Pickup: this.myForm.value.Pickup,
            PickupRegion: pickupregion,
            Destination: this.myForm.value.destination,
            DestinationRegion: destregion,
            Assistance: this.myForm.value.Assistance,
            EscortsGender: this.myForm.value.EscortsGender,
            Carpool: 'Yes',
            Needs: this.myForm.value.needs,
            Email: this.email,
            PatientName: this.myForm.value.Name[0],
            Status: 'Pending',
            Payment: '',
            ROD: '',
            Image: '',
            Duration: this.myForm.value.duration,
            Driver: '',
            Contact: this.contact,
            SecondaryContact: this.myForm.value.Secondarytel,

          });

        let alert = this.alertCtrl.create({
          title: 'A booking has been made!',
          buttons: ['OK']
        });
        alert.present();

        //this.myForm.reset();
        this.viewCtrl.dismiss();
        // this.navCtrl.push(CalendarPage);
        // this.navCtrl.setRoot(CalendarPage)
        //   .then(() => {
        //     this.navCtrl.popToRoot();

        //   });
      }
    }
    catch (e) {
      console.log(e);
    
    }
  }

}
