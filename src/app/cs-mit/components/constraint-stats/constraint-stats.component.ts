import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../../cs-mit.model';
import { Course } from '../../lib/service/courses/courses.model';

@Component({
  selector: 'app-constraint-stats',
  templateUrl: './constraint-stats.component.html',
  styleUrls: ['./constraint-stats.component.css']
})
export class ConstraintStatsComponent implements OnInit {
  @Input() courses: Array<Course>;
  @Input() constraintGroups: Array<Group>;
  options: any;
  
  constructor() { }

  ngOnInit(): void {
    this.setupGraph();
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
      show: false
    },
    yAxis: {
      type: 'category'
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0,
      formatter: function (params) {
        return `<b>${params['name']}</b> : ${params['value']}`;
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

}
