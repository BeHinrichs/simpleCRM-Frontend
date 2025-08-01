import { Component } from '@angular/core';
import { TaskHead } from "./task-head/task-head";
import { TaskFilter } from "./task-filter/task-filter";
import { TaskList } from './tasks/task-list/task-list';
import { Tasks } from "./tasks/tasks";

@Component({
  selector: 'app-task',
  imports: [TaskHead, TaskFilter, TaskList, Tasks],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {

}
