import { Component, inject, signal } from '@angular/core';
import { TaskService } from './service/task-service';
import { TaskList } from "./task-list/task-list";

export type FilterValue = 'own' | 'all' | 'done';


@Component({
  selector: 'app-task',
  imports: [TaskList],
  templateUrl: './task.html',
  styleUrl: './task.css'
})


export class Task {
  taskService = inject(TaskService)

  filter = [
    {label: 'Eigene', value: 'own'},
    {label: 'Alle', value: 'all'},
    {label: 'Erledigt', value: 'done'},
    {label: 'Neu', value: 'new'}
  ];
  selectedFilter = signal(this.filter[0].value)

  setFilter(filterValue: string): void {
    if (filterValue === 'new') {
      // Deine Logik für einen neuen Task
      return;
    }
    this.selectedFilter.set(filterValue)
    this.taskService.setFilter(filterValue as FilterValue);
  }

}
