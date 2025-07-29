import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-task-filter',
  imports: [NgForOf],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css'
})
export class TaskFilter {
  filters = [
    { label: 'Eigene', value: 'own' },
    { label: 'Alle', value: 'all' },
    { label: 'Erledigt', value: 'done' },
    { label: 'Neu', value: 'new' }
  ];
  selectedFilter = this.filters[0];

  setFilter(filter: any) {
    this.selectedFilter = filter;
  }
}
