import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CsMitRoutingModule } from './cs-mit-routing.module';
import { CsMitComponent } from './cs-mit.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { MaterialModule } from './material.module';
import { GroupStatsComponent } from './components/group-stats/group-stats.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ConstraintStatsComponent } from './components/constraint-stats/constraint-stats.component';


@NgModule({
  declarations: [
    CsMitComponent,
    SubjectListComponent,
    GroupStatsComponent,
    ConstraintStatsComponent
  ],
  imports: [
    CommonModule,
    CsMitRoutingModule,
    FormsModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ]
})
export class CsMitModule { }
