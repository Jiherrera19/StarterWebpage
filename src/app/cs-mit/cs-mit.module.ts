import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CsMitRoutingModule } from './cs-mit-routing.module';
import { CsMitComponent } from './cs-mit.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { MaterialModule } from './material.module';
import { GroupStatsComponent } from './components/group-stats/group-stats.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ConstraintStatsComponent } from './components/constraint-stats/constraint-stats.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { SubjectListFiltersComponent } from './components/subject-list/subject-list.component';
import { SubjectListComponentMobile } from './components/subject-list/subject-list.component.mobile';
import { CsMitComponentMobile } from './cs-mit.component.mobile';
import { DesktopGuard, MobileGuard } from './cs-mit.component.guard';


@NgModule({
  declarations: [
    CsMitComponent,
    SubjectListComponent,
    GroupStatsComponent,
    ConstraintStatsComponent,
    CourseInfoComponent,
    SubjectListFiltersComponent,
    SubjectListComponentMobile,
    CsMitComponentMobile
  ],
  imports: [
    CsMitRoutingModule,
    MaterialModule,
    FormsModule,
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [
    DesktopGuard,
    MobileGuard
  ]
})
export class CsMitModule { }
