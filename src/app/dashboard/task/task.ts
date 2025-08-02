import { Component } from '@angular/core';
import { TaskHead } from "./task-head/task-head";
import { TaskFilter } from "./task-filter/task-filter";
import { Tasks } from "./tasks/tasks";

@Component({
  selector: 'app-task',
  imports: [TaskHead, TaskFilter, Tasks],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {

}
