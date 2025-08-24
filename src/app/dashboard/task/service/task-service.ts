import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TaskInterface } from '../../models/task-interface';

type FilterValue = 'own' | 'all' | 'done';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseURL = 'http://127.0.0.1:8000/api/tasks/'
  httpClient = inject(HttpClient)
  filter = signal<FilterValue>('own');
  currentUser = 'Ben'
  allTasks = toSignal(this.httpClient.get<TaskInterface[]>(this.baseURL), { initialValue: [] }); // Alle Tasks mit filter own -> Muss in name = currentUser übersetzt werden
  
  getAllTasks() {
    console.log('Alle Tasks:', httpResource<TaskInterface[]>(() => `${this.baseURL}`))
    return  httpResource<TaskInterface[]>(() => `${this.baseURL}`)
  }

  setFilter(newFilter: FilterValue): void {
    
    this.filter.set(newFilter);
    /* console.log('der Filter ist: ', this.filter()) */
    
  }

  filteredTasks = computed(() => {
    const tasks = this.allTasks();
    const currentFilter = this.filter();

    /* console.log(`Service filtert jetzt nach: ${currentFilter}`); */

    switch (currentFilter) {
      case 'own':
        /* console.log('Gefiltert: ', tasks.filter(t => t.name === this.currentUser && t.status === 'incomplete')) */
        return tasks.filter(t => t.name === this.currentUser && t.status === 'incomplete')
      case 'all':
        /* console.log('Gefiltert: ', tasks.filter(t => t.status === 'incomplete')) */
        return tasks.filter(t => t.status === 'incomplete')
      case 'done':
        /* console.log('Gefiltert: ', tasks.filter(t => t.name === this.currentUser && t.status === 'complete')) */
        return tasks.filter(t => /* t.name === this.currentUser &&  */t.status === 'complete')
    }
  });



  
  updateTask(id:string, data:TaskInterface) {
    // empfängt daten von taskList toogle
    console.log('Service meldet: ', id, data)
    return this.httpClient.put<TaskInterface>(`http://127.0.0.1:8000/api/tasks/${id}/`, data)

  }
}

