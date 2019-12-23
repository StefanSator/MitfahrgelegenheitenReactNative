import { decorate, observable } from 'mobx';

class City {
    cityId;
    cityName;
    state;
    lat;
    lng;

    constructor(cityId, cityName, state, lat, lng) {
        this.cityId = cityId;
        this.cityName = cityName;
        this.state = state;
        this.lat = lat;
        this.lng = lng;
    }
};

decorate(City, {
    cityId: observable,
    cityName: observable,
    state: observable,
    lat: observable,
    lng: observable
})

export default City;