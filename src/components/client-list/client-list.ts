import { Component, Input } from '@angular/core';
import { Client } from '../../models/client';
import { NavController } from 'ionic-angular';
// import { ClientInfoPage } from '../../pages/client-info/client-info';

/**
 * Generated class for the ClientListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'client-list',
  templateUrl: 'client-list.html'
})
export class ClientListComponent {

  @Input() clients: Client[];

  constructor(public navCtrl: NavController) {
    console.log('Hello ContactListComponent Component');
  }


  goToClientInfo(client: Client){
    this.navCtrl.push('ClientInfoPage', {'client': client});
  }

}
