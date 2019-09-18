'use strict';

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

class Utils {
    /**
     * Returns content metatag who's property matches "prop"
     * @param prop Value of metatags prop attribute
     */
    static getMeta(prop) {
        let el = document.querySelector(`meta[property*="${prop}"]`);
        if (el) {
            return el.getAttribute('content');
        }
    }
    /**
     * Returns a parameterized string
     * @param {String} str
     */
    static parameterize(str) {
        return str
            .toLowerCase()
            .replace(/[^a-z]/g, '-')
            .replace(/-{2,}/g, '-');
    }
    /**
     * Returns the value of a cookie after looking up by name
     * @param {String} name
     */
    static getCookie(name) {
        var value = '; ' + document.cookie;
        var parts = value.split('; ' + name + '=');
        if (parts.length == 2)
            return parts
                .pop()
                .split(';')
                .shift();
    }
    /**
     * Returns the appropriate subdomain based on the env
     * @param {String} env
     */
    static getSubdomain(env) {
        const subdomainMap = {
            development: 'int',
            prod: 'www',
            production: 'www'
        };
        return subdomainMap[env] || env;
    }
    /**
     * Swaps the Contentful domain for Imgix on images
     * @param {String} url
     */
    static imgixify(url) {
        const ctflDomain = 'images.ctfassets.net/y3a9myzsdjan';
        const imgixDomain = 'crds-media.imgix.net';
        return url.replace(ctflDomain, imgixDomain);
    }
    /**
     *  Adds tracking analytics for when the component comes in view
     *  @param {HTMLElement} host
     *  @param {string} componentName
     *  @param {function} dataFetch
     */
    static trackInView(host, componentName, dataFetch) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window['analytics'].track(`${componentName}InView`, {
                        target: entry.target,
                        data: dataFetch()
                    });
                }
            });
        }, {
            threshold: 1.0
        });
        observer.observe(host);
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

exports.Config = Config;
exports.Logger = Logger;
exports.Utils = Utils;
