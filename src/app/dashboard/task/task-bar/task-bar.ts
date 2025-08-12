import { Component, inject, input, output, Injectable, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../services/task-service';
import { Task } from '../../models/task.models';
import { tasks } from '../data/mock-data';

@Component({
  selector: 'app-task-bar',
  imports: [RouterLink],
  templateUrl: './task-bar.html',
  styleUrl: './task-bar.css'
})
export class TaskBar {
  taskService = inject(TaskService)
  todos = tasks
  tasks = signal<Task[]>(this.todos.filter(
    task => task.name === "Ben" && task.status === "incomplete"       // Username vom eingeloggten User, Später nur User ID aus DB
  ));

  constructor() { }
getTaskCount(): number {
  return this.tasks().length;
}
}
const screenWidth = window.innerWidth;
console.log('Screenwidth: ', screenWidth, "px");
if(screenWidth <= 1440) {
  console.log('Hurra Deine Schleife wirkt!')
}