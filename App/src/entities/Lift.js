import City from './City';
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
        this.passengers = null;
        this.price = null;
        this.event = null;
        this.datetime = null;
    }
    
}

decorate(Lift, {
    user: observable,
    passengers: observable,
    price: observable
});

export default Lift;