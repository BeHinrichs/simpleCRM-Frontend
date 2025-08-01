import { Component, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { NewTask } from '../new-task/new-task';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-task-filter',
  imports: [NgForOf, NgIf, NewTask],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css'
})
export class TaskFilter {
  filters = [
    { label: 'Eigene', value: 'own' },          // Eigene incomplete 
    { label: 'Alle', value: 'all' },            // Alle incomplete
    { label: 'Erledigt', value: 'done' },       // Completed own
    { label: 'Neu', value: 'new' }              // 
  ];
  selectedFilter = this.filters[0];
  showNewTaskInput = false;
  setFilter(filter: any) {
  this.selectedFilter = filter;

  switch (filter.value) {
    case 'own':
      this.taskService.getOwnTasks();
      break;
      break;
    case 'all':
      this.taskService.getAllTasks();
      break;
    case 'done':
      this.taskService.filterCompleted();
      break;
    case 'new':
      this.showNewTaskInput = true;
      return;
    default:
      this.taskService.getAllTasks();
  }

  this.showNewTaskInput = false;
}
  taskService = inject(TaskService)


/*   constructor(){} */



  onTaskAdded(taskText: string) {
   
    console.log('Neuer Task:', taskText);
    
    this.showNewTaskInput = false;
    this.selectedFilter = this.filters[0];
  }
  
}


