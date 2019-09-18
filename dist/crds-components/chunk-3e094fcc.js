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
        return Utils.getMeta('cfl:space_id') || "y3a9myzsdjan";
    }
    /**
     * Returns environment
     */
    env() {
        return Utils.getMeta('cfl:env') || "int" || 'master';
    }
    /**
     * Returns delivery token
     */
    token() {
        return Utils.getMeta('cfl:token') || "cdc473421d1e2f089515a5fe791ef575715b67024840b6aa1ee157b0e43d18d3";
    }
    /**
     * Returns service endpoint
     */
    endpoint() {
        return `https://cdn.contentful.com/spaces/${this.space_id()}/environments/${this.env()}`;
    }
}

export { Config as C, Logger as L };
