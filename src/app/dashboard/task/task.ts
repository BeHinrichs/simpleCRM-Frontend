import { Component } from '@angular/core';
import { TaskHead } from "./task-head/task-head";
import { TaskFilter } from "./task-filter/task-filter";

@Component({
  selector: 'app-task',
  imports: [TaskHead, TaskFilter],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {

}
