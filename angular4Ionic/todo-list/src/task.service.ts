import { Task } from './task.model';

export class TaskService {

    constructor() {
        this.tasks = [];
    }

    tasks: Task[];

            
    getTasks() {
        return this.tasks;
    }
    
    addTask(task: Task) {
        this.tasks = this.tasks.concat([task]);
        return this.tasks;
    }

}