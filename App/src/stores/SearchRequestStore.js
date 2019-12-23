import { observable, action, decorate } from 'mobx';
import SearchRequest from '../entities/SearchRequest';

class SearchRequestStore {
    /* Observables */
    search = new SearchRequest();

    /* Actions */
    setPlace = (place) => {
        this.search.place = place;
    }

    setDatetime = (datetime) => {
        this.search.datetime = datetime;
    }

    setEventSearch = (isEventSearch) => {
        this.search.isEventSearch = isEventSearch;
    }

    setFaculties = (faculties) => {
        this.search.faculties = faculties;
    }

    setRadius = (radius) => {
        this.search.radius = radius;
    }

    newSearch = () => {
        this.search = new SearchRequest();
    }

};

decorate(SearchRequestStore, {
    setPlace: action,
    setDatetime: action,
    setEventSearch: action,
    setFaculties: action,
    setRadius: action
});

export default new SearchRequestStore();