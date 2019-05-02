import { debug } from 'util';

export default class Utils {
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
}
