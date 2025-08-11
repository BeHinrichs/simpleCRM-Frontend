import { Component, inject, OnInit, effect } from '@angular/core';
import { WeatherService } from '../services/weather-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-weather-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './weather-bar.html',
  styleUrl: './weather-bar.css'
})
export class WeatherBar implements OnInit {
  weatherService = inject(WeatherService);
  sunriseSunset: any = null;
  today: Date = new Date();

  ngOnInit(): void {
    // Ruft die Benutzerposition beim Start der Komponente ab.
    // Der "effect" unten wird ausgelöst, sobald die Position geladen wurde.
    this.weatherService.getUserLocation();
  }

  // Dieser Effect wird ausgelöst, sobald sich der Zustand locationLoaded ändert.
  // Dadurch wird der API-Aufruf erst gestartet, wenn die Daten verfügbar sind.
  _ = effect(() => {
    if (this.weatherService.locationLoaded()) {
      const coords = this.weatherService.coords();
      if (coords.latitude !== null && coords.longitude !== null) {
          this.weatherService.getSunriseSunset().subscribe({
          next: (data) => {
            this.sunriseSunset = data;
            console.log('Sunrise Sunset JSON:', data);
          },
          error: (err) => {
            this.sunriseSunset = null;
            console.error('Keine Sonnenzeiten:', err);
          }
        });

        this.weatherService.fetchCurrentWeather();
        this.weatherService.fetchHourlyWeather();
      } else {
        console.warn('GeoLocation geladen, keine gültigen Koordinaten.')
      }
      
    }
  });


  get localSunriseTime(): string {
    if (this.sunriseSunset?.sunrise) {
      const sunriseUtc = new Date(this.sunriseSunset.sunrise);
      return sunriseUtc.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    }
    return '';
  }

  // Getter für die formatierte Sonnenuntergangszeit
  get localSunsetTime(): string {
    if (this.sunriseSunset?.sunset) {
      const sunsetUtc = new Date(this.sunriseSunset.sunset);
      return sunsetUtc.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    }
    return '';
  }
  getDayTime(): string {
    if(this.sunriseSunset?.sunrise && this.sunriseSunset?.sunset) {
      const sunriseTime = new Date(this.sunriseSunset.sunrise);
      const sunsetTime = new Date(this.sunriseSunset.sunset);

      // Berechne die Differenz in Millisekunden
      const differenceMs = sunsetTime.getTime() - sunriseTime.getTime();

      // Wandle Millisekunden in Stunden um (1000 ms/s * 60 s/min * 60 min/h)
      const hours = differenceMs / (1000 * 60 * 60);

      // Runde auf zwei Dezimalstellen und gib als String zurück
      return hours.toFixed(2);
    }
    return '';
  }
  getSolarAverage(): string {
    const hourlyData = this.weatherService.hourlyWeather()?.weather;
    const sunrise = new Date(this.sunriseSunset?.sunrise);
    const sunset = new Date(this.sunriseSunset?.sunset);
    if (!hourlyData || hourlyData.length === 0 || !sunrise || !sunset) return 'N/A';

    const solarValues: number[] = [];
    for (let i = 0; i < hourlyData.length; i++) {
      const timestamp = new Date(hourlyData[i].timestamp);
      if (timestamp >= sunrise && timestamp <= sunset) {
        solarValues.push(hourlyData[i].solar ?? 0);
      }
    }

    if (solarValues.length === 0) return 'N/A';
    const avg = solarValues.reduce((a, b) => a + b, 0) / solarValues.length;
    return avg.toFixed(2);
  }

  /*
    Wandelt Windrichtung in Grad in eine Himmelsrichtung um.
    @param degrees Windrichtung in Grad (0-360)
    @returns Himmelsrichtung (z.B. 'N', 'SW') oder 'N/A'
   */
  getCardinalDirection(degrees: number | null): string {
    if (degrees === null || typeof degrees === 'undefined') {
      return 'N/A';
    }
    const directions = ['N', 'NNO', 'NO', 'ONO', 'O', 'OSO', 'SO', 'SSO', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    // Teilt 360 Grad durch die Anzahl der Richtungen, um den Winkel pro Richtung zu erhalten.
    // Rundet auf die nächste ganze Zahl und verwendet Modulo, um im Array-Index zu bleiben.
    const index = Math.round(degrees / (360 / directions.length));
    return directions[index % directions.length];
  }
}

