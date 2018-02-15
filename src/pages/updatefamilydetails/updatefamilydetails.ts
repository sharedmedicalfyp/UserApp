import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormsModule } from '@angular/forms';
import firebase from 'firebase';
import { FamilyProfilePage } from '../family-profile/family-profile';

/**
 * Generated class for the UpdatefamilydetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updatefamilydetails',
  templateUrl: 'updatefamilydetails.html',
})
export class UpdatefamilydetailsPage {

  myForm: FormGroup;
  public ages: string;
  public AgeError: boolean = false;
  isenabled: boolean = true;
  public key;
  public date;
  public email;
  public gender;
  public password;
  changeDate = '';
  correct_data;
  public myDate: string

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
  public itemsRef: firebase.database.Reference;

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatefamilypdetailsPage');

   // this.items = [];
    var appData = window.localStorage.getItem('Email');
    // this.key = this.navParams.get('key');
    // console.log(this.key);

    this.itemRef.orderByChild("Email").equalTo(appData).once('value', (snap) => {
      this.key = Object.keys(snap.val());
      console.log(this.key);
      snap.forEach(itemSnap => {
        this.items.push(itemSnap.val());
        this.date = itemSnap.child("DOB").val();
        this.ages = itemSnap.child("Age").val();
        this.email = itemSnap.child("Email").val();
        this.gender = itemSnap.child("Gender").val();
   
        return false;

      });
      this.myDate = this.date;
      this.itemsRef = firebase.database().ref('FamilyProfile/' + this.key);
    });

  }

   public getAge() {

    var selDate = new Date().getFullYear() - new Date(this.myForm.value.myDate).getFullYear();
    this.ages = selDate.toString();
    document.getElementById('age').getElementsByTagName('input')[0].value = this.ages;
    this.myForm.value.age = this.ages;
    if (selDate < 18) {
      this.AgeError = true;
      this.isenabled = false;
    }
    else {
      this.AgeError = false;
      this.isenabled = true;
    }

  }

  Update() {
    try {
      this.isenabled = false;
      this.itemsRef.update({
        Name: this.myForm.value.Name,
        Tel: this.myForm.value.tel,
        Age: this.ages,
        DOB: this.myForm.value.myDate,

      });
      console.log(this.itemsRef);
      let alert = this.alertCtrl.create({
        title: 'Profile updated!',
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


}
