import { U as Utils } from './chunk-ccfe1019.js';

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
        return Utils.getMeta('cfl:space_id') || "lkrmxse64d8p";
    }
    /**
     * Returns environment
     */
    env() {
        return Utils.getMeta('cfl:env') || "master" || 'master';
    }
    /**
     * Returns delivery token
     */
    token() {
        return Utils.getMeta('cfl:token') || "0f27aa9ad58b87224832b8baab321fcceb407e2b8e18aa06ac238d3e6f8d088c";
    }
    /**
     * Returns service endpoint
     */
    endpoint() {
        return `https://cdn.contentful.com/spaces/${this.space_id()}/environments/${this.env()}`;
    }
}

export { Config as C, Logger as L };
