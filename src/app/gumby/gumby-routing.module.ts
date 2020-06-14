import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GumbyComponent } from './gumby.component';

const routes: Routes = [{ path: '', component: GumbyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GumbyRoutingModule { }
