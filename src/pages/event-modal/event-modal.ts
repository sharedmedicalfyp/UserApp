import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, LoadingController, Loading } from 'ionic-angular';
import * as moment from 'moment';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BookingPage } from '../booking/booking';
import { CarpoolPage } from '../carpool/carpool';
import { CalendarPage } from '../calendar/calendar';
import { Bookings } from './../../model/bookings/bookings.model';
import { ToastService } from './../../services/toast/toast.service';
import { BookingListService } from './../../services/booking-list/booking-list.service';
 // import { AutocompletePage } from '../autocomplete/autocomplete';
import firebase from 'firebase';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormsModule } from '@angular/forms';

declare var google:any;


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
  // itemRef: AngularFireList<any>;
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
     // placeAutofill: ['', Validators.required],
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

    // For autocomplete
    this.address = {
      place: ''
    };

    let preselectedDate = moment(this.navParams.get('selectedDay')).format("YYYY-MM-DD");

    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;

  }

   // Modal popout
  //  showAddressModal () {
  //   let modal = this.modalCtrl.create(AutocompletePage);
  //   let me = this;
  //   modal.onDidDismiss(data => {
  //     this.address.place = data;
  //   });
  //   modal.present();
  // }

  ionViewWillEnter() {
   // Google Places API auto complete
  //  let input = document.getElementById('googlePlaces').getElementsByTagName('input')[0];
  //  let autocomplete = new google.maps.places.Autocomplete(input, {types: ['geocode']});
  //  google.maps.event.addListener(autocomplete, 'place_changed', () => {
  //    // retrieve the place object for your use
  //    let place = autocomplete.getPlace();
  //  });
}

  Carpool(){
    this.navCtrl.push(CarpoolPage);
  }

  ionViewDidLoad() {
    this.key = this.navParams.get('key');
    this.email = window.localStorage.getItem('Email');
    this.name = window.localStorage.getItem('Name');
    console.log(window.localStorage.getItem('Name'));

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

    // console.log(this.event.startTime);
    // console.log(this.key);
    // console.log(this.contact);
   // console.log(this.name);
   // console.log(this.email);

    
    // this.status = this.navParams.get('Status');
    // if(this.status ==='Pending'){
    //   this.button = true;
    // }
    //   if(this.status ==='Accepted'){
    //   this.button = false;
    // }
    //     this.itemRef.child(this.key).once('value', (itemkeySnapshot) => {

    //       this.items.push(itemkeySnapshot.val());
    //       console.log(this.items);
    //       this.itemRefs = firebase.database().ref('Bookings/' + this.key);
    //     });

    //   return false;
  }

  AddBooking(){
    try {
      this.isenabled = false;

      const startTime = this.myForm.value.startTime;
      const durationInMinutes = '60';
      const endTime = moment(startTime, 'HH:mm').add(durationInMinutes, 'minutes').format('HH:mm');
      
      // Pickup region
      var pickup = this.myForm.value.Pickup;
      var postalpickup = pickup.substr(pickup.length - 6);
      var pickupregion = postalpickup.substr(0,3);

      // Dest region
      var destination = this.myForm.value.destination;
      var postaldest = destination.substr(destination.length - 6);
      var destregion = postaldest.substr(0,3);

      console.log(pickupregion);
      console.log(destregion);
      console.log(endTime);

       if((this.myForm.value.Name[3])) {
         
          console.log('4 patients');
          // Prompt max 3 members
          let alert = this.alertCtrl.create({
            title: 'Only 3 members are allowed!',
            buttons: ['OK']
          });
          alert.present();
        }

        else if ((this.myForm.value.Name[2])) {
          console.log('3 patients');
          let key:string = this.myForm.value.Name[0].Key;
          let key2:string = this.myForm.value.Name[1].Key;
          let key3:string = this.myForm.value.Name[2].Key;      
            this.itemsRef.push({
              Date: this.myForm.value.Date,
              startTime: this.myForm.value.startTime,
              endTime: endTime,
              Pickup: this.myForm.value.Pickup,
              PickupRegion: pickupregion,
              Destination: this.myForm.value.destination,
              DestinationRegion: destregion,
              Assistance: this.myForm.value.Assistance,
              EscortsGender: this.myForm.value.EscortsGender,
              Carpool: 'No',
              Needs: this.myForm.value.needs,
              Email: this.email,
              ClientName: this.name,
              PatientName: this.myForm.value.Name[0].name,
              Patient2Name: this.myForm.value.Name[1].name,
              Patient3Name: this.myForm.value.Name[2].name,
              PatientID: key,
              Patient2ID: key2,
              Patient3ID: key3,
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
          // this.navCtrl.push(BookingPage);
          // this.navCtrl.setRoot(BookingPage)
          //   .then(() => {
          //     this.navCtrl.popToRoot();
          //   });
    }
        else if (this.myForm.value.Name[1]){

          console.log('2 patients');
          let key:string = this.myForm.value.Name[0].Key;
          let key2:string = this.myForm.value.Name[1].Key;
          this.itemsRef.push({
            Date: this.myForm.value.Date,
            startTime: this.myForm.value.startTime,
            endTime: endTime,
            Pickup: this.myForm.value.Pickup,
            PickupRegion: pickupregion,
            Destination: this.myForm.value.destination,
            DestinationRegion: destregion,
            Assistance: this.myForm.value.Assistance,
            EscortsGender: this.myForm.value.EscortsGender,
            Carpool: 'No',
            Needs: this.myForm.value.needs,
            Email: this.email,
            ClientName: this.name,
            PatientName: this.myForm.value.Name[0].name,
            Patient2Name: this.myForm.value.Name[1].name,
            PatientID: key,
            Patient2ID: key2,
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
          // this.navCtrl.push(BookingPage);
          // this.navCtrl.setRoot(BookingPage)
          //   .then(() => {
          //     this.navCtrl.popToRoot();
          //   });
  }
      else if (this.myForm.value.Name[0]){
          console.log('1 patient');
          let key:string = this.myForm.value.Name[0].Key;
          this.itemsRef.push({
            Date: this.myForm.value.Date,
            startTime: this.myForm.value.startTime,
            endTime: endTime,
            Pickup: this.myForm.value.Pickup,
            PickupRegion: pickupregion,
            Destination: this.myForm.value.destination,
            DestinationRegion: destregion,
            Assistance: this.myForm.value.Assistance,
            EscortsGender: this.myForm.value.EscortsGender,
            Carpool: 'No',
            Needs: this.myForm.value.needs,
            Email: this.email,
            ClientName: this.name,
            PatientName: this.myForm.value.Name[0].name,
            PatientID: key,
            Status: 'Pending',
            Payment: '',
            ROD: '',
            Image: '',
            Duration: this.myForm.value.duration,
            Driver: '',
            Contact: this.contact,
            SecondaryContact: this.myForm.value.Secondarytel,
           // Test: this.myForm.value.placeAutofill

            });
            let alert = this.alertCtrl.create({
            title: 'A booking has been made!',
            buttons: ['OK']
          });
          alert.present();

          // this.myForm.reset();
          this.viewCtrl.dismiss();
          // this.navCtrl.push(BookingPage);
          // this.navCtrl.setRoot(BookingPage)
          //   .then(() => {
          //     this.navCtrl.popToRoot();
          //   });
  }
      }
    catch (e) {
      console.log(e);
    
    }
  }
   
  cancel() {
    this.viewCtrl.dismiss();
  }

  // ionViewDidLoad() {

  //   this.email = window.localStorage.getItem('Email');
  //   this.items = [];
  //   var appData = window.localStorage.getItem('Email');

  //   this.itemRef.orderByChild("Email").equalTo(appData).once('value', (snap) => {
  //     this.key = Object.keys(snap.val());
  //     snap.forEach(itemSnap => {
  //       this.items.push(itemSnap.val());
  //       this.email = itemSnap.child("Email").val();
      
  //       return false;

  //     });
  
  //     // this.itemsRef = firebase.database().ref('Bookings/' + this.key);
  //   });
  // }

  //  item: Bookings = {
  //     Date: '',
  //     startTime: '',
  //     // endTime: '',
  //     // Time: '',
  //     Duration: '',
  //     Pickup: '',
  //     Destination: '',
  //     Assistance: '',
  //     EscortsGender: '',
  //     Carpool: '',
  //     Image: '',
  //     // Contact: undefined,
  //     Status: 'Pending',
  //     Driver: '',
  //     ROD: '',
  //     Payment: '',
  //     Comments: '',
  //     Email: 'sharedmedicalfyp@gmail.com',
  // };

  // addItem(item: Bookings) {
  //   this.booking.addItem(item).then(ref => {
  //     this.toast.show(`${item.Destination} added!`);
  //     this.navCtrl.setRoot(BookingPage);
  //   });
  // }

  // Firebase
  // save(location, date, startTime, endTime, assistance, twowaytrip, duration, contact) {

  //   this.itemRef.push({

  //           Address: location,
  //           Date: date,
  //           Starttime: startTime,
  //           Endtime: endTime,
  //           Duration: duration,
  //           Assistance: assistance,
  //           TwoWayTrip: twowaytrip,
  //           Contact: contact,
  //           Status: "",
  //           Driver: "",
  //           ROD: "",
  //           Payment: ""

  //          })
  //             //  console.log(startTime);

  //   this.viewCtrl.dismiss(this.event);
  //   this.navCtrl.push(BookingPage);
    
  // }

  // JS
  //  save() {
  //   this.viewCtrl.dismiss(this.event);

  // }

}
