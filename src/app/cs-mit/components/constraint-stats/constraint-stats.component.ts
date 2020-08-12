import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Group } from '../../cs-mit.model';
import { Course } from '../../lib/service/courses/courses.model';
import { CoursesService } from '../../lib/service/courses/courses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-constraint-stats',
  templateUrl: './constraint-stats.component.html',
  styleUrls: ['./constraint-stats.component.css']
})
export class ConstraintStatsComponent implements OnInit, OnDestroy {
  @Input() courses: Array<Course>;
  @Input() constraintGroups: Array<Group>;
  options: any;

  updateGraphSubscription: Subscription;
  chart: any;
  
  constructor(private coursesService: CoursesService) {
    this.updateGraphSubscription = this.coursesService.pickedCoursesSubject.subscribe((courses) => {
      this.updateGraph(courses);
    });
  }
  ngOnDestroy(): void {
    this.updateGraphSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.setupGraph();
  }

  updateGraph(courses: Course[]) {
    this.constraintGroups.forEach(group => {
      group.completion[0] = 0;
    });
    
    this.constraintGroups.forEach((group, index) => {
      courses.forEach(course => {
        if (course && course.groups.includes(group.name)) {
          this.constraintGroups[index].completion[0]++;
        }
      });
      this.options.dataset.source[index][0] = group.completion[0]/group.completion[1];
    });
    if (this.chart) { this.chart.setOption(this.options) }
    
  }

  onChartInit(chart) {
    this.chart = chart;
  }

  setupGraph() {
    const data = this.constraintGroups.map((group: Group) => {
      return [group.completion, group.label]
    });
    const colors = ["#2B303A", "#58A4B0"];


    this.options = {
      dataset: {
        source: data
    },
    grid: {containLabel: true},
    title: {
      text: "Additional Constraints"
    },
    xAxis: {
      show: false,
      max: 1
    },
    yAxis: {
      type: 'category'
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0,
      formatter: (params) => {
        return `<b>${params['name']}</b> : ${this.getCompletionFraction(params['name'])}`;
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: 100,
      dimension: 0,
      inRange: {
          color: colors
      }
    },
    series: [
        {
            type: 'bar',
            showBackground: true,
            encode: {
                // Map the "constraint" column to Y axis
                y: 'constraint'
            }
        }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => idx * 5,
    };
  }

  onChartFinished() {
    this.coursesService.constraintFinishedRenderingSubject.next();
  }

  getCompletionFraction(groupName) {
    let ret = '???';
    this.constraintGroups.forEach((group) => {
      if (group.label === groupName) {
        ret = group.completion[0] + ' / ' + group.completion[1];
      }
    });
    return ret;
  }
}
