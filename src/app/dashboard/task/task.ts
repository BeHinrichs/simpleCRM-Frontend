import { Component, inject, signal } from '@angular/core';
import { TaskService } from './service/task-service';
import { TaskList } from "./task-list/task-list";




@Component({
  selector: 'app-task',
  imports: [TaskList],
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
  selectedFilter = signal(this.filter[0].value)

  setFilter(filterValue: string): void {
    if(filterValue === 'new') {
      // toggle new Task
    } else {
      
      this.selectedFilter.set(filterValue);
      console.log('Task Setter sagt Filter: ', this.selectedFilter())
    }
    
  }



}
