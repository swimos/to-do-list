import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ActiveComponent } from './active.component';
import { SharedModule } from '../shared';
import { ActiveRoutingModule } from './active-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ActiveRoutingModule
  ],
  declarations: [
    ActiveComponent
  ],
  providers: []
})
export class ActiveModule {}