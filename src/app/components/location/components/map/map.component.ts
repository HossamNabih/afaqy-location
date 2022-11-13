import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapService} from '../../services/map.service'
// import * as L from 'leaflet';
import { concat, of, Subject, timer   } from 'rxjs';
import { concatMap , ignoreElements } from 'rxjs/operators';
import L from "leaflet";
import { LoginService } from '../../../account/services/login.service';
import { Router } from '@angular/router';
// import 'leaflet-svg-shape-markers'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit , AfterViewInit {
  
  counter = 1;
  displayedValue = 1;

  valueEmitter = new Subject<any>();
  valueEmitted$ = this.valueEmitter.asObservable();
  markerGroup;

  isLogedin:boolean = this.loginService.isLoggedIn();
  private map;
  private item :any;
  private icon ;

  private initMap(points): void {
    if(points?.length == 0 ){
      return;
    }
    this.icon = L.icon({
      iconUrl: 'assets/imgs/car.png',
      // shadowUrl: 'assets/imgs/car.png',
  
      iconSize:     [38, 95], // size of the icon
      shadowSize:   [25, 32], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });


    this.map = L.map('map', {
      center: points[0],
      zoom: 10
    });
   
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: ''
    });

    tiles.addTo(this.map);
 
    this.markerGroup = L.layerGroup().addTo(this.map);

    points.forEach((element , i) => {
      // console.log(element)
      let point = new L.LatLng(element.lat,element.lng);
      this.valueEmitter.next({point : point , L:this.item , index :i} );
     
  

      
    });

    


  }
  onLocationFound(e) {

    var marker = L.marker([e.lat,e.lng]).update(marker);
    // alert ('New latitude is ' + e.latlng.lat)
}
  constructor(private mapService : MapService, private loginService : LoginService , 		private router: Router) { }

  ngOnInit(): void {
    this.valueEmitted$
    .pipe(concatMap((v) => concat(of(v), timer(2000).pipe(ignoreElements()))))
    .subscribe((data) => {
     // this.displayedValue = value;

    // this.map.setView(point, 18, { animation: true });    
//     this.map.panTo(point);
// this.map.setZoom(18);    


var newLatLng = new L.LatLng(data.point.lat, data.point.lng);
this.map.setView(newLatLng, 18, { animation: true },
  
  
  // this.item.setLatLng(newLatLng)
  );  


// if(data.index){
//   this.markerGroup.removeLayer(data.index)
// }


  var  marker = new L.marker(data.point, {
    draggable: false
  }).addTo(this.markerGroup)
  if(this.markerGroup.length > 2 ){
    this.markerGroup.removeLayer(this.markerGroup[data.index])
  }
      console.log(this.markerGroup)   

      
      // let pointa = new L.LatLng(element.lat,element.lng);
   
    //  data.L.marker.LatLng(L.marker(new L.LatLng(data.point.lat,data.point.lng)));
   // var newLatLng = new L.LatLng(data.point.lat, data.point.lng);
 
   // data.L(newLatLng, {icon: this.icon}).addTo(this.map);
      // this.item.marker.setLatLng(L.marker(new L.LatLng(point.lat,point.lng), {icon: this.icon}).addTo(this.map));  

    });
  }
  ngAfterViewInit(): void {

    // console.log( this.mapService.getUserLocations)
    this.initMap(  this.mapService.getUserLocations)

   }

   signOut(){
    this.loginService.logOut();
    this.isLogedin = this.loginService.isLoggedIn();

   }
   signIn(){
    this.router.navigate(['Login'])

   }

}
