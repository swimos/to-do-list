import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule, LayoutHeaderComponent, LayoutFooterComponent } from './shared';

import { AllModule } from './all/all.module';

@NgModule({
  declarations: [ AppComponent, LayoutHeaderComponent, LayoutFooterComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AllModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
