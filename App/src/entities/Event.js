import { decorate, observable } from 'mobx';

class Event {
    eventTitle;
    eventDescription;
    faculties;

    constructor(eventTitle, eventDescription, faculties) {
        this.eventTitle = eventTitle
        this.eventDescription = eventDescription;
        this.faculties = faculties;
    }

}

decorate(Event, {
    eventTitle: observable,
    eventDescription: observable,
    faculties: observable
});

export default Event;