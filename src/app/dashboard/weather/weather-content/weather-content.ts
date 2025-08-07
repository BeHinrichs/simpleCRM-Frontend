import { Component, inject, effect, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, viewChildren } from '@angular/core';
import { WeatherService } from '../services/weather-service';
import { CommonModule, DatePipe } from '@angular/common'; // DatePipe importieren

@Component({
  selector: 'app-weather-content',
  standalone: true,
  imports: [CommonModule, DatePipe], 
  templateUrl: './weather-content.html',
  styleUrls: ['./weather-content.css']
})
export class WeatherContent {
  weatherService = inject(WeatherService);
  /* currentWeather: any = null;
  hourlyWeather: any = null; // Korrekter Name der Eigenschaft */
  today: Date = new Date();

  _ = effect(() => {
    // leer
  });

  /**
   * Getter, der das 'currentWeather'-Objekt als JSON-String mit 4 Leerzeichen Einrückung zurückgibt.
   */
  get formattedCurrentWeather(): string {
    const data = this.weatherService.currentWeather();
    if (data) {
      return JSON.stringify(data, null, 4);
    }
    return('Wetterdaten werden geladen....')
  }

  /**
   * Getter, der das 'hourlyWeather'-Objekt als JSON-String mit 4 Leerzeichen Einrückung zurückgibt.
   */
  get formattedHourlyWeather(): string {
    const data = this.weatherService.hourlyWeather();
    if (data) {
      return JSON.stringify(data, null, 4);
    }
    return 'Stündliche Wetterdaten werden geladen oder sind nicht verfügbar...';
  }

  /**
   * Gibt den Namen der primären Wetterstation aus den stündlichen Daten zurück.
   */
  get stationName(): string {
    const data = this.weatherService.hourlyWeather();

    if (data?.sources && data.sources.length > 0) { // Korrektur: Verwende 'this.hourlyWeather'
      return data.sources[0].station_name || 'Unbekannte Station';
    }
    return 'Wird geladen...';
  }

  
  
}