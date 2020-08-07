import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Course } from '../../lib/service/courses/courses.model';
import { Group } from '../../cs-mit.model';

@Component({
  selector: 'app-group-stats',
  templateUrl: './group-stats.component.html',
  styleUrls: ['./group-stats.component.css'],
})
export class GroupStatsComponent implements OnInit {
  @Input() courses: Array<Course>;
  @Input() mainGroups: Array<Group>;
  options: any;

  constructor() {}

  ngOnInit(): void {
    this.createGraph();
  }

  createGraph() {
    const xAxisData = [];
    const data = [];
    const colors = ["#BAC1B8", "#58A4B0", "#0C7C59", "#2B303A", "#D64933", "#05A8AA", "#B8D5B8", "#D7B49E", "#DC602E", "#BC412B"];

    for (let i = 0; i < this.mainGroups.length; i++) {
      xAxisData.push(this.mainGroups[i].label);
      data.push({value: 100, itemStyle: {color: colors[i]}});
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
        }
      },
      series: [
        {
          name: 'class-groups',
          type: 'bar',
          data: data,
          animationDelay: (idx) => idx * 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }
}