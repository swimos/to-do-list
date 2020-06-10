import { Component, OnInit } from '@angular/core';

import { TodoService, TodoItem} from './../core';

@Component({
  selector: 'completed',
  templateUrl: './completed.component.html'
})
export class CompletedComponent implements OnInit {
  
  todos: TodoItem[] = [];
  filter: string = 'completed'; // filter only completed todo list item

  constructor(
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.todos = this.todoService.todos;
  }

 }