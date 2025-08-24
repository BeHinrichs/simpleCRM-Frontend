import { Component, inject } from '@angular/core';
import { TaskService } from '../service/task-service';


@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {

  taskService = inject(TaskService)
  tasksRessource = this.taskService.filteredTasks
  

  toggleStatus(id:string):any {
    const currentTask = this.tasksRessource()?.find(task => task.id === id)
    if (currentTask) {
      /* console.log('Gefundener Task:', currentTask.checked); */
      if(currentTask.checked === true) {
        currentTask.status = 'incomplete'
        currentTask.checked = false
        
      } else if(currentTask.checked === false) {
        currentTask.status = 'complete'
        currentTask.checked = true
        
      }
      /* console.log('Der fertige Update', currentTask) */
      this.taskService.updateTask(id, currentTask).subscribe({
        next: () => this.tasksRessource(),
        error: () => console.warn('Error 103.4')
      })
      
    }
  }

}