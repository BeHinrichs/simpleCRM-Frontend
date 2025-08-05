import { Component, inject, effect, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather-service';
import { CommonModule, DatePipe } from '@angular/common'; // DatePipe importieren

@Component({
  selector: 'app-weather-content',
  standalone: true,
  imports: [CommonModule, DatePipe], // DatePipe zu den Imports hinzufügen
  templateUrl: './weather-content.html',
  styleUrls: ['./weather-content.css']
})
export class WeatherContent implements OnInit {
  weatherService = inject(WeatherService);
  currentWeather: any = null;
  hourlyWeather: any = null; // Korrekter Name der Eigenschaft
  today: Date = new Date();

  ngOnInit() {
    this.weatherService.getUserLocation();
  }

  _ = effect(() => {
    if (this.weatherService.locationLoaded()) {
      const coords = this.weatherService.coords();
      if (coords.latitude !== null && coords.longitude !== null) {
        // Rufe die aktuelle Wetterdaten ab
        this.weatherService.getWeather().subscribe({
          next: (data) => {
            this.currentWeather = data.weather;
            console.log('Brightsky Current Weather JSON:', data);
          },
          error: (err) => {
            this.currentWeather = null;
            console.error('Keine aktuellen Wetterdaten:', err);
          }
        });

        // Rufe die stündlichen Wetterdaten für 24 Stunden ab

        this.weatherService.getHourlyWeather().subscribe({
          next: (data) => {
            this.hourlyWeather = data; // Korrekter Name der Eigenschaft
            console.log('Brightsky Hourly Weather JSON (24h):', data);
          },
          error: (err) => {
            this.hourlyWeather = null;
            console.error('Keine stündlichen Wetterdaten:', err);
          }
        });

      } else {
        console.warn('Geolocation wurde geladen, aber keine gültigen Koordinaten gefunden. Verwende Standardwerte.');
      }
    }
  });

  /**
   * Getter, der das 'currentWeather'-Objekt als JSON-String mit 4 Leerzeichen Einrückung zurückgibt.
   */
  get formattedCurrentWeather(): string {
    if (this.currentWeather) {
      return JSON.stringify(this.currentWeather, null, 4);
    }
    return 'Wetterdaten werden geladen oder sind nicht verfügbar...';
  }

  /**
   * Getter, der das 'hourlyWeather'-Objekt als JSON-String mit 4 Leerzeichen Einrückung zurückgibt.
   */
  get formattedHourlyWeather(): string {
    if (this.hourlyWeather) { // Korrektur: Verwende 'this.hourlyWeather'
      return JSON.stringify(this.hourlyWeather, null, 4);
    }
    return 'Stündliche Wetterdaten werden geladen oder sind nicht verfügbar...';
  }

  /**
   * Gibt den Namen der primären Wetterstation aus den stündlichen Daten zurück.
   */
  get stationName(): string {
    if (this.hourlyWeather?.sources && this.hourlyWeather.sources.length > 0) { // Korrektur: Verwende 'this.hourlyWeather'
      return this.hourlyWeather.sources[0].station_name || 'Unbekannte Station';
    }
    return 'Wird geladen...';
  }

  /**
   * Wandelt Windrichtung in Grad in eine Himmelsrichtung um.
   * @param degrees Windrichtung in Grad (0-360)
   * @returns Himmelsrichtung (z.B. 'N', 'SW') oder 'N/A'
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