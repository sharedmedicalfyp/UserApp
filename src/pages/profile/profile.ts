import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ModalOptions, ActionSheetController, Events } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { CalendarPage } from '../../pages/calendar/calendar';
import { UpdateprofilePage } from '../updateprofile/updateprofile';
import { AddprofilePage } from '../addprofile/addprofile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
// import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

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
  base64Image;
  appData;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
  public modalCtrl: ModalController, public formBuilder: FormBuilder,public actionSheetCtrl: ActionSheetController, private camera: Camera,
  public events: Events) {
  }
  
  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('Users');
  public itemsRef: firebase.database.Reference;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

     this.items = [];
     var appData = window.localStorage.getItem('Email');

      this.itemRef.orderByChild("Email").equalTo(appData).once('value', (snap) => {
      this.key = Object.keys(snap.val());
       
      console.log(this.key);
      snap.forEach(itemSnap => {
        this.items.push(itemSnap.val());
        this.date = itemSnap.child("DOB").val();
        this.base64Image = itemSnap.child("Pic").val();
        return false;

      });
      this.myDate = this.date;
      this.itemsRef = firebase.database().ref('Users/' + this.key);

      });
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
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        correctOrientation: true,
      }
      this.camera.getPicture(options).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        let storageRef = firebase.storage().ref();
        const imageRef = storageRef.child('images/' + this.appData + '.jpg');
      
            imageRef.putString(this.base64Image, firebase.storage.StringFormat.DATA_URL).then(snapshot => {
          this.itemsRef.update({
            Pic: snapshot.downloadURL,
          });
          window.sessionStorage.setItem('uImage', snapshot.downloadURL);
          
          this.events.publish('profileUpdated');
      
      });
    }, (err) => {
      console.log(err);
    });
  }

  UpdateProfile() {
    this.navCtrl.push(UpdateprofilePage);
  }

  AddProfile() {
    this.navCtrl.push(AddprofilePage);
  }

  UpdatePassword() {
    // const myModalOptions: ModalOptions = {
    //   enableBackdropDismiss: false
    // };
    // const myModal = this.modalCtrl.create({Password: this.myForm.value.password });
    // myModal.present();
    // console.log(this.key);
    // var user = firebase.auth().currentUser;
  }

 

}
