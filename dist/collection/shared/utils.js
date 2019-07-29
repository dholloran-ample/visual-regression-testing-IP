export class Utils {
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
}
