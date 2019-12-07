import City from './City';

class Lift {

    constructor() {
        this.start = new City(43, 'Regensburg', 'Bavaria', 49.034512, 12.119234);
        this.target = null;
        this.passengers = null;
        this.datetime = null;
        this.price = null;
    }
    
}

export default Lift;