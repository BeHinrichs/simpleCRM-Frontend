import { Component, inject } from '@angular/core';
import { TaskService } from './task-service';




@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css'
})


export class Task {
  sendfilter = inject(TaskService)
  taskService = inject(TaskService)

  filter = [
    {label: 'Eigene', value: 'own'},
    {label: 'Alle', value: 'all'},
    {label: 'Erledigt', value: 'done'},
    {label: 'Neu', value: 'new'}
  ];
  private selectedFilter = this.filter[0]

  


  setFilter(filter: string) {
    if(filter === 'new') {
      // toggle new Task
    } else {
      this.taskService.setFilter(filter)
    }
    
  }


}
