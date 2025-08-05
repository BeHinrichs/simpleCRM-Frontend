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
    }
  });

  // Getter, um die formatierte Sonnenaufgangszeit direkt in der Vorlage zu verwenden.
  // Gibt eine leere Zeichenkette zurück, falls die Daten noch nicht geladen sind.
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
}

