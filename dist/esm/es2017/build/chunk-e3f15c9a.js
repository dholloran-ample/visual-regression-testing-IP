import { h } from '../crds-components.core.js';

class Utils {
    static getMeta(prop) {
        let el = document.querySelector(`meta[property*="${prop}"]`);
        if (el) {
            return el.getAttribute('content');
        }
    }
    static parameterize(str) {
        return str
            .toLowerCase()
            .replace(/[^a-z]/g, '-')
            .replace(/-{2,}/g, '-');
    }
    static getCookie(name) {
        var value = '; ' + document.cookie;
        var parts = value.split('; ' + name + '=');
        if (parts.length == 2)
            return parts
                .pop()
                .split(';')
                .shift();
    }
}

class Logger {
    constructor(output = false) {
        this.debug = output;
    }
    log(ns, msg = '') {
        if (this.debug) {
            console.log(ns, msg);
        }
    }
}

class Config {
    space_id() {
        return Utils.getMeta('cfl:space_id') || "lkrmxse64d8p";
    }
    env() {
        return Utils.getMeta('cfl:env') || "master" || 'master';
    }
    token() {
        return Utils.getMeta('cfl:token') || "0f27aa9ad58b87224832b8baab321fcceb407e2b8e18aa06ac238d3e6f8d088c";
    }
    endpoint() {
        return `https://cdn.contentful.com/spaces/${this.space_id()}/environments/${this.env()}`;
    }
}

export { Utils as a, Logger as b, Config as c };
