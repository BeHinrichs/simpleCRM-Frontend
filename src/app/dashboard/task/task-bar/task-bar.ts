import { Component, inject, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { RouterLink } from '@angular/router';
import { TaskService } from '../services/task-service';


@Component({
  selector: 'app-task-bar',
  standalone: true, 
  imports: [RouterLink],
  templateUrl: './task-bar.html',
  styleUrl: './task-bar.css'
})
export class TaskBar {
  private taskService = inject(TaskService);
  private allTasks = toSignal(this.taskService.getAllTasks(), { initialValue: [] });

  
  tasks = computed(() =>
    this.allTasks().filter(
      task => task.name === "Ben" && task.status === "incomplete" 
    )
  );
  getTaskCount(): number {
    return this.tasks().length;
  }
}