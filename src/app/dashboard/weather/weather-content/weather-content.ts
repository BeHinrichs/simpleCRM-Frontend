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
Math: any;

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
  focusIndex = 0; // Startet bei der ersten Karte

  // Optional: Buttons zum Testen
  prevHour() {
    if (this.focusIndex > 0) this.focusIndex--;
  }
  nextHour(weather: any[]) {
    if (this.focusIndex < weather.length - 1) this.focusIndex++;
  }
  isBgCard(i: number): boolean {
    return Math.abs(i - this.focusIndex) > 1;
  }
  onCarouselScroll(wrapper: HTMLElement) {
    const track = wrapper.querySelector('.weather-forecast-hourly-carousel-track');
    const cards = track ? track.querySelectorAll('.weather-forecast-hourly-carousel-card') : [];
    const wrapperRect = wrapper.getBoundingClientRect();

    let closestIndex = 0;
    let minDistance = Number.MAX_VALUE;

    cards.forEach((card: any, i: number) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.top + cardRect.height / 2; // <--- VERTIKAL!
      const wrapperCenter = wrapperRect.top + wrapperRect.height / 2;
      const distance = Math.abs(cardCenter - wrapperCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });

    this.focusIndex = closestIndex;
  }
}