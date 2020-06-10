import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompletedComponent } from './completed.component';
import { SharedModule } from '../shared';
import { CompletedRoutingModule } from './completed-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CompletedRoutingModule
  ],
  declarations: [
    CompletedComponent
  ],
  providers: []
})
export class CompletedModule {}