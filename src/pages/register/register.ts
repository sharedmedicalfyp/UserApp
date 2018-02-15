import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { BookingPage } from '../booking/booking';
import { TabsPage }  from '../tabs/tabs';
import { CalendarPage } from '../calendar/calendar';
import { FaqPage } from '../faq/faq';
import { LoginPage } from '../login/login';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormsModule } from '@angular/forms';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

// Firebase
import { AngularFireDatabase, AngularFireObject, AngularFireList, AngularFireDatabaseModule } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  imageURL;
  public base64Image: string;
  Image: any;
  pic;
  itemsRef: AngularFireList<any>;
  public ages: string;
  public AgeError: boolean = false;
  isenabled: boolean = false;
  public mismatchedPasswords: boolean = false;
  public age: number;
  myForm: FormGroup;
  minDate = new Date().toISOString();
  public error: string;
  user: any;

   constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth
  , public alertCtrl: AlertController, afDatabase: AngularFireDatabase, public formBuilder: FormBuilder,
    public actionSheetCtrl: ActionSheetController, private camera: Camera,){

    this.itemsRef = afDatabase.list('Users');

    this.myForm = formBuilder.group({   
      Name: ['', Validators.required],
    //  Username: ['', Validators.required],
      tel: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      gender: ['', Validators.required],

      // address: ['', Validators.required],
      // IC: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.pattern('[a-zA-Z]{1}[0-9]{7}[a-zA-Z]{1}')])],
      // plateNo: ['', Validators.required],

      age: ['',],
      DOB: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(25), Validators.required])],
      rePassword: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(25), Validators.required])],
    })

  }

  matchingPasswords() {
    if (this.myForm.value.password !== this.myForm.value.rePassword) {
      this.myForm.get('rePassword').setErrors({ Mismatch: true })
      this.mismatchedPasswords = true;
    }
    else {
      this.mismatchedPasswords = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  Back(){
     this.navCtrl.push(LoginPage);
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

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Via',
      buttons: [
        {
          text: 'Gallery',
          handler: () => {
            this.galleryPhoto();
            console.log('Gallery clicked');
          }
        },
        // {
        //   text: 'Camera',
        //   handler: () => {
        //     this.takePhoto();
        //     console.log('Camera clicked');
        //   }
        // },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  galleryPhoto() {
    const options: CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 200,
      targetHeight: 200,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType  : this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.Image = imageData;
      // this.photos.push(this.base64Image);
      // this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
  }


  Register() {
    try {
      this.isenabled = false;
      this.afAuth.auth.createUserWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password).then(auth => {

        var Name = this.myForm.value.Name;
        var Tel = this.myForm.value.tel;
        var Email = this.myForm.value.email;
        var Age = this.ages;
        var DOB = this.myForm.value.DOB;
        var Gender = this.myForm.value.gender;

        let user: any = firebase.auth().currentUser;
        firebase.auth().onAuthStateChanged(function (user) {
          user.sendEmailVerification();
        });

        let storageRef = firebase.storage().ref();
        // Create a reference to 'images/todays-date.jpg'
        const imageRef = storageRef.child('images/' + this.myForm.value.email + '.jpg');
        imageRef.putString(this.base64Image, firebase.storage.StringFormat.DATA_URL).then(snapshot => {
          this.pic = snapshot.downloadURL;
          this.itemsRef.push({
            Name: Name,
            Tel: Tel,
            Email: Email,
            Pic: this.pic,
            Age: this.ages,
            DOB: DOB,
            Gender: Gender,

          });


        });
        
        // this.itemsRef.push({
        //   Name: this.myForm.value.Name,
        // //  Username: this.myForm.value.Username,
        //   Tel: this.myForm.value.tel,
        //   Email: this.myForm.value.email,

        //   // Address: this.myForm.value.address,
        //   Age: this.ages,
        //   DOB: this.myForm.value.DOB,
        //   // PlateNo: this.myForm.value.plateNo,
        //   // IC: this.myForm.value.IC,
        //   Gender: this.myForm.value.gender,
        //   // Pic: 
        //   });

        let alert = this.alertCtrl.create({
          title: 'Email verification sent!',
          buttons: ['OK']
        });
        alert.present();
        this.myForm.reset();
        this.navCtrl.push(LoginPage);
      })
        .catch(err => {
          // Handle error
          let alert = this.alertCtrl.create({
            title: 'Error',
            message: err.message,
            buttons: ['OK']
          });
          alert.present();
            this.myForm.get('email').setErrors({Mismatch: true})
            this.isenabled = true;
        });
    
    }
    catch (e) {
      console.log(e);
    
    }

  }

  // register(email, password) {
  //   this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
  //   .then((res) => {
  //     this.sendEmailVerification()
  //   })
  //   .catch((err)=> {
  //     //Do as you please here
  //   });
  // }

  // sendEmailVerification() {
  //   this.angularFireAuth.authState.subscribe(user => {
  //       user.sendEmailVerification()
  //       .then(() => {
  //         console.log('email sent');
  //       })
  //     });
  // }


}
