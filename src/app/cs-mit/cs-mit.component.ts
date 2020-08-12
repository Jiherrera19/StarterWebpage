import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
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

  courseInfoSticky: boolean = false;
  coursePositionSubscription: Subscription;
  courseInfoElementPosition: any;

  constraintChartRenderedSubscription: Subscription;

  @ViewChild('courseInfo', { read: ElementRef }) courseInfoElement: ElementRef;
  @HostListener('window:scroll', ['$event'])
    handleScroll(){
        const windowScroll = window.pageYOffset;
        if (!this.courseInfoElement) {
          return;
        }
        if (!this.courseInfoElementPosition) {
          this.courseInfoElementPosition = this.offset(this.courseInfoElement.nativeElement).top;
        }
        if(windowScroll >= this.courseInfoElementPosition){
            this.courseInfoSticky = true;
        } else {
            this.courseInfoSticky = false;
        }
    }

  offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  constructor(private coursesService: CoursesService) {
  }

  ngOnInit(): void {
    this.constraintChartRenderedSubscription = this.coursesService.constraintFinishedRenderingSubject.subscribe(() => {
      if (!this.courseInfoSticky) {
        if (this.courseInfoElement) {
          this.courseInfoElementPosition = this.offset(this.courseInfoElement.nativeElement).top;
        }
      }
    });
    this.coursesSubscription = this.coursesService.getScrapedInfo().subscribe((data: ScrapedInfo) => {
      this.courses = data.courses;
      this.constraintGroups = data.deptReq["6-2"].constraintGroups;
      this.mainGroups = data.deptReq["6-2"].mainGroups;
    });
  }

  ngOnDestroy(): void {
    this.coursesSubscription.unsubscribe();
    this.constraintChartRenderedSubscription.unsubscribe();
  }
}
