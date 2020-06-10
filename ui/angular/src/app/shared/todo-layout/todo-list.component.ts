import { Component, Input } from '@angular/core';

import { TodoService, TodoItem } from '../../core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent  {

  @Input()
  todos: TodoItem[];

  @Input()
  filter: string;
  
  constructor(
    private todoService: TodoService
  ) {}

  // Remove item from todo list
  removeItem(key: number) {
    this.todoService.removeItem(key);
  }

  // on click on checkbox to change completed status
  onCompleted(key: number, value: string) {
    this.todoService.updateCompleted(key, !value);
  }

  // Bind state value on change
  onEdit(parent: HTMLElement, item: TodoItem) {
    item.editing = true;

    // Defer so the input show up
    setTimeout(()=> {
      // Try @ViewChild could not get it working well... this work better for me
      
      const input: HTMLElement = parent.querySelector('.input-edit');
      input.focus();
    }, 0);
  }

  // When on blur update state and update label
  onBlur(item: TodoItem, text: string) {
    text = text.trim();
    if(text.length > 2) {
      this.todoService.editLabel(item.key, text);
    }
    item.editing = false;
    item.editLabel = '';
  }
  
}