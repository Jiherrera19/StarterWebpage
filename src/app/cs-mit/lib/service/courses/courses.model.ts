export interface Course {
    number: string;
    name: string;
    description: string;
    groups: Array<string>;
    prereqs: string;
    lecturers: Array<string>;
    units: Array<number>;
    ocw: string;
    participation: Particicpation;
    registrar: string;
}

export interface Particicpation {
    "6-1": Array<any>;
    "6-2": Array<any>;
    "6-3": Array<any>;
    "6-7": Array<any>;
    "6-14": Array<any>;
}