import { decorate, observable } from 'mobx';

/** Class representing the Event to which the lift was advertised for. */
class Event {
    /** Name of the Event. */
    eventTitle;
    /** Description for the Event. */
    eventDescription;
    /** List of Faculty Objects, for which the Event is interesting. */
    faculties;

    /**
     * Initializes a new empty Event Object.
     */
    constructor() {
        this.eventTitle = '';
        this.eventDescription = '';
        this.faculties = null;
    }

}

/* Decorates the Members of the class as MobX Observables. */
decorate(Event, {
    eventTitle: observable,
    eventDescription: observable
});

export default Event;