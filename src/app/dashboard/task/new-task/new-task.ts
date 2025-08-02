import { Component, ElementRef, viewChild, inject } from '@angular/core';
import { TaskService } from '../services/task-service';


@Component({
  selector: 'app-new-task',
  imports: [],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css'
})
export class NewTask {
  taskService = inject(TaskService)
  taskInputReference = viewChild<ElementRef<HTMLInputElement>>("newTaskInput")

  
  addNewTask(){
    let newTaskValue = this.taskInputReference()!.nativeElement.value
    this.taskService.addNewTask(newTaskValue)
    console.log(newTaskValue)
  }
}