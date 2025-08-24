import { Component, inject, input, computed } from '@angular/core';
import { TaskService } from '../service/task-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  httpClient = inject(HttpClient)
  taskService = inject(TaskService)
  tasksResource = this.taskService.getAllTasks()
  route = inject(ActivatedRoute)
  router = inject(Router)
  taskReload = this.taskService.getAllTasks()
  currentFilter = input.required<string>()
  currentUser='Ben'

  getCurrentFilter() {
    return this.currentFilter();
  }

  toggleStatus(id:string):any {
    const currentTask = this.tasksResource.value()?.find(task => task.id === id)
    if (currentTask) {
      console.log('Gefundener Task:', currentTask.checked);
      if(currentTask.checked === true) {
        currentTask.status = 'incomplete'
        currentTask.checked = false
        
      } else if(currentTask.checked === false) {
        currentTask.status = 'complete'
        currentTask.checked = true
        
      }
      console.log('Der fertige Update', currentTask)
      this.taskService.updateTask(id, currentTask).subscribe({
        next: () => this.taskReload.reload(),
        error: () => console.warn('Error 103.4')
      })
      
    }
  }
}