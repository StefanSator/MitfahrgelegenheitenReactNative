import { observable, action, decorate } from 'mobx';
import SearchRequest from '../entities/SearchRequest';

/**
 * MobX Store for global Statemanagement for the Search Process of Lifts.
 */
class SearchRequestStore {
    /** Observable of the Store. */
    search = new SearchRequest();

    /* Actions of the Store. */
    /**
     * MobX Action for setting the destination place of the Search Request.
     * @function
     * @param {City} place Destination Place of the Search Request.
     */
    setPlace = (place) => {
        this.search.place = place;
    }

    /**
     * MobX Action for setting the Date of the Search Request.
     * @function
     * @param {Datetime} datetime Date, on which the User wants to search for Lifts.
     */
    setDatetime = (datetime) => {
        this.search.datetime = datetime;
    }

    /**
     * MobX Action for setting if the searcher wants to search for events or private lifts.
     * @function
     * @param {Boolean} isEventSearch True, user wants to search for events. False, user wants to search for private lifts.
     */
    setEventSearch = (isEventSearch) => {
        this.search.isEventSearch = isEventSearch;
    }

    /**
     * MobX Action for setting the faculties. This filters only Events which are interesting for the specified faculties.
     * @function
     * @param {Faculty[]} faculties List of Faculty Objects.
     */
    setFaculties = (faculties) => {
        this.search.faculties = faculties;
    }

    /**
     * MobX Action for setting the search radius. Only lifts inside the search radius are searched.
     * @function
     * @param {Integer} radius The search radius.
     */
    setRadius = (radius) => {
        this.search.radius = radius;
    }

    /**
     * MobX Action for creating a new global Statemanagement Object to observe.
     * @function
     */
    newSearch = () => {
        this.search = new SearchRequest();
    }

};

/* Decorates the methods of the store as MobX Actions. */
decorate(SearchRequestStore, {
    setPlace: action,
    setDatetime: action,
    setEventSearch: action,
    setFaculties: action,
    setRadius: action
});

export default new SearchRequestStore();