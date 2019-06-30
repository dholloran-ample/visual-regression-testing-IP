export class Logger {
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
