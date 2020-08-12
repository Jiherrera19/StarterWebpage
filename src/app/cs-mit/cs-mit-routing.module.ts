import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CsMitComponent } from './cs-mit.component';
import { MobileGuard, DesktopGuard } from './cs-mit.component.guard';
import { CsMitComponentMobile } from './cs-mit.component.mobile';

const routes: Routes = [
  {
    path: '',
    component: CsMitComponent,
    canActivate: [DesktopGuard],
    children: []
  },
  {
    path: 'm',
    component: CsMitComponentMobile,
    canActivate: [MobileGuard],
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsMitRoutingModule { }
