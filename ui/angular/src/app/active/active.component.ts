import { Component, OnInit } from '@angular/core';

import { TodoService, TodoItem} from './../core';

@Component({
  selector: '',
  templateUrl: './active.component.html'
})
export class ActiveComponent implements OnInit {
  
  todos: TodoItem[] = [];
  filter: string = 'active'; // filter only active todo list item

  constructor(
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.todos = this.todoService.todos;
  }

 }