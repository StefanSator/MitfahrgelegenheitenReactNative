import { decorate, observable } from 'mobx';

/**
 * Class representing a City, which can be the start or the target of a lift.
 */
class City {
    /** ID of the City. */
    cityId;
    /** Name of the City. */
    cityName;
    /** State, to which the City belongs to. */
    state;
    /** Latitude of the City. */
    lat;
    /** Longitude of the City. */
    lng;

    /**
     * Initialize a City Object.
     * @param {Integer} cityId ID of the City.
     * @param {String} cityName Name of the City.
     * @param {String} state State, to which the City belongs to.
     * @param {Double} lat Latitude of the City.
     * @param {Double} lng Longitude of the City.
     */
    constructor(cityId, cityName, state, lat, lng) {
        this.cityId = cityId;
        this.cityName = cityName;
        this.state = state;
        this.lat = lat;
        this.lng = lng;
    }
};

/* Decorates the Members of the class as MobX Observables. */
decorate(City, {
    cityId: observable,
    cityName: observable,
    state: observable,
    lat: observable,
    lng: observable
})

export default City;