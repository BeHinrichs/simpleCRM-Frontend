import { Component, input, output} from '@angular/core';
import { Task } from '../../../models/task.models';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-task-list',
  imports: [NgClass],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})


export class TaskList {
  data = input.required<Task>()
  updateTaskEvent = output()
 
   toggleStatus(){
    this.data().checked = !this.data().checked
    this.data().checked ? this.data().status = "complete" : this.data().status ="incomplete"
    this.updateStatus()
  }
 

  updateStatus(){
    this.updateTaskEvent.emit()
  }

}