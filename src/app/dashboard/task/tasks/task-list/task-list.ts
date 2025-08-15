import { Component, input, output } from '@angular/core';
import { TaskInterface } from '../../../models/task-interface';
import { NgClass } from '@angular/common';

@Component({
  selector: '[app-task-list]',
  standalone: true, // standalone hinzufügen
  imports: [NgClass],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  data = input.required<TaskInterface>();
  updateTaskEvent = output<TaskInterface>();
  
  toggleStatus() {
    const currentTask = this.data();
    currentTask.checked = !currentTask.checked;
    currentTask.status = currentTask.checked ? "complete" : "incomplete";
    // Gib das geänderte Task-Objekt zurück
    this.updateTaskEvent.emit(currentTask);
  }
}