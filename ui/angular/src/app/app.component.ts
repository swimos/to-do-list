import { Component, OnInit, OnDestroy} from '@angular/core';

import { TodoService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private todoService: TodoService
  ) {}

  /**
    * When the app is ngOnInit we open Map downlink 
    * to Subscribe totodos list. When the data is updated
    * we will send an action SUBSCRIBE_ITEM to keep track
    * of the state of the todo list. For todo list we 
    * mainly track if new item is added or rmeove or updated
    */
  ngOnInit() {
    this.todoService.openTodoLink();
  }

  /**
    * When we ngOnDestroy is best if we close the Map downlink 
    * if we are not using.
    */
  ngOnDestroy() {
    this.todoService.closeTodoLink();
  }
}
