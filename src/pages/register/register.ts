import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public user: User = new User();
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth: AngularFireAuth, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    // this.navCtrl.push(TabsPage);
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then(result => {
        this.navCtrl.push(TabsPage);
      }).catch(err => {
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 3000
        });
        toast.present();
        console.error(err);
      });
  }

}
