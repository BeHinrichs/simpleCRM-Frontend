import { Component, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { NewTask } from '../new-task/new-task';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-task-filter',
  imports: [NgForOf, NgIf, NewTask, TaskService],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css'
})
export class TaskFilter {
  filters = [
    { label: 'Eigene', value: 'own' },
    { label: 'Alle', value: 'all' },
    { label: 'Erledigt', value: 'done' },
    { label: 'Neu', value: 'new' }
  ];
  selectedFilter = this.filters[0];
  showNewTaskInput = false;
  setFilter(filter: any) {
    this.selectedFilter = filter;
    if (filter.value === 'new') {
      this.showNewTaskInput = true;
    } else {
      this.showNewTaskInput = false;
    }
  }
  taskService = inject(TaskService)


  constructor(){}


  getAllTasks(){
    this.taskService.getAllTasks()
  }

  filterCompletedTasks(){
    this.taskService.filterCompleted()
  }

  filterIncompletedTasks(){
    this.taskService.filterIncomplete()
  }
  onTaskAdded(taskText: string) {
    // Hier kannst du das neue Task-Objekt erzeugen oder an die Parent-Komponente senden
    console.log('Neuer Task:', taskText);
    // Nach dem Hinzufügen ggf. wieder auf Filter zurückspringen:
    this.showNewTaskInput = false;
    this.selectedFilter = this.filters[0]; // z. B. wieder auf „Eigene“
  }
  
}


