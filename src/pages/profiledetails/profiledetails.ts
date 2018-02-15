import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Navbar, ModalController } from 'ionic-angular';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
// import { Profile } from '../../model/profile';
import firebase from 'firebase';
import { FormsModule } from "@angular/forms";
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ViewChild } from '@angular/core'
import { ProfilePage } from '../profile/profile';
import { FamilyProfilePage } from '../family-profile/family-profile';
import { UpdatefamilydetailsPage } from '../updatefamilydetails/updatefamilydetails';

/**
 * Generated class for the ProfiledetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profiledetails',
  templateUrl: 'profiledetails.html',
})
export class ProfiledetailsPage {

  public name;
  status;
  email;
  myForm: FormGroup;
  public ages: string;
  public AgeError: boolean = false;
  isenabled: boolean = false;
  public date;
  public mismatchedPasswords: boolean = true;
  public key;
  changeDate = '';
  correct_data;
  public myDate: string;
  private currentUser: firebase.User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public formBuilder: FormBuilder) {
  this.myForm = formBuilder.group({
      Name: ['', Validators.required],
      Username: ['', Validators.required],
      tel: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],
      age: ['', Validators.required],
      myDate: ['', Validators.required],

    })
  }
  

  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('FamilyProfile');
  public itemRefs: firebase.database.Reference;

  ionViewDidLoad() {
     console.log('ionViewDidLoad FamilyProfileDetailsPage');

    this.email = window.localStorage.getItem('Email');
    this.key = this.navParams.get('key');

     this.itemRef.child(this.key).once('value', (itemkeySnapshot) => {

        this.items.push(itemkeySnapshot.val());
        console.log(this.items);

        this.date = itemkeySnapshot.child("DOB").val();
        this.myDate = this.date;
        this.itemRefs = firebase.database().ref('FamilyProfile/' + this.key);
      });
      

    //  this.items = [];
    //  var appData = window.localStorage.getItem('Email');
    //  this.key = this.navParams.get('key');

    //   this.itemRef.orderByChild("Email").equalTo(appData).once('value', (snap) => {
    //   this.key = Object.keys(snap.val());
       
    //   console.log(this.key);
    //   snap.forEach(itemSnap => {
    //     this.items.push(itemSnap.val());
    //     this.date = itemSnap.child("DOB").val();
    //     return false;

    //   });
    //   this.myDate = this.date;
    //   this.itemsRef = firebase.database().ref('FamilyProfile/' + this.key);

    //   });

  }

  public getAge() {

    var selDate = new Date().getFullYear() - new Date(this.myForm.value.myDate).getFullYear();
    this.ages = selDate.toString();
    document.getElementById('age').getElementsByTagName('input')[0].value = this.ages;
    this.myForm.value.age = this.ages;
    if (selDate < 50) {
      this.AgeError = true;
      this.isenabled = false;
    }
    else {
      this.AgeError = false;
      this.isenabled = true;
    }

  }

    Update() {
    //  this.navCtrl.push(UpdatefamilydetailsPage);

    try {
      this.isenabled = false;
      this.itemRefs.update({
        Name: this.myForm.value.Name,
        Tel: this.myForm.value.tel,
        Age: this.ages,
        DOB: this.myForm.value.myDate,

      });
      console.log(this.itemRefs);
      let alert = this.alertCtrl.create({
        title: 'Profile was updated!',
        buttons: [
          {
            text: 'OK',
            handler: data => {
                   this.navCtrl.push(FamilyProfilePage);
                   this.navCtrl.setRoot(FamilyProfilePage).then(() =>{
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

  // profileData: FirebaseObjectObservable<Profile>;

  //  constructor(public navCtrl: NavController, public toast: ToastController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
  // }

  // profile = {} as Profile;

  // ionViewWillLoad(){
  // this.afAuth.authState.subscribe(data => {
  //    if(data.email && data.uid){
  //      this.toast.create({
  //      message: 'Welcome!',
  //      duration: 3000
  //    }).present();

  //    this.profileData = this.afDatabase.object(`Profile/${data.uid}`);
  //    }
  //   else{
  //      this.toast.create({
  //      message: 'Could not find authentication details.',
  //      duration: 3000
  //    }).present();

  //   }
  // });

  // createProfile(){
  //   this.afAuth.authState.take(1).subscribe(auth => {
  //       this.afDatabase.object(`Profile/${auth.uid}`).set(this.profile)         // Use backticks `
  //       .then(() => this.navCtrl.push('CalendarPage'));

  //   });
  // }

}
