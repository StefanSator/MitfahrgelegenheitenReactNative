import { decorate, observable } from 'mobx';

/** Class representing a Search Request for Lifts. */
class SearchRequest {
    /** The Destination City to which the user wants a Lift. */
    place;
    /** The Date on which the user wants to search for Lifts. */
    datetime;
    /** True, if user wants to search for Lifts to Events. False, if user wants to search for private Lifts. */
    isEventSearch;
    /** List of Faculty Objects. Only Lifts should be searched, which are interesting for the specified Faculties. */
    faculties;
    /** Search Radius. */
    radius;

    /**
     * Initializes a new empty SearchRequest Object.
     */
    constructor() {
        this.place = null;
        this.datetime = null;
        this.isEventSearch = false;
        this.faculties = null;
        this.radius = 0;
    }

}

/* Decorate the Members of the Class as MobX Observables. */
decorate(SearchRequest, {
    place: observable,
    datetime: observable,
    isEventSearch: observable,
    faculties: observable,
    radius: observable
});

export default SearchRequest;