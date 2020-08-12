import { Component, OnInit, Input, ViewChild, Inject, OnDestroy, ɵɵupdateSyntheticHostBinding } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Course } from 'src/app/cs-mit/lib/service/courses/courses.model';
import { CoursesService } from '../../lib/service/courses/courses.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FilterAttributes } from './subject-list.model';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';

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
export class SubjectListComponent implements OnInit, OnDestroy {
  @Input() dataSource;
  @Input() mainGroups;
  @Input() constraintGroups;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constraintChartSubscription: Subscription;
  groupStatsChartSubscription: Subscription;

  constraintChartRenderedOnce: boolean = false;
  groupStateChartRenderedOnce: boolean = false;

  classesToDisplay: MatTableDataSource<Course>;
  columnsToDisplay = ['col1'];
  expandedCourses: Array<Course> = [];
  searchQuery: string;
  manageListIcon: any;
  onlyShowPicked: boolean = false;
  filterAttributes: FilterAttributes = {
    under: true,
    grad: true,
    fall: true,
    spring: true,
    notoffer: true,
    iap: true
  }



  constructor(private coursesService: CoursesService, private _bottomSheet: MatBottomSheet) {
  }
  ngOnDestroy(): void {
    this.constraintChartSubscription.unsubscribe();
    this.groupStatsChartSubscription.unsubscribe();
  }

  ngOnInit(): void {
    let cachedData = localStorage.getItem('PICKED_COURSES');
    this.manageListIcon = JSON.parse(cachedData ? cachedData : '{}');

    this.constraintChartSubscription = this.coursesService.constraintFinishedRenderingSubject.subscribe(() => {
      if (!this.constraintChartRenderedOnce) {
        this.constraintChartRenderedOnce = true;
        if (this.groupStateChartRenderedOnce) {
          this.coursesService.pickedCoursesSubject.next(this.getPickedCourses());
        }
      }
    });

    this.groupStatsChartSubscription = this.coursesService.constraintFinishedRenderingSubject.subscribe(() => {
      if (!this.groupStateChartRenderedOnce) {
        this.groupStateChartRenderedOnce = true;
        if (this.constraintChartRenderedOnce) {
          this.coursesService.pickedCoursesSubject.next(this.getPickedCourses());
        }
      }
    });

    this.classesToDisplay = new MatTableDataSource(this.dataSource);
    this.classesToDisplay.paginator = this.paginator;
    this.classesToDisplay.sort = this.sort;
    this.classesToDisplay.sortData = (data, sort) => {
      if (this.searchQuery || this.classesToDisplay.filter === ":show_mine") {
        return data;
      }
      let pickedCourses = this.getPickedCourses();
      let otherSortedData = this.dataSource.filter((course) => {
        return !pickedCourses.includes(course);
      })
      otherSortedData = Object.keys(otherSortedData).map(key => otherSortedData[key]).sort((a: Course, b: Course) => {
        let aName = a.name;
        let bName = b.name;
        if (aName < bName) {
          return -1;
        }
        if (aName === bName) {
          return 0;
        }
        return 1;
      });
      return pickedCourses.concat(otherSortedData);
    }
    this.classesToDisplay.filterPredicate = (course, filter) => {
      if (filter === ":show_mine") {
        return this.manageListIcon[course.number] === "remove";
      }
      let canContinue = false;
      course.attributes.forEach((attr) => {
        if (this.filterAttributes[attr]) {
          if (attr === 'nooffer') {
            canContinue = false;
          } else {
            canContinue = true;
          }
        }
      });
      if (!canContinue) { return false }
      return (course.number + course.name).trim().toLocaleLowerCase().includes(filter);
    };
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
    this.classesToDisplay.filter = text.trim().toLowerCase();
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

    this.coursesService.pickedCoursesSubject.next(this.getPickedCourses());
  }

  getPickedCourses() {
    let pickedCourses = Object.keys(this.manageListIcon).map(key => {
      if (this.manageListIcon[key] === "remove") {
        return this.dataSource.find((course) => {
          return course.number === key;
        });
      }
    });

    pickedCourses = pickedCourses.filter((course) => {
      return course;
    });

    return pickedCourses;
  }

  trackBy(index, item){
    return item.number;
  }

  handlePickedToggle() {
    this.onlyShowPicked = !this.onlyShowPicked;

    if (this.onlyShowPicked) {
      this.classesToDisplay.filter = ":show_mine";
    } else {
      this.classesToDisplay.filter = this.searchQuery;
    }
  }

  handleFilterToggle() {
    this._bottomSheet.open(SubjectListFiltersComponent, {restoreFocus: false, data: { componentInstance: this } });
  }

  saveClasses() {
    localStorage.setItem('PICKED_COURSES', JSON.stringify(this.manageListIcon));
  }

  clearClasses() {
    localStorage.removeItem('PICKED_COURSES');
    this.manageListIcon = {};
    this.coursesService.pickedCoursesSubject.next(this.getPickedCourses());
  }

  clearSearch() {
    this.searchQuery = "";
    this.handleSeachQuery("");
  }
}

@Component({
    selector: 'subject-list-filters',
    templateUrl: `./subject-list-filters.component.html`,
  })
  export class SubjectListFiltersComponent {

    constructor(private _bottomSheetRef: MatBottomSheetRef<SubjectListFiltersComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    }
  
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      
      event.preventDefault();
    }

    handleToggle(input: string): void {
        this.data.componentInstance.filterAttributes[input] = !this.data.componentInstance.filterAttributes[input];
    }
  }