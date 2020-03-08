import { decorate, observable } from 'mobx';

/** Class representing the Datetime on which the lift will be. */
class Datetime {
    /** Day of the Lift. */
    day;
    /** Month of the Lift. */
    month;
    /** Year of the Lift. */
    year;
    /** Hour of the Lift. */
    hour;
    /** Minutes of the Lift. */
    minutes;
    /** String representing the Date. Format: DDMMYYYY. */
    dateString;

    /**
     * Initializes a new Datetime Object.
     * @param {Integer} day Day of the Lift.
     * @param {Integer} month Month of the Lift.
     * @param {Integer} year Year of the Lift.
     * @param {Integer} hour Hour of the Lift.
     * @param {Integer} minutes Minutes of the Lift.
     */
    constructor(day, month, year, hour, minutes) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.hour = hour;
        this.minutes = minutes;
        this.dateString = day.toString().padStart(2, '0') + month.toString().padStart(2, '0') + year.toString().padStart(4, '0');
    }
}

/* Decorates the Members of the class as MobX Observables. */
decorate(Datetime, {
    day: observable,
    month: observable,
    year: observable,
    hour: observable,
    minutes: observable,
    dateString: observable
});

export default Datetime;