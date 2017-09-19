import { TaskDonePipe } from './task-done.pipe';
import { TaskService } from './task.service';
import { ToDoList } from './todo-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule, CommonModule],
  declarations: [AppComponent, ToDoList, TaskDonePipe],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
