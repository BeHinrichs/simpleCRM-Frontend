import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navigation } from "./navigation/navigation";

@Component({
  selector: 'app-dashboard',
  imports: [Navigation],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
