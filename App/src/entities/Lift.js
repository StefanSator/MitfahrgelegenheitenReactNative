import City from './City';
import Event from './Event';
import SessionStore from '../stores/SessionStore';
import { decorate, observable } from 'mobx';

/** Class representing a Lift. */
class Lift {
    /** The ID of the user, who advertised the Lift. */
    user;
    /** The Start City of the Lift. */
    start;
    /** The Target City of the Lift. */
    target;
    /** The Number of Passengers. */
    passengers;
    /** The Price of the Lift. */
    price;
    /** The Event, for which the Lift was advertised. */
    event;
    /** The Date on which the lift is planned. */
    datetime;

    /**
     * Initializes a new empty Lift Object.
     */
    constructor() {
        this.user = SessionStore.sessionToken;
        this.start = new City(43, 'Regensburg', 'Bavaria', 49.034512, 12.119234);
        this.target = null;
        this.passengers = 1;
        this.price = 0;
        this.event = new Event();
        this.datetime = null;
    }
    
}

/* Decorates the members of the class as MobX Observables. */
decorate(Lift, {
    user: observable,
    passengers: observable,
    price: observable
});

export default Lift;