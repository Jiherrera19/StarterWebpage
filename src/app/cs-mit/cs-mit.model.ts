import { Course } from './lib/service/courses/courses.model';

export interface Group {
    label: string;
    description: string;
    completion: number;
    name: string;
    classes: Array<string>;
}

export interface ScrapedInfo {
    courses: Array<Course>;
    deptReq: MajorMainGroups;
    
}

export interface MajorMainGroups {
    "6-1": {
        constraintGroups: Array<Group>;
        mainGroups: Array<Group>;
    };
    "6-2": {
        constraintGroups: Array<Group>;
        mainGroups: Array<Group>;
    };
    "6-3": {
        constraintGroups: Array<Group>;
        mainGroups: Array<Group>;
    };
}
