import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  

  setFilter(filter: string) {
    console.log('Servie Filter: ', filter)
  }
}
