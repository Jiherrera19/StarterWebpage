import { Component, OnInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Course } from 'src/app/cs-mit/lib/service/courses/courses.model';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SubjectListComponent implements OnInit {
  @Input() dataSource: Array<Course>;
  columnsToDisplay = ['Your Classes'];
  expandedCourse: Course | null;
  constructor() { }

  ngOnInit(): void {
  }

}