import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navigation } from "./navigation/navigation";
import { WeatherBar } from "./weather/weather-bar/weather-bar";

@Component({
  selector: 'app-dashboard',
  imports: [Navigation, RouterOutlet, WeatherBar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  router = inject(Router)
}
