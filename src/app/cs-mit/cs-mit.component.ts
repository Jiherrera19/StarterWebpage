import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Course } from './lib/service/courses/courses.model';
import { CoursesService } from './lib/service/courses/courses.service';
import { Subscription } from 'rxjs';
import { ScrapedInfo, Group } from './cs-mit.model';



@Component({
  selector: 'app-cs-mit',
  templateUrl: './cs-mit.component.html',
  styleUrls: ['./cs-mit.component.css']
})
export class CsMitComponent implements OnInit, OnDestroy, AfterViewChecked {
  courses: Array<Course>; // All courses
  coursesSubscription: Subscription;
  constraintGroups: Array<Group>; // All course groups
  mainGroups: Array<Group>; // Main course groups

  courseInfoSticky: boolean = false;
  coursePositionSubscription: Subscription;
  courseInfoElementPosition: any;
  courseInfoElementChangeCounter: number = 0;

  @ViewChild('courseInfo', { read: ElementRef }) courseInfoElement: ElementRef;
  @HostListener('window:scroll', ['$event'])
    handleScroll(){
        const windowScroll = window.pageYOffset;
        if(windowScroll >= this.courseInfoElementPosition){
            this.courseInfoSticky = true;
        } else {
            this.courseInfoSticky = false;
        }
    }

  ngAfterViewChecked(): void {
    if (!this.courseInfoSticky && this.courseInfoElementChangeCounter <= 10) {
      this.courseInfoElementPosition = this.offset(this.courseInfoElement.nativeElement).top;
      this.courseInfoElementChangeCounter++;
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
    this.coursesSubscription = this.coursesService.getScrapedInfo().subscribe((data: ScrapedInfo) => {
      this.courses = data.courses;
      this.constraintGroups = data.deptReq["6-2"].constraintGroups;
      this.mainGroups = data.deptReq["6-2"].mainGroups;
    });
    
  }

  ngOnDestroy(): void {
    this.coursesSubscription.unsubscribe();
  }
}
