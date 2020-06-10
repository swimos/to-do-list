import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AllComponent } from './all.component';
import { SharedModule } from '../shared';
import { AllRoutingModule } from './all-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AllRoutingModule
  ],
  declarations: [
    AllComponent
  ],
  providers: []
})
export class AllModule {}