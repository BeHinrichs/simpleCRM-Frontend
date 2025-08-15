// src/app/task-filter/task-filter.ts

import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'; // AsyncPipe importieren!
import { NewTask } from '../new-task/new-task';
import { TaskService } from '../services/task-service';
import { Observable, of } from 'rxjs'; // 'of' importieren für den Initialwert
import { TaskInterface } from '../../models/task-interface';

@Component({
  selector: 'app-task-filter',
  standalone: true, // standalone hinzufügen
  imports: [NgForOf, NgIf, NewTask, AsyncPipe], // AsyncPipe hier hinzufügen
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css'
})
export class TaskFilter implements OnInit {
  // KORREKTUR 1: 'inject' muss direkt bei der Deklaration der Eigenschaft stehen.
  taskService = inject(TaskService);
  
  filters = [
    { label: 'Eigene', value: 'own' },
    { label: 'Alle', value: 'all' },
    { label: 'Erledigt', value: 'done' },
    { label: 'Neu', value: 'new' }
  ];
  selectedFilter = this.filters[0];
  showNewTaskInput = false;

  // Diese Eigenschaft wird das Observable mit den gefilterten Tasks halten.
  // Wir initialisieren es mit einem leeren Array, um Fehler zu vermeiden.
  tasks$!: Observable<TaskInterface[]>;

  ngOnInit(): void {
    // Ruft beim Start den Standardfilter auf.
    this.setFilter(this.selectedFilter);
  }

  setFilter(filter: any) {
    this.selectedFilter = filter;

    switch (filter.value) {
      case 'own':
        this.tasks$ = this.taskService.getOwnTasks();
        break;
      case 'all':
        this.tasks$ = this.taskService.getAllTasks();
        break;
      case 'done':
        this.tasks$ = this.taskService.getCompletedTasks();
        break;
      case 'new':
        this.showNewTaskInput = true;
        return; // Wichtig, um nicht wieder auf false zu setzen
      default:
        this.tasks$ = this.taskService.getOwnTasks();
    }
    this.showNewTaskInput = false;
  }
  
  onTaskAdded(taskText: string) {
    console.log('Neuer Task:', taskText);
    this.showNewTaskInput = false;
    this.setFilter(this.filters[0]); // Filter zurücksetzen
  }
}