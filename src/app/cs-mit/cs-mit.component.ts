import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from './lib/service/courses/courses.model';
import { CoursesService } from './lib/service/courses/courses.service';
import { Subscription } from 'rxjs';
import { ScrapedInfo, Group } from './cs-mit.model';

@Component({
  selector: 'app-cs-mit',
  templateUrl: './cs-mit.component.html',
  styleUrls: ['./cs-mit.component.css']
})
export class CsMitComponent implements OnInit, OnDestroy {
  courses: Array<Course>; // All courses
  coursesSubscription: Subscription;
  constraintGroups: Array<Group>; // All course groups
  mainGroups: Array<Group>; // Main course groups

  constructor(private coursesService: CoursesService) { }

  assignGroupCompletion() {
    this.constraintGroups.forEach((group: Group, index: number) => {
      this.constraintGroups[index].completion = Math.random() * 100;
    });
    this.mainGroups.forEach((group: Group, index: number) => {
      this.mainGroups[index].completion = 100;
    });
  }

  ngOnInit(): void {
    this.coursesSubscription = this.coursesService.getScrapedInfo().subscribe((data: ScrapedInfo) => {
      this.courses = data.courses;
      this.constraintGroups = data.constraintGroups;
      this.mainGroups = data.mainGroups;
      this.assignGroupCompletion();
    });
    
  }

  ngOnDestroy(): void {
    this.coursesSubscription.unsubscribe();
  }
}
