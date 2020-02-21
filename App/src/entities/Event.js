import { decorate, observable } from 'mobx';

class Event {
    eventTitle;
    eventDescription;
    faculties;

    constructor() {
        this.eventTitle = '';
        this.eventDescription = '';
        this.faculties = null;
    }

}

decorate(Event, {
    eventTitle: observable,
    eventDescription: observable
});

export default Event;