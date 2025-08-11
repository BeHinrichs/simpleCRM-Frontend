import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs'; 
import { map } from 'rxjs/operators'; 

interface SunriseSunsetData {
  sunrise: string;
  sunset: string;
}

@Injectable({
  providedIn: 'root'
})


export class WeatherService {
 
  private BRIGHTSKY_API_BASE_URL = 'https://api.brightsky.dev';


  /* ##### Location ###### */
  coords = signal<{ latitude: number | null, longitude: number | null }>({ latitude: null, longitude: null });
  locationLoaded = signal<boolean>(false);
  currentWeather = signal<any>(null);
  hourlyWeather = signal<any>(null);
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
  fetchCurrentWeather(): void {                                                                                 // Rückgabetyp ist void, also kein Rückgabewert
    const { latitude, longitude } = this.coords();

    if (latitude === null || longitude === null) {
      console.error("Koordinaten sind noch nicht gesetzt.");
      this.currentWeather.set(null);                                                                            // Wenn Koordinaten noch nicht geladen wird das signal auf null gesetzt
      return;
    }

    const url = `${this.BRIGHTSKY_API_BASE_URL}/current_weather?lat=53.2326&lon=10.4106`;                       // Manuell auf Lüneburg gesetzt -> Es fehlt eine Routine die prüft ob Wetterdaten da sind
                                                                                                                /* const url = `https://api.brightsky.dev/current_weather?lat=53.2326553647406&lon=10.41062046908784`; */
                                                                                                                /* 52.383409914163416, 9.728510090033799  Hannover*/
                                                                                                                /* 53.2326553647406, 10.41062046908784 Lüneburg */
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.currentWeather.set(data.weather);                                                                   // Daten im signal speichern
        console.log('Current Weather: ', data.weather);
      },
      error: (err) => {
        this.currentWeather.set(null);
        console.error('Wetterdaten konnte nicht geladen werden: ', err);
      }
    });
  }

  fetchHourlyWeather(): void {
    const { latitude, longitude } = this.coords();
    if (latitude === null || longitude === null) {
      console.error("Koordinaten sind noch nicht gesetzt.");
      this.hourlyWeather.set(null);                                                                            // Wenn Koordinaten noch nicht geladen wird das signal auf null gesetzt
      return;
    }

    const now = new Date();
    const endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);                                              // Enddatum = Datum + 24 Stunden
    const startDateISO = now.toISOString().slice(0, 19);                                                        // Daten im ISO 8601 Format für die URL aufbereiten (YYYY-MM-DDTHH:MM:SS)
    const endDateISO = endDate.toISOString().slice(0, 19);                                                      // .slice(0, 19) schneidet die Millisekunden ab
                                                                                                                /* const url = `${this.BRIGHTSKY_API_BASE_URL}/weather?lat${this.coordsShort().lat}&lon${this.coordsShort().lon}&&date=${startDateISO}&last_date=${endDateISO}`; */
    const url = `${this.BRIGHTSKY_API_BASE_URL}/weather?lat=53.2326&lon=10.4106&&date=${startDateISO}&last_date=${endDateISO}`;
    
    
    this.http.get<any>(url).subscribe ({
      next: (data) => {
        this.hourlyWeather.set(data);
        console.log('Stündliche Wetterdaten: ', data);
      },
      error: (err) => {
        this.hourlyWeather.set(null);
        console.error('ForecastWetter konnte nicht geladen werden', err)
      }
    });
  }

  /* Sonnenauf- und Sonnenuntergangsdaten */
  getSunriseSunset(): Observable<SunriseSunsetData> {
    const { latitude, longitude } = this.coords();
    if (latitude === null || longitude === null) {
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