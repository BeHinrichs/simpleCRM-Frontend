import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tasks } from '../data/mock-data';
import { Task } from '../../models/task.models';
import { Observable } from 'rxjs';
import { TaskInterface } from '../../models/task-interface';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  /* ######## call Tasks ########### */
  todos = tasks
  tasks = signal<TaskInterface[]>(this.todos)
  HttpClient = inject(HttpClient)

  constructor() { }
  getOwnTasks(): Observable<TaskInterface[]> {
    // The base URL for the API endpoint
    const url = 'http://127.0.0.1:8000/api/tasks/';

    // Use HttpParams for a safe and clean way to add URL parameters.
    let params = new HttpParams();
    params = params.append('name', 'Ben'); // Adds ?name=Ben
    params = params.append('status', 'incomplete'); // Adds &status=incomplete

    // The final URL will be: .../api/tasks/?name=Ben&status=incomplete
    return this.HttpClient.get<TaskInterface[]>(url, { params: params });
  }
  getAllTasks():Observable<Task[]>{
    return this.HttpClient.get<TaskInterface[]> ('http://127.0.0.1:8000/api/tasks/')
  }
  addNewTask(task:string){
   const newTask = {
      id: (this.todos.length + 1).toString(),
      name: "Ben",                                        // Per Dropdown wählen
      create_by: "Platzhalter",                                // Hier muss noch eingepflegt werden, das der jeweils angemeldete Username hinterlegt wird!
      title: task,
      status: "incomplete",
      checked: false
    }
    /* console.log(newTask) */
    this.todos.push(newTask)
  }

  /* ####### Update Task ########### */
  updateTask(updatedTask:Task){
    let taskIndex = this.todos.findIndex((todo) => todo.id === updatedTask.id)
    this.todos.splice(taskIndex, 1)
    this.todos.splice(taskIndex, 0, updatedTask)
  }

  filterCompleted(){
    this.tasks.set( this.todos.filter((task) => task.status === "complete") )
  }

 

}