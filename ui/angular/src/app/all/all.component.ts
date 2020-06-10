import { Component, OnInit } from '@angular/core';

import { TodoService, TodoItem} from './../core';

@Component({
  selector: 'all',
  templateUrl: './all.component.html'
})
export class AllComponent implements OnInit {
  
  todos: TodoItem[] = [];
  filter: string = 'all'; // show all todo list item

  constructor(
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.todos = this.todoService.todos;
  }

 }