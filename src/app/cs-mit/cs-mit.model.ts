import { Course } from './lib/service/courses/courses.model';

export interface Group {
    label: string;
    description: string;
    completion: number;
    name: string;
}

export interface ScrapedInfo {
    courses: Array<Course>;
    constraintGroups: Array<Group>;
    mainGroups: Array<Group>;
}
