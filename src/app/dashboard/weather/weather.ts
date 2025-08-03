import { Component } from '@angular/core';
import { WeatherHead } from "./weather-head/weather-head";

@Component({
  selector: 'app-weather',
  imports: [WeatherHead],
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class Weather {

}
