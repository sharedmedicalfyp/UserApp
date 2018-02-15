import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { BookingPage } from '../booking/booking';
import { TabsPage }  from '../tabs/tabs';
import { CalendarPage } from '../calendar/calendar';
import { FaqPage } from '../faq/faq';
import { LoginPage } from '../login/login';
import { FamilyProfilePage } from '../family-profile/family-profile';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormsModule } from '@angular/forms';
import * as firebase from 'firebase';

// Firebase
import { AngularFireDatabase, AngularFireObject, AngularFireList, AngularFireDatabaseModule } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the AddprofilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addprofile',
  templateUrl: 'addprofile.html',
})
export class AddprofilePage {

  imageURL;
  itemsRef: AngularFireList<any>;
  public ages: string;
  public AgeError: boolean = false;
  isenabled: boolean = false;
  public mismatchedPasswords: boolean = false;
  public age: number;
  myForm: FormGroup;
  minDate = new Date().toISOString();
  public error: string;
  email;

   constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth
  , public alertCtrl: AlertController, afDatabase: AngularFireDatabase, public formBuilder: FormBuilder,){

    this.itemsRef = afDatabase.list('FamilyProfile');

    this.myForm = formBuilder.group({   
      Name: ['', Validators.required],
      //Username: ['', Validators.required],
      tel: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],
     // email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      gender: ['', Validators.required],

      // address: ['', Validators.required],
      // IC: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.pattern('[a-zA-Z]{1}[0-9]{7}[a-zA-Z]{1}')])],
      // plateNo: ['', Validators.required],

      age: ['', Validators.required],
      DOB: ['', Validators.required],
      needs: ['', Validators.required],
    })

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProfilePage');
    this.email = window.localStorage.getItem('Email');

  }

    public getAge() {

      var selDate = new Date().getFullYear() - new Date(this.myForm.value.DOB).getFullYear();
      this.ages = selDate.toString();
      document.getElementById('age').getElementsByTagName('input')[0].value = this.ages;
      this.myForm.value.age = this.ages;
      if (selDate < 18 || selDate > 70) {
        this.AgeError = true;
        this.isenabled = false;
      }
      else {
        this.AgeError = false;
        this.isenabled = true;
        console.log(this.isenabled)
      }

    }

    CreateProfile() {
      
          this.itemsRef.push({
            Name: this.myForm.value.Name,
            Tel: this.myForm.value.tel,
           // Email: this.myForm.value.email,
            Email: this.email,
            Age: this.ages,
            DOB: this.myForm.value.DOB,
            Gender: this.myForm.value.gender,
            Needs: this.myForm.value.needs
            });

          let alert = this.alertCtrl.create({
            title: 'A new family profile has been created!',
            buttons: ['OK']
          });

          alert.present();
          this.myForm.reset();
          this.navCtrl.push(CalendarPage);
          this.navCtrl.setRoot(CalendarPage)
            .then(() => {
              this.navCtrl.popToRoot();
            });
     }

}