import { Component, inject, input, output, Injectable, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../services/task-service';
import { Task } from '../../models/task.models';
import { NgClass } from '@angular/common';
import { tasks } from '../data/mock-data';

@Component({
  selector: 'app-task-bar',
  imports: [RouterLink, NgClass],
  templateUrl: './task-bar.html',
  styleUrl: './task-bar.css'
})
export class TaskBar {
  taskService = inject(TaskService)
  todos = tasks
  tasks = signal<Task[]>(this.todos.filter(
    task => task.name === "Ben" && task.status === "incomplete"
  ));

  constructor() { }


  updateTask(task: Task) {
      this.taskService.updateTask(task);
    }

    toggleStatus(task: Task) {
      task.checked = !task.checked;
      task.checked ? task.status = "complete" : task.status = "incomplete";
      this.updateTask(task);
    }
}
