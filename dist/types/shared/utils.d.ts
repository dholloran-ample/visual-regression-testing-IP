export declare class Utils {
    /**
     * Returns content metatag who's property matches "prop"
     * @param prop Value of metatags prop attribute
     */
    static getMeta(prop: any): string;
    /**
     * Returns a parameterized string
     * @param {String} str
     */
    static parameterize(str: any): string;
    /**
     * Returns the value of a cookie after looking up by name
     * @param {String} name
     */
    static getCookie(name: any): string;
    /**
     * Returns the appropriate subdomain based on the env
     * @param {String} env
     */
    static getSubdomain(env: any): any;
    /**
     * Swaps the Contentful domain for Imgix on images
     * @param {String} url
     */
    static imgixify(url: any): any;
    /**
     *  Adds tracking analytics for when the component comes in view
     *  @param {HTMLElement} host
     *  @param {string} componentName
     *  @param {function} dataFetch
     */
    static trackInView(host: HTMLElement, componentName: string, dataFetch: () => {}): void;
}
