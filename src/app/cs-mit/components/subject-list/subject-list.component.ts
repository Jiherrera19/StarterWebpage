import { Component, OnInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Course } from 'src/app/cs-mit/lib/service/courses/courses.model';
import { CoursesService } from '../../lib/service/courses/courses.service';

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
  classesToDisplay: Array<Course>;
  columnsToDisplay = ['Your Classes'];
  expandedCourses: Array<Course> = [];
  searchQuery: string;
  manageListIcon: any = {};
  onlyShowPicked: boolean = false;

  constructor(private coursesService: CoursesService) {
    
  }

  ngOnInit(): void {
    this.classesToDisplay = this.dataSource;
  }

  containsObject(obj: Object, list: Array<Object>) {
    var i: number;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
  }

  removeObjectInstances(obj: Object) {
    this.expandedCourses = this.expandedCourses.filter(item => item !== obj);
  }

  handleSeachQuery(text: string) {
    this.onlyShowPicked = false;
    if (text === "") {
      this.classesToDisplay = this.dataSource;
    } else {
      this.classesToDisplay = this.dataSource.filter(course => {
        const courseLabel = (course.number + course.name).toLocaleLowerCase();
        return courseLabel.includes(text.toLocaleLowerCase());
      });
    }
  }

  chevronClicked(course: Course) {
    this.coursesService.courseInfoSubject.next(course);
  }

  manageListIconClicked(course: Course){
    if (this.manageListIcon[course.number]) {
      if (this.manageListIcon[course.number] === "add") {
        this.manageListIcon[course.number] = "remove";
      } else {
        this.manageListIcon[course.number] = "add";
      }
      
    } else {
      this.manageListIcon[course.number] = "remove";
    }

    let pickedCourses = Object.keys(this.manageListIcon).map(key => {
      if (this.manageListIcon[key] === "remove") {
        return this.dataSource.find((course) => {
          return course.number === key;
        });
      }
    });

    this.coursesService.pickedCoursesSubject.next(pickedCourses);
  }

  handlePickedToggle() {
    this.onlyShowPicked = !this.onlyShowPicked;

    if (this.onlyShowPicked) {
      let pickedCourses = Object.keys(this.manageListIcon).map(key => {
        if (this.manageListIcon[key] === "remove") {
          return this.dataSource.find((course) => {
            return course.number === key;
          });
        }
      });

      this.classesToDisplay = pickedCourses;
    } else {
      this.classesToDisplay = this.dataSource;
    }
  }
}