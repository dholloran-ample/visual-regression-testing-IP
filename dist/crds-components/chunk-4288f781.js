import { U as Utils } from './chunk-4786bf9d.js';

class Logger {
    /**
     * @param output Boolean
     */
    constructor(output = false) {
        this.debug = output;
    }
    /**
     * Log a message to the console if debug=true
     * @param ns String
     * @param msg String (optional)
     */
    log(ns, msg = '') {
        if (this.debug) {
            console.log(ns, msg);
        }
    }
}

class Config {
    /**
     * Returns space_id
     */
    space_id() {
        return Utils.getMeta('cfl:space_id') || "";
    }
    /**
     * Returns environment
     */
    env() {
        return Utils.getMeta('cfl:env') || "" || 'master';
    }
    /**
     * Returns delivery token
     */
    token() {
        return Utils.getMeta('cfl:token') || "";
    }
    /**
     * Returns service endpoint
     */
    endpoint() {
        return `https://cdn.contentful.com/spaces/${this.space_id()}/environments/${this.env()}`;
    }
}

export { Config as C, Logger as L };
