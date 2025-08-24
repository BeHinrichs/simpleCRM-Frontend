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
  tasks = this.taskService.filteredTasks;

  /* toggleStatus(id:string):any {
    const currentTask = this.tasksRessource.value()?.find(task => task.id === id)
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
        next: () => this.tasksRessource.reload(),
        error: () => console.warn('Error 103.4')
      })
      
    }
  } */
 toggleStatus(id: string): void {
    // Finde den Task im aktuell angezeigten, gefilterten Array.
    const taskToUpdate = this.tasks().find(task => task.id === id);

    if (taskToUpdate) {
      // Erstelle eine Kopie des Objekts für das Update.
      const updatedTask = { ...taskToUpdate };
      updatedTask.checked = !updatedTask.checked;
      updatedTask.status = updatedTask.checked ? 'complete' : 'incomplete';
      
      this.taskService.updateTask(id, updatedTask).subscribe({
        next: () => {
          console.log('Update im Backend erfolgreich!');
          // Rufe die neue reload-Methode im Service auf.
          
        },
        error: (err) => console.error('Fehler beim Update:', err)
      });
    }
  }
}