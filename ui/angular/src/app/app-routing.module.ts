import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'active', 
    loadChildren: () => import('./active/active.module').then(m => m.ActiveModule)
  },
  {
    path: 'completed', 
    loadChildren: () => import('./completed/completed.module').then(m => m.CompletedModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
