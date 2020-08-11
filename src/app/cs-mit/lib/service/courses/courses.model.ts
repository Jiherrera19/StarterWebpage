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
    addedToPersonal: boolean;
    attributes: string[];
}

export interface Particicpation {
    "6-1": Array<string> | undefined;
    "6-2": Array<string> | undefined;
    "6-3": Array<string> | undefined;
    "6-7": Array<string> | undefined;
    "6-14": Array<string> | undefined;
}