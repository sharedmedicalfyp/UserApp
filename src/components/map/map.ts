import { Component,OnInit, Input } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
// import { PickupDirective } from '../pickup/pickup';


declare var google;
/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html',
  // directives: [PickupDirective]
})
export class MapComponent implements OnInit {

  @Input() isPickupRequested: boolean;

  public map;
  constructor(public loadingCtrl: LoadingController, public nav: NavController, private geolocation: Geolocation) {

  }

  ngOnInit(){
    this.map =this.createMap();

     this.getCurrentLocation().subscribe(location => {
      this.centerLocation(location);
    });
  }
   getCurrentLocation(){

    let loading = this.loadingCtrl.create({
      content: 'Locating...'
    });

    loading.present();

    let options = {timeout: 10000, enableHighAccuracy: true};
    
    let locationObs = Observable.create(observable => {

      this.geolocation.getCurrentPosition(options)
        .then(resp => {
          let lat = resp.coords.latitude;
          let lng = resp.coords.longitude;

          let location = new google.maps.LatLng(lat, lng);

          // next location
          observable.next(location);

          loading.dismiss();
        },
        (err) => {
          console.log('Geolocation err: ' + err);
          loading.dismiss();
        })
    })
    
   return locationObs;  // Return observable
  }

  createMap(location = new google.maps.LatLng(1.2760,103.8455)){

    let mapOptions = {
      center: location,
      zoom: 18,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      disableDefaultUI:true
    }
    let mapEl = document.getElementById("map");
    let map = new google.maps.Map(mapEl,mapOptions);

    return map;
  }

  centerLocation(location){

    if(location) {
      this.map.panTo(location);
    }
    else{
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.panTo(currentLocation);

      });
    }
    
  }

}
