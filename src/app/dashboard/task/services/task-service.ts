import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { tasks } from '../data/mock-data';
import { Task } from '../../models/task.models';
import { Observable } from 'rxjs';
import { TaskInterface } from '../../models/task-interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  

  /* ######## call Tasks ########### */
  todos = tasks
  tasks = signal<TaskInterface[]>([]);
  HttpClient = inject(HttpClient)
  private readonly baseUrl = 'http://127.0.0.1:8000/api/tasks/';

  constructor() { }

  getAllTasks(): Observable<TaskInterface[]> {
    return this.HttpClient.get<TaskInterface[]>(this.baseUrl);
  }

  getOwnTasks(): Observable<TaskInterface[]> {
    const params = new HttpParams()
      .set('name', 'Ben') // Später durch eingeloggten User ersetzen
      .set('status', 'incomplete');
    
    // Gib das Observable direkt zurück, genau wie bei den anderen Methoden.
    return this.HttpClient.get<TaskInterface[]>(this.baseUrl, { params });
  }

  getCompletedTasks(){
    let params = new HttpParams();
    params = params.append('status', 'complete'); 

    return this.HttpClient.get<TaskInterface[]>(this.baseUrl, { params: params });
  }
  
  addNewTask(task:string){
   const newTask = {
      id: (this.todos.length + 1).toString(),
      name: "Ben",                                              // Per Dropdown wählen
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

}