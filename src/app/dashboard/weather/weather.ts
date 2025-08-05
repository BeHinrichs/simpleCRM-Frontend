import { Component } from '@angular/core';
import { WeatherHead } from "./weather-head/weather-head";
import { WeatherContent } from "./weather-content/weather-content";

@Component({
  selector: 'app-weather',
  imports: [WeatherHead, WeatherContent],
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class Weather {

}
