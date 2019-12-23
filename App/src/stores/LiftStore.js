import { observable, action, decorate } from 'mobx';
import Lift from '../entities/Lift';

class LiftStore {
    /* Observables */
    lift = new Lift();

    /* Actions */
    setDestination = (destination) => {
        this.lift.target = destination;
    }

    setPassengers = (passengers) => {
        this.lift.passengers = passengers;
    }

    setDatetime = (datetime) => {
        this.lift.datetime = datetime;
    }

    setPrice = (price) => {
        this.lift.price = price;
    }

    setEvent = (event) => {
        this.lift.event = event;
    }

    newLift = () => {
        this.lift = new Lift();
    }

};

decorate(LiftStore, {
    setDestination: action,
    setPassengers: action,
    setDatetime: action,
    setPrice: action,
    setEvent: action
});

export default new LiftStore();