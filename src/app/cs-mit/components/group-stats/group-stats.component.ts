import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Course } from '../../lib/service/courses/courses.model';
import { Group } from '../../cs-mit.model';
import { CoursesService } from '../../lib/service/courses/courses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-stats',
  templateUrl: './group-stats.component.html',
  styleUrls: ['./group-stats.component.css'],
})
export class GroupStatsComponent implements OnInit, OnDestroy {
  @Input() courses: Array<Course>;
  @Input() mainGroups: Array<Group>;
  options: any;
  chart: any;

  updateGraphSubscription: Subscription;

  constructor(private coursesService: CoursesService) {
    this.updateGraphSubscription = this.coursesService.pickedCoursesSubject.subscribe((courses) => {
      this.updateGraph(courses);
    });
  }
  ngOnDestroy(): void {
    this.updateGraphSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.createGraph();
  }

  onChartInit(chart) {
    this.chart = chart;
  }

  updateGraph(courses) {
    this.mainGroups.forEach(group => {
      group.completion[0] = 0;
    });
    
    this.mainGroups.forEach((group, index) => {
      courses.forEach(course => {
        if (course && group.classes.includes(course.number)) {
          this.mainGroups[index].completion[0]++;
        }
      });
      this.options.series[0].data[index].value = group.completion[0]/group.completion[1];
    });
    this.chart.setOption(this.options);
  }

  createGraph() {
    const xAxisData = [];
    const yAxisData = [];
    const colors = ["#BAC1B8", "#58A4B0", "#0C7C59", "#2B303A", "#D64933", "#05A8AA", "#B8D5B8", "#D7B49E", "#DC602E", "#BC412B"];

    for (let i = 0; i < this.mainGroups.length; i++) {
      xAxisData.push(this.mainGroups[i].label);
      yAxisData.push({value: 0, itemStyle: {color: colors[i]}});
    }

    this.options = {
      legend: {
        show: false
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0,
        formatter: function (params) {
          return `<b>${params['name']}</b> : ${params['value']}`;
        }
      },
      title: {
        text: "Departmental Requirements"
      },
      xAxis: {
        data: xAxisData,
        type: 'category',
        silent: false,
        splitLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#000',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        }
      },
      yAxis: {
        silent: true,
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        max: 1
      },
      series: [
        {
          name: 'class-groups',
          type: 'bar',
          showBackground: true,
          data: yAxisData,
          animationDelay: (idx) => idx * 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }

  onChartFinished() {
    this.coursesService.constraintFinishedRenderingSubject.next();
  }
}