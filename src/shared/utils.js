export default class Utils {
  /**
   * Returns content metatag who's property matches "prop"
   * @param prop Value of metatags prop attribute
   */
  static getMeta(prop) {
    let el = document.querySelector(`meta[property*="${prop}"]`);
    if (el) {
      return el.getAttribute("content");
    }
  }
}
