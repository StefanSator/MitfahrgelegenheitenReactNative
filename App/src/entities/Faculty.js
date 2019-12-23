import { decorate, observable } from 'mobx';

class Faculty {
    facultyId;
    name;

    constructor(facultyId, facultyName) {
        this.facultyId = facultyId;
        this.name = facultyName;
    }

}

decorate(Faculty, {
    facultyId: observable,
    name: observable
});

export default Faculty;