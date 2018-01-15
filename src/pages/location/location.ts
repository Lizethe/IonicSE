import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { GoogleMap, Marker, GoogleMaps, GoogleMapOptions, GoogleMapsEvent } from '@ionic-native/google-maps';
import { AngularFireAuth } from 'angularfire2/auth';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  locations: AngularFireList<Location>;
  loc: AngularFireObject<Location>;
  watch: any;
  map: GoogleMap;
  location: Location = new Location();
  marker: Marker;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private geolocation: Geolocation,
     private googleMaps: GoogleMaps,
     public db: AngularFireDatabase,
     public afAuth: AngularFireAuth) {
      this.locations = db.list('/location/'+afAuth.auth.currentUser.uid);

  }

  addLocation(){
    this.locations.push(this.location);
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location.latitude = resp.coords.latitude;
      this.location.longitude = resp.coords.longitude;
      this.loadMap();
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    this.watch = this.geolocation.watchPosition();
    this.watch.subscribe((data) => {
      this.location.latitude = data.coords.latitude;
      this.location.longitude = data.coords.longitude;
      if(this.marker){
        this.marker.setPosition({lat: this.location.latitude, 
          lng: this.location.longitude});
      }

    });
    
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.location.latitude,
          lng: this.location.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: this.location.latitude,
              lng: this.location.longitude
            },
            draggable: true
          })
          .then(marker => {
            this.marker = marker;

            marker.on(GoogleMapsEvent.MARKER_DRAG_END)
            .subscribe((marker) => {
              console.log(marker);
              this.location.latitude = marker.getPosition().lat;
              this.location.longitude = marker.getPosition().lng;
            });

            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  } 

}
