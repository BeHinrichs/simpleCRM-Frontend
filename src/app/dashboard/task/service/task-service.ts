import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TaskInterface } from '../../models/task-interface';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';

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
  refreshTrigger$ = new BehaviorSubject<void>(undefined);
  allTasks$ = this.refreshTrigger$.pipe(
    switchMap(() => this.httpClient.get<TaskInterface[]>(this.baseURL))
  );

  filteredTasks = computed(() => {
    const tasks = this.allTasks();
    const currentFilter = this.filter();

    console.log(`Service filtert jetzt nach: ${currentFilter}`);

    switch (currentFilter) {
      case 'own':
        return tasks.filter(t => t.name === this.currentUser && t.status === 'incomplete');
      case 'all':
        return tasks.filter(t => t.status === 'incomplete');
      case 'done':
        return tasks.filter(t => /* t.name === this.currentUser &&  */t.status === 'complete');
    }
  });

  setFilter(newFilter: FilterValue): void {
    this.filter.set(newFilter);
  }

  
  updateTask(id:string, data:TaskInterface) {
    // empfängt daten von taskList toogle
    console.log('Service meldet: ', id, data)
    return this.httpClient.put<TaskInterface>(`http://127.0.0.1:8000/api/tasks/${id}/`, data)

  }
  reloadTasks(): void {
    console.log('Reload wird ausgelöst...');
    this.refreshTrigger$.next();
  }
  
}

