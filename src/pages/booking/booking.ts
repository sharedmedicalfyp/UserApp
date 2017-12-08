import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the BookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  //declare
  bookings: Observable<any[]>;
  itemRef: AngularFireList<any>;
  //  item: FirebaseObjectObservable<any>;
  //  bookings: AngularFireList<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase, 
  public alertCtrl: AlertController) {
    
    // const itemRef = afDatabase.object('Bookings');
    // // Init
    // this.bookings = afDatabase.list('/booking').valueChanges();
     this.itemRef = afDatabase.list('Bookings');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

  // Add a hidden input field (E.g. column hidden = null)

  createBooking(location, date, timeslot, assistance, twowaytrip, duration, contact){
   // twowaytrip = 'yes';

  // let prompt = this.alertCtrl.create({
  //   title: 'Booking',
  //   message: "Enter a name for this new song you're so keen on adding",
  //   inputs: [
  //     {
  //       // name: 'title',
  //       // placeholder: 'Title'
  //     },
  //   ],
  //   buttons: [
  //     {
  //       text: 'Cancel',
  //       handler: data => {
  //         console.log('Cancel clicked');
  //       }
  //     },
  //     {
  //       text: 'Save',
  //       handler: data => {
        //  const newSongRef = this.bookings.push({});
        //const itemRef = afDatabase.object('item');
 
          // this.itemRef.set({
          //  // id: this.itemRef.key,
          //   title: data.title
          // });
           //this.itemRef.set({ title: data.title });

          //  try{
            this.itemRef.push({
            Location: location,
            Date: date,
            Timeslot: timeslot,
            Assistance: assistance,
            TwoWayTrip: twowaytrip,
            Duration: duration,
            Contact: contact
             }) //}

//               catch(e){
//  console.log(e);
 
//     }


  
  //   });

           
  //       }
  //     }
  //   ]
  // });
  // prompt.present();
    
}

// Register(Name,Username,tel,email,password,rePassword,address,age,Issuedate,ExpiryDate){
// try{
//     this.itemRef.push({
//       name: Name,
//       Username:Username,
//        tel: tel,
//        email:email,
//        password:password,
//        rePassword:rePassword,
//       address: address,
//      age:age,
//      Issuedate:Issuedate,
//      ExpiryDate:ExpiryDate,

//     });

// }
//     catch(e){
//  console.log(e);
 
//     }
    
// } 

}
