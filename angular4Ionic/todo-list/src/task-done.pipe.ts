import { Task } from './task.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'done'})
export class TaskDonePipe implements PipeTransform {

  transform(tasks: Task[], hideDone = false) {
    return hideDone?  tasks.filter((task) => {return !task.done}) : tasks;
  }
}
