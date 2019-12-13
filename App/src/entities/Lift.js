import City from './City';
import SessionStore from '../stores/SessionStore';

class Lift {

    constructor() {
        this.user = SessionStore.sessionToken;
        this.start = new City(43, 'Regensburg', 'Bavaria', 49.034512, 12.119234);
        this.target = null;
        this.passengers = null;
        this.datetime = null;
        this.price = null;
        this.event = null;
    }
    
}

export default Lift;