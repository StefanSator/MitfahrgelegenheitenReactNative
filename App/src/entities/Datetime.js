import { decorate, observable } from 'mobx';

class Datetime {
    day;
    month;
    year;
    hour;
    minutes;
    dateString;

    constructor(day, month, year, hour, minutes) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.hour = hour;
        this.minutes = minutes;
        this.dateString = day.toString().padStart(2, '0') + month.toString().padStart(2, '0') + year.toString().padStart(4, '0');
    }
}

decorate(Datetime, {
    day: observable,
    month: observable,
    year: observable,
    hour: observable,
    minutes: observable,
    dateString: observable
});

export default Datetime;