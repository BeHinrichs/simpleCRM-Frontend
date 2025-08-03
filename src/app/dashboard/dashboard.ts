import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navigation } from "./navigation/navigation";
import { WeatherBar } from "./weather/weather-bar/weather-bar";
import { Shedule } from "./shedule/shedule";
import { TaskBar } from './task/task-bar/task-bar';

@Component({
  selector: 'app-dashboard',
  imports: [Navigation, RouterOutlet, WeatherBar, Shedule, TaskBar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  router = inject(Router)
}
