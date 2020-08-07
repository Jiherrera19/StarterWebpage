import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CsMitComponent } from './cs-mit.component';

const routes: Routes = [{ path: '', component: CsMitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsMitRoutingModule { }
