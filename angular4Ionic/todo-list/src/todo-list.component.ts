import { Task } from './task.model';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'todo-list',
  templateUrl: '/src/todo-list.component.html',
  styles: 
  [`
    li.done {
        text-decoration: line-through;
        color: #a5a5a5;
        font-style: italic;
    }
  `]
})
export class ToDoList {

    @Input() tasks: Task[];

    hideDone: false;

    markAsDone(task: Task) {
        task.done = !task.done;
    }

}
