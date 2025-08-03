import { Component, inject } from '@angular/core';
import { TaskService } from '../../task/services/task-service';

@Component({
  selector: 'app-weather-bar',
  imports: [],
  templateUrl: './weather-bar.html',
  styleUrl: './weather-bar.css'
})
export class WeatherBar {
  taskService = inject(TaskService)

  

}



/* ############ Current Time ################# */
function updateTime(): void {
  /* console.log(Date()); */
  const now: Date = new Date();
  const timeString: string = now.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const timeElement: HTMLElement | null = document.getElementById('current-time');
  if (timeElement) {
    timeElement.textContent = timeString;
  }
}

updateTime();
setInterval(updateTime, 1000);