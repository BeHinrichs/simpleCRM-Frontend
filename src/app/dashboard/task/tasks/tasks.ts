import { Component, inject } from '@angular/core';
import { TaskList } from "./task-list/task-list";
import { TaskService } from '../services/task-service';
import { Task } from '../../models/task.models';

@Component({
  selector: 'app-tasks',
  imports: [TaskList],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {
  taskService = inject(TaskService)
  tasks = inject(TaskService).getAllTasks()

  updateTask(task: Task) {               
    this.taskService.updateTask(task)
  }
}
