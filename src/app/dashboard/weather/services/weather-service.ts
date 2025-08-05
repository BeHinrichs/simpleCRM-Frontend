import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs'; // Import BehaviorSubject and firstValueFrom
import { map } from 'rxjs/operators'; // Import map operator

interface SunriseSunsetData {
  sunrise: string;
  sunset: string;
  // Weitere Felder, falls benötigt
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
 /*  private http = inject(HttpClient); // HttpClient injizieren */
  private BRIGHTSKY_API_BASE_URL = 'https://api.brightsky.dev';
  /* ##### Location ###### */
  coords = signal<{ latitude: number | null, longitude: number | null }>({ latitude: null, longitude: null });
  locationLoaded = signal<boolean>(false);

  constructor(private http: HttpClient) {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  async getUserLocation(): Promise<void> {
    if ('geolocation' in navigator) {
      try {
        const position = await firstValueFrom(
          new Observable<GeolocationPosition>(observer => {
            navigator.geolocation.getCurrentPosition(
              (pos) => { observer.next(pos); observer.complete(); },
              (error) => { observer.error(error); }
            );
          })
        );
        this.coords.set({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      } catch (error) {
        console.error('Fehler beim Abrufen der Geolocation:', error);
        this.coords.set({ latitude: 52.520008, longitude: 13.404954 });
      } finally {
        this.locationLoaded.set(true);
      }
    } else {
      this.coords.set({ latitude: 52.520008, longitude: 13.404954 });
      this.locationLoaded.set(true);
    }
  }

  coordsShort = computed(() => ({
    lat: Number(this.coords().latitude?.toFixed(4)),
    lon: Number(this.coords().longitude?.toFixed(4)),
  }));

  /* #### Time ###### */
  timeString: string = '';

  updateTime() {
    const now = new Date();
    this.timeString = now.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  /* Wetterdaten Brightsky */
  getWeather() {
    const { latitude, longitude } = this.coords();
    if (latitude === null || longitude === null) {
      throw new Error("Koordinaten sind noch nicht gesetzt.");
    }
    const url = `${this.BRIGHTSKY_API_BASE_URL}/current_weather?lat=53.2326&lon=10.4106`;
    /* const url = `https://api.brightsky.dev/current_weather?lat=53.2326553647406&lon=10.41062046908784`; */
    /* 52.383409914163416, 9.728510090033799  Hannover*/
    /* 53.2326553647406, 10.41062046908784 Lüneburg */
    return this.http.get<any>(url);
  }

  getHourlyWeather() {
    const now = new Date();
    // Enddatum ist 24 Stunden nach dem Startdatum
    const endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Daten im ISO 8601 Format für die URL aufbereiten (YYYY-MM-DDTHH:MM:SS)
    // .slice(0, 19) schneidet die Millisekunden ab
    const startDateISO = now.toISOString().slice(0, 19);
    const endDateISO = endDate.toISOString().slice(0, 19);

    /* const url = `${this.BRIGHTSKY_API_BASE_URL}/weather?lat${this.coordsShort().lat}&lon${this.coordsShort().lon}&&date=${startDateISO}&last_date=${endDateISO}`; */
    const url = `${this.BRIGHTSKY_API_BASE_URL}/weather?lat=53.2326&lon=10.4106&&date=${startDateISO}&last_date=${endDateISO}`;

    console.log('Hourly Weather API URL:', url); // Zum Debuggen die erzeugte URL ausgeben
    return this.http.get(url);
  }

  /* Sonnenauf- und Sonnenuntergangsdaten */
  getSunriseSunset(): Observable<SunriseSunsetData> {
    const { latitude, longitude } = this.coords();
    if (latitude === null || longitude === null) {
      // Wenn die Koordinaten noch nicht geladen sind, könnten Sie hier einen leeren Observable zurückgeben
      // oder einen Fehler werfen, je nachdem, wie Sie das behandeln möchten.
      // Da der Effekt im Component auf 'locationLoaded' wartet, sollte dies hier weniger ein Problem sein.
      return new Observable(); // Oder throw new Error, etc.
    }

    // Für das aktuelle Datum
    const date = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${date}&formatted=0`;

    return this.http.get<{ results: SunriseSunsetData, status: string }>(url).pipe(
      map(response => response.results)
    );
  }
}