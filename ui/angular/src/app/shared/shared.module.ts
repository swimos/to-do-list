import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TodoAddComponent, TodoListComponent, TodoStatusPipe } from './todo-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TodoAddComponent,
    TodoListComponent,
    TodoStatusPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    TodoAddComponent,
    TodoListComponent,
    TodoStatusPipe
  ]
})
export class SharedModule {}