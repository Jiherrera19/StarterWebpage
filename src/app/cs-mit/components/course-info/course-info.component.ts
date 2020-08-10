import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Course } from '../../lib/service/courses/courses.model';
import { Group } from '../../cs-mit.model';
import { CoursesService } from '../../lib/service/courses/courses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit, OnDestroy {
  course: Course
  courseSubscription: Subscription;
  participationDataToDisplay: string;
  
  @Input() mainGroups: Array<Group>;
  @Input() constraintGroups: Array<Group>;
  constructor(private coursesService: CoursesService) {
    
  }
  ngOnDestroy(): void {
    this.courseSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.courseSubscription = this.coursesService.courseInfoSubject.subscribe((course) => {
      this.course = course;
      this.participationDataToDisplay = "";
    });
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

  handleSelectMajor(num: string) {
    let data = this.course.participation[num];
    this.participationDataToDisplay = `Frosh: ${data[1] || 0} | Sophomores: ${data[2] || 0} | Juniors: ${data[3] || 0} | Seniors: ${data[4] || 0}`;
  }

  partDataToDisplay() {
    return Object.keys(this.course.participation).length > 0;
  }
}
