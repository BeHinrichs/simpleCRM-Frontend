// src/app/new-task/new-task.ts

import { Component, ElementRef, viewChild, inject, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-new-task',
  standalone: true, // standalone hinzufügen
  imports: [],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css'
})
export class NewTask {
  taskService = inject(TaskService);
  taskInputReference = viewChild.required<ElementRef<HTMLInputElement>>("newTaskInput");
  @Output() taskAdded = new EventEmitter<void>();

  addNewTask() {
    const newTaskValue = this.taskInputReference().nativeElement.value;
    if (!newTaskValue.trim()) {
      return;
    }
    this.taskService.addNewTask(newTaskValue).subscribe({
      next: () => {
        console.log('Task erfolgreich an Backend gesendet!');
        
        this.taskAdded.emit();
        
        this.taskInputReference().nativeElement.value = '';
      },
      error: (err) => console.error('Fehler beim Hinzufügen des Tasks:', err)
    });
  }
}