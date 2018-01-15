import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientPage } from './client';
import { ClientListComponent } from '../../components/client-list/client-list';
import { ClientInfoPage } from '../client-info/client-info';

@NgModule({
  declarations: [
    ClientPage,
    ClientListComponent
  ],
  imports: [
    IonicPageModule.forChild(ClientPage),
  ],
})
export class ClientPageModule {}
