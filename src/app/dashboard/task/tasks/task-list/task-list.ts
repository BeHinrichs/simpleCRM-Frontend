import { Component, input, output, inject, signal } from '@angular/core';
import { Task } from '../../../models/task.models';
import { NgClass } from '@angular/common';
import { TaskService } from '../../services/task-service';
import { TaskInterface } from '../../../models/task-interface';



@Component({
  selector: '[app-task-list]',
  imports: [NgClass],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})


export class TaskList {
  TaskService = inject(TaskService)
  taskList = signal<TaskInterface[]>([]);
  data = input.required<Task>();
  updateTaskEvent = output()

  constructor() {
    this.TaskService.getAllTasks().subscribe({
      next: (data) => this.taskList.set(data),
      error: (err) => console.warn('Fehler aus der Task-list: ', err)
    })
  }
 
   toggleStatus(){
    this.data().checked = !this.data().checked
    this.data().checked ? this.data().status = "complete" : this.data().status ="incomplete"
    this.updateStatus()
  }
 

  updateStatus(){
    this.updateTaskEvent.emit()
  }

}