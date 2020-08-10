import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../lib/service/courses/courses.model';
import { Group } from '../../cs-mit.model';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  @Input() course: Course;
  @Input() mainGroups: Array<Group>;
  @Input() constraintGroups: Array<Group>;
  constructor() { }

  ngOnInit(): void {
  }

  objKeys(obj: Object): Array<string> {
    return Object.keys(obj);
  }

  getGroupLabels() {
    let groupLabels = [];
    this.course.groups.forEach(groupId => {
      this.mainGroups.forEach(group => {
        if (group.name === groupId) {
          groupLabels.push(group.label);
        }
      });
      this.constraintGroups.forEach(group => {
        if (group.name === groupId) {
          groupLabels.push(group.label);
        }
      });
    });
    return groupLabels;
  }
}
