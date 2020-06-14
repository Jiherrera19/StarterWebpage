import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GumbyRoutingModule } from './gumby-routing.module';
import { GumbyComponent } from './gumby.component';


@NgModule({
  declarations: [GumbyComponent],
  imports: [
    CommonModule,
    GumbyRoutingModule
  ]
})
export class GumbyModule { }
