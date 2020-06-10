import { Component } from '@angular/core';

import { TodoService } from '../../core';

@Component({
  selector: 'todo-add',
  templateUrl: './todo-add.component.html',
  styles: [':host { flex-grow: 2; }']
})
export class TodoAddComponent {
  text: string = '';
  
  constructor(
    private todoService: TodoService
  ) {}
  
  // When key press on input add new item
  onEnter() {
    const text: string = this.text.trim();
    if(text.length > 2) {
      this.todoService.addItem(text);
      this.text = '';
    }
  }
}