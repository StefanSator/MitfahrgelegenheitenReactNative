import { decorate, observable } from 'mobx';

class Datetime {
    day;
    month;
    year;
    hour;
    minutes;

    constructor(day, month, year, hour, minutes) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.hour = hour;
        this.minutes = minutes;
    }
}

decorate(Datetime, {
    day: observable,
    month: observable,
    year: observable,
    hour: observable,
    minutes: observable
});

export default Datetime;