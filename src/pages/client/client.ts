import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Client } from '../../models/client';
import { ClientProvider } from '../../providers/client/client';
import { Geolocation } from '@ionic-native/geolocation';
import { Location } from '../../models/location';

/**
 * Generated class for the ClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {
  searchQuery: String;
  clients: Client[];
  location: Location= new Location();

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    public clientService: ClientProvider,
    public alertCtrl: AlertController) {

    let suscriptor = clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location.latitude = resp.coords.latitude;
      this.location.longitude = resp.coords.longitude;
      console.log("Location Client", this.location);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  addClient() {
    let prompt = this.alertCtrl.create({
      title: 'Client',
      message: "Register Client",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'lastName',
          placeholder: 'Last Name'
        },
        {
          name: 'phoneNumber',
          placeholder: 'Phone Number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            data["location"] = this.location;
            console.log("Client Information", data);
            console.log("Data client", data.location);
            this.clientService.addClient(data);
          }
        }
      ]
    });
    prompt.present();
  }
}
