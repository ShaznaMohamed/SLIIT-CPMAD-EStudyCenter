import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
 
declare var google : any;
 
@Component({
  selector: 'map-location',
  templateUrl: 'map-location.html'
})
export class MapLocationPage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start: any;
  end: any;
  marker: any;

  constructor(public navCtrl: NavController,  public geolocation: Geolocation) {
 
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //let latLng = new google.maps.LatLng(6.914682, 79.973329);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      //this.addMarker();
 
    }, (err) => {
      console.log(err);
    });
 
  }

  addMarker(){
 
  this.marker = new google.maps.Marker({
    map: this.map,
    zoom: 7,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    //position: {lat: 6.914682, lng: 79.973329}
  });
 
  let content = "<h4>Information!</h4>";          
 
  this.addInfoWindow(this.marker, content);
 
}

addInfoWindow(marker:any, content: any){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}


    calculateAndDisplayRoute() {

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);


        directionsService.route({
          //origin: this.marker.position,
          origin: this.start,
          destination: this.end,
          travelMode: 'DRIVING'
        }, function(response: any, status: any) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to Wrong input. Please try again');
          }
        });
      }



    DistanceMap() {
        var bounds = new google.maps.LatLngBounds;
        var markersArray: any [];

        var origin1 = this.start;
        var origin2 = this.start;
        var destinationA = this.end;
        var destinationB = this.end;

        var destinationIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=D|FF0000|000000';
        var originIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=O|FFFF00|000000';
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 55.53, lng: 9.4},
          zoom: 10
        });
        var geocoder = new google.maps.Geocoder;

        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [origin1, origin2],
          destinations: [destinationA, destinationB],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response: any, status: any) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';
            //this.deleteMarkers(markersArray);

            var showGeocodedAddressOnMap = function(asDestination: any) {
              var icon = asDestination ? destinationIcon : originIcon;
              return function(results: any, status: any) {
                if (status === 'OK') {
                  map.fitBounds(bounds.extend(results[0].geometry.location));
                  // markersArray.push(new google.maps.Marker({
                  //   map: map,
                  //   position: results[0].geometry.location,
                  //   icon: icon
                  // }));
                } else {
                  alert('Geocode was not successful due to: ' + status);
                }
              };
            };

            for (var i = 0; i < originList.length-1; i++) {

              var results = response.rows[i].elements;
              geocoder.geocode({'address': originList[i]},
                  showGeocodedAddressOnMap(false));

              for (var j = 0; j < results.length-1; j++) {

                geocoder.geocode({'address': destinationList[j]},
                    showGeocodedAddressOnMap(true));
                outputDiv.innerHTML += '<H4>'+originList[i] +'  to  '+ destinationList[j] +
                    '    :-        ' +'<h5>'+ results[j].distance.text + '  IN  ' +
                    results[j].duration.text + '</H5>';

              }
            }
          }
        });
      }

      deleteMarkers(markersArray: any) {
        for (var i = 0; i < markersArray.length; i++) {
          markersArray[i].setMap(null);
        }
        markersArray = [];
      }

}