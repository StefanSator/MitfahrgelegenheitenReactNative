import { observable, action, decorate } from 'mobx';

/**
 * MobX Store for global Statemanagement of the User Session.
 */
class SessionStore {
    /* Observable of the Store. */
    sessionToken = 0;

    /* Actions of the Store. */
    /**
     * MobX Action for setting the Session Token.
     * @function
     * @param {Integer} sessionToken User Token, which is needed to identify the user to the backend service.
     * Is returned as response of the backend, during the user login.
     */
    setSessionToken = (sessionToken) => {
        this.sessionToken = sessionToken;
    }

    /**
     * MobX Action for ending the User Session, by reseting the Session Token.
     * @function
     */
    endSession = () => {
        this.sessionToken = 0;
    }

};

/* Decorates the methods of the store as MobX Actions and the Member of the class as a MobX Observable. */
decorate(SessionStore, {
    sessionToken: observable,
    setSessionToken: action,
    endSession: action
});

export default new SessionStore();