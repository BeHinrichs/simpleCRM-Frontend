import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-bar',
  imports: [],
  templateUrl: './weather-bar.html',
  styleUrl: './weather-bar.css'
})
export class WeatherBar implements OnInit {
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
/* ############ Current Time ################# */
function updateTime(): void {
  /* console.log(Date()); */
  const now: Date = new Date();
  const timeString: string = now.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const timeElement: HTMLElement | null = document.getElementById('current-time');
  if (timeElement) {
    timeElement.textContent = timeString;
  }
}

updateTime();
setInterval(updateTime, 1000);