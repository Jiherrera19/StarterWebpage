import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../lib/service/courses/courses.model';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  @Input() course: Course;
  constructor() { }

  ngOnInit(): void {
  }

  objKeys(obj: Object): Array<string> {
    return Object.keys(obj);
  }
}
