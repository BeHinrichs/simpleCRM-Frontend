import { Component, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { NewTask } from '../new-task/new-task';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [NgForOf, NgIf, NewTask],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css'
})
export class TaskFilter {
  taskService = inject(TaskService);
  
  filters = [
    { label: 'Eigene', value: 'own' },
    { label: 'Alle', value: 'all' },
    { label: 'Erledigt', value: 'done' },
    { label: 'Neu', value: 'new' }
  ];
  selectedFilter = this.filters[0];
  showNewTaskInput = false;

  ngOnInit(): void {
    // Setze den initialen Filter im Service
    this.taskService.setFilter('own');
  }

  setFilter(filter: any) {
    this.selectedFilter = filter;

    if (filter.value === 'new') {
      this.showNewTaskInput = true;
      return;
    }
    
    // EINZIGE AUFGABE: Den Service über die Filteränderung informieren.
    this.taskService.setFilter(filter.value);
    this.showNewTaskInput = false;
  }
  
  onTaskAdded() {
    console.log('Ein neuer Task wurde hinzugefügt, schließe das Eingabefeld.');
    this.showNewTaskInput = false;
    // Setze den Filter zurück, damit der neue Task sichtbar wird (falls nötig).
    this.setFilter(this.filters[0]);
  }
}