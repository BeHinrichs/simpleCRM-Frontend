import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { tasks } from '../data/mock-data';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { TaskInterface } from '../../models/task-interface';
import { switchMap, tap, map, shareReplay } from 'rxjs/operators';

type FilterValue = 'own' | 'all' | 'done';

@Injectable({
  providedIn: 'root'
})



export class TaskService {
 

  /* ######## call Tasks ########### */
  todos = tasks
  tasks = signal<TaskInterface[]>([]);
  HttpClient = inject(HttpClient)
  private readonly baseUrl = 'http://127.0.0.1:8000/api/tasks/';
  private allTasks$ = this.HttpClient.get<TaskInterface[]>(this.baseUrl).pipe(
    shareReplay(1)
  );
  private filter$ = new BehaviorSubject<FilterValue>('own');

  constructor() { }

  public tasks$: Observable<TaskInterface[]> = combineLatest([
    this.allTasks$,
    this.filter$
  ]).pipe(
    
    map(([tasks, filter]) => {
      /* console.log(`Filtere ${tasks.length} Tasks mit dem Filter: '${filter}'`); */
      const currentUser = "Ben"; // Später durch echten User ersetzen

      switch (filter) {
        case 'own':
          /* console.log('Alle Tasks: ', this.HttpClient.get<TaskInterface[]>(this.baseUrl)) */
          return tasks.filter((t: { name: string; status: string; }) => t.name === currentUser && t.status === 'incomplete');
        case 'all':
          return tasks.filter((t: { status: string; }) => t.status === 'incomplete');
        case 'done':
          return tasks.filter((t: { name: string; status: string; }) => t.status === 'complete');
        default:
          return tasks;
      }
    })
  );

  setFilter(filter: FilterValue): void {
    this.filter$.next(filter);
  }

  
  addNewTask(taskTitle: string): Observable<TaskInterface> {
    const newTaskPayload = {
      title: taskTitle,
      name: "Ben",             // Später dynamisch vom eingeloggten User
      create_by: "Platzhalter",        // Später dynamisch
      status: "incomplete",
      checked: false
    };

    return this.HttpClient.post<TaskInterface>(this.baseUrl, newTaskPayload).pipe(
      tap(() => {
        console.log('Task wurde gepostet, löse Neuladen aus...');
      })
    );
  }

  /* ####### Update Task ########### */

  updateTask(updatedTask: TaskInterface) {
    // Hier käme der httpClient.put(...) Aufruf
    console.log("Sende Update an Backend:", updatedTask);
  }

}