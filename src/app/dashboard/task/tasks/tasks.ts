import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TaskList } from "./task-list/task-list";
import { TaskService } from '../services/task-service';
import { TaskInterface } from '../../models/task-interface'; // Pfad anpassen

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskList],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {
  taskService = inject(TaskService);

  // KORREKTUR: Verwende das reaktive `tasks$`-Observable vom Service.
  // Dieses Observable ändert seine Daten automatisch, wenn der Filter
  // in der TaskFilter-Komponente geändert wird.
  tasks = toSignal(this.taskService.tasks$);

  updateTask(task: TaskInterface) {
    this.taskService.updateTask(task);
  }
}