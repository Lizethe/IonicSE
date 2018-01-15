import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Client } from '../../models/client';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera';
import { ClientProvider } from '../../providers/client/client';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ClientInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-info',
  templateUrl: 'client-info.html',
})
export class ClientInfoPage {

  client: Client;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public clientService: ClientProvider,
    private callNumber: CallNumber,
    public camera: Camera) {
    this.client = navParams.get('client');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactInfoPage');
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.client.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  callClient(phone: string) {
    this.callNumber.callNumber(phone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  deleteClient(client){
    this.clientService.deleteClient(client);
  }
}
