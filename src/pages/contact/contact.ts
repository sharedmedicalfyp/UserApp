import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,  } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ToastService } from './../../services/toast/toast.service';

/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  itemRef: AngularFireList<any>;
  email;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastService,
  public viewCtrl: ViewController, public afDatabase: AngularFireDatabase) {

    this.itemRef = afDatabase.list('Feedback');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
    this.email = window.localStorage.getItem('Email');
  }

  // Firebase
  save(title, comments) {
    this.itemRef.push({
            Email: this.email,
            Title: title,
            Comments: comments,

           }).then(ref => {
             this.toast.show(`Feedback has been submitted!`);
             this.navCtrl.setRoot(ContactPage)
            .then(() => {
              this.navCtrl.popToRoot();
            });
           });
  }

  // addItem(item: Bookings) {
  //   this.booking.addItem(item).then(ref => {
  //     this.toast.show(`${item.Date} added!`);
  //     // this.navCtrl.setRoot(BookingPage, { key: ref.key });
  //     this.navCtrl.setRoot(BookingPage);
  //    // this.viewCtrl.dismiss(this.event);
  //   });
  // }

}
