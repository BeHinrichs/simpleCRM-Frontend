import { Component, inject, HostListener, ElementRef } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { NewTask } from '../new-task/new-task';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [NgForOf, NgIf, NewTask],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css'
})
export class TaskFilter {
  taskService = inject(TaskService);
  private elementRef = inject(ElementRef);
  
  filters = [
    { label: 'Eigene', value: 'own' },
    { label: 'Alle', value: 'all' },
    { label: 'Erledigt', value: 'done' },
    { label: 'Neu', value: 'new' }
  ];
  selectedFilter = this.filters[0];
  showNewTaskInput = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // 3. Prüfe, ob das geklickte Element (event.target) innerhalb des
    //    Komponenten-Elements (this.elementRef.nativeElement) liegt.
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    
    // 4. Wenn der Klick NICHT innerhalb war, schließe das Eingabefeld.
    if (!clickedInside) {
      this.showNewTaskInput = false;
    }
  }
  ngOnInit(): void {
    // Setze den initialen Filter im Service
    this.taskService.setFilter('own');
  }

  setFilter(filter: any) {
    this.selectedFilter = filter;

    if (filter.value === 'new') {
      this.showNewTaskInput = true;
      return;
    }

    
    // EINZIGE AUFGABE: Den Service über die Filteränderung informieren.
    this.taskService.setFilter(filter.value);
    this.showNewTaskInput = false;
  }
  
  onTaskAdded() {
    console.log('Ein neuer Task wurde hinzugefügt, schließe das Eingabefeld.');
    this.showNewTaskInput = false;
    // Setze den Filter zurück, damit der neue Task sichtbar wird (falls nötig).
    this.setFilter(this.filters[0]);
  }
}

function onDocumentClick(event: Event | undefined, MouseEvent: { new(type: string, eventInitDict?: MouseEventInit): MouseEvent; prototype: MouseEvent; }) {
  throw new Error('Function not implemented.');
}
