import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// Firebase
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AngularFireAuthModule, AngularFireAuth, AngularFireAuthProvider, AUTH_PROVIDERS } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ForgotpwdPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpwd',
  templateUrl: 'forgotpwd.html',
})
export class ForgotpwdPage {

  email;
  myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, afDB: AngularFireDatabase, 
  public formBuilder: FormBuilder, private afAuth: AngularFireAuth) {

    this.myForm = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpwdPage');
  }

  resetPassword(email: string) {
    try {
      this.afAuth.auth.sendPasswordResetEmail(this.myForm.value.email).then(() => {
        console.log("asd");
        let alert = this.alertCtrl.create({
          title: 'A link has been sent to reset your password!',
          buttons: [
            {
              text: 'OK',
              cssClass: 'buttonOkCss',

              handler: data => {
                this.navCtrl.push(LoginPage);
              }
            }
          ],
        });
        alert.present();
      }).catch((error) =>{
        // An error happened.
     
        let alert = this.alertCtrl.create({
          title: error.message,
          buttons: [
            {
              text: 'OK',
              cssClass: 'buttonOkCss', 
            }
          ],
        });
        alert.present();
         this.myForm.get('email').setErrors({ Mismatch: true })
     
      });

    } catch (e) {
    console.log(e.message);
      let alert = this.alertCtrl.create({
          title: e.message,
          buttons: [
            {
              text: 'OK',
              cssClass: 'buttonOkCss',
            }
          ],
        });
        alert.present();
    }
  }

  //  sendPassword(email) {
  //   this.angularFireAuth.auth.sendPasswordResetEmail(email)
  //   .then(() => {
  //     console.log('email sent');
  //   })
  // }

}
