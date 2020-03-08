import { observable, action, decorate } from 'mobx';
import Lift from '../entities/Lift';

/**
 * MobX Store for global Statemanagement for the Advertising Process of new Lifts.
 */
class LiftStore {
    /** Observable of the Store. */
    lift = new Lift();

    /* Actions of the Store */
    /**
     * MobX Action for setting the destination of the Lift.
     * @function
     * @param {City} destination Destination City of the Lift.
     */
    setDestination = (destination) => {
        this.lift.target = destination;
    }

    /**
     * MobX Action for setting the Number of passengers of the Lift.
     * @function
     * @param {Integer} passengers Number of passengers.
     */
    setPassengers = (passengers) => {
        this.lift.passengers = passengers;
    }

    /**
     * MobX Action for setting the date for the Lift.
     * @function
     * @param {Datetime} datetime Datetime of the Lift.
     */
    setDatetime = (datetime) => {
        this.lift.datetime = datetime;
    }

    /**
     * MobX Action for setting the price for the Lift.
     * @function
     * @param {Integer} price Price for other users to book the Lift.
     */
    setPrice = (price) => {
        this.lift.price = price;
    }

    /**
     * MobX Action for setting the Event, for which the Lift is advertised.
     * @function
     * @param {Event} event Event, for which the Lift is advertised.
     */
    setEvent = (event) => {
        this.lift.event = event;
    }

    /**
     * MobX Action for creating a new global Statemanagement Object to observe.
     * @function
     */
    newLift = () => {
        this.lift = new Lift();
    }

};

/* Decorates the methods of the store as MobX Actions. */
decorate(LiftStore, {
    setDestination: action,
    setPassengers: action,
    setDatetime: action,
    setPrice: action,
    setEvent: action
});

export default new LiftStore();