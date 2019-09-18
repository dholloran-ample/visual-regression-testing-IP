var Logger = /** @class */ (function () {
    /**
     * @param output Boolean
     */
    function Logger(output) {
        if (output === void 0) { output = false; }
        this.debug = output;
    }
    /**
     * Log a message to the console if debug=true
     * @param ns String
     * @param msg String (optional)
     */
    Logger.prototype.log = function (ns, msg) {
        if (msg === void 0) { msg = ''; }
        if (this.debug) {
            console.log(ns, msg);
        }
    };
    return Logger;
}());
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Returns content metatag who's property matches "prop"
     * @param prop Value of metatags prop attribute
     */
    Utils.getMeta = function (prop) {
        var el = document.querySelector("meta[property*=\"" + prop + "\"]");
        if (el) {
            return el.getAttribute('content');
        }
    };
    /**
     * Returns a parameterized string
     * @param {String} str
     */
    Utils.parameterize = function (str) {
        return str
            .toLowerCase()
            .replace(/[^a-z]/g, '-')
            .replace(/-{2,}/g, '-');
    };
    /**
     * Returns the value of a cookie after looking up by name
     * @param {String} name
     */
    Utils.getCookie = function (name) {
        var value = '; ' + document.cookie;
        var parts = value.split('; ' + name + '=');
        if (parts.length == 2)
            return parts
                .pop()
                .split(';')
                .shift();
    };
    /**
     * Returns the appropriate subdomain based on the env
     * @param {String} env
     */
    Utils.getSubdomain = function (env) {
        var subdomainMap = {
            development: 'int',
            prod: 'www',
            production: 'www'
        };
        return subdomainMap[env] || env;
    };
    /**
     * Swaps the Contentful domain for Imgix on images
     * @param {String} url
     */
    Utils.imgixify = function (url) {
        var ctflDomain = 'images.ctfassets.net/y3a9myzsdjan';
        var imgixDomain = 'crds-media.imgix.net';
        return url.replace(ctflDomain, imgixDomain);
    };
    /**
     *  Adds tracking analytics for when the component comes in view
     *  @param {HTMLElement} host
     *  @param {string} componentName
     *  @param {function} dataFetch
     */
    Utils.trackInView = function (host, componentName, dataFetch) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    window['analytics'].track(componentName + "InView", {
                        target: entry.target,
                        data: dataFetch()
                    });
                }
            });
        }, {
            threshold: 1.0
        });
        observer.observe(host);
    };
    return Utils;
}());
var Config = /** @class */ (function () {
    function Config() {
    }
    /**
     * Returns space_id
     */
    Config.prototype.space_id = function () {
        return Utils.getMeta('cfl:space_id') || "y3a9myzsdjan";
    };
    /**
     * Returns environment
     */
    Config.prototype.env = function () {
        return Utils.getMeta('cfl:env') || "int" || 'master';
    };
    /**
     * Returns delivery token
     */
    Config.prototype.token = function () {
        return Utils.getMeta('cfl:token') || "cdc473421d1e2f089515a5fe791ef575715b67024840b6aa1ee157b0e43d18d3";
    };
    /**
     * Returns service endpoint
     */
    Config.prototype.endpoint = function () {
        return "https://cdn.contentful.com/spaces/" + this.space_id() + "/environments/" + this.env();
    };
    return Config;
}());
export { Config as C, Logger as L, Utils as U };
