import { decorate, observable } from 'mobx';

/** Class representing a Faculty of OTH Regensburg. */
class Faculty {
    /** ID of the Faculty. */
    facultyId;
    /** Name of the Faculty. */
    name;

    /**
     * Initializes a new Faculty Object.
     * @param {Integer} facultyId ID of the Faculty.
     * @param {String} facultyName Name of the Faculty.
     */
    constructor(facultyId, facultyName) {
        this.facultyId = facultyId;
        this.name = facultyName;
    }

}

/* Decorates the Members of the class as MobX Observables. */
decorate(Faculty, {
    facultyId: observable,
    name: observable
});

export default Faculty;