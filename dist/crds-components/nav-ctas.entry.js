import { r as registerInstance, h } from './chunk-67523e50.js';

/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isExtendable = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
};

'use strict';



var extendShallow = function extend(o/*, objects*/) {
  if (!isExtendable(o)) { o = {}; }

  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    var obj = arguments[i];

    if (isExtendable(obj)) {
      assign(o, obj);
    }
  }
  return o;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

'use strict';


var regexCache = {};
var all;

var charSets = {
  default: {
    '&quot;': '"',
    '&#34;': '"',

    '&apos;': '\'',
    '&#39;': '\'',

    '&amp;': '&',
    '&#38;': '&',

    '&gt;': '>',
    '&#62;': '>',

    '&lt;': '<',
    '&#60;': '<'
  },
  extras: {
    '&cent;': '¢',
    '&#162;': '¢',

    '&copy;': '©',
    '&#169;': '©',

    '&euro;': '€',
    '&#8364;': '€',

    '&pound;': '£',
    '&#163;': '£',

    '&reg;': '®',
    '&#174;': '®',

    '&yen;': '¥',
    '&#165;': '¥'
  }
};

// don't merge char sets unless "all" is explicitly called
Object.defineProperty(charSets, 'all', {
  get: function() {
    return all || (all = extendShallow({}, charSets.default, charSets.extras));
  }
});

/**
 * Convert HTML entities to HTML characters.
 *
 * @param  {String} `str` String with HTML entities to un-escape.
 * @return {String}
 */

function unescape(str, type) {
  if (!isString(str)) return '';
  var chars = charSets[type || 'default'];
  var regex = toRegex(type, chars);
  return str.replace(regex, function(m) {
    return chars[m];
  });
}

function toRegex(type, chars) {
  if (regexCache[type]) {
    return regexCache[type];
  }
  var keys = Object.keys(chars).join('|');
  var regex = new RegExp('(?=(' + keys + '))\\1', 'g');
  regexCache[type] = regex;
  return regex;
}

/**
 * Returns true if str is a non-empty string
 */

function isString(str) {
  return str && typeof str === 'string';
}

/**
 * Expose charSets
 */

unescape.chars = charSets.default;
unescape.extras = charSets.extras;
// don't trip the "charSets" getter unless it's explicitly called
Object.defineProperty(unescape, 'all', {
  get: function() {
    return charSets.all;
  }
});

/**
 * Expose `unescape`
 */

var _unescape = unescape;

class NavCtas {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    decodedData() {
        return _unescape(this.data || '');
    }
    render() {
        if (this.active)
            return null;
        return h("div", { class: "ctas", innerHTML: this.decodedData() });
    }
    static get style() { return ".ctas {\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif !important;\n  font-weight: 300 !important;\n  padding: 40px 20px 0;\n}\n\@media (max-width: 992px) {\n  .ctas {\n    width: calc(100vw - 40px);\n  }\n}\n\@media (min-width: 992px) {\n  .ctas {\n    padding: 70px 0 0;\n  }\n}\n.ctas h3 {\n  font-size: 11px;\n  margin-top: 0;\n  opacity: 0.5;\n  text-transform: uppercase;\n}\n\n.cta {\n  background-color: rgba(21, 21, 21, 0.8);\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 10px;\n  text-decoration: none;\n}\n.cta-image {\n  height: 75px;\n}\n.cta-image img {\n  height: 75px;\n  width: 100px;\n}\n.cta-content {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: center;\n  justify-content: center;\n  padding: 0 20px;\n  width: 100%;\n}\n.cta-content h4 {\n  color: white;\n  font-size: 14px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.cta-content h4,\n.cta-content p {\n  margin: 0;\n}\n.cta-content p {\n  color: #979797;\n  font-size: 12px;\n  font-weight: 300;\n  line-height: 18px;\n}\n.cta:hover-content h4 {\n  color: #cccccc;\n}\n\n.more-updates {\n  color: #0095d9;\n  font-size: 12px;\n  text-decoration: none;\n  text-transform: capitalize;\n}"; }
}

export { NavCtas as nav_ctas };
