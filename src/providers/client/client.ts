import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Client } from '../../models/client';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ClientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientProvider {

  clients: AngularFireList<Client>;;

  
  constructor(public http: HttpClient, 
    public clientsDB: AngularFireDatabase,
    public afAuth: AngularFireAuth ) {
    this.clients = clientsDB.list('/clients/'+afAuth.auth.currentUser.uid);
  }

  getClients(): Observable<Client[]>{
    return this.clients.valueChanges();
  }

  addClient(client: Client){
    this.clients.push(client);
  }

  deleteClient(client){
    console.log("Delete client", client);
    //this.clients.remove(client);
  }
}
