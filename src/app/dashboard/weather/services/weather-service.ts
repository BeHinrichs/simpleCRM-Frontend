import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit {
   /* ######  GeoLocation - Weather-component */
  latitude?: number;
  longitude?: number;

  ngOnInit() {
    this.getUserLocation();
  }

  getUserLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          // → Hier kannst du direkt die Wetter-API mit den Koordinaten abfragen!
          console.log(position)
        },
        (error) => {
          console.error('Geolocation-Fehler:', error);
          let latitude = '50.32943';
          let longitude = '10.20861';

        }
      );
    } else {
      console.log('Geolocation wird nicht unterstützt!');
      // Optional: Standardwerte setzen
    }
  }
}
