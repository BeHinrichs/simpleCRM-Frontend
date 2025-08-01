import { Component, inject } from '@angular/core';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { Navigation } from "./navigation/navigation";
import { Weather } from "./weather/weather";
import { Task } from "./task/task";
import { Shedule } from "./shedule/shedule";

@Component({
  selector: 'app-dashboard',
  imports: [Navigation, RouterOutlet, Weather, Task, Shedule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  router = inject(Router)
}
