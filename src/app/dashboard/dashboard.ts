import { Component, inject } from '@angular/core';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { Navigation } from "./navigation/navigation";

@Component({
  selector: 'app-dashboard',
  imports: [Navigation, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  router = inject(Router)
}
