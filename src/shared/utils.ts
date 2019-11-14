import { ApolloClientService } from "../global/apollo";
import ApolloClient from "apollo-client";

export class Utils {
  public static apolloClient: ApolloClient<{}>;

  /**
   * Returns content metatag who's property matches "prop"
   * @param prop Value of metatags prop attribute
   */
  public static getMeta(prop): string {
    let el = document.querySelector(`meta[property*="${prop}"]`);
    if (el) {
      return el.getAttribute('content');
    }
  }

  /**
   * Returns a parameterized string
   * @param {String} str
   */
  public static parameterize(str): string {
    return str
      .toLowerCase()
      .replace(/[^a-z]/g, '-')
      .replace(/-{2,}/g, '-');
  }

  /**
   * Returns the value of a cookie after looking up by name
   * @param {String} name
   */
  public static getCookie(name): string {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2)
      return parts
        .pop()
        .split(';')
        .shift();
  }

  public static setCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 1440 * 60 * 1000);
    var expires = '; expires=' + date.toUTCString();
    document.cookie = name + '=' + value.toString() + expires + '; path=/;';
  }

  /**
   * Returns the appropriate subdomain based on the env
   * @param {String} env
   */
  public static getSubdomain(env) {
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
  public static imgixify(url) {
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
  public static trackInView(host: HTMLElement, componentName: string, dataFetch: () => {}) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window['analytics'].track(`${componentName}InView`, {
              target: entry.target,
              data: dataFetch()
            });
          }
        });
      },
      {
        threshold: 1.0
      }
    );

    observer.observe(host);
  }
  
  public static openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }
  
  public static isMobile(windowSize?): boolean {
    if (windowSize) return windowSize <= 768;
    return window.matchMedia(`(max-width: 768px)`).matches
  }

  //gets apollo client and runs init functions for component will load
  public static initComponent(initFunction: () => {}) {
    const clientSubject = new ApolloClientService().getClient();
    var promise = new Promise(resolve => {
      clientSubject.subscribe(client => {
        this.apolloClient = client;
        resolve(initFunction());
      });
    });

    return promise;
  }
}
