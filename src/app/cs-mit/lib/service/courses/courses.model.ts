export interface Course {
    number: string;
    name: string;
    description: string;
    groups: Array<string>;
    prereqs: string;
    lecturers: Array<string>;
    units: Array<number>;
}