import { httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TaskInterface } from '../../models/task-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseURL = 'http://127.0.0.1:8000/api/tasks/'
  httpClient = inject(HttpClient)
  private status = 'complete'

  getAllTasks() {
    return httpResource<TaskInterface[]>(() => this.baseURL)
  }

  
  updateTask(id:string, data:TaskInterface) {
    // empfängt daten von taskList toogle
    console.log('Service meldet: ', id, data)
    return this.httpClient.put<TaskInterface>(`http://127.0.0.1:8000/api/tasks/${id}/`, data)

  }
  
}

