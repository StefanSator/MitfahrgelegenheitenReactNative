import { observable, action, decorate } from 'mobx';

class SessionStore {
    /* Observables */
    sessionToken = 0;

    /* Actions */
    setSessionToken = (sessionToken) => {
        this.sessionToken = sessionToken;
    }

    endSession = () => {
        this.sessionToken = 0;
    }

};

decorate(SessionStore, {
    sessionToken: observable,
    setSessionToken: action,
    endSession: action
});

export default new SessionStore();