import { Injectable, signal } from '@angular/core';
import { tasks } from '../data/mock-data';
import { Task } from '../../models/task.models';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  todos = tasks
  tasks = signal<Task[]>(this.todos)

  constructor() { }
  getOwnTasks(){
    this.tasks.set( this.todos.filter((task) => task.name === "Ben" && task.status === "incomplete") )
   
    return this.tasks
  }

  getAllTasks(){
    this.tasks.set( this.todos.filter((task) => task.status === "incomplete") )
    return this.tasks
  }


  addNewTask(task:string){

   const newTask = {
      id: (this.todos.length + 1).toString(),
      name: "Ben",                                // Hier muss noch eingepflegt werden, das der jeweils angemeldete Username hinterlegt wird!
      title: task,
      status: "incomplete",
      checked: false
    }
    /* console.log(newTask) */
    this.todos.push(newTask)
  }
 
  updateTask(updatedTask:Task){
    let taskIndex = this.todos.findIndex((todo) => todo.id === updatedTask.id)
    this.todos.splice(taskIndex, 1)
    this.todos.splice(taskIndex, 0, updatedTask)
  }

  filterCompleted(){
    this.tasks.set( this.todos.filter((task) => task.status === "complete") )
  }

}