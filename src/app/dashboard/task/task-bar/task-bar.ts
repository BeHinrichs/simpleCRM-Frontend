import { Component, inject, computed } from '@angular/core';
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

  // 1. Hole die UNGEFILTERTE Liste vom Service.
  private allTasks = toSignal(this.taskService.tasks$, { initialValue: [] });

  // 2. Erstelle ein computed Signal, das NUR für die Zählung in der TaskBar filtert.
  //    Diese Logik ist jetzt komplett unabhängig von den Klicks in der TaskFilter-Komponente.
  private ownIncompleteTasks = computed(() =>
    this.allTasks().filter(
      task => task.name === "Ben" && task.status === "incomplete"
    )
  );

  // 3. getTaskCount() greift jetzt auf das neue computed Signal zu.
  getTaskCount(): number {
    return this.ownIncompleteTasks().length;
  }
}