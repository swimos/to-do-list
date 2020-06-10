import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoService } from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TodoService
  ],
  declarations: []
})
export class CoreModule { }