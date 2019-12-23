import { decorate, observable } from 'mobx';

class SearchRequest {
    place;
    datetime;
    isEventSearch;
    faculties;
    radius;

    constructor() {
        this.place = null;
        this.datetime = null;
        this.isEventSearch = false;
        this.faculties = null;
        this.radius = 0;
    }

}

decorate(SearchRequest, {
    place: observable,
    datetime: observable,
    isEventSearch: observable,
    faculties: observable,
    radius: observable
});

export default SearchRequest;