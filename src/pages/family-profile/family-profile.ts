import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Refresher, LoadingController, ModalController, MenuController} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProfiledetailsPage } from '../profiledetails/profiledetails';

/**
 * Generated class for the FamilyProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-family-profile',
  templateUrl: 'family-profile.html',
})
export class FamilyProfilePage {

  email;
  items: Observable<any[]>;
  public times: Array<any> = [];
  itemsRef: AngularFireList<any>;
  PickUpClicked: boolean = false;
  GenderClicked: boolean = false;
  visible: boolean = false;
  pickup: boolean = false;
  gender: boolean = false;
  male: boolean = true;
  female: boolean = true;
  structure;
  toggle: boolean = true;
  DateClicked: boolean = false;
  public buttonClicked: boolean = false;
  today = new Date().toJSON().split('T')[0];
  public itemRef: firebase.database.Reference = firebase.database().ref('FamilyProfile');
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public menuCtrl: MenuController, afDatabase: AngularFireDatabase, public modalCtrl: ModalController) {
    this.itemsRef = afDatabase.list('FamilyProfile'
      //,ref => ref.orderByChild('startTime')
    );
  
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() }))
        .filter(items => (items.Email === this.email));
    });

  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad FamilyProfilePage');
     this.email = window.localStorage.getItem('Email');

  }

   gotoPage(key) {
    this.navCtrl.push(ProfiledetailsPage, {
      key: key,

    });

  }
}
