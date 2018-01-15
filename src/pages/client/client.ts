import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Client } from '../../models/client';
import { ClientProvider } from '../../providers/client/client';

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

  constructor(public navCtrl: NavController, 
    public clientService: ClientProvider, 
    public alertCtrl: AlertController ) {

    let suscriptor = clientService.getClients().subscribe(data => {
       this.clients = data;
    });
    // this.clients = [
    //   (new Client("Ruth", "Siles", 9990900)),
    //   (new Client("Esther", "Gomez", 945400)),
    //   (new Client("Maria", "Delgado", 6786878)),
    // ];
  }

  addClient(){
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
            this.clientService.addClient(data);
          }
        }
      ]
    });
    prompt.present();
  }
}
