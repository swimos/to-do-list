import { Injectable } from '@angular/core';
import * as swim from '@swim/system';
import { Downlink, Value } from "@swim/system";

import { TodoItem } from './../models';

@Injectable()
export class TodoService {
  HOST: string = 'warp://localhost:9001';
  NODE: string = '/todo';
  todoLink: Downlink = null;
  todos: TodoItem[] = [];

  constructor() {}

  /**
    * subscribe to a Map downlink to our 'list' lane
    * this is how we get updates from the MapLane inside the WebAgent
    */
  openTodoLink() {
    this.todoLink = swim.downlinkMap().hostUri(this.HOST).nodeUri(this.NODE).laneUri('list')
      .didUpdate((key: Value, value: Value)=> {
        const data: any = value.toAny();
        this.subscribeItem( {...data, key: key.numberValue()} );
      }).didRemove((key: Value)=> {
        let list = this.todos
        // this.todos = list.filter((todo) => todo.key !== key.numberValue() );
        list.forEach((item: TodoItem, i: number)=> {
          if(item.key === key.numberValue()) {
            this.todos.splice(i, 1);
          }
        });
      }).open();

  }

  /**
   * Reactjs Action is to show that link have been close 
   * and reset the state
   */
  closeTodoLink() {
    this.todoLink.close();
  }

  /**
   * Add item to todos list
   */
  subscribeItem(data: TodoItem) {
    let newItem: boolean = false

    this.todos.forEach((item: TodoItem) => {
      // if todos list have item, then update item
      if (item.key === data.key) {
        item.completed = data.completed
        item.label = data.label
        newItem = true
      }
    })

    // if there is no item then add new item to todos list
    if (!newItem) {
      this.todos.unshift(data)
    }
  }

  /**
    * Send Command to Swim WebAgent to add a list item
    * This will call the addItem command lane in the ToDo WebAgent
    * UUID is generated automatically by the command lane adding new value to the list
  */
  addItem(text: string) {
    swim.command(this.HOST, this.NODE, 'addItem', text);
  }

  /**
   * Send Command to Swim WebAgent to remove a list item by UUID
   * This will call the removeItem command lane in the ToDo WebAgent
   */
  removeItem(key: number) {
    swim.command(this.HOST, this.NODE, 'removeItem', key);
  }

  /**
   * Send Command to Swim WebAgent to update label of list item by UUID
   * This will call the updateCompletedItem command lane in the ToDo WebAgent
   */
  updateCompleted(key: number, value: boolean) {
    swim.command(this.HOST, this.NODE, 'updateCompletedItem', { key, completed: value });
  }

  /**
   * Send Command to Swim WebAgent to update label of list item by UUID
   * This will call the editItem command lane in the ToDo WebAgent
   */
  editLabel(key: number, text: string) {
    swim.command(this.HOST, this.NODE, 'editItem', { key, label: text });
  }
}
