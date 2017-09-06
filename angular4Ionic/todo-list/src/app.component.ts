import { TaskService } from './task.service';
import { Task } from './task.model';
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: '/src/app.component.html'
})
export class AppComponent {

  constructor(private taskService: TaskService){
    this.currentTask = new Task();
  }


  currentTask: Task;


  addTask(task: Task) {
    task.done = false;
    task.date = new Date();
    this.taskService.addTask(task);
    this.currentTask = new Task();
  }

  get tasks() {
    return this.taskService.getTasks();
  }

 }
