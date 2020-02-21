import City from './City';
import Event from './Event';
import SessionStore from '../stores/SessionStore';
import { decorate, observable } from 'mobx';

class Lift {
    user;
    start;
    target;
    passengers;
    price;
    event;
    datetime;

    constructor() {
        this.user = SessionStore.sessionToken;
        this.start = new City(43, 'Regensburg', 'Bavaria', 49.034512, 12.119234);
        this.target = null;
        this.passengers = 1;
        this.price = 5;
        this.event = new Event();
        this.datetime = null;
    }
    
}

decorate(Lift, {
    user: observable,
    passengers: observable,
    price: observable
});

export default Lift;