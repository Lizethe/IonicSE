import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import { ClientProvider } from '../providers/client/client';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ClientInfoPage } from '../pages/client-info/client-info';
import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { ClientPage } from '../pages/client/client';
import { LocationPage } from '../pages/location/location';

export const configFirebase = {
  apiKey: "AIzaSyCiEXXfNfVh_vhugAvNyEgzJhV8B23vy1w",
  authDomain: "ionicse-69501.firebaseapp.com",
  databaseURL: "https://ionicse-69501.firebaseio.com",
  projectId: "ionicse-69501",
  storageBucket: "",
  messagingSenderId: "1063190640915"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    // ClientPage,
    // LocationPage,
    // ClientInfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(configFirebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    // ClientPage,
    // LocationPage,
    // ClientInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClientProvider,
    HttpClient,
    Camera,
    Geolocation,
    GoogleMaps
  ]
})
export class AppModule {}
