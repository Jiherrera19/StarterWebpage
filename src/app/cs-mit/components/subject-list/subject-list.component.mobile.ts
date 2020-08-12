import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SubjectListComponent } from './subject-list.component';

@Component({
    selector: 'app-subject-list-mobile', // main difference
    templateUrl: './subject-list.component.mobile.html', // main difference
    styleUrls: ['./subject-list.component.css'],
    animations: [
      trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ]
  })
  export class SubjectListComponentMobile extends SubjectListComponent {}