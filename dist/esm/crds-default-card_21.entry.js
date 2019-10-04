import { r as registerInstance, h, g as getElement } from './core-9036992e.js';
import { g as gql, C as CrdsApollo, p as process, c as createCommonjsModule, a as ContentBlockHandler, b as global, d as commonjsGlobal, n as nextTick } from './contentBlocks-ba35feaa.js';

const CrdsDefaultLayout = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.icons = {
            article: 'media-article',
            video: 'media-video',
            message: 'media-video',
            series: 'media-video',
            episode: 'media-podcast',
            song: 'media-music'
        };
    }
    render() {
        const { imageSrc, heading, meta, metaPosition, thumbnailSrc, url, contentType, icons } = this;
        return (h("div", { class: "card-wrapper" }, h("a", { class: "card-image-wrapper", href: url }, imageSrc && h("crds-image", { src: imageSrc, size: "card" }), icons[contentType] && (h("div", { class: "card-stamp-container" }, h("crds-icon", { name: icons[contentType], size: '15', color: 'white' }), h("span", { class: "card-stamp" }, contentType))), thumbnailSrc && (h("div", { class: "card-thumbnail" }, h("crds-image", { src: thumbnailSrc, size: "thumbnail" })))), metaPosition == 'top' && h("span", { class: "card-meta-top" }, meta), heading && (h("a", { class: `card-heading`, href: url }, heading)), metaPosition == 'bottom' && h("span", { class: "card-meta-bottom" }, meta), h("div", { class: "card-content" }, h("slot", null))));
    }
    get element() { return getElement(this); }
    static get style() { return ".card-wrapper{margin-bottom:2.75rem;max-width:360px;font-family:acumin-pro,helvetica,arial,sans-serif}.card-image-wrapper{margin-bottom:.5rem;overflow:hidden;position:relative;display:block}.card-stamp-container{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:hsla(0,0%,9%,.9);top:1rem;padding:.5rem;position:absolute;left:1rem;display:-ms-flexbox;display:flex;max-height:28px}.card-stamp-container .card-stamp{margin-left:.25rem}.card-stamp{display:inline-block;color:#fff;font-size:.625rem;font-weight:600;text-transform:uppercase;line-height:1}.card-meta-top{color:#555;display:block;font-size:.8125rem;line-height:1.67}.card-heading,.card-meta-top{font-weight:500;text-transform:uppercase}.card-heading{color:#333;font-family:acumin-pro-extra-condensed,sans-serif;font-size:38px;line-height:.89;margin:0 0 .5rem;-webkit-transition:color .3s;transition:color .3s;text-decoration:none}.card-heading:hover{color:#000}.card-meta-bottom{color:#777;display:block;font-size:.8125rem;font-weight:300;line-height:1;margin:0;margin-bottom:.5rem}.card-content{overflow-y:hidden}.card-content p{display:block;font-size:1rem;font-weight:300;line-height:24px;color:#333;margin:0}.inactive{display:none}.card-button{display:inline-block;background-color:#3b6e8f;color:#fff;border-radius:4px;margin-top:1.375rem;text-decoration:none;cursor:pointer;height:43px;vertical-align:middle;line-height:43px;padding:0 1rem;font-size:.875rem}.card-thumbnail{background-color:hsla(0,0%,9%,.9);top:1rem;position:absolute;right:1rem;max-width:65px;max-height:65px}::slotted(p){display:block;font-size:1rem;font-weight:300;line-height:24px;color:#333;margin:0}"; }
};

const GET_USER = gql `
  {
    user {
      firstName
      nickName
    }
  }
`;

const CrdsGreeting = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.user = null;
        this.displayName = null;
    }
    authTokenHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.apolloClient = CrdsApollo(newValue);
            this.getUser();
        }
    }
    componentWillLoad() {
        this.apolloClient = CrdsApollo(this.authToken);
    }
    componentWillRender() {
        if (this.authToken)
            return this.getUser();
    }
    componentDidRender() {
        const renderedEvent = new CustomEvent('component rendered', {
            detail: this.host
        });
        document.dispatchEvent(renderedEvent);
        setTimeout(() => {
            this.host.shadowRoot.querySelector('.greeting').classList.add('fade-in');
        }, 0);
    }
    getUser() {
        return this.apolloClient
            .query({ query: GET_USER })
            .then(success => {
            this.user = success.data.user;
            this.getDisplayName();
            return;
        })
            .catch(err => {
            this.getDisplayName();
            this.logError(err);
        });
    }
    getDisplayName() {
        this.displayName = (this.user && (this.user.nickName || this.user.firstName)) || this.defaultName || '';
    }
    parseTimeBasedGreetings(hour) {
        if (hour >= 17)
            return 'Good evening';
        if (hour >= 12)
            return 'Good afternoon';
        return 'Good morning';
    }
    renderGreeting() {
        const date = new Date();
        const greeting = this.parseTimeBasedGreetings(date.getHours());
        return `${greeting}, ${this.displayName}`;
    }
    logError(err) {
        console.error(err);
    }
    render() {
        if (!this.displayName)
            return '';
        return (h("div", { class: "greeting" }, h("h3", { class: "font-size-large flush" }, this.renderGreeting()), h("p", { class: "flush" }, "This place was made for you!")));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "authToken": ["authTokenHandler"]
    }; }
    static get style() { return "*{-webkit-box-sizing:border-box;box-sizing:border-box}.relative{position:relative}.overflow-hidden{overflow:hidden}.d-flex{display:-ms-flexbox;display:flex}.d-block{display:block}.d-inline{display:inline}.d-none{display:none}.align-items-center{-ms-flex-align:center;align-items:center}.w-100{width:100%}.img-responsive{display:block;height:auto;max-width:100%}.img-circle{border-radius:50%}hr{border:0;border-top:1px solid #e7e7e7;margin-bottom:1rem;margin-top:1rem}.btn,.font-family-base{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important}.font-family-condensed-extra{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important}.text-white{color:#fff!important}.text-gray-dark{color:#4d4d4d!important}.text-gray-light{color:#979797!important}.text-gray{color:#737373!important}.text-center{text-align:center}.text-uppercase{text-transform:uppercase}.text-uppercase.font-size-smaller{font-size:13px!important;letter-spacing:.5px}.font-size-base{font-size:16px!important}\@media (min-width:480px){.font-size-base{font-size:19px!important}}.font-size-large{font-size:19px!important}\@media (min-width:480px){.font-size-large{font-size:22px!important}}.font-size-smaller{font-size:14px!important}.font-size-smallest{font-size:10px}.font-weight-mid{font-weight:500}.bg-charcoal{background-color:#171717}.flush{margin:0!important}.flush-bottom{margin-bottom:0!important}.flush-top{margin-top:0!important}.push-half-bottom{margin-bottom:12px!important}.push-bottom{margin-bottom:24px!important}.push-top{margin-top:24px}.push-half-top{margin-top:12px!important}.soft-quarter-top{padding-top:6px}.component-header{font-family:acumin-pro-extra-condensed;font-size:2rem;font-weight:500;line-height:.95;text-transform:uppercase}\@media (min-width:480px){.component-header{font-size:2.125rem}}.list-header{font-family:acumin-pro-extra-condensed,sans-serif;font-size:1.5rem;font-weight:500;text-transform:uppercase}.card>a{color:inherit;display:block;text-decoration:none}.card img{width:100%}.color-gray{color:#737373}.media-label{display:-ms-flexbox;display:flex;position:absolute;right:0;bottom:0;padding:6px 8px}.media-label>:not(:last-child){margin-right:5px}.media-label .icon{fill:#fff;height:16px;width:12px}.btn{display:inline-block;margin-bottom:0;font-weight:300;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid transparent;padding:8px 10px;font-size:16px;line-height:1.5;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:4px;line-height:1;margin-top:5px;margin-bottom:5px;font-size:14px;padding:13px 16px;text-decoration:none}.btn.btn-gray-light{color:#fff;background-color:#979797;border-color:#979797}.btn.btn.btn-blue,.btn.btn.btn-primary{color:#fff;background-color:#3b6e8f;border-color:#3b6e8f}.btn.btn.btn-blue:hover,.btn.btn.btn-primary:hover{background-color:#2c526b;border-color:#294d64}.btn.btn-gray-light.btn-outline{background:transparent;border-style:solid;border-width:1px;color:#979797}.btn.btn-gray-light.btn-outline:hover{background-color:#979797;color:#fff}.btn.btn-sm{font-size:13px;padding:10px 16px 11px}.btn.btn-block{display:block;width:100%}.label{font-family:lexia,serif;font-size:12px;margin-top:9px;padding:5px 6px 4px;display:inline;font-weight:500!important;line-height:1;color:#4d4d4d;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em;font-style:italic}.label.label-info{background-color:#b6dee6}.greeting{opacity:0;-webkit-transition:opacity .45s ease-in-out .25s;transition:opacity .45s ease-in-out .25s}.greeting.fade-in{opacity:1}"; }
};

var dist = function (target) {
  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  var digged = target;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (typeof digged === 'undefined' || digged === null) {
        return undefined;
      }
      if (typeof key === 'function') {
        digged = key(digged);
      } else {
        digged = digged[key];
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return digged;
};

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

var isBuffer = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
};

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies$1 = cookies;

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies$1.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = xhr;
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios_1;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

var axios_1 = axios;

// Allow use of default import syntax in TypeScript
var default_1 = axios;
axios_1.default = default_1;

var axios$1 = axios_1;

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
        return Utils.getMeta('cfl:space_id') || "";
    }
    /**
     * Returns environment
     */
    env() {
        return Utils.getMeta('cfl:env') || "" || 'master';
    }
    /**
     * Returns delivery token
     */
    token() {
        return Utils.getMeta('cfl:token') || "";
    }
    /**
     * Returns service endpoint
     */
    endpoint() {
        return `https://cdn.contentful.com/spaces/${this.space_id()}/environments/${this.env()}`;
    }
}

const HeartButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Print log messages?
         */
        this.debug = false;
        /**
         * Cache key for localStorage
         */
        this.storageKey = 'crds-hearts';
        /**
         * Emphemeral array object for managing updates to localStorage
         */
        this._likes = [];
    }
    /**
     * Fires before render...
     */
    componentWillLoad() {
        this.console = new Logger(this.debug);
        this.config = new Config();
        this.isLiked = this.likes().includes(this.contentfulId);
        this.getCount().then(result => {
            this.count = result;
        });
    }
    /**
     * Returns total number of likes from Contentful
     */
    getCount() {
        let url = `${this.config.endpoint()}/entries/${this.contentfulId}`;
        return axios$1
            .get(url, {
            params: {
                access_token: this.config.token()
            }
        })
            .then(success => {
            return dist(success, 'data', 'fields', 'interaction_count') || 0;
        });
    }
    /**
     * Return count value, abbreviated for large numbers
     */
    abbrevCount() {
        if (this.count > 1000) {
            let float = this.count / 1000;
            let n = Math.round(float * 4) / 4;
            return `${n}K`;
        }
        else {
            return (this.count || 0).toString();
        }
    }
    /**
     * Returns array of all liked ids from localStorage
     */
    likes() {
        const ids = localStorage.getItem(this.storageKey);
        return ids ? JSON.parse(ids) : [];
    }
    /**
     * Handle storage addition/removal of likeable resource ID
     * @param e Event
     */
    toggle(e) {
        this.console.log('toggle()');
        e.preventDefault();
        this.isLiked = !this.isLiked;
        if (this.isLiked) {
            this.add();
            this.count++;
        }
        else {
            this.remove();
            if (this.count > 0) {
                this.count--;
            }
        }
    }
    /**
     * Removes current ID from localStorage
     */
    remove() {
        this.console.log('removeFromStore()');
        this._likes = this.likes().filter(id => {
            if (id.toString() !== this.contentfulId) {
                return id;
            }
        });
        this.save(this._likes);
    }
    /**
     * Add current ID to localStorage
     */
    add() {
        this._likes = this.likes();
        this._likes.push(this.contentfulId);
        this.save(this.removeDuplicates(this._likes));
    }
    removeDuplicates(arr) {
        return Array.from(new Set(arr));
    }
    /**
     * Persist array of IDs to localStorage
     * @param arr Array of likeable resource IDs
     */
    save(arr) {
        this.console.log('save()');
        localStorage.setItem(this.storageKey, JSON.stringify(arr));
        axios$1.post(`${this.endpoint()}/content-interactions`, {
            entry_id: this.contentfulId,
            action: this.isLiked ? 'add' : 'subtract'
        });
    }
    /**
     * Returns service endpoint
     */
    endpoint() {
        return Utils.getMeta('crds:interactions-endpoint') || "";
    }
    /**
     * HTML
     */
    render() {
        let heart = '<svg width="256px" height="256px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="heart"><path d="M222.944078,39.3395243 C232.469215,47.3270078 239.075354,57.1577642 242.762502,68.8317796 C246.449652,80.505795 246.987363,92.2566154 244.37563,104.084241 C241.763898,115.911866 236.156363,126.126627 227.553015,134.728537 L138.600552,226.891836 C135.527926,229.963948 131.994414,231.5 128,231.5 C124.005586,231.5 120.472074,229.963948 117.399448,226.891836 L28.4469857,135.189353 C19.8436364,126.280238 14.2361025,115.911866 11.6243699,104.084241 C9.01263721,92.2566154 9.55034867,80.505795 13.2374974,68.8317796 C16.924646,57.1577642 23.5307851,47.3270078 33.0559215,39.3395243 C41.3520061,32.2736738 50.7235066,27.8191121 61.1704302,25.9758461 C71.6173538,24.1325802 81.9106415,24.90061 92.0503004,28.2799285 C102.189959,31.6592471 111.100566,37.3426551 118.782129,45.3301387 L128,54.5464684 L137.217871,45.3301387 C144.899434,37.3426551 153.810041,31.6592471 163.9497,28.2799285 C174.089359,24.90061 184.382646,24.1325802 194.82957,25.9758461 C205.276493,27.8191121 214.647994,32.2736738 222.944078,39.3395243 Z" id="Path"></path></g></svg>';
        let heart_o = '<svg width="256px" height="256px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="heart-o"><path d="M218.116413,43.6103959 C227.157221,51.1917362 233.427455,60.5226236 236.927121,71.603045 C240.426788,82.6834664 240.937158,93.8367875 238.458225,105.063008 C235.979293,116.289229 230.656887,125.984595 222.490997,134.14912 L138.061541,221.626149 C135.14515,224.542052 131.791308,226 128,226 C124.208692,226 120.85485,224.542052 117.938459,221.626149 L33.5090034,134.586505 C25.3431125,126.130395 20.0207075,116.289229 17.5417748,105.063008 C15.0628421,93.8367875 15.5732123,82.6834664 19.0728789,71.603045 C22.5725454,60.5226236 28.7698738,51.1917362 37.6648574,43.6103959 C46.559841,36.0290557 56.4026531,31.6552043 67.1932938,30.4888417 C76.8173768,29.3224791 86.587277,30.6346345 96.5030011,34.425308 C105.543809,37.9243891 113.126417,42.8814185 119.250834,49.2964028 L128,58.4814907 L136.749166,49.2964028 C144.040141,41.7150625 152.570578,36.3206413 162.340478,33.1131525 C172.110378,29.9056637 181.95319,29.1766863 191.868914,30.9262268 C201.784638,32.6757674 210.533805,36.903826 218.116413,43.6103959 Z M212.429455,124.526647 C218.262231,118.694847 222.272267,111.477993 224.459559,102.876083 C226.646851,94.2741726 226.573939,85.8909618 224.24083,77.726437 C221.61608,68.3955562 216.585309,60.5955167 209.148518,54.3263319 C201.711727,48.0571471 193.47293,44.630959 184.432123,44.0477811 C177.141149,43.7561888 169.704357,45.3599365 162.121749,48.8590176 C155.705691,51.4833285 150.602015,54.9824096 146.810708,59.356261 L128,78.6012073 L109.189292,59.356261 C105.10635,54.9824096 100.002668,51.3375357 93.8782512,48.4216325 C86.2956426,44.9225514 78.8588512,43.4646031 71.567877,44.0477811 C62.5270696,44.630959 54.2882735,48.0571471 46.8514821,54.3263319 C39.4146907,60.5955167 34.38392,68.3955562 31.7591701,77.726437 C29.4260613,85.8909618 29.3531494,94.2741726 31.5404409,102.876083 C33.7277325,111.477993 37.7377693,118.694847 43.5705447,124.526647 L128,212.003675 L212.429455,124.526647 Z"></path></g></svg>';
        return (h("a", { href: "#", onClick: e => this.toggle(e), class: this.isLiked ? 'on' : 'off' }, h("span", { innerHTML: heart, class: "icon heart" }), h("span", { innerHTML: heart_o, class: "icon heart-o" }), h("span", { class: "count" }, this.abbrevCount())));
    }
    static get style() { return "a{font-family:sans-serif;display:block;color:#979797;font-size:80%;text-decoration:none}a>*{vertical-align:middle}a.on>span.heart-o.heart,a.on>span.heart.heart{display:inline-block}a.on>span.heart-o.heart-o,a.on>span.heart.heart-o{display:none}a.on>span.heart-o>svg,a.on>span.heart>svg{fill:#c05c04}a span.count{padding-left:.5rem}a span.heart,a span.heart-o{display:inline-block;border:1px solid;border-radius:50%;width:42px;height:42px}a span.heart-o svg,a span.heart svg{margin:9px;width:24px;height:24px;fill:currentColor}a span.heart{display:none}a span.heart-o{display:inline-block}"; }
};

const icons = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<svg id="account-thin" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M128,10 C62.8145161,10 10,62.8145161 10,128 C10,193.185484 62.8145161,246 128,246 C193.185484,246 246,193.185484 246,128 C246,62.8145161 193.185484,10 128,10 Z M188.903226,210.6 C171.821774,223.208871 150.791129,230.774194 128,230.774194 C105.208871,230.774194 84.1782258,223.208871 67.0967742,210.6 L67.0967742,204.129032 C67.0967742,187.333065 80.7524194,173.677419 97.5483871,173.677419 C102.829839,173.677419 110.633065,179.101613 128,179.101613 C145.414516,179.101613 153.122581,173.677419 158.451613,173.677419 C175.247581,173.677419 188.903226,187.333065 188.903226,204.129032 L188.903226,210.6 Z M203.462903,197.515323 C200.227419,175.437903 181.433065,158.451613 158.451613,158.451613 C148.697581,158.451613 143.987097,163.875806 128,163.875806 C112.012903,163.875806 107.35,158.451613 97.5483871,158.451613 C74.5669355,158.451613 55.7725806,175.437903 52.5370968,197.515323 C35.6459677,179.196774 25.2258065,154.835484 25.2258065,128 C25.2258065,71.3314516 71.3314516,25.2258065 128,25.2258065 C184.668548,25.2258065 230.774194,71.3314516 230.774194,128 C230.774194,154.835484 220.354032,179.196774 203.462903,197.515323 Z M128,63.2903226 C104.875806,63.2903226 86.1290323,82.0370968 86.1290323,105.16129 C86.1290323,128.285484 104.875806,147.032258 128,147.032258 C151.124194,147.032258 169.870968,128.285484 169.870968,105.16129 C169.870968,82.0370968 151.124194,63.2903226 128,63.2903226 Z M128,131.806452 C113.297581,131.806452 101.354839,119.86371 101.354839,105.16129 C101.354839,90.458871 113.297581,78.516129 128,78.516129 C142.702419,78.516129 154.645161,90.458871 154.645161,105.16129 C154.645161,119.86371 142.702419,131.806452 128,131.806452 Z"/>
  </g>
</svg>


<svg id="calendar" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M36.2162975,228.37119 L73.8553719,228.37119 L73.8553719,190.732116 L36.2162975,190.732116 L36.2162975,228.37119 Z M82.219719,228.37119 L124.041455,228.37119 L124.041455,190.732116 L82.219719,190.732116 L82.219719,228.37119 Z M36.2162975,182.367769 L73.8553719,182.367769 L73.8553719,140.546033 L36.2162975,140.546033 L36.2162975,182.367769 Z M82.219719,182.367769 L124.041455,182.367769 L124.041455,140.546033 L82.219719,140.546033 L82.219719,182.367769 Z M36.2162975,132.181686 L73.8553719,132.181686 L73.8553719,94.5426116 L36.2162975,94.5426116 L36.2162975,132.181686 Z M132.404826,228.37119 L174.226562,228.37119 L174.226562,190.732116 L132.404826,190.732116 L132.404826,228.37119 Z M82.219719,132.181686 L124.041455,132.181686 L124.041455,94.5426116 L82.219719,94.5426116 L82.219719,132.181686 Z M182.590909,228.37119 L220.229983,228.37119 L220.229983,190.732116 L182.590909,190.732116 L182.590909,228.37119 Z M132.404826,182.367769 L174.226562,182.367769 L174.226562,140.546033 L132.404826,140.546033 L132.404826,182.367769 Z M86.401405,69.4505455 L86.401405,31.8114711 C86.401405,30.6792562 85.9879174,29.6981983 85.1599669,28.8712231 C84.3320165,28.0432727 83.3519339,27.6297851 82.219719,27.6297851 L73.8553719,27.6297851 C72.723157,27.6297851 71.7420992,28.0432727 70.915124,28.8712231 C70.0871736,29.6991736 69.673686,30.6792562 69.673686,31.8114711 L69.673686,69.4505455 C69.673686,70.5827603 70.0871736,71.5638182 70.915124,72.3907934 C71.7430744,73.2177686 72.723157,73.6322314 73.8553719,73.6322314 L82.219719,73.6322314 C83.3519339,73.6322314 84.3329917,73.2187438 85.1599669,72.3907934 C85.9869421,71.562843 86.401405,70.5827603 86.401405,69.4505455 Z M182.590909,182.367769 L220.229983,182.367769 L220.229983,140.546033 L182.590909,140.546033 L182.590909,182.367769 Z M132.404826,132.181686 L174.226562,132.181686 L174.226562,94.5426116 L132.404826,94.5426116 L132.404826,132.181686 Z M182.590909,132.181686 L220.229983,132.181686 L220.229983,94.5426116 L182.590909,94.5426116 L182.590909,132.181686 Z M186.772595,69.4505455 L186.772595,31.8114711 C186.772595,30.6792562 186.359107,29.6981983 185.531157,28.8712231 C184.703207,28.0432727 183.723124,27.6297851 182.590909,27.6297851 L174.226562,27.6297851 C173.094347,27.6297851 172.113289,28.0432727 171.286314,28.8712231 C170.458364,29.6991736 170.044876,30.6792562 170.044876,31.8114711 L170.044876,69.4505455 C170.044876,70.5827603 170.458364,71.5638182 171.286314,72.3907934 C172.114264,73.2177686 173.094347,73.6322314 174.226562,73.6322314 L182.590909,73.6322314 C183.723124,73.6322314 184.704182,73.2187438 185.531157,72.3907934 C186.358132,71.562843 186.772595,70.5827603 186.772595,69.4505455 Z M236.958678,61.0861983 L236.958678,228.37119 C236.958678,232.902 235.302777,236.822331 231.99195,240.133157 C228.681124,243.443983 224.760793,245.099884 220.229983,245.099884 L36.2162975,245.099884 C31.6854876,245.099884 27.765157,243.443983 24.4543306,240.133157 C21.1435041,236.822331 19.4876033,232.902 19.4876033,228.37119 L19.4876033,61.0861983 C19.4876033,56.5553884 21.1435041,52.6350579 24.4543306,49.3242314 C27.765157,46.013405 31.6864628,44.3575041 36.2162975,44.3575041 L52.9449917,44.3575041 L52.9449917,31.8114711 C52.9449917,26.0606777 54.9919504,21.1378347 59.0878182,17.0429421 C63.1827107,12.9480496 68.1055537,10.9001157 73.8563471,10.9001157 L82.2206942,10.9001157 C87.9714876,10.9001157 92.8943306,12.9480496 96.9892231,17.0429421 C101.084116,21.1378347 103.13205,26.0606777 103.13205,31.8114711 L103.13205,44.3575041 L153.318132,44.3575041 L153.318132,31.8114711 C153.318132,26.0606777 155.365091,21.1378347 159.460959,17.0429421 C163.555851,12.9480496 168.478694,10.9001157 174.229488,10.9001157 L182.593835,10.9001157 C188.344628,10.9001157 193.267471,12.9480496 197.362364,17.0429421 C201.457256,21.1378347 203.50519,26.0606777 203.50519,31.8114711 L203.50519,44.3575041 L220.233884,44.3575041 C224.764694,44.3575041 228.685025,46.013405 231.995851,49.3242314 C235.306678,52.6350579 236.958678,56.5553884 236.958678,61.0861983 Z"/>
  </g>
</svg>


<svg id="chat-thin" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M216.5,10 L39.5,10 C23.2289063,10 10,23.2289063 10,39.5 L10,172.25 C10,188.521094 23.2289063,201.75 39.5,201.75 L83.75,201.75 L83.75,240.46875 C83.75,243.741406 86.4234375,246 89.28125,246 C90.3875,246 91.5398438,245.677344 92.5539062,244.89375 L150.125,201.75 L216.5,201.75 C232.771094,201.75 246,188.521094 246,172.25 L246,39.5 C246,23.2289063 232.771094,10 216.5,10 Z M231.25,172.25 C231.25,180.3625 224.6125,187 216.5,187 L145.192969,187 L141.275,189.95 L98.5,222.03125 L98.5,187 L39.5,187 C31.3875,187 24.75,180.3625 24.75,172.25 L24.75,39.5 C24.75,31.3875 31.3875,24.75 39.5,24.75 L216.5,24.75 C224.6125,24.75 231.25,31.3875 231.25,39.5 L231.25,172.25 Z"/>
  </g>
</svg>


<svg id="chart-bar-thin" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M195.4375,132.75 L202.8125,132.75 C204.840625,132.75 206.5,131.090625 206.5,129.0625 L206.5,18.4375 C206.5,16.409375 204.840625,14.75 202.8125,14.75 L195.4375,14.75 C193.409375,14.75 191.75,16.409375 191.75,18.4375 L191.75,129.0625 C191.75,131.090625 193.409375,132.75 195.4375,132.75 Z M151.1875,132.75 L158.5625,132.75 C160.590625,132.75 162.25,131.090625 162.25,129.0625 L162.25,62.6875 C162.25,60.659375 160.590625,59 158.5625,59 L151.1875,59 C149.159375,59 147.5,60.659375 147.5,62.6875 L147.5,129.0625 C147.5,131.090625 149.159375,132.75 151.1875,132.75 Z M62.6875,132.75 L70.0625,132.75 C72.090625,132.75 73.75,131.090625 73.75,129.0625 L73.75,92.1875 C73.75,90.159375 72.090625,88.5 70.0625,88.5 L62.6875,88.5 C60.659375,88.5 59,90.159375 59,92.1875 L59,129.0625 C59,131.090625 60.659375,132.75 62.6875,132.75 Z M106.9375,132.75 L114.3125,132.75 C116.340625,132.75 118,131.090625 118,129.0625 L118,33.1875 C118,31.159375 116.340625,29.5 114.3125,29.5 L106.9375,29.5 C104.909375,29.5 103.25,31.159375 103.25,33.1875 L103.25,129.0625 C103.25,131.090625 104.909375,132.75 106.9375,132.75 Z M232.3125,162.25 L14.75,162.25 L14.75,3.6875 C14.75,1.65015625 13.0998437,0 11.0625,0 L3.6875,0 C1.65015625,0 0,1.65015625 0,3.6875 L0,169.625 C0,173.699687 3.3003125,177 7.375,177 L232.3125,177 C234.349844,177 236,175.349844 236,173.3125 L236,165.9375 C236,163.900156 234.349844,162.25 232.3125,162.25 Z" id="Shape"/>
  </g>
</svg>


<svg id="camera" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M128.003354,106.508386 C137.507024,106.508386 145.633222,109.882748 152.381945,116.631471 C159.130669,123.380195 162.505031,131.506392 162.505031,141.010063 C162.505031,150.513733 159.130669,158.63993 152.381945,165.388654 C145.633222,172.137378 137.507024,175.51174 128.003354,175.51174 C118.499684,175.51174 110.373487,172.137378 103.624763,165.388654 C96.8760391,158.63993 93.5016771,150.513733 93.5016771,141.010063 C93.5016771,131.506392 96.8760391,123.380195 103.624763,116.631471 C110.373487,109.882748 118.499684,106.508386 128.003354,106.508386 Z M212.335569,56.671139 C220.801663,56.671139 228.028924,59.6653541 234.017355,65.6537845 C240.005785,71.6422148 243,78.8694764 243,87.3355695 L243,194.671139 C243,203.137232 240.005785,210.364494 234.017355,216.352924 C228.028924,222.341354 220.801663,225.335569 212.335569,225.335569 L43.6644305,225.335569 C35.1983375,225.335569 27.9710758,222.341354 21.9826455,216.352924 C15.9942152,210.364494 13,203.137232 13,194.671139 L13,87.3355695 C13,78.8694764 15.9942152,71.6422148 21.9826455,65.6537845 C27.9710758,59.6653541 35.1983375,56.671139 43.6644305,56.671139 L70.4983229,56.671139 L76.6097419,40.3762578 C78.1258568,36.4629819 80.9009285,33.0886199 84.934957,30.2531719 C88.9689855,27.417724 93.1014049,26 97.3322153,26 L158.667785,26 C162.898595,26 167.031015,27.417724 171.065043,30.2531719 C175.099072,33.0886199 177.874143,36.4629819 179.390258,40.3762578 L185.501677,56.671139 L212.335569,56.671139 Z M128.003354,194.677847 C142.779884,194.677847 155.418648,189.427349 165.919644,178.926353 C176.420641,168.425356 181.671139,155.786593 181.671139,141.010063 C181.671139,126.233533 176.420641,113.594769 165.919644,103.093773 C155.418648,92.5927762 142.779884,87.342278 128.003354,87.342278 C113.226824,87.342278 100.588061,92.5927762 90.0870643,103.093773 C79.5860678,113.594769 74.3355695,126.233533 74.3355695,141.010063 C74.3355695,155.786593 79.5860678,168.425356 90.0870643,178.926353 C100.588061,189.427349 113.226824,194.677847 128.003354,194.677847 Z"/>
  </g>
</svg>


<svg id="caret-down" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M191.999979,104.000874 C191.999979,106.166173 191.208992,108.042143 189.627017,109.628785 L133.627901,165.627901 C132.045926,167.209876 130.169955,168.000863 127.99999,168.000863 C125.830024,168.000863 123.954054,167.209876 122.372079,165.627901 L66.3729625,109.628785 C64.7909875,108.04681 64,106.170839 64,104.000874 C64,101.830908 64.7909875,99.9549376 66.3729625,98.3729625 C67.9549376,96.7909875 69.830908,96 72.0008737,96 L183.999106,96 C186.164405,96 188.040375,96.7909875 189.627017,98.3729625 C191.213659,99.9549376 192.004646,101.830908 191.999979,104.000874 L191.999979,104.000874 Z"/>
  </g>
</svg>


<svg id="chevron-left-thin" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M187.540179,245.608036 L191.328214,241.820536 C193.838571,239.310179 193.838571,235.239821 191.328214,232.728929 L86.5998214,128 L191.328214,23.2710714 C193.838571,20.7607143 193.838571,16.6903571 191.328214,14.1794643 L187.540179,10.3919643 C185.029821,7.88160714 180.959464,7.88160714 178.449107,10.3919643 L65.3860714,123.454464 C62.8757143,125.964821 62.8757143,130.035179 65.3860714,132.546071 L178.449107,245.608571 C180.959464,248.118929 185.029821,248.118929 187.540179,245.608036 Z"/>
  </g>
</svg>


<svg id="check-circle" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M207.161842,102.72156 C207.161842,99.8650788 206.245261,97.5207469 204.41112,95.6866058 L190.48712,81.9163485 C188.550158,79.9793859 186.253809,79.0118838 183.598075,79.0118838 C180.94234,79.0118838 178.645012,79.9803651 176.709029,81.9163485 L114.277726,144.192929 L79.6944232,109.609627 C77.7574606,107.672664 75.461112,106.705162 72.8053776,106.705162 C70.1486639,106.705162 67.8523154,107.673643 65.916332,109.609627 L51.992332,123.379884 C50.1581909,125.214025 49.24161,127.558357 49.24161,130.414838 C49.24161,133.168498 50.1581909,135.464846 51.992332,137.303884 L107.379867,192.691419 C109.31683,194.628382 111.613178,195.595884 114.268913,195.595884 C117.022573,195.595884 119.366905,194.627402 121.303867,192.691419 L204.38566,109.609627 C206.219801,107.775485 207.136382,105.479137 207.136382,102.720581 L207.161842,102.72156 Z M245.720913,127.510373 C245.720913,148.828714 240.468199,168.491137 229.962772,186.496664 C219.457344,204.502191 205.202357,218.757178 187.19683,229.262606 C169.191303,239.768033 149.52888,245.020747 128.210539,245.020747 C106.892199,245.020747 87.2297759,239.768033 69.224249,229.262606 C51.218722,218.757178 36.9637344,204.502191 26.4583071,186.496664 C15.9528797,168.491137 10.700166,148.828714 10.700166,127.510373 C10.700166,106.192033 15.9528797,86.52961 26.4583071,68.524083 C36.9637344,50.518556 51.218722,36.2635685 69.224249,25.7581411 C87.2297759,15.2527137 106.892199,10 128.210539,10 C149.52888,10 169.191303,15.2527137 187.19683,25.7581411 C205.202357,36.2635685 219.458324,50.518556 229.962772,68.524083 C240.468199,86.52961 245.720913,106.192033 245.720913,127.510373 Z" id="Shape"/>
  </g>
</svg>


<svg id="chevron-down" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M200.731183,135.586367 L92.1357833,244.181767 C90.2822,246.03535 88.0864167,246.962633 85.5494167,246.962633 C83.0124167,246.962633 80.8176167,246.03535 78.96305,244.181767 L54.6678333,219.88655 C52.81425,218.032967 51.8869667,215.837183 51.8869667,213.300183 C51.8869667,210.763183 52.81425,208.568383 54.6678333,206.713817 L132.383617,129 L54.6688167,51.2852 C52.8152333,49.4316167 51.88795,47.2358333 51.88795,44.6988333 C51.88795,42.1618333 52.8152333,39.9670333 54.6688167,38.1124667 L78.9640333,13.81725 C80.8176167,11.9636667 83.0134,11.0363833 85.5504,11.0363833 C88.0874,11.0363833 90.2822,11.9636667 92.1367667,13.81725 L200.731183,122.413633 C202.584767,124.267217 203.51205,126.463 203.51205,129 C203.51205,131.537 202.584767,133.7318 200.731183,135.586367 Z" id="chevron-down" transform="translate(127.699508, 128.999508) rotate(90.000000) translate(-127.699508, -128.999508) "/>
  </g>
</svg>


<svg id="chevron-down-thin" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M245.589286,69.2142857 L241.785714,65.4107143 C239.267857,62.8928571 235.196429,62.8928571 232.678571,65.4107143 L128,170.142857 L23.2678571,65.4107143 C20.75,62.8928571 16.6785714,62.8928571 14.1607143,65.4107143 L10.3571429,69.2142857 C7.83928571,71.7321429 7.83928571,75.8035714 10.3571429,78.3214286 L123.392857,191.410714 C125.910714,193.928571 129.982143,193.928571 132.5,191.410714 L245.535714,78.3214286 C248.107143,75.8035714 248.107143,71.7321429 245.589286,69.2142857 Z"/>
  </g>
</svg>


<svg id="chevron-left" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M200.6564,51.3835333 L123.03895,129 L200.655417,206.616467 C202.507033,208.468083 203.43235,210.660917 203.43235,213.193983 C203.43235,215.72705 202.507033,217.919883 200.655417,219.7715 L176.390683,244.036233 C174.539067,245.88785 172.346233,246.813167 169.813167,246.813167 C167.279117,246.813167 165.087267,245.88785 163.23565,244.036233 L54.7769333,135.577517 C52.9253167,133.7259 52,131.53405 52,129 C52,126.46595 52.9253167,124.2741 54.7769333,122.422483 L163.23565,13.9637667 C165.087267,12.11215 167.2801,11.1868333 169.813167,11.1868333 C172.347217,11.1868333 174.539067,12.11215 176.390683,13.9637667 L200.655417,38.2285 C202.507033,40.0801167 203.43235,42.27295 203.43235,44.8060167 C203.43235,47.3390833 202.508017,49.5319167 200.6564,51.3835333 Z"/>
  </g>
</svg>


<svg id="chevron-right-thin" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M69.1741071,10.3919643 L65.3860714,14.1794643 C62.8757143,16.6898214 62.8757143,20.7601786 65.3860714,23.2710714 L170.114464,128 L65.3860714,232.728929 C62.8757143,235.239286 62.8757143,239.309643 65.3860714,241.820536 L69.1741071,245.608036 C71.6844643,248.118393 75.7548214,248.118393 78.2651786,245.608036 L191.328214,132.545536 C193.838571,130.035179 193.838571,125.964821 191.328214,123.453929 L78.2651786,10.3919643 C75.7548214,7.88107143 71.6844643,7.88107143 69.1741071,10.3919643 Z"/>
  </g>
</svg>


<svg id="chevron-right" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M200.731183,135.586367 L92.1357833,244.181767 C90.2822,246.03535 88.0864167,246.962633 85.5494167,246.962633 C83.0124167,246.962633 80.8176167,246.03535 78.96305,244.181767 L54.6678333,219.88655 C52.81425,218.032967 51.8869667,215.837183 51.8869667,213.300183 C51.8869667,210.763183 52.81425,208.568383 54.6678333,206.713817 L132.383617,129 L54.6688167,51.2852 C52.8152333,49.4316167 51.88795,47.2358333 51.88795,44.6988333 C51.88795,42.1618333 52.8152333,39.9670333 54.6688167,38.1124667 L78.9640333,13.81725 C80.8176167,11.9636667 83.0134,11.0363833 85.5504,11.0363833 C88.0874,11.0363833 90.2822,11.9636667 92.1367667,13.81725 L200.731183,122.413633 C202.584767,124.267217 203.51205,126.463 203.51205,129 C203.51205,131.537 202.584767,133.7318 200.731183,135.586367 Z"/>
  </g>
</svg>


<svg id="circle-thin" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M128,30.6686333 C114.455,30.6686333 101.517,33.2793833 89.173,38.50875 C76.828,43.73025 66.201,50.72175 57.298,59.48325 C48.388,68.24475 41.285,78.68775 35.968,90.827 C30.658,102.96625 27.995,115.6955 27.995,129.006883 C27.995,142.326133 30.65,155.0485 35.968,167.18775 C41.278,179.327 48.388,189.776883 57.298,198.5315 C66.208,207.293 76.828,214.277617 89.173,219.506 C101.518,224.7275 114.463,227.346117 128,227.346117 C141.545,227.346117 154.483,224.735367 166.827,219.506 C179.172,214.2845 189.799,207.293 198.702,198.5315 C207.612,189.77 214.715,179.327 220.032,167.18775 C225.342,155.0485 228.004,142.31925 228.004,129.006883 C228.004,115.687633 225.349,102.96625 220.032,90.827 C214.722,78.68775 207.612,68.2378667 198.702,59.48325 C189.792,50.72175 179.172,43.7371333 166.827,38.50875 C154.483,33.28725 141.538,30.6686333 128,30.6686333 Z M248,129 C248,150.409133 242.637,170.1525 231.905,188.228133 C221.173,206.303767 206.615,220.619133 188.233,231.17325 C169.851,241.727367 149.772,247 128,247 C106.228,247 86.15,241.726383 67.768,231.17325 C49.386,220.620117 34.828,206.30475 24.095,188.228133 C13.362,170.151517 8,150.409133 8,129 C8,107.590867 13.363,87.8475 24.095,69.7708833 C34.827,51.6942667 49.385,37.3798833 67.768,26.82675 C86.151,16.2736167 106.228,11 128,11 C149.772,11 169.85,16.2726333 188.233,26.82675 C206.616,37.3808667 221.173,51.69525 231.905,69.7708833 C242.637,87.8465167 248,107.590867 248,129 Z"/>
  </g>
</svg>


<svg id="chevron-up-thin" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M9.89119138,187.565235 L13.694825,191.369406 C16.2158755,193.890457 20.3035711,193.890457 22.8251596,191.369406 L128.000202,86.194902 L233.175244,191.369406 C235.696294,193.890457 239.78399,193.890457 242.305579,191.369406 L246.109212,187.565235 C248.630263,185.044184 248.630263,180.956488 246.109212,178.435438 L132.5651,64.8907879 C130.04405,62.3697374 125.956354,62.3697374 123.434765,64.8907879 L9.89119138,178.435438 C7.36960287,180.956488 7.36960287,185.044184 9.89119138,187.565235 Z"/>
  </g>
</svg>


<svg id="chevron-up" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M200.731183,135.586367 L92.1357833,244.181767 C90.2822,246.03535 88.0864167,246.962633 85.5494167,246.962633 C83.0124167,246.962633 80.8176167,246.03535 78.96305,244.181767 L54.6678333,219.88655 C52.81425,218.032967 51.8869667,215.837183 51.8869667,213.300183 C51.8869667,210.763183 52.81425,208.568383 54.6678333,206.713817 L132.383617,129 L54.6688167,51.2852 C52.8152333,49.4316167 51.88795,47.2358333 51.88795,44.6988333 C51.88795,42.1618333 52.8152333,39.9670333 54.6688167,38.1124667 L78.9640333,13.81725 C80.8176167,11.9636667 83.0134,11.0363833 85.5504,11.0363833 C88.0874,11.0363833 90.2822,11.9636667 92.1367667,13.81725 L200.731183,122.413633 C202.584767,124.267217 203.51205,126.463 203.51205,129 C203.51205,131.537 202.584767,133.7318 200.731183,135.586367 Z" id="chevron-right" transform="translate(127.699508, 128.999508) rotate(-90.000000) translate(-127.699508, -128.999508) "/>
  </g>
</svg>


<svg id="close-thin" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M128,106 L43.5355339,21.5355339 L43.5355339,21.5355339 C41.5829124,19.5829124 38.4170876,19.5829124 36.4644661,21.5355339 L21.5355339,36.4644661 L21.5355339,36.4644661 C19.5829124,38.4170876 19.5829124,41.5829124 21.5355339,43.5355339 L106,128 L21.5355339,212.464466 L21.5355339,212.464466 C19.5829124,214.417088 19.5829124,217.582912 21.5355339,219.535534 L36.4644661,234.464466 L36.4644661,234.464466 C38.4170876,236.417088 41.5829124,236.417088 43.5355339,234.464466 L128,150 L212.464466,234.464466 L212.464466,234.464466 C214.417088,236.417088 217.582912,236.417088 219.535534,234.464466 L234.464466,219.535534 L234.464466,219.535534 C236.417088,217.582912 236.417088,214.417088 234.464466,212.464466 L150,128 L234.464466,43.5355339 L234.464466,43.5355339 C236.417088,41.5829124 236.417088,38.4170876 234.464466,36.4644661 L219.535534,21.5355339 L219.535534,21.5355339 C217.582912,19.5829124 214.417088,19.5829124 212.464466,21.5355339 L128,106 Z" id="icon-close-thin"/>
  </g>
</svg>


<svg id="clock-o" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M147.66093,73.9130815 L147.66093,142.747849 C147.66093,144.181907 147.199164,145.360702 146.275631,146.284235 C145.352098,147.207768 144.173302,147.669535 142.739245,147.669535 L93.574012,147.669535 C92.1399543,147.669535 90.9611589,147.207768 90.0376258,146.284235 C89.1140927,145.360702 88.6523261,144.181907 88.6523261,142.747849 L88.6523261,132.913082 C88.6523261,131.479024 89.1140927,130.300228 90.0376258,129.376695 C90.9611589,128.453162 92.1399543,127.991396 93.574012,127.991396 L127.991396,127.991396 L127.991396,73.9044772 C127.991396,72.4704195 128.453162,71.2916241 129.376695,70.368091 C130.300228,69.4445579 131.479024,68.9827913 132.913082,68.9827913 L142.747849,68.9827913 C144.181907,68.9827913 145.360702,69.4445579 146.284235,70.368091 C147.207768,71.2916241 147.669535,72.4704195 147.669535,73.9044772 L147.66093,73.9130815 Z M211.582616,128 C211.582616,112.839142 207.842594,98.8570804 200.362549,86.0538136 C192.882504,73.2505469 182.740849,63.1088912 169.937582,55.6288464 C157.134315,48.1488017 143.152253,44.4087793 127.991396,44.4087793 C112.830538,44.4087793 98.848476,48.1488017 86.0452093,55.6288464 C73.2419425,63.1088912 63.1002868,73.2505469 55.6202421,86.0538136 C48.1401974,98.8570804 44.400175,112.839142 44.400175,128 C44.400175,143.160858 48.1401974,157.14292 55.6202421,169.946186 C63.1002868,182.749453 73.2419425,192.891109 86.0452093,200.371154 C98.848476,207.851198 112.830538,211.591221 127.991396,211.591221 C143.152253,211.591221 157.134315,207.851198 169.937582,200.371154 C182.740849,192.891109 192.882504,182.749453 200.362549,169.946186 C207.842594,157.14292 211.582616,143.160858 211.582616,128 Z M246,128 C246,149.407613 240.725536,169.151718 230.176608,187.232317 C219.62768,205.312916 205.312916,219.62768 187.232317,230.176608 C169.151718,240.725536 149.407613,246 128,246 C106.592387,246 86.8482816,240.725536 68.7676827,230.176608 C50.6870838,219.62768 36.3723203,205.312916 25.8233922,187.232317 C15.2744641,169.151718 10,149.407613 10,128 C10,106.592387 15.2744641,86.8482816 25.8233922,68.7676827 C36.3723203,50.6870838 50.6870838,36.3723203 68.7676827,25.8233922 C86.8482816,15.2744641 106.592387,10 128,10 C149.407613,10 169.151718,15.2744641 187.232317,25.8233922 C205.312916,36.3723203 219.62768,50.6870838 230.176608,68.7676827 C240.725536,86.8482816 246,106.592387 246,128 Z"/>
  </g>
</svg>


<svg id="contrast" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M128,10 C193.172875,10 246,62.827125 246,128 C246,193.172875 193.172875,246 128,246 C62.827125,246 10,193.172875 10,128 C10,62.827125 62.827125,10 128,10 Z M39.5,128 C39.5,176.874125 79.125875,216.5 128,216.5 L128,39.5 C79.125875,39.5 39.5,79.125875 39.5,128 Z"/>
  </g>
</svg>


<svg id="copy" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M201.75,69 L157.5,69 L157.5,54.25 L113.25,10 L10,10 L10,187 L98.5,187 L98.5,246 L246,246 L246,113.25 L201.75,69 Z M202,90 L226,114 L202,114 L202,90 Z M113,30 L137,54 L113,54 L113,30 Z M25,25 L99.375,25 L99.375,69.4 L144,69.4 L144,173 L25,173 L25,25 Z M230,231 L113,231 L113,186.6 L156.875,186.6 L156.875,83 L186.125,83 L186.125,127.4 L230,127.4 L230,231 Z"/>
  </g>
</svg>


<svg id="download" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M191.5365,209.548754 C191.5365,207.09128 190.638272,204.96462 188.841817,203.168773 C187.045362,201.372927 184.917981,200.475004 182.459675,200.475004 C180.001368,200.475004 177.873987,201.372927 176.077532,203.168773 C174.281077,204.96462 173.38285,207.09128 173.38285,209.548754 C173.38285,212.006228 174.281077,214.132888 176.077532,215.928734 C177.873987,217.724581 180.001368,218.622504 182.459675,218.622504 C184.917981,218.622504 187.045362,217.724581 188.841817,215.928734 C190.638272,214.132888 191.5365,212.006228 191.5365,209.548754 Z M227.8438,209.548754 C227.8438,207.09128 226.945572,204.96462 225.149117,203.168773 C223.352662,201.372927 221.225281,200.475004 218.766975,200.475004 C216.308668,200.475004 214.181287,201.372927 212.384832,203.168773 C210.588377,204.96462 209.69015,207.09128 209.69015,209.548754 C209.69015,212.006228 210.588377,214.132888 212.384832,215.928734 C214.181287,217.724581 216.308668,218.622504 218.766975,218.622504 C221.225281,218.622504 223.352662,217.724581 225.149117,215.928734 C226.945572,214.132888 227.8438,212.006228 227.8438,209.548754 Z M245.99745,177.790628 L245.99745,223.159379 C245.99745,226.940108 244.673746,230.153728 242.026339,232.800239 C239.378931,235.446749 236.164222,236.770004 232.382212,236.770004 L23.6152375,236.770004 C19.8332271,236.770004 16.6185182,235.446749 13.9711109,232.800239 C11.3237036,230.153728 10,226.940108 10,223.159379 L10,177.790628 C10,174.009899 11.3237036,170.796279 13.9711109,168.149769 C16.6185182,165.503258 19.8332271,164.180003 23.6152375,164.180003 L89.564044,164.180003 L108.710472,183.461722 C114.194387,188.754743 120.623804,191.401253 127.998725,191.401253 C135.373645,191.401253 141.803063,188.754743 147.286978,183.461722 L166.575231,164.180003 L232.382212,164.180003 C236.164222,164.180003 239.378931,165.503258 242.026339,168.149769 C244.673746,170.796279 245.99745,174.009899 245.99745,177.790628 Z M199.904198,97.1193179 C201.511552,100.994565 200.8497,104.302703 197.918642,107.043732 L134.380867,170.559983 C132.678963,172.35583 130.551582,173.253753 127.998725,173.253753 C125.445868,173.253753 123.318487,172.35583 121.616582,170.559983 L58.0788073,107.043732 C55.1477493,104.302703 54.4858974,100.994565 56.0932519,97.1193179 C57.7006063,93.4331069 60.489839,91.5900014 64.4609499,91.5900014 L100.76825,91.5900014 L100.76825,28.0737502 C100.76825,25.6162762 101.666477,23.489616 103.462932,21.6937696 C105.259387,19.8979232 107.386768,19 109.845075,19 L146.152375,19 C148.610682,19 150.738062,19.8979232 152.534517,21.6937696 C154.330972,23.489616 155.2292,25.6162762 155.2292,28.0737502 L155.2292,91.5900014 L191.5365,91.5900014 C195.507611,91.5900014 198.296843,93.4331069 199.904198,97.1193179 Z" id="Shape"/>
  </g>
</svg>


<svg id="close" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M246,199.912458 C246,205.209877 244.145903,209.712682 240.43771,213.420875 L213.420875,240.43771 C209.712682,244.145903 205.209877,246 199.912458,246 C194.615039,246 190.112233,244.145903 186.40404,240.43771 L128,182.03367 L69.5959596,240.43771 C65.8877666,244.145903 61.3849607,246 56.0875421,246 C50.7901235,246 46.2873176,244.145903 42.5791246,240.43771 L15.5622896,213.420875 C11.8540965,209.712682 10,205.209877 10,199.912458 C10,194.615039 11.8540965,190.112233 15.5622896,186.40404 L73.96633,128 L15.5622896,69.5959596 C11.8540965,65.8877666 10,61.3849607 10,56.0875421 C10,50.7901235 11.8540965,46.2873176 15.5622896,42.5791246 L42.5791246,15.5622896 C46.2873176,11.8540965 50.7901235,10 56.0875421,10 C61.3849607,10 65.8877666,11.8540965 69.5959596,15.5622896 L128,73.96633 L186.40404,15.5622896 C190.112233,11.8540965 194.615039,10 199.912458,10 C205.209877,10 209.712682,11.8540965 213.420875,15.5622896 L240.43771,42.5791246 C244.145903,46.2873176 246,50.7901235 246,56.0875421 C246,61.3849607 244.145903,65.8877666 240.43771,69.5959596 L182.03367,128 L240.43771,186.40404 C244.145903,190.112233 246,194.615039 246,199.912458 Z" id="Shape"/>
  </g>
</svg>


<svg id="exclamation-circle" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M126.099643,13.4003571 C146.981071,13.4003571 166.239881,18.5451786 183.876071,28.8348214 C201.512262,39.1244643 215.475179,53.087381 225.764821,70.7235714 C236.054464,88.3597619 241.199286,107.618571 241.199286,128.5 C241.199286,149.381429 236.054464,168.640238 225.764821,186.276429 C215.475179,203.912619 201.512262,217.875536 183.876071,228.165179 C166.239881,238.454821 146.981071,243.599643 126.099643,243.599643 C105.218214,243.599643 85.9594048,238.454821 68.3232143,228.165179 C50.6870238,217.875536 36.7241071,203.912619 26.4344643,186.276429 C16.1448214,168.640238 11,149.381429 11,128.5 C11,107.618571 16.1448214,88.3597619 26.4344643,70.7235714 C36.7241071,53.087381 50.6870238,39.1244643 68.3232143,28.8348214 C85.9594048,18.5451786 105.218214,13.4003571 126.099643,13.4003571 Z M145.285714,200.2925 L145.285714,171.815536 C145.285714,170.416726 144.835298,169.241726 143.934464,168.290536 C143.033631,167.339345 141.934167,166.86375 140.636071,166.86375 L111.856964,166.86375 C110.558869,166.86375 109.409048,167.364524 108.4075,168.366071 C107.405952,169.367619 106.905179,170.51744 106.905179,171.815536 L106.905179,200.2925 C106.905179,201.590595 107.405952,202.740417 108.4075,203.741964 C109.409048,204.743512 110.558869,205.244286 111.856964,205.244286 L140.636071,205.244286 C141.934167,205.244286 143.033631,204.76869 143.934464,203.8175 C144.835298,202.86631 145.285714,201.69131 145.285714,200.2925 L145.285714,200.2925 Z M144.983571,148.735179 L147.677679,55.6667857 C147.677679,54.4694048 147.176905,53.571369 146.175357,52.9726786 C145.17381,52.1725595 143.973631,51.7725 142.574821,51.7725 L109.599286,51.7725 C108.200476,51.7725 107.000298,52.1725595 105.99875,52.9726786 C104.997202,53.571369 104.496429,54.4694048 104.496429,55.6667857 L107.047857,148.735179 C107.047857,149.736726 107.548631,150.612381 108.550179,151.362143 C109.551726,152.111905 110.751905,152.486786 112.150714,152.486786 L139.880714,152.486786 C141.279524,152.486786 142.454524,152.111905 143.405714,151.362143 C144.356905,150.612381 144.882857,149.736726 144.983571,148.735179 L144.983571,148.735179 Z"/>
  </g>
</svg>


<svg id="eye-slash" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M82.3325,179.22 L92.78,160.335 C85.01,154.71 78.9375,147.6125 74.5625,139.0425 C70.1875,130.4725 68,121.41 68,111.855 C68,101.05 70.7225,91.005 76.1675,81.72 C55.7225,92.165 38.7125,107.925 25.1375,129 C40.0475,152.035 59.11,168.775 82.325,179.22 L82.3325,179.22 Z M134.4275,77.5725 C134.4275,75.7875 133.8025,74.27 132.5525,73.02 C131.3025,71.77 129.785,71.145 128,71.145 C116.84,71.145 107.265,75.14 99.275,83.13 C91.285,91.12 87.29,100.695 87.29,111.855 C87.29,113.64 87.915,115.1575 89.165,116.4075 C90.415,117.6575 91.9325,118.2825 93.7175,118.2825 C95.5025,118.2825 97.02,117.6575 98.27,116.4075 C99.52,115.1575 100.145,113.64 100.145,111.855 C100.145,104.175 102.8675,97.6125 108.3125,92.1675 C113.7575,86.7225 120.32,84 128,84 C129.785,84 131.3025,83.375 132.5525,82.125 C133.8025,80.875 134.4275,79.3575 134.4275,77.5725 L134.4275,77.5725 Z M183.0425,51.99 C183.0425,52.615 182.9975,53.0175 182.9075,53.1975 C173.5325,69.9825 159.47,95.25 140.72,129 C121.97,162.75 107.8625,188.0625 98.3975,204.9375 L91.835,216.855 C90.94,218.285 89.69,219 88.085,219 C87.015,219 81.0325,215.875 70.1375,209.625 C68.7075,208.73 67.9925,207.48 67.9925,205.875 C67.9925,204.805 69.9575,200.92 73.8875,194.22 C61.1175,188.415 49.355,180.6925 38.6,171.0525 C27.845,161.4125 18.5375,150.475 10.6775,138.24 C8.8925,135.47 8,132.39 8,129 C8,125.61 8.8925,122.53 10.6775,119.76 C24.3375,98.78 41.3025,82.2175 61.5725,70.0725 C81.8425,57.9275 103.985,51.855 128,51.855 C135.945,51.855 143.98,52.615 152.105,54.135 L159.335,41.145 C160.23,39.715 161.48,39 163.085,39 C163.53,39 164.3325,39.2675 165.4925,39.8025 C166.6525,40.3375 168.0375,41.03 169.6475,41.88 C171.2575,42.73 172.73,43.555 174.065,44.355 C175.4,45.155 176.8075,45.98 178.2875,46.83 C179.7675,47.68 180.6375,48.1925 180.8975,48.3675 C182.3275,49.2625 183.0425,50.4675 183.0425,51.9825 L183.0425,51.99 Z M188,111.855 C188,124.265 184.4725,135.5825 177.4175,145.8075 C170.3625,156.0325 161.0325,163.3775 149.4275,167.8425 L186.9275,100.6125 C187.6425,104.6325 188,108.3825 188,111.8625 L188,111.855 Z M248,129 C248,132.125 247.1075,135.205 245.3225,138.24 C241.8425,143.955 236.9775,150.4275 230.7275,157.6575 C217.3325,173.0125 201.82,184.9325 184.19,193.4175 C166.56,201.9025 147.8325,206.1425 128.0075,206.1375 L137.915,188.46 C156.845,186.855 174.3675,180.74 190.4825,170.115 C206.5975,159.49 220.0575,145.785 230.8625,129 C220.5925,113.02 208.0025,99.895 193.0925,89.625 L201.53,74.625 C210.01,80.34 218.1575,87.17 225.9725,95.115 C233.7875,103.06 240.2375,111.275 245.3225,119.76 C247.1075,122.795 248,125.875 248,129 Z"/>
  </g>
</svg>


<svg id="eye" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M230.855,129.5725 C217.285,108.5025 200.275,92.7425 179.825,82.2925 C185.27,91.5775 187.9925,101.6225 187.9925,112.4275 C187.9925,128.9475 182.1225,143.0775 170.3825,154.8175 C158.6425,166.5575 144.5125,172.4275 127.9925,172.4275 C111.4725,172.4275 97.3425,166.5575 85.6025,154.8175 C73.8625,143.0775 67.9925,128.9475 67.9925,112.4275 C67.9925,101.6225 70.715,91.5775 76.16,82.2925 C55.715,92.7375 38.705,108.4975 25.13,129.5725 C37.005,147.8775 51.8925,162.4525 69.7925,173.2975 C87.6925,184.1425 107.09,189.5675 127.985,189.5725 C148.88,189.5775 168.2775,184.1525 186.1775,173.2975 C204.0775,162.4425 218.965,147.8675 230.84,129.5725 L230.855,129.5725 Z M134.4275,78.145 C134.4275,76.36 133.8025,74.8425 132.5525,73.5925 C131.3025,72.3425 129.785,71.7175 128,71.7175 C116.84,71.7175 107.265,75.7125 99.275,83.7025 C91.285,91.6925 87.29,101.2675 87.29,112.4275 C87.29,114.2125 87.915,115.73 89.165,116.98 C90.415,118.23 91.9325,118.855 93.7175,118.855 C95.5025,118.855 97.02,118.23 98.27,116.98 C99.52,115.73 100.145,114.2125 100.145,112.4275 C100.145,104.7475 102.8675,98.185 108.3125,92.74 C113.7575,87.295 120.32,84.5725 128,84.5725 C129.785,84.5725 131.3025,83.9475 132.5525,82.6975 C133.8025,81.4475 134.4275,79.93 134.4275,78.145 L134.4275,78.145 Z M248,129.5725 C248,132.6075 247.1075,135.6875 245.3225,138.8125 C232.8225,159.3475 216.015,175.7975 194.9,188.1625 C173.785,200.5275 151.485,206.71 128,206.71 C104.515,206.71 82.215,200.505 61.1,188.095 C39.985,175.685 23.1775,159.2575 10.6775,138.8125 C8.8925,135.6875 8,132.6075 8,129.5725 C8,126.5375 8.8925,123.4575 10.6775,120.3325 C23.1775,99.8875 39.985,83.46 61.1,71.05 C82.215,58.64 104.515,52.435 128,52.435 C151.485,52.435 173.785,58.64 194.9,71.05 C216.015,83.46 232.8225,99.8875 245.3225,120.3325 C247.1075,123.4575 248,126.5375 248,129.5725 Z"/>
  </g>
</svg>


<svg id="credit-card" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M226.333333,36 L29.6666667,36 C18.8090278,36 10,44.8090278 10,55.6666667 L10,199.888889 C10,210.746528 18.8090278,219.555556 29.6666667,219.555556 L226.333333,219.555556 C237.190972,219.555556 246,210.746528 246,199.888889 L246,55.6666667 C246,44.8090278 237.190972,36 226.333333,36 Z M29.6666667,49.1111111 L226.333333,49.1111111 C229.938889,49.1111111 232.888889,52.0611111 232.888889,55.6666667 L232.888889,75.3333333 L23.1111111,75.3333333 L23.1111111,55.6666667 C23.1111111,52.0611111 26.0611111,49.1111111 29.6666667,49.1111111 Z M226.333333,206.444444 L29.6666667,206.444444 C26.0611111,206.444444 23.1111111,203.494444 23.1111111,199.888889 L23.1111111,114.666667 L232.888889,114.666667 L232.888889,199.888889 C232.888889,203.494444 229.938889,206.444444 226.333333,206.444444 Z M88.6666667,172.027778 L88.6666667,175.305556 C88.6666667,178.009722 86.4541667,180.222222 83.75,180.222222 L54.25,180.222222 C51.5458333,180.222222 49.3333333,178.009722 49.3333333,175.305556 L49.3333333,172.027778 C49.3333333,169.323611 51.5458333,167.111111 54.25,167.111111 L83.75,167.111111 C86.4541667,167.111111 88.6666667,169.323611 88.6666667,172.027778 Z M167.333333,172.027778 L167.333333,175.305556 C167.333333,178.009722 165.120833,180.222222 162.416667,180.222222 L106.694444,180.222222 C103.990278,180.222222 101.777778,178.009722 101.777778,175.305556 L101.777778,172.027778 C101.777778,169.323611 103.990278,167.111111 106.694444,167.111111 L162.416667,167.111111 C165.120833,167.111111 167.333333,169.323611 167.333333,172.027778 Z"/>
  </g>
</svg>


<svg id="facebook" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M186.538462,11.7019231 L186.538462,49.1442308 L164.271635,49.1442308 C156.140224,49.1442308 150.65625,50.8461538 147.819712,54.25 C144.983173,57.6538462 143.564904,62.7596154 143.564904,69.5673077 L143.564904,96.3725962 L185.120192,96.3725962 L179.588942,138.353365 L143.564904,138.353365 L143.564904,246 L100.165865,246 L100.165865,138.353365 L64,138.353365 L64,96.3725962 L100.165865,96.3725962 L100.165865,65.4543269 C100.165865,47.8677885 105.082532,34.228766 114.915865,24.5372596 C124.749199,14.8457532 137.844551,10 154.201923,10 C168.100962,10 178.879808,10.5673077 186.538462,11.7019231 Z"/>
  </g>
</svg>


<svg id="github" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M245.020747,130.453029 C245.020747,156.697992 237.549046,180.301909 222.604664,201.266739 C207.660282,222.231568 188.356266,236.739203 164.690656,244.789643 C161.936996,245.312564 159.921693,244.946324 158.646705,243.6919 C157.371718,242.437477 156.734224,240.868714 156.734224,238.986589 L156.734224,205.89371 C156.734224,195.751585 154.082407,188.327867 148.777793,183.622556 C154.592598,182.994855 159.819851,182.053793 164.46151,180.799369 C169.10317,179.544946 173.896614,177.506141 178.84478,174.682954 C183.791967,171.859768 187.923436,168.383419 191.238207,164.252929 C194.552979,160.12244 197.256697,154.633726 199.347402,147.78483 C201.438108,140.935934 202.48395,133.067635 202.48395,124.179934 C202.48395,111.527983 198.454324,100.758158 190.39605,91.8704564 C194.170091,82.3550539 193.762722,71.6900083 189.171983,59.8753195 C186.315502,58.9342573 182.185012,59.5090788 176.778556,61.6007635 C171.3721,63.6924481 166.680498,65.9917344 162.702772,68.5015602 L156.887967,72.2658091 C147.400963,69.5474025 137.608432,68.1881992 127.510373,68.1881992 C117.412315,68.1881992 107.619784,69.5474025 98.1327801,72.2658091 C96.5003651,71.1151867 94.333278,69.704083 91.6295602,68.0315187 C88.9258423,66.3589544 84.6680498,64.34561 78.8532448,61.993444 C73.0384398,59.641278 68.6523651,58.9352365 65.6940415,59.8762988 C61.2061245,71.6919668 60.8486971,82.3570124 64.6227386,91.8714357 C56.5644647,100.759137 52.5348382,111.528963 52.5348382,124.180913 C52.5348382,133.068614 53.5806805,140.910473 55.6713859,147.70649 C57.7620913,154.502506 60.4403485,159.992199 63.7041992,164.174589 C66.9680498,168.356979 71.0740581,171.859768 76.0212448,174.682954 C80.9684315,177.506141 85.7628548,179.544946 90.4045145,180.799369 C95.0461743,182.053793 100.273427,182.994855 106.088232,183.622556 C102.007685,187.386805 99.5086307,192.771718 98.5910705,199.777295 C96.4484647,200.823137 94.1540747,201.607519 91.7059419,202.129461 C89.2578091,202.651402 86.3504066,202.913842 82.9847137,202.913842 C79.6190207,202.913842 76.2778091,201.78966 72.9630373,199.542274 C69.6482656,197.293909 66.8172448,194.02712 64.4709544,189.73995 C62.5330124,186.393842 60.0594191,183.675436 57.0501743,181.58473 C54.0409295,179.493046 51.5164149,178.238622 49.4766307,177.820481 L46.4164647,177.35044 C44.2738589,177.35044 42.7951867,177.585461 41.9794689,178.056481 C41.163751,178.526523 40.908166,179.127784 41.2146722,179.860266 C41.5201992,180.591768 41.9794689,181.324249 42.5915021,182.055751 C43.2035353,182.787253 43.8664896,183.414954 44.5803651,183.937876 L45.651668,184.722257 C47.8961162,185.7681 50.1141245,187.754025 52.3076515,190.681992 C54.5011784,193.609959 56.1071535,196.275485 57.1275353,198.680531 L58.6571286,202.2881 C59.9830373,206.260929 62.2274855,209.476797 65.3894938,211.933743 C68.5515021,214.390689 71.9690954,215.959452 75.6412946,216.639054 C79.3134938,217.318656 82.85839,217.684896 86.2750041,217.736797 C89.6916183,217.788697 92.522639,217.606556 94.7670871,217.187436 L98.2865228,216.559734 C98.2865228,220.532564 98.3119834,225.185975 98.3629046,230.518988 C98.4138257,235.852 98.4392863,238.674207 98.4392863,238.988548 C98.4392863,240.870672 97.776332,242.439436 96.4504232,243.693859 C95.1245145,244.948282 93.083751,245.314523 90.3300913,244.791602 C66.6644813,236.740183 47.3604647,222.232548 32.416083,201.268697 C17.4717012,180.304846 10,156.697992 10,130.453029 C10,108.600017 15.2536929,88.4460083 25.7600996,69.9910041 C36.2665062,51.536 50.5214938,36.9245643 68.5260415,26.1547386 C86.5305892,15.3849129 106.191054,10 127.510373,10 C148.829693,10 168.491137,15.3849129 186.494705,26.1547386 C204.498274,36.9245643 218.754241,51.5369793 229.260647,69.9919834 C239.767054,88.4469876 245.020747,108.600017 245.020747,130.453029 Z"/>
  </g>
</svg>


<svg id="equalizer" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M216.940994,113.25 L220.651398,113.25 C226.773564,113.25 231.782609,108.271875 231.782609,102.1875 L231.782609,65.3125 C231.782609,59.228125 226.773564,54.25 220.651398,54.25 L216.940994,54.25 L216.940994,10 L187.257764,10 L187.257764,54.25 L183.54736,54.25 C177.425194,54.25 172.416149,59.228125 172.416149,65.3125 L172.416149,102.1875 C172.416149,108.271875 177.425194,113.25 183.54736,113.25 L187.257764,113.25 L187.257764,246 L216.940994,246 L216.940994,113.25 Z M187.257764,69 L216.940994,69 L216.940994,98.5 L187.257764,98.5 L187.257764,69 Z M146.443323,201.75 C152.565489,201.75 157.574534,196.771875 157.574534,190.6875 L157.574534,153.8125 C157.574534,147.728125 152.565489,142.75 146.443323,142.75 L142.732919,142.75 L142.732919,10 L113.049689,10 L113.049689,142.75 L109.339286,142.75 C103.21712,142.75 98.2080745,147.728125 98.2080745,153.8125 L98.2080745,190.6875 C98.2080745,196.771875 103.21712,201.75 109.339286,201.75 L113.049689,201.75 L113.049689,246 L142.732919,246 L142.732919,201.75 L146.443323,201.75 Z M113.049689,157.5 L142.732919,157.5 L142.732919,187 L113.049689,187 L113.049689,157.5 Z M72.2352484,113.25 C78.3574146,113.25 83.3664596,108.271875 83.3664596,102.1875 L83.3664596,65.3125 C83.3664596,59.228125 78.3574146,54.25 72.2352484,54.25 L68.5248447,54.25 L68.5248447,10 L38.8416149,10 L38.8416149,54.25 L35.1312112,54.25 C29.009045,54.25 24,59.228125 24,65.3125 L24,102.1875 C24,108.271875 29.009045,113.25 35.1312112,113.25 L38.8416149,113.25 L38.8416149,246 L68.5248447,246 L68.5248447,113.25 L72.2352484,113.25 Z M38.8416149,69 L68.5248447,69 L68.5248447,98.5 L38.8416149,98.5 L38.8416149,69 Z" id="icon-equalizer"/>
  </g>
</svg>


<svg id="instagram" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M219.265625,209.432292 L219.265625,109.869792 L198.523438,109.869792 C200.572049,116.322917 201.596354,123.032118 201.596354,129.997396 C201.596354,142.903646 198.318576,154.811198 191.763021,165.720052 C185.207465,176.628906 176.296007,185.258681 165.028646,191.609375 C153.761285,197.960069 141.469618,201.135417 128.153646,201.135417 C107.974826,201.135417 90.7152778,194.195747 76.375,180.316406 C62.0347222,166.437066 54.8645833,149.664062 54.8645833,129.997396 C54.8645833,123.032118 55.8888889,116.322917 57.9375,109.869792 L36.2734375,109.869792 L36.2734375,209.432292 C36.2734375,212.095486 37.1697049,214.323351 38.9622396,216.115885 C40.7547743,217.90842 42.9826389,218.804687 45.6458333,218.804687 L209.893229,218.804687 C212.453993,218.804687 214.65625,217.90842 216.5,216.115885 C218.34375,214.323351 219.265625,212.095486 219.265625,209.432292 Z M175.630208,127.539063 C175.630208,114.837674 170.995226,104.005642 161.72526,95.0429688 C152.455295,86.0802951 141.264757,81.5989583 128.153646,81.5989583 C115.144965,81.5989583 104.005642,86.0802951 94.7356771,95.0429688 C85.4657118,104.005642 80.8307292,114.837674 80.8307292,127.539063 C80.8307292,140.240451 85.4657118,151.072483 94.7356771,160.035156 C104.005642,168.99783 115.144965,173.479167 128.153646,173.479167 C141.264757,173.479167 152.455295,168.99783 161.72526,160.035156 C170.995226,151.072483 175.630208,140.240451 175.630208,127.539063 Z M219.265625,72.2265625 L219.265625,46.875 C219.265625,44.0069444 218.241319,41.5230035 216.192708,39.4231771 C214.144097,37.3233507 211.634549,36.2734375 208.664062,36.2734375 L181.929688,36.2734375 C178.959201,36.2734375 176.449653,37.3233507 174.401042,39.4231771 C172.352431,41.5230035 171.328125,44.0069444 171.328125,46.875 L171.328125,72.2265625 C171.328125,75.1970486 172.352431,77.7065972 174.401042,79.7552083 C176.449653,81.8038194 178.959201,82.828125 181.929688,82.828125 L208.664062,82.828125 C211.634549,82.828125 214.144097,81.8038194 216.192708,79.7552083 C218.241319,77.7065972 219.265625,75.1970486 219.265625,72.2265625 Z M246,40.2682292 L246,215.731771 C246,224.028646 243.029514,231.147569 237.088542,237.088542 C231.147569,243.029514 224.028646,246 215.731771,246 L40.2682292,246 C31.9713542,246 24.8524306,243.029514 18.9114583,237.088542 C12.9704861,231.147569 10,224.028646 10,215.731771 L10,40.2682292 C10,31.9713542 12.9704861,24.8524306 18.9114583,18.9114583 C24.8524306,12.9704861 31.9713542,10 40.2682292,10 L215.731771,10 C224.028646,10 231.147569,12.9704861 237.088542,18.9114583 C243.029514,24.8524306 246,31.9713542 246,40.2682292 Z"/>
  </g>
</svg>


<svg id="heart-o" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M222.944078,39.3395243 C232.469215,47.3270078 239.075354,57.1577641 242.762502,68.8317796 C246.449652,80.505795 246.987363,92.2566154 244.37563,104.084241 C241.763898,115.911866 236.156363,126.126627 227.553015,134.728537 L138.600552,226.891836 C135.527926,229.963948 131.994414,231.5 128,231.5 C124.005586,231.5 120.472074,229.963948 117.399448,226.891836 L28.4469857,135.189353 C19.8436364,126.280238 14.2361025,115.911866 11.6243699,104.084241 C9.01263721,92.2566154 9.55034867,80.505795 13.2374974,68.8317796 C16.924646,57.1577641 23.4539742,47.3270078 32.8254748,39.3395243 C42.1969753,31.3520408 52.5670809,26.743876 63.9357917,25.5150296 C74.0754506,24.2861833 84.3687383,25.6686328 94.8156619,29.6623781 C104.340799,33.3489099 112.329618,38.5714945 118.782129,45.3301387 L128,55.0072848 L137.217871,45.3301387 C144.899434,37.3426551 153.886859,31.6592471 164.180146,28.2799285 C174.473434,24.90061 184.843539,24.1325802 195.290463,25.9758461 C205.737386,27.8191121 214.955259,32.2736738 222.944078,39.3395243 Z M216.952462,124.590575 C223.097708,118.446357 227.322567,110.842885 229.627035,101.780159 C231.931504,92.7174318 231.854686,83.8851205 229.396589,75.2832104 C226.631227,65.452461 221.330951,57.2345622 213.49576,50.6295283 C205.66057,44.0244943 196.980408,40.4147604 187.455272,39.8003408 C179.773711,39.4931275 171.938519,41.1827902 163.9497,44.8693221 C157.189924,47.6342211 151.812837,51.320753 147.818425,55.9289178 L128,76.2048434 L108.181576,55.9289178 C103.879904,51.320753 98.5028109,47.480618 92.0503004,44.4085057 C84.0614806,40.7219738 76.2262897,39.1859211 68.5447276,39.8003408 C59.0195912,40.4147604 50.339431,44.0244943 42.5042401,50.6295283 C34.6690491,57.2345622 29.3687729,65.452461 26.6034114,75.2832104 C24.1453146,83.8851205 24.0684967,92.7174318 26.3729645,101.780159 C28.6774325,110.842885 32.9022927,118.446357 39.0475382,124.590575 L128,216.753872 L216.952462,124.590575 Z" id="Shape" fill-rule="nonzero"/>
  </g>
</svg>


<svg id="heart" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M222.944078,39.3395243 C232.469215,47.3270078 239.075354,57.1577642 242.762502,68.8317796 C246.449652,80.505795 246.987363,92.2566154 244.37563,104.084241 C241.763898,115.911866 236.156363,126.126627 227.553015,134.728537 L138.600552,226.891836 C135.527926,229.963948 131.994414,231.5 128,231.5 C124.005586,231.5 120.472074,229.963948 117.399448,226.891836 L28.4469857,135.189353 C19.8436364,126.280238 14.2361025,115.911866 11.6243699,104.084241 C9.01263721,92.2566154 9.55034867,80.505795 13.2374974,68.8317796 C16.924646,57.1577642 23.5307851,47.3270078 33.0559215,39.3395243 C41.3520061,32.2736738 50.7235066,27.8191121 61.1704302,25.9758461 C71.6173538,24.1325802 81.9106415,24.90061 92.0503004,28.2799285 C102.189959,31.6592471 111.100566,37.3426551 118.782129,45.3301387 L128,54.5464684 L137.217871,45.3301387 C144.899434,37.3426551 153.810041,31.6592471 163.9497,28.2799285 C174.089359,24.90061 184.382646,24.1325802 194.82957,25.9758461 C205.276493,27.8191121 214.647994,32.2736738 222.944078,39.3395243 Z" id="Path"/>
  </g>
</svg>


<svg id="link" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M224.5615,32.3275 L223.6795,31.4455 C203.0855,10.8515 169.3875,10.8515 148.7935,31.4455 L101.0815,79.1645 C80.4875,99.7585 80.4875,133.4565 101.0815,154.0435 L101.9635,154.9255 C103.6785,156.6405 105.4985,158.1875 107.3745,159.6225 L124.8395,142.1575 C122.8025,140.9535 120.8775,139.5185 119.1275,137.7685 L118.2455,136.8865 C107.0665,125.7075 107.0665,107.5145 118.2455,96.3355 L165.9575,48.6235 C177.1365,37.4445 195.3295,37.4445 206.5085,48.6235 L207.3905,49.5055 C218.5695,60.6845 218.5695,78.8845 207.3905,90.0565 L185.8025,111.6445 C189.5475,120.8985 191.3255,130.7615 191.1715,140.6035 L224.5545,107.2205 C245.1485,86.6265 245.1485,52.9285 224.5545,32.3415 L224.5615,32.3275 Z M154.0435,101.0745 C152.3285,99.3595 150.5085,97.8125 148.6325,96.3845 L131.1675,113.8495 C133.2045,115.0535 135.1295,116.4885 136.8795,118.2385 L137.7615,119.1205 C148.9405,130.2995 148.9405,148.4925 137.7615,159.6715 L90.0425,207.3905 C78.8635,218.5695 60.6705,218.5695 49.4915,207.3905 L48.6095,206.5085 C37.4305,195.3225 37.4305,177.1365 48.6095,165.9575 L70.1975,144.3695 C66.4525,135.1155 64.6745,125.2525 64.8285,115.4105 L31.4455,148.7935 C10.8515,169.3875 10.8515,203.0855 31.4455,223.6795 L32.3275,224.5615 C52.9215,245.1555 86.6195,245.1555 107.2135,224.5615 L154.9255,176.8495 C175.5195,156.2555 175.5195,122.5575 154.9255,101.9635 L154.0435,101.0815 L154.0435,101.0745 Z"/>
  </g>
</svg>


<svg id="location-arrow" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M232.275508,36.3039456 L136.36718,228.11221 C134.666469,231.608737 131.818898,233.357 127.824466,233.357 C127.32656,233.357 126.576905,233.2563 125.5755,233.0549 C123.376884,232.556995 121.603445,231.432512 120.255185,229.681451 C118.906924,227.930391 118.232794,225.95835 118.232794,223.765328 L118.232794,137.448672 L31.9161375,137.448672 C29.7175215,137.448672 27.7454805,136.774542 26.0000144,135.426281 C24.2545483,134.07802 23.1300653,132.304582 22.6265655,130.105966 C22.1230656,127.90735 22.3216683,125.809434 23.2223736,123.812218 C24.1230789,121.815002 25.5720395,120.315691 27.5692556,119.314286 L219.37752,23.405958 C220.675431,22.7066527 222.124391,22.357 223.724402,22.357 C226.420923,22.357 228.669889,23.305258 230.4713,25.2017741 C231.97061,26.6003848 232.893693,28.3234731 233.240549,30.3710391 C233.587404,32.4186052 233.262927,34.3906462 232.267116,36.2871623 L232.275508,36.3039456 Z"/>
  </g>
</svg>


<svg id="map-marker" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M166.982777,88.6695285 C166.982777,77.8108453 163.142371,68.5410977 155.461559,60.8602858 C147.780747,53.179474 138.511,49.339068 127.652317,49.339068 C116.793633,49.339068 107.523886,53.179474 99.8430739,60.8602858 C92.1622621,68.5410977 88.3218561,77.8108453 88.3218561,88.6695285 C88.3218561,99.5282118 92.1622621,108.797959 99.8430739,116.478771 C107.523886,124.159583 116.793633,127.999989 127.652317,127.999989 C138.511,127.999989 147.780747,124.159583 155.461559,116.478771 C163.142371,108.797959 166.982777,99.5282118 166.982777,88.6695285 L166.982777,88.6695285 Z M206.321842,88.6695285 C206.321842,99.8322319 204.632522,108.998727 201.253883,116.169015 L145.325641,235.089665 C143.685079,238.468305 141.252918,241.132784 138.029157,243.083102 C134.805395,245.03342 131.349317,246.005711 127.660921,245.999975 C123.972525,245.994239 120.516447,245.021948 117.292685,243.083102 C114.068924,241.144256 111.688389,238.479777 110.151079,235.089665 L54.0679591,116.169015 C50.6893197,108.998727 49,99.8322319 49,88.6695285 C49,66.952162 56.68368,48.4126669 72.05104,33.0510432 C87.4183999,17.6894194 105.957895,10.0057394 127.669525,10.0000032 C149.381156,9.99426698 167.920651,17.677947 183.288011,33.0510432 C198.655371,48.4241394 206.339051,66.9636345 206.339051,88.6695285 L206.321842,88.6695285 Z" id="icon-map-marker"/>
  </g>
</svg>


<svg id="media-article" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M118.96061,18.1745377 C118.96061,19.5513945 118.478707,20.7217287 117.514909,21.6855279 C116.551109,22.6493271 115.380775,23.1312298 114.003918,23.1312298 L4.95669217,23.1312298 C3.57983527,23.1312298 2.40950105,22.6493271 1.44570185,21.6855279 C0.48190265,20.7217287 0,19.5513945 0,18.1745377 L0,4.95669217 C0,3.57983527 0.48190265,2.40950105 1.44570185,1.44570185 C2.40950105,0.48190265 3.57983527,0 4.95669217,0 L114.003918,0 C115.380775,0 116.551109,0.48190265 117.514909,1.44570185 C118.478707,2.40950105 118.96061,3.57983527 118.96061,4.95669217 L118.96061,18.1745377 Z M4.95669217,76.0026128 C3.57983527,76.0026128 2.40950105,75.5207099 1.44570185,74.5569101 C0.48190265,73.5931118 0,72.4227775 0,71.0459196 L0,57.828074 C0,56.4512176 0.48190265,55.2808834 1.44570185,54.3170835 C2.40950105,53.3532853 3.57983527,52.8713823 4.95669217,52.8713823 L180.093146,52.8713823 C181.470003,52.8713823 182.640337,53.3532853 183.604137,54.3170835 C184.567935,55.2808834 185.049838,56.4512176 185.049838,57.828074 L185.049838,71.0459196 C185.049838,72.4227775 184.567935,73.5931118 183.604137,74.5569101 C182.640337,75.5207099 181.470003,76.0026128 180.093146,76.0026128 L4.95669217,76.0026128 Z M4.95669217,181.745377 C3.57983527,181.745377 2.40950105,181.263474 1.44570185,180.299675 C0.48190265,179.335876 0,178.165542 0,176.788684 L0,163.570839 C0,162.193982 0.48190265,161.023648 1.44570185,160.059848 C2.40950105,159.09605 3.57983527,158.614147 4.95669217,158.614147 L180.093146,158.614147 C181.470003,158.614147 182.640337,159.09605 183.604137,160.059848 C184.567935,161.023648 185.049838,162.193982 185.049838,163.570839 L185.049838,176.788684 C185.049838,178.165542 184.567935,179.335876 183.604137,180.299675 C182.640337,181.263474 181.470003,181.745377 180.093146,181.745377 L4.95669217,181.745377 Z M114.003918,105.742765 C115.380775,105.742765 116.551109,106.224668 117.514909,107.188466 C118.478707,108.152266 118.96061,109.3226 118.96061,110.699456 L118.96061,123.917302 C118.96061,125.29416 118.478707,126.464494 117.514909,127.428292 C116.551109,128.392092 115.380775,128.873995 114.003918,128.873995 L4.95669217,128.873995 C3.57983527,128.873995 2.40950105,128.392092 1.44570185,127.428292 C0.48190265,126.464494 0,125.29416 0,123.917302 L0,110.699456 C0,109.3226 0.48190265,108.152266 1.44570185,107.188466 C2.40950105,106.224668 3.57983527,105.742765 4.95669217,105.742765 L114.003918,105.742765 Z"/>
  </g>
</svg>


<svg id="media-music" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M55.1913394,174.672848 C46.6103282,173.008125 36.6268115,173.640103 26.7262832,177.038918 C4.46046803,184.722858 -3.39854307,203.427898 2.51023815,218.795779 C8.40242194,234.171367 25.8383062,240.390966 48.1041213,232.707024 C67.0089015,226.186851 79.3990859,211.728403 79.0837291,198.094609 C79.0837291,198.094609 79.0837291,157.799521 79.0837291,77.2093452 L173.375265,57.1478633 L173.375265,150.002544 C164.794253,148.337818 154.810738,148.969799 144.91021,152.368612 C122.627796,160.052552 114.768786,178.757592 120.677566,194.125473 C126.586347,209.501061 144.005635,215.72066 166.288047,208.03672 C185.209426,201.516545 197.574712,187.058097 197.275955,173.424305 L197.275955,8.99178972 C197.275955,4.91868969 193.974055,1.61678972 189.900955,1.61678972 C189.416441,1.61678972 188.933108,1.66453566 188.45796,1.75933557 L62.6142165,26.8672424 C58.3033623,27.7273291 55.1994588,31.5114693 55.1992095,35.9072873 L55.1913394,174.672848 Z"/>
  </g>
</svg>


<svg id="media-video" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M168.208819,84.995565 C172.44049,87.3670546 175.283638,90.6607884 176.738276,94.8767721 C178.192914,99.0927558 178.192914,103.308734 176.738276,107.524717 C175.283638,111.740701 172.44049,115.034435 168.208819,117.405925 L28.5637616,199.617567 C24.5965726,201.989056 20.3649022,202.779553 15.8687566,201.989056 C11.3726108,201.198559 7.60378118,199.090571 4.56226745,195.665084 C1.52075372,192.239596 0,188.155367 0,183.412388 L0,18.9891028 C0,13.7191278 1.58687556,9.43726757 4.76062687,6.14353376 C7.93437818,2.84980013 11.7693298,0.873558707 16.2654754,0.214809667 C20.761621,-0.443939562 24.8610539,0.412433772 28.5637616,2.78392341 L168.208819,84.995565 Z"/>
  </g>
</svg>


<svg id="menu" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M246,197.166667 L246,216.833333 C246,219.496528 245.02691,221.801215 243.080729,223.747396 C241.134549,225.693576 238.829861,226.666667 236.166667,226.666667 L19.8333333,226.666667 C17.1701389,226.666667 14.8654514,225.693576 12.9192708,223.747396 C10.9730903,221.801215 10,219.496528 10,216.833333 L10,197.166667 C10,194.503472 10.9730903,192.198785 12.9192708,190.252604 C14.8654514,188.306424 17.1701389,187.333333 19.8333333,187.333333 L236.166667,187.333333 C238.829861,187.333333 241.134549,188.306424 243.080729,190.252604 C245.02691,192.198785 246,194.503472 246,197.166667 Z M246,118.5 L246,138.166667 C246,140.829861 245.02691,143.134549 243.080729,145.080729 C241.134549,147.02691 238.829861,148 236.166667,148 L19.8333333,148 C17.1701389,148 14.8654514,147.02691 12.9192708,145.080729 C10.9730903,143.134549 10,140.829861 10,138.166667 L10,118.5 C10,115.836806 10.9730903,113.532118 12.9192708,111.585938 C14.8654514,109.639757 17.1701389,108.666667 19.8333333,108.666667 L236.166667,108.666667 C238.829861,108.666667 241.134549,109.639757 243.080729,111.585938 C245.02691,113.532118 246,115.836806 246,118.5 Z M246,39.8333333 L246,59.5 C246,62.1631944 245.02691,64.4678819 243.080729,66.4140625 C241.134549,68.3602431 238.829861,69.3333333 236.166667,69.3333333 L19.8333333,69.3333333 C17.1701389,69.3333333 14.8654514,68.3602431 12.9192708,66.4140625 C10.9730903,64.4678819 10,62.1631944 10,59.5 L10,39.8333333 C10,37.1701389 10.9730903,34.8654514 12.9192708,32.9192708 C14.8654514,30.9730903 17.1701389,30 19.8333333,30 L236.166667,30 C238.829861,30 241.134549,30.9730903 243.080729,32.9192708 C245.02691,34.8654514 246,37.1701389 246,39.8333333 Z" id="Shape"/>
  </g>
</svg>


<svg id="media-podcast" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M30.8570701,41.150981 C30.8570701,29.7201507 34.8570578,20.0039512 42.8570411,12.0023695 C50.8570244,4.00078768 60.5712818,0 71.9998291,0 C83.4283749,0 93.1426323,4.00078768 101.142616,12.0023695 C109.142599,20.0039512 113.142588,29.7201507 113.142588,41.150981 L113.142588,109.735949 C113.142588,121.166779 109.142599,130.882979 101.142616,138.884561 C93.1426323,146.886143 83.4283749,150.88693 71.9998291,150.88693 C60.5712818,150.88693 50.8570244,146.886143 42.8570411,138.884561 C34.8570578,130.882979 30.8570701,121.166779 30.8570701,109.735949 L30.8570701,41.150981 Z M138.856812,85.7312112 C140.285378,85.7312112 141.499665,86.2313108 142.499661,87.2315068 C143.499655,88.2317012 143.999657,89.4462325 143.999657,90.8750835 L143.999657,109.735949 C143.999657,121.738318 141.28538,132.811931 135.856819,142.956793 C130.428258,153.101656 122.999706,161.531887 113.571157,168.247501 C104.142609,174.963115 93.7140638,179.178229 82.2855181,180.892854 L82.2855181,200.611033 L111.428306,200.611033 C112.856872,200.611033 114.071159,201.111134 115.071155,202.111328 C116.071149,203.111524 116.571151,204.326054 116.571151,205.754905 L116.571151,214.328026 C116.571151,215.756877 116.071149,216.971407 115.071155,217.971603 C114.071159,218.971798 112.856872,219.471899 111.428306,219.471899 L32.5713505,219.471899 C31.1427851,219.471899 29.9284979,218.971798 28.9285018,217.971603 C27.9285073,216.971407 27.428506,215.756877 27.428506,214.328026 L27.428506,205.754905 C27.428506,204.326054 27.9285073,203.111524 28.9285018,202.111328 C29.9284979,201.111134 31.1427851,200.611033 32.5713505,200.611033 L61.7141385,200.611033 L61.7141385,180.892854 C50.2855928,179.178229 39.8570479,174.963115 30.4284992,168.247501 C20.9999499,161.531887 13.5713984,153.101656 8.14283778,142.956793 C2.71427705,132.811931 0,121.738318 0,109.735949 L0,90.8750835 C0,89.4462325 0.500000914,88.2317012 1.49999641,87.2315068 C2.49999191,86.2313108 3.71427903,85.7312112 5.14284496,85.7312112 L15.4285347,85.7312112 C16.8571005,85.7312112 18.0713876,86.2313108 19.0713831,87.2315068 C20.0713786,88.2317012 20.5713795,89.4462325 20.5713795,90.8750835 L20.5713795,109.735949 C20.5713795,119.166382 22.9285168,127.810948 27.6427907,135.669641 C32.3570658,143.528332 38.6427671,149.743845 46.4998898,154.31618 C54.3570108,158.888512 62.9284193,161.174676 72.2141138,161.174676 C81.4998082,161.174676 90.0712167,158.817068 97.9283378,154.101851 C105.78546,149.386635 111.999731,143.028238 116.571151,135.026657 C121.14257,127.025075 123.428277,118.451954 123.428277,109.307293 L123.428277,90.8750835 C123.428277,89.4462325 123.928278,88.2317012 124.928273,87.2315068 C125.928269,86.2313108 127.142556,85.7312112 128.571122,85.7312112 L138.856812,85.7312112 Z"/>
  </g>
</svg>


<svg id="minus" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M24.9928573,112.443651 L231.007143,112.443651 C233.768566,112.443651 236.007143,114.682227 236.007143,117.443651 L236.007143,138.556349 C236.007143,141.317773 233.768566,143.556349 231.007143,143.556349 L24.9928573,143.556349 C22.2314336,143.556349 19.9928573,141.317773 19.9928573,138.556349 L19.9928573,117.443651 C19.9928573,114.682227 22.2314336,112.443651 24.9928573,112.443651 Z"/>
  </g>
</svg>


<svg id="menu-thin" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M242.852679,47.6875 L14.1473214,47.6875 C12.4091038,47.6875 11,46.5915304 11,45.2395833 L11,35.4479167 C11,34.0959696 12.4091038,33 14.1473214,33 L242.852679,33 C244.590896,33 246,34.0959696 246,35.4479167 L246,45.2395833 C246,46.5915304 244.590896,47.6875 242.852679,47.6875 Z M242.852679,135.8125 L14.1473214,135.8125 C12.4091038,135.8125 11,134.71653 11,133.364583 L11,123.572917 C11,122.22097 12.4091038,121.125 14.1473214,121.125 L242.852679,121.125 C244.590896,121.125 246,122.22097 246,123.572917 L246,133.364583 C246,134.71653 244.590896,135.8125 242.852679,135.8125 Z M242.852679,223.9375 L14.1473214,223.9375 C12.4091038,223.9375 11,222.84153 11,221.489583 L11,211.697917 C11,210.34597 12.4091038,209.25 14.1473214,209.25 L242.852679,209.25 C244.590896,209.25 246,210.34597 246,211.697917 L246,221.489583 C246,222.84153 244.590896,223.9375 242.852679,223.9375 Z"/>
  </g>
</svg>


<svg id="play-thin" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M128,246 C62.8303995,246 10,193.1696 10,128 C10,62.8303995 62.8303995,10 128,10 C193.1696,10 246,62.8303995 246,128 C246,193.1696 193.1696,246 128,246 Z M127.5,236 C187.422895,236 236,187.422895 236,127.5 C236,67.5771046 187.422895,19 127.5,19 C67.5771046,19 19,67.5771046 19,127.5 C19,187.422895 67.5771046,236 127.5,236 Z M106.752202,87.4098467 L173.600769,127.518987 C175.968671,128.939728 176.736496,132.011029 175.315755,134.37893 C174.893506,135.082678 174.304517,135.671667 173.600769,136.093916 L106.752202,176.203057 C104.384301,177.623797 101.313,176.855972 99.8922589,174.488071 C99.4260127,173.710994 99.1797235,172.821812 99.1797235,171.915592 L99.1797235,91.6973113 C99.1797235,88.9358876 101.4183,86.6973113 104.179724,86.6973113 C105.085943,86.6973113 105.975125,86.9436005 106.752202,87.4098467 Z" id="Oval"/>
  </g>
</svg>


<svg id="plus" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M143.556349,112.443651 L231.007143,112.443651 C233.768566,112.443651 236.007143,114.682227 236.007143,117.443651 L236.007143,138.556349 C236.007143,141.317773 233.768566,143.556349 231.007143,143.556349 L143.556349,143.556349 L143.556349,231.007143 C143.556349,233.768566 141.317773,236.007143 138.556349,236.007143 L117.443651,236.007143 C114.682227,236.007143 112.443651,233.768566 112.443651,231.007143 L112.443651,143.556349 L24.9928573,143.556349 C22.2314336,143.556349 19.9928573,141.317773 19.9928573,138.556349 L19.9928573,117.443651 C19.9928573,114.682227 22.2314336,112.443651 24.9928573,112.443651 L112.443651,112.443651 L112.443651,24.9928573 C112.443651,22.2314336 114.682227,19.9928573 117.443651,19.9928573 L138.556349,19.9928573 C141.317773,19.9928573 143.556349,22.2314336 143.556349,24.9928573 L143.556349,112.443651 Z"/>
  </g>
</svg>


<svg id="question-circle" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M147.666667,201.75 L147.666667,172.25 C147.666667,170.815972 147.205729,169.638021 146.283854,168.716146 C145.361979,167.794271 144.184028,167.333333 142.75,167.333333 L113.25,167.333333 C111.815972,167.333333 110.638021,167.794271 109.716146,168.716146 C108.794271,169.638021 108.333333,170.815972 108.333333,172.25 L108.333333,201.75 C108.333333,203.184028 108.794271,204.361979 109.716146,205.283854 C110.638021,206.205729 111.815972,206.666667 113.25,206.666667 L142.75,206.666667 C144.184028,206.666667 145.361979,206.205729 146.283854,205.283854 C147.205729,204.361979 147.666667,203.184028 147.666667,201.75 Z M187,98.5 C187,89.4861111 184.157552,81.1380208 178.472656,73.4557292 C172.78776,65.7734375 165.694444,59.8324653 157.192708,55.6328125 C148.690972,51.4331597 139.984375,49.3333333 131.072917,49.3333333 C106.182292,49.3333333 87.1814236,60.2421875 74.0703125,82.0598958 C72.5338542,84.5182292 72.9435764,86.6692708 75.2994792,88.5130208 L95.5807292,103.877604 C96.2977431,104.492187 97.2708333,104.799479 98.5,104.799479 C100.138889,104.799479 101.419271,104.184896 102.341146,102.955729 C107.769965,95.9904514 112.174479,91.2786458 115.554687,88.8203125 C119.037326,86.3619792 123.44184,85.1328125 128.768229,85.1328125 C133.684896,85.1328125 138.063802,86.4644097 141.904948,89.1276042 C145.746094,91.7907986 147.666667,94.8125 147.666667,98.1927083 C147.666667,102.085069 146.642361,105.209201 144.59375,107.565104 C142.545139,109.921007 139.0625,112.225694 134.145833,114.479167 C127.692708,117.347222 121.777344,121.777344 116.39974,127.769531 C111.022135,133.761719 108.333333,140.189236 108.333333,147.052083 L108.333333,152.583333 C108.333333,154.017361 108.794271,155.195312 109.716146,156.117187 C110.638021,157.039062 111.815972,157.5 113.25,157.5 L142.75,157.5 C144.184028,157.5 145.361979,157.039062 146.283854,156.117187 C147.205729,155.195312 147.666667,154.017361 147.666667,152.583333 C147.666667,150.637153 148.767795,148.101997 150.970052,144.977865 C153.172309,141.853733 155.963542,139.318576 159.34375,137.372396 C162.621528,135.528646 165.131076,134.06901 166.872396,132.99349 C168.613715,131.917969 170.969618,130.125434 173.940104,127.615885 C176.91059,125.106337 179.18967,122.648003 180.777344,120.240885 C182.365017,117.833767 183.799045,114.735243 185.079427,110.945312 C186.359809,107.155382 187,103.006944 187,98.5 Z M246,128 C246,149.407986 240.724826,169.151476 230.174479,187.230469 C219.624132,205.309462 205.309462,219.624132 187.230469,230.174479 C169.151476,240.724826 149.407986,246 128,246 C106.592014,246 86.8485243,240.724826 68.7695312,230.174479 C50.6905382,219.624132 36.3758681,205.309462 25.8255208,187.230469 C15.2751736,169.151476 10,149.407986 10,128 C10,106.592014 15.2751736,86.8485243 25.8255208,68.7695312 C36.3758681,50.6905382 50.6905382,36.3758681 68.7695312,25.8255208 C86.8485243,15.2751736 106.592014,10 128,10 C149.407986,10 169.151476,15.2751736 187.230469,25.8255208 C205.309462,36.3758681 219.624132,50.6905382 230.174479,68.7695312 C240.724826,86.8485243 246,106.592014 246,128 Z" id="Shape"/>
  </g>
</svg>


<svg id="screwhead-crds" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M127.580943,10 C62.6546385,10 10,62.6332815 10,127.609527 C10,192.549734 62.6546385,245.219054 127.580943,245.219054 C192.525268,245.219054 245.215947,192.549734 245.215947,127.609527 C245.215947,62.6332815 192.525268,10 127.580943,10 L127.580943,10 Z M168.984783,193.681891 L126.925945,151.571662 L85.7140495,192.816982 L61.0986367,168.149073 L102.274492,126.939791 L61.7473592,86.4152271 L86.380792,61.7112802 L126.925945,102.2899 L168.101801,61.0986367 L192.753253,85.7485269 L151.613438,126.939791 L193.654257,169.032 L168.984783,193.681891 Z"/>
  </g>
</svg>


<svg id="search-thin" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M244.375275,231.976661 L184.91724,172.518627 C183.857136,171.458523 182.474391,170.905425 180.999463,170.905425 L176.252038,170.905425 C192.061423,153.805478 201.740638,130.990186 201.740638,105.870319 C201.740638,52.911186 158.829452,10 105.870319,10 C52.911186,10 10,52.911186 10,105.870319 C10,158.829452 52.911186,201.740638 105.870319,201.740638 C130.990186,201.740638 153.805478,192.061423 170.905425,176.29813 L170.905425,180.999463 C170.905425,182.474391 171.504614,183.857136 172.518627,184.91724 L231.976661,244.375275 C234.142962,246.541575 237.645916,246.541575 239.812216,244.375275 L244.375275,239.812216 C246.541575,237.645916 246.541575,234.142962 244.375275,231.976661 Z M105.870319,186.991358 C61.0232899,186.991358 24.7492798,150.717348 24.7492798,105.870319 C24.7492798,61.0232899 61.0232899,24.7492798 105.870319,24.7492798 C150.717348,24.7492798 186.991358,61.0232899 186.991358,105.870319 C186.991358,150.717348 150.717348,186.991358 105.870319,186.991358 Z"/>
  </g>
</svg>


<svg id="search" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M240.698218,209.667105 L184.255946,153.224833 C192.769898,139.230958 197.671022,122.828531 197.671022,105.249835 C197.671022,54.2221374 153.439549,10 102.402516,10 C51.3748181,10 10,51.3748181 10,102.402516 C10,153.439549 54.212802,197.671022 105.249835,197.671022 C122.221726,197.671022 138.110701,193.068633 151.777834,185.077468 L208.518842,241.837146 C214.092119,247.391753 223.08218,247.391753 228.627451,241.837146 L242.714681,227.768588 C248.259952,222.213981 246.24349,215.221712 240.698218,209.67644 L240.698218,209.667105 Z M38.4358519,102.39318 C38.4358519,67.0677488 67.0677488,38.417181 102.39318,38.417181 C137.737282,38.417181 169.216499,69.9057327 169.216499,105.2405 C169.216499,140.575266 140.584602,169.216499 105.2405,169.216499 C69.8963973,169.216499 38.4265165,137.727947 38.4265165,102.39318 L38.4358519,102.39318 Z" id="Shape"/>
  </g>
</svg>


<svg id="share" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M166.681137,166.997714 L233.268624,100.410228 C235.662638,98.0162136 236.859645,95.1772944 236.859645,91.8934699 C236.859645,88.6096454 235.662638,85.7707262 233.268624,83.3767122 L166.681137,16.7892258 C162.895912,12.8768844 158.545727,11.9941358 153.630583,14.1409802 C148.588324,16.2878246 146.067194,20.0094924 146.067194,25.3059835 L146.067194,55.5701338 C131.060469,55.5701338 117.441425,56.7989197 105.210062,59.2564916 C92.978698,61.7140635 82.7317532,64.9307991 74.4692271,68.9066984 C66.2067009,72.8825978 59.017597,77.8648304 52.9019152,83.8533964 C46.7862335,89.8419623 41.9628956,95.8623072 38.4319015,101.914431 C34.9009074,107.966555 32.0937671,114.837869 30.0104806,122.528375 C27.9271941,130.21888 26.5712924,137.249089 25.9427754,143.619002 C25.3142585,149.988915 25,156.955567 25,164.518956 C25,187.343302 35.5294243,212.815893 56.588273,240.93673 C57.8523689,242.447995 59.4271923,243.203628 61.3127431,243.203628 C62.1954916,243.203628 63.0146823,243.012955 63.770315,242.631607 C66.5456763,241.494627 67.7426833,239.414872 67.361336,236.392341 C61.8106133,191.753513 65.7194237,161.930737 79.0877673,146.924013 C84.8856596,140.363426 93.0810969,135.603646 103.674079,132.644673 C114.267061,129.6857 128.391038,128.202682 146.046008,128.19562 L146.046008,158.45977 C146.046008,163.756261 148.567138,167.477929 153.609397,169.624774 C155.120663,170.253291 156.635459,170.567549 158.153787,170.567549 C161.430549,170.567549 164.269469,169.370542 166.670544,166.976528 L166.681137,166.997714 Z"/>
  </g>
</svg>


<svg id="twitter" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M246,54.7614213 C239.311337,64.5448393 231.225042,72.8807107 221.741117,79.7690355 C221.840948,81.1666667 221.890863,83.2631134 221.890863,86.0583756 C221.890863,99.036379 219.994078,111.989425 216.200508,124.917513 C212.406937,137.845601 206.641709,150.249577 198.904822,162.129442 C191.167936,174.009306 181.958545,184.516497 171.27665,193.651015 C160.594755,202.785533 147.716582,210.073181 132.642132,215.513959 C117.567682,220.954738 101.445008,223.675127 84.2741117,223.675127 C57.2199662,223.675127 32.4619289,216.437394 10,201.961929 C13.4940778,202.361252 17.3874788,202.560914 21.680203,202.560914 C44.142132,202.560914 64.1582064,195.672589 81.7284264,181.895939 C71.2461929,181.696277 61.8620981,178.476734 53.5761421,172.23731 C45.2901861,165.997885 39.5998308,158.036379 36.5050761,148.352792 C39.7994924,148.851946 42.8443316,149.101523 45.6395939,149.101523 C49.9323181,149.101523 54.1751269,148.552453 58.3680203,147.454315 C47.1869712,145.158206 37.927665,139.59264 30.5901015,130.757614 C23.2525381,121.922589 19.5837563,111.664975 19.5837563,99.9847716 L19.5837563,99.3857868 C26.3722504,103.179357 33.6598985,105.225888 41.4467005,105.525381 C34.857868,101.132826 29.6167513,95.392555 25.7233503,88.3045685 C21.8299492,81.2165821 19.8832487,73.5296108 19.8832487,65.2436548 C19.8832487,56.4585448 22.0795262,48.322335 26.4720812,40.8350254 C38.5516074,55.7098139 53.251692,67.6146362 70.572335,76.5494924 C87.892978,85.4843486 106.436548,90.4509306 126.203046,91.4492386 C125.404399,87.6556684 125.005076,83.9619289 125.005076,80.3680203 C125.005076,66.9906937 129.722081,55.5850254 139.156091,46.1510152 C148.590102,36.7170051 159.99577,32 173.373096,32 C187.349408,32 199.129442,37.0913706 208.713198,47.2741117 C219.594755,45.177665 229.827411,41.284264 239.411168,35.5939086 C235.717428,47.0744501 228.629442,55.9593909 218.147208,62.248731 C227.431472,61.250423 236.715736,58.7546531 246,54.7614213 Z"/>
  </g>
</svg>


<svg id="university" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M240.5,218 L233,218 L233,199.25 C233,193.036719 227.963281,188 221.75,188 L203,188 L203,105.5 L188,105.5 L188,188 L158,188 L158,105.5 L143,105.5 L143,188 L113,188 L113,105.5 L98,105.5 L98,188 L68,188 L68,105.5 L53,105.5 L53,188 L34.25,188 C28.0367187,188 23,193.036719 23,199.25 L23,218 L15.5,218 C11.3576562,218 8,221.357656 8,225.5 L8,229.25 C8,231.321068 9.67893219,233 11.75,233 L244.25,233 C246.321068,233 248,231.321068 248,229.25 L248,225.5 C248,221.357656 244.642344,218 240.5,218 Z M38,203 L218,203 L218,218 L38,218 L38,203 Z M244.375156,71.75 L135.115156,24.1545312 C130.496612,22.6151514 125.503388,22.6151514 120.884844,24.1545312 L11.6248438,71.75 C9.44237398,72.5801719 7.99981425,74.6724712 8,77.0075 L8,81.125 C8,84.2314062 10.5185938,86.75 13.625,86.75 L23,86.75 L23,92.375 C23,95.4814062 25.5185937,98 28.625,98 L227.375,98 C230.481406,98 233,95.4814062 233,92.375 L233,86.75 L242.375,86.75 C245.481406,86.75 248,84.2314062 248,81.125 L248,77.0075 C248,74.6721875 246.557656,72.5801562 244.375156,71.75 Z M218,83 L38,83 L38,76.6221875 L126.098281,38.2451562 C127.345044,37.9184307 128.654956,37.9184307 129.901719,38.2451562 L218,76.6221875 L218,83 Z"/>
  </g>
</svg>


<svg id="usd" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M189.745026,166.060268 C189.745026,179.493304 185.381782,191.06064 176.655293,200.762277 C167.928804,210.463914 156.593139,216.456101 142.648298,218.738839 L142.648298,241.785714 C142.648298,243.014881 142.253632,244.024554 141.464302,244.814732 C140.674971,245.604911 139.666382,246 138.438534,246 L120.678595,246 C119.538451,246 118.551787,245.582961 117.718605,244.748884 C116.885423,243.914807 116.468831,242.927083 116.468831,241.785714 L116.468831,218.738839 C110.680407,217.948661 105.089315,216.587798 99.6955553,214.65625 C94.3017959,212.724702 89.8508481,210.771205 86.3427119,208.795759 C82.8345757,206.820313 79.5895497,204.71317 76.6076339,202.47433 C73.6257182,200.235491 71.586614,198.589286 70.4903214,197.535714 C69.3940289,196.482143 68.6266241,195.691964 68.1881071,195.165179 C66.6971492,193.321429 66.6094458,191.521577 67.9249968,189.765625 L81.4751729,171.986607 C82.0890967,171.108631 83.0976859,170.581845 84.5009404,170.40625 C85.8164914,170.230655 86.8689323,170.625744 87.6582629,171.591518 L87.9213732,171.854911 C97.8318579,180.546875 108.487822,186.034226 119.889264,188.316964 C123.13429,189.019345 126.379316,189.370536 129.624342,189.370536 C136.728318,189.370536 142.977186,187.482887 148.370945,183.707589 C153.764704,179.932292 156.461584,174.576637 156.461584,167.640625 C156.461584,165.182292 155.803809,162.855655 154.488257,160.660714 C153.172706,158.465774 151.703674,156.622024 150.081161,155.129464 C148.458648,153.636905 145.893324,151.990699 142.385188,150.190848 C138.877051,148.390997 135.982839,146.986235 133.70255,145.976563 C131.422262,144.96689 127.914126,143.540179 123.178142,141.696429 C119.757709,140.291667 117.060829,139.194196 115.087503,138.404018 C113.114176,137.613839 110.417296,136.450521 106.996864,134.914063 C103.576431,133.377604 100.8357,132.016741 98.7746695,130.831473 C96.7136395,129.646205 94.2360183,128.087798 91.3418059,126.15625 C88.4475936,124.224702 86.1015275,122.359003 84.3036077,120.559152 C82.5056879,118.759301 80.5981388,116.608259 78.5809605,114.106027 C76.5637822,111.603795 75.0070468,109.057664 73.9107542,106.467634 C72.8144617,103.877604 71.8935759,100.958333 71.148097,97.7098214 C70.402618,94.4613095 70.0298786,91.0372024 70.0298786,87.4375 C70.0298786,75.3214286 74.3273454,64.6979167 82.9222791,55.5669643 C91.5172128,46.4360119 102.699397,40.5535714 116.468831,37.9196429 L116.468831,14.2142857 C116.468831,13.0729167 116.885423,12.0851935 117.718605,11.2511161 C118.551787,10.4170387 119.538451,10 120.678595,10 L138.438534,10 C139.666382,10 140.674971,10.3950893 141.464302,11.1852679 C142.253632,11.9754464 142.648298,12.985119 142.648298,14.2142857 L142.648298,37.3928571 C147.647392,37.9196429 152.493005,38.9293155 157.185137,40.421875 C161.877269,41.9144345 165.692367,43.3850446 168.630431,44.8337054 C171.568496,46.2823661 174.353079,47.9285714 176.984181,49.7723214 C179.615283,51.6160714 181.325499,52.8891369 182.11483,53.5915179 C182.904161,54.2938988 183.561936,54.9084821 184.088157,55.4352679 C185.579114,57.015625 185.798373,58.6837798 184.745932,60.4397321 L174.089968,79.6674107 C173.388341,80.984375 172.379752,81.686756 171.064201,81.7745536 C169.836353,82.0379464 168.652357,81.7306548 167.512213,80.8526786 C167.249103,80.5892857 166.613253,80.0625 165.604664,79.2723214 C164.596075,78.4821429 162.885858,77.3188244 160.474015,75.7823661 C158.062171,74.2459077 155.496847,72.8411458 152.778041,71.5680804 C150.059235,70.2950149 146.792284,69.1536458 142.977186,68.1439732 C139.162087,67.1343006 135.412767,66.6294643 131.729224,66.6294643 C123.3974,66.6294643 116.600387,68.5171131 111.338182,72.2924107 C106.075978,76.0677083 103.444876,80.9404762 103.444876,86.9107143 C103.444876,89.1934524 103.817615,91.3005952 104.563094,93.2321429 C105.308573,95.1636905 106.602198,96.9854911 108.44397,98.6975446 C110.285741,100.409598 112.017884,101.858259 113.640397,103.043527 C115.26291,104.228795 117.718605,105.589658 121.007483,107.126116 C124.29636,108.662574 126.949388,109.847842 128.966567,110.68192 C130.983745,111.515997 134.053364,112.723214 138.175424,114.303571 C142.823705,116.059524 146.375692,117.442336 148.831388,118.452009 C151.287083,119.461682 154.619813,120.99814 158.829576,123.061384 C163.039339,125.124628 166.350143,126.990327 168.761987,128.658482 C171.17383,130.326637 173.892636,132.521577 176.918403,135.243304 C179.944171,137.96503 182.268311,140.752604 183.890824,143.606027 C185.513337,146.459449 186.894666,149.817708 188.03481,153.680804 C189.174954,157.543899 189.745026,161.670387 189.745026,166.060268 Z" id="Shape"/>
  </g>
</svg>


<svg id="youtube" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M178.571429,128.285714 C178.571429,125.037202 177.254464,122.666667 174.620536,121.174107 L107.191964,79.03125 C104.470238,77.2752976 101.616815,77.1875 98.6316964,78.7678571 C95.734375,80.3482143 94.2857143,82.8065476 94.2857143,86.1428571 L94.2857143,170.428571 C94.2857143,173.764881 95.734375,176.223214 98.6316964,177.803571 C100.036458,178.505952 101.397321,178.857143 102.714286,178.857143 C104.470238,178.857143 105.962798,178.418155 107.191964,177.540179 L174.620536,135.397321 C177.254464,133.904762 178.571429,131.534226 178.571429,128.285714 Z M246,128.285714 C246,136.714286 245.956101,143.299107 245.868304,148.040179 C245.780506,152.78125 245.407366,158.773438 244.748884,166.016741 C244.090402,173.260045 243.102679,179.735119 241.785714,185.441964 C240.380952,191.85119 237.351935,197.250744 232.698661,201.640625 C228.045387,206.030506 222.601935,208.576637 216.368304,209.279018 C196.877232,211.473958 167.421131,212.571429 128,212.571429 C88.578869,212.571429 59.1227679,211.473958 39.6316964,209.279018 C33.3980655,208.576637 27.9326637,206.030506 23.2354911,201.640625 C18.5383185,197.250744 15.4873512,191.85119 14.0825893,185.441964 C12.8534226,179.735119 11.9095982,173.260045 11.2511161,166.016741 C10.5926339,158.773438 10.219494,152.78125 10.1316964,148.040179 C10.0438988,143.299107 10,136.714286 10,128.285714 C10,119.857143 10.0438988,113.272321 10.1316964,108.53125 C10.219494,103.790179 10.5926339,97.7979911 11.2511161,90.5546875 C11.9095982,83.3113839 12.8973214,76.8363095 14.2142857,71.1294643 C15.6190476,64.7202381 18.6480655,59.3206845 23.3013393,54.9308036 C27.9546131,50.5409226 33.3980655,47.9947917 39.6316964,47.2924107 C59.1227679,45.0974702 88.578869,44 128,44 C167.421131,44 196.877232,45.0974702 216.368304,47.2924107 C222.601935,47.9947917 228.067336,50.5409226 232.764509,54.9308036 C237.461682,59.3206845 240.512649,64.7202381 241.917411,71.1294643 C243.146577,76.8363095 244.090402,83.3113839 244.748884,90.5546875 C245.407366,97.7979911 245.780506,103.790179 245.868304,108.53125 C245.956101,113.272321 246,119.857143 246,128.285714 Z"/>
  </g>
</svg>


<svg id="user-plus-thin" width="256" height="256" viewBox="0 0 256 256">
  <g>
    <path d="M243.05,116.6 L210.6,116.6 L210.6,84.15 C210.6,82.5275 209.2725,81.2 207.65,81.2 L201.75,81.2 C200.1275,81.2 198.8,82.5275 198.8,84.15 L198.8,116.6 L166.35,116.6 C164.7275,116.6 163.4,117.9275 163.4,119.55 L163.4,125.45 C163.4,127.0725 164.7275,128.4 166.35,128.4 L198.8,128.4 L198.8,160.85 C198.8,162.4725 200.1275,163.8 201.75,163.8 L207.65,163.8 C209.2725,163.8 210.6,162.4725 210.6,160.85 L210.6,128.4 L243.05,128.4 C244.6725,128.4 246,127.0725 246,125.45 L246,119.55 C246,117.9275 244.6725,116.6 243.05,116.6 Z M125.64,140.2 C115.056875,140.2 109.968125,146.1 92.6,146.1 C75.231875,146.1 70.18,140.2 59.56,140.2 C32.19875,140.2 10,162.39875 10,189.76 L10,205.1 C10,214.871875 17.928125,222.8 27.7,222.8 L157.5,222.8 C167.271875,222.8 175.2,214.871875 175.2,205.1 L175.2,189.76 C175.2,162.39875 153.00125,140.2 125.64,140.2 Z M163.4,205.1 C163.4,208.345 160.745,211 157.5,211 L27.7,211 C24.455,211 21.8,208.345 21.8,205.1 L21.8,189.76 C21.8,168.925625 38.725625,152 59.56,152 C66.7875,152 73.978125,157.9 92.6,157.9 C111.185,157.9 118.4125,152 125.64,152 C146.474375,152 163.4,168.925625 163.4,189.76 L163.4,205.1 Z M92.6,128.4 C118.670625,128.4 139.8,107.270625 139.8,81.2 C139.8,55.129375 118.670625,34 92.6,34 C66.529375,34 45.4,55.129375 45.4,81.2 C45.4,107.270625 66.529375,128.4 92.6,128.4 Z M92.6,45.8 C112.106875,45.8 128,61.693125 128,81.2 C128,100.706875 112.106875,116.6 92.6,116.6 C73.093125,116.6 57.2,100.706875 57.2,81.2 C57.2,61.693125 73.093125,45.8 92.6,45.8 Z" id="Shape" fill-rule="nonzero"/>
  </g>
</svg></svg>`;

const colors = {
    'blue': '#3B6E8F',
    'blue-dark': '#274254',
    'blue-light': '#A5BDCC',
    'blue-lighter': '#DBE4EA',

    // Cyan (Secondary)
    'cyan': '#0095D9',
    'cyan-dark': '#006D9E',
    'cyan-light': '#8BCEED',
    'cyan-lighter': '#D8EBF8',

    // Teal (Secondary)
    'teal': '#57AFA9',
    'teal-dark': '#41807B',
    'teal-light': '#B3DAD7',
    'teal-lighter': '#E0F0EF',

    // Orange (Secondary)
    'orange': '#C05C04',
    'orange-dark': '#8C4303',
    'orange-light': '#E2B48C',
    'orange-lighter': '#F3E1D1',

    // Gold (Secondary)
    'gold': '#E09E06',
    'gold-dark': '#A37304',
    'gold-light': '#F0D28C',
    'gold-lighter': '#F9EDD1',

    // Grayscale
    'gray-darker': '#151515',
    'gray-dark': '#4D4D4D',
    'gray': '#737373',
    'gray-light': '#979797',
    'gray-lighter': '#E7E7E7',
    'white': '#FFFFFF',
    'black': '#000000',

    'rust': '#CC2255',
    'green': '#6ACC93',
    'success': '#6ACC93',
    'alert-info': '#6ABCCC',
    'alert-warning': '#DEBC73'
};

const CrdsIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        const domparser = new DOMParser();
        const doc = domparser.parseFromString(icons, 'text/html');
        const svg = doc.getElementById(this.name);
        svg.setAttribute('preserveAspectRatio', `none`);
        svg.setAttribute('height', `${this.size}px`);
        svg.setAttribute('width', `${this.size}px`);
        svg.getElementsByTagName('path')[0].setAttribute('fill', colors[this.color]);
        return h("div", { class: "svg-container", innerHTML: svg.outerHTML });
    }
    static get style() { return ".svg-container svg{display:block}"; }
};

const CrdsImage = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.imgDidLoad = false;
        this.sizes = ['card', 'thumbnail', 'overlay', 'media-object'];
    }
    validateSize() {
        if (this.sizes.indexOf(this.size) == -1) {
            throw new Error(`${this.size} is an invalid value for crds-image size`);
        }
    }
    connectedCallback() {
        this.validateSize();
    }
    addObserver() {
        // Cache Image
        const img = new Image();
        img.classList.add('crds-img');
        img.onload = () => {
            this.imgDidLoad = true;
            this.cachedImg = img;
            img.classList.add('loaded');
        };
        // Create observer
        const options = {
            threshold: 0
        };
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0) {
                    img.src = this.src;
                }
            });
        }, options);
        observer.observe(this.imgWrapper);
    }
    componentDidLoad() {
        this.addObserver();
    }
    render() {
        const { imgDidLoad, cachedImg, size } = this;
        return (h("div", { class: `crds-img-container ${size}`, innerHTML: imgDidLoad ? cachedImg.outerHTML : '', ref: el => (this.imgWrapper = el) }));
    }
    static get style() { return ".crds-img-container{display:block;position:relative;overflow:hidden}.crds-img-container.card{height:202px}.crds-img-container.thumbnail{height:65px}.crds-img-container .crds-img{height:100%}.crds-img-container .crds-img.loaded{-webkit-animation-name:fade-in;animation-name:fade-in;-webkit-animation-duration:1s;animation-duration:1s}\@-webkit-keyframes fade-in{0%{visibility:hidden;-webkit-filter:blur(20px);filter:blur(20px)}50%{-webkit-filter:blur(20px);filter:blur(20px)}to{-webkit-filter:blur(.1px);filter:blur(.1px)}}\@keyframes fade-in{0%{visibility:hidden;-webkit-filter:blur(20px);filter:blur(20px)}50%{-webkit-filter:blur(20px);filter:blur(20px)}to{-webkit-filter:blur(.1px);filter:blur(.1px)}}"; }
};

const CrdsMediaCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.contentLayout = 'default';
        // state
        this.isVisible = false; // Will be used for skeleton blocks/prerendering
        this.childProps = {};
        this.propNames = ['imageSrc', 'heading', 'meta', 'metaPosition', 'body', 'url', 'thumbnailSrc', 'contentType'];
        this.contentLayouts = ['default', 'overlay', 'media-object'];
        this.contentTypes = ['article', 'video', 'episode', 'message', 'song', 'series', 'album', 'podcast'];
        this.metaPositions = ['top', 'bottom'];
    }
    // ----------------------------------------------- | Validations
    validateContentType() {
        if (typeof this.contentType != 'undefined' && !this.contentTypes.includes(this.contentType)) {
            throw new Error(`${this.contentType} is not a valid value for contentType`);
        }
    }
    validateContentLayout() {
        if (typeof this.contentLayout != 'undefined' && !this.contentLayouts.includes(this.contentLayout)) {
            throw new Error(`${this.contentLayout} is not a valid value for contentLayout`);
        }
    }
    validateImage() {
        const isEmpty = typeof this.imageSrc == 'undefined';
        if (isEmpty) {
            throw new Error('imageSrc property is required on all media cards');
        }
    }
    validateMeta() {
        if (typeof this.meta != 'undefined' && typeof this.metaPosition == 'undefined') {
            throw new Error(`metaPosition is required if you want to provide a meta`);
        }
    }
    validateMetaPosition() {
        if (typeof this.metaPosition != 'undefined' && !this.metaPositions.includes(this.metaPosition)) {
            throw new Error(`${this.metaPosition} is not a valid value for metaPosition`);
        }
        else if (typeof this.meta == 'undefined' && typeof this.metaPosition != 'undefined') {
            throw new Error(`Meta is required if you want to provide a meta posittion`);
        }
    }
    // ----------------------------------------------- | Methods
    componentDidLoad() {
        if (!document.getElementById('card-anchor-style')) {
            const style = document.createElement('style');
            style.innerText = `crds-media-card a {
        text-decoration: none;
        color: #0095D9;
      }`;
            style.id = 'card-anchor-style';
            this.element.before(style);
        }
    }
    componentWillLoad() {
        /*
          Validates props passed to component against props assigned/related to children.
          Stencil doesn't have out of the box support for props.
        */
        this.propNames
            .filter(prop => this[prop] != undefined)
            .forEach(prop => {
            this.childProps[prop] = this[prop];
        });
    }
    runValidations() {
        this.validateImage();
        this.validateContentLayout();
        this.validateContentType();
        this.validateMeta();
        this.validateMetaPosition();
    }
    connectedCallback() {
        this.runValidations();
    }
    render() {
        return (h("div", null, this.contentLayout == 'default' && (h("crds-default-card", Object.assign({}, this.childProps), h("slot", null))), this.contentLayout == 'overlay' && h("crds-overlay-card", Object.assign({}, this.childProps)), this.contentLayout == 'media-object' && (h("crds-media-object-card", Object.assign({}, this.childProps), h("slot", null)))));
    }
    get element() { return getElement(this); }
    static get style() { return ""; }
};

const CrdsModal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isActive = false;
        this.handleInnerClick = event => {
            event.stopPropagation();
        };
        this.closeModal = () => {
            this.isActive = false;
            if (typeof this.onModalClose == 'function')
                this.onModalClose();
        };
    }
    componentDidUpdate() {
        document.body.appendChild(this.element);
    }
    render() {
        return (h("div", { class: `modal ${this.isActive ? 'is-active' : ''}`, id: "subscribeModalForm", tabindex: "-1", onClick: this.closeModal }, h("div", { class: "modal-content", onClick: this.handleInnerClick }, h("div", { class: "modal-header" }, h("button", { type: "button", class: "modal-close", onClick: this.closeModal })), h("div", { class: "modal-body" }, this.label && h("h3", { class: "modal-title" }, this.label), h("slot", null)))));
    }
    get element() { return getElement(this); }
    static get style() { return ".modal{background-color:rgba(0,0,0,.8);bottom:0;left:0;opacity:0;position:fixed;right:0;top:0;-webkit-transition:opacity .3s ease,visibility .3s ease;transition:opacity .3s ease,visibility .3s ease;visibility:hidden;will-change:opacity,visibility}.modal.is-active{opacity:1;visibility:visible;z-index:11}.modal.is-active .modal-content{-webkit-transform:translateY(0);transform:translateY(0)}.modal-content{background:#fff;font-size:16px;margin:45px auto;max-width:600px;position:relative;-webkit-transform:translateY(-50px);transform:translateY(-50px);-webkit-transition:-webkit-transform .35s ease;transition:-webkit-transform .35s ease;transition:transform .35s ease;transition:transform .35s ease,-webkit-transform .35s ease;will-change:transform}.modal-body{padding:40px}.modal-title{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;font-size:36px!important;margin:0;text-transform:uppercase}\@media screen and (min-width:480px){.modal-title{font-size:52.2px!important}}input{background-image:none;-webkit-box-shadow:none;box-shadow:none}input[type=text]{background-color:#f4f4f4;border:1px solid #f4f4f4;border-radius:0;color:#4d4d4d;display:block;font-size:16px;line-height:1.5;padding:8px 10px;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;width:100%}input:focus{border-color:#8bceed;-webkit-box-shadow:inset 0 0 0 1px rgba(139,206,237,.5);box-shadow:inset 0 0 0 1px rgba(139,206,237,.5)}input[type=submit]{-webkit-appearance:button;-moz-appearance:button;appearance:button;background-color:#0095d9;border:1px solid #0095d9;border-radius:4px;color:#fff;cursor:pointer;font-size:16px;line-height:1;margin-top:24px;padding:14px 20px 16px}input[type=submit],label{display:inline-block;margin-bottom:5px}label{font-weight:700;max-width:100%}.modal-close{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:hsla(0,0%,73.3%,.6);-o-border-image:none;border-image:none;border-radius:50%;border-style:none;color:#fff;cursor:pointer;height:25px;position:absolute;right:15px;top:15px;width:25px}.modal-close:after{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;bottom:3px;content:\"x\";display:inline-block;font-size:16px;position:relative}.modal-close:focus{outline:none}"; }
};

class SvgSrc {
    static articleIcon() {
        return h("path", { d: "M118.96 18.175c0 1.376-.481 2.547-1.445 3.51-.964.964-2.134 1.446-3.511 1.446H4.957c-1.377 0-2.547-.482-3.511-1.445C.482 20.722 0 19.55 0 18.175V4.957C0 3.58.482 2.41 1.446 1.446S3.58 0 4.956 0h109.048c1.377 0 2.547.482 3.51 1.446.965.964 1.447 2.134 1.447 3.51v13.219zM4.958 76.003c-1.377 0-2.547-.482-3.511-1.446S0 72.423 0 71.046V57.828c0-1.377.482-2.547 1.446-3.51.964-.965 2.134-1.447 3.51-1.447h175.137c1.377 0 2.547.482 3.511 1.446s1.446 2.134 1.446 3.511v13.218c0 1.377-.482 2.547-1.446 3.51-.964.965-2.134 1.447-3.51 1.447H4.956zm0 105.742c-1.377 0-2.547-.482-3.511-1.445C.482 179.336 0 178.166 0 176.789V163.57c0-1.377.482-2.547 1.446-3.511s2.134-1.446 3.51-1.446h175.137c1.377 0 2.547.482 3.511 1.446s1.446 2.134 1.446 3.51v13.219c0 1.377-.482 2.547-1.446 3.51-.964.964-2.134 1.446-3.51 1.446H4.956zm109.047-76.002c1.377 0 2.547.482 3.51 1.445.965.964 1.447 2.135 1.447 3.511v13.218c0 1.377-.482 2.547-1.446 3.511s-2.134 1.446-3.511 1.446H4.957c-1.377 0-2.547-.482-3.511-1.446S0 125.294 0 123.918v-13.219c0-1.376.482-2.547 1.446-3.51.964-.964 2.134-1.446 3.51-1.446h109.048z" });
    }
    static podcastIcon() {
        return h("path", { d: "M30.857 41.151c0-11.43 4-21.147 12-29.149C50.857 4.001 60.571 0 72 0c11.428 0 21.143 4 29.143 12.002s12 17.718 12 29.149v68.585c0 11.43-4 21.147-12 29.149-8 8.001-17.715 12.002-29.143 12.002-11.429 0-21.143-4-29.143-12.002s-12-17.718-12-29.15V41.152zm108 44.58c1.428 0 2.643.5 3.643 1.5s1.5 2.215 1.5 3.644v18.86c0 12.003-2.715 23.077-8.143 33.222-5.429 10.145-12.857 18.575-22.286 25.29-9.428 6.716-19.857 10.931-31.285 12.646v19.718h29.142c1.429 0 2.643.5 3.643 1.5s1.5 2.215 1.5 3.644v8.573c0 1.429-.5 2.643-1.5 3.644-1 1-2.214 1.5-3.643 1.5H32.571c-1.428 0-2.643-.5-3.642-1.5-1-1-1.5-2.215-1.5-3.644v-8.573c0-1.429.5-2.643 1.5-3.644 1-1 2.214-1.5 3.642-1.5h29.143v-19.718c-11.428-1.715-21.857-5.93-31.286-12.645-9.428-6.716-16.857-15.146-22.285-25.291C2.714 132.812 0 121.738 0 109.736v-18.86c0-1.43.5-2.644 1.5-3.644s2.214-1.5 3.643-1.5h10.286c1.428 0 2.642.5 3.642 1.5s1.5 2.214 1.5 3.643v18.86c0 9.431 2.358 18.076 7.072 25.935 4.714 7.858 11 14.074 18.857 18.646 7.857 4.573 16.428 6.859 25.714 6.859 9.286 0 17.857-2.358 25.714-7.073 7.857-4.715 14.072-11.074 18.643-19.075 4.572-8.002 6.857-16.575 6.857-25.72V90.875c0-1.429.5-2.643 1.5-3.643s2.215-1.5 3.643-1.5h10.286z" });
    }
    static videoIcon() {
        return h("path", { d: "M168.209 84.996c4.231 2.371 7.075 5.665 8.53 9.88 1.454 4.217 1.454 8.433 0 12.649-1.455 4.216-4.299 7.51-8.53 9.88L28.564 199.619c-3.967 2.371-8.2 3.162-12.695 2.371-4.496-.79-8.265-2.898-11.307-6.324C1.521 192.24 0 188.155 0 183.412V18.99c0-5.27 1.587-9.552 4.76-12.845C7.935 2.85 11.77.874 16.266.214c4.497-.658 8.596.198 12.299 2.57l139.645 82.212z" });
    }
    static bullseyeIcon(width, height, fillColor) {
        return h("svg", { width: width, height: height, "aria-hidden": "true", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 496 512" },
            h("path", { fill: fillColor, d: "M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 432c-101.69 0-184-82.29-184-184 0-101.69 82.29-184 184-184 101.69 0 184 82.29 184 184 0 101.69-82.29 184-184 184zm0-312c-70.69 0-128 57.31-128 128s57.31 128 128 128 128-57.31 128-128-57.31-128-128-128zm0 192c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z" }));
    }
}

const GET_USER$1 = gql `
{
    user {
        lifeStage {
            id
            title
        }
    }
}
`;
const GET_LIFESTAGES = gql `
{
  lifeStages{
    title
    description
    id
    imageUrl
    contentType
    contentTotal
    content {
        id
        title
        authors {
            fullName
            qualifiedUrl
        }
        duration
        contentType
        category
        slug
        qualifiedUrl
        imageUrl
    }
  }
}
`;
const SET_LIFESTAGE = gql `
mutation setLifeStage($lifeStage: LifeStageInput)
 {
  setLifeStage(lifeStage: $lifeStage) {
    lifeStage {
      title
      id
    }
  }
}`;

const CrdsRecommendedContent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.analytics = window['analytics'] || {};
        this.crdsDefaultImg = 'https://crds-cms-uploads.imgix.net/content/images/cr-social-sharing-still-bg.jpg';
        this.recommendedContent = [];
        this.lifeStages = [];
        this.user = { name: '', lifeStage: null };
    }
    authTokenHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.apolloClient = CrdsApollo(newValue);
            this.getUser();
        }
    }
    componentWillLoad() {
        this.apolloClient = CrdsApollo(this.authToken);
        this.getLifeStages();
        this.getUser();
    }
    componentDidLoad() {
        Utils.trackInView(this.host, 'RecommendedContentComponent', this.getLifeStageId.bind(this));
    }
    componentWillRender() {
        if (this.user.lifeStage && this.user.lifeStage.id !== null && this.lifeStages.length)
            return this.filterContent(this.user.lifeStage.id);
    }
    getLifeStageId() {
        return this.user.lifeStage && this.user.lifeStage.id;
    }
    getUser() {
        if (!this.authToken)
            return null;
        return this.apolloClient.query({ query: GET_USER$1 }).then(success => {
            const name = success.data.user.lifeStage && success.data.user.lifeStage.title;
            const id = success.data.user.lifeStage && success.data.user.lifeStage.id;
            this.user = Object.assign(Object.assign({}, this.user), { lifeStage: { id: id, title: name } });
            this.host.forceUpdate();
        });
    }
    getLifeStages() {
        return this.apolloClient.query({ query: GET_LIFESTAGES }).then(success => {
            this.lifeStages = success.data.lifeStages;
            this.host.forceUpdate();
        });
    }
    /**
     * Get content with set life stages
     */
    filterContent(lifeStageId) {
        return this.recommendedContent = this.lifeStages.find(lifestage => lifestage.id === lifeStageId).content;
    }
    handleBackClick(event) {
        this.recommendedContent = [];
        this.user = Object.assign(Object.assign({}, this.user), { lifeStage: { id: null, title: null } });
        event.target.parentNode.scrollLeft = 0;
    }
    handleContentClicked(event) {
        try {
            this.analytics.track('RecommendedContentClicked', {
                parent: this.host.tagName,
                title: event.currentTarget.querySelector('.component-header').innerText,
                targetUrl: event.target.parentElement.href,
                lifeStageId: this.user.lifeStage.id,
                lifeStageName: this.user.lifeStage.title
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    /**
     * Get content with set life stages
     */
    setLifeStage(lifeStageId, lifeStageName) {
        const obj = lifeStageId
            ? {
                id: lifeStageId,
                title: lifeStageName
            }
            : null;
        return this.apolloClient
            .mutate({
            variables: { lifeStage: obj },
            mutation: SET_LIFESTAGE
        })
            .catch(err => console.error(err));
    }
    handleLifeStageClicked(event) {
        const card = event.target;
        const cards = this.host.shadowRoot.querySelectorAll('[data-life-stage-id]');
        cards.forEach(card => card.classList.add('disabled'));
        this.user = Object.assign(Object.assign({}, this.user), { lifeStage: { id: card.dataset.lifeStageId, title: card.dataset.lifeStageName } });
        try {
            this.analytics.track('LifeStageUpdated', {
                lifeStageId: this.user.lifeStage.id,
                lifeStageName: this.user.lifeStage.title
            });
        }
        catch (error) {
            console.error(error);
        }
        this.filterContent(this.user.lifeStage.id);
        card.parentNode.scrollLeft = 0;
        cards.forEach(card => card.classList.remove('disabled'));
        this.setLifeStage(this.user.lifeStage.id, this.user.lifeStage.title);
    }
    renderCardSkeleton() {
        return [1, 2, 3, 4, 5].map(() => (h("div", { class: "skeleton skeleton-life-stage" }, h("div", { class: "content" }, h("div", { class: "text title shimmer shimmer-reverse" }), h("div", { class: "text subtitle shimmer shimmer-reverse" })))));
    }
    renderTextSkeleton() {
        return (h("div", { class: "skeleton text-skeleton" }, h("div", { class: "title shimmer" }), h("div", { class: "subtitle shimmer" })));
    }
    renderLifeStages() {
        return this.lifeStages.map((obj, index) => (h("div", { class: `card ${this.recommendedContent.length ? 'd-none' : ''}`, key: index, style: {
                backgroundImage: `url(${Utils.imgixify(obj.imageUrl + '?auto=format&h=400')}`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }, "data-life-stage-name": obj.title, "data-life-stage-id": obj.id, onClick: event => this.handleLifeStageClicked(event) }, h("div", { class: "bg-overlay" }), h("div", { class: "card-content" }, h("h2", { class: "card-title component-header" }, obj.title), h("h3", { class: "card-subtitle" }, `${obj.contentTotal} items`)))));
    }
    renderMediaLabel(type, duration) {
        if (type !== 'series') {
            return (h("div", { class: "media-label bg-charcoal text-white align-items-center" }, duration && h("span", { class: "font-size-smallest" }, duration), this.renderIcon(type)));
        }
    }
    renderIcon(type) {
        let src;
        switch (type) {
            case 'video':
                src = SvgSrc.videoIcon();
                break;
            case 'message':
                src = SvgSrc.videoIcon();
                break;
            case 'podcast':
                src = SvgSrc.podcastIcon();
                break;
            case 'episode':
                src = SvgSrc.podcastIcon();
                break;
            case 'article':
                src = SvgSrc.articleIcon();
                break;
        }
        return (h("svg", { class: "icon", viewBox: "0 0 256 256" }, src));
    }
    renderRecommendedContent() {
        const imgixParams = window.innerWidth > 767 ? '?auto=format&w=400&h=225&fit=crop' : '?auto=format&w=262&h=196.5&fit=crop';
        return this.recommendedContent.map((obj, index) => (h("div", { class: "card", key: index, onClick: event => this.handleContentClicked(event) }, h("a", { class: "relative d-block", href: obj.qualifiedUrl }, this.renderMediaLabel(obj.contentType, obj.duration), h("img", { src: (obj.imageUrl || this.crdsDefaultImg) + imgixParams, class: "img-responsive" })), h("a", { href: obj.qualifiedUrl }, h("h4", { class: "text-gray font-size-smaller font-weight-mid text-uppercase soft-quarter-top" }, obj.category), h("h3", { class: "component-header" }, obj.title), obj.authors && (h("p", { class: "soft-quarter-top" }, obj.authors.map((author, index) => (h("a", { class: "text-gray-light font-size-smaller", href: author.qualifiedUrl, style: {
                color: 'inherit',
                display: 'inline-block',
                textDecoration: 'none'
            } }, author.fullName, index < obj.authors.length - 1 ? h("span", null, ",\u00A0") : '')))))))));
    }
    renderText() {
        const selectedLifeStage = this.lifeStages.find(stage => stage.id === (this.user.lifeStage && this.user.lifeStage.id));
        return (h("div", null, h("h2", { class: "component-header flush-bottom" }, this.recommendedContent.length && selectedLifeStage
            ? 'Recommended For You'
            : 'Personalize Your Experience'), h("p", { class: "push-half-top push-half-bottom color-gray" }, this.recommendedContent.length && selectedLifeStage
            ? selectedLifeStage.description
            : 'Which of these best describes your stage of life? (Pick one)')));
    }
    render() {
        const renderLifeStages = this.lifeStages.length && this.user.lifeStage && !this.user.lifeStage.id;
        const renderRecommendedContent = this.recommendedContent.length;
        const cardsClasses = `cards ${this.recommendedContent.length ? 'media-cards' : ''}`;
        return (h("div", { class: "life-stages" }, h("div", { class: "life-stages-inner" }, h("div", { class: "life-stages-header" }, (() => {
            if (renderLifeStages || renderRecommendedContent)
                return this.renderText();
            return this.renderTextSkeleton();
        })(), !!this.recommendedContent.length && (h("div", { class: "life-stage-selected" }, h("a", { class: "btn btn-gray-light btn-outline btn-sm back-btn flush", onClick: event => this.handleBackClick(event) }, "change")))), h("div", { class: cardsClasses }, (() => {
            if (renderLifeStages)
                return this.renderLifeStages();
            if (renderRecommendedContent)
                return this.renderRecommendedContent();
            return this.renderCardSkeleton();
        })()))));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "authToken": ["authTokenHandler"]
    }; }
    static get style() { return "*{-webkit-box-sizing:border-box;box-sizing:border-box}.relative{position:relative}.overflow-hidden{overflow:hidden}.d-flex{display:-ms-flexbox;display:flex}.d-block{display:block}.d-inline{display:inline}.d-none{display:none}.align-items-center{-ms-flex-align:center;align-items:center}.w-100{width:100%}.img-responsive{display:block;height:auto;max-width:100%}.img-circle{border-radius:50%}hr{border:0;border-top:1px solid #e7e7e7;margin-bottom:1rem;margin-top:1rem}.btn,.font-family-base{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important}.font-family-condensed-extra{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important}.text-white{color:#fff!important}.text-gray-dark{color:#4d4d4d!important}.text-gray-light{color:#979797!important}.text-gray{color:#737373!important}.text-center{text-align:center}.text-uppercase{text-transform:uppercase}.text-uppercase.font-size-smaller{font-size:13px!important;letter-spacing:.5px}.font-size-base{font-size:16px!important}\@media (min-width:480px){.font-size-base{font-size:19px!important}}.font-size-large{font-size:19px!important}\@media (min-width:480px){.font-size-large{font-size:22px!important}}.font-size-smaller{font-size:14px!important}.font-size-smallest{font-size:10px}.font-weight-mid{font-weight:500}.bg-charcoal{background-color:#171717}.flush{margin:0!important}.flush-bottom{margin-bottom:0!important}.flush-top{margin-top:0!important}.push-half-bottom{margin-bottom:12px!important}.push-bottom{margin-bottom:24px!important}.push-top{margin-top:24px}.push-half-top{margin-top:12px!important}.soft-quarter-top{padding-top:6px}.component-header{font-family:acumin-pro-extra-condensed;font-size:2rem;font-weight:500;line-height:.95;text-transform:uppercase}\@media (min-width:480px){.component-header{font-size:2.125rem}}.list-header{font-family:acumin-pro-extra-condensed,sans-serif;font-size:1.5rem;font-weight:500;text-transform:uppercase}.card>a{color:inherit;display:block;text-decoration:none}.card img{width:100%}.color-gray{color:#737373}.media-label{display:-ms-flexbox;display:flex;position:absolute;right:0;bottom:0;padding:6px 8px}.media-label>:not(:last-child){margin-right:5px}.media-label .icon{fill:#fff;height:16px;width:12px}.btn{display:inline-block;margin-bottom:0;font-weight:300;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid transparent;padding:8px 10px;font-size:16px;line-height:1.5;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:4px;line-height:1;margin-top:5px;margin-bottom:5px;font-size:14px;padding:13px 16px;text-decoration:none}.btn.btn-gray-light{color:#fff;background-color:#979797;border-color:#979797}.btn.btn.btn-blue,.btn.btn.btn-primary{color:#fff;background-color:#3b6e8f;border-color:#3b6e8f}.btn.btn.btn-blue:hover,.btn.btn.btn-primary:hover{background-color:#2c526b;border-color:#294d64}.btn.btn-gray-light.btn-outline{background:transparent;border-style:solid;border-width:1px;color:#979797}.btn.btn-gray-light.btn-outline:hover{background-color:#979797;color:#fff}.btn.btn-sm{font-size:13px;padding:10px 16px 11px}.btn.btn-block{display:block;width:100%}.label{font-family:lexia,serif;font-size:12px;margin-top:9px;padding:5px 6px 4px;display:inline;font-weight:500!important;line-height:1;color:#4d4d4d;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em;font-style:italic}.label.label-info{background-color:#b6dee6}.skeleton{position:relative}.skeleton,.skeleton .shimmer{overflow:hidden}.skeleton .shimmer:after{position:absolute;top:0;right:0;bottom:0;left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%);background-image:linear-gradient(100deg,#f0f0f0 20%,hsla(0,0%,100%,.3) 30%,hsla(0,0%,100%,.7) 40%,#f0f0f0 50%);-webkit-animation:shimmer 1.5s infinite;animation:shimmer 1.5s infinite;-webkit-animation-timing-function:ease;animation-timing-function:ease;content:\"\"}.skeleton .shimmer-reverse:after{background-image:linear-gradient(100deg,#fff 20%,hsla(0,0%,94.1%,.3) 30%,hsla(0,0%,94.1%,.7) 40%,#fff 50%)}.avatar-skeleton{height:75px;width:75px;border-radius:50%;background-color:#f0f0f0;-ms-flex-negative:0;flex-shrink:0}.avatar-skeleton .shimmer:after{left:-400px;-webkit-animation:shimmer 1.5s .5s infinite;animation:shimmer 1.5s .5s infinite}\@-webkit-keyframes shimmer{to{-webkit-transform:translateX(100%);transform:translateX(100%)}}\@keyframes shimmer{to{-webkit-transform:translateX(100%);transform:translateX(100%)}}h1,h2,h3,h4,h5,p{margin:0}.disabled{opacity:.5;pointer-events:none}.life-stages{background-color:#fff;min-height:300px;overflow:hidden}\@media (min-width:768px){.life-stages{min-height:500px}}.life-stages .life-stages-inner{-webkit-transition:all .45s ease;transition:all .45s ease}.life-stages .life-stages-header{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding-bottom:1.875rem}\@media (min-width:768px){.life-stages .life-stages-header{-ms-flex-direction:row;flex-direction:row}}.life-stages .life-stages-header .life-stage-selected{font-size:.875rem}\@media (min-width:768px){.life-stages .life-stages-header .life-stage-selected{margin-left:auto}}.cards{display:grid;grid-auto-columns:180px;grid-auto-flow:column;grid-column:1/-1;grid-gap:1rem;-webkit-overflow-scrolling:touch;overflow-x:scroll;padding-bottom:1.875rem;-webkit-scroll-snap-type:x mandatory;-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory;scrollbar-base-color:transparent}.cards.media-cards{grid-auto-columns:262px}\@media (min-width:768px){.cards{grid-auto-columns:220px;grid-gap:1.875rem}.cards.media-cards{grid-auto-columns:400px}}.cards .card,.cards .skeleton-life-stage{cursor:pointer;height:340px;overflow:hidden;position:relative;scroll-snap-align:start}.cards .card:hover,.cards .skeleton-life-stage:hover{cursor:pointer}.cards .card:hover .bg-overlay,.cards .skeleton-life-stage:hover .bg-overlay{opacity:.75}.cards .card .bg-overlay,.cards .card .card-content,.cards .skeleton-life-stage .bg-overlay,.cards .skeleton-life-stage .card-content{bottom:0;pointer-events:none;position:absolute;width:100%}.cards .card .bg-overlay,.cards .skeleton-life-stage .bg-overlay{background:-webkit-gradient(linear,left bottom,left top,from(#000),color-stop(50%,transparent));background:linear-gradient(0deg,#000,transparent 50%);height:100%;-webkit-transition:all .45s ease;transition:all .45s ease}.cards .card .card-content,.cards .skeleton-life-stage .card-content{bottom:0;left:0;padding:1rem}.cards .card .card-content .card-subtitle,.cards .card .card-content .card-title,.cards .skeleton-life-stage .card-content .card-subtitle,.cards .skeleton-life-stage .card-content .card-title{letter-spacing:.5px;margin:0;text-transform:uppercase}.cards .card .card-content .card-title,.cards .skeleton-life-stage .card-content .card-title{color:#fff}.cards .card .card-content .card-subtitle,.cards .skeleton-life-stage .card-content .card-subtitle{color:hsla(0,0%,100%,.75);font-size:.75rem}.skeleton-life-stage{background-color:#f0f0f0}.skeleton-life-stage .content{bottom:0;padding:1rem;position:absolute;width:100%}.skeleton-life-stage .content .text{background-color:#fff;margin-top:.5rem;overflow:hidden;position:relative}.skeleton-life-stage .content .title{height:24px;width:90%}.skeleton-life-stage .content .subtitle{height:16px;width:55%}.text-skeleton{width:100%}.text-skeleton .subtitle,.text-skeleton .title{background-color:#f0f0f0;overflow:hidden;position:relative}.text-skeleton .title{height:24px;margin-bottom:1rem;width:35%}.text-skeleton .subtitle{height:16px;width:50%}"; }
};

const Fragment = (_props, children) => [...children];

const SharedFooter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.env = 'prod';
        this.data = [];
    }
    componentWillLoad() {
        const url = this.src || `https://crds-data.netlify.com/shared-footer/${this.env}.json`;
        axios$1.get(url).then(response => (this.data = response.data));
    }
    componentDidLoad() {
        this.element.parentElement.classList.add('shared-footer');
        this.element.parentElement.classList.remove('shared-footer-skeleton');
    }
    renderElement(el) {
        if (!el.href)
            return el.title;
        let attrs = {
            target: el.href.match(/:\/\//) ? '_blank' : '',
            href: el.href
        };
        if (el['automation-id'])
            attrs['data-automation-id'] = el['automation-id'];
        return h("a", Object.assign({}, attrs), el.img ? h("img", { src: el.img, alt: el.title, title: el.title }) : el.title);
    }
    renderGroups(groups) {
        const groupMarkup = groups.map(group => {
            if (!group.children)
                return h("li", null, this.renderElement(group));
            return (h(Fragment, null, h("p", null, group.title), h("ul", null, group.children.map(el => (h("li", null, this.renderElement(el)))))));
        });
        const Tag = groups.filter(g => g.children).length > 0 ? 'Fragment' : 'ul';
        return h(Tag, null, groupMarkup);
    }
    renderColumns() {
        return this.data.map(column => (h("div", { class: column.class }, h("h5", null, this.renderElement(column)), this.renderGroups(column.children))));
    }
    render() {
        if (this.data.length === 0)
            return null;
        return (h("footer", null, h("div", { class: "container" }, this.renderColumns())));
    }
    get element() { return getElement(this); }
    static get style() { return "footer{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;color:#737373;background-color:#e7e7e7;overflow:hidden;padding:3.125rem 0}footer .container{margin:0 auto;max-width:1170px}\@media only screen and (min-width:768px){footer .container{display:-ms-flexbox;display:flex}}footer .container div{padding-left:15px;padding-right:15px;margin-bottom:24px;vertical-align:top}\@media only screen and (min-width:768px){footer .container div{-ms-flex:1;flex:1;width:16.66667%}}footer .container div p{margin-bottom:0;font-weight:700}footer .container div ul{list-style-type:none;margin:0;padding-left:0}footer .container div.social-icons{padding-left:0}\@media only screen and (min-width:768px){footer .container div.social-icons{-ms-flex:2;flex:2;text-align:right;width:33.33333%}}footer .container div.social-icons li{display:inline}footer .container div.social-icons li a{-webkit-box-sizing:border-box;box-sizing:border-box;margin-left:.75rem;background:#737373;border-radius:50%;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;height:36px;width:36px;padding:10px}footer .container div.social-icons li a img{max-width:100%}footer .container a{color:#737373;text-decoration:none}footer .container h5{font-size:16.1px!important;line-height:1.1;margin:12px 0}"; }
};

const SharedHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.env = 'prod';
        this.data = {};
    }
    componentWillLoad() {
        const url = this.src || `https://crds-data.netlify.com/shared-header/${this.env}.json`;
        return axios$1
            .get(url)
            .then(response => {
            this.data = response.data;
        })
            .catch(err => console.error(err));
    }
    componentDidLoad() {
        const svgChildNode = this.element.parentElement.getElementsByTagName('svg')[0];
        svgChildNode.remove();
        this.element.parentElement.classList.remove('shared-header-skeleton');
        this.element.parentElement.classList.add('shared-header');
    }
    render() {
        return h("global-nav", { env: this.env, data: this.data });
    }
    get element() { return getElement(this); }
    static get style() { return ""; }
};

var marked = createCommonjsModule(function (module, exports) {
(function(root) {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: /^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
    + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
    + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
    + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
    + ')',
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  nptable: noop,
  table: noop,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
  text: /^[^\n]+/
};

block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def)
  .replace('label', block._label)
  .replace('title', block._title)
  .getRegex();

block.bullet = /(?:[*+-]|\d{1,9}\.)/;
block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
block.item = edit(block.item, 'gm')
  .replace(/bull/g, block.bullet)
  .getRegex();

block.list = edit(block.list)
  .replace(/bull/g, block.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block.def.source + ')')
  .getRegex();

block._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
  + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
  + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
  + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
  + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
  + '|track|ul';
block._comment = /<!--(?!-?>)[\s\S]*?-->/;
block.html = edit(block.html, 'i')
  .replace('comment', block._comment)
  .replace('tag', block._tag)
  .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
  .getRegex();

block.paragraph = edit(block._paragraph)
  .replace('hr', block.hr)
  .replace('heading', ' {0,3}#{1,6} +')
  .replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
  .replace('blockquote', ' {0,3}>')
  .replace('fences', ' {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n')
  .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
  .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();

block.blockquote = edit(block.blockquote)
  .replace('paragraph', block.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
  table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
});

/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */

block.pedantic = merge({}, block.normal, {
  html: edit(
    '^ *(?:comment *(?:\\n|\\s*$)'
    + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
    .replace('comment', block._comment)
    .replace(/tag/g, '(?!(?:'
      + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
      + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
      + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
    .getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
  fences: noop, // fences not supported
  paragraph: edit(block.normal._paragraph)
    .replace('hr', block.hr)
    .replace('heading', ' *#{1,6} *[^\n]')
    .replace('lheading', block.lheading)
    .replace('blockquote', ' {0,3}>')
    .replace('|fences', '')
    .replace('|list', '')
    .replace('|html', '')
    .getRegex()
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = Object.create(null);
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.pedantic) {
    this.rules = block.pedantic;
  } else if (this.options.gfm) {
    this.rules = block.gfm;
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top) {
  src = src.replace(/^ +$/gm, '');
  var next,
      loose,
      cap,
      bull,
      b,
      item,
      listStart,
      listItems,
      t,
      space,
      i,
      tag,
      l,
      isordered,
      istask,
      ischecked;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      var lastToken = this.tokens[this.tokens.length - 1];
      src = src.substring(cap[0].length);
      // An indented code block cannot interrupt a paragraph.
      if (lastToken && lastToken.type === 'paragraph') {
        lastToken.text += '\n' + cap[0].trimRight();
      } else {
        cap = cap[0].replace(/^ {4}/gm, '');
        this.tokens.push({
          type: 'code',
          codeBlockStyle: 'indented',
          text: !this.options.pedantic
            ? rtrim(cap, '\n')
            : cap
        });
      }
      continue;
    }

    // fences
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2] ? cap[2].trim() : cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (cap = this.rules.nptable.exec(src)) {
      item = {
        type: 'table',
        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        src = src.substring(cap[0].length);

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = splitCells(item.cells[i], item.header.length);
        }

        this.tokens.push(item);

        continue;
      }
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];
      isordered = bull.length > 1;

      listStart = {
        type: 'list_start',
        ordered: isordered,
        start: isordered ? +bull : '',
        loose: false
      };

      this.tokens.push(listStart);

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      listItems = [];
      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) */, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull.length > 1 ? b.length === 1
            : (b.length > 1 || (this.options.smartLists && b !== bull))) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        if (loose) {
          listStart.loose = true;
        }

        // Check for task list items
        istask = /^\[[ xX]\] /.test(item);
        ischecked = undefined;
        if (istask) {
          ischecked = item[1] !== ' ';
          item = item.replace(/^\[[ xX]\] +/, '');
        }

        t = {
          type: 'list_item_start',
          task: istask,
          checked: ischecked,
          loose: loose
        };

        listItems.push(t);
        this.tokens.push(t);

        // Recurse.
        this.token(item, false);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      if (listStart.loose) {
        l = listItems.length;
        i = 0;
        for (; i < l; i++) {
          listItems[i].loose = true;
        }
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0])) : cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
      tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
      if (!this.tokens.links[tag]) {
        this.tokens.links[tag] = {
          href: cap[2],
          title: cap[3]
        };
      }
      continue;
    }

    // table (gfm)
    if (cap = this.rules.table.exec(src)) {
      item = {
        type: 'table',
        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        src = src.substring(cap[0].length);

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = splitCells(
            item.cells[i].replace(/^ *\| *| *\| *$/g, ''),
            item.header.length);
        }

        this.tokens.push(item);

        continue;
      }
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2].charAt(0) === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noop,
  tag: '^comment'
    + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
  nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
  strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
  em: /^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noop,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
};

// list of punctuation marks from common mark spec
// without ` and ] to workaround Rule 17 (inline code blocks/links)
inline._punctuation = '!"#$%&\'()*+,\\-./:;<=>?@\\[^_{|}~';
inline.em = edit(inline.em).replace(/punctuation/g, inline._punctuation).getRegex();

inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink)
  .replace('scheme', inline._scheme)
  .replace('email', inline._email)
  .getRegex();

inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

inline.tag = edit(inline.tag)
  .replace('comment', block._comment)
  .replace('attribute', inline._attribute)
  .getRegex();

inline._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

inline.link = edit(inline.link)
  .replace('label', inline._label)
  .replace('href', inline._href)
  .replace('title', inline._title)
  .getRegex();

inline.reflink = edit(inline.reflink)
  .replace('label', inline._label)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
  link: edit(/^!?\[(label)\]\((.*?)\)/)
    .replace('label', inline._label)
    .getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
    .replace('label', inline._label)
    .getRegex()
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace('])', '~|])').getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~+(?=\S)([\s\S]*?\S)~+/,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
});

inline.gfm.url = edit(inline.gfm.url, 'i')
  .replace('email', inline.gfm._extended_email)
  .getRegex();
/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace('{2,}', '*').getRegex(),
  text: edit(inline.gfm.text)
    .replace('\\b_', '\\b_| {2,}\\n')
    .replace(/\{2,\}/g, '*')
    .getRegex()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer();
  this.renderer.options = this.options;

  if (!this.links) {
    throw new Error('Tokens array requires a `links` property.');
  }

  if (this.options.pedantic) {
    this.rules = inline.pedantic;
  } else if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = '',
      link,
      text,
      href,
      title,
      cap,
      prevCapZero;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += escape(cap[1]);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = true;
      } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = false;
      }

      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      var lastParenIndex = findClosingBracket(cap[2], '()');
      if (lastParenIndex > -1) {
        var linkLen = 4 + cap[1].length + lastParenIndex;
        cap[2] = cap[2].substring(0, lastParenIndex);
        cap[0] = cap[0].substring(0, linkLen).trim();
        cap[3] = '';
      }
      src = src.substring(cap[0].length);
      this.inLink = true;
      href = cap[2];
      if (this.options.pedantic) {
        link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

        if (link) {
          href = link[1];
          title = link[3];
        } else {
          title = '';
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : '';
      }
      href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
      out += this.outputLink(cap, {
        href: InlineLexer.escapes(href),
        title: InlineLexer.escapes(title)
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2].trim(), true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(this.mangle(cap[1]));
        href = 'mailto:' + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      if (cap[2] === '@') {
        text = escape(cap[0]);
        href = 'mailto:' + text;
      } else {
        // do extended autolink path validation
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      src = src.substring(cap[0].length);
      out += this.renderer.link(href, null, text);
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      if (this.inRawBlock) {
        out += this.renderer.text(this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0])) : cap[0]);
      } else {
        out += this.renderer.text(escape(this.smartypants(cap[0])));
      }
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

InlineLexer.escapes = function(text) {
  return text ? text.replace(InlineLexer.rules._escapes, '$1') : text;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = link.href,
      title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = '',
      l = text.length,
      i = 0,
      ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || marked.defaults;
}

Renderer.prototype.code = function(code, infostring, escaped) {
  var lang = (infostring || '').match(/\S*/)[0];
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw, slugger) {
  if (this.options.headerIds) {
    return '<h'
      + level
      + ' id="'
      + this.options.headerPrefix
      + slugger.slug(raw)
      + '">'
      + text
      + '</h'
      + level
      + '>\n';
  }
  // ignore IDs
  return '<h' + level + '>' + text + '</h' + level + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered, start) {
  var type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
  return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.checkbox = function(checked) {
  return '<input '
    + (checked ? 'checked="" ' : '')
    + 'disabled="" type="checkbox"'
    + (this.options.xhtml ? ' /' : '')
    + '> ';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  if (body) body = '<tbody>' + body + '</tbody>';

  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + body
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' align="' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
  if (href === null) {
    return text;
  }
  var out = '<a href="' + escape(href) + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
  if (href === null) {
    return text;
  }

  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * TextRenderer
 * returns only the textual part of the token
 */

function TextRenderer() {}

// no need for block level renderers

TextRenderer.prototype.strong =
TextRenderer.prototype.em =
TextRenderer.prototype.codespan =
TextRenderer.prototype.del =
TextRenderer.prototype.text = function(text) {
  return text;
};

TextRenderer.prototype.link =
TextRenderer.prototype.image = function(href, title, text) {
  return '' + text;
};

TextRenderer.prototype.br = function() {
  return '';
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer();
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
  this.slugger = new Slugger();
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options) {
  var parser = new Parser(options);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options);
  // use an InlineLexer with a TextRenderer to extract pure text
  this.inlineText = new InlineLexer(
    src.links,
    merge({}, this.options, { renderer: new TextRenderer() })
  );
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  this.token = this.tokens.pop();
  return this.token;
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        unescape(this.inlineText.output(this.token.text)),
        this.slugger);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = '',
          body = '',
          i,
          row,
          cell,
          j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      body = '';
      var ordered = this.token.ordered,
          start = this.token.start;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered, start);
    }
    case 'list_item_start': {
      body = '';
      var loose = this.token.loose;
      var checked = this.token.checked;
      var task = this.token.task;

      if (this.token.task) {
        body += this.renderer.checkbox(checked);
      }

      while (this.next().type !== 'list_item_end') {
        body += !loose && this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }
      return this.renderer.listitem(body, task, checked);
    }
    case 'html': {
      // TODO parse inline content if parameter markdown=1
      return this.renderer.html(this.token.text);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
    default: {
      var errMsg = 'Token with "' + this.token.type + '" type was not found.';
      if (this.options.silent) {
        console.log(errMsg);
      } else {
        throw new Error(errMsg);
      }
    }
  }
};

/**
 * Slugger generates header id
 */

function Slugger() {
  this.seen = {};
}

/**
 * Convert string to unique id
 */

Slugger.prototype.slug = function(value) {
  var slug = value
    .toLowerCase()
    .trim()
    .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
    .replace(/\s/g, '-');

  if (this.seen.hasOwnProperty(slug)) {
    var originalSlug = slug;
    do {
      this.seen[originalSlug]++;
      slug = originalSlug + '-' + this.seen[originalSlug];
    } while (this.seen.hasOwnProperty(slug));
  }
  this.seen[slug] = 0;

  return slug;
};

/**
 * Helpers
 */

function escape(html, encode) {
  if (encode) {
    if (escape.escapeTest.test(html)) {
      return html.replace(escape.escapeReplace, function(ch) { return escape.replacements[ch]; });
    }
  } else {
    if (escape.escapeTestNoEncode.test(html)) {
      return html.replace(escape.escapeReplaceNoEncode, function(ch) { return escape.replacements[ch]; });
    }
  }

  return html;
}

escape.escapeTest = /[&<>"']/;
escape.escapeReplace = /[&<>"']/g;
escape.replacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

escape.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
escape.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;

function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function edit(regex, opt) {
  regex = regex.source || regex;
  opt = opt || '';
  return {
    replace: function(name, val) {
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return this;
    },
    getRegex: function() {
      return new RegExp(regex, opt);
    }
  };
}

function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }
  return href;
}

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = rtrim(base, '/', true);
    }
  }
  base = baseUrls[' ' + base];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[\s\S]*/, ':') + href;
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
  } else {
    return base + href;
  }
}
var baseUrls = {};
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1,
      target,
      key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

function splitCells(tableRow, count) {
  // ensure that every cell-delimiting pipe has a space
  // before it to distinguish it from an escaped pipe
  var row = tableRow.replace(/\|/g, function(match, offset, str) {
        var escaped = false,
            curr = offset;
        while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
        if (escaped) {
          // odd number of slashes means | is escaped
          // so we leave it alone
          return '|';
        } else {
          // add space before unescaped |
          return ' |';
        }
      }),
      cells = row.split(/ \|/),
      i = 0;

  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count) cells.push('');
  }

  for (; i < cells.length; i++) {
    // leading or trailing whitespace is ignored per the gfm spec
    cells[i] = cells[i].trim().replace(/\\\|/g, '|');
  }
  return cells;
}

// Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
// /c*$/ is vulnerable to REDOS.
// invert: Remove suffix of non-c chars instead. Default falsey.
function rtrim(str, c, invert) {
  if (str.length === 0) {
    return '';
  }

  // Length of suffix matching the invert condition.
  var suffLen = 0;

  // Step left until we fail to match the invert condition.
  while (suffLen < str.length) {
    var currChar = str.charAt(str.length - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }

  return str.substr(0, str.length - suffLen);
}

function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  var level = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '\\') {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}

function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
  }
}

/**
 * Marked
 */

function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});
    checkSanitizeDeprecation(opt);

    var highlight = opt.highlight,
        tokens,
        pending,
        i = 0;

    try {
      tokens = Lexer.lex(src, opt);
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    checkSanitizeDeprecation(opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.getDefaults = function() {
  return {
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: new Renderer(),
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    xhtml: false
  };
};

marked.defaults = marked.getDefaults();

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.Slugger = Slugger;

marked.parse = marked;

{
  module.exports = marked;
}
})();
});

const GET_SITES = gql `
  {
    sites(availableOnline: true) {
      name
      id
    }
  }
`;
const GET_USER$2 = gql `
  {
    user {
      site {
        id
        name
      }
    }
  }
`;
const GET_PROMOS = gql `
  {
    promos {
      targetAudience
      title
      description
      qualifiedUrl
      imageUrl
    }
  }
`;
const SET_SITE = gql `
  mutation setSite($siteId: ID!) {
    setSite(siteId: $siteId) {
      site {
        id
        name
      }
    }
  }
`;
const GET_COPY = gql `
  {
    contentBlocks(filters: { category: "site happenings" }) {
      content
      slug
    }
  }
`;

const SiteHappenings = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.analytics = window['analytics'] || {};
        this.contentfulSites = [];
        this.sites = [];
        this.happenings = [];
        this.user = null;
    }
    watchHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.apolloClient = CrdsApollo(newValue);
            this.getUser();
        }
    }
    /** Stencil Personalization Components Defaults **/
    // This lets unit tests capture and confirm errors rather than listening in on console.error
    logError(err) {
        console.error(err);
    }
    getInViewDetails() {
        return { selectedSite: this.selectedSite };
    }
    /** Stencil Lifecycle methods **/
    componentDidLoad() {
        Utils.trackInView(this.host, 'HappeningComponent', this.getInViewDetails.bind(this));
    }
    componentWillLoad() {
        this.apolloClient = CrdsApollo(this.authToken);
        this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'site happenings');
        Promise.all([this.getSites(), this.getPromos(), this.contentBlockHandler.getCopy(), this.getUser()]).then(() => {
            this.validateSelectedSite((this.user && this.user.site) || 'Churchwide');
        });
    }
    componentDidRender() {
        this.handleParentElementWidthBasedOnText(this.host.shadowRoot.querySelector('.happenings-dropdown-select'), this.selectedSite);
    }
    /** GraphQL I/O **/
    getSites() {
        return this.apolloClient
            .query({ query: GET_SITES })
            .then(response => {
            this.validateSites(response.data.sites);
            return;
        })
            .catch(err => {
            this.logError(err);
        });
    }
    getUser() {
        if (!this.authToken)
            return Promise.resolve(this.resetUser());
        return this.apolloClient
            .query({ query: GET_USER$2 })
            .then(response => {
            const user = response.data.user;
            const siteName = user.site && user.site.name;
            this.validateUserSite(siteName);
            this.validateSelectedSite(this.user.site);
            return;
        })
            .catch(err => {
            this.resetUser();
            this.logError(err);
        });
    }
    getPromos() {
        return this.apolloClient
            .query({ query: GET_PROMOS })
            .then(response => {
            const promoList = response.data.promos;
            this.setHappenings(promoList);
            this.setContentfulSites();
            this.renderHappenings();
            return;
        })
            .catch(err => this.logError(err));
    }
    setUserSite(siteId) {
        return this.apolloClient
            .mutate({
            variables: { siteId: siteId },
            mutation: SET_SITE
        })
            .catch(err => {
            this.logError(err);
        });
    }
    /** Setters **/
    resetUser() {
        this.user = null;
        this.validateSelectedSite('Churchwide');
    }
    /**
     * Set sites after sorting and removing invalid/excluded sites
     * @param sites
     */
    validateSites(sites) {
        const allowedSites = sites.filter(site => typeof site.name === 'string' && site.name !== 'Not site specific' && site.name !== 'Xroads Church');
        this.sites = allowedSites.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    }
    /**
     * Sets user's site if new site is a non-empty string
     * @param siteName
     */
    validateUserSite(siteName) {
        if (typeof siteName === 'string' && siteName !== '') {
            this.user = { site: siteName };
        }
    }
    /**
     * Sets selectdSite to given site name if name meets conditions or 'Churchwide'.
     * This method will trigger a re-render of the component.
     * @param siteName
     */
    validateSelectedSite(siteName) {
        if (siteName === 'Not site specific' ||
            siteName === 'I do not attend Crossroads' ||
            siteName === 'Anywhere' ||
            siteName === '') {
            siteName = 'Churchwide';
        }
        if (this.contentfulSites.includes(siteName))
            this.selectedSite = siteName;
    }
    /**
     * Sets happenings to a list of Contentful promos with audiences
     * @param promoList
     */
    setHappenings(promoList) {
        this.happenings = promoList.filter(promo => promo.targetAudience !== null);
    }
    /**
     * Sets contentfulSites to unique contentful sites currently in happenings
     */
    setContentfulSites() {
        const uniqueAudiences = new Set();
        this.happenings.forEach(promo => promo.targetAudience.forEach(audience => uniqueAudiences.add(audience)));
        this.contentfulSites = Array.from(uniqueAudiences).sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
    }
    /** Event handlers/DOM modifiers **/
    /**
     * Update selected site based on selection in dropdown
     * @param event
     */
    handleSiteSelection(event) {
        this.validateSelectedSite(event.target.value);
        this.analytics.track('HappeningSiteFiltered', {
            site: this.selectedSite
        });
    }
    /**
     * Override HTML's behavior of
     * sizing dropdowns to the largest
     * string in the list
     */
    handleParentElementWidthBasedOnText(element, text) {
        let tmpSelect = document.createElement('select');
        let styles = window.getComputedStyle(element);
        tmpSelect.style.visibility = 'hidden';
        tmpSelect.style.margin = styles.margin;
        tmpSelect.style.padding = styles.padding;
        tmpSelect.style.fontSize = styles.fontSize;
        tmpSelect.style.fontFamily = styles.fontFamily;
        tmpSelect.style.webkitAppearance = 'none';
        let tmpOption = document.createElement('option');
        tmpOption.innerText = text;
        tmpSelect.appendChild(tmpOption);
        this.host.shadowRoot.appendChild(tmpSelect);
        element.parentNode.style.width = `${tmpSelect.offsetWidth + 12}px`;
        this.host.shadowRoot.removeChild(tmpSelect);
    }
    /**
     * Report data to analytics when happenings card clicked
     * @param event
     */
    handleHappeningsClicked(event) {
        let target = event.target;
        let params = {
            title: target.tagName === 'A' ? target.innerText.toLowerCase() : target.alt.toLowerCase(),
            url: target.tagName === 'A' ? target.href : target.parentNode.href,
            userSite: (this.user && this.user.site) || 'logged out',
            selectedSite: this.selectedSite
        };
        this.analytics.track('HappeningCardClicked', {
            params
        });
    }
    /**
     * Receive user input from the select site
     * modal
     */
    handleSetSiteInput(event) {
        //Set variables
        const siteName = event.target.options[event.target.selectedIndex].text;
        this.validateUserSite(siteName);
        this.validateSelectedSite(siteName);
        //Modify DOM
        this.handleSetSiteModalClose();
        //Store changes to DB
        const selectedSiteId = event.target.value;
        this.setUserSite(selectedSiteId);
        //Report to analytics
        this.analytics.track('HappeningSiteUpdated', {
            id: selectedSiteId,
            name: this.selectedSite
        });
    }
    /**
     * Close the site select modal
     */
    handleSetSiteModalClose() {
        this.host.shadowRoot.querySelector('.site-select-message').classList.add('hidden');
    }
    /**
     * Map 4 fake cards while processing data
     * from ctfl
     */
    renderHappeningsSkeleton() {
        let arr = [];
        if (window.innerWidth < 768) {
            arr.push(1, 2);
        }
        else if (window.innerWidth < 960) {
            arr.push(1, 2, 3);
        }
        else {
            arr.push(1, 2, 3, 4);
        }
        return arr.map(() => (h("div", { class: "skeleton skeleton-happenings" }, h("div", { class: "image shimmer" }), h("div", { class: "content" }, h("div", { class: "overlap" }, h("div", { class: "text title shimmer" }), h("div", { class: "text title shimmer" })), h("div", { class: "text subtitle shimmer" }), h("div", { class: "text subtitle shimmer" }), h("div", { class: "text subtitle shimmer" }), h("div", { class: "text subtitle shimmer" })))));
    }
    /**
     * Display happenings cards filtered by dropdown
     */
    renderHappenings() {
        if (!this.selectedSite)
            return this.renderHappeningsSkeleton();
        return this.happenings
            .filter(happening => happening.targetAudience.find(ta => ta === this.selectedSite))
            .map((obj, index) => (h("div", { class: "card carousel-cell", key: index }, h("a", { class: "relative", href: obj.qualifiedUrl, onClick: event => this.handleHappeningsClicked(event) }, h("img", { alt: obj.title, class: "img-responsive", src: Utils.imgixify(obj.imageUrl) + `?auto=format&w=400&h=300&fit=crop` })), h("div", { class: "card-block" }, h("h4", { class: "card-title card-title--overlap text-uppercase" }, h("a", { href: obj.qualifiedUrl, onClick: event => this.handleHappeningsClicked(event) }, obj.title)), h("div", { class: "card-text", innerHTML: marked(obj.description || '') })))));
    }
    /**
     * Returns set site modal if conditions are met or empty string
     */
    maybeRenderSetSiteModal() {
        if (this.user && !this.isUserSiteSet())
            return this.renderSetSiteModal();
        return '';
    }
    /**
     * User selects site
     */
    renderSetSiteModal() {
        return (h("div", { class: "site-select-message" }, h("button", { type: "button", class: "close", "aria-label": "Close", onClick: () => this.handleSetSiteModalClose() }, h("svg", { xmlns: "http://www.w3.org/2000/svg" }, h("line", { x1: "1", y1: "10", x2: "10", y2: "1", stroke: "#fff", strokeWidth: "2" }), h("line", { x1: "1", y1: "1", x2: "10", y2: "10", stroke: "#fff", strokeWidth: "2" }))), h("div", { class: "text-center push-top w-100" }, this.contentBlockHandler.getContentBlock('SiteHappeningsPrompt'), h("div", { class: "happenings-dropdown", "data-automation-id": "happenings-choose-site" }, h("select", { class: "dropdown w-100", onInput: event => this.handleSetSiteInput(event) }, h("option", { disabled: true, selected: true }, "Choose a site"), this.sites.map(site => (h("option", { value: site.id, "data-name": site.name }, site.name)))), h("svg", { class: "dropdown-caret icon icon-1 pull-right push-left", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 237 152" }, h("path", { d: "M200.731 135.586L92.136 244.182c-1.854 1.853-4.05 2.78-6.587 2.78s-4.731-.927-6.586-2.78l-24.295-24.295c-1.854-1.854-2.781-4.05-2.781-6.587s.927-4.732 2.78-6.586L132.385 129 54.669 51.285c-1.854-1.853-2.781-4.05-2.781-6.586 0-2.537.927-4.732 2.78-6.587l24.296-24.295c1.854-1.853 4.05-2.78 6.586-2.78 2.537 0 4.732.927 6.587 2.78L200.73 122.414c1.854 1.853 2.781 4.049 2.781 6.586s-.927 4.732-2.78 6.586z", transform: "translate(-9 -53) rotate(90 127.7 129)" }))), h("p", null, h("small", null, "*This will update the site field in your profile")))));
    }
    /** Helpers **/
    isUserSiteSet() {
        return this.user.site && this.user.site !== 'Not site specific';
    }
    /** Render **/
    render() {
        return (h("div", { class: "container push-top" }, h("div", { class: "relative" }, this.maybeRenderSetSiteModal(), h("hr", { class: "push-half-bottom" }), h("div", { class: "happenings-dropdown-container push-half-bottom" }, h("h4", { id: "happening-filter-label", class: "flush font-size-base font-family-base text-gray-light" }, "happening at crossroads"), h("div", { class: "happenings-dropdown", "data-automation-id": "happenings-dropdown" }, h("select", { class: "happenings-dropdown-select font-family-base", onInput: event => this.handleSiteSelection(event) }, this.contentfulSites.map(siteName => (h("option", { value: siteName, selected: this.selectedSite === siteName }, siteName)))), h("svg", { class: "dropdown-caret icon icon-1 pull-right push-left", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 237 152" }, h("path", { d: "M200.731 135.586L92.136 244.182c-1.854 1.853-4.05 2.78-6.587 2.78s-4.731-.927-6.586-2.78l-24.295-24.295c-1.854-1.854-2.781-4.05-2.781-6.587s.927-4.732 2.78-6.586L132.385 129 54.669 51.285c-1.854-1.853-2.781-4.05-2.781-6.586 0-2.537.927-4.732 2.78-6.587l24.296-24.295c1.854-1.853 4.05-2.78 6.586-2.78 2.537 0 4.732.927 6.587 2.78L200.73 122.414c1.854 1.853 2.781 4.049 2.781 6.586s-.927 4.732-2.78 6.586z", transform: "translate(-9 -53) rotate(90 127.7 129)" })), this.selectedSite === (this.user && this.user.site) ? h("span", { class: "my-site-label" }, "(my site)") : '')), h("div", { class: "card-deck carousel", "data-crds-carousel": "mobile-scroll" }, h("div", { id: "section-what-s-happening", class: "feature-cards card-deck--expanded-layout carousel", "data-automation-id": "happenings-cards", "data-crds-carousel": "mobile-scroll" }, this.renderHappenings())))));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "authToken": ["watchHandler"]
    }; }
    static get style() { return "\@charset \"UTF-8\";*{-webkit-box-sizing:border-box;box-sizing:border-box}.relative{position:relative}.overflow-hidden{overflow:hidden}.d-flex{display:-ms-flexbox;display:flex}.d-block{display:block}.d-inline{display:inline}.d-none{display:none}.align-items-center{-ms-flex-align:center;align-items:center}.w-100{width:100%}.img-circle{border-radius:50%}hr{border:0;border-top:1px solid #e7e7e7;margin-bottom:1rem;margin-top:1rem}.btn,.font-family-base{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important}.font-family-condensed-extra{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important}.text-white{color:#fff!important}.text-gray-dark{color:#4d4d4d!important}.text-gray-light{color:#979797!important}.text-gray{color:#737373!important}.text-center{text-align:center}.text-uppercase{text-transform:uppercase}.text-uppercase.font-size-smaller{font-size:13px!important;letter-spacing:.5px}.font-size-base{font-size:16px!important}\@media (min-width:480px){.font-size-base{font-size:19px!important}}.font-size-large{font-size:19px!important}\@media (min-width:480px){.font-size-large{font-size:22px!important}}.font-size-smaller{font-size:14px!important}.font-size-smallest{font-size:10px}.font-weight-mid{font-weight:500}.bg-charcoal{background-color:#171717}.flush{margin:0!important}.flush-bottom{margin-bottom:0!important}.flush-top{margin-top:0!important}.push-half-bottom{margin-bottom:12px!important}.push-bottom{margin-bottom:24px!important}.push-top{margin-top:24px}.push-half-top{margin-top:12px!important}.soft-quarter-top{padding-top:6px}.component-header{font-family:acumin-pro-extra-condensed;line-height:.95}\@media (min-width:480px){.component-header{font-size:2.125rem}}.list-header{font-family:acumin-pro-extra-condensed,sans-serif;font-size:1.5rem;font-weight:500;text-transform:uppercase}.card>a{color:inherit;display:block;text-decoration:none}.card img{width:100%}.color-gray{color:#737373}.media-label{display:-ms-flexbox;display:flex;position:absolute;right:0;bottom:0;padding:6px 8px}.media-label>:not(:last-child){margin-right:5px}.media-label .icon{fill:#fff;height:16px;width:12px}.btn{display:inline-block;margin-bottom:0;font-weight:300;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid transparent;padding:8px 10px;font-size:16px;line-height:1.5;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:4px;line-height:1;margin-top:5px;margin-bottom:5px;font-size:14px;padding:13px 16px;text-decoration:none}.btn.btn-gray-light{color:#fff;background-color:#979797;border-color:#979797}.btn.btn.btn-blue,.btn.btn.btn-primary{color:#fff;background-color:#3b6e8f;border-color:#3b6e8f}.btn.btn.btn-blue:hover,.btn.btn.btn-primary:hover{background-color:#2c526b;border-color:#294d64}.btn.btn-gray-light.btn-outline{background:transparent;border-style:solid;border-width:1px;color:#979797}.btn.btn-gray-light.btn-outline:hover{background-color:#979797;color:#fff}.btn.btn-sm{font-size:13px;padding:10px 16px 11px}.btn.btn-block{display:block;width:100%}.label{font-family:lexia,serif;font-size:12px;margin-top:9px;padding:5px 6px 4px;display:inline;font-weight:500!important;line-height:1;color:#4d4d4d;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em;font-style:italic}.label.label-info{background-color:#b6dee6}.skeleton{position:relative}.skeleton,.skeleton .shimmer{overflow:hidden}.skeleton .shimmer:after{position:absolute;top:0;right:0;bottom:0;left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%);background-image:linear-gradient(100deg,#f0f0f0 20%,hsla(0,0%,100%,.3) 30%,hsla(0,0%,100%,.7) 40%,#f0f0f0 50%);-webkit-animation:shimmer 1.5s infinite;animation:shimmer 1.5s infinite;-webkit-animation-timing-function:ease;animation-timing-function:ease;content:\"\"}.skeleton .shimmer-reverse:after{background-image:linear-gradient(100deg,#fff 20%,hsla(0,0%,94.1%,.3) 30%,hsla(0,0%,94.1%,.7) 40%,#fff 50%)}.text-skeleton{width:100%}.text-skeleton .subtitle,.text-skeleton .title{background-color:#f0f0f0;overflow:hidden;position:relative}.text-skeleton .title{height:24px;margin-bottom:1rem;width:35%}.text-skeleton .subtitle{height:16px;width:50%}.avatar-skeleton{height:75px;width:75px;border-radius:50%;background-color:#f0f0f0;-ms-flex-negative:0;flex-shrink:0}.avatar-skeleton .shimmer:after{left:-400px;-webkit-animation:shimmer 1.5s .5s infinite;animation:shimmer 1.5s .5s infinite}\@-webkit-keyframes shimmer{to{-webkit-transform:translateX(100%);transform:translateX(100%)}}\@keyframes shimmer{to{-webkit-transform:translateX(100%);transform:translateX(100%)}}.happenings-dropdown-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}\@media (min-width:480px){.happenings-dropdown-container{-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center}}.happenings-dropdown{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.happenings-dropdown .happenings-dropdown-select{font-size:19px;position:relative;background:0;border:0;margin:0;color:#0095d9;padding:.5rem 0;-webkit-appearance:none;-moz-appearance:none;width:100%}.happenings-dropdown .happenings-dropdown-select:hover{cursor:pointer}.happenings-dropdown .happenings-dropdown-select:focus{outline:0}\@media (min-width:480px){.happenings-dropdown .happenings-dropdown-select{padding:.5rem}}.happenings-dropdown .dropdown-caret{fill:#0095d9;position:absolute;width:.75rem;right:0;padding-top:4px;pointer-events:none}\@media (min-width:480px){.happenings-dropdown .dropdown-caret{right:6px}}.happenings-dropdown .my-site-label{position:absolute;width:100%;left:calc(100% + .625rem);font-size:.875rem;color:#979797}.site-select-message{position:absolute;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;height:100%;background-color:#fff;-webkit-transition:opacity .5s ease-in-out;transition:opacity .5s ease-in-out;opacity:1;z-index:1}.site-select-message,.site-select-message .happenings-dropdown{-ms-flex-pack:center;justify-content:center}\@media (min-width:768px){.site-select-message .happenings-dropdown{margin:0 auto;width:33.333333%}}.site-select-message .happenings-dropdown .dropdown{display:inline-block;font-weight:300;text-align:center;font-size:14px;line-height:1;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;font-size:16px;line-height:1.5;border-radius:4px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin-top:5px;margin-bottom:5px;padding:10px;background:transparent;border:1px solid #0095d9;color:#0095d9;-webkit-appearance:none}.site-select-message .happenings-dropdown .dropdown:focus{outline:0}\@media (max-width:480px){.site-select-message .happenings-dropdown .dropdown{width:100%}}.site-select-message .happenings-dropdown .dropdown-caret{right:20px}.site-select-message .close{position:absolute;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;top:1rem;right:1rem;background-color:hsla(0,0%,73.3%,.6);border-radius:50%;width:1.5rem;height:1.5rem;font-weight:unset;opacity:1;padding:0;cursor:pointer;border:0}.site-select-message .close:hover{cursor:pointer}.site-select-message .close svg{width:10px;height:10px;stroke:#fff}.hidden{visibility:hidden;opacity:0}.card-deck .card{-webkit-box-flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.card-deck--expanded-layout,.card-deck .card{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.card-deck--expanded-layout{-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-overflow-scrolling:touch;overflow-x:scroll;-webkit-scroll-snap-type:x mandatory;-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory}\@media (min-width:768px){.card-deck--expanded-layout{-ms-flex-wrap:wrap;flex-wrap:wrap}}.card-deck--expanded-layout .card,.card-deck--expanded-layout .skeleton-happenings{cursor:auto;-webkit-flex:1 0 270px;-ms-flex:1 0 270px;flex:1 0 270px;-ms-flex-preferred-size:270px;flex-basis:270px;margin-bottom:1.5rem;padding:0 .5rem;position:relative;max-width:100%;scroll-snap-align:start}.card-deck--expanded-layout .card:first-child,.card-deck--expanded-layout .skeleton-happenings:first-child{padding-left:0}.card-deck--expanded-layout .card:last-child,.card-deck--expanded-layout .skeleton-happenings:last-child{padding-right:0}\@media (min-width:480px){.card-deck--expanded-layout .card,.card-deck--expanded-layout .skeleton-happenings{max-width:50%}}\@media (min-width:768px){.card-deck--expanded-layout .card,.card-deck--expanded-layout .skeleton-happenings{max-width:33.333333%}}\@media (min-width:960px){.card-deck--expanded-layout .card,.card-deck--expanded-layout .skeleton-happenings{max-width:25%}}.card-deck--expanded-layout .card a,.card-deck--expanded-layout .skeleton-happenings a{color:inherit;text-decoration:none}.card-deck--expanded-layout .card .card-text,.card-deck--expanded-layout .skeleton-happenings .card-text{font-size:.9375rem;position:relative}.card-deck--expanded-layout .card .card-text p,.card-deck--expanded-layout .skeleton-happenings .card-text p{margin:0}.card-deck--expanded-layout .card .card-block,.card-deck--expanded-layout .skeleton-happenings .card-block{font-family:acumin-pro,helvetica,arial,sans-serif;padding:1rem}.card-deck--expanded-layout .card .card-block .component-header,.card-deck--expanded-layout .skeleton-happenings .card-block .component-header{line-height:.95}.skeleton-happenings{height:500px;margin:0}.skeleton-happenings .image{height:75%;max-height:200px;width:100%}.skeleton-happenings .image,.skeleton-happenings .text{background-color:#f0f0f0;position:relative}.skeleton-happenings .content{padding:.5rem}.skeleton-happenings .content .overlap{background:#fff;padding:.5rem;-webkit-transform:translateY(-40%);transform:translateY(-40%)}.skeleton-happenings .content .title{height:24px;margin-bottom:.5rem}.skeleton-happenings .content .title:nth-child(2){width:75%}.skeleton-happenings .content .subtitle{height:16px;margin:.5rem}.skeleton-happenings .content .subtitle:nth-child(3){width:75%}.skeleton-happenings .content .subtitle:nth-child(4){width:85%}.skeleton-happenings .content .subtitle:nth-child(5){width:50%}.img-responsive{display:block;height:auto;max-width:100%}.card-title--overlap{background-color:#fff;display:inline-block;font-family:acumin-pro-extra-condensed,sans-serif;font-size:2.125rem;margin:-2rem -.5rem 0;padding:.25rem .5rem;position:relative}.card-title--overlap:after{color:#979797;content:\"—\";display:block;font-family:acumin-pro,helvetica,arial,sans-serif;font-size:1.25rem;font-weight:100;line-height:1.5}.card-title{color:#4d4d4d;line-height:1;font-weight:600}.text-uppercase{text-transform:uppercase!important}.component-header{font-family:acumin-pro-extra-condensed,sans-serif;font-size:2rem;font-weight:500;line-height:1.1;text-transform:uppercase}"; }
};

const SnailTrail = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.env = 'prod';
        this.data = {};
    }
    componentWillLoad() {
        if (this.src || (this.name && this.env)) {
            const url = this.src || `https://crds-data.netlify.com/snail-trails/${this.name}/${this.env}.json`;
            axios$1.get(url).then(response => (this.data = response.data));
        }
    }
    listItem(item) {
        if (item.subscribe && item.src)
            return h("crds-subscribe", { src: item.src, label: item.title });
        if (!item.href)
            return h("strong", null, item.title);
        return (h("crds-snail-trail-link", { href: item.href, automationId: item['data-automation-id'] }, item.title));
    }
    list(section) {
        return section.map(item => {
            return h("li", null, this.listItem(item));
        });
    }
    navSections() {
        if (!this.data.nav)
            return;
        return this.data.nav.map(section => h("ul", null, this.list(section)));
    }
    render() {
        if (!this.data.nav && this.element.childElementCount == 0)
            return;
        return (h(Fragment, null, h("nav", null, h("div", null, this.element.childElementCount > 0 && h("slot", null), this.element.childElementCount == 0 && h(Fragment, null, this.navSections())))));
    }
    get element() { return getElement(this); }
    static get style() { return "nav{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;background-color:#fff;-webkit-box-shadow:0 1px 6px 0 rgba(0,0,0,.14);box-shadow:0 1px 6px 0 rgba(0,0,0,.14);font-size:14px;padding-left:20px;position:relative}\@media (min-width:1170px){nav{padding-left:0}}nav>div{display:-ms-flexbox;display:flex;-webkit-overflow-scrolling:touch;overflow-x:auto;overflow-y:hidden;position:relative;scrollbar-width:none;margin:0 auto;max-width:1170px}\@media (max-width:992px){nav:after{background:-webkit-gradient(linear,left top,right top,from(hsla(0,0%,100%,0)),to(rgba(0,0,0,.8)));background:linear-gradient(90deg,hsla(0,0%,100%,0),rgba(0,0,0,.8));content:\"\";display:inline-block;height:100%;opacity:.3;position:absolute;right:0;top:0;width:20px}}strong{color:#4d4d4d;display:inline-block;font-weight:600;margin-right:15px;padding:11px 0;text-transform:capitalize;white-space:nowrap}ul{padding-left:0;-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;margin-bottom:0;margin-top:0}ul li{list-style:none}ul:not(:last-of-type):after{border-right:1px solid #d8d8d8;content:\"\";height:calc(100% - 22px);width:1px}li{display:inline-block;text-transform:capitalize;white-space:nowrap}"; }
};

/*! https://mths.be/punycode v1.4.1 by @mathias */


/** Highest positive signed 32-bit float value */
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\x20-\x7E]/; // unprintable ASCII chars + non-ASCII chars
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
var errors = {
  'overflow': 'Overflow: input needs wider integers to process',
  'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
  'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error(type) {
  throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, fn) {
  var length = array.length;
  var result = [];
  while (length--) {
    result[length] = fn(array[length]);
  }
  return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
  var parts = string.split('@');
  var result = '';
  if (parts.length > 1) {
    // In email addresses, only the domain name should be punycoded. Leave
    // the local part (i.e. everything up to `@`) intact.
    result = parts[0] + '@';
    string = parts[1];
  }
  // Avoid `split(regex)` for IE8 compatibility. See #17.
  string = string.replace(regexSeparators, '\x2E');
  var labels = string.split('.');
  var encoded = map(labels, fn).join('.');
  return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
  var output = [],
    counter = 0,
    length = string.length,
    value,
    extra;
  while (counter < length) {
    value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // high surrogate, and there is a next character
      extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // low surrogate
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // unmatched surrogate; only append this code unit, in case the next
        // code unit is the high surrogate of a surrogate pair
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
function digitToBasic(digit, flag) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
}

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
function adapt(delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for ( /* no initialization */ ; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
}

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
function encode$1(input) {
  var n,
    delta,
    handledCPCount,
    basicLength,
    bias,
    j,
    m,
    q,
    k,
    t,
    currentValue,
    output = [],
    /** `inputLength` will hold the number of code points in `input`. */
    inputLength,
    /** Cached calculation results */
    handledCPCountPlusOne,
    baseMinusT,
    qMinusT;

  // Convert the input in UCS-2 to Unicode
  input = ucs2decode(input);

  // Cache the length
  inputLength = input.length;

  // Initialize the state
  n = initialN;
  delta = 0;
  bias = initialBias;

  // Handle the basic code points
  for (j = 0; j < inputLength; ++j) {
    currentValue = input[j];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  handledCPCount = basicLength = output.length;

  // `handledCPCount` is the number of code points that have been handled;
  // `basicLength` is the number of basic code points.

  // Finish the basic string - if it is not empty - with a delimiter
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {

    // All non-basic code points < n have been handled already. Find the next
    // larger one:
    for (m = maxInt, j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
    // but guard against overflow
    handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      error('overflow');
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];

      if (currentValue < n && ++delta > maxInt) {
        error('overflow');
      }

      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer
        for (q = delta, k = base; /* no condition */ ; k += base) {
          t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) {
            break;
          }
          qMinusT = q - t;
          baseMinusT = base - t;
          output.push(
            stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
          );
          q = floor(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q, 0)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;

  }
  return output.join('');
}

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
function toASCII(input) {
  return mapDomain(input, function(string) {
    return regexNonASCII.test(string) ?
      'xn--' + encode$1(string) :
      string;
  });
}

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString$1 = {}.toString;

const isArray$1 = Array.isArray || function (arr) {
  return toString$1.call(arr) == '[object Array]';
};

var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : true;

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr
};

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray$1(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}
Buffer.isBuffer = isBuffer$1;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!isArray$1(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer$1(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}

function isNull(arg) {
  return arg === null;
}

function isNullOrUndefined(arg) {
  return arg == null;
}

function isString$1(arg) {
  return typeof arg === 'string';
}

function isObject$1(arg) {
  return typeof arg === 'object' && arg !== null;
}

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var isArray$2 = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};
function stringifyPrimitive(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
}

function stringify (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map$1(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray$2(obj[k])) {
        return map$1(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
}
function map$1 (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

function parse(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray$2(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
}

// Copyright Joyent, Inc. and other Node contributors.
function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
  portPattern = /:[0-9]*$/,

  // Special case for a simple path URL
  simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

  // RFC 2396: characters reserved for delimiting URLs.
  // We actually just auto-escape these.
  delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

  // RFC 2396: characters not allowed for various reasons.
  unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

  // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
  autoEscape = ['\''].concat(unwise),
  // Characters that are never ever allowed in a hostname.
  // Note that any invalid chars are also handled, but these
  // are the ones that are *expected* to be seen, so we fast-path
  // them.
  nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
  hostEndingChars = ['/', '?', '#'],
  hostnameMaxLen = 255,
  hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
  hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
  // protocols that can allow "unsafe" and "unwise" chars.
  unsafeProtocol = {
    'javascript': true,
    'javascript:': true
  },
  // protocols that never have a hostname.
  hostlessProtocol = {
    'javascript': true,
    'javascript:': true
  },
  // protocols that always contain a // bit.
  slashedProtocol = {
    'http': true,
    'https': true,
    'ftp': true,
    'gopher': true,
    'file': true,
    'http:': true,
    'https:': true,
    'ftp:': true,
    'gopher:': true,
    'file:': true
  };

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && isObject$1(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}
Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  return parse$1(this, url, parseQueryString, slashesDenoteHost);
};

function parse$1(self, url, parseQueryString, slashesDenoteHost) {
  if (!isString$1(url)) {
    throw new TypeError('Parameter \'url\' must be a string, not ' + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
    splitter =
    (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
    uSplit = url.split(splitter),
    slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      self.path = rest;
      self.href = rest;
      self.pathname = simplePath[1];
      if (simplePath[2]) {
        self.search = simplePath[2];
        if (parseQueryString) {
          self.query = parse(self.search.substr(1));
        } else {
          self.query = self.search.substr(1);
        }
      } else if (parseQueryString) {
        self.search = '';
        self.query = {};
      }
      return self;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    self.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      self.slashes = true;
    }
  }
  var i, hec, l, p;
  if (!hostlessProtocol[proto] &&
    (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (i = 0; i < hostEndingChars.length; i++) {
      hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      self.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (i = 0; i < nonHostChars.length; i++) {
      hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    self.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    parseHost(self);

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    self.hostname = self.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = self.hostname[0] === '[' &&
      self.hostname[self.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = self.hostname.split(/\./);
      for (i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            self.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (self.hostname.length > hostnameMaxLen) {
      self.hostname = '';
    } else {
      // hostnames are always lower case.
      self.hostname = self.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      self.hostname = toASCII(self.hostname);
    }

    p = self.port ? ':' + self.port : '';
    var h = self.hostname || '';
    self.host = h + p;
    self.href += self.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      self.hostname = self.hostname.substr(1, self.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    self.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    self.search = rest.substr(qm);
    self.query = rest.substr(qm + 1);
    if (parseQueryString) {
      self.query = parse(self.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    self.search = '';
    self.query = {};
  }
  if (rest) self.pathname = rest;
  if (slashedProtocol[lowerProto] &&
    self.hostname && !self.pathname) {
    self.pathname = '/';
  }

  //to support http.request
  if (self.pathname || self.search) {
    p = self.pathname || '';
    var s = self.search || '';
    self.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  self.href = format(self);
  return self;
}

function format(self) {
  var auth = self.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = self.protocol || '',
    pathname = self.pathname || '',
    hash = self.hash || '',
    host = false,
    query = '';

  if (self.host) {
    host = auth + self.host;
  } else if (self.hostname) {
    host = auth + (self.hostname.indexOf(':') === -1 ?
      self.hostname :
      '[' + this.hostname + ']');
    if (self.port) {
      host += ':' + self.port;
    }
  }

  if (self.query &&
    isObject$1(self.query) &&
    Object.keys(self.query).length) {
    query = stringify(self.query);
  }

  var search = self.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (self.slashes ||
    (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
}

Url.prototype.format = function() {
  return format(this);
};

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

Url.prototype.resolveObject = function(relative) {
  if (isString$1(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
      result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }
  var relPath;
  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
    isRelAbs = (
      relative.host ||
      relative.pathname && relative.pathname.charAt(0) === '/'
    ),
    mustEndAbs = (isRelAbs || isSourceAbs ||
      (result.host && relative.pathname)),
    removeAllDots = mustEndAbs,
    srcPath = result.pathname && result.pathname.split('/') || [],
    psychotic = result.protocol && !slashedProtocol[result.protocol];
  relPath = relative.pathname && relative.pathname.split('/') || [];
  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }
  var authInHost;
  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
      relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      authInHost = result.host && result.host.indexOf('@') > 0 ?
        result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
        (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
    (result.host || relative.host || srcPath.length > 1) &&
    (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
    (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
    (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
      srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    authInHost = result.host && result.host.indexOf('@') > 0 ?
      result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!isNull(result.pathname) || !isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
      (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  return parseHost(this);
};

function parseHost(self) {
  var host = self.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      self.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) self.hostname = host;
}

const SnailTrailLink = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.href = '#';
    }
    componentWillLoad() {
        const url = urlParse(this.href);
        const elPath = this.stripTrailingSlash(url.pathname);
        const currentPath = this.stripTrailingSlash(window.location.pathname);
        this.isActive = this.isActive == undefined ? elPath == currentPath : this.isActive;
    }
    stripTrailingSlash(str) {
        try {
            return str.replace(/^(.+?)\/*?$/, '$1');
        }
        catch (_a) {
            return str;
        }
    }
    clicked() {
        let siblings = this.element.parentNode.parentElement.querySelectorAll('crds-snail-trail-link');
        siblings.forEach(el => (el['isActive'] = false));
        this.isActive = true;
    }
    render() {
        let props = {
            href: this.href,
            onClick: this.clicked.bind(this),
            class: this.isActive ? 'active' : ''
        };
        return (h("a", Object.assign({ "data-automation-id": this.automationId }, props), h("slot", null)));
    }
    get element() { return getElement(this); }
    static get style() { return "a{color:#4d4d4d;display:block;font-weight:300;padding:11px 15px;position:relative;text-decoration:none}a.active:before{border:10px solid transparent;border-bottom:0;border-top-color:#0095d9;content:\"\";left:50%;position:absolute;top:0;-webkit-transform:translateX(-50%);transform:translateX(-50%)}\@media (hover){a:hover:after{background-color:#0095d9;bottom:0;content:\"\";display:inline-block;height:2px;left:15px;position:absolute;width:calc(100% - 30px)}}"; }
};

var iframeResizer = createCommonjsModule(function (module) {
(function(undefined$1) {
  if (typeof window === 'undefined') return // don't run for server side render

  var count = 0,
    logEnabled = false,
    hiddenCheckEnabled = false,
    msgHeader = 'message',
    msgHeaderLen = msgHeader.length,
    msgId = '[iFrameSizer]', // Must match iframe msg ID
    msgIdLen = msgId.length,
    pagePosition = null,
    requestAnimationFrame = window.requestAnimationFrame,
    resetRequiredMethods = {
      max: 1,
      scroll: 1,
      bodyScroll: 1,
      documentElementScroll: 1
    },
    settings = {},
    timer = null,
    defaults = {
      autoResize: true,
      bodyBackground: null,
      bodyMargin: null,
      bodyMarginV1: 8,
      bodyPadding: null,
      checkOrigin: true,
      inPageLinks: false,
      enablePublicMethods: true,
      heightCalculationMethod: 'bodyOffset',
      id: 'iFrameResizer',
      interval: 32,
      log: false,
      maxHeight: Infinity,
      maxWidth: Infinity,
      minHeight: 0,
      minWidth: 0,
      resizeFrom: 'parent',
      scrolling: false,
      sizeHeight: true,
      sizeWidth: false,
      warningTimeout: 5000,
      tolerance: 0,
      widthCalculationMethod: 'scroll',
      onClosed: function() {},
      onInit: function() {},
      onMessage: function() {
        warn('onMessage function not defined');
      },
      onResized: function() {},
      onScroll: function() {
        return true
      }
    };

  function getMutationObserver() {
    return (
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
    )
  }

  function addEventListener(el, evt, func) {
    el.addEventListener(evt, func, false);
  }

  function removeEventListener(el, evt, func) {
    el.removeEventListener(evt, func, false);
  }

  function setupRequestAnimationFrame() {
    var vendors = ['moz', 'webkit', 'o', 'ms'];
    var x;

    // Remove vendor prefixing if prefixed and break early if not
    for (x = 0; x < vendors.length && !requestAnimationFrame; x += 1) {
      requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    }

    if (!requestAnimationFrame) {
      log('setup', 'RequestAnimationFrame not supported');
    }
  }

  function getMyID(iframeId) {
    var retStr = 'Host page: ' + iframeId;

    if (window.top !== window.self) {
      if (window.parentIFrame && window.parentIFrame.getId) {
        retStr = window.parentIFrame.getId() + ': ' + iframeId;
      } else {
        retStr = 'Nested host page: ' + iframeId;
      }
    }

    return retStr
  }

  function formatLogHeader(iframeId) {
    return msgId + '[' + getMyID(iframeId) + ']'
  }

  function isLogEnabled(iframeId) {
    return settings[iframeId] ? settings[iframeId].log : logEnabled
  }

  function log(iframeId, msg) {
    output('log', iframeId, msg, isLogEnabled(iframeId));
  }

  function info(iframeId, msg) {
    output('info', iframeId, msg, isLogEnabled(iframeId));
  }

  function warn(iframeId, msg) {
    output('warn', iframeId, msg, true);
  }

  function output(type, iframeId, msg, enabled) {
    if (true === enabled && 'object' === typeof window.console) {
      // eslint-disable-next-line no-console
      console[type](formatLogHeader(iframeId), msg);
    }
  }

  function iFrameListener(event) {
    function resizeIFrame() {
      function resize() {
        setSize(messageData);
        setPagePosition(iframeId);
        on('onResized', messageData);
      }

      ensureInRange('Height');
      ensureInRange('Width');

      syncResize(resize, messageData, 'init');
    }

    function processMsg() {
      var data = msg.substr(msgIdLen).split(':');

      return {
        iframe: settings[data[0]] && settings[data[0]].iframe,
        id: data[0],
        height: data[1],
        width: data[2],
        type: data[3]
      }
    }

    function ensureInRange(Dimension) {
      var max = Number(settings[iframeId]['max' + Dimension]),
        min = Number(settings[iframeId]['min' + Dimension]),
        dimension = Dimension.toLowerCase(),
        size = Number(messageData[dimension]);

      log(iframeId, 'Checking ' + dimension + ' is in range ' + min + '-' + max);

      if (size < min) {
        size = min;
        log(iframeId, 'Set ' + dimension + ' to min value');
      }

      if (size > max) {
        size = max;
        log(iframeId, 'Set ' + dimension + ' to max value');
      }

      messageData[dimension] = '' + size;
    }

    function isMessageFromIFrame() {
      function checkAllowedOrigin() {
        function checkList() {
          var i = 0,
            retCode = false;

          log(
            iframeId,
            'Checking connection is from allowed list of origins: ' +
              checkOrigin
          );

          for (; i < checkOrigin.length; i++) {
            if (checkOrigin[i] === origin) {
              retCode = true;
              break
            }
          }
          return retCode
        }

        function checkSingle() {
          var remoteHost = settings[iframeId] && settings[iframeId].remoteHost;
          log(iframeId, 'Checking connection is from: ' + remoteHost);
          return origin === remoteHost
        }

        return checkOrigin.constructor === Array ? checkList() : checkSingle()
      }

      var origin = event.origin,
        checkOrigin = settings[iframeId] && settings[iframeId].checkOrigin;

      if (checkOrigin && '' + origin !== 'null' && !checkAllowedOrigin()) {
        throw new Error(
          'Unexpected message received from: ' +
            origin +
            ' for ' +
            messageData.iframe.id +
            '. Message was: ' +
            event.data +
            '. This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.'
        )
      }

      return true
    }

    function isMessageForUs() {
      return (
        msgId === ('' + msg).substr(0, msgIdLen) &&
        msg.substr(msgIdLen).split(':')[0] in settings
      ) // ''+Protects against non-string msg
    }

    function isMessageFromMetaParent() {
      // Test if this message is from a parent above us. This is an ugly test, however, updating
      // the message format would break backwards compatibity.
      var retCode = messageData.type in { true: 1, false: 1, undefined: 1 };

      if (retCode) {
        log(iframeId, 'Ignoring init message from meta parent page');
      }

      return retCode
    }

    function getMsgBody(offset) {
      return msg.substr(msg.indexOf(':') + msgHeaderLen + offset)
    }

    function forwardMsgFromIFrame(msgBody) {
      log(
        iframeId,
        'onMessage passed: {iframe: ' +
          messageData.iframe.id +
          ', message: ' +
          msgBody +
          '}'
      );
      on('onMessage', {
        iframe: messageData.iframe,
        message: JSON.parse(msgBody)
      });
      log(iframeId, '--');
    }

    function getPageInfo() {
      var bodyPosition = document.body.getBoundingClientRect(),
        iFramePosition = messageData.iframe.getBoundingClientRect();

      return JSON.stringify({
        iframeHeight: iFramePosition.height,
        iframeWidth: iFramePosition.width,
        clientHeight: Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        ),
        clientWidth: Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        ),
        offsetTop: parseInt(iFramePosition.top - bodyPosition.top, 10),
        offsetLeft: parseInt(iFramePosition.left - bodyPosition.left, 10),
        scrollTop: window.pageYOffset,
        scrollLeft: window.pageXOffset,
        documentHeight: document.documentElement.clientHeight,
        documentWidth: document.documentElement.clientWidth,
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
      })
    }

    function sendPageInfoToIframe(iframe, iframeId) {
      function debouncedTrigger() {
        trigger('Send Page Info', 'pageInfo:' + getPageInfo(), iframe, iframeId);
      }
      debounceFrameEvents(debouncedTrigger, 32, iframeId);
    }

    function startPageInfoMonitor() {
      function setListener(type, func) {
        function sendPageInfo() {
          if (settings[id]) {
            sendPageInfoToIframe(settings[id].iframe, id);
          } else {
            stop();
          }
        }
['scroll', 'resize'].forEach(function(evt) {
          log(id, type + evt + ' listener for sendPageInfo');
          func(window, evt, sendPageInfo);
        });
      }

      function stop() {
        setListener('Remove ', removeEventListener);
      }

      function start() {
        setListener('Add ', addEventListener);
      }

      var id = iframeId; // Create locally scoped copy of iFrame ID

      start();

      if (settings[id]) {
        settings[id].stopPageInfo = stop;
      }
    }

    function stopPageInfoMonitor() {
      if (settings[iframeId] && settings[iframeId].stopPageInfo) {
        settings[iframeId].stopPageInfo();
        delete settings[iframeId].stopPageInfo;
      }
    }

    function checkIFrameExists() {
      var retBool = true;

      if (null === messageData.iframe) {
        warn(iframeId, 'IFrame (' + messageData.id + ') not found');
        retBool = false;
      }
      return retBool
    }

    function getElementPosition(target) {
      var iFramePosition = target.getBoundingClientRect();

      getPagePosition(iframeId);

      return {
        x: Math.floor(Number(iFramePosition.left) + Number(pagePosition.x)),
        y: Math.floor(Number(iFramePosition.top) + Number(pagePosition.y))
      }
    }

    function scrollRequestFromChild(addOffset) {
      /* istanbul ignore next */ // Not testable in Karma
      function reposition() {
        pagePosition = newPosition;
        scrollTo();
        log(iframeId, '--');
      }

      function calcOffset() {
        return {
          x: Number(messageData.width) + offset.x,
          y: Number(messageData.height) + offset.y
        }
      }

      function scrollParent() {
        if (window.parentIFrame) {
          window.parentIFrame['scrollTo' + (addOffset ? 'Offset' : '')](
            newPosition.x,
            newPosition.y
          );
        } else {
          warn(
            iframeId,
            'Unable to scroll to requested position, window.parentIFrame not found'
          );
        }
      }

      var offset = addOffset
          ? getElementPosition(messageData.iframe)
          : { x: 0, y: 0 },
        newPosition = calcOffset();

      log(
        iframeId,
        'Reposition requested from iFrame (offset x:' +
          offset.x +
          ' y:' +
          offset.y +
          ')'
      );

      if (window.top !== window.self) {
        scrollParent();
      } else {
        reposition();
      }
    }

    function scrollTo() {
      if (false !== on('onScroll', pagePosition)) {
        setPagePosition(iframeId);
      } else {
        unsetPagePosition();
      }
    }

    function findTarget(location) {
      function jumpToTarget() {
        var jumpPosition = getElementPosition(target);

        log(
          iframeId,
          'Moving to in page link (#' +
            hash +
            ') at x: ' +
            jumpPosition.x +
            ' y: ' +
            jumpPosition.y
        );
        pagePosition = {
          x: jumpPosition.x,
          y: jumpPosition.y
        };

        scrollTo();
        log(iframeId, '--');
      }

      function jumpToParent() {
        if (window.parentIFrame) {
          window.parentIFrame.moveToAnchor(hash);
        } else {
          log(
            iframeId,
            'In page link #' +
              hash +
              ' not found and window.parentIFrame not found'
          );
        }
      }

      var hash = location.split('#')[1] || '',
        hashData = decodeURIComponent(hash),
        target =
          document.getElementById(hashData) ||
          document.getElementsByName(hashData)[0];

      if (target) {
        jumpToTarget();
      } else if (window.top !== window.self) {
        jumpToParent();
      } else {
        log(iframeId, 'In page link #' + hash + ' not found');
      }
    }

    function on(funcName, val) {
      return chkEvent(iframeId, funcName, val)
    }

    function actionMsg() {
      if (settings[iframeId] && settings[iframeId].firstRun) firstRun();

      switch (messageData.type) {
        case 'close':
          if (settings[iframeId].closeRequeston)
            chkEvent(iframeId, 'onCloseRequest', settings[iframeId].iframe);
          else closeIFrame(messageData.iframe);
          break

        case 'message':
          forwardMsgFromIFrame(getMsgBody(6));
          break

        case 'scrollTo':
          scrollRequestFromChild(false);
          break

        case 'scrollToOffset':
          scrollRequestFromChild(true);
          break

        case 'pageInfo':
          sendPageInfoToIframe(
            settings[iframeId] && settings[iframeId].iframe,
            iframeId
          );
          startPageInfoMonitor();
          break

        case 'pageInfoStop':
          stopPageInfoMonitor();
          break

        case 'inPageLink':
          findTarget(getMsgBody(9));
          break

        case 'reset':
          resetIFrame(messageData);
          break

        case 'init':
          resizeIFrame();
          on('onInit', messageData.iframe);
          break

        default:
          resizeIFrame();
      }
    }

    function hasSettings(iframeId) {
      var retBool = true;

      if (!settings[iframeId]) {
        retBool = false;
        warn(
          messageData.type +
            ' No settings for ' +
            iframeId +
            '. Message was: ' +
            msg
        );
      }

      return retBool
    }

    function iFrameReadyMsgReceived() {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (var iframeId in settings) {
        trigger(
          'iFrame requested init',
          createOutgoingMsg(iframeId),
          document.getElementById(iframeId),
          iframeId
        );
      }
    }

    function firstRun() {
      if (settings[iframeId]) {
        settings[iframeId].firstRun = false;
      }
    }

    var msg = event.data,
      messageData = {},
      iframeId = null;

    if ('[iFrameResizerChild]Ready' === msg) {
      iFrameReadyMsgReceived();
    } else if (isMessageForUs()) {
      messageData = processMsg();
      iframeId = messageData.id;
      if (settings[iframeId]) {
        settings[iframeId].loaded = true;
      }

      if (!isMessageFromMetaParent() && hasSettings(iframeId)) {
        log(iframeId, 'Received: ' + msg);

        if (checkIFrameExists() && isMessageFromIFrame()) {
          actionMsg();
        }
      }
    } else {
      info(iframeId, 'Ignored: ' + msg);
    }
  }

  function chkEvent(iframeId, funcName, val) {
    var func = null,
      retVal = null;

    if (settings[iframeId]) {
      func = settings[iframeId][funcName];

      if ('function' === typeof func) {
        retVal = func(val);
      } else {
        throw new TypeError(
          funcName + ' on iFrame[' + iframeId + '] is not a function'
        )
      }
    }

    return retVal
  }

  function removeIframeListeners(iframe) {
    var iframeId = iframe.id;
    delete settings[iframeId];
  }

  function closeIFrame(iframe) {
    var iframeId = iframe.id;
    log(iframeId, 'Removing iFrame: ' + iframeId);

    try {
      // Catch race condition error with React
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    } catch (error) {
      warn(error);
    }

    chkEvent(iframeId, 'onClosed', iframeId);
    log(iframeId, '--');
    removeIframeListeners(iframe);
  }

  function getPagePosition(iframeId) {
    if (null === pagePosition) {
      pagePosition = {
        x:
          window.pageXOffset !== undefined$1
            ? window.pageXOffset
            : document.documentElement.scrollLeft,
        y:
          window.pageYOffset !== undefined$1
            ? window.pageYOffset
            : document.documentElement.scrollTop
      };
      log(
        iframeId,
        'Get page position: ' + pagePosition.x + ',' + pagePosition.y
      );
    }
  }

  function setPagePosition(iframeId) {
    if (null !== pagePosition) {
      window.scrollTo(pagePosition.x, pagePosition.y);
      log(
        iframeId,
        'Set page position: ' + pagePosition.x + ',' + pagePosition.y
      );
      unsetPagePosition();
    }
  }

  function unsetPagePosition() {
    pagePosition = null;
  }

  function resetIFrame(messageData) {
    function reset() {
      setSize(messageData);
      trigger('reset', 'reset', messageData.iframe, messageData.id);
    }

    log(
      messageData.id,
      'Size reset requested by ' +
        ('init' === messageData.type ? 'host page' : 'iFrame')
    );
    getPagePosition(messageData.id);
    syncResize(reset, messageData, 'reset');
  }

  function setSize(messageData) {
    function setDimension(dimension) {
      if (!messageData.id) {
        log('undefined', 'messageData id not set');
        return
      }
      messageData.iframe.style[dimension] = messageData[dimension] + 'px';
      log(
        messageData.id,
        'IFrame (' +
          iframeId +
          ') ' +
          dimension +
          ' set to ' +
          messageData[dimension] +
          'px'
      );
    }

    function chkZero(dimension) {
      // FireFox sets dimension of hidden iFrames to zero.
      // So if we detect that set up an event to check for
      // when iFrame becomes visible.

      /* istanbul ignore next */ // Not testable in PhantomJS
      if (!hiddenCheckEnabled && '0' === messageData[dimension]) {
        hiddenCheckEnabled = true;
        log(iframeId, 'Hidden iFrame detected, creating visibility listener');
        fixHiddenIFrames();
      }
    }

    function processDimension(dimension) {
      setDimension(dimension);
      chkZero(dimension);
    }

    var iframeId = messageData.iframe.id;

    if (settings[iframeId]) {
      if (settings[iframeId].sizeHeight) {
        processDimension('height');
      }
      if (settings[iframeId].sizeWidth) {
        processDimension('width');
      }
    }
  }

  function syncResize(func, messageData, doNotSync) {
    /* istanbul ignore if */ // Not testable in PhantomJS
    if (doNotSync !== messageData.type && requestAnimationFrame) {
      log(messageData.id, 'Requesting animation frame');
      requestAnimationFrame(func);
    } else {
      func();
    }
  }

  function trigger(calleeMsg, msg, iframe, id, noResponseWarning) {
    function postMessageToIFrame() {
      var target = settings[id] && settings[id].targetOrigin;
      log(
        id,
        '[' +
          calleeMsg +
          '] Sending msg to iframe[' +
          id +
          '] (' +
          msg +
          ') targetOrigin: ' +
          target
      );
      iframe.contentWindow.postMessage(msgId + msg, target);
    }

    function iFrameNotFound() {
      warn(id, '[' + calleeMsg + '] IFrame(' + id + ') not found');
    }

    function chkAndSend() {
      if (
        iframe &&
        'contentWindow' in iframe &&
        null !== iframe.contentWindow
      ) {
        // Null test for PhantomJS
        postMessageToIFrame();
      } else {
        iFrameNotFound();
      }
    }

    function warnOnNoResponse() {
      function warning() {
        if (settings[id] && !settings[id].loaded && !errorShown) {
          errorShown = true;
          warn(
            id,
            'IFrame has not responded within ' +
              settings[id].warningTimeout / 1000 +
              ' seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning.'
          );
        }
      }

      if (
        !!noResponseWarning &&
        settings[id] &&
        !!settings[id].warningTimeout
      ) {
        settings[id].msgTimeout = setTimeout(
          warning,
          settings[id].warningTimeout
        );
      }
    }

    var errorShown = false;

    id = id || iframe.id;

    if (settings[id]) {
      chkAndSend();
      warnOnNoResponse();
    }
  }

  function createOutgoingMsg(iframeId) {
    return (
      iframeId +
      ':' +
      settings[iframeId].bodyMarginV1 +
      ':' +
      settings[iframeId].sizeWidth +
      ':' +
      settings[iframeId].log +
      ':' +
      settings[iframeId].interval +
      ':' +
      settings[iframeId].enablePublicMethods +
      ':' +
      settings[iframeId].autoResize +
      ':' +
      settings[iframeId].bodyMargin +
      ':' +
      settings[iframeId].heightCalculationMethod +
      ':' +
      settings[iframeId].bodyBackground +
      ':' +
      settings[iframeId].bodyPadding +
      ':' +
      settings[iframeId].tolerance +
      ':' +
      settings[iframeId].inPageLinks +
      ':' +
      settings[iframeId].resizeFrom +
      ':' +
      settings[iframeId].widthCalculationMethod
    )
  }

  function setupIFrame(iframe, options) {
    function setLimits() {
      function addStyle(style) {
        if (
          Infinity !== settings[iframeId][style] &&
          0 !== settings[iframeId][style]
        ) {
          iframe.style[style] = settings[iframeId][style] + 'px';
          log(
            iframeId,
            'Set ' + style + ' = ' + settings[iframeId][style] + 'px'
          );
        }
      }

      function chkMinMax(dimension) {
        if (
          settings[iframeId]['min' + dimension] >
          settings[iframeId]['max' + dimension]
        ) {
          throw new Error(
            'Value for min' +
              dimension +
              ' can not be greater than max' +
              dimension
          )
        }
      }

      chkMinMax('Height');
      chkMinMax('Width');

      addStyle('maxHeight');
      addStyle('minHeight');
      addStyle('maxWidth');
      addStyle('minWidth');
    }

    function newId() {
      var id = (options && options.id) || defaults.id + count++;
      if (null !== document.getElementById(id)) {
        id += count++;
      }
      return id
    }

    function ensureHasId(iframeId) {
      if ('' === iframeId) {
        // eslint-disable-next-line no-multi-assign
        iframe.id = iframeId = newId();
        logEnabled = (options || {}).log;
        log(
          iframeId,
          'Added missing iframe ID: ' + iframeId + ' (' + iframe.src + ')'
        );
      }

      return iframeId
    }

    function setScrolling() {
      log(
        iframeId,
        'IFrame scrolling ' +
          (settings[iframeId] && settings[iframeId].scrolling
            ? 'enabled'
            : 'disabled') +
          ' for ' +
          iframeId
      );
      iframe.style.overflow =
        false === (settings[iframeId] && settings[iframeId].scrolling)
          ? 'hidden'
          : 'auto';
      switch (settings[iframeId] && settings[iframeId].scrolling) {
        case 'omit':
          break

        case true:
          iframe.scrolling = 'yes';
          break

        case false:
          iframe.scrolling = 'no';
          break

        default:
          iframe.scrolling = settings[iframeId]
            ? settings[iframeId].scrolling
            : 'no';
      }
    }

    // The V1 iFrame script expects an int, where as in V2 expects a CSS
    // string value such as '1px 3em', so if we have an int for V2, set V1=V2
    // and then convert V2 to a string PX value.
    function setupBodyMarginValues() {
      if (
        'number' ===
          typeof (settings[iframeId] && settings[iframeId].bodyMargin) ||
        '0' === (settings[iframeId] && settings[iframeId].bodyMargin)
      ) {
        settings[iframeId].bodyMarginV1 = settings[iframeId].bodyMargin;
        settings[iframeId].bodyMargin =
          '' + settings[iframeId].bodyMargin + 'px';
      }
    }

    function checkReset() {
      // Reduce scope of firstRun to function, because IE8's JS execution
      // context stack is borked and this value gets externally
      // changed midway through running this function!!!
      var firstRun = settings[iframeId] && settings[iframeId].firstRun,
        resetRequertMethod =
          settings[iframeId] &&
          settings[iframeId].heightCalculationMethod in resetRequiredMethods;

      if (!firstRun && resetRequertMethod) {
        resetIFrame({ iframe: iframe, height: 0, width: 0, type: 'init' });
      }
    }

    function setupIFrameObject() {
      if (settings[iframeId]) {
        settings[iframeId].iframe.iFrameResizer = {
          close: closeIFrame.bind(null, settings[iframeId].iframe),

          removeListeners: removeIframeListeners.bind(
            null,
            settings[iframeId].iframe
          ),

          resize: trigger.bind(
            null,
            'Window resize',
            'resize',
            settings[iframeId].iframe
          ),

          moveToAnchor: function(anchor) {
            trigger(
              'Move to anchor',
              'moveToAnchor:' + anchor,
              settings[iframeId].iframe,
              iframeId
            );
          },

          sendMessage: function(message) {
            message = JSON.stringify(message);
            trigger(
              'Send Message',
              'message:' + message,
              settings[iframeId].iframe,
              iframeId
            );
          }
        };
      }
    }

    // We have to call trigger twice, as we can not be sure if all
    // iframes have completed loading when this code runs. The
    // event listener also catches the page changing in the iFrame.
    function init(msg) {
      function iFrameLoaded() {
        trigger('iFrame.onload', msg, iframe, undefined$1, true);
        checkReset();
      }

      function createDestroyObserver(MutationObserver) {
        if (!iframe.parentNode) {
          return
        }

        var destroyObserver = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            var removedNodes = Array.prototype.slice.call(mutation.removedNodes); // Transform NodeList into an Array
            removedNodes.forEach(function(removedNode) {
              if (removedNode === iframe) {
                closeIFrame(iframe);
              }
            });
          });
        });
        destroyObserver.observe(iframe.parentNode, {
          childList: true
        });
      }

      var MutationObserver = getMutationObserver();
      if (MutationObserver) {
        createDestroyObserver(MutationObserver);
      }

      addEventListener(iframe, 'load', iFrameLoaded);
      trigger('init', msg, iframe, undefined$1, true);
    }

    function checkOptions(options) {
      if ('object' !== typeof options) {
        throw new TypeError('Options is not an object')
      }
    }

    function copyOptions(options) {
      // eslint-disable-next-line no-restricted-syntax
      for (var option in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, option)) {
          settings[iframeId][option] = Object.prototype.hasOwnProperty.call(
            options,
            option
          )
            ? options[option]
            : defaults[option];
        }
      }
    }

    function getTargetOrigin(remoteHost) {
      return '' === remoteHost || 'file://' === remoteHost ? '*' : remoteHost
    }

    function depricate(key) {
      var splitName = key.split('Callback');

      if (splitName.length === 2) {
        var name =
          'on' + splitName[0].charAt(0).toUpperCase() + splitName[0].slice(1);
        this[name] = this[key];
        delete this[key];
        warn(
          iframeId,
          "Deprecated: '" +
            key +
            "' has been renamed '" +
            name +
            "'. The old method will be removed in the next major version."
        );
      }
    }

    function processOptions(options) {
      options = options || {};
      settings[iframeId] = {
        firstRun: true,
        iframe: iframe,
        remoteHost: iframe.src
          .split('/')
          .slice(0, 3)
          .join('/')
      };

      checkOptions(options);
      Object.keys(options).forEach(depricate, options);
      copyOptions(options);

      if (settings[iframeId]) {
        settings[iframeId].targetOrigin =
          true === settings[iframeId].checkOrigin
            ? getTargetOrigin(settings[iframeId].remoteHost)
            : '*';
      }
    }

    function beenHere() {
      return iframeId in settings && 'iFrameResizer' in iframe
    }

    var iframeId = ensureHasId(iframe.id);

    if (!beenHere()) {
      processOptions(options);
      setScrolling();
      setLimits();
      setupBodyMarginValues();
      init(createOutgoingMsg(iframeId));
      setupIFrameObject();
    } else {
      warn(iframeId, 'Ignored iFrame, already setup.');
    }
  }

  function debouce(fn, time) {
    if (null === timer) {
      timer = setTimeout(function() {
        timer = null;
        fn();
      }, time);
    }
  }

  var frameTimer = {};
  function debounceFrameEvents(fn, time, frameId) {
    if (!frameTimer[frameId]) {
      frameTimer[frameId] = setTimeout(function() {
        frameTimer[frameId] = null;
        fn();
      }, time);
    }
  }

  // Not testable in PhantomJS
  /* istanbul ignore next */

  function fixHiddenIFrames() {
    function checkIFrames() {
      function checkIFrame(settingId) {
        function chkDimension(dimension) {
          return (
            '0px' ===
            (settings[settingId] && settings[settingId].iframe.style[dimension])
          )
        }

        function isVisible(el) {
          return null !== el.offsetParent
        }

        if (
          settings[settingId] &&
          isVisible(settings[settingId].iframe) &&
          (chkDimension('height') || chkDimension('width'))
        ) {
          trigger(
            'Visibility change',
            'resize',
            settings[settingId].iframe,
            settingId
          );
        }
      }

      Object.keys(settings).forEach(function(key) {
        checkIFrame(settings[key]);
      });
    }

    function mutationObserved(mutations) {
      log(
        'window',
        'Mutation observed: ' + mutations[0].target + ' ' + mutations[0].type
      );
      debouce(checkIFrames, 16);
    }

    function createMutationObserver() {
      var target = document.querySelector('body'),
        config = {
          attributes: true,
          attributeOldValue: false,
          characterData: true,
          characterDataOldValue: false,
          childList: true,
          subtree: true
        },
        observer = new MutationObserver(mutationObserved);

      observer.observe(target, config);
    }

    var MutationObserver = getMutationObserver();
    if (MutationObserver) {
      createMutationObserver();
    }
  }

  function resizeIFrames(event) {
    function resize() {
      sendTriggerMsg('Window ' + event, 'resize');
    }

    log('window', 'Trigger event: ' + event);
    debouce(resize, 16);
  }

  // Not testable in PhantomJS
  /* istanbul ignore next */
  function tabVisible() {
    function resize() {
      sendTriggerMsg('Tab Visable', 'resize');
    }

    if ('hidden' !== document.visibilityState) {
      log('document', 'Trigger event: Visiblity change');
      debouce(resize, 16);
    }
  }

  function sendTriggerMsg(eventName, event) {
    function isIFrameResizeEnabled(iframeId) {
      return (
        settings[iframeId] &&
        'parent' === settings[iframeId].resizeFrom &&
        settings[iframeId].autoResize &&
        !settings[iframeId].firstRun
      )
    }

    Object.keys(settings).forEach(function(iframeId) {
      if (isIFrameResizeEnabled(iframeId)) {
        trigger(eventName, event, document.getElementById(iframeId), iframeId);
      }
    });
  }

  function setupEventListeners() {
    addEventListener(window, 'message', iFrameListener);

    addEventListener(window, 'resize', function() {
      resizeIFrames('resize');
    });

    addEventListener(document, 'visibilitychange', tabVisible);

    addEventListener(document, '-webkit-visibilitychange', tabVisible);
  }

  function factory() {
    function init(options, element) {
      function chkType() {
        if (!element.tagName) {
          throw new TypeError('Object is not a valid DOM element')
        } else if ('IFRAME' !== element.tagName.toUpperCase()) {
          throw new TypeError(
            'Expected <IFRAME> tag, found <' + element.tagName + '>'
          )
        }
      }

      if (element) {
        chkType();
        setupIFrame(element, options);
        iFrames.push(element);
      }
    }

    function warnDeprecatedOptions(options) {
      if (options && options.enablePublicMethods) {
        warn(
          'enablePublicMethods option has been removed, public methods are now always available in the iFrame'
        );
      }
    }

    var iFrames;

    setupRequestAnimationFrame();
    setupEventListeners();

    return function iFrameResizeF(options, target) {
      iFrames = []; // Only return iFrames past in on this call

      warnDeprecatedOptions(options);

      switch (typeof target) {
        case 'undefined':
        case 'string':
          Array.prototype.forEach.call(
            document.querySelectorAll(target || 'iframe'),
            init.bind(undefined$1, options)
          );
          break

        case 'object':
          init(options, target);
          break

        default:
          throw new TypeError('Unexpected data type (' + typeof target + ')')
      }

      return iFrames
    }
  }

  function createJQueryPublicMethod($) {
    if (!$.fn) {
      info('', 'Unable to bind to jQuery, it is not fully loaded.');
    } else if (!$.fn.iFrameResize) {
      $.fn.iFrameResize = function $iFrameResizeF(options) {
        function init(index, element) {
          setupIFrame(element, options);
        }

        return this.filter('iframe')
          .each(init)
          .end()
      };
    }
  }

  if (window.jQuery) {
    createJQueryPublicMethod(window.jQuery);
  }

  if (typeof undefined$1 === 'function' && undefined$1.amd) {
    undefined$1([], factory);
  } else {
    // Node for browserfy
    module.exports = factory();
  }
  window.iFrameResize = window.iFrameResize || factory();
})();
});

var iframeResizer_contentWindow = createCommonjsModule(function (module) {
(function(undefined$1) {
  if (typeof window === 'undefined') return // don't run for server side render

  var autoResize = true,
    base = 10,
    bodyBackground = '',
    bodyMargin = 0,
    bodyMarginStr = '',
    bodyObserver = null,
    bodyPadding = '',
    calculateWidth = false,
    doubleEventList = { resize: 1, click: 1 },
    eventCancelTimer = 128,
    firstRun = true,
    height = 1,
    heightCalcModeDefault = 'bodyOffset',
    heightCalcMode = heightCalcModeDefault,
    initLock = true,
    initMsg = '',
    inPageLinks = {},
    interval = 32,
    intervalTimer = null,
    logging = false,
    msgID = '[iFrameSizer]', // Must match host page msg ID
    msgIdLen = msgID.length,
    myID = '',
    resetRequiredMethods = {
      max: 1,
      min: 1,
      bodyScroll: 1,
      documentElementScroll: 1
    },
    resizeFrom = 'child',
    sendPermit = true,
    target = window.parent,
    targetOriginDefault = '*',
    tolerance = 0,
    triggerLocked = false,
    triggerLockedTimer = null,
    throttledTimer = 16,
    width = 1,
    widthCalcModeDefault = 'scroll',
    widthCalcMode = widthCalcModeDefault,
    win = window,
    onMessage = function() {
      warn('onMessage function not defined');
    },
    onReady = function() {},
    onPageInfo = function() {},
    customCalcMethods = {
      height: function() {
        warn('Custom height calculation function not defined');
        return document.documentElement.offsetHeight
      },
      width: function() {
        warn('Custom width calculation function not defined');
        return document.body.scrollWidth
      }
    },
    eventHandlersByName = {},
    passiveSupported = false;

  function noop() {}

  try {
    var options = Object.create(
      {},
      {
        passive: {
          get: function() {
            passiveSupported = true;
          }
        }
      }
    );
    window.addEventListener('test', noop, options);
    window.removeEventListener('test', noop, options);
  } catch (error) {
    /* */
  }

  function addEventListener(el, evt, func, options) {
    el.addEventListener(evt, func, passiveSupported ? options || {} : false);
  }

  function removeEventListener(el, evt, func) {
    el.removeEventListener(evt, func, false);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Based on underscore.js
  function throttle(func) {
    var context,
      args,
      result,
      timeout = null,
      previous = 0,
      later = function() {
        previous = getNow();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) {
          // eslint-disable-next-line no-multi-assign
          context = args = null;
        }
      };

    return function() {
      var now = getNow();

      if (!previous) {
        previous = now;
      }

      var remaining = throttledTimer - (now - previous);

      context = this;
      args = arguments;

      if (remaining <= 0 || remaining > throttledTimer) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        previous = now;
        result = func.apply(context, args);

        if (!timeout) {
          // eslint-disable-next-line no-multi-assign
          context = args = null;
        }
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }

      return result
    }
  }

  var getNow =
    Date.now ||
    function() {
      /* istanbul ignore next */ // Not testable in PhantonJS
      return new Date().getTime()
    };

  function formatLogMsg(msg) {
    return msgID + '[' + myID + '] ' + msg
  }

  function log(msg) {
    if (logging && 'object' === typeof window.console) {
      // eslint-disable-next-line no-console
      console.log(formatLogMsg(msg));
    }
  }

  function warn(msg) {
    if ('object' === typeof window.console) {
      // eslint-disable-next-line no-console
      console.warn(formatLogMsg(msg));
    }
  }

  function init() {
    readDataFromParent();
    log('Initialising iFrame (' + location.href + ')');
    readDataFromPage();
    setMargin();
    setBodyStyle('background', bodyBackground);
    setBodyStyle('padding', bodyPadding);
    injectClearFixIntoBodyElement();
    checkHeightMode();
    checkWidthMode();
    stopInfiniteResizingOfIFrame();
    setupPublicMethods();
    startEventListeners();
    inPageLinks = setupInPageLinks();
    sendSize('init', 'Init message from host page');
    onReady();
  }

  function readDataFromParent() {
    function strBool(str) {
      return 'true' === str
    }

    var data = initMsg.substr(msgIdLen).split(':');

    myID = data[0];
    bodyMargin = undefined$1 !== data[1] ? Number(data[1]) : bodyMargin; // For V1 compatibility
    calculateWidth = undefined$1 !== data[2] ? strBool(data[2]) : calculateWidth;
    logging = undefined$1 !== data[3] ? strBool(data[3]) : logging;
    interval = undefined$1 !== data[4] ? Number(data[4]) : interval;
    autoResize = undefined$1 !== data[6] ? strBool(data[6]) : autoResize;
    bodyMarginStr = data[7];
    heightCalcMode = undefined$1 !== data[8] ? data[8] : heightCalcMode;
    bodyBackground = data[9];
    bodyPadding = data[10];
    tolerance = undefined$1 !== data[11] ? Number(data[11]) : tolerance;
    inPageLinks.enable = undefined$1 !== data[12] ? strBool(data[12]) : false;
    resizeFrom = undefined$1 !== data[13] ? data[13] : resizeFrom;
    widthCalcMode = undefined$1 !== data[14] ? data[14] : widthCalcMode;
  }

  function depricate(key) {
    var splitName = key.split('Callback');

    if (splitName.length === 2) {
      var name =
        'on' + splitName[0].charAt(0).toUpperCase() + splitName[0].slice(1);
      this[name] = this[key];
      delete this[key];
      warn(
        "Deprecated: '" +
          key +
          "' has been renamed '" +
          name +
          "'. The old method will be removed in the next major version."
      );
    }
  }

  function readDataFromPage() {
    function readData() {
      var data = window.iFrameResizer;

      log('Reading data from page: ' + JSON.stringify(data));
      Object.keys(data).forEach(depricate, data);

      onMessage = 'onMessage' in data ? data.onMessage : onMessage;
      onReady = 'onReady' in data ? data.onReady : onReady;
      targetOriginDefault =
        'targetOrigin' in data ? data.targetOrigin : targetOriginDefault;
      heightCalcMode =
        'heightCalculationMethod' in data
          ? data.heightCalculationMethod
          : heightCalcMode;
      widthCalcMode =
        'widthCalculationMethod' in data
          ? data.widthCalculationMethod
          : widthCalcMode;
    }

    function setupCustomCalcMethods(calcMode, calcFunc) {
      if ('function' === typeof calcMode) {
        log('Setup custom ' + calcFunc + 'CalcMethod');
        customCalcMethods[calcFunc] = calcMode;
        calcMode = 'custom';
      }

      return calcMode
    }

    if (
      'iFrameResizer' in window &&
      Object === window.iFrameResizer.constructor
    ) {
      readData();
      heightCalcMode = setupCustomCalcMethods(heightCalcMode, 'height');
      widthCalcMode = setupCustomCalcMethods(widthCalcMode, 'width');
    }

    log('TargetOrigin for parent set to: ' + targetOriginDefault);
  }

  function chkCSS(attr, value) {
    if (-1 !== value.indexOf('-')) {
      warn('Negative CSS value ignored for ' + attr);
      value = '';
    }
    return value
  }

  function setBodyStyle(attr, value) {
    if (undefined$1 !== value && '' !== value && 'null' !== value) {
      document.body.style[attr] = value;
      log('Body ' + attr + ' set to "' + value + '"');
    }
  }

  function setMargin() {
    // If called via V1 script, convert bodyMargin from int to str
    if (undefined$1 === bodyMarginStr) {
      bodyMarginStr = bodyMargin + 'px';
    }

    setBodyStyle('margin', chkCSS('margin', bodyMarginStr));
  }

  function stopInfiniteResizingOfIFrame() {
    document.documentElement.style.height = '';
    document.body.style.height = '';
    log('HTML & body height set to "auto"');
  }

  function manageTriggerEvent(options) {
    var listener = {
      add: function(eventName) {
        function handleEvent() {
          sendSize(options.eventName, options.eventType);
        }

        eventHandlersByName[eventName] = handleEvent;

        addEventListener(window, eventName, handleEvent, { passive: true });
      },
      remove: function(eventName) {
        var handleEvent = eventHandlersByName[eventName];
        delete eventHandlersByName[eventName];

        removeEventListener(window, eventName, handleEvent);
      }
    };

    if (options.eventNames && Array.prototype.map) {
      options.eventName = options.eventNames[0];
      options.eventNames.map(listener[options.method]);
    } else {
      listener[options.method](options.eventName);
    }

    log(
      capitalizeFirstLetter(options.method) +
        ' event listener: ' +
        options.eventType
    );
  }

  function manageEventListeners(method) {
    manageTriggerEvent({
      method: method,
      eventType: 'Animation Start',
      eventNames: ['animationstart', 'webkitAnimationStart']
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Animation Iteration',
      eventNames: ['animationiteration', 'webkitAnimationIteration']
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Animation End',
      eventNames: ['animationend', 'webkitAnimationEnd']
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Input',
      eventName: 'input'
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Mouse Up',
      eventName: 'mouseup'
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Mouse Down',
      eventName: 'mousedown'
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Orientation Change',
      eventName: 'orientationchange'
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Print',
      eventName: ['afterprint', 'beforeprint']
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Ready State Change',
      eventName: 'readystatechange'
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Touch Start',
      eventName: 'touchstart'
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Touch End',
      eventName: 'touchend'
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Touch Cancel',
      eventName: 'touchcancel'
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Transition Start',
      eventNames: [
        'transitionstart',
        'webkitTransitionStart',
        'MSTransitionStart',
        'oTransitionStart',
        'otransitionstart'
      ]
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Transition Iteration',
      eventNames: [
        'transitioniteration',
        'webkitTransitionIteration',
        'MSTransitionIteration',
        'oTransitionIteration',
        'otransitioniteration'
      ]
    });
    manageTriggerEvent({
      method: method,
      eventType: 'Transition End',
      eventNames: [
        'transitionend',
        'webkitTransitionEnd',
        'MSTransitionEnd',
        'oTransitionEnd',
        'otransitionend'
      ]
    });
    if ('child' === resizeFrom) {
      manageTriggerEvent({
        method: method,
        eventType: 'IFrame Resized',
        eventName: 'resize'
      });
    }
  }

  function checkCalcMode(calcMode, calcModeDefault, modes, type) {
    if (calcModeDefault !== calcMode) {
      if (!(calcMode in modes)) {
        warn(
          calcMode + ' is not a valid option for ' + type + 'CalculationMethod.'
        );
        calcMode = calcModeDefault;
      }
      log(type + ' calculation method set to "' + calcMode + '"');
    }

    return calcMode
  }

  function checkHeightMode() {
    heightCalcMode = checkCalcMode(
      heightCalcMode,
      heightCalcModeDefault,
      getHeight,
      'height'
    );
  }

  function checkWidthMode() {
    widthCalcMode = checkCalcMode(
      widthCalcMode,
      widthCalcModeDefault,
      getWidth,
      'width'
    );
  }

  function startEventListeners() {
    if (true === autoResize) {
      manageEventListeners('add');
      setupMutationObserver();
    } else {
      log('Auto Resize disabled');
    }
  }

  function stopMsgsToParent() {
    log('Disable outgoing messages');
    sendPermit = false;
  }

  function removeMsgListener() {
    log('Remove event listener: Message');
    removeEventListener(window, 'message', receiver);
  }

  function disconnectMutationObserver() {
    if (null !== bodyObserver) {
      /* istanbul ignore next */ // Not testable in PhantonJS
      bodyObserver.disconnect();
    }
  }

  function stopEventListeners() {
    manageEventListeners('remove');
    disconnectMutationObserver();
    clearInterval(intervalTimer);
  }

  function teardown() {
    stopMsgsToParent();
    removeMsgListener();
    if (true === autoResize) stopEventListeners();
  }

  function injectClearFixIntoBodyElement() {
    var clearFix = document.createElement('div');
    clearFix.style.clear = 'both';
    // Guard against the following having been globally redefined in CSS.
    clearFix.style.display = 'block';
    clearFix.style.height = '0';
    document.body.appendChild(clearFix);
  }

  function setupInPageLinks() {
    function getPagePosition() {
      return {
        x:
          window.pageXOffset !== undefined$1
            ? window.pageXOffset
            : document.documentElement.scrollLeft,
        y:
          window.pageYOffset !== undefined$1
            ? window.pageYOffset
            : document.documentElement.scrollTop
      }
    }

    function getElementPosition(el) {
      var elPosition = el.getBoundingClientRect(),
        pagePosition = getPagePosition();

      return {
        x: parseInt(elPosition.left, 10) + parseInt(pagePosition.x, 10),
        y: parseInt(elPosition.top, 10) + parseInt(pagePosition.y, 10)
      }
    }

    function findTarget(location) {
      function jumpToTarget(target) {
        var jumpPosition = getElementPosition(target);

        log(
          'Moving to in page link (#' +
            hash +
            ') at x: ' +
            jumpPosition.x +
            ' y: ' +
            jumpPosition.y
        );
        sendMsg(jumpPosition.y, jumpPosition.x, 'scrollToOffset'); // X&Y reversed at sendMsg uses height/width
      }

      var hash = location.split('#')[1] || location, // Remove # if present
        hashData = decodeURIComponent(hash),
        target =
          document.getElementById(hashData) ||
          document.getElementsByName(hashData)[0];

      if (undefined$1 !== target) {
        jumpToTarget(target);
      } else {
        log(
          'In page link (#' +
            hash +
            ') not found in iFrame, so sending to parent'
        );
        sendMsg(0, 0, 'inPageLink', '#' + hash);
      }
    }

    function checkLocationHash() {
      if ('' !== location.hash && '#' !== location.hash) {
        findTarget(location.href);
      }
    }

    function bindAnchors() {
      function setupLink(el) {
        function linkClicked(e) {
          e.preventDefault();

          /* jshint validthis:true */
          findTarget(this.getAttribute('href'));
        }

        if ('#' !== el.getAttribute('href')) {
          addEventListener(el, 'click', linkClicked);
        }
      }

      Array.prototype.forEach.call(
        document.querySelectorAll('a[href^="#"]'),
        setupLink
      );
    }

    function bindLocationHash() {
      addEventListener(window, 'hashchange', checkLocationHash);
    }

    function initCheck() {
      // Check if page loaded with location hash after init resize
      setTimeout(checkLocationHash, eventCancelTimer);
    }

    function enableInPageLinks() {
      /* istanbul ignore else */ // Not testable in phantonJS
      if (Array.prototype.forEach && document.querySelectorAll) {
        log('Setting up location.hash handlers');
        bindAnchors();
        bindLocationHash();
        initCheck();
      } else {
        warn(
          'In page linking not fully supported in this browser! (See README.md for IE8 workaround)'
        );
      }
    }

    if (inPageLinks.enable) {
      enableInPageLinks();
    } else {
      log('In page linking not enabled');
    }

    return {
      findTarget: findTarget
    }
  }

  function setupPublicMethods() {
    log('Enable public methods');

    win.parentIFrame = {
      autoResize: function autoResizeF(resize) {
        if (true === resize && false === autoResize) {
          autoResize = true;
          startEventListeners();
        } else if (false === resize && true === autoResize) {
          autoResize = false;
          stopEventListeners();
        }

        return autoResize
      },

      close: function closeF() {
        sendMsg(0, 0, 'close');
        teardown();
      },

      getId: function getIdF() {
        return myID
      },

      getPageInfo: function getPageInfoF(callback) {
        if ('function' === typeof callback) {
          onPageInfo = callback;
          sendMsg(0, 0, 'pageInfo');
        } else {
          onPageInfo = function() {};
          sendMsg(0, 0, 'pageInfoStop');
        }
      },

      moveToAnchor: function moveToAnchorF(hash) {
        inPageLinks.findTarget(hash);
      },

      reset: function resetF() {
        resetIFrame('parentIFrame.reset');
      },

      scrollTo: function scrollToF(x, y) {
        sendMsg(y, x, 'scrollTo'); // X&Y reversed at sendMsg uses height/width
      },

      scrollToOffset: function scrollToF(x, y) {
        sendMsg(y, x, 'scrollToOffset'); // X&Y reversed at sendMsg uses height/width
      },

      sendMessage: function sendMessageF(msg, targetOrigin) {
        sendMsg(0, 0, 'message', JSON.stringify(msg), targetOrigin);
      },

      setHeightCalculationMethod: function setHeightCalculationMethodF(
        heightCalculationMethod
      ) {
        heightCalcMode = heightCalculationMethod;
        checkHeightMode();
      },

      setWidthCalculationMethod: function setWidthCalculationMethodF(
        widthCalculationMethod
      ) {
        widthCalcMode = widthCalculationMethod;
        checkWidthMode();
      },

      setTargetOrigin: function setTargetOriginF(targetOrigin) {
        log('Set targetOrigin: ' + targetOrigin);
        targetOriginDefault = targetOrigin;
      },

      size: function sizeF(customHeight, customWidth) {
        var valString =
          '' + (customHeight || '') + (customWidth ? ',' + customWidth : '');
        sendSize(
          'size',
          'parentIFrame.size(' + valString + ')',
          customHeight,
          customWidth
        );
      }
    };
  }

  function initInterval() {
    if (0 !== interval) {
      log('setInterval: ' + interval + 'ms');
      intervalTimer = setInterval(function() {
        sendSize('interval', 'setInterval: ' + interval);
      }, Math.abs(interval));
    }
  }

  // Not testable in PhantomJS
  /* istanbul ignore next */
  function setupBodyMutationObserver() {
    function addImageLoadListners(mutation) {
      function addImageLoadListener(element) {
        if (false === element.complete) {
          log('Attach listeners to ' + element.src);
          element.addEventListener('load', imageLoaded, false);
          element.addEventListener('error', imageError, false);
          elements.push(element);
        }
      }

      if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
        addImageLoadListener(mutation.target);
      } else if (mutation.type === 'childList') {
        Array.prototype.forEach.call(
          mutation.target.querySelectorAll('img'),
          addImageLoadListener
        );
      }
    }

    function removeFromArray(element) {
      elements.splice(elements.indexOf(element), 1);
    }

    function removeImageLoadListener(element) {
      log('Remove listeners from ' + element.src);
      element.removeEventListener('load', imageLoaded, false);
      element.removeEventListener('error', imageError, false);
      removeFromArray(element);
    }

    function imageEventTriggered(event, type, typeDesc) {
      removeImageLoadListener(event.target);
      sendSize(type, typeDesc + ': ' + event.target.src, undefined$1, undefined$1);
    }

    function imageLoaded(event) {
      imageEventTriggered(event, 'imageLoad', 'Image loaded');
    }

    function imageError(event) {
      imageEventTriggered(event, 'imageLoadFailed', 'Image load failed');
    }

    function mutationObserved(mutations) {
      sendSize(
        'mutationObserver',
        'mutationObserver: ' + mutations[0].target + ' ' + mutations[0].type
      );

      // Deal with WebKit / Blink asyncing image loading when tags are injected into the page
      mutations.forEach(addImageLoadListners);
    }

    function createMutationObserver() {
      var target = document.querySelector('body'),
        config = {
          attributes: true,
          attributeOldValue: false,
          characterData: true,
          characterDataOldValue: false,
          childList: true,
          subtree: true
        };

      observer = new MutationObserver(mutationObserved);

      log('Create body MutationObserver');
      observer.observe(target, config);

      return observer
    }

    var elements = [],
      MutationObserver =
        window.MutationObserver || window.WebKitMutationObserver,
      observer = createMutationObserver();

    return {
      disconnect: function() {
        if ('disconnect' in observer) {
          log('Disconnect body MutationObserver');
          observer.disconnect();
          elements.forEach(removeImageLoadListener);
        }
      }
    }
  }

  function setupMutationObserver() {
    var forceIntervalTimer = 0 > interval;

    // Not testable in PhantomJS
    /* istanbul ignore if */ if (
      window.MutationObserver ||
      window.WebKitMutationObserver
    ) {
      if (forceIntervalTimer) {
        initInterval();
      } else {
        bodyObserver = setupBodyMutationObserver();
      }
    } else {
      log('MutationObserver not supported in this browser!');
      initInterval();
    }
  }

  // document.documentElement.offsetHeight is not reliable, so
  // we have to jump through hoops to get a better value.
  function getComputedStyle(prop, el) {
    var retVal = 0;
    el = el || document.body; // Not testable in phantonJS

    retVal = document.defaultView.getComputedStyle(el, null);
    retVal = null !== retVal ? retVal[prop] : 0;

    return parseInt(retVal, base)
  }

  function chkEventThottle(timer) {
    if (timer > throttledTimer / 2) {
      throttledTimer = 2 * timer;
      log('Event throttle increased to ' + throttledTimer + 'ms');
    }
  }

  // Idea from https://github.com/guardian/iframe-messenger
  function getMaxElement(side, elements) {
    var elementsLength = elements.length,
      elVal = 0,
      maxVal = 0,
      Side = capitalizeFirstLetter(side),
      timer = getNow();

    for (var i = 0; i < elementsLength; i++) {
      elVal =
        elements[i].getBoundingClientRect()[side] +
        getComputedStyle('margin' + Side, elements[i]);
      if (elVal > maxVal) {
        maxVal = elVal;
      }
    }

    timer = getNow() - timer;

    log('Parsed ' + elementsLength + ' HTML elements');
    log('Element position calculated in ' + timer + 'ms');

    chkEventThottle(timer);

    return maxVal
  }

  function getAllMeasurements(dimention) {
    return [
      dimention.bodyOffset(),
      dimention.bodyScroll(),
      dimention.documentElementOffset(),
      dimention.documentElementScroll()
    ]
  }

  function getTaggedElements(side, tag) {
    function noTaggedElementsFound() {
      warn('No tagged elements (' + tag + ') found on page');
      return document.querySelectorAll('body *')
    }

    var elements = document.querySelectorAll('[' + tag + ']');

    if (0 === elements.length) noTaggedElementsFound();

    return getMaxElement(side, elements)
  }

  function getAllElements() {
    return document.querySelectorAll('body *')
  }

  var getHeight = {
      bodyOffset: function getBodyOffsetHeight() {
        return (
          document.body.offsetHeight +
          getComputedStyle('marginTop') +
          getComputedStyle('marginBottom')
        )
      },

      offset: function() {
        return getHeight.bodyOffset() // Backwards compatability
      },

      bodyScroll: function getBodyScrollHeight() {
        return document.body.scrollHeight
      },

      custom: function getCustomWidth() {
        return customCalcMethods.height()
      },

      documentElementOffset: function getDEOffsetHeight() {
        return document.documentElement.offsetHeight
      },

      documentElementScroll: function getDEScrollHeight() {
        return document.documentElement.scrollHeight
      },

      max: function getMaxHeight() {
        return Math.max.apply(null, getAllMeasurements(getHeight))
      },

      min: function getMinHeight() {
        return Math.min.apply(null, getAllMeasurements(getHeight))
      },

      grow: function growHeight() {
        return getHeight.max() // Run max without the forced downsizing
      },

      lowestElement: function getBestHeight() {
        return Math.max(
          getHeight.bodyOffset() || getHeight.documentElementOffset(),
          getMaxElement('bottom', getAllElements())
        )
      },

      taggedElement: function getTaggedElementsHeight() {
        return getTaggedElements('bottom', 'data-iframe-height')
      }
    },
    getWidth = {
      bodyScroll: function getBodyScrollWidth() {
        return document.body.scrollWidth
      },

      bodyOffset: function getBodyOffsetWidth() {
        return document.body.offsetWidth
      },

      custom: function getCustomWidth() {
        return customCalcMethods.width()
      },

      documentElementScroll: function getDEScrollWidth() {
        return document.documentElement.scrollWidth
      },

      documentElementOffset: function getDEOffsetWidth() {
        return document.documentElement.offsetWidth
      },

      scroll: function getMaxWidth() {
        return Math.max(getWidth.bodyScroll(), getWidth.documentElementScroll())
      },

      max: function getMaxWidth() {
        return Math.max.apply(null, getAllMeasurements(getWidth))
      },

      min: function getMinWidth() {
        return Math.min.apply(null, getAllMeasurements(getWidth))
      },

      rightMostElement: function rightMostElement() {
        return getMaxElement('right', getAllElements())
      },

      taggedElement: function getTaggedElementsWidth() {
        return getTaggedElements('right', 'data-iframe-width')
      }
    };

  function sizeIFrame(
    triggerEvent,
    triggerEventDesc,
    customHeight,
    customWidth
  ) {
    function resizeIFrame() {
      height = currentHeight;
      width = currentWidth;

      sendMsg(height, width, triggerEvent);
    }

    function isSizeChangeDetected() {
      function checkTolarance(a, b) {
        var retVal = Math.abs(a - b) <= tolerance;
        return !retVal
      }

      currentHeight =
        undefined$1 !== customHeight ? customHeight : getHeight[heightCalcMode]();
      currentWidth =
        undefined$1 !== customWidth ? customWidth : getWidth[widthCalcMode]();

      return (
        checkTolarance(height, currentHeight) ||
        (calculateWidth && checkTolarance(width, currentWidth))
      )
    }

    function isForceResizableEvent() {
      return !(triggerEvent in { init: 1, interval: 1, size: 1 })
    }

    function isForceResizableCalcMode() {
      return (
        heightCalcMode in resetRequiredMethods ||
        (calculateWidth && widthCalcMode in resetRequiredMethods)
      )
    }

    function logIgnored() {
      log('No change in size detected');
    }

    function checkDownSizing() {
      if (isForceResizableEvent() && isForceResizableCalcMode()) {
        resetIFrame(triggerEventDesc);
      } else if (!(triggerEvent in { interval: 1 })) {
        logIgnored();
      }
    }

    var currentHeight, currentWidth;

    if (isSizeChangeDetected() || 'init' === triggerEvent) {
      lockTrigger();
      resizeIFrame();
    } else {
      checkDownSizing();
    }
  }

  var sizeIFrameThrottled = throttle(sizeIFrame);

  function sendSize(triggerEvent, triggerEventDesc, customHeight, customWidth) {
    function recordTrigger() {
      if (!(triggerEvent in { reset: 1, resetPage: 1, init: 1 })) {
        log('Trigger event: ' + triggerEventDesc);
      }
    }

    function isDoubleFiredEvent() {
      return triggerLocked && triggerEvent in doubleEventList
    }

    if (!isDoubleFiredEvent()) {
      recordTrigger();
      if (triggerEvent === 'init') {
        sizeIFrame(triggerEvent, triggerEventDesc, customHeight, customWidth);
      } else {
        sizeIFrameThrottled(
          triggerEvent,
          triggerEventDesc,
          customHeight,
          customWidth
        );
      }
    } else {
      log('Trigger event cancelled: ' + triggerEvent);
    }
  }

  function lockTrigger() {
    if (!triggerLocked) {
      triggerLocked = true;
      log('Trigger event lock on');
    }
    clearTimeout(triggerLockedTimer);
    triggerLockedTimer = setTimeout(function() {
      triggerLocked = false;
      log('Trigger event lock off');
      log('--');
    }, eventCancelTimer);
  }

  function triggerReset(triggerEvent) {
    height = getHeight[heightCalcMode]();
    width = getWidth[widthCalcMode]();

    sendMsg(height, width, triggerEvent);
  }

  function resetIFrame(triggerEventDesc) {
    var hcm = heightCalcMode;
    heightCalcMode = heightCalcModeDefault;

    log('Reset trigger event: ' + triggerEventDesc);
    lockTrigger();
    triggerReset('reset');

    heightCalcMode = hcm;
  }

  function sendMsg(height, width, triggerEvent, msg, targetOrigin) {
    function setTargetOrigin() {
      if (undefined$1 === targetOrigin) {
        targetOrigin = targetOriginDefault;
      } else {
        log('Message targetOrigin: ' + targetOrigin);
      }
    }

    function sendToParent() {
      var size = height + ':' + width,
        message =
          myID +
          ':' +
          size +
          ':' +
          triggerEvent +
          (undefined$1 !== msg ? ':' + msg : '');

      log('Sending message to host page (' + message + ')');
      target.postMessage(msgID + message, targetOrigin);
    }

    if (true === sendPermit) {
      setTargetOrigin();
      sendToParent();
    }
  }

  function receiver(event) {
    var processRequestFromParent = {
      init: function initFromParent() {
        initMsg = event.data;
        target = event.source;

        init();
        firstRun = false;
        setTimeout(function() {
          initLock = false;
        }, eventCancelTimer);
      },

      reset: function resetFromParent() {
        if (!initLock) {
          log('Page size reset by host page');
          triggerReset('resetPage');
        } else {
          log('Page reset ignored by init');
        }
      },

      resize: function resizeFromParent() {
        sendSize('resizeParent', 'Parent window requested size check');
      },

      moveToAnchor: function moveToAnchorF() {
        inPageLinks.findTarget(getData());
      },
      inPageLink: function inPageLinkF() {
        this.moveToAnchor();
      }, // Backward compatability

      pageInfo: function pageInfoFromParent() {
        var msgBody = getData();
        log('PageInfoFromParent called from parent: ' + msgBody);
        onPageInfo(JSON.parse(msgBody));
        log(' --');
      },

      message: function messageFromParent() {
        var msgBody = getData();

        log('onMessage called from parent: ' + msgBody);
        // eslint-disable-next-line sonarjs/no-extra-arguments
        onMessage(JSON.parse(msgBody));
        log(' --');
      }
    };

    function isMessageForUs() {
      return msgID === ('' + event.data).substr(0, msgIdLen) // ''+ Protects against non-string messages
    }

    function getMessageType() {
      return event.data.split(']')[1].split(':')[0]
    }

    function getData() {
      return event.data.substr(event.data.indexOf(':') + 1)
    }

    function isMiddleTier() {
      return (
        (!( module.exports) &&
          'iFrameResize' in window) ||
        ('jQuery' in window && 'iFrameResize' in window.jQuery.prototype)
      )
    }

    function isInitMsg() {
      // Test if this message is from a child below us. This is an ugly test, however, updating
      // the message format would break backwards compatibity.
      return event.data.split(':')[2] in { true: 1, false: 1 }
    }

    function callFromParent() {
      var messageType = getMessageType();

      if (messageType in processRequestFromParent) {
        processRequestFromParent[messageType]();
      } else if (!isMiddleTier() && !isInitMsg()) {
        warn('Unexpected message (' + event.data + ')');
      }
    }

    function processMessage() {
      if (false === firstRun) {
        callFromParent();
      } else if (isInitMsg()) {
        processRequestFromParent.init();
      } else {
        log(
          'Ignored message of type "' +
            getMessageType() +
            '". Received before initialization.'
        );
      }
    }

    if (isMessageForUs()) {
      processMessage();
    }
  }

  // Normally the parent kicks things off when it detects the iFrame has loaded.
  // If this script is async-loaded, then tell parent page to retry init.
  function chkLateLoaded() {
    if ('loading' !== document.readyState) {
      window.parent.postMessage('[iFrameResizerChild]Ready', '*');
    }
  }

  addEventListener(window, 'message', receiver);
  addEventListener(window, 'readystatechange', chkLateLoaded);
  chkLateLoaded();

  
})();
});

var iframeResizer$1 = iframeResizer;
var iframeResizerContentWindow = iframeResizer_contentWindow;

var js = {
	iframeResizer: iframeResizer$1,
	iframeResizerContentWindow: iframeResizerContentWindow
};

var iframeResizer$2 = js;

const CrdsSubscribe = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.modalIsShowing = false;
        this.handleSubscribeClick = () => {
            this.modalIsShowing = true;
        };
        this.handleModalClose = () => {
            this.modalIsShowing = false;
        };
    }
    componentDidUpdate() {
        iframeResizer$2.iframeResizer({}, this.frame);
    }
    render() {
        return (h(Fragment, null, h("div", { class: "subscribe-script" }), h("button", { onClick: this.handleSubscribeClick, class: "subscribe-button" }, this.label), h("crds-modal", { label: this.label, isActive: this.modalIsShowing, onModalClose: this.handleModalClose }, h("iframe", { ref: el => (this.frame = el), src: this.src, class: "subscribe-frame", frameborder: "0" }))));
    }
    static get style() { return ".subscribe-button{background-color:transparent;border:0;color:#0095d9;cursor:pointer;display:inline-block;font:inherit;font-weight:600;line-height:normal;margin:0;padding:11px 15px}.subscribe-button:focus{border:0;outline:none}.subscribe-frame{border:none;height:100%;width:100%}"; }
};

class SimpleNavHelper {
    constructor(signOutCB) {
        this.handleSignOut = signOutCB;
    }
    renderNav(data, menuTitle) {
        return (h("div", null,
            this.formatMenuTitle(menuTitle),
            this.maybeRenderNavEntries(data.children)));
    }
    ;
    formatMenuTitle(title) {
        return h("h2", null, title);
    }
    formatMenuEntry(element) {
        return (h("div", { style: { padding: '0' } }, element));
    }
    formatSubHeader(header) {
        return h("h4", null, header);
    }
    formatList(listElements) {
        return (h("ul", null, listElements));
    }
    handleOnClick(event, automationId) {
        const isSignOutLink = automationId === 'sh-sign-out';
        if (isSignOutLink) {
            this.handleSignOut(event);
            event.preventDefault();
        }
        //navigates by default
        event.stopPropagation();
    }
    formatListEntry(data, classValue) {
        return (h("li", { class: classValue },
            h("a", { href: data.href || "#", "data-automation-id": data['automation-id'], onClick: (event) => this.handleOnClick(event, data['automation-id']), innerHTML: data.title })));
    }
    maybeRenderNavEntries(data) {
        if (!Array.isArray(data))
            return;
        let isTopLevelClass = true;
        const menuElements = data.map(child => {
            let isSubHeader = typeof child === 'string';
            let element = isSubHeader ? this.formatSubHeader(child) : this.maybeRenderList(child, isTopLevelClass);
            isTopLevelClass = !isSubHeader; //Toggle if next rendered element should be top-level
            return this.formatMenuEntry(element);
        });
        return menuElements.length > 0 && menuElements;
    }
    maybeRenderList(data, isTopLevel) {
        if (!Array.isArray(data))
            return;
        const listElements = data.map(child => this.maybeRenderListEntry(child, isTopLevel)).filter(entry => entry);
        return listElements.length > 0 && this.formatList(listElements);
    }
    maybeRenderListEntry(data, isTopLevel) {
        return this.isObjectTruthyNonArray(data) &&
            this.formatListEntry(data, this.topLevelClassValue(data, isTopLevel));
    }
    topLevelClassValue(data, isTopLevel) {
        const topLevel = typeof data.top_level === 'boolean' ?
            data.top_level : isTopLevel;
        return topLevel ? 'top-level' : '';
    }
    //TODO this may be valuable as a Util function
    isObjectTruthyNonArray(maybeObject) {
        return maybeObject && typeof maybeObject === 'object' && !Array.isArray(maybeObject);
    }
}

const GiveMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isNavShowing = true;
        this.data = {};
        this.simpleNav = new SimpleNavHelper();
    }
    navTitle() {
        return (this.data && this.data.title) || '';
    }
    backgroundImageURL(data) {
        return data.background_img || '';
    }
    render() {
        if (!this.isNavShowing || !this.simpleNav.isObjectTruthyNonArray(this.data))
            return null;
        return (h("div", { class: "give-nav", style: { backgroundImage: `url(${this.backgroundImageURL(this.data)})` } }, this.simpleNav.renderNav(this.data, this.navTitle())));
    }
    static get style() { return ".give-nav,.profile-nav{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;color:#fff;background-color:#000;background-repeat:no-repeat;background-size:100%;height:100vh;left:0;margin-left:-15px;max-height:100vh;overflow-y:scroll;position:-webkit-sticky;position:sticky;top:48px;width:100vw;z-index:2}.give-nav div,.profile-nav div{height:auto;padding:30px 20px 90px}.give-nav a,.profile-nav a{color:#fff;display:inline-block;font-size:19px;margin-bottom:10px;padding-left:10px;text-decoration:none;text-transform:capitalize}.give-nav a.all,.profile-nav a.all{margin-bottom:30px}.give-nav a:hover,.profile-nav a:hover{color:#ccc}.give-nav h2,.profile-nav h2{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;font-size:48px;line-height:48px;margin:0;text-transform:uppercase;margin-bottom:20px}.give-nav h4,.profile-nav h4{font-size:11px;margin:0 0 10px;opacity:.5;text-transform:uppercase}.give-nav ul,.profile-nav ul{padding-left:0;margin-top:0}.give-nav ul li,.profile-nav ul li{list-style:none}.give-nav ul li.top-level a,.profile-nav ul li.top-level a{padding-left:0}\@media (min-width:992px){.give-nav,.profile-nav{height:auto;left:auto;margin-right:-15px;position:absolute;right:15px;width:375px}}\@media (min-width:1170px){.give-nav,.profile-nav{margin-right:0}}.give-nav::-webkit-scrollbar,.profile-nav::-webkit-scrollbar{width:0}.give-nav ul:last-of-type,.profile-nav ul:last-of-type{padding-bottom:30px}.give-nav{background-image:url(https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress)}.profile-nav:after{background-color:rgba(0,0,0,.75);content:\" \";z-index:-1}.profile-nav .profile-nav-img,.profile-nav:after{height:100%;left:0;position:absolute;top:0;width:100%}.profile-nav .profile-nav-img{background-position:top;background-repeat:no-repeat;background-size:100% auto;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-filter:blur(2px);filter:blur(2px);z-index:-2}\@media (min-width:992px){.profile-nav div{padding-bottom:0}}"; }
};

function isFunction$1(x) {
    return typeof x === 'function';
}

let _enable_super_gross_mode_that_will_cause_bad_things = false;
const config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
            const error = new Error();
            console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
        }
        else if (_enable_super_gross_mode_that_will_cause_bad_things) {
            console.log('RxJS: Back to a better error behavior. Thank you. <3');
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
    },
};

function hostReportError(err) {
    setTimeout(() => { throw err; }, 0);
}

const empty = {
    closed: true,
    next(value) { },
    error(err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
            throw err;
        }
        else {
            hostReportError(err);
        }
    },
    complete() { }
};

const isArray$3 = Array.isArray || ((x) => x && typeof x.length === 'number');

function isObject$2(x) {
    return x !== null && typeof x === 'object';
}

function UnsubscriptionErrorImpl(errors) {
    Error.call(this);
    this.message = errors ?
        `${errors.length} errors occurred during unsubscription:
${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join('\n  ')}` : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
    return this;
}
UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
const UnsubscriptionError = UnsubscriptionErrorImpl;

class Subscription {
    constructor(unsubscribe) {
        this.closed = false;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    unsubscribe() {
        let errors;
        if (this.closed) {
            return;
        }
        let { _parentOrParents, _unsubscribe, _subscriptions } = this;
        this.closed = true;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (_parentOrParents instanceof Subscription) {
            _parentOrParents.remove(this);
        }
        else if (_parentOrParents !== null) {
            for (let index = 0; index < _parentOrParents.length; ++index) {
                const parent = _parentOrParents[index];
                parent.remove(this);
            }
        }
        if (isFunction$1(_unsubscribe)) {
            try {
                _unsubscribe.call(this);
            }
            catch (e) {
                errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
            }
        }
        if (isArray$3(_subscriptions)) {
            let index = -1;
            let len = _subscriptions.length;
            while (++index < len) {
                const sub = _subscriptions[index];
                if (isObject$2(sub)) {
                    try {
                        sub.unsubscribe();
                    }
                    catch (e) {
                        errors = errors || [];
                        if (e instanceof UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                        }
                        else {
                            errors.push(e);
                        }
                    }
                }
            }
        }
        if (errors) {
            throw new UnsubscriptionError(errors);
        }
    }
    add(teardown) {
        let subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (!(subscription instanceof Subscription)) {
                    const tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default: {
                if (!teardown) {
                    return Subscription.EMPTY;
                }
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
            }
        }
        let { _parentOrParents } = subscription;
        if (_parentOrParents === null) {
            subscription._parentOrParents = this;
        }
        else if (_parentOrParents instanceof Subscription) {
            if (_parentOrParents === this) {
                return subscription;
            }
            subscription._parentOrParents = [_parentOrParents, this];
        }
        else if (_parentOrParents.indexOf(this) === -1) {
            _parentOrParents.push(this);
        }
        else {
            return subscription;
        }
        const subscriptions = this._subscriptions;
        if (subscriptions === null) {
            this._subscriptions = [subscription];
        }
        else {
            subscriptions.push(subscription);
        }
        return subscription;
    }
    remove(subscription) {
        const subscriptions = this._subscriptions;
        if (subscriptions) {
            const subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    }
}
Subscription.EMPTY = (function (empty) {
    empty.closed = true;
    return empty;
}(new Subscription()));
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce((errs, err) => errs.concat((err instanceof UnsubscriptionError) ? err.errors : err), []);
}

const rxSubscriber = typeof Symbol === 'function'
    ? Symbol('rxSubscriber')
    : '@@rxSubscriber_' + Math.random();

class Subscriber extends Subscription {
    constructor(destinationOrNext, error, complete) {
        super();
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        this.destination = destinationOrNext;
                        destinationOrNext.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    [rxSubscriber]() { return this; }
    static create(next, error, complete) {
        const subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    }
    next(value) {
        if (!this.isStopped) {
            this._next(value);
        }
    }
    error(err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    }
    complete() {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    }
    unsubscribe() {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        super.unsubscribe();
    }
    _next(value) {
        this.destination.next(value);
    }
    _error(err) {
        this.destination.error(err);
        this.unsubscribe();
    }
    _complete() {
        this.destination.complete();
        this.unsubscribe();
    }
    _unsubscribeAndRecycle() {
        const { _parentOrParents } = this;
        this._parentOrParents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parentOrParents = _parentOrParents;
        return this;
    }
}
class SafeSubscriber extends Subscriber {
    constructor(_parentSubscriber, observerOrNext, error, complete) {
        super();
        this._parentSubscriber = _parentSubscriber;
        let next;
        let context = this;
        if (isFunction$1(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== empty) {
                context = Object.create(observerOrNext);
                if (isFunction$1(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    next(value) {
        if (!this.isStopped && this._next) {
            const { _parentSubscriber } = this;
            if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    }
    error(err) {
        if (!this.isStopped) {
            const { _parentSubscriber } = this;
            const { useDeprecatedSynchronousErrorHandling } = config;
            if (this._error) {
                if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                if (useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                hostReportError(err);
            }
            else {
                if (useDeprecatedSynchronousErrorHandling) {
                    _parentSubscriber.syncErrorValue = err;
                    _parentSubscriber.syncErrorThrown = true;
                }
                else {
                    hostReportError(err);
                }
                this.unsubscribe();
            }
        }
    }
    complete() {
        if (!this.isStopped) {
            const { _parentSubscriber } = this;
            if (this._complete) {
                const wrappedComplete = () => this._complete.call(this._context);
                if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    }
    __tryOrUnsub(fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            if (config.useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                hostReportError(err);
            }
        }
    }
    __tryOrSetError(parent, fn, value) {
        if (!config.useDeprecatedSynchronousErrorHandling) {
            throw new Error('bad call');
        }
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            }
            else {
                hostReportError(err);
                return true;
            }
        }
        return false;
    }
    _unsubscribe() {
        const { _parentSubscriber } = this;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    }
}

function canReportError(observer) {
    while (observer) {
        const { closed, destination, isStopped } = observer;
        if (closed || isStopped) {
            return false;
        }
        else if (destination && destination instanceof Subscriber) {
            observer = destination;
        }
        else {
            observer = null;
        }
    }
    return true;
}

function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber]) {
            return nextOrObserver[rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber(empty);
    }
    return new Subscriber(nextOrObserver, error, complete);
}

const observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';

function noop() { }

function pipeFromArray(fns) {
    if (!fns) {
        return noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce((prev, fn) => fn(prev), input);
    };
}

class Observable {
    constructor(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    lift(operator) {
        const observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    }
    subscribe(observerOrNext, error, complete) {
        const { operator } = this;
        const sink = toSubscriber(observerOrNext, error, complete);
        if (operator) {
            sink.add(operator.call(sink, this.source));
        }
        else {
            sink.add(this.source || (config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                this._subscribe(sink) :
                this._trySubscribe(sink));
        }
        if (config.useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
        }
        return sink;
    }
    _trySubscribe(sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                sink.syncErrorThrown = true;
                sink.syncErrorValue = err;
            }
            if (canReportError(sink)) {
                sink.error(err);
            }
            else {
                console.warn(err);
            }
        }
    }
    forEach(next, promiseCtor) {
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor((resolve, reject) => {
            let subscription;
            subscription = this.subscribe((value) => {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            }, reject, resolve);
        });
    }
    _subscribe(subscriber) {
        const { source } = this;
        return source && source.subscribe(subscriber);
    }
    [observable]() {
        return this;
    }
    pipe(...operations) {
        if (operations.length === 0) {
            return this;
        }
        return pipeFromArray(operations)(this);
    }
    toPromise(promiseCtor) {
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor((resolve, reject) => {
            let value;
            this.subscribe((x) => value = x, (err) => reject(err), () => resolve(value));
        });
    }
}
Observable.create = (subscribe) => {
    return new Observable(subscribe);
};
function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor =  Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}

function ObjectUnsubscribedErrorImpl() {
    Error.call(this);
    this.message = 'object unsubscribed';
    this.name = 'ObjectUnsubscribedError';
    return this;
}
ObjectUnsubscribedErrorImpl.prototype = Object.create(Error.prototype);
const ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

class SubjectSubscription extends Subscription {
    constructor(subject, subscriber) {
        super();
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    unsubscribe() {
        if (this.closed) {
            return;
        }
        this.closed = true;
        const subject = this.subject;
        const observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        const subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    }
}

class SubjectSubscriber extends Subscriber {
    constructor(destination) {
        super(destination);
        this.destination = destination;
    }
}
class Subject extends Observable {
    constructor() {
        super();
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    [rxSubscriber]() {
        return new SubjectSubscriber(this);
    }
    lift(operator) {
        const subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    }
    next(value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            const { observers } = this;
            const len = observers.length;
            const copy = observers.slice();
            for (let i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    }
    error(err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        const { observers } = this;
        const len = observers.length;
        const copy = observers.slice();
        for (let i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    }
    complete() {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.isStopped = true;
        const { observers } = this;
        const len = observers.length;
        const copy = observers.slice();
        for (let i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    }
    unsubscribe() {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    }
    _trySubscribe(subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else {
            return super._trySubscribe(subscriber);
        }
    }
    _subscribe(subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription(this, subscriber);
        }
    }
    asObservable() {
        const observable = new Observable();
        observable.source = this;
        return observable;
    }
}
Subject.create = (destination, source) => {
    return new AnonymousSubject(destination, source);
};
class AnonymousSubject extends Subject {
    constructor(destination, source) {
        super();
        this.destination = destination;
        this.source = source;
    }
    next(value) {
        const { destination } = this;
        if (destination && destination.next) {
            destination.next(value);
        }
    }
    error(err) {
        const { destination } = this;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    }
    complete() {
        const { destination } = this;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    }
    _subscribe(subscriber) {
        const { source } = this;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription.EMPTY;
        }
    }
}

class BehaviorSubject extends Subject {
    constructor(_value) {
        super();
        this._value = _value;
    }
    get value() {
        return this.getValue();
    }
    _subscribe(subscriber) {
        const subscription = super._subscribe(subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    }
    getValue() {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else {
            return this._value;
        }
    }
    next(value) {
        super.next(this._value = value);
    }
}

const EMPTY = new Observable(subscriber => subscriber.complete());
function empty$1(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
    return new Observable(subscriber => scheduler.schedule(() => subscriber.complete()));
}

function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}

const subscribeToArray = (array) => (subscriber) => {
    for (let i = 0, len = array.length; i < len && !subscriber.closed; i++) {
        subscriber.next(array[i]);
    }
    subscriber.complete();
};

function scheduleArray(input, scheduler) {
    return new Observable(subscriber => {
        const sub = new Subscription();
        let i = 0;
        sub.add(scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
                return;
            }
            subscriber.next(input[i++]);
            if (!subscriber.closed) {
                sub.add(this.schedule());
            }
        }));
        return sub;
    });
}

function fromArray(input, scheduler) {
    if (!scheduler) {
        return new Observable(subscribeToArray(input));
    }
    else {
        return scheduleArray(input, scheduler);
    }
}

function of(...args) {
    let scheduler = args[args.length - 1];
    if (isScheduler(scheduler)) {
        args.pop();
        return scheduleArray(args, scheduler);
    }
    else {
        return fromArray(args);
    }
}

function identity(x) {
    return x;
}

function isObservable(obj) {
    return !!obj && (obj instanceof Observable || (typeof obj.lift === 'function' && typeof obj.subscribe === 'function'));
}

function ArgumentOutOfRangeErrorImpl() {
    Error.call(this);
    this.message = 'argument out of range';
    this.name = 'ArgumentOutOfRangeError';
    return this;
}
ArgumentOutOfRangeErrorImpl.prototype = Object.create(Error.prototype);
const ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;

function EmptyErrorImpl() {
    Error.call(this);
    this.message = 'no elements in sequence';
    this.name = 'EmptyError';
    return this;
}
EmptyErrorImpl.prototype = Object.create(Error.prototype);
const EmptyError = EmptyErrorImpl;

function map$2(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
class MapOperator {
    constructor(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    call(subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    }
}
class MapSubscriber extends Subscriber {
    constructor(destination, project, thisArg) {
        super(destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    _next(value) {
        let result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    }
}

class OuterSubscriber extends Subscriber {
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    }
    notifyError(error, innerSub) {
        this.destination.error(error);
    }
    notifyComplete(innerSub) {
        this.destination.complete();
    }
}

class InnerSubscriber extends Subscriber {
    constructor(parent, outerValue, outerIndex) {
        super();
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    _next(value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    }
    _error(error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    }
    _complete() {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    }
}

const subscribeToPromise = (promise) => (subscriber) => {
    promise.then((value) => {
        if (!subscriber.closed) {
            subscriber.next(value);
            subscriber.complete();
        }
    }, (err) => subscriber.error(err))
        .then(null, hostReportError);
    return subscriber;
};

function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
const iterator = getSymbolIterator();

const subscribeToIterable = (iterable) => (subscriber) => {
    const iterator$1 = iterable[iterator]();
    do {
        const item = iterator$1.next();
        if (item.done) {
            subscriber.complete();
            break;
        }
        subscriber.next(item.value);
        if (subscriber.closed) {
            break;
        }
    } while (true);
    if (typeof iterator$1.return === 'function') {
        subscriber.add(() => {
            if (iterator$1.return) {
                iterator$1.return();
            }
        });
    }
    return subscriber;
};

const subscribeToObservable = (obj) => (subscriber) => {
    const obs = obj[observable]();
    if (typeof obs.subscribe !== 'function') {
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    }
    else {
        return obs.subscribe(subscriber);
    }
};

const isArrayLike = ((x) => x && typeof x.length === 'number' && typeof x !== 'function');

function isPromise(value) {
    return !!value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}

const subscribeTo = (result) => {
    if (!!result && typeof result[observable] === 'function') {
        return subscribeToObservable(result);
    }
    else if (isArrayLike(result)) {
        return subscribeToArray(result);
    }
    else if (isPromise(result)) {
        return subscribeToPromise(result);
    }
    else if (!!result && typeof result[iterator] === 'function') {
        return subscribeToIterable(result);
    }
    else {
        const value = isObject$2(result) ? 'an invalid object' : `'${result}'`;
        const msg = `You provided ${value} where a stream was expected.`
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
    }
};

function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex)) {
    if (destination.closed) {
        return undefined;
    }
    if (result instanceof Observable) {
        return result.subscribe(destination);
    }
    return subscribeTo(result)(destination);
}

function scheduleObservable(input, scheduler) {
    return new Observable(subscriber => {
        const sub = new Subscription();
        sub.add(scheduler.schedule(() => {
            const observable$1 = input[observable]();
            sub.add(observable$1.subscribe({
                next(value) { sub.add(scheduler.schedule(() => subscriber.next(value))); },
                error(err) { sub.add(scheduler.schedule(() => subscriber.error(err))); },
                complete() { sub.add(scheduler.schedule(() => subscriber.complete())); },
            }));
        }));
        return sub;
    });
}

function schedulePromise(input, scheduler) {
    return new Observable(subscriber => {
        const sub = new Subscription();
        sub.add(scheduler.schedule(() => input.then(value => {
            sub.add(scheduler.schedule(() => {
                subscriber.next(value);
                sub.add(scheduler.schedule(() => subscriber.complete()));
            }));
        }, err => {
            sub.add(scheduler.schedule(() => subscriber.error(err)));
        })));
        return sub;
    });
}

function scheduleIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable(subscriber => {
        const sub = new Subscription();
        let iterator$1;
        sub.add(() => {
            if (iterator$1 && typeof iterator$1.return === 'function') {
                iterator$1.return();
            }
        });
        sub.add(scheduler.schedule(() => {
            iterator$1 = input[iterator]();
            sub.add(scheduler.schedule(function () {
                if (subscriber.closed) {
                    return;
                }
                let value;
                let done;
                try {
                    const result = iterator$1.next();
                    value = result.value;
                    done = result.done;
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                    this.schedule();
                }
            }));
        }));
        return sub;
    });
}

function isInteropObservable(input) {
    return input && typeof input[observable] === 'function';
}

function isIterable(input) {
    return input && typeof input[iterator] === 'function';
}

function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable(input)) {
            return scheduleObservable(input, scheduler);
        }
        else if (isPromise(input)) {
            return schedulePromise(input, scheduler);
        }
        else if (isArrayLike(input)) {
            return scheduleArray(input, scheduler);
        }
        else if (isIterable(input) || typeof input === 'string') {
            return scheduleIterable(input, scheduler);
        }
    }
    throw new TypeError((input !== null && typeof input || input) + ' is not observable');
}

function from$1(input, scheduler) {
    if (!scheduler) {
        if (input instanceof Observable) {
            return input;
        }
        return new Observable(subscribeTo(input));
    }
    else {
        return scheduled(input, scheduler);
    }
}

function forkJoin(...sources) {
    if (sources.length === 1) {
        const first = sources[0];
        if (isArray$3(first)) {
            return forkJoinInternal(first, null);
        }
        if (isObject$2(first) && !isObservable(first)) {
            const keys = Object.keys(first);
            return forkJoinInternal(keys.map(key => first[key]), keys);
        }
    }
    if (typeof sources[sources.length - 1] === 'function') {
        const resultSelector = sources.pop();
        sources = (sources.length === 1 && isArray$3(sources[0])) ? sources[0] : sources;
        return forkJoinInternal(sources, null).pipe(map$2((args) => resultSelector(...args)));
    }
    return forkJoinInternal(sources, null);
}
function forkJoinInternal(sources, keys) {
    return new Observable(subscriber => {
        const len = sources.length;
        if (len === 0) {
            subscriber.complete();
            return;
        }
        const values = new Array(len);
        let completed = 0;
        let emitted = 0;
        for (let i = 0; i < len; i++) {
            const source = from$1(sources[i]);
            let hasValue = false;
            subscriber.add(source.subscribe({
                next: value => {
                    if (!hasValue) {
                        hasValue = true;
                        emitted++;
                    }
                    values[i] = value;
                },
                error: err => subscriber.error(err),
                complete: () => {
                    completed++;
                    if (completed === len || !hasValue) {
                        if (emitted === len) {
                            subscriber.next(keys ?
                                keys.reduce((result, key, i) => (result[key] = values[i], result), {}) :
                                values);
                        }
                        subscriber.complete();
                    }
                }
            }));
        }
    });
}

function filter(predicate, thisArg) {
    return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
    };
}
class FilterOperator {
    constructor(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    call(subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    }
}
class FilterSubscriber extends Subscriber {
    constructor(destination, predicate, thisArg) {
        super(destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
    }
    _next(value) {
        let result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    }
}

var CrdsAuthenticationProviders;
(function (CrdsAuthenticationProviders) {
    CrdsAuthenticationProviders[CrdsAuthenticationProviders["Mp"] = 1] = "Mp";
    CrdsAuthenticationProviders[CrdsAuthenticationProviders["Okta"] = 2] = "Okta";
})(CrdsAuthenticationProviders || (CrdsAuthenticationProviders = {}));

function catchError(selector) {
    return function catchErrorOperatorFunction(source) {
        const operator = new CatchOperator(selector);
        const caught = source.lift(operator);
        return (operator.caught = caught);
    };
}
class CatchOperator {
    constructor(selector) {
        this.selector = selector;
    }
    call(subscriber, source) {
        return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
    }
}
class CatchSubscriber extends OuterSubscriber {
    constructor(destination, selector, caught) {
        super(destination);
        this.selector = selector;
        this.caught = caught;
    }
    error(err) {
        if (!this.isStopped) {
            let result;
            try {
                result = this.selector(err, this.caught);
            }
            catch (err2) {
                super.error(err2);
                return;
            }
            this._unsubscribeAndRecycle();
            const innerSubscriber = new InnerSubscriber(this, undefined, undefined);
            this.add(innerSubscriber);
            subscribeToResult(this, result, undefined, undefined, innerSubscriber);
        }
    }
}

function defaultIfEmpty(defaultValue = null) {
    return (source) => source.lift(new DefaultIfEmptyOperator(defaultValue));
}
class DefaultIfEmptyOperator {
    constructor(defaultValue) {
        this.defaultValue = defaultValue;
    }
    call(subscriber, source) {
        return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    }
}
class DefaultIfEmptySubscriber extends Subscriber {
    constructor(destination, defaultValue) {
        super(destination);
        this.defaultValue = defaultValue;
        this.isEmpty = true;
    }
    _next(value) {
        this.isEmpty = false;
        this.destination.next(value);
    }
    _complete() {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    }
}

function throwIfEmpty(errorFactory = defaultErrorFactory) {
    return (source) => {
        return source.lift(new ThrowIfEmptyOperator(errorFactory));
    };
}
class ThrowIfEmptyOperator {
    constructor(errorFactory) {
        this.errorFactory = errorFactory;
    }
    call(subscriber, source) {
        return source.subscribe(new ThrowIfEmptySubscriber(subscriber, this.errorFactory));
    }
}
class ThrowIfEmptySubscriber extends Subscriber {
    constructor(destination, errorFactory) {
        super(destination);
        this.errorFactory = errorFactory;
        this.hasValue = false;
    }
    _next(value) {
        this.hasValue = true;
        this.destination.next(value);
    }
    _complete() {
        if (!this.hasValue) {
            let err;
            try {
                err = this.errorFactory();
            }
            catch (e) {
                err = e;
            }
            this.destination.error(err);
        }
        else {
            return this.destination.complete();
        }
    }
}
function defaultErrorFactory() {
    return new EmptyError();
}

function take(count) {
    return (source) => {
        if (count === 0) {
            return empty$1();
        }
        else {
            return source.lift(new TakeOperator(count));
        }
    };
}
class TakeOperator {
    constructor(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError;
        }
    }
    call(subscriber, source) {
        return source.subscribe(new TakeSubscriber(subscriber, this.total));
    }
}
class TakeSubscriber extends Subscriber {
    constructor(destination, total) {
        super(destination);
        this.total = total;
        this.count = 0;
    }
    _next(value) {
        const total = this.total;
        const count = ++this.count;
        if (count <= total) {
            this.destination.next(value);
            if (count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    }
}

function first(predicate, defaultValue) {
    const hasDefaultValue = arguments.length >= 2;
    return (source) => source.pipe(predicate ? filter((v, i) => predicate(v, i, source)) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(() => new EmptyError()));
}

function switchMap(project, resultSelector) {
    if (typeof resultSelector === 'function') {
        return (source) => source.pipe(switchMap((a, i) => from$1(project(a, i)).pipe(map$2((b, ii) => resultSelector(a, b, i, ii)))));
    }
    return (source) => source.lift(new SwitchMapOperator(project));
}
class SwitchMapOperator {
    constructor(project) {
        this.project = project;
    }
    call(subscriber, source) {
        return source.subscribe(new SwitchMapSubscriber(subscriber, this.project));
    }
}
class SwitchMapSubscriber extends OuterSubscriber {
    constructor(destination, project) {
        super(destination);
        this.project = project;
        this.index = 0;
    }
    _next(value) {
        let result;
        const index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    }
    _innerSub(result, value, index) {
        const innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        const innerSubscriber = new InnerSubscriber(this, undefined, undefined);
        const destination = this.destination;
        destination.add(innerSubscriber);
        this.innerSubscription = subscribeToResult(this, result, value, index, innerSubscriber);
    }
    _complete() {
        const { innerSubscription } = this;
        if (!innerSubscription || innerSubscription.closed) {
            super._complete();
        }
        this.unsubscribe();
    }
    _unsubscribe() {
        this.innerSubscription = null;
    }
    notifyComplete(innerSub) {
        const destination = this.destination;
        destination.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            super._complete();
        }
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    }
}

function tap(nextOrObserver, error, complete) {
    return function tapOperatorFunction(source) {
        return source.lift(new DoOperator(nextOrObserver, error, complete));
    };
}
class DoOperator {
    constructor(nextOrObserver, error, complete) {
        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }
    call(subscriber, source) {
        return source.subscribe(new TapSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    }
}
class TapSubscriber extends Subscriber {
    constructor(destination, observerOrNext, error, complete) {
        super(destination);
        this._tapNext = noop;
        this._tapError = noop;
        this._tapComplete = noop;
        this._tapError = error || noop;
        this._tapComplete = complete || noop;
        if (isFunction$1(observerOrNext)) {
            this._context = this;
            this._tapNext = observerOrNext;
        }
        else if (observerOrNext) {
            this._context = observerOrNext;
            this._tapNext = observerOrNext.next || noop;
            this._tapError = observerOrNext.error || noop;
            this._tapComplete = observerOrNext.complete || noop;
        }
    }
    _next(value) {
        try {
            this._tapNext.call(this._context, value);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(value);
    }
    _error(err) {
        try {
            this._tapError.call(this._context, err);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.error(err);
    }
    _complete() {
        try {
            this._tapComplete.call(this._context);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        return this.destination.complete();
    }
}

class CrdsOktaTokens {
    constructor(accessToken = null, idToken = null) {
        this.provider = CrdsAuthenticationProviders.Okta;
        if (accessToken != null) {
            this.access_token = accessToken;
        }
        if (idToken != null) {
            this.id_token = idToken;
        }
    }
    static From(inc) {
        const { access_token, id_token } = inc;
        return new CrdsOktaTokens(access_token, id_token);
    }
}

class CrdsOktaService {
    constructor(okta, log) {
        this.log = log;
        this.oktaAuthClient = okta;
    }
    authenticated() {
        return this.getTokenDictionary().pipe(switchMap(tokens => {
            if (!!tokens) {
                return of(tokens);
            }
            else {
                return this.getTokensFromSession();
            }
        }));
    }
    signOut() {
        return from$1(this.oktaAuthClient.signOut()).pipe(first(), map$2(() => {
            this.oktaAuthClient.tokenManager.clear();
            this.log.Log('successfully logged out');
            return true;
        }), catchError(err => {
            this.log.Error('AUTHENTICATION SERICE: okta signout function returned error', err);
            return of(false);
        }));
    }
    subscribeToTokenExpiration(callback) {
        this.oktaAuthClient.tokenManager.on('expired', callback);
    }
    subscribeToTokenRenewed(callback) {
        this.oktaAuthClient.tokenManager.on('renewed', callback);
    }
    subscribeToTokenError(callback) {
        this.oktaAuthClient.tokenManager.on('error', callback);
    }
    getTokenDictionary() {
        const idToken$ = from$1(this.oktaAuthClient.tokenManager.get('id_token'));
        const accessToken$ = from$1(this.oktaAuthClient.tokenManager.get('access_token'));
        return forkJoin([idToken$, accessToken$]).pipe(first(), map$2(([id, access]) => {
            if (!!id && !!access) {
                return CrdsOktaTokens.From({ id_token: id, access_token: access });
            }
            else {
                return null;
            }
        }), catchError(err => {
            this.log.Error('AUTHENTICATION SERICE: okta tokenManager get function returned error', err);
            return of(null);
        }));
    }
    getTokensFromSession() {
        return from$1(this.oktaAuthClient.session.exists()).pipe(first(), switchMap(exists => {
            if (exists) {
                return from$1(this.oktaAuthClient.token.getWithoutPrompt({
                    scopes: ['openid', 'profile', 'email'],
                    responseType: ['id_token', 'token']
                })).pipe(first(), tap((tokens) => {
                    this.oktaAuthClient.tokenManager.add('id_token', tokens[0]);
                    this.oktaAuthClient.tokenManager.add('access_token', tokens[1]);
                }), map$2(tokens => {
                    return CrdsOktaTokens.From({
                        id_token: tokens[0],
                        access_token: tokens[1]
                    });
                }), catchError(err => {
                    this.log.Error('AUTHENTICATION SERICE: okta get without prompt function returned error', err);
                    return of(null);
                }));
            }
            else {
                return of(null);
            }
        }), catchError(err => {
            this.log.Error('AUTHENTICATION SERICE: okta session exists function returned error', err);
            return of(null);
        }));
    }
}

class CrdsMpTokens {
    constructor(accessToken = null, refreshToken = null) {
        this.provider = CrdsAuthenticationProviders.Mp;
        if (accessToken != null) {
            this.access_token = accessToken;
        }
        if (refreshToken != null) {
            this.refresh_token = refreshToken;
        }
    }
    static From(inc) {
        const { access_token, refresh_token } = inc;
        return new CrdsMpTokens(access_token, refresh_token);
    }
}

var js_cookie = createCommonjsModule(function (module, exports) {
(function (factory) {
	var registeredInModuleLoader;
	{
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));
});

var navigator$1 = {};
navigator$1.userAgent = false;

var window$1 = {};
/*
 * jsrsasign(all) 8.0.12 (2018-04-22) (c) 2010-2018 Kenji Urushima | kjur.github.com/jsrsasign/license
 */

/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
if(YAHOO===undefined){var YAHOO={};}YAHOO.lang={extend:function(g,h,f){if(!h||!g){throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.")}var d=function(){};d.prototype=h.prototype;g.prototype=new d();g.prototype.constructor=g;g.superclass=h.prototype;if(h.prototype.constructor==Object.prototype.constructor){h.prototype.constructor=h;}if(f){var b;for(b in f){g.prototype[b]=f[b];}var e=function(){},c=["toString","valueOf"];try{if(/MSIE/.test(navigator$1.userAgent)){e=function(j,i){for(b=0;b<c.length;b=b+1){var l=c[b],k=i[l];if(typeof k==="function"&&k!=Object.prototype[l]){j[l]=k;}}};}}catch(a){}e(g.prototype,f);}}};

/*! CryptoJS v3.1.2 core-fix.js
 * code.google.com/p/crypto-js
 * (c) 2009-2013 by Jeff Mott. All rights reserved.
 * code.google.com/p/crypto-js/wiki/License
 * THIS IS FIX of 'core.js' to fix Hmac issue.
 * https://code.google.com/p/crypto-js/issues/detail?id=84
 * https://crypto-js.googlecode.com/svn-history/r667/branches/3.x/src/core.js
 */
var CryptoJS=CryptoJS||(function(e,g){var a={};var b=a.lib={};var j=b.Base=(function(){function n(){}return {extend:function(p){n.prototype=this;var o=new n();if(p){o.mixIn(p);}if(!o.hasOwnProperty("init")){o.init=function(){o.$super.init.apply(this,arguments);};}o.init.prototype=o;o.$super=this;return o},create:function(){var o=this.extend();o.init.apply(o,arguments);return o},init:function(){},mixIn:function(p){for(var o in p){if(p.hasOwnProperty(o)){this[o]=p[o];}}if(p.hasOwnProperty("toString")){this.toString=p.toString;}},clone:function(){return this.init.prototype.extend(this)}}}());var l=b.WordArray=j.extend({init:function(o,n){o=this.words=o||[];if(n!=g){this.sigBytes=n;}else{this.sigBytes=o.length*4;}},toString:function(n){return (n||h).stringify(this)},concat:function(t){var q=this.words;var p=t.words;var n=this.sigBytes;var s=t.sigBytes;this.clamp();if(n%4){for(var r=0;r<s;r++){var o=(p[r>>>2]>>>(24-(r%4)*8))&255;q[(n+r)>>>2]|=o<<(24-((n+r)%4)*8);}}else{for(var r=0;r<s;r+=4){q[(n+r)>>>2]=p[r>>>2];}}this.sigBytes+=s;return this},clamp:function(){var o=this.words;var n=this.sigBytes;o[n>>>2]&=4294967295<<(32-(n%4)*8);o.length=e.ceil(n/4);},clone:function(){var n=j.clone.call(this);n.words=this.words.slice(0);return n},random:function(p){var o=[];for(var n=0;n<p;n+=4){o.push((e.random()*4294967296)|0);}return new l.init(o,p)}});var m=a.enc={};var h=m.Hex={stringify:function(p){var r=p.words;var o=p.sigBytes;var q=[];for(var n=0;n<o;n++){var s=(r[n>>>2]>>>(24-(n%4)*8))&255;q.push((s>>>4).toString(16));q.push((s&15).toString(16));}return q.join("")},parse:function(p){var n=p.length;var q=[];for(var o=0;o<n;o+=2){q[o>>>3]|=parseInt(p.substr(o,2),16)<<(24-(o%8)*4);}return new l.init(q,n/2)}};var d=m.Latin1={stringify:function(q){var r=q.words;var p=q.sigBytes;var n=[];for(var o=0;o<p;o++){var s=(r[o>>>2]>>>(24-(o%4)*8))&255;n.push(String.fromCharCode(s));}return n.join("")},parse:function(p){var n=p.length;var q=[];for(var o=0;o<n;o++){q[o>>>2]|=(p.charCodeAt(o)&255)<<(24-(o%4)*8);}return new l.init(q,n)}};var c=m.Utf8={stringify:function(n){try{return decodeURIComponent(escape(d.stringify(n)))}catch(o){throw new Error("Malformed UTF-8 data")}},parse:function(n){return d.parse(unescape(encodeURIComponent(n)))}};var i=b.BufferedBlockAlgorithm=j.extend({reset:function(){this._data=new l.init();this._nDataBytes=0;},_append:function(n){if(typeof n=="string"){n=c.parse(n);}this._data.concat(n);this._nDataBytes+=n.sigBytes;},_process:function(w){var q=this._data;var x=q.words;var n=q.sigBytes;var t=this.blockSize;var v=t*4;var u=n/v;if(w){u=e.ceil(u);}else{u=e.max((u|0)-this._minBufferSize,0);}var s=u*t;var r=e.min(s*4,n);if(s){for(var p=0;p<s;p+=t){this._doProcessBlock(x,p);}var o=x.splice(0,s);q.sigBytes-=r;}return new l.init(o,r)},clone:function(){var n=j.clone.call(this);n._data=this._data.clone();return n},_minBufferSize:0});var f=b.Hasher=i.extend({cfg:j.extend(),init:function(n){this.cfg=this.cfg.extend(n);this.reset();},reset:function(){i.reset.call(this);this._doReset();},update:function(n){this._append(n);this._process();return this},finalize:function(n){if(n){this._append(n);}var o=this._doFinalize();return o},blockSize:512/32,_createHelper:function(n){return function(p,o){return new n.init(o).finalize(p)}},_createHmacHelper:function(n){return function(p,o){return new k.HMAC.init(n,o).finalize(p)}}});var k=a.algo={};return a}(Math));
/*
CryptoJS v3.1.2 x64-core-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(g){var a=CryptoJS,f=a.lib,e=f.Base,h=f.WordArray,a=a.x64={};a.Word=e.extend({init:function(b,c){this.high=b;this.low=c;}});a.WordArray=e.extend({init:function(b,c){b=this.words=b||[];this.sigBytes=c!=g?c:8*b.length;},toX32:function(){for(var b=this.words,c=b.length,a=[],d=0;d<c;d++){var e=b[d];a.push(e.high);a.push(e.low);}return h.create(a,this.sigBytes)},clone:function(){for(var b=e.clone.call(this),c=b.words=this.words.slice(0),a=c.length,d=0;d<a;d++)c[d]=c[d].clone();return b}});})();

/*
CryptoJS v3.1.2 cipher-core.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
CryptoJS.lib.Cipher||function(u){var g=CryptoJS,f=g.lib,k=f.Base,l=f.WordArray,q=f.BufferedBlockAlgorithm,r=g.enc.Base64,v=g.algo.EvpKDF,n=f.Cipher=q.extend({cfg:k.extend(),createEncryptor:function(a,b){return this.create(this._ENC_XFORM_MODE,a,b)},createDecryptor:function(a,b){return this.create(this._DEC_XFORM_MODE,a,b)},init:function(a,b,c){this.cfg=this.cfg.extend(c);this._xformMode=a;this._key=b;this.reset();},reset:function(){q.reset.call(this);this._doReset();},process:function(a){this._append(a);
return this._process()},finalize:function(a){a&&this._append(a);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(a){return {encrypt:function(b,c,d){return ("string"==typeof c?s:j).encrypt(a,b,c,d)},decrypt:function(b,c,d){return ("string"==typeof c?s:j).decrypt(a,b,c,d)}}}});f.StreamCipher=n.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var m=g.mode={},t=function(a,b,c){var d=this._iv;d?this._iv=u:d=this._prevBlock;for(var e=
0;e<c;e++)a[b+e]^=d[e];},h=(f.BlockCipherMode=k.extend({createEncryptor:function(a,b){return this.Encryptor.create(a,b)},createDecryptor:function(a,b){return this.Decryptor.create(a,b)},init:function(a,b){this._cipher=a;this._iv=b;}})).extend();h.Encryptor=h.extend({processBlock:function(a,b){var c=this._cipher,d=c.blockSize;t.call(this,a,b,d);c.encryptBlock(a,b);this._prevBlock=a.slice(b,b+d);}});h.Decryptor=h.extend({processBlock:function(a,b){var c=this._cipher,d=c.blockSize,e=a.slice(b,b+d);c.decryptBlock(a,
b);t.call(this,a,b,d);this._prevBlock=e;}});m=m.CBC=h;h=(g.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,e=[],f=0;f<c;f+=4)e.push(d);c=l.create(e,c);a.concat(c);},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255;}};f.BlockCipher=n.extend({cfg:n.cfg.extend({mode:m,padding:h}),reset:function(){n.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;
this._mode=c.call(a,this,b&&b.words);},_doProcessBlock:function(a,b){this._mode.processBlock(a,b);},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0);}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var p=f.CipherParams=k.extend({init:function(a){this.mixIn(a);},toString:function(a){return (a||this.formatter).stringify(this)}}),m=(g.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;
return (a?l.create([1398893684,1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=l.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16;}return p.create({ciphertext:a,salt:c})}},j=f.SerializableCipher=k.extend({cfg:k.extend({format:m}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var e=a.createEncryptor(c,d);b=e.finalize(b);e=e.cfg;return p.create({ciphertext:b,key:c,iv:e.iv,algorithm:a,mode:e.mode,padding:e.padding,
blockSize:a.blockSize,formatter:d.format})},decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return "string"==typeof a?b.parse(a,this):a}}),g=(g.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=l.random(8));a=v.create({keySize:b+c}).compute(a,d);c=l.create(a.words.slice(b),4*c);a.sigBytes=4*b;return p.create({key:a,iv:c,salt:d})}},s=f.PasswordBasedCipher=j.extend({cfg:j.cfg.extend({kdf:g}),encrypt:function(a,
b,c,d){d=this.cfg.extend(d);c=d.kdf.execute(c,a.keySize,a.ivSize);d.iv=c.iv;a=j.encrypt.call(this,a,b,c.key,d);a.mixIn(c);return a},decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);c=d.kdf.execute(c,a.keySize,a.ivSize,b.salt);d.iv=c.iv;return j.decrypt.call(this,a,b,c.key,d)}});}();

/*
CryptoJS v3.1.2 aes.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){for(var q=CryptoJS,x=q.lib.BlockCipher,r=q.algo,j=[],y=[],z=[],A=[],B=[],C=[],s=[],u=[],v=[],w=[],g=[],k=0;256>k;k++)g[k]=128>k?k<<1:k<<1^283;for(var n=0,l=0,k=0;256>k;k++){var f=l^l<<1^l<<2^l<<3^l<<4,f=f>>>8^f&255^99;j[n]=f;y[f]=n;var t=g[n],D=g[t],E=g[D],b=257*g[f]^16843008*f;z[n]=b<<24|b>>>8;A[n]=b<<16|b>>>16;B[n]=b<<8|b>>>24;C[n]=b;b=16843009*E^65537*D^257*t^16843008*n;s[f]=b<<24|b>>>8;u[f]=b<<16|b>>>16;v[f]=b<<8|b>>>24;w[f]=b;n?(n=t^g[g[g[E^t]]],l^=g[g[l]]):n=l=1;}var F=[0,1,2,4,8,
16,32,64,128,27,54],r=r.AES=x.extend({_doReset:function(){for(var c=this._key,e=c.words,a=c.sigBytes/4,c=4*((this._nRounds=a+6)+1),b=this._keySchedule=[],h=0;h<c;h++)if(h<a)b[h]=e[h];else{var d=b[h-1];h%a?6<a&&4==h%a&&(d=j[d>>>24]<<24|j[d>>>16&255]<<16|j[d>>>8&255]<<8|j[d&255]):(d=d<<8|d>>>24,d=j[d>>>24]<<24|j[d>>>16&255]<<16|j[d>>>8&255]<<8|j[d&255],d^=F[h/a|0]<<24);b[h]=b[h-a]^d;}e=this._invKeySchedule=[];for(a=0;a<c;a++)h=c-a,d=a%4?b[h]:b[h-4],e[a]=4>a||4>=h?d:s[j[d>>>24]]^u[j[d>>>16&255]]^v[j[d>>>
8&255]]^w[j[d&255]];},encryptBlock:function(c,e){this._doCryptBlock(c,e,this._keySchedule,z,A,B,C,j);},decryptBlock:function(c,e){var a=c[e+1];c[e+1]=c[e+3];c[e+3]=a;this._doCryptBlock(c,e,this._invKeySchedule,s,u,v,w,y);a=c[e+1];c[e+1]=c[e+3];c[e+3]=a;},_doCryptBlock:function(c,e,a,b,h,d,j,m){for(var n=this._nRounds,f=c[e]^a[0],g=c[e+1]^a[1],k=c[e+2]^a[2],p=c[e+3]^a[3],l=4,t=1;t<n;t++)var q=b[f>>>24]^h[g>>>16&255]^d[k>>>8&255]^j[p&255]^a[l++],r=b[g>>>24]^h[k>>>16&255]^d[p>>>8&255]^j[f&255]^a[l++],s=
b[k>>>24]^h[p>>>16&255]^d[f>>>8&255]^j[g&255]^a[l++],p=b[p>>>24]^h[f>>>16&255]^d[g>>>8&255]^j[k&255]^a[l++],f=q,g=r,k=s;q=(m[f>>>24]<<24|m[g>>>16&255]<<16|m[k>>>8&255]<<8|m[p&255])^a[l++];r=(m[g>>>24]<<24|m[k>>>16&255]<<16|m[p>>>8&255]<<8|m[f&255])^a[l++];s=(m[k>>>24]<<24|m[p>>>16&255]<<16|m[f>>>8&255]<<8|m[g&255])^a[l++];p=(m[p>>>24]<<24|m[f>>>16&255]<<16|m[g>>>8&255]<<8|m[k&255])^a[l++];c[e]=q;c[e+1]=r;c[e+2]=s;c[e+3]=p;},keySize:8});q.AES=x._createHelper(r);})();

/*
CryptoJS v3.1.2 tripledes-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){function j(b,c){var a=(this._lBlock>>>b^this._rBlock)&c;this._rBlock^=a;this._lBlock^=a<<b;}function l(b,c){var a=(this._rBlock>>>b^this._lBlock)&c;this._lBlock^=a;this._rBlock^=a<<b;}var h=CryptoJS,e=h.lib,n=e.WordArray,e=e.BlockCipher,g=h.algo,q=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],p=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,
55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],r=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],s=[{"0":8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,
2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,
1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{"0":1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,
75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,
276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{"0":260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,
14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,
17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{"0":2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,
98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,
1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{"0":128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,
10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,
83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{"0":268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,
2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{"0":1048576,
16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,
496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{"0":134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,
2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,
2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],t=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],m=g.DES=e.extend({_doReset:function(){for(var b=this._key.words,c=[],a=0;56>a;a++){var f=q[a]-1;c[a]=b[f>>>5]>>>31-f%32&1;}b=this._subKeys=[];for(f=0;16>f;f++){for(var d=b[f]=[],e=r[f],a=0;24>a;a++)d[a/6|0]|=c[(p[a]-1+e)%28]<<31-a%6,d[4+(a/6|0)]|=c[28+(p[a+24]-1+e)%28]<<31-a%6;d[0]=d[0]<<1|d[0]>>>31;for(a=1;7>a;a++)d[a]>>>=
4*(a-1)+3;d[7]=d[7]<<5|d[7]>>>27;}c=this._invSubKeys=[];for(a=0;16>a;a++)c[a]=b[15-a];},encryptBlock:function(b,c){this._doCryptBlock(b,c,this._subKeys);},decryptBlock:function(b,c){this._doCryptBlock(b,c,this._invSubKeys);},_doCryptBlock:function(b,c,a){this._lBlock=b[c];this._rBlock=b[c+1];j.call(this,4,252645135);j.call(this,16,65535);l.call(this,2,858993459);l.call(this,8,16711935);j.call(this,1,1431655765);for(var f=0;16>f;f++){for(var d=a[f],e=this._lBlock,h=this._rBlock,g=0,k=0;8>k;k++)g|=s[k][((h^
d[k])&t[k])>>>0];this._lBlock=h;this._rBlock=e^g;}a=this._lBlock;this._lBlock=this._rBlock;this._rBlock=a;j.call(this,1,1431655765);l.call(this,8,16711935);l.call(this,2,858993459);j.call(this,16,65535);j.call(this,4,252645135);b[c]=this._lBlock;b[c+1]=this._rBlock;},keySize:2,ivSize:2,blockSize:2});h.DES=e._createHelper(m);g=g.TripleDES=e.extend({_doReset:function(){var b=this._key.words;this._des1=m.createEncryptor(n.create(b.slice(0,2)));this._des2=m.createEncryptor(n.create(b.slice(2,4)));this._des3=
m.createEncryptor(n.create(b.slice(4,6)));},encryptBlock:function(b,c){this._des1.encryptBlock(b,c);this._des2.decryptBlock(b,c);this._des3.encryptBlock(b,c);},decryptBlock:function(b,c){this._des3.decryptBlock(b,c);this._des2.encryptBlock(b,c);this._des1.decryptBlock(b,c);},keySize:6,ivSize:2,blockSize:2});h.TripleDES=e._createHelper(g);})();

/*
CryptoJS v3.1.2 enc-base64.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var h=CryptoJS,j=h.lib.WordArray;h.enc.Base64={stringify:function(b){var e=b.words,f=b.sigBytes,c=this._map;b.clamp();b=[];for(var a=0;a<f;a+=3)for(var d=(e[a>>>2]>>>24-8*(a%4)&255)<<16|(e[a+1>>>2]>>>24-8*((a+1)%4)&255)<<8|e[a+2>>>2]>>>24-8*((a+2)%4)&255,g=0;4>g&&a+0.75*g<f;g++)b.push(c.charAt(d>>>6*(3-g)&63));if(e=c.charAt(64))for(;b.length%4;)b.push(e);return b.join("")},parse:function(b){var e=b.length,f=this._map,c=f.charAt(64);c&&(c=b.indexOf(c),-1!=c&&(e=c));for(var c=[],a=0,d=0;d<
e;d++)if(d%4){var g=f.indexOf(b.charAt(d-1))<<2*(d%4),h=f.indexOf(b.charAt(d))>>>6-2*(d%4);c[a>>>2]|=(g|h)<<24-8*(a%4);a++;}return j.create(c,a)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};})();

/*
CryptoJS v3.1.2 md5.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(E){function h(a,f,g,j,p,h,k){a=a+(f&g|~f&j)+p+k;return (a<<h|a>>>32-h)+f}function k(a,f,g,j,p,h,k){a=a+(f&j|g&~j)+p+k;return (a<<h|a>>>32-h)+f}function l(a,f,g,j,h,k,l){a=a+(f^g^j)+h+l;return (a<<k|a>>>32-k)+f}function n(a,f,g,j,h,k,l){a=a+(g^(f|~j))+h+l;return (a<<k|a>>>32-k)+f}for(var r=CryptoJS,q=r.lib,F=q.WordArray,s=q.Hasher,q=r.algo,a=[],t=0;64>t;t++)a[t]=4294967296*E.abs(E.sin(t+1))|0;q=q.MD5=s.extend({_doReset:function(){this._hash=new F.init([1732584193,4023233417,2562383102,271733878]);},
_doProcessBlock:function(m,f){for(var g=0;16>g;g++){var j=f+g,p=m[j];m[j]=(p<<8|p>>>24)&16711935|(p<<24|p>>>8)&4278255360;}var g=this._hash.words,j=m[f+0],p=m[f+1],q=m[f+2],r=m[f+3],s=m[f+4],t=m[f+5],u=m[f+6],v=m[f+7],w=m[f+8],x=m[f+9],y=m[f+10],z=m[f+11],A=m[f+12],B=m[f+13],C=m[f+14],D=m[f+15],b=g[0],c=g[1],d=g[2],e=g[3],b=h(b,c,d,e,j,7,a[0]),e=h(e,b,c,d,p,12,a[1]),d=h(d,e,b,c,q,17,a[2]),c=h(c,d,e,b,r,22,a[3]),b=h(b,c,d,e,s,7,a[4]),e=h(e,b,c,d,t,12,a[5]),d=h(d,e,b,c,u,17,a[6]),c=h(c,d,e,b,v,22,a[7]),
b=h(b,c,d,e,w,7,a[8]),e=h(e,b,c,d,x,12,a[9]),d=h(d,e,b,c,y,17,a[10]),c=h(c,d,e,b,z,22,a[11]),b=h(b,c,d,e,A,7,a[12]),e=h(e,b,c,d,B,12,a[13]),d=h(d,e,b,c,C,17,a[14]),c=h(c,d,e,b,D,22,a[15]),b=k(b,c,d,e,p,5,a[16]),e=k(e,b,c,d,u,9,a[17]),d=k(d,e,b,c,z,14,a[18]),c=k(c,d,e,b,j,20,a[19]),b=k(b,c,d,e,t,5,a[20]),e=k(e,b,c,d,y,9,a[21]),d=k(d,e,b,c,D,14,a[22]),c=k(c,d,e,b,s,20,a[23]),b=k(b,c,d,e,x,5,a[24]),e=k(e,b,c,d,C,9,a[25]),d=k(d,e,b,c,r,14,a[26]),c=k(c,d,e,b,w,20,a[27]),b=k(b,c,d,e,B,5,a[28]),e=k(e,b,
c,d,q,9,a[29]),d=k(d,e,b,c,v,14,a[30]),c=k(c,d,e,b,A,20,a[31]),b=l(b,c,d,e,t,4,a[32]),e=l(e,b,c,d,w,11,a[33]),d=l(d,e,b,c,z,16,a[34]),c=l(c,d,e,b,C,23,a[35]),b=l(b,c,d,e,p,4,a[36]),e=l(e,b,c,d,s,11,a[37]),d=l(d,e,b,c,v,16,a[38]),c=l(c,d,e,b,y,23,a[39]),b=l(b,c,d,e,B,4,a[40]),e=l(e,b,c,d,j,11,a[41]),d=l(d,e,b,c,r,16,a[42]),c=l(c,d,e,b,u,23,a[43]),b=l(b,c,d,e,x,4,a[44]),e=l(e,b,c,d,A,11,a[45]),d=l(d,e,b,c,D,16,a[46]),c=l(c,d,e,b,q,23,a[47]),b=n(b,c,d,e,j,6,a[48]),e=n(e,b,c,d,v,10,a[49]),d=n(d,e,b,c,
C,15,a[50]),c=n(c,d,e,b,t,21,a[51]),b=n(b,c,d,e,A,6,a[52]),e=n(e,b,c,d,r,10,a[53]),d=n(d,e,b,c,y,15,a[54]),c=n(c,d,e,b,p,21,a[55]),b=n(b,c,d,e,w,6,a[56]),e=n(e,b,c,d,D,10,a[57]),d=n(d,e,b,c,u,15,a[58]),c=n(c,d,e,b,B,21,a[59]),b=n(b,c,d,e,s,6,a[60]),e=n(e,b,c,d,z,10,a[61]),d=n(d,e,b,c,q,15,a[62]),c=n(c,d,e,b,x,21,a[63]);g[0]=g[0]+b|0;g[1]=g[1]+c|0;g[2]=g[2]+d|0;g[3]=g[3]+e|0;},_doFinalize:function(){var a=this._data,f=a.words,g=8*this._nDataBytes,j=8*a.sigBytes;f[j>>>5]|=128<<24-j%32;var h=E.floor(g/
4294967296);f[(j+64>>>9<<4)+15]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;f[(j+64>>>9<<4)+14]=(g<<8|g>>>24)&16711935|(g<<24|g>>>8)&4278255360;a.sigBytes=4*(f.length+1);this._process();a=this._hash;f=a.words;for(g=0;4>g;g++)j=f[g],f[g]=(j<<8|j>>>24)&16711935|(j<<24|j>>>8)&4278255360;return a},clone:function(){var a=s.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=s._createHelper(q);r.HmacMD5=s._createHmacHelper(q);})(Math);

/*
CryptoJS v3.1.2 sha1-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var k=CryptoJS,b=k.lib,m=b.WordArray,l=b.Hasher,d=[],b=k.algo.SHA1=l.extend({_doReset:function(){this._hash=new m.init([1732584193,4023233417,2562383102,271733878,3285377520]);},_doProcessBlock:function(n,p){for(var a=this._hash.words,e=a[0],f=a[1],h=a[2],j=a[3],b=a[4],c=0;80>c;c++){if(16>c)d[c]=n[p+c]|0;else{var g=d[c-3]^d[c-8]^d[c-14]^d[c-16];d[c]=g<<1|g>>>31;}g=(e<<5|e>>>27)+b+d[c];g=20>c?g+((f&h|~f&j)+1518500249):40>c?g+((f^h^j)+1859775393):60>c?g+((f&h|f&j|h&j)-1894007588):g+((f^h^
j)-899497514);b=j;j=h;h=f<<30|f>>>2;f=e;e=g;}a[0]=a[0]+e|0;a[1]=a[1]+f|0;a[2]=a[2]+h|0;a[3]=a[3]+j|0;a[4]=a[4]+b|0;},_doFinalize:function(){var b=this._data,d=b.words,a=8*this._nDataBytes,e=8*b.sigBytes;d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=Math.floor(a/4294967296);d[(e+64>>>9<<4)+15]=a;b.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var b=l.clone.call(this);b._hash=this._hash.clone();return b}});k.SHA1=l._createHelper(b);k.HmacSHA1=l._createHmacHelper(b);})();

/*
CryptoJS v3.1.2 sha256-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(k){for(var g=CryptoJS,h=g.lib,v=h.WordArray,j=h.Hasher,h=g.algo,s=[],t=[],u=function(q){return 4294967296*(q-(q|0))|0},l=2,b=0;64>b;){var d;a:{d=l;for(var w=k.sqrt(d),r=2;r<=w;r++)if(!(d%r)){d=!1;break a}d=!0;}d&&(8>b&&(s[b]=u(k.pow(l,0.5))),t[b]=u(k.pow(l,1/3)),b++);l++;}var n=[],h=h.SHA256=j.extend({_doReset:function(){this._hash=new v.init(s.slice(0));},_doProcessBlock:function(q,h){for(var a=this._hash.words,c=a[0],d=a[1],b=a[2],k=a[3],f=a[4],g=a[5],j=a[6],l=a[7],e=0;64>e;e++){if(16>e)n[e]=
q[h+e]|0;else{var m=n[e-15],p=n[e-2];n[e]=((m<<25|m>>>7)^(m<<14|m>>>18)^m>>>3)+n[e-7]+((p<<15|p>>>17)^(p<<13|p>>>19)^p>>>10)+n[e-16];}m=l+((f<<26|f>>>6)^(f<<21|f>>>11)^(f<<7|f>>>25))+(f&g^~f&j)+t[e]+n[e];p=((c<<30|c>>>2)^(c<<19|c>>>13)^(c<<10|c>>>22))+(c&d^c&b^d&b);l=j;j=g;g=f;f=k+m|0;k=b;b=d;d=c;c=m+p|0;}a[0]=a[0]+c|0;a[1]=a[1]+d|0;a[2]=a[2]+b|0;a[3]=a[3]+k|0;a[4]=a[4]+f|0;a[5]=a[5]+g|0;a[6]=a[6]+j|0;a[7]=a[7]+l|0;},_doFinalize:function(){var d=this._data,b=d.words,a=8*this._nDataBytes,c=8*d.sigBytes;
b[c>>>5]|=128<<24-c%32;b[(c+64>>>9<<4)+14]=k.floor(a/4294967296);b[(c+64>>>9<<4)+15]=a;d.sigBytes=4*b.length;this._process();return this._hash},clone:function(){var b=j.clone.call(this);b._hash=this._hash.clone();return b}});g.SHA256=j._createHelper(h);g.HmacSHA256=j._createHmacHelper(h);})(Math);

/*
CryptoJS v3.1.2 sha224-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var b=CryptoJS,d=b.lib.WordArray,a=b.algo,c=a.SHA256,a=a.SHA224=c.extend({_doReset:function(){this._hash=new d.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]);},_doFinalize:function(){var a=c._doFinalize.call(this);a.sigBytes-=4;return a}});b.SHA224=c._createHelper(a);b.HmacSHA224=c._createHmacHelper(a);})();

/*
CryptoJS v3.1.2 sha512-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){function a(){return d.create.apply(d,arguments)}for(var n=CryptoJS,r=n.lib.Hasher,e=n.x64,d=e.Word,T=e.WordArray,e=n.algo,ea=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),
a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,
2643833823),a(1695183700,2343527390),a(1986661051,1014477480),a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),
a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,
3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,1246189591)],v=[],w=0;80>w;w++)v[w]=a();e=e.SHA512=r.extend({_doReset:function(){this._hash=new T.init([new d.init(1779033703,4089235720),new d.init(3144134277,2227873595),new d.init(1013904242,4271175723),new d.init(2773480762,1595750129),new d.init(1359893119,2917565137),new d.init(2600822924,725511199),new d.init(528734635,4215389547),new d.init(1541459225,327033209)]);},_doProcessBlock:function(a,d){for(var f=this._hash.words,
F=f[0],e=f[1],n=f[2],r=f[3],G=f[4],H=f[5],I=f[6],f=f[7],w=F.high,J=F.low,X=e.high,K=e.low,Y=n.high,L=n.low,Z=r.high,M=r.low,$=G.high,N=G.low,aa=H.high,O=H.low,ba=I.high,P=I.low,ca=f.high,Q=f.low,k=w,g=J,z=X,x=K,A=Y,y=L,U=Z,B=M,l=$,h=N,R=aa,C=O,S=ba,D=P,V=ca,E=Q,m=0;80>m;m++){var s=v[m];if(16>m)var j=s.high=a[d+2*m]|0,b=s.low=a[d+2*m+1]|0;else{var j=v[m-15],b=j.high,p=j.low,j=(b>>>1|p<<31)^(b>>>8|p<<24)^b>>>7,p=(p>>>1|b<<31)^(p>>>8|b<<24)^(p>>>7|b<<25),u=v[m-2],b=u.high,c=u.low,u=(b>>>19|c<<13)^(b<<
3|c>>>29)^b>>>6,c=(c>>>19|b<<13)^(c<<3|b>>>29)^(c>>>6|b<<26),b=v[m-7],W=b.high,t=v[m-16],q=t.high,t=t.low,b=p+b.low,j=j+W+(b>>>0<p>>>0?1:0),b=b+c,j=j+u+(b>>>0<c>>>0?1:0),b=b+t,j=j+q+(b>>>0<t>>>0?1:0);s.high=j;s.low=b;}var W=l&R^~l&S,t=h&C^~h&D,s=k&z^k&A^z&A,T=g&x^g&y^x&y,p=(k>>>28|g<<4)^(k<<30|g>>>2)^(k<<25|g>>>7),u=(g>>>28|k<<4)^(g<<30|k>>>2)^(g<<25|k>>>7),c=ea[m],fa=c.high,da=c.low,c=E+((h>>>14|l<<18)^(h>>>18|l<<14)^(h<<23|l>>>9)),q=V+((l>>>14|h<<18)^(l>>>18|h<<14)^(l<<23|h>>>9))+(c>>>0<E>>>0?1:
0),c=c+t,q=q+W+(c>>>0<t>>>0?1:0),c=c+da,q=q+fa+(c>>>0<da>>>0?1:0),c=c+b,q=q+j+(c>>>0<b>>>0?1:0),b=u+T,s=p+s+(b>>>0<u>>>0?1:0),V=S,E=D,S=R,D=C,R=l,C=h,h=B+c|0,l=U+q+(h>>>0<B>>>0?1:0)|0,U=A,B=y,A=z,y=x,z=k,x=g,g=c+b|0,k=q+s+(g>>>0<c>>>0?1:0)|0;}J=F.low=J+g;F.high=w+k+(J>>>0<g>>>0?1:0);K=e.low=K+x;e.high=X+z+(K>>>0<x>>>0?1:0);L=n.low=L+y;n.high=Y+A+(L>>>0<y>>>0?1:0);M=r.low=M+B;r.high=Z+U+(M>>>0<B>>>0?1:0);N=G.low=N+h;G.high=$+l+(N>>>0<h>>>0?1:0);O=H.low=O+C;H.high=aa+R+(O>>>0<C>>>0?1:0);P=I.low=P+D;
I.high=ba+S+(P>>>0<D>>>0?1:0);Q=f.low=Q+E;f.high=ca+V+(Q>>>0<E>>>0?1:0);},_doFinalize:function(){var a=this._data,d=a.words,f=8*this._nDataBytes,e=8*a.sigBytes;d[e>>>5]|=128<<24-e%32;d[(e+128>>>10<<5)+30]=Math.floor(f/4294967296);d[(e+128>>>10<<5)+31]=f;a.sigBytes=4*d.length;this._process();return this._hash.toX32()},clone:function(){var a=r.clone.call(this);a._hash=this._hash.clone();return a},blockSize:32});n.SHA512=r._createHelper(e);n.HmacSHA512=r._createHmacHelper(e);})();

/*
CryptoJS v3.1.2 sha384-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var c=CryptoJS,a=c.x64,b=a.Word,e=a.WordArray,a=c.algo,d=a.SHA512,a=a.SHA384=d.extend({_doReset:function(){this._hash=new e.init([new b.init(3418070365,3238371032),new b.init(1654270250,914150663),new b.init(2438529370,812702999),new b.init(355462360,4144912697),new b.init(1731405415,4290775857),new b.init(2394180231,1750603025),new b.init(3675008525,1694076839),new b.init(1203062813,3204075428)]);},_doFinalize:function(){var a=d._doFinalize.call(this);a.sigBytes-=16;return a}});c.SHA384=
d._createHelper(a);c.HmacSHA384=d._createHmacHelper(a);})();

/*
CryptoJS v3.1.2 ripemd160-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
/*

(c) 2012 by Cedric Mesnil. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
(function(){var q=CryptoJS,d=q.lib,n=d.WordArray,p=d.Hasher,d=q.algo,x=n.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),y=n.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),z=n.create([11,14,15,12,
5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),A=n.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),B=n.create([0,1518500249,1859775393,2400959708,2840853838]),C=n.create([1352829926,1548603684,1836072691,
2053994217,0]),d=d.RIPEMD160=p.extend({_doReset:function(){this._hash=n.create([1732584193,4023233417,2562383102,271733878,3285377520]);},_doProcessBlock:function(e,v){for(var b=0;16>b;b++){var c=v+b,f=e[c];e[c]=(f<<8|f>>>24)&16711935|(f<<24|f>>>8)&4278255360;}var c=this._hash.words,f=B.words,d=C.words,n=x.words,q=y.words,p=z.words,w=A.words,t,g,h,j,r,u,k,l,m,s;u=t=c[0];k=g=c[1];l=h=c[2];m=j=c[3];s=r=c[4];for(var a,b=0;80>b;b+=1)a=t+e[v+n[b]]|0,a=16>b?a+((g^h^j)+f[0]):32>b?a+((g&h|~g&j)+f[1]):48>b?
a+(((g|~h)^j)+f[2]):64>b?a+((g&j|h&~j)+f[3]):a+((g^(h|~j))+f[4]),a|=0,a=a<<p[b]|a>>>32-p[b],a=a+r|0,t=r,r=j,j=h<<10|h>>>22,h=g,g=a,a=u+e[v+q[b]]|0,a=16>b?a+((k^(l|~m))+d[0]):32>b?a+((k&m|l&~m)+d[1]):48>b?a+(((k|~l)^m)+d[2]):64>b?a+((k&l|~k&m)+d[3]):a+((k^l^m)+d[4]),a|=0,a=a<<w[b]|a>>>32-w[b],a=a+s|0,u=s,s=m,m=l<<10|l>>>22,l=k,k=a;a=c[1]+h+m|0;c[1]=c[2]+j+s|0;c[2]=c[3]+r+u|0;c[3]=c[4]+t+k|0;c[4]=c[0]+g+l|0;c[0]=a;},_doFinalize:function(){var e=this._data,d=e.words,b=8*this._nDataBytes,c=8*e.sigBytes;
d[c>>>5]|=128<<24-c%32;d[(c+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;e.sigBytes=4*(d.length+1);this._process();e=this._hash;d=e.words;for(b=0;5>b;b++)c=d[b],d[b]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return e},clone:function(){var d=p.clone.call(this);d._hash=this._hash.clone();return d}});q.RIPEMD160=p._createHelper(d);q.HmacRIPEMD160=p._createHmacHelper(d);})();

/*
CryptoJS v3.1.2 hmac.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var c=CryptoJS,k=c.enc.Utf8;c.algo.HMAC=c.lib.Base.extend({init:function(a,b){a=this._hasher=new a.init;"string"==typeof b&&(b=k.parse(b));var c=a.blockSize,e=4*c;b.sigBytes>e&&(b=a.finalize(b));b.clamp();for(var f=this._oKey=b.clone(),g=this._iKey=b.clone(),h=f.words,j=g.words,d=0;d<c;d++)h[d]^=1549556828,j[d]^=909522486;f.sigBytes=g.sigBytes=e;this.reset();},reset:function(){var a=this._hasher;a.reset();a.update(this._iKey);},update:function(a){this._hasher.update(a);return this},finalize:function(a){var b=
this._hasher;a=b.finalize(a);b.reset();return b.finalize(this._oKey.clone().concat(a))}});})();

/*
CryptoJS v3.1.2 pbkdf2-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var b=CryptoJS,a=b.lib,d=a.Base,m=a.WordArray,a=b.algo,q=a.HMAC,l=a.PBKDF2=d.extend({cfg:d.extend({keySize:4,hasher:a.SHA1,iterations:1}),init:function(a){this.cfg=this.cfg.extend(a);},compute:function(a,b){for(var c=this.cfg,f=q.create(c.hasher,a),g=m.create(),d=m.create([1]),l=g.words,r=d.words,n=c.keySize,c=c.iterations;l.length<n;){var h=f.update(b).finalize(d);f.reset();for(var j=h.words,s=j.length,k=h,p=1;p<c;p++){k=f.finalize(k);f.reset();for(var t=k.words,e=0;e<s;e++)j[e]^=t[e];}g.concat(h);
r[0]++;}g.sigBytes=4*n;return g}});b.PBKDF2=function(a,b,c){return l.create(c).compute(a,b)};})();

/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64pad="=";function hex2b64(d){var b;var e;var a="";for(b=0;b+3<=d.length;b+=3){e=parseInt(d.substring(b,b+3),16);a+=b64map.charAt(e>>6)+b64map.charAt(e&63);}if(b+1==d.length){e=parseInt(d.substring(b,b+1),16);a+=b64map.charAt(e<<2);}else{if(b+2==d.length){e=parseInt(d.substring(b,b+2),16);a+=b64map.charAt(e>>2)+b64map.charAt((e&3)<<4);}}{while((a.length&3)>0){a+=b64pad;}}return a}function b64tohex(f){var d="";var e;var b=0;var c;var a;for(e=0;e<f.length;++e){if(f.charAt(e)==b64pad){break}a=b64map.indexOf(f.charAt(e));if(a<0){continue}if(b==0){d+=int2char(a>>2);c=a&3;b=1;}else{if(b==1){d+=int2char((c<<2)|(a>>4));c=a&15;b=2;}else{if(b==2){d+=int2char(c);d+=int2char(a>>2);c=a&3;b=3;}else{d+=int2char((c<<2)|(a>>4));d+=int2char(a&15);b=0;}}}}if(b==1){d+=int2char(c<<2);}return d}function b64toBA(e){var d=b64tohex(e);var c;var b=new Array();for(c=0;2*c<d.length;++c){b[c]=parseInt(d.substring(2*c,2*c+2),16);}return b}/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var dbits;function BigInteger(e,d,f){if(e!=null){if("number"==typeof e){this.fromNumber(e,d,f);}else{if(d==null&&"string"!=typeof e){this.fromString(e,256);}else{this.fromString(e,d);}}}}function nbi(){return new BigInteger(null)}function am1(f,a,b,e,h,g){while(--g>=0){var d=a*this[f++]+b[e]+h;h=Math.floor(d/67108864);b[e++]=d&67108863;}return h}{{BigInteger.prototype.am=am1;dbits=26;}}BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=((1<<dbits)-1);BigInteger.prototype.DV=(1<<dbits);var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz";var BI_RC=new Array();var rr,vv;rr="0".charCodeAt(0);for(vv=0;vv<=9;++vv){BI_RC[rr++]=vv;}rr="a".charCodeAt(0);for(vv=10;vv<36;++vv){BI_RC[rr++]=vv;}rr="A".charCodeAt(0);for(vv=10;vv<36;++vv){BI_RC[rr++]=vv;}function int2char(a){return BI_RM.charAt(a)}function intAt(b,a){var d=BI_RC[b.charCodeAt(a)];return (d==null)?-1:d}function bnpCopyTo(b){for(var a=this.t-1;a>=0;--a){b[a]=this[a];}b.t=this.t;b.s=this.s;}function bnpFromInt(a){this.t=1;this.s=(a<0)?-1:0;if(a>0){this[0]=a;}else{if(a<-1){this[0]=a+this.DV;}else{this.t=0;}}}function nbv(a){var b=nbi();b.fromInt(a);return b}function bnpFromString(h,c){var e;if(c==16){e=4;}else{if(c==8){e=3;}else{if(c==256){e=8;}else{if(c==2){e=1;}else{if(c==32){e=5;}else{if(c==4){e=2;}else{this.fromRadix(h,c);return}}}}}}this.t=0;this.s=0;var g=h.length,d=false,f=0;while(--g>=0){var a=(e==8)?h[g]&255:intAt(h,g);if(a<0){if(h.charAt(g)=="-"){d=true;}continue}d=false;if(f==0){this[this.t++]=a;}else{if(f+e>this.DB){this[this.t-1]|=(a&((1<<(this.DB-f))-1))<<f;this[this.t++]=(a>>(this.DB-f));}else{this[this.t-1]|=a<<f;}}f+=e;if(f>=this.DB){f-=this.DB;}}if(e==8&&(h[0]&128)!=0){this.s=-1;if(f>0){this[this.t-1]|=((1<<(this.DB-f))-1)<<f;}}this.clamp();if(d){BigInteger.ZERO.subTo(this,this);}}function bnpClamp(){var a=this.s&this.DM;while(this.t>0&&this[this.t-1]==a){--this.t;}}function bnToString(c){if(this.s<0){return "-"+this.negate().toString(c)}var e;if(c==16){e=4;}else{if(c==8){e=3;}else{if(c==2){e=1;}else{if(c==32){e=5;}else{if(c==4){e=2;}else{return this.toRadix(c)}}}}}var g=(1<<e)-1,l,a=false,h="",f=this.t;var j=this.DB-(f*this.DB)%e;if(f-->0){if(j<this.DB&&(l=this[f]>>j)>0){a=true;h=int2char(l);}while(f>=0){if(j<e){l=(this[f]&((1<<j)-1))<<(e-j);l|=this[--f]>>(j+=this.DB-e);}else{l=(this[f]>>(j-=e))&g;if(j<=0){j+=this.DB;--f;}}if(l>0){a=true;}if(a){h+=int2char(l);}}}return a?h:"0"}function bnNegate(){var a=nbi();BigInteger.ZERO.subTo(this,a);return a}function bnAbs(){return (this.s<0)?this.negate():this}function bnCompareTo(b){var d=this.s-b.s;if(d!=0){return d}var c=this.t;d=c-b.t;if(d!=0){return (this.s<0)?-d:d}while(--c>=0){if((d=this[c]-b[c])!=0){return d}}return 0}function nbits(a){var c=1,b;if((b=a>>>16)!=0){a=b;c+=16;}if((b=a>>8)!=0){a=b;c+=8;}if((b=a>>4)!=0){a=b;c+=4;}if((b=a>>2)!=0){a=b;c+=2;}if((b=a>>1)!=0){a=b;c+=1;}return c}function bnBitLength(){if(this.t<=0){return 0}return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM))}function bnpDLShiftTo(c,b){var a;for(a=this.t-1;a>=0;--a){b[a+c]=this[a];}for(a=c-1;a>=0;--a){b[a]=0;}b.t=this.t+c;b.s=this.s;}function bnpDRShiftTo(c,b){for(var a=c;a<this.t;++a){b[a-c]=this[a];}b.t=Math.max(this.t-c,0);b.s=this.s;}function bnpLShiftTo(j,e){var b=j%this.DB;var a=this.DB-b;var g=(1<<a)-1;var f=Math.floor(j/this.DB),h=(this.s<<b)&this.DM,d;for(d=this.t-1;d>=0;--d){e[d+f+1]=(this[d]>>a)|h;h=(this[d]&g)<<b;}for(d=f-1;d>=0;--d){e[d]=0;}e[f]=h;e.t=this.t+f+1;e.s=this.s;e.clamp();}function bnpRShiftTo(g,d){d.s=this.s;var e=Math.floor(g/this.DB);if(e>=this.t){d.t=0;return}var b=g%this.DB;var a=this.DB-b;var f=(1<<b)-1;d[0]=this[e]>>b;for(var c=e+1;c<this.t;++c){d[c-e-1]|=(this[c]&f)<<a;d[c-e]=this[c]>>b;}if(b>0){d[this.t-e-1]|=(this.s&f)<<a;}d.t=this.t-e;d.clamp();}function bnpSubTo(d,f){var e=0,g=0,b=Math.min(d.t,this.t);while(e<b){g+=this[e]-d[e];f[e++]=g&this.DM;g>>=this.DB;}if(d.t<this.t){g-=d.s;while(e<this.t){g+=this[e];f[e++]=g&this.DM;g>>=this.DB;}g+=this.s;}else{g+=this.s;while(e<d.t){g-=d[e];f[e++]=g&this.DM;g>>=this.DB;}g-=d.s;}f.s=(g<0)?-1:0;if(g<-1){f[e++]=this.DV+g;}else{if(g>0){f[e++]=g;}}f.t=e;f.clamp();}function bnpMultiplyTo(c,e){var b=this.abs(),f=c.abs();var d=b.t;e.t=d+f.t;while(--d>=0){e[d]=0;}for(d=0;d<f.t;++d){e[d+b.t]=b.am(0,f[d],e,d,0,b.t);}e.s=0;e.clamp();if(this.s!=c.s){BigInteger.ZERO.subTo(e,e);}}function bnpSquareTo(d){var a=this.abs();var b=d.t=2*a.t;while(--b>=0){d[b]=0;}for(b=0;b<a.t-1;++b){var e=a.am(b,a[b],d,2*b,0,1);if((d[b+a.t]+=a.am(b+1,2*a[b],d,2*b+1,e,a.t-b-1))>=a.DV){d[b+a.t]-=a.DV;d[b+a.t+1]=1;}}if(d.t>0){d[d.t-1]+=a.am(b,a[b],d,2*b,0,1);}d.s=0;d.clamp();}function bnpDivRemTo(n,h,g){var w=n.abs();if(w.t<=0){return}var k=this.abs();if(k.t<w.t){if(h!=null){h.fromInt(0);}if(g!=null){this.copyTo(g);}return}if(g==null){g=nbi();}var d=nbi(),a=this.s,l=n.s;var v=this.DB-nbits(w[w.t-1]);if(v>0){w.lShiftTo(v,d);k.lShiftTo(v,g);}else{w.copyTo(d);k.copyTo(g);}var p=d.t;var b=d[p-1];if(b==0){return}var o=b*(1<<this.F1)+((p>1)?d[p-2]>>this.F2:0);var A=this.FV/o,z=(1<<this.F1)/o,x=1<<this.F2;var u=g.t,s=u-p,f=(h==null)?nbi():h;d.dlShiftTo(s,f);if(g.compareTo(f)>=0){g[g.t++]=1;g.subTo(f,g);}BigInteger.ONE.dlShiftTo(p,f);f.subTo(d,d);while(d.t<p){d[d.t++]=0;}while(--s>=0){var c=(g[--u]==b)?this.DM:Math.floor(g[u]*A+(g[u-1]+x)*z);if((g[u]+=d.am(0,c,g,s,0,p))<c){d.dlShiftTo(s,f);g.subTo(f,g);while(g[u]<--c){g.subTo(f,g);}}}if(h!=null){g.drShiftTo(p,h);if(a!=l){BigInteger.ZERO.subTo(h,h);}}g.t=p;g.clamp();if(v>0){g.rShiftTo(v,g);}if(a<0){BigInteger.ZERO.subTo(g,g);}}function bnMod(b){var c=nbi();this.abs().divRemTo(b,null,c);if(this.s<0&&c.compareTo(BigInteger.ZERO)>0){b.subTo(c,c);}return c}function Classic(a){this.m=a;}function cConvert(a){if(a.s<0||a.compareTo(this.m)>=0){return a.mod(this.m)}else{return a}}function cRevert(a){return a}function cReduce(a){a.divRemTo(this.m,null,a);}function cMulTo(a,c,b){a.multiplyTo(c,b);this.reduce(b);}function cSqrTo(a,b){a.squareTo(b);this.reduce(b);}Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;function bnpInvDigit(){if(this.t<1){return 0}var a=this[0];if((a&1)==0){return 0}var b=a&3;b=(b*(2-(a&15)*b))&15;b=(b*(2-(a&255)*b))&255;b=(b*(2-(((a&65535)*b)&65535)))&65535;b=(b*(2-a*b%this.DV))%this.DV;return (b>0)?this.DV-b:-b}function Montgomery(a){this.m=a;this.mp=a.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<(a.DB-15))-1;this.mt2=2*a.t;}function montConvert(a){var b=nbi();a.abs().dlShiftTo(this.m.t,b);b.divRemTo(this.m,null,b);if(a.s<0&&b.compareTo(BigInteger.ZERO)>0){this.m.subTo(b,b);}return b}function montRevert(a){var b=nbi();a.copyTo(b);this.reduce(b);return b}function montReduce(a){while(a.t<=this.mt2){a[a.t++]=0;}for(var c=0;c<this.m.t;++c){var b=a[c]&32767;var d=(b*this.mpl+(((b*this.mph+(a[c]>>15)*this.mpl)&this.um)<<15))&a.DM;b=c+this.m.t;a[b]+=this.m.am(0,d,a,c,0,this.m.t);while(a[b]>=a.DV){a[b]-=a.DV;a[++b]++;}}a.clamp();a.drShiftTo(this.m.t,a);if(a.compareTo(this.m)>=0){a.subTo(this.m,a);}}function montSqrTo(a,b){a.squareTo(b);this.reduce(b);}function montMulTo(a,c,b){a.multiplyTo(c,b);this.reduce(b);}Montgomery.prototype.convert=montConvert;Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;function bnpIsEven(){return ((this.t>0)?(this[0]&1):this.s)==0}function bnpExp(h,j){if(h>4294967295||h<1){return BigInteger.ONE}var f=nbi(),a=nbi(),d=j.convert(this),c=nbits(h)-1;d.copyTo(f);while(--c>=0){j.sqrTo(f,a);if((h&(1<<c))>0){j.mulTo(a,d,f);}else{var b=f;f=a;a=b;}}return j.revert(f)}function bnModPowInt(b,a){var c;if(b<256||a.isEven()){c=new Classic(a);}else{c=new Montgomery(a);}return this.exp(b,c)}BigInteger.prototype.copyTo=bnpCopyTo;BigInteger.prototype.fromInt=bnpFromInt;BigInteger.prototype.fromString=bnpFromString;BigInteger.prototype.clamp=bnpClamp;BigInteger.prototype.dlShiftTo=bnpDLShiftTo;BigInteger.prototype.drShiftTo=bnpDRShiftTo;BigInteger.prototype.lShiftTo=bnpLShiftTo;BigInteger.prototype.rShiftTo=bnpRShiftTo;BigInteger.prototype.subTo=bnpSubTo;BigInteger.prototype.multiplyTo=bnpMultiplyTo;BigInteger.prototype.squareTo=bnpSquareTo;BigInteger.prototype.divRemTo=bnpDivRemTo;BigInteger.prototype.invDigit=bnpInvDigit;BigInteger.prototype.isEven=bnpIsEven;BigInteger.prototype.exp=bnpExp;BigInteger.prototype.toString=bnToString;BigInteger.prototype.negate=bnNegate;BigInteger.prototype.abs=bnAbs;BigInteger.prototype.compareTo=bnCompareTo;BigInteger.prototype.bitLength=bnBitLength;BigInteger.prototype.mod=bnMod;BigInteger.prototype.modPowInt=bnModPowInt;BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1);
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function bnClone(){var a=nbi();this.copyTo(a);return a}function bnIntValue(){if(this.s<0){if(this.t==1){return this[0]-this.DV}else{if(this.t==0){return -1}}}else{if(this.t==1){return this[0]}else{if(this.t==0){return 0}}}return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0]}function bnByteValue(){return (this.t==0)?this.s:(this[0]<<24)>>24}function bnShortValue(){return (this.t==0)?this.s:(this[0]<<16)>>16}function bnpChunkSize(a){return Math.floor(Math.LN2*this.DB/Math.log(a))}function bnSigNum(){if(this.s<0){return -1}else{if(this.t<=0||(this.t==1&&this[0]<=0)){return 0}else{return 1}}}function bnpToRadix(c){if(c==null){c=10;}if(this.signum()==0||c<2||c>36){return "0"}var f=this.chunkSize(c);var e=Math.pow(c,f);var i=nbv(e),j=nbi(),h=nbi(),g="";this.divRemTo(i,j,h);while(j.signum()>0){g=(e+h.intValue()).toString(c).substr(1)+g;j.divRemTo(i,j,h);}return h.intValue().toString(c)+g}function bnpFromRadix(m,h){this.fromInt(0);if(h==null){h=10;}var f=this.chunkSize(h);var g=Math.pow(h,f),e=false,a=0,l=0;for(var c=0;c<m.length;++c){var k=intAt(m,c);if(k<0){if(m.charAt(c)=="-"&&this.signum()==0){e=true;}continue}l=h*l+k;if(++a>=f){this.dMultiply(g);this.dAddOffset(l,0);a=0;l=0;}}if(a>0){this.dMultiply(Math.pow(h,a));this.dAddOffset(l,0);}if(e){BigInteger.ZERO.subTo(this,this);}}function bnpFromNumber(f,e,h){if("number"==typeof e){if(f<2){this.fromInt(1);}else{this.fromNumber(f,h);if(!this.testBit(f-1)){this.bitwiseTo(BigInteger.ONE.shiftLeft(f-1),op_or,this);}if(this.isEven()){this.dAddOffset(1,0);}while(!this.isProbablePrime(e)){this.dAddOffset(2,0);if(this.bitLength()>f){this.subTo(BigInteger.ONE.shiftLeft(f-1),this);}}}}else{var d=new Array(),g=f&7;d.length=(f>>3)+1;e.nextBytes(d);if(g>0){d[0]&=((1<<g)-1);}else{d[0]=0;}this.fromString(d,256);}}function bnToByteArray(){var b=this.t,c=new Array();c[0]=this.s;var e=this.DB-(b*this.DB)%8,f,a=0;if(b-->0){if(e<this.DB&&(f=this[b]>>e)!=(this.s&this.DM)>>e){c[a++]=f|(this.s<<(this.DB-e));}while(b>=0){if(e<8){f=(this[b]&((1<<e)-1))<<(8-e);f|=this[--b]>>(e+=this.DB-8);}else{f=(this[b]>>(e-=8))&255;if(e<=0){e+=this.DB;--b;}}if((f&128)!=0){f|=-256;}if(a==0&&(this.s&128)!=(f&128)){++a;}if(a>0||f!=this.s){c[a++]=f;}}}return c}function bnEquals(b){return(this.compareTo(b)==0)}function bnMin(b){return (this.compareTo(b)<0)?this:b}function bnMax(b){return (this.compareTo(b)>0)?this:b}function bnpBitwiseTo(c,h,e){var d,g,b=Math.min(c.t,this.t);for(d=0;d<b;++d){e[d]=h(this[d],c[d]);}if(c.t<this.t){g=c.s&this.DM;for(d=b;d<this.t;++d){e[d]=h(this[d],g);}e.t=this.t;}else{g=this.s&this.DM;for(d=b;d<c.t;++d){e[d]=h(g,c[d]);}e.t=c.t;}e.s=h(this.s,c.s);e.clamp();}function op_and(a,b){return a&b}function bnAnd(b){var c=nbi();this.bitwiseTo(b,op_and,c);return c}function op_or(a,b){return a|b}function bnOr(b){var c=nbi();this.bitwiseTo(b,op_or,c);return c}function op_xor(a,b){return a^b}function bnXor(b){var c=nbi();this.bitwiseTo(b,op_xor,c);return c}function op_andnot(a,b){return a&~b}function bnAndNot(b){var c=nbi();this.bitwiseTo(b,op_andnot,c);return c}function bnNot(){var b=nbi();for(var a=0;a<this.t;++a){b[a]=this.DM&~this[a];}b.t=this.t;b.s=~this.s;return b}function bnShiftLeft(b){var a=nbi();if(b<0){this.rShiftTo(-b,a);}else{this.lShiftTo(b,a);}return a}function bnShiftRight(b){var a=nbi();if(b<0){this.lShiftTo(-b,a);}else{this.rShiftTo(b,a);}return a}function lbit(a){if(a==0){return -1}var b=0;if((a&65535)==0){a>>=16;b+=16;}if((a&255)==0){a>>=8;b+=8;}if((a&15)==0){a>>=4;b+=4;}if((a&3)==0){a>>=2;b+=2;}if((a&1)==0){++b;}return b}function bnGetLowestSetBit(){for(var a=0;a<this.t;++a){if(this[a]!=0){return a*this.DB+lbit(this[a])}}if(this.s<0){return this.t*this.DB}return -1}function cbit(a){var b=0;while(a!=0){a&=a-1;++b;}return b}function bnBitCount(){var c=0,a=this.s&this.DM;for(var b=0;b<this.t;++b){c+=cbit(this[b]^a);}return c}function bnTestBit(b){var a=Math.floor(b/this.DB);if(a>=this.t){return(this.s!=0)}return((this[a]&(1<<(b%this.DB)))!=0)}function bnpChangeBit(c,b){var a=BigInteger.ONE.shiftLeft(c);this.bitwiseTo(a,b,a);return a}function bnSetBit(a){return this.changeBit(a,op_or)}function bnClearBit(a){return this.changeBit(a,op_andnot)}function bnFlipBit(a){return this.changeBit(a,op_xor)}function bnpAddTo(d,f){var e=0,g=0,b=Math.min(d.t,this.t);while(e<b){g+=this[e]+d[e];f[e++]=g&this.DM;g>>=this.DB;}if(d.t<this.t){g+=d.s;while(e<this.t){g+=this[e];f[e++]=g&this.DM;g>>=this.DB;}g+=this.s;}else{g+=this.s;while(e<d.t){g+=d[e];f[e++]=g&this.DM;g>>=this.DB;}g+=d.s;}f.s=(g<0)?-1:0;if(g>0){f[e++]=g;}else{if(g<-1){f[e++]=this.DV+g;}}f.t=e;f.clamp();}function bnAdd(b){var c=nbi();this.addTo(b,c);return c}function bnSubtract(b){var c=nbi();this.subTo(b,c);return c}function bnMultiply(b){var c=nbi();this.multiplyTo(b,c);return c}function bnSquare(){var a=nbi();this.squareTo(a);return a}function bnDivide(b){var c=nbi();this.divRemTo(b,c,null);return c}function bnRemainder(b){var c=nbi();this.divRemTo(b,null,c);return c}function bnDivideAndRemainder(b){var d=nbi(),c=nbi();this.divRemTo(b,d,c);return new Array(d,c)}function bnpDMultiply(a){this[this.t]=this.am(0,a-1,this,0,0,this.t);++this.t;this.clamp();}function bnpDAddOffset(b,a){if(b==0){return}while(this.t<=a){this[this.t++]=0;}this[a]+=b;while(this[a]>=this.DV){this[a]-=this.DV;if(++a>=this.t){this[this.t++]=0;}++this[a];}}function NullExp(){}function nNop(a){return a}function nMulTo(a,c,b){a.multiplyTo(c,b);}function nSqrTo(a,b){a.squareTo(b);}NullExp.prototype.convert=nNop;NullExp.prototype.revert=nNop;NullExp.prototype.mulTo=nMulTo;NullExp.prototype.sqrTo=nSqrTo;function bnPow(a){return this.exp(a,new NullExp())}function bnpMultiplyLowerTo(b,f,e){var d=Math.min(this.t+b.t,f);e.s=0;e.t=d;while(d>0){e[--d]=0;}var c;for(c=e.t-this.t;d<c;++d){e[d+this.t]=this.am(0,b[d],e,d,0,this.t);}for(c=Math.min(b.t,f);d<c;++d){this.am(0,b[d],e,d,0,f-d);}e.clamp();}function bnpMultiplyUpperTo(b,e,d){--e;var c=d.t=this.t+b.t-e;d.s=0;while(--c>=0){d[c]=0;}for(c=Math.max(e-this.t,0);c<b.t;++c){d[this.t+c-e]=this.am(e-c,b[c],d,0,0,this.t+c-e);}d.clamp();d.drShiftTo(1,d);}function Barrett(a){this.r2=nbi();this.q3=nbi();BigInteger.ONE.dlShiftTo(2*a.t,this.r2);this.mu=this.r2.divide(a);this.m=a;}function barrettConvert(a){if(a.s<0||a.t>2*this.m.t){return a.mod(this.m)}else{if(a.compareTo(this.m)<0){return a}else{var b=nbi();a.copyTo(b);this.reduce(b);return b}}}function barrettRevert(a){return a}function barrettReduce(a){a.drShiftTo(this.m.t-1,this.r2);if(a.t>this.m.t+1){a.t=this.m.t+1;a.clamp();}this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);while(a.compareTo(this.r2)<0){a.dAddOffset(1,this.m.t+1);}a.subTo(this.r2,a);while(a.compareTo(this.m)>=0){a.subTo(this.m,a);}}function barrettSqrTo(a,b){a.squareTo(b);this.reduce(b);}function barrettMulTo(a,c,b){a.multiplyTo(c,b);this.reduce(b);}Barrett.prototype.convert=barrettConvert;Barrett.prototype.revert=barrettRevert;Barrett.prototype.reduce=barrettReduce;Barrett.prototype.mulTo=barrettMulTo;Barrett.prototype.sqrTo=barrettSqrTo;function bnModPow(q,f){var o=q.bitLength(),h,b=nbv(1),v;if(o<=0){return b}else{if(o<18){h=1;}else{if(o<48){h=3;}else{if(o<144){h=4;}else{if(o<768){h=5;}else{h=6;}}}}}if(o<8){v=new Classic(f);}else{if(f.isEven()){v=new Barrett(f);}else{v=new Montgomery(f);}}var p=new Array(),d=3,s=h-1,a=(1<<h)-1;p[1]=v.convert(this);if(h>1){var A=nbi();v.sqrTo(p[1],A);while(d<=a){p[d]=nbi();v.mulTo(A,p[d-2],p[d]);d+=2;}}var l=q.t-1,x,u=true,c=nbi(),y;o=nbits(q[l])-1;while(l>=0){if(o>=s){x=(q[l]>>(o-s))&a;}else{x=(q[l]&((1<<(o+1))-1))<<(s-o);if(l>0){x|=q[l-1]>>(this.DB+o-s);}}d=h;while((x&1)==0){x>>=1;--d;}if((o-=d)<0){o+=this.DB;--l;}if(u){p[x].copyTo(b);u=false;}else{while(d>1){v.sqrTo(b,c);v.sqrTo(c,b);d-=2;}if(d>0){v.sqrTo(b,c);}else{y=b;b=c;c=y;}v.mulTo(c,p[x],b);}while(l>=0&&(q[l]&(1<<o))==0){v.sqrTo(b,c);y=b;b=c;c=y;if(--o<0){o=this.DB-1;--l;}}}return v.revert(b)}function bnGCD(c){var b=(this.s<0)?this.negate():this.clone();var h=(c.s<0)?c.negate():c.clone();if(b.compareTo(h)<0){var e=b;b=h;h=e;}var d=b.getLowestSetBit(),f=h.getLowestSetBit();if(f<0){return b}if(d<f){f=d;}if(f>0){b.rShiftTo(f,b);h.rShiftTo(f,h);}while(b.signum()>0){if((d=b.getLowestSetBit())>0){b.rShiftTo(d,b);}if((d=h.getLowestSetBit())>0){h.rShiftTo(d,h);}if(b.compareTo(h)>=0){b.subTo(h,b);b.rShiftTo(1,b);}else{h.subTo(b,h);h.rShiftTo(1,h);}}if(f>0){h.lShiftTo(f,h);}return h}function bnpModInt(e){if(e<=0){return 0}var c=this.DV%e,b=(this.s<0)?e-1:0;if(this.t>0){if(c==0){b=this[0]%e;}else{for(var a=this.t-1;a>=0;--a){b=(c*b+this[a])%e;}}}return b}function bnModInverse(f){var j=f.isEven();if((this.isEven()&&j)||f.signum()==0){return BigInteger.ZERO}var i=f.clone(),h=this.clone();var g=nbv(1),e=nbv(0),l=nbv(0),k=nbv(1);while(i.signum()!=0){while(i.isEven()){i.rShiftTo(1,i);if(j){if(!g.isEven()||!e.isEven()){g.addTo(this,g);e.subTo(f,e);}g.rShiftTo(1,g);}else{if(!e.isEven()){e.subTo(f,e);}}e.rShiftTo(1,e);}while(h.isEven()){h.rShiftTo(1,h);if(j){if(!l.isEven()||!k.isEven()){l.addTo(this,l);k.subTo(f,k);}l.rShiftTo(1,l);}else{if(!k.isEven()){k.subTo(f,k);}}k.rShiftTo(1,k);}if(i.compareTo(h)>=0){i.subTo(h,i);if(j){g.subTo(l,g);}e.subTo(k,e);}else{h.subTo(i,h);if(j){l.subTo(g,l);}k.subTo(e,k);}}if(h.compareTo(BigInteger.ONE)!=0){return BigInteger.ZERO}if(k.compareTo(f)>=0){return k.subtract(f)}if(k.signum()<0){k.addTo(f,k);}else{return k}if(k.signum()<0){return k.add(f)}else{return k}}var lowprimes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];var lplim=(1<<26)/lowprimes[lowprimes.length-1];function bnIsProbablePrime(e){var d,b=this.abs();if(b.t==1&&b[0]<=lowprimes[lowprimes.length-1]){for(d=0;d<lowprimes.length;++d){if(b[0]==lowprimes[d]){return true}}return false}if(b.isEven()){return false}d=1;while(d<lowprimes.length){var a=lowprimes[d],c=d+1;while(c<lowprimes.length&&a<lplim){a*=lowprimes[c++];}a=b.modInt(a);while(d<c){if(a%lowprimes[d++]==0){return false}}}return b.millerRabin(e)}function bnpMillerRabin(f){var g=this.subtract(BigInteger.ONE);var c=g.getLowestSetBit();if(c<=0){return false}var h=g.shiftRight(c);f=(f+1)>>1;if(f>lowprimes.length){f=lowprimes.length;}var b=nbi();for(var e=0;e<f;++e){b.fromInt(lowprimes[Math.floor(Math.random()*lowprimes.length)]);var l=b.modPow(h,this);if(l.compareTo(BigInteger.ONE)!=0&&l.compareTo(g)!=0){var d=1;while(d++<c&&l.compareTo(g)!=0){l=l.modPowInt(2,this);if(l.compareTo(BigInteger.ONE)==0){return false}}if(l.compareTo(g)!=0){return false}}}return true}BigInteger.prototype.chunkSize=bnpChunkSize;BigInteger.prototype.toRadix=bnpToRadix;BigInteger.prototype.fromRadix=bnpFromRadix;BigInteger.prototype.fromNumber=bnpFromNumber;BigInteger.prototype.bitwiseTo=bnpBitwiseTo;BigInteger.prototype.changeBit=bnpChangeBit;BigInteger.prototype.addTo=bnpAddTo;BigInteger.prototype.dMultiply=bnpDMultiply;BigInteger.prototype.dAddOffset=bnpDAddOffset;BigInteger.prototype.multiplyLowerTo=bnpMultiplyLowerTo;BigInteger.prototype.multiplyUpperTo=bnpMultiplyUpperTo;BigInteger.prototype.modInt=bnpModInt;BigInteger.prototype.millerRabin=bnpMillerRabin;BigInteger.prototype.clone=bnClone;BigInteger.prototype.intValue=bnIntValue;BigInteger.prototype.byteValue=bnByteValue;BigInteger.prototype.shortValue=bnShortValue;BigInteger.prototype.signum=bnSigNum;BigInteger.prototype.toByteArray=bnToByteArray;BigInteger.prototype.equals=bnEquals;BigInteger.prototype.min=bnMin;BigInteger.prototype.max=bnMax;BigInteger.prototype.and=bnAnd;BigInteger.prototype.or=bnOr;BigInteger.prototype.xor=bnXor;BigInteger.prototype.andNot=bnAndNot;BigInteger.prototype.not=bnNot;BigInteger.prototype.shiftLeft=bnShiftLeft;BigInteger.prototype.shiftRight=bnShiftRight;BigInteger.prototype.getLowestSetBit=bnGetLowestSetBit;BigInteger.prototype.bitCount=bnBitCount;BigInteger.prototype.testBit=bnTestBit;BigInteger.prototype.setBit=bnSetBit;BigInteger.prototype.clearBit=bnClearBit;BigInteger.prototype.flipBit=bnFlipBit;BigInteger.prototype.add=bnAdd;BigInteger.prototype.subtract=bnSubtract;BigInteger.prototype.multiply=bnMultiply;BigInteger.prototype.divide=bnDivide;BigInteger.prototype.remainder=bnRemainder;BigInteger.prototype.divideAndRemainder=bnDivideAndRemainder;BigInteger.prototype.modPow=bnModPow;BigInteger.prototype.modInverse=bnModInverse;BigInteger.prototype.pow=bnPow;BigInteger.prototype.gcd=bnGCD;BigInteger.prototype.isProbablePrime=bnIsProbablePrime;BigInteger.prototype.square=bnSquare;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function Arcfour(){this.i=0;this.j=0;this.S=new Array();}function ARC4init(d){var c,a,b;for(c=0;c<256;++c){this.S[c]=c;}a=0;for(c=0;c<256;++c){a=(a+this.S[c]+d[c%d.length])&255;b=this.S[c];this.S[c]=this.S[a];this.S[a]=b;}this.i=0;this.j=0;}function ARC4next(){var a;this.i=(this.i+1)&255;this.j=(this.j+this.S[this.i])&255;a=this.S[this.i];this.S[this.i]=this.S[this.j];this.S[this.j]=a;return this.S[(a+this.S[this.i])&255]}Arcfour.prototype.init=ARC4init;Arcfour.prototype.next=ARC4next;function prng_newstate(){return new Arcfour()}var rng_psize=256;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var rng_state;var rng_pool;var rng_pptr;function rng_seed_int(a){rng_pool[rng_pptr++]^=a&255;rng_pool[rng_pptr++]^=(a>>8)&255;rng_pool[rng_pptr++]^=(a>>16)&255;rng_pool[rng_pptr++]^=(a>>24)&255;if(rng_pptr>=rng_psize){rng_pptr-=rng_psize;}}function rng_seed_time(){rng_seed_int(new Date().getTime());}if(rng_pool==null){rng_pool=new Array();rng_pptr=0;var t;if(window$1!==undefined&&(window$1.msCrypto!==undefined)){var crypto$1=window$1.msCrypto;if(crypto$1.getRandomValues){var ua=new Uint8Array(32);crypto$1.getRandomValues(ua);for(t=0;t<32;++t){rng_pool[rng_pptr++]=ua[t];}}}while(rng_pptr<rng_psize){t=Math.floor(65536*Math.random());rng_pool[rng_pptr++]=t>>>8;rng_pool[rng_pptr++]=t&255;}rng_pptr=0;rng_seed_time();}function rng_get_byte(){if(rng_state==null){rng_seed_time();rng_state=prng_newstate();rng_state.init(rng_pool);for(rng_pptr=0;rng_pptr<rng_pool.length;++rng_pptr){rng_pool[rng_pptr]=0;}rng_pptr=0;}return rng_state.next()}function rng_get_bytes(b){var a;for(a=0;a<b.length;++a){b[a]=rng_get_byte();}}function SecureRandom(){}SecureRandom.prototype.nextBytes=rng_get_bytes;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function parseBigInt(b,a){return new BigInteger(b,a)}function pkcs1pad2(e,h){if(h<e.length+11){throw"Message too long for RSA";return null}var g=new Array();var d=e.length-1;while(d>=0&&h>0){var f=e.charCodeAt(d--);if(f<128){g[--h]=f;}else{if((f>127)&&(f<2048)){g[--h]=(f&63)|128;g[--h]=(f>>6)|192;}else{g[--h]=(f&63)|128;g[--h]=((f>>6)&63)|128;g[--h]=(f>>12)|224;}}}g[--h]=0;var b=new SecureRandom();var a=new Array();while(h>2){a[0]=0;while(a[0]==0){b.nextBytes(a);}g[--h]=a[0];}g[--h]=2;g[--h]=0;return new BigInteger(g)}function oaep_mgf1_arr(c,a,e){var b="",d=0;while(b.length<a){b+=e(String.fromCharCode.apply(String,c.concat([(d&4278190080)>>24,(d&16711680)>>16,(d&65280)>>8,d&255])));d+=1;}return b}function oaep_pad(q,a,f,l){var c=KJUR.crypto.MessageDigest;var o=KJUR.crypto.Util;var b=null;if(!f){f="sha1";}if(typeof f==="string"){b=c.getCanonicalAlgName(f);l=c.getHashLength(b);f=function(i){return hextorstr(o.hashHex(rstrtohex(i),b))};}if(q.length+2*l+2>a){throw"Message too long for RSA"}var k="",e;for(e=0;e<a-q.length-2*l-2;e+=1){k+="\x00";}var h=f("")+k+"\x01"+q;var g=new Array(l);new SecureRandom().nextBytes(g);var j=oaep_mgf1_arr(g,h.length,f);var p=[];for(e=0;e<h.length;e+=1){p[e]=h.charCodeAt(e)^j.charCodeAt(e);}var m=oaep_mgf1_arr(p,g.length,f);var d=[0];for(e=0;e<g.length;e+=1){d[e+1]=g[e]^m.charCodeAt(e);}return new BigInteger(d.concat(p))}function RSAKey(){this.n=null;this.e=0;this.d=null;this.p=null;this.q=null;this.dmp1=null;this.dmq1=null;this.coeff=null;}function RSASetPublic(b,a){this.isPublic=true;this.isPrivate=false;if(typeof b!=="string"){this.n=b;this.e=a;}else{if(b!=null&&a!=null&&b.length>0&&a.length>0){this.n=parseBigInt(b,16);this.e=parseInt(a,16);}else{throw"Invalid RSA public key"}}}function RSADoPublic(a){return a.modPowInt(this.e,this.n)}function RSAEncrypt(d){var a=pkcs1pad2(d,(this.n.bitLength()+7)>>3);if(a==null){return null}var e=this.doPublic(a);if(e==null){return null}var b=e.toString(16);if((b.length&1)==0){return b}else{return "0"+b}}function RSAEncryptOAEP(f,e,b){var a=oaep_pad(f,(this.n.bitLength()+7)>>3,e,b);if(a==null){return null}var g=this.doPublic(a);if(g==null){return null}var d=g.toString(16);if((d.length&1)==0){return d}else{return "0"+d}}RSAKey.prototype.doPublic=RSADoPublic;RSAKey.prototype.setPublic=RSASetPublic;RSAKey.prototype.encrypt=RSAEncrypt;RSAKey.prototype.encryptOAEP=RSAEncryptOAEP;RSAKey.prototype.type="RSA";
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function pkcs1unpad2(g,j){var a=g.toByteArray();var f=0;while(f<a.length&&a[f]==0){++f;}if(a.length-f!=j-1||a[f]!=2){return null}++f;while(a[f]!=0){if(++f>=a.length){return null}}var e="";while(++f<a.length){var h=a[f]&255;if(h<128){e+=String.fromCharCode(h);}else{if((h>191)&&(h<224)){e+=String.fromCharCode(((h&31)<<6)|(a[f+1]&63));++f;}else{e+=String.fromCharCode(((h&15)<<12)|((a[f+1]&63)<<6)|(a[f+2]&63));f+=2;}}}return e}function oaep_mgf1_str(c,a,e){var b="",d=0;while(b.length<a){b+=e(c+String.fromCharCode.apply(String,[(d&4278190080)>>24,(d&16711680)>>16,(d&65280)>>8,d&255]));d+=1;}return b}function oaep_unpad(o,b,g,p){var e=KJUR.crypto.MessageDigest;var r=KJUR.crypto.Util;var c=null;if(!g){g="sha1";}if(typeof g==="string"){c=e.getCanonicalAlgName(g);p=e.getHashLength(c);g=function(d){return hextorstr(r.hashHex(rstrtohex(d),c))};}o=o.toByteArray();var h;for(h=0;h<o.length;h+=1){o[h]&=255;}while(o.length<b){o.unshift(0);}o=String.fromCharCode.apply(String,o);if(o.length<2*p+2){throw"Cipher too short"}var f=o.substr(1,p);var s=o.substr(p+1);var q=oaep_mgf1_str(s,p,g);var k=[],h;for(h=0;h<f.length;h+=1){k[h]=f.charCodeAt(h)^q.charCodeAt(h);}var l=oaep_mgf1_str(String.fromCharCode.apply(String,k),o.length-p,g);var j=[];for(h=0;h<s.length;h+=1){j[h]=s.charCodeAt(h)^l.charCodeAt(h);}j=String.fromCharCode.apply(String,j);if(j.substr(0,p)!==g("")){throw"Hash mismatch"}j=j.substr(p);var a=j.indexOf("\x01");var m=(a!=-1)?j.substr(0,a).lastIndexOf("\x00"):-1;if(m+1!=a){throw"Malformed data"}return j.substr(a+1)}function RSASetPrivate(c,a,b){this.isPrivate=true;if(typeof c!=="string"){this.n=c;this.e=a;this.d=b;}else{if(c!=null&&a!=null&&c.length>0&&a.length>0){this.n=parseBigInt(c,16);this.e=parseInt(a,16);this.d=parseBigInt(b,16);}else{throw"Invalid RSA private key"}}}function RSASetPrivateEx(g,d,e,c,b,a,h,f){this.isPrivate=true;this.isPublic=false;if(g==null){throw"RSASetPrivateEx N == null"}if(d==null){throw"RSASetPrivateEx E == null"}if(g.length==0){throw"RSASetPrivateEx N.length == 0"}if(d.length==0){throw"RSASetPrivateEx E.length == 0"}if(g!=null&&d!=null&&g.length>0&&d.length>0){this.n=parseBigInt(g,16);this.e=parseInt(d,16);this.d=parseBigInt(e,16);this.p=parseBigInt(c,16);this.q=parseBigInt(b,16);this.dmp1=parseBigInt(a,16);this.dmq1=parseBigInt(h,16);this.coeff=parseBigInt(f,16);}else{throw"Invalid RSA private key in RSASetPrivateEx"}}function RSAGenerate(b,i){var a=new SecureRandom();var f=b>>1;this.e=parseInt(i,16);var c=new BigInteger(i,16);for(;;){for(;;){this.p=new BigInteger(b-f,1,a);if(this.p.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE)==0&&this.p.isProbablePrime(10)){break}}for(;;){this.q=new BigInteger(f,1,a);if(this.q.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE)==0&&this.q.isProbablePrime(10)){break}}if(this.p.compareTo(this.q)<=0){var h=this.p;this.p=this.q;this.q=h;}var g=this.p.subtract(BigInteger.ONE);var d=this.q.subtract(BigInteger.ONE);var e=g.multiply(d);if(e.gcd(c).compareTo(BigInteger.ONE)==0){this.n=this.p.multiply(this.q);this.d=c.modInverse(e);this.dmp1=this.d.mod(g);this.dmq1=this.d.mod(d);this.coeff=this.q.modInverse(this.p);break}}this.isPrivate=true;}function RSADoPrivate(a){if(this.p==null||this.q==null){return a.modPow(this.d,this.n)}var c=a.mod(this.p).modPow(this.dmp1,this.p);var b=a.mod(this.q).modPow(this.dmq1,this.q);while(c.compareTo(b)<0){c=c.add(this.p);}return c.subtract(b).multiply(this.coeff).mod(this.p).multiply(this.q).add(b)}function RSADecrypt(b){var d=parseBigInt(b,16);var a=this.doPrivate(d);if(a==null){return null}return pkcs1unpad2(a,(this.n.bitLength()+7)>>3)}function RSADecryptOAEP(e,d,b){var f=parseBigInt(e,16);var a=this.doPrivate(f);if(a==null){return null}return oaep_unpad(a,(this.n.bitLength()+7)>>3,d,b)}RSAKey.prototype.doPrivate=RSADoPrivate;RSAKey.prototype.setPrivate=RSASetPrivate;RSAKey.prototype.setPrivateEx=RSASetPrivateEx;RSAKey.prototype.generate=RSAGenerate;RSAKey.prototype.decrypt=RSADecrypt;RSAKey.prototype.decryptOAEP=RSADecryptOAEP;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function ECFieldElementFp(b,a){this.x=a;this.q=b;}function feFpEquals(a){if(a==this){return true}return(this.q.equals(a.q)&&this.x.equals(a.x))}function feFpToBigInteger(){return this.x}function feFpNegate(){return new ECFieldElementFp(this.q,this.x.negate().mod(this.q))}function feFpAdd(a){return new ECFieldElementFp(this.q,this.x.add(a.toBigInteger()).mod(this.q))}function feFpSubtract(a){return new ECFieldElementFp(this.q,this.x.subtract(a.toBigInteger()).mod(this.q))}function feFpMultiply(a){return new ECFieldElementFp(this.q,this.x.multiply(a.toBigInteger()).mod(this.q))}function feFpSquare(){return new ECFieldElementFp(this.q,this.x.square().mod(this.q))}function feFpDivide(a){return new ECFieldElementFp(this.q,this.x.multiply(a.toBigInteger().modInverse(this.q)).mod(this.q))}ECFieldElementFp.prototype.equals=feFpEquals;ECFieldElementFp.prototype.toBigInteger=feFpToBigInteger;ECFieldElementFp.prototype.negate=feFpNegate;ECFieldElementFp.prototype.add=feFpAdd;ECFieldElementFp.prototype.subtract=feFpSubtract;ECFieldElementFp.prototype.multiply=feFpMultiply;ECFieldElementFp.prototype.square=feFpSquare;ECFieldElementFp.prototype.divide=feFpDivide;function ECPointFp(c,a,d,b){this.curve=c;this.x=a;this.y=d;if(b==null){this.z=BigInteger.ONE;}else{this.z=b;}this.zinv=null;}function pointFpGetX(){if(this.zinv==null){this.zinv=this.z.modInverse(this.curve.q);}return this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))}function pointFpGetY(){if(this.zinv==null){this.zinv=this.z.modInverse(this.curve.q);}return this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))}function pointFpEquals(a){if(a==this){return true}if(this.isInfinity()){return a.isInfinity()}if(a.isInfinity()){return this.isInfinity()}var c,b;c=a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q);if(!c.equals(BigInteger.ZERO)){return false}b=a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q);return b.equals(BigInteger.ZERO)}function pointFpIsInfinity(){if((this.x==null)&&(this.y==null)){return true}return this.z.equals(BigInteger.ZERO)&&!this.y.toBigInteger().equals(BigInteger.ZERO)}function pointFpNegate(){return new ECPointFp(this.curve,this.x,this.y.negate(),this.z)}function pointFpAdd(l){if(this.isInfinity()){return l}if(l.isInfinity()){return this}var p=l.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(l.z)).mod(this.curve.q);var o=l.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(l.z)).mod(this.curve.q);if(BigInteger.ZERO.equals(o)){if(BigInteger.ZERO.equals(p)){return this.twice()}return this.curve.getInfinity()}var j=new BigInteger("3");var e=this.x.toBigInteger();var n=this.y.toBigInteger();var c=l.x.toBigInteger();var k=l.y.toBigInteger();var m=o.square();var i=m.multiply(o);var d=e.multiply(m);var g=p.square().multiply(this.z);var a=g.subtract(d.shiftLeft(1)).multiply(l.z).subtract(i).multiply(o).mod(this.curve.q);var h=d.multiply(j).multiply(p).subtract(n.multiply(i)).subtract(g.multiply(p)).multiply(l.z).add(p.multiply(i)).mod(this.curve.q);var f=i.multiply(this.z).multiply(l.z).mod(this.curve.q);return new ECPointFp(this.curve,this.curve.fromBigInteger(a),this.curve.fromBigInteger(h),f)}function pointFpTwice(){if(this.isInfinity()){return this}if(this.y.toBigInteger().signum()==0){return this.curve.getInfinity()}var g=new BigInteger("3");var c=this.x.toBigInteger();var h=this.y.toBigInteger();var e=h.multiply(this.z);var j=e.multiply(h).mod(this.curve.q);var i=this.curve.a.toBigInteger();var k=c.square().multiply(g);if(!BigInteger.ZERO.equals(i)){k=k.add(this.z.square().multiply(i));}k=k.mod(this.curve.q);var b=k.square().subtract(c.shiftLeft(3).multiply(j)).shiftLeft(1).multiply(e).mod(this.curve.q);var f=k.multiply(g).multiply(c).subtract(j.shiftLeft(1)).shiftLeft(2).multiply(j).subtract(k.square().multiply(k)).mod(this.curve.q);var d=e.square().multiply(e).shiftLeft(3).mod(this.curve.q);return new ECPointFp(this.curve,this.curve.fromBigInteger(b),this.curve.fromBigInteger(f),d)}function pointFpMultiply(b){if(this.isInfinity()){return this}if(b.signum()==0){return this.curve.getInfinity()}var g=b;var f=g.multiply(new BigInteger("3"));var l=this.negate();var d=this;var c;for(c=f.bitLength()-2;c>0;--c){d=d.twice();var a=f.testBit(c);var j=g.testBit(c);if(a!=j){d=d.add(a?this:l);}}return d}function pointFpMultiplyTwo(c,a,b){var d;if(c.bitLength()>b.bitLength()){d=c.bitLength()-1;}else{d=b.bitLength()-1;}var f=this.curve.getInfinity();var e=this.add(a);while(d>=0){f=f.twice();if(c.testBit(d)){if(b.testBit(d)){f=f.add(e);}else{f=f.add(this);}}else{if(b.testBit(d)){f=f.add(a);}}--d;}return f}ECPointFp.prototype.getX=pointFpGetX;ECPointFp.prototype.getY=pointFpGetY;ECPointFp.prototype.equals=pointFpEquals;ECPointFp.prototype.isInfinity=pointFpIsInfinity;ECPointFp.prototype.negate=pointFpNegate;ECPointFp.prototype.add=pointFpAdd;ECPointFp.prototype.twice=pointFpTwice;ECPointFp.prototype.multiply=pointFpMultiply;ECPointFp.prototype.multiplyTwo=pointFpMultiplyTwo;function ECCurveFp(e,d,c){this.q=e;this.a=this.fromBigInteger(d);this.b=this.fromBigInteger(c);this.infinity=new ECPointFp(this,null,null);}function curveFpGetQ(){return this.q}function curveFpGetA(){return this.a}function curveFpGetB(){return this.b}function curveFpEquals(a){if(a==this){return true}return(this.q.equals(a.q)&&this.a.equals(a.a)&&this.b.equals(a.b))}function curveFpGetInfinity(){return this.infinity}function curveFpFromBigInteger(a){return new ECFieldElementFp(this.q,a)}function curveFpDecodePointHex(d){switch(parseInt(d.substr(0,2),16)){case 0:return this.infinity;case 2:case 3:return null;case 4:case 6:case 7:var a=(d.length-2)/2;var c=d.substr(2,a);var b=d.substr(a+2,a);return new ECPointFp(this,this.fromBigInteger(new BigInteger(c,16)),this.fromBigInteger(new BigInteger(b,16)));default:return null}}ECCurveFp.prototype.getQ=curveFpGetQ;ECCurveFp.prototype.getA=curveFpGetA;ECCurveFp.prototype.getB=curveFpGetB;ECCurveFp.prototype.equals=curveFpEquals;ECCurveFp.prototype.getInfinity=curveFpGetInfinity;ECCurveFp.prototype.fromBigInteger=curveFpFromBigInteger;ECCurveFp.prototype.decodePointHex=curveFpDecodePointHex;
/*! (c) Stefan Thomas | https://github.com/bitcoinjs/bitcoinjs-lib
 */
ECFieldElementFp.prototype.getByteLength=function(){return Math.floor((this.toBigInteger().bitLength()+7)/8)};ECPointFp.prototype.getEncoded=function(c){var d=function(h,f){var g=h.toByteArrayUnsigned();if(f<g.length){g=g.slice(g.length-f);}else{while(f>g.length){g.unshift(0);}}return g};var a=this.getX().toBigInteger();var e=this.getY().toBigInteger();var b=d(a,32);if(c){if(e.isEven()){b.unshift(2);}else{b.unshift(3);}}else{b.unshift(4);b=b.concat(d(e,32));}return b};ECPointFp.decodeFrom=function(g,c){var e=c.length-1;var d=c.slice(1,1+e/2);var b=c.slice(1+e/2,1+e);d.unshift(0);b.unshift(0);var a=new BigInteger(d);var h=new BigInteger(b);return new ECPointFp(g,g.fromBigInteger(a),g.fromBigInteger(h))};ECPointFp.decodeFromHex=function(g,c){var f=c.substr(0,2);var e=c.length-2;var d=c.substr(2,e/2);var b=c.substr(2+e/2,e/2);var a=new BigInteger(d,16);var h=new BigInteger(b,16);return new ECPointFp(g,g.fromBigInteger(a),g.fromBigInteger(h))};ECPointFp.prototype.add2D=function(c){if(this.isInfinity()){return c}if(c.isInfinity()){return this}if(this.x.equals(c.x)){if(this.y.equals(c.y)){return this.twice()}return this.curve.getInfinity()}var g=c.x.subtract(this.x);var e=c.y.subtract(this.y);var a=e.divide(g);var d=a.square().subtract(this.x).subtract(c.x);var f=a.multiply(this.x.subtract(d)).subtract(this.y);return new ECPointFp(this.curve,d,f)};ECPointFp.prototype.twice2D=function(){if(this.isInfinity()){return this}if(this.y.toBigInteger().signum()==0){return this.curve.getInfinity()}var b=this.curve.fromBigInteger(BigInteger.valueOf(2));var e=this.curve.fromBigInteger(BigInteger.valueOf(3));var a=this.x.square().multiply(e).add(this.curve.a).divide(this.y.multiply(b));var c=a.square().subtract(this.x.multiply(b));var d=a.multiply(this.x.subtract(c)).subtract(this.y);return new ECPointFp(this.curve,c,d)};ECPointFp.prototype.multiply2D=function(b){if(this.isInfinity()){return this}if(b.signum()==0){return this.curve.getInfinity()}var g=b;var f=g.multiply(new BigInteger("3"));var l=this.negate();var d=this;var c;for(c=f.bitLength()-2;c>0;--c){d=d.twice();var a=f.testBit(c);var j=g.testBit(c);if(a!=j){d=d.add2D(a?this:l);}}return d};ECPointFp.prototype.isOnCurve=function(){var d=this.getX().toBigInteger();var i=this.getY().toBigInteger();var f=this.curve.getA().toBigInteger();var c=this.curve.getB().toBigInteger();var h=this.curve.getQ();var e=i.multiply(i).mod(h);var g=d.multiply(d).multiply(d).add(f.multiply(d)).add(c).mod(h);return e.equals(g)};ECPointFp.prototype.toString=function(){return "("+this.getX().toBigInteger().toString()+","+this.getY().toBigInteger().toString()+")"};ECPointFp.prototype.validate=function(){var c=this.curve.getQ();if(this.isInfinity()){throw new Error("Point is at infinity.")}var a=this.getX().toBigInteger();var b=this.getY().toBigInteger();if(a.compareTo(BigInteger.ONE)<0||a.compareTo(c.subtract(BigInteger.ONE))>0){throw new Error("x coordinate out of bounds")}if(b.compareTo(BigInteger.ONE)<0||b.compareTo(c.subtract(BigInteger.ONE))>0){throw new Error("y coordinate out of bounds")}if(!this.isOnCurve()){throw new Error("Point is not on the curve.")}if(this.multiply(c).isInfinity()){throw new Error("Point is not a scalar multiple of G.")}return true};
/*! Mike Samuel (c) 2009 | code.google.com/p/json-sans-eval
 */
var jsonParse=(function(){var e="(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";var j='(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';var i='(?:"'+j+'*")';var d=new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|"+e+"|"+i+")","g");var k=new RegExp("\\\\(?:([^u])|u(.{4}))","g");var g={'"':'"',"/":"/","\\":"\\",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"};function h(l,m,n){return m?g[m]:String.fromCharCode(parseInt(n,16))}var c=new String("");var a="\\";var b=Object.hasOwnProperty;return function(u,q){var p=u.match(d);var x;var v=p[0];var l=false;if("{"===v){x={};}else{if("["===v){x=[];}else{x=[];l=true;}}var t;var r=[x];for(var o=1-l,m=p.length;o<m;++o){v=p[o];var w;switch(v.charCodeAt(0)){default:w=r[0];w[t||w.length]=+(v);t=void 0;break;case 34:v=v.substring(1,v.length-1);if(v.indexOf(a)!==-1){v=v.replace(k,h);}w=r[0];if(!t){if(w instanceof Array){t=w.length;}else{t=v||c;break}}w[t]=v;t=void 0;break;case 91:w=r[0];r.unshift(w[t||w.length]=[]);t=void 0;break;case 93:r.shift();break;case 102:w=r[0];w[t||w.length]=false;t=void 0;break;case 110:w=r[0];w[t||w.length]=null;t=void 0;break;case 116:w=r[0];w[t||w.length]=true;t=void 0;break;case 123:w=r[0];r.unshift(w[t||w.length]={});t=void 0;break;case 125:r.shift();break}}if(l){if(r.length!==1){throw new Error()}x=x[0];}else{if(r.length){throw new Error()}}if(q){var s=function(C,B){var D=C[B];if(D&&typeof D==="object"){var n=null;for(var z in D){if(b.call(D,z)&&D!==C){var y=s(D,z);if(y!==void 0){D[z]=y;}else{if(!n){n=[];}n.push(z);}}}if(n){for(var A=n.length;--A>=0;){delete D[n[A]];}}}return q.call(C,B,D)};x=s({"":x},"");}return x}})();
if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={};}KJUR.asn1.ASN1Util=new function(){this.integerToByteHex=function(a){var b=a.toString(16);if((b.length%2)==1){b="0"+b;}return b};this.bigIntToMinTwosComplementsHex=function(j){var f=j.toString(16);if(f.substr(0,1)!="-"){if(f.length%2==1){f="0"+f;}else{if(!f.match(/^[0-7]/)){f="00"+f;}}}else{var a=f.substr(1);var e=a.length;if(e%2==1){e+=1;}else{if(!f.match(/^[0-7]/)){e+=2;}}var g="";for(var d=0;d<e;d++){g+="f";}var c=new BigInteger(g,16);var b=c.xor(j).add(BigInteger.ONE);f=b.toString(16).replace(/^-/,"");}return f};this.getPEMStringFromHex=function(a,b){return hextopem(a,b)};this.newObject=function(k){var D=KJUR,n=D.asn1,z=n.DERBoolean,e=n.DERInteger,s=n.DERBitString,h=n.DEROctetString,v=n.DERNull,w=n.DERObjectIdentifier,l=n.DEREnumerated,g=n.DERUTF8String,f=n.DERNumericString,y=n.DERPrintableString,u=n.DERTeletexString,p=n.DERIA5String,C=n.DERUTCTime,j=n.DERGeneralizedTime,m=n.DERSequence,c=n.DERSet,r=n.DERTaggedObject,o=n.ASN1Util.newObject;var t=Object.keys(k);if(t.length!=1){throw"key of param shall be only one."}var F=t[0];if(":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":"+F+":")==-1){throw"undefined key: "+F}if(F=="bool"){return new z(k[F])}if(F=="int"){return new e(k[F])}if(F=="bitstr"){return new s(k[F])}if(F=="octstr"){return new h(k[F])}if(F=="null"){return new v(k[F])}if(F=="oid"){return new w(k[F])}if(F=="enum"){return new l(k[F])}if(F=="utf8str"){return new g(k[F])}if(F=="numstr"){return new f(k[F])}if(F=="prnstr"){return new y(k[F])}if(F=="telstr"){return new u(k[F])}if(F=="ia5str"){return new p(k[F])}if(F=="utctime"){return new C(k[F])}if(F=="gentime"){return new j(k[F])}if(F=="seq"){var d=k[F];var E=[];for(var x=0;x<d.length;x++){var B=o(d[x]);E.push(B);}return new m({array:E})}if(F=="set"){var d=k[F];var E=[];for(var x=0;x<d.length;x++){var B=o(d[x]);E.push(B);}return new c({array:E})}if(F=="tag"){var A=k[F];if(Object.prototype.toString.call(A)==="[object Array]"&&A.length==3){var q=o(A[2]);return new r({tag:A[0],explicit:A[1],obj:q})}else{var b={};if(A.explicit!==undefined){b.explicit=A.explicit;}if(A.tag!==undefined){b.tag=A.tag;}if(A.obj===undefined){throw"obj shall be specified for 'tag'."}b.obj=o(A.obj);return new r(b)}}};this.jsonToASN1HEX=function(b){var a=this.newObject(b);return a.getEncodedHex()};};KJUR.asn1.ASN1Util.oidHexToInt=function(a){var j="";var k=parseInt(a.substr(0,2),16);var d=Math.floor(k/40);var c=k%40;var j=d+"."+c;var e="";for(var f=2;f<a.length;f+=2){var g=parseInt(a.substr(f,2),16);var h=("00000000"+g.toString(2)).slice(-8);e=e+h.substr(1,7);if(h.substr(0,1)=="0"){var b=new BigInteger(e,2);j=j+"."+b.toString(10);e="";}}return j};KJUR.asn1.ASN1Util.oidIntToHex=function(f){var e=function(a){var k=a.toString(16);if(k.length==1){k="0"+k;}return k};var d=function(o){var n="";var k=new BigInteger(o,10);var a=k.toString(2);var l=7-a.length%7;if(l==7){l=0;}var q="";for(var m=0;m<l;m++){q+="0";}a=q+a;for(var m=0;m<a.length-1;m+=7){var p=a.substr(m,7);if(m!=a.length-7){p="1"+p;}n+=e(parseInt(p,2));}return n};if(!f.match(/^[0-9.]+$/)){throw"malformed oid string: "+f}var g="";var b=f.split(".");var j=parseInt(b[0])*40+parseInt(b[1]);g+=e(j);b.splice(0,2);for(var c=0;c<b.length;c++){g+=d(b[c]);}return g};KJUR.asn1.ASN1Object=function(){var a="";this.getLengthHexFromValue=function(){if(typeof this.hV=="undefined"||this.hV==null){throw"this.hV is null or undefined."}if(this.hV.length%2==1){throw"value hex must be even length: n="+a.length+",v="+this.hV}var i=this.hV.length/2;var h=i.toString(16);if(h.length%2==1){h="0"+h;}if(i<128){return h}else{var g=h.length/2;if(g>15){throw"ASN.1 length too long to represent by 8x: n = "+i.toString(16)}var f=128+g;return f.toString(16)+h}};this.getEncodedHex=function(){if(this.hTLV==null||this.isModified){this.hV=this.getFreshValueHex();this.hL=this.getLengthHexFromValue();this.hTLV=this.hT+this.hL+this.hV;this.isModified=false;}return this.hTLV};this.getValueHex=function(){this.getEncodedHex();return this.hV};this.getFreshValueHex=function(){return ""};};KJUR.asn1.DERAbstractString=function(c){KJUR.asn1.DERAbstractString.superclass.constructor.call(this);this.getString=function(){return this.s};this.setString=function(d){this.hTLV=null;this.isModified=true;this.s=d;this.hV=utf8tohex(this.s).toLowerCase();};this.setStringHex=function(d){this.hTLV=null;this.isModified=true;this.s=null;this.hV=d;};this.getFreshValueHex=function(){return this.hV};if(typeof c!="undefined"){if(typeof c=="string"){this.setString(c);}else{if(typeof c.str!="undefined"){this.setString(c.str);}else{if(typeof c.hex!="undefined"){this.setStringHex(c.hex);}}}}};YAHOO.lang.extend(KJUR.asn1.DERAbstractString,KJUR.asn1.ASN1Object);KJUR.asn1.DERAbstractTime=function(c){KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);this.localDateToUTC=function(f){utc=f.getTime()+(f.getTimezoneOffset()*60000);var e=new Date(utc);return e};this.formatDate=function(m,o,e){var g=this.zeroPadding;var n=this.localDateToUTC(m);var p=String(n.getFullYear());if(o=="utc"){p=p.substr(2,2);}var l=g(String(n.getMonth()+1),2);var q=g(String(n.getDate()),2);var h=g(String(n.getHours()),2);var i=g(String(n.getMinutes()),2);var j=g(String(n.getSeconds()),2);var r=p+l+q+h+i+j;if(e===true){var f=n.getMilliseconds();if(f!=0){var k=g(String(f),3);k=k.replace(/[0]+$/,"");r=r+"."+k;}}return r+"Z"};this.zeroPadding=function(e,d){if(e.length>=d){return e}return new Array(d-e.length+1).join("0")+e};this.getString=function(){return this.s};this.setString=function(d){this.hTLV=null;this.isModified=true;this.s=d;this.hV=stohex(d);};this.setByDateValue=function(h,j,e,d,f,g){var i=new Date(Date.UTC(h,j-1,e,d,f,g,0));this.setByDate(i);};this.getFreshValueHex=function(){return this.hV};};YAHOO.lang.extend(KJUR.asn1.DERAbstractTime,KJUR.asn1.ASN1Object);KJUR.asn1.DERAbstractStructured=function(b){KJUR.asn1.DERAbstractString.superclass.constructor.call(this);this.setByASN1ObjectArray=function(c){this.hTLV=null;this.isModified=true;this.asn1Array=c;};this.appendASN1Object=function(c){this.hTLV=null;this.isModified=true;this.asn1Array.push(c);};this.asn1Array=new Array();if(typeof b!="undefined"){if(typeof b.array!="undefined"){this.asn1Array=b.array;}}};YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured,KJUR.asn1.ASN1Object);KJUR.asn1.DERBoolean=function(){KJUR.asn1.DERBoolean.superclass.constructor.call(this);this.hT="01";this.hTLV="0101ff";};YAHOO.lang.extend(KJUR.asn1.DERBoolean,KJUR.asn1.ASN1Object);KJUR.asn1.DERInteger=function(a){KJUR.asn1.DERInteger.superclass.constructor.call(this);this.hT="02";this.setByBigInteger=function(b){this.hTLV=null;this.isModified=true;this.hV=KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(b);};this.setByInteger=function(c){var b=new BigInteger(String(c),10);this.setByBigInteger(b);};this.setValueHex=function(b){this.hV=b;};this.getFreshValueHex=function(){return this.hV};if(typeof a!="undefined"){if(typeof a.bigint!="undefined"){this.setByBigInteger(a.bigint);}else{if(typeof a["int"]!="undefined"){this.setByInteger(a["int"]);}else{if(typeof a=="number"){this.setByInteger(a);}else{if(typeof a.hex!="undefined"){this.setValueHex(a.hex);}}}}}};YAHOO.lang.extend(KJUR.asn1.DERInteger,KJUR.asn1.ASN1Object);KJUR.asn1.DERBitString=function(b){if(b!==undefined&&typeof b.obj!=="undefined"){var a=KJUR.asn1.ASN1Util.newObject(b.obj);b.hex="00"+a.getEncodedHex();}KJUR.asn1.DERBitString.superclass.constructor.call(this);this.hT="03";this.setHexValueIncludingUnusedBits=function(c){this.hTLV=null;this.isModified=true;this.hV=c;};this.setUnusedBitsAndHexValue=function(c,e){if(c<0||7<c){throw"unused bits shall be from 0 to 7: u = "+c}var d="0"+c;this.hTLV=null;this.isModified=true;this.hV=d+e;};this.setByBinaryString=function(e){e=e.replace(/0+$/,"");var f=8-e.length%8;if(f==8){f=0;}for(var g=0;g<=f;g++){e+="0";}var j="";for(var g=0;g<e.length-1;g+=8){var d=e.substr(g,8);var c=parseInt(d,2).toString(16);if(c.length==1){c="0"+c;}j+=c;}this.hTLV=null;this.isModified=true;this.hV="0"+f+j;};this.setByBooleanArray=function(e){var d="";for(var c=0;c<e.length;c++){if(e[c]==true){d+="1";}else{d+="0";}}this.setByBinaryString(d);};this.newFalseArray=function(e){var c=new Array(e);for(var d=0;d<e;d++){c[d]=false;}return c};this.getFreshValueHex=function(){return this.hV};if(typeof b!="undefined"){if(typeof b=="string"&&b.toLowerCase().match(/^[0-9a-f]+$/)){this.setHexValueIncludingUnusedBits(b);}else{if(typeof b.hex!="undefined"){this.setHexValueIncludingUnusedBits(b.hex);}else{if(typeof b.bin!="undefined"){this.setByBinaryString(b.bin);}else{if(typeof b.array!="undefined"){this.setByBooleanArray(b.array);}}}}}};YAHOO.lang.extend(KJUR.asn1.DERBitString,KJUR.asn1.ASN1Object);KJUR.asn1.DEROctetString=function(b){if(b!==undefined&&typeof b.obj!=="undefined"){var a=KJUR.asn1.ASN1Util.newObject(b.obj);b.hex=a.getEncodedHex();}KJUR.asn1.DEROctetString.superclass.constructor.call(this,b);this.hT="04";};YAHOO.lang.extend(KJUR.asn1.DEROctetString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERNull=function(){KJUR.asn1.DERNull.superclass.constructor.call(this);this.hT="05";this.hTLV="0500";};YAHOO.lang.extend(KJUR.asn1.DERNull,KJUR.asn1.ASN1Object);KJUR.asn1.DERObjectIdentifier=function(c){var b=function(d){var e=d.toString(16);if(e.length==1){e="0"+e;}return e};var a=function(k){var j="";var e=new BigInteger(k,10);var d=e.toString(2);var f=7-d.length%7;if(f==7){f=0;}var m="";for(var g=0;g<f;g++){m+="0";}d=m+d;for(var g=0;g<d.length-1;g+=7){var l=d.substr(g,7);if(g!=d.length-7){l="1"+l;}j+=b(parseInt(l,2));}return j};KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);this.hT="06";this.setValueHex=function(d){this.hTLV=null;this.isModified=true;this.s=null;this.hV=d;};this.setValueOidString=function(f){if(!f.match(/^[0-9.]+$/)){throw"malformed oid string: "+f}var g="";var d=f.split(".");var j=parseInt(d[0])*40+parseInt(d[1]);g+=b(j);d.splice(0,2);for(var e=0;e<d.length;e++){g+=a(d[e]);}this.hTLV=null;this.isModified=true;this.s=null;this.hV=g;};this.setValueName=function(e){var d=KJUR.asn1.x509.OID.name2oid(e);if(d!==""){this.setValueOidString(d);}else{throw"DERObjectIdentifier oidName undefined: "+e}};this.getFreshValueHex=function(){return this.hV};if(c!==undefined){if(typeof c==="string"){if(c.match(/^[0-2].[0-9.]+$/)){this.setValueOidString(c);}else{this.setValueName(c);}}else{if(c.oid!==undefined){this.setValueOidString(c.oid);}else{if(c.hex!==undefined){this.setValueHex(c.hex);}else{if(c.name!==undefined){this.setValueName(c.name);}}}}}};YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier,KJUR.asn1.ASN1Object);KJUR.asn1.DEREnumerated=function(a){KJUR.asn1.DEREnumerated.superclass.constructor.call(this);this.hT="0a";this.setByBigInteger=function(b){this.hTLV=null;this.isModified=true;this.hV=KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(b);};this.setByInteger=function(c){var b=new BigInteger(String(c),10);this.setByBigInteger(b);};this.setValueHex=function(b){this.hV=b;};this.getFreshValueHex=function(){return this.hV};if(typeof a!="undefined"){if(typeof a["int"]!="undefined"){this.setByInteger(a["int"]);}else{if(typeof a=="number"){this.setByInteger(a);}else{if(typeof a.hex!="undefined"){this.setValueHex(a.hex);}}}}};YAHOO.lang.extend(KJUR.asn1.DEREnumerated,KJUR.asn1.ASN1Object);KJUR.asn1.DERUTF8String=function(a){KJUR.asn1.DERUTF8String.superclass.constructor.call(this,a);this.hT="0c";};YAHOO.lang.extend(KJUR.asn1.DERUTF8String,KJUR.asn1.DERAbstractString);KJUR.asn1.DERNumericString=function(a){KJUR.asn1.DERNumericString.superclass.constructor.call(this,a);this.hT="12";};YAHOO.lang.extend(KJUR.asn1.DERNumericString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERPrintableString=function(a){KJUR.asn1.DERPrintableString.superclass.constructor.call(this,a);this.hT="13";};YAHOO.lang.extend(KJUR.asn1.DERPrintableString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERTeletexString=function(a){KJUR.asn1.DERTeletexString.superclass.constructor.call(this,a);this.hT="14";};YAHOO.lang.extend(KJUR.asn1.DERTeletexString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERIA5String=function(a){KJUR.asn1.DERIA5String.superclass.constructor.call(this,a);this.hT="16";};YAHOO.lang.extend(KJUR.asn1.DERIA5String,KJUR.asn1.DERAbstractString);KJUR.asn1.DERUTCTime=function(a){KJUR.asn1.DERUTCTime.superclass.constructor.call(this,a);this.hT="17";this.setByDate=function(b){this.hTLV=null;this.isModified=true;this.date=b;this.s=this.formatDate(this.date,"utc");this.hV=stohex(this.s);};this.getFreshValueHex=function(){if(typeof this.date=="undefined"&&typeof this.s=="undefined"){this.date=new Date();this.s=this.formatDate(this.date,"utc");this.hV=stohex(this.s);}return this.hV};if(a!==undefined){if(a.str!==undefined){this.setString(a.str);}else{if(typeof a=="string"&&a.match(/^[0-9]{12}Z$/)){this.setString(a);}else{if(a.hex!==undefined){this.setStringHex(a.hex);}else{if(a.date!==undefined){this.setByDate(a.date);}}}}}};YAHOO.lang.extend(KJUR.asn1.DERUTCTime,KJUR.asn1.DERAbstractTime);KJUR.asn1.DERGeneralizedTime=function(a){KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this,a);this.hT="18";this.withMillis=false;this.setByDate=function(b){this.hTLV=null;this.isModified=true;this.date=b;this.s=this.formatDate(this.date,"gen",this.withMillis);this.hV=stohex(this.s);};this.getFreshValueHex=function(){if(this.date===undefined&&this.s===undefined){this.date=new Date();this.s=this.formatDate(this.date,"gen",this.withMillis);this.hV=stohex(this.s);}return this.hV};if(a!==undefined){if(a.str!==undefined){this.setString(a.str);}else{if(typeof a=="string"&&a.match(/^[0-9]{14}Z$/)){this.setString(a);}else{if(a.hex!==undefined){this.setStringHex(a.hex);}else{if(a.date!==undefined){this.setByDate(a.date);}}}}if(a.millis===true){this.withMillis=true;}}};YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime,KJUR.asn1.DERAbstractTime);KJUR.asn1.DERSequence=function(a){KJUR.asn1.DERSequence.superclass.constructor.call(this,a);this.hT="30";this.getFreshValueHex=function(){var c="";for(var b=0;b<this.asn1Array.length;b++){var d=this.asn1Array[b];c+=d.getEncodedHex();}this.hV=c;return this.hV};};YAHOO.lang.extend(KJUR.asn1.DERSequence,KJUR.asn1.DERAbstractStructured);KJUR.asn1.DERSet=function(a){KJUR.asn1.DERSet.superclass.constructor.call(this,a);this.hT="31";this.sortFlag=true;this.getFreshValueHex=function(){var b=new Array();for(var c=0;c<this.asn1Array.length;c++){var d=this.asn1Array[c];b.push(d.getEncodedHex());}if(this.sortFlag==true){b.sort();}this.hV=b.join("");return this.hV};if(typeof a!="undefined"){if(typeof a.sortflag!="undefined"&&a.sortflag==false){this.sortFlag=false;}}};YAHOO.lang.extend(KJUR.asn1.DERSet,KJUR.asn1.DERAbstractStructured);KJUR.asn1.DERTaggedObject=function(a){KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);this.hT="a0";this.hV="";this.isExplicit=true;this.asn1Object=null;this.setASN1Object=function(b,c,d){this.hT=c;this.isExplicit=b;this.asn1Object=d;if(this.isExplicit){this.hV=this.asn1Object.getEncodedHex();this.hTLV=null;this.isModified=true;}else{this.hV=null;this.hTLV=d.getEncodedHex();this.hTLV=this.hTLV.replace(/^../,c);this.isModified=false;}};this.getFreshValueHex=function(){return this.hV};if(typeof a!="undefined"){if(typeof a.tag!="undefined"){this.hT=a.tag;}if(typeof a.explicit!="undefined"){this.isExplicit=a.explicit;}if(typeof a.obj!="undefined"){this.asn1Object=a.obj;this.setASN1Object(this.isExplicit,this.hT,this.asn1Object);}}};YAHOO.lang.extend(KJUR.asn1.DERTaggedObject,KJUR.asn1.ASN1Object);
var ASN1HEX=new function(){};ASN1HEX.getLblen=function(c,a){if(c.substr(a+2,1)!="8"){return 1}var b=parseInt(c.substr(a+3,1));if(b==0){return -1}if(0<b&&b<10){return b+1}return -2};ASN1HEX.getL=function(c,b){var a=ASN1HEX.getLblen(c,b);if(a<1){return ""}return c.substr(b+2,a*2)};ASN1HEX.getVblen=function(d,a){var c,b;c=ASN1HEX.getL(d,a);if(c==""){return -1}if(c.substr(0,1)==="8"){b=new BigInteger(c.substr(2),16);}else{b=new BigInteger(c,16);}return b.intValue()};ASN1HEX.getVidx=function(c,b){var a=ASN1HEX.getLblen(c,b);if(a<0){return a}return b+(a+1)*2};ASN1HEX.getV=function(d,a){var c=ASN1HEX.getVidx(d,a);var b=ASN1HEX.getVblen(d,a);return d.substr(c,b*2)};ASN1HEX.getTLV=function(b,a){return b.substr(a,2)+ASN1HEX.getL(b,a)+ASN1HEX.getV(b,a)};ASN1HEX.getNextSiblingIdx=function(d,a){var c=ASN1HEX.getVidx(d,a);var b=ASN1HEX.getVblen(d,a);return c+b*2};ASN1HEX.getChildIdx=function(e,f){var j=ASN1HEX;var g=new Array();var i=j.getVidx(e,f);if(e.substr(f,2)=="03"){g.push(i+2);}else{g.push(i);}var l=j.getVblen(e,f);var c=i;var d=0;while(1){var b=j.getNextSiblingIdx(e,c);if(b==null||(b-i>=(l*2))){break}if(d>=200){break}g.push(b);c=b;d++;}return g};ASN1HEX.getNthChildIdx=function(d,b,e){var c=ASN1HEX.getChildIdx(d,b);return c[e]};ASN1HEX.getIdxbyList=function(e,d,c,i){var g=ASN1HEX;var f,b;if(c.length==0){if(i!==undefined){if(e.substr(d,2)!==i){throw"checking tag doesn't match: "+e.substr(d,2)+"!="+i}}return d}f=c.shift();b=g.getChildIdx(e,d);return g.getIdxbyList(e,b[f],c,i)};ASN1HEX.getTLVbyList=function(d,c,b,f){var e=ASN1HEX;var a=e.getIdxbyList(d,c,b);if(a===undefined){throw"can't find nthList object"}if(f!==undefined){if(d.substr(a,2)!=f){throw"checking tag doesn't match: "+d.substr(a,2)+"!="+f}}return e.getTLV(d,a)};ASN1HEX.getVbyList=function(e,c,b,g,i){var f=ASN1HEX;var a,d;a=f.getIdxbyList(e,c,b,g);if(a===undefined){throw"can't find nthList object"}d=f.getV(e,a);if(i===true){d=d.substr(2);}return d};ASN1HEX.hextooidstr=function(e){var h=function(b,a){if(b.length>=a){return b}return new Array(a-b.length+1).join("0")+b};var l=[];var o=e.substr(0,2);var f=parseInt(o,16);l[0]=new String(Math.floor(f/40));l[1]=new String(f%40);var m=e.substr(2);var k=[];for(var g=0;g<m.length/2;g++){k.push(parseInt(m.substr(g*2,2),16));}var j=[];var d="";for(var g=0;g<k.length;g++){if(k[g]&128){d=d+h((k[g]&127).toString(2),7);}else{d=d+h((k[g]&127).toString(2),7);j.push(new String(parseInt(d,2)));d="";}}var n=l.join(".");if(j.length>0){n=n+"."+j.join(".");}return n};ASN1HEX.dump=function(t,c,l,g){var p=ASN1HEX;var j=p.getV;var y=p.dump;var w=p.getChildIdx;var e=t;if(t instanceof KJUR.asn1.ASN1Object){e=t.getEncodedHex();}var q=function(A,i){if(A.length<=i*2){return A}else{var v=A.substr(0,i)+"..(total "+A.length/2+"bytes).."+A.substr(A.length-i,i);return v}};if(c===undefined){c={ommit_long_octet:32};}if(l===undefined){l=0;}if(g===undefined){g="";}var x=c.ommit_long_octet;if(e.substr(l,2)=="01"){var h=j(e,l);if(h=="00"){return g+"BOOLEAN FALSE\n"}else{return g+"BOOLEAN TRUE\n"}}if(e.substr(l,2)=="02"){var h=j(e,l);return g+"INTEGER "+q(h,x)+"\n"}if(e.substr(l,2)=="03"){var h=j(e,l);return g+"BITSTRING "+q(h,x)+"\n"}if(e.substr(l,2)=="04"){var h=j(e,l);if(p.isASN1HEX(h)){var k=g+"OCTETSTRING, encapsulates\n";k=k+y(h,c,0,g+"  ");return k}else{return g+"OCTETSTRING "+q(h,x)+"\n"}}if(e.substr(l,2)=="05"){return g+"NULL\n"}if(e.substr(l,2)=="06"){var m=j(e,l);var a=KJUR.asn1.ASN1Util.oidHexToInt(m);var o=KJUR.asn1.x509.OID.oid2name(a);var b=a.replace(/\./g," ");if(o!=""){return g+"ObjectIdentifier "+o+" ("+b+")\n"}else{return g+"ObjectIdentifier ("+b+")\n"}}if(e.substr(l,2)=="0c"){return g+"UTF8String '"+hextoutf8(j(e,l))+"'\n"}if(e.substr(l,2)=="13"){return g+"PrintableString '"+hextoutf8(j(e,l))+"'\n"}if(e.substr(l,2)=="14"){return g+"TeletexString '"+hextoutf8(j(e,l))+"'\n"}if(e.substr(l,2)=="16"){return g+"IA5String '"+hextoutf8(j(e,l))+"'\n"}if(e.substr(l,2)=="17"){return g+"UTCTime "+hextoutf8(j(e,l))+"\n"}if(e.substr(l,2)=="18"){return g+"GeneralizedTime "+hextoutf8(j(e,l))+"\n"}if(e.substr(l,2)=="30"){if(e.substr(l,4)=="3000"){return g+"SEQUENCE {}\n"}var k=g+"SEQUENCE\n";var d=w(e,l);var f=c;if((d.length==2||d.length==3)&&e.substr(d[0],2)=="06"&&e.substr(d[d.length-1],2)=="04"){var o=p.oidname(j(e,d[0]));var r=JSON.parse(JSON.stringify(c));r.x509ExtName=o;f=r;}for(var u=0;u<d.length;u++){k=k+y(e,f,d[u],g+"  ");}return k}if(e.substr(l,2)=="31"){var k=g+"SET\n";var d=w(e,l);for(var u=0;u<d.length;u++){k=k+y(e,c,d[u],g+"  ");}return k}var z=parseInt(e.substr(l,2),16);if((z&128)!=0){var n=z&31;if((z&32)!=0){var k=g+"["+n+"]\n";var d=w(e,l);for(var u=0;u<d.length;u++){k=k+y(e,c,d[u],g+"  ");}return k}else{var h=j(e,l);if(h.substr(0,8)=="68747470"){h=hextoutf8(h);}if(c.x509ExtName==="subjectAltName"&&n==2){h=hextoutf8(h);}var k=g+"["+n+"] "+h+"\n";return k}}return g+"UNKNOWN("+e.substr(l,2)+") "+j(e,l)+"\n"};ASN1HEX.isASN1HEX=function(e){var d=ASN1HEX;if(e.length%2==1){return false}var c=d.getVblen(e,0);var b=e.substr(0,2);var f=d.getL(e,0);var a=e.length-b.length-f.length;if(a==c*2){return true}return false};ASN1HEX.oidname=function(a){var c=KJUR.asn1;if(KJUR.lang.String.isHex(a)){a=c.ASN1Util.oidHexToInt(a);}var b=c.x509.OID.oid2name(a);if(b===""){b=a;}return b};
if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={};}if(typeof KJUR.asn1.x509=="undefined"||!KJUR.asn1.x509){KJUR.asn1.x509={};}KJUR.asn1.x509.Certificate=function(e){KJUR.asn1.x509.Certificate.superclass.constructor.call(this);var b=KJUR,g=b.asn1,d=g.DERSequence,c=g.DERBitString;this.sign=function(){this.asn1SignatureAlg=this.asn1TBSCert.asn1SignatureAlg;var m=new KJUR.crypto.Signature({alg:this.asn1SignatureAlg.nameAlg});m.init(this.prvKey);m.updateHex(this.asn1TBSCert.getEncodedHex());this.hexSig=m.sign();this.asn1Sig=new c({hex:"00"+this.hexSig});var l=new d({array:[this.asn1TBSCert,this.asn1SignatureAlg,this.asn1Sig]});this.hTLV=l.getEncodedHex();this.isModified=false;};this.setSignatureHex=function(l){this.asn1SignatureAlg=this.asn1TBSCert.asn1SignatureAlg;this.hexSig=l;this.asn1Sig=new c({hex:"00"+this.hexSig});var m=new d({array:[this.asn1TBSCert,this.asn1SignatureAlg,this.asn1Sig]});this.hTLV=m.getEncodedHex();this.isModified=false;};this.getEncodedHex=function(){if(this.isModified==false&&this.hTLV!=null){return this.hTLV}throw"not signed yet"};this.getPEMString=function(){var l=hextob64nl(this.getEncodedHex());return "-----BEGIN CERTIFICATE-----\r\n"+l+"\r\n-----END CERTIFICATE-----\r\n"};if(e!==undefined){if(e.tbscertobj!==undefined){this.asn1TBSCert=e.tbscertobj;}if(e.prvkeyobj!==undefined){this.prvKey=e.prvkeyobj;}}};YAHOO.lang.extend(KJUR.asn1.x509.Certificate,KJUR.asn1.ASN1Object);KJUR.asn1.x509.TBSCertificate=function(e){KJUR.asn1.x509.TBSCertificate.superclass.constructor.call(this);var b=KJUR,i=b.asn1,f=i.DERSequence,h=i.DERInteger,c=i.DERTaggedObject,d=i.x509,g=d.Time,a=d.X500Name,j=d.SubjectPublicKeyInfo;this._initialize=function(){this.asn1Array=new Array();this.asn1Version=new c({obj:new h({"int":2})});this.asn1SerialNumber=null;this.asn1SignatureAlg=null;this.asn1Issuer=null;this.asn1NotBefore=null;this.asn1NotAfter=null;this.asn1Subject=null;this.asn1SubjPKey=null;this.extensionsArray=new Array();};this.setSerialNumberByParam=function(k){this.asn1SerialNumber=new h(k);};this.setSignatureAlgByParam=function(k){this.asn1SignatureAlg=new d.AlgorithmIdentifier(k);};this.setIssuerByParam=function(k){this.asn1Issuer=new a(k);};this.setNotBeforeByParam=function(k){this.asn1NotBefore=new g(k);};this.setNotAfterByParam=function(k){this.asn1NotAfter=new g(k);};this.setSubjectByParam=function(k){this.asn1Subject=new a(k);};this.setSubjectPublicKey=function(k){this.asn1SubjPKey=new j(k);};this.setSubjectPublicKeyByGetKey=function(l){var k=KEYUTIL.getKey(l);this.asn1SubjPKey=new j(k);};this.appendExtension=function(k){this.extensionsArray.push(k);};this.appendExtensionByName=function(l,k){KJUR.asn1.x509.Extension.appendByNameToArray(l,k,this.extensionsArray);};this.getEncodedHex=function(){if(this.asn1NotBefore==null||this.asn1NotAfter==null){throw"notBefore and/or notAfter not set"}var l=new f({array:[this.asn1NotBefore,this.asn1NotAfter]});this.asn1Array=new Array();this.asn1Array.push(this.asn1Version);this.asn1Array.push(this.asn1SerialNumber);this.asn1Array.push(this.asn1SignatureAlg);this.asn1Array.push(this.asn1Issuer);this.asn1Array.push(l);this.asn1Array.push(this.asn1Subject);this.asn1Array.push(this.asn1SubjPKey);if(this.extensionsArray.length>0){var m=new f({array:this.extensionsArray});var k=new c({explicit:true,tag:"a3",obj:m});this.asn1Array.push(k);}var n=new f({array:this.asn1Array});this.hTLV=n.getEncodedHex();this.isModified=false;return this.hTLV};this._initialize();};YAHOO.lang.extend(KJUR.asn1.x509.TBSCertificate,KJUR.asn1.ASN1Object);KJUR.asn1.x509.Extension=function(d){KJUR.asn1.x509.Extension.superclass.constructor.call(this);var a=KJUR,e=a.asn1,h=e.DERObjectIdentifier,i=e.DEROctetString,g=e.DERBoolean,c=e.DERSequence;this.getEncodedHex=function(){var m=new h({oid:this.oid});var l=new i({hex:this.getExtnValueHex()});var k=new Array();k.push(m);if(this.critical){k.push(new g());}k.push(l);var j=new c({array:k});return j.getEncodedHex()};this.critical=false;if(d!==undefined){if(d.critical!==undefined){this.critical=d.critical;}}};YAHOO.lang.extend(KJUR.asn1.x509.Extension,KJUR.asn1.ASN1Object);KJUR.asn1.x509.Extension.appendByNameToArray=function(e,c,b){var g=e.toLowerCase(),f=KJUR.asn1.x509;if(g=="basicconstraints"){var d=new f.BasicConstraints(c);b.push(d);}else{if(g=="keyusage"){var d=new f.KeyUsage(c);b.push(d);}else{if(g=="crldistributionpoints"){var d=new f.CRLDistributionPoints(c);b.push(d);}else{if(g=="extkeyusage"){var d=new f.ExtKeyUsage(c);b.push(d);}else{if(g=="authoritykeyidentifier"){var d=new f.AuthorityKeyIdentifier(c);b.push(d);}else{if(g=="authorityinfoaccess"){var d=new f.AuthorityInfoAccess(c);b.push(d);}else{if(g=="subjectaltname"){var d=new f.SubjectAltName(c);b.push(d);}else{if(g=="issueraltname"){var d=new f.IssuerAltName(c);b.push(d);}else{throw"unsupported extension name: "+e}}}}}}}}};KJUR.asn1.x509.KeyUsage=function(f){KJUR.asn1.x509.KeyUsage.superclass.constructor.call(this,f);var a=X509.KEYUSAGE_NAME;this.getExtnValueHex=function(){return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.15";if(f!==undefined){if(f.bin!==undefined){this.asn1ExtnValue=new KJUR.asn1.DERBitString(f);}if(f.names!==undefined&&f.names.length!==undefined){var e=f.names;var d="000000000";for(var c=0;c<e.length;c++){for(var b=0;b<a.length;b++){if(e[c]===a[b]){d=d.substring(0,b)+"1"+d.substring(b+1,d.length);}}}this.asn1ExtnValue=new KJUR.asn1.DERBitString({bin:d});}}};YAHOO.lang.extend(KJUR.asn1.x509.KeyUsage,KJUR.asn1.x509.Extension);KJUR.asn1.x509.BasicConstraints=function(c){KJUR.asn1.x509.BasicConstraints.superclass.constructor.call(this,c);this.getExtnValueHex=function(){var e=new Array();if(this.cA){e.push(new KJUR.asn1.DERBoolean());}if(this.pathLen>-1){e.push(new KJUR.asn1.DERInteger({"int":this.pathLen}));}var d=new KJUR.asn1.DERSequence({array:e});this.asn1ExtnValue=d;return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.19";this.cA=false;this.pathLen=-1;if(c!==undefined){if(c.cA!==undefined){this.cA=c.cA;}if(c.pathLen!==undefined){this.pathLen=c.pathLen;}}};YAHOO.lang.extend(KJUR.asn1.x509.BasicConstraints,KJUR.asn1.x509.Extension);KJUR.asn1.x509.CRLDistributionPoints=function(d){KJUR.asn1.x509.CRLDistributionPoints.superclass.constructor.call(this,d);var b=KJUR,a=b.asn1,c=a.x509;this.getExtnValueHex=function(){return this.asn1ExtnValue.getEncodedHex()};this.setByDPArray=function(e){this.asn1ExtnValue=new a.DERSequence({array:e});};this.setByOneURI=function(h){var e=new c.GeneralNames([{uri:h}]);var g=new c.DistributionPointName(e);var f=new c.DistributionPoint({dpobj:g});this.setByDPArray([f]);};this.oid="2.5.29.31";if(d!==undefined){if(d.array!==undefined){this.setByDPArray(d.array);}else{if(d.uri!==undefined){this.setByOneURI(d.uri);}}}};YAHOO.lang.extend(KJUR.asn1.x509.CRLDistributionPoints,KJUR.asn1.x509.Extension);KJUR.asn1.x509.ExtKeyUsage=function(c){KJUR.asn1.x509.ExtKeyUsage.superclass.constructor.call(this,c);var b=KJUR,a=b.asn1;this.setPurposeArray=function(d){this.asn1ExtnValue=new a.DERSequence();for(var e=0;e<d.length;e++){var f=new a.DERObjectIdentifier(d[e]);this.asn1ExtnValue.appendASN1Object(f);}};this.getExtnValueHex=function(){return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.37";if(c!==undefined){if(c.array!==undefined){this.setPurposeArray(c.array);}}};YAHOO.lang.extend(KJUR.asn1.x509.ExtKeyUsage,KJUR.asn1.x509.Extension);KJUR.asn1.x509.AuthorityKeyIdentifier=function(d){KJUR.asn1.x509.AuthorityKeyIdentifier.superclass.constructor.call(this,d);var b=KJUR,a=b.asn1,c=a.DERTaggedObject;this.asn1KID=null;this.asn1CertIssuer=null;this.asn1CertSN=null;this.getExtnValueHex=function(){var f=new Array();if(this.asn1KID){f.push(new c({explicit:false,tag:"80",obj:this.asn1KID}));}if(this.asn1CertIssuer){f.push(new c({explicit:false,tag:"a1",obj:this.asn1CertIssuer}));}if(this.asn1CertSN){f.push(new c({explicit:false,tag:"82",obj:this.asn1CertSN}));}var e=new a.DERSequence({array:f});this.asn1ExtnValue=e;return this.asn1ExtnValue.getEncodedHex()};this.setKIDByParam=function(e){this.asn1KID=new KJUR.asn1.DEROctetString(e);};this.setCertIssuerByParam=function(e){this.asn1CertIssuer=new KJUR.asn1.x509.X500Name(e);};this.setCertSNByParam=function(e){this.asn1CertSN=new KJUR.asn1.DERInteger(e);};this.oid="2.5.29.35";if(d!==undefined){if(d.kid!==undefined){this.setKIDByParam(d.kid);}if(d.issuer!==undefined){this.setCertIssuerByParam(d.issuer);}if(d.sn!==undefined){this.setCertSNByParam(d.sn);}}};YAHOO.lang.extend(KJUR.asn1.x509.AuthorityKeyIdentifier,KJUR.asn1.x509.Extension);KJUR.asn1.x509.AuthorityInfoAccess=function(a){KJUR.asn1.x509.AuthorityInfoAccess.superclass.constructor.call(this,a);this.setAccessDescriptionArray=function(k){var j=new Array(),b=KJUR,g=b.asn1,d=g.DERSequence;for(var f=0;f<k.length;f++){var c=new g.DERObjectIdentifier(k[f].accessMethod);var e=new g.x509.GeneralName(k[f].accessLocation);var h=new d({array:[c,e]});j.push(h);}this.asn1ExtnValue=new d({array:j});};this.getExtnValueHex=function(){return this.asn1ExtnValue.getEncodedHex()};this.oid="1.3.6.1.5.5.7.1.1";if(a!==undefined){if(a.array!==undefined){this.setAccessDescriptionArray(a.array);}}};YAHOO.lang.extend(KJUR.asn1.x509.AuthorityInfoAccess,KJUR.asn1.x509.Extension);KJUR.asn1.x509.SubjectAltName=function(a){KJUR.asn1.x509.SubjectAltName.superclass.constructor.call(this,a);this.setNameArray=function(b){this.asn1ExtnValue=new KJUR.asn1.x509.GeneralNames(b);};this.getExtnValueHex=function(){return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.17";if(a!==undefined){if(a.array!==undefined){this.setNameArray(a.array);}}};YAHOO.lang.extend(KJUR.asn1.x509.SubjectAltName,KJUR.asn1.x509.Extension);KJUR.asn1.x509.IssuerAltName=function(a){KJUR.asn1.x509.IssuerAltName.superclass.constructor.call(this,a);this.setNameArray=function(b){this.asn1ExtnValue=new KJUR.asn1.x509.GeneralNames(b);};this.getExtnValueHex=function(){return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.18";if(a!==undefined){if(a.array!==undefined){this.setNameArray(a.array);}}};YAHOO.lang.extend(KJUR.asn1.x509.IssuerAltName,KJUR.asn1.x509.Extension);KJUR.asn1.x509.CRL=function(f){KJUR.asn1.x509.CRL.superclass.constructor.call(this);this.sign=function(){this.asn1SignatureAlg=this.asn1TBSCertList.asn1SignatureAlg;sig=new KJUR.crypto.Signature({alg:"SHA1withRSA",prov:"cryptojs/jsrsa"});sig.init(this.prvKey);sig.updateHex(this.asn1TBSCertList.getEncodedHex());this.hexSig=sig.sign();this.asn1Sig=new KJUR.asn1.DERBitString({hex:"00"+this.hexSig});var g=new KJUR.asn1.DERSequence({array:[this.asn1TBSCertList,this.asn1SignatureAlg,this.asn1Sig]});this.hTLV=g.getEncodedHex();this.isModified=false;};this.getEncodedHex=function(){if(this.isModified==false&&this.hTLV!=null){return this.hTLV}throw"not signed yet"};this.getPEMString=function(){var g=hextob64nl(this.getEncodedHex());return "-----BEGIN X509 CRL-----\r\n"+g+"\r\n-----END X509 CRL-----\r\n"};if(f!==undefined){if(f.tbsobj!==undefined){this.asn1TBSCertList=f.tbsobj;}if(f.prvkeyobj!==undefined){this.prvKey=f.prvkeyobj;}}};YAHOO.lang.extend(KJUR.asn1.x509.CRL,KJUR.asn1.ASN1Object);KJUR.asn1.x509.TBSCertList=function(g){KJUR.asn1.x509.TBSCertList.superclass.constructor.call(this);var d=KJUR,c=d.asn1,b=c.DERSequence,f=c.x509,a=f.Time;this.setSignatureAlgByParam=function(h){this.asn1SignatureAlg=new f.AlgorithmIdentifier(h);};this.setIssuerByParam=function(h){this.asn1Issuer=new f.X500Name(h);};this.setThisUpdateByParam=function(h){this.asn1ThisUpdate=new a(h);};this.setNextUpdateByParam=function(h){this.asn1NextUpdate=new a(h);};this.addRevokedCert=function(h,i){var k={};if(h!=undefined&&h!=null){k.sn=h;}if(i!=undefined&&i!=null){k.time=i;}var j=new f.CRLEntry(k);this.aRevokedCert.push(j);};this.getEncodedHex=function(){this.asn1Array=new Array();if(this.asn1Version!=null){this.asn1Array.push(this.asn1Version);}this.asn1Array.push(this.asn1SignatureAlg);this.asn1Array.push(this.asn1Issuer);this.asn1Array.push(this.asn1ThisUpdate);if(this.asn1NextUpdate!=null){this.asn1Array.push(this.asn1NextUpdate);}if(this.aRevokedCert.length>0){var h=new b({array:this.aRevokedCert});this.asn1Array.push(h);}var i=new b({array:this.asn1Array});this.hTLV=i.getEncodedHex();this.isModified=false;return this.hTLV};this._initialize=function(){this.asn1Version=null;this.asn1SignatureAlg=null;this.asn1Issuer=null;this.asn1ThisUpdate=null;this.asn1NextUpdate=null;this.aRevokedCert=new Array();};this._initialize();};YAHOO.lang.extend(KJUR.asn1.x509.TBSCertList,KJUR.asn1.ASN1Object);KJUR.asn1.x509.CRLEntry=function(e){KJUR.asn1.x509.CRLEntry.superclass.constructor.call(this);var b=KJUR,a=b.asn1;this.setCertSerial=function(f){this.sn=new a.DERInteger(f);};this.setRevocationDate=function(f){this.time=new a.x509.Time(f);};this.getEncodedHex=function(){var f=new a.DERSequence({array:[this.sn,this.time]});this.TLV=f.getEncodedHex();return this.TLV};if(e!==undefined){if(e.time!==undefined){this.setRevocationDate(e.time);}if(e.sn!==undefined){this.setCertSerial(e.sn);}}};YAHOO.lang.extend(KJUR.asn1.x509.CRLEntry,KJUR.asn1.ASN1Object);KJUR.asn1.x509.X500Name=function(f){KJUR.asn1.x509.X500Name.superclass.constructor.call(this);this.asn1Array=new Array();var d=KJUR,c=d.asn1,e=c.x509,b=pemtohex;this.setByString=function(g){var k=g.split("/");k.shift();var j=[];for(var l=0;l<k.length;l++){if(k[l].match(/^[^=]+=.+$/)){j.push(k[l]);}else{var h=j.length-1;j[h]=j[h]+"/"+k[l];}}for(var l=0;l<j.length;l++){this.asn1Array.push(new e.RDN({str:j[l]}));}};this.setByLdapString=function(g){var h=e.X500Name.ldapToOneline(g);this.setByString(h);};this.setByObject=function(i){for(var g in i){if(i.hasOwnProperty(g)){var h=new KJUR.asn1.x509.RDN({str:g+"="+i[g]});this.asn1Array?this.asn1Array.push(h):this.asn1Array=[h];}}};this.getEncodedHex=function(){if(typeof this.hTLV=="string"){return this.hTLV}var g=new c.DERSequence({array:this.asn1Array});this.hTLV=g.getEncodedHex();return this.hTLV};if(f!==undefined){if(f.str!==undefined){this.setByString(f.str);}else{if(f.ldapstr!==undefined){this.setByLdapString(f.ldapstr);}else{if(typeof f==="object"){this.setByObject(f);}}}if(f.certissuer!==undefined){var a=new X509();a.hex=b(f.certissuer);this.hTLV=a.getIssuerHex();}if(f.certsubject!==undefined){var a=new X509();a.hex=b(f.certsubject);this.hTLV=a.getSubjectHex();}}};YAHOO.lang.extend(KJUR.asn1.x509.X500Name,KJUR.asn1.ASN1Object);KJUR.asn1.x509.X500Name.onelineToLDAP=function(d){if(d.substr(0,1)!=="/"){throw"malformed input"}d=d.substr(1);var c=d.split("/");c.reverse();c=c.map(function(a){return a.replace(/,/,"\\,")});return c.join(",")};KJUR.asn1.x509.X500Name.ldapToOneline=function(g){var c=g.split(",");var e=false;var b=[];for(var f=0;c.length>0;f++){var h=c.shift();if(e===true){var d=b.pop();var j=(d+","+h).replace(/\\,/g,",");b.push(j);e=false;}else{b.push(h);}if(h.substr(-1,1)==="\\"){e=true;}}b=b.map(function(a){return a.replace("/","\\/")});b.reverse();return "/"+b.join("/")};KJUR.asn1.x509.RDN=function(a){KJUR.asn1.x509.RDN.superclass.constructor.call(this);this.asn1Array=new Array();this.addByString=function(b){this.asn1Array.push(new KJUR.asn1.x509.AttributeTypeAndValue({str:b}));};this.addByMultiValuedString=function(d){var b=KJUR.asn1.x509.RDN.parseString(d);for(var c=0;c<b.length;c++){this.addByString(b[c]);}};this.getEncodedHex=function(){var b=new KJUR.asn1.DERSet({array:this.asn1Array});this.TLV=b.getEncodedHex();return this.TLV};if(a!==undefined){if(a.str!==undefined){this.addByMultiValuedString(a.str);}}};YAHOO.lang.extend(KJUR.asn1.x509.RDN,KJUR.asn1.ASN1Object);KJUR.asn1.x509.RDN.parseString=function(m){var j=m.split(/\+/);var h=false;var c=[];for(var g=0;j.length>0;g++){var k=j.shift();if(h===true){var f=c.pop();var d=(f+"+"+k).replace(/\\\+/g,"+");c.push(d);h=false;}else{c.push(k);}if(k.substr(-1,1)==="\\"){h=true;}}var l=false;var b=[];for(var g=0;c.length>0;g++){var k=c.shift();if(l===true){var e=b.pop();if(k.match(/"$/)){var d=(e+"+"+k).replace(/^([^=]+)="(.*)"$/,"$1=$2");b.push(d);l=false;}else{b.push(e+"+"+k);}}else{b.push(k);}if(k.match(/^[^=]+="/)){l=true;}}return b};KJUR.asn1.x509.AttributeTypeAndValue=function(d){KJUR.asn1.x509.AttributeTypeAndValue.superclass.constructor.call(this);var a="utf8",c=KJUR,b=c.asn1;this.setByString=function(h){var g=h.match(/^([^=]+)=(.+)$/);if(g){this.setByAttrTypeAndValueStr(g[1],g[2]);}else{throw"malformed attrTypeAndValueStr: "+h}};this.setByAttrTypeAndValueStr=function(i,h){this.typeObj=KJUR.asn1.x509.OID.atype2obj(i);var g=a;if(i=="C"){g="prn";}this.valueObj=this.getValueObj(g,h);};this.getValueObj=function(h,g){if(h=="utf8"){return new b.DERUTF8String({str:g})}if(h=="prn"){return new b.DERPrintableString({str:g})}if(h=="tel"){return new b.DERTeletexString({str:g})}if(h=="ia5"){return new b.DERIA5String({str:g})}throw"unsupported directory string type: type="+h+" value="+g};this.getEncodedHex=function(){var g=new b.DERSequence({array:[this.typeObj,this.valueObj]});this.TLV=g.getEncodedHex();return this.TLV};if(d!==undefined){if(d.str!==undefined){this.setByString(d.str);}}};YAHOO.lang.extend(KJUR.asn1.x509.AttributeTypeAndValue,KJUR.asn1.ASN1Object);KJUR.asn1.x509.SubjectPublicKeyInfo=function(f){KJUR.asn1.x509.SubjectPublicKeyInfo.superclass.constructor.call(this);var a=KJUR,j=a.asn1,i=j.DERInteger,b=j.DERBitString,m=j.DERObjectIdentifier,e=j.DERSequence,h=j.ASN1Util.newObject,d=j.x509,o=d.AlgorithmIdentifier;this.getASN1Object=function(){if(this.asn1AlgId==null||this.asn1SubjPKey==null){throw"algId and/or subjPubKey not set"}var p=new e({array:[this.asn1AlgId,this.asn1SubjPKey]});return p};this.getEncodedHex=function(){var p=this.getASN1Object();this.hTLV=p.getEncodedHex();return this.hTLV};this.setPubKey=function(q){try{if(q instanceof RSAKey){var u=h({seq:[{"int":{bigint:q.n}},{"int":{"int":q.e}}]});var s=u.getEncodedHex();this.asn1AlgId=new o({name:"rsaEncryption"});this.asn1SubjPKey=new b({hex:"00"+s});}}catch(p){}try{if(q instanceof KJUR.crypto.ECDSA){var r=new m({name:q.curveName});this.asn1AlgId=new o({name:"ecPublicKey",asn1params:r});this.asn1SubjPKey=new b({hex:"00"+q.pubKeyHex});}}catch(p){}try{if(q instanceof KJUR.crypto.DSA){var r=new h({seq:[{"int":{bigint:q.p}},{"int":{bigint:q.q}},{"int":{bigint:q.g}}]});this.asn1AlgId=new o({name:"dsa",asn1params:r});var t=new i({bigint:q.y});this.asn1SubjPKey=new b({hex:"00"+t.getEncodedHex()});}}catch(p){}};if(f!==undefined){this.setPubKey(f);}};YAHOO.lang.extend(KJUR.asn1.x509.SubjectPublicKeyInfo,KJUR.asn1.ASN1Object);KJUR.asn1.x509.Time=function(f){KJUR.asn1.x509.Time.superclass.constructor.call(this);var d=KJUR,c=d.asn1,b=c.DERUTCTime,g=c.DERGeneralizedTime;this.setTimeParams=function(h){this.timeParams=h;};this.getEncodedHex=function(){var h=null;if(this.timeParams!=null){if(this.type=="utc"){h=new b(this.timeParams);}else{h=new g(this.timeParams);}}else{if(this.type=="utc"){h=new b();}else{h=new g();}}this.TLV=h.getEncodedHex();return this.TLV};this.type="utc";if(f!==undefined){if(f.type!==undefined){this.type=f.type;}else{if(f.str!==undefined){if(f.str.match(/^[0-9]{12}Z$/)){this.type="utc";}if(f.str.match(/^[0-9]{14}Z$/)){this.type="gen";}}}this.timeParams=f;}};YAHOO.lang.extend(KJUR.asn1.x509.Time,KJUR.asn1.ASN1Object);KJUR.asn1.x509.AlgorithmIdentifier=function(d){KJUR.asn1.x509.AlgorithmIdentifier.superclass.constructor.call(this);this.nameAlg=null;this.asn1Alg=null;this.asn1Params=null;this.paramEmpty=false;var b=KJUR,a=b.asn1;this.getEncodedHex=function(){if(this.nameAlg===null&&this.asn1Alg===null){throw"algorithm not specified"}if(this.nameAlg!==null&&this.asn1Alg===null){this.asn1Alg=a.x509.OID.name2obj(this.nameAlg);}var e=[this.asn1Alg];if(this.asn1Params!==null){e.push(this.asn1Params);}var f=new a.DERSequence({array:e});this.hTLV=f.getEncodedHex();return this.hTLV};if(d!==undefined){if(d.name!==undefined){this.nameAlg=d.name;}if(d.asn1params!==undefined){this.asn1Params=d.asn1params;}if(d.paramempty!==undefined){this.paramEmpty=d.paramempty;}}if(this.asn1Params===null&&this.paramEmpty===false&&this.nameAlg!==null){var c=this.nameAlg.toLowerCase();if(c.substr(-7,7)!=="withdsa"&&c.substr(-9,9)!=="withecdsa"){this.asn1Params=new a.DERNull();}}};YAHOO.lang.extend(KJUR.asn1.x509.AlgorithmIdentifier,KJUR.asn1.ASN1Object);KJUR.asn1.x509.GeneralName=function(e){KJUR.asn1.x509.GeneralName.superclass.constructor.call(this);var k={rfc822:"81",dns:"82",dn:"a4",uri:"86",ip:"87"},b=KJUR,g=b.asn1,j=g.DEROctetString,d=g.DERIA5String,c=g.DERTaggedObject,l=g.ASN1Object,a=g.x509.X500Name,h=pemtohex;this.explicit=false;this.setByParam=function(p){var u=null;if(p===undefined){return}if(p.rfc822!==undefined){this.type="rfc822";u=new d({str:p[this.type]});}if(p.dns!==undefined){this.type="dns";u=new d({str:p[this.type]});}if(p.uri!==undefined){this.type="uri";u=new d({str:p[this.type]});}if(p.dn!==undefined){this.type="dn";this.explicit=true;u=new a({str:p.dn});}if(p.ldapdn!==undefined){this.type="dn";this.explicit=true;u=new a({ldapstr:p.ldapdn});}if(p.certissuer!==undefined){this.type="dn";this.explicit=true;var o=p.certissuer;var w=null;if(o.match(/^[0-9A-Fa-f]+$/));if(o.indexOf("-----BEGIN ")!=-1){w=h(o);}if(w==null){throw"certissuer param not cert"}var t=new X509();t.hex=w;var y=t.getIssuerHex();u=new l();u.hTLV=y;}if(p.certsubj!==undefined){this.type="dn";this.explicit=true;var o=p.certsubj;var w=null;if(o.match(/^[0-9A-Fa-f]+$/));if(o.indexOf("-----BEGIN ")!=-1){w=h(o);}if(w==null){throw"certsubj param not cert"}var t=new X509();t.hex=w;var y=t.getSubjectHex();u=new l();u.hTLV=y;}if(p.ip!==undefined){this.type="ip";this.explicit=false;var q=p.ip;var s;var n="malformed IP address";if(q.match(/^[0-9.]+[.][0-9.]+$/)){s=intarystrtohex("["+q.split(".").join(",")+"]");if(s.length!==8){throw n}}else{if(q.match(/^[0-9A-Fa-f:]+:[0-9A-Fa-f:]+$/)){s=ipv6tohex(q);}else{if(q.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/)){s=q;}else{throw n}}}u=new j({hex:s});}if(this.type==null){throw"unsupported type in params="+p}this.asn1Obj=new c({explicit:this.explicit,tag:k[this.type],obj:u});};this.getEncodedHex=function(){return this.asn1Obj.getEncodedHex()};if(e!==undefined){this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.x509.GeneralName,KJUR.asn1.ASN1Object);KJUR.asn1.x509.GeneralNames=function(d){KJUR.asn1.x509.GeneralNames.superclass.constructor.call(this);var c=KJUR,b=c.asn1;this.setByParamArray=function(g){for(var e=0;e<g.length;e++){var f=new b.x509.GeneralName(g[e]);this.asn1Array.push(f);}};this.getEncodedHex=function(){var e=new b.DERSequence({array:this.asn1Array});return e.getEncodedHex()};this.asn1Array=new Array();if(typeof d!="undefined"){this.setByParamArray(d);}};YAHOO.lang.extend(KJUR.asn1.x509.GeneralNames,KJUR.asn1.ASN1Object);KJUR.asn1.x509.DistributionPointName=function(b){KJUR.asn1.x509.DistributionPointName.superclass.constructor.call(this);var d=KJUR,c=d.asn1,f=c.DERTaggedObject;this.getEncodedHex=function(){if(this.type!="full"){throw"currently type shall be 'full': "+this.type}this.asn1Obj=new f({explicit:false,tag:this.tag,obj:this.asn1V});this.hTLV=this.asn1Obj.getEncodedHex();return this.hTLV};if(b!==undefined){if(c.x509.GeneralNames.prototype.isPrototypeOf(b)){this.type="full";this.tag="a0";this.asn1V=b;}else{throw"This class supports GeneralNames only as argument"}}};YAHOO.lang.extend(KJUR.asn1.x509.DistributionPointName,KJUR.asn1.ASN1Object);KJUR.asn1.x509.DistributionPoint=function(d){KJUR.asn1.x509.DistributionPoint.superclass.constructor.call(this);var c=KJUR,b=c.asn1;this.getEncodedHex=function(){var e=new b.DERSequence();if(this.asn1DP!=null){var f=new b.DERTaggedObject({explicit:true,tag:"a0",obj:this.asn1DP});e.appendASN1Object(f);}this.hTLV=e.getEncodedHex();return this.hTLV};if(d!==undefined){if(d.dpobj!==undefined){this.asn1DP=d.dpobj;}}};YAHOO.lang.extend(KJUR.asn1.x509.DistributionPoint,KJUR.asn1.ASN1Object);KJUR.asn1.x509.OID=new function(a){this.atype2oidList={CN:"2.5.4.3",L:"2.5.4.7",ST:"2.5.4.8",O:"2.5.4.10",OU:"2.5.4.11",C:"2.5.4.6",STREET:"2.5.4.9",DC:"0.9.2342.19200300.100.1.25",UID:"0.9.2342.19200300.100.1.1",SN:"2.5.4.4",T:"2.5.4.12",DN:"2.5.4.49",E:"1.2.840.113549.1.9.1",description:"2.5.4.13",businessCategory:"2.5.4.15",postalCode:"2.5.4.17",serialNumber:"2.5.4.5",uniqueIdentifier:"2.5.4.45",organizationIdentifier:"2.5.4.97",jurisdictionOfIncorporationL:"1.3.6.1.4.1.311.60.2.1.1",jurisdictionOfIncorporationSP:"1.3.6.1.4.1.311.60.2.1.2",jurisdictionOfIncorporationC:"1.3.6.1.4.1.311.60.2.1.3"};this.name2oidList={sha1:"1.3.14.3.2.26",sha256:"2.16.840.1.101.3.4.2.1",sha384:"2.16.840.1.101.3.4.2.2",sha512:"2.16.840.1.101.3.4.2.3",sha224:"2.16.840.1.101.3.4.2.4",md5:"1.2.840.113549.2.5",md2:"1.3.14.7.2.2.1",ripemd160:"1.3.36.3.2.1",MD2withRSA:"1.2.840.113549.1.1.2",MD4withRSA:"1.2.840.113549.1.1.3",MD5withRSA:"1.2.840.113549.1.1.4",SHA1withRSA:"1.2.840.113549.1.1.5",SHA224withRSA:"1.2.840.113549.1.1.14",SHA256withRSA:"1.2.840.113549.1.1.11",SHA384withRSA:"1.2.840.113549.1.1.12",SHA512withRSA:"1.2.840.113549.1.1.13",SHA1withECDSA:"1.2.840.10045.4.1",SHA224withECDSA:"1.2.840.10045.4.3.1",SHA256withECDSA:"1.2.840.10045.4.3.2",SHA384withECDSA:"1.2.840.10045.4.3.3",SHA512withECDSA:"1.2.840.10045.4.3.4",dsa:"1.2.840.10040.4.1",SHA1withDSA:"1.2.840.10040.4.3",SHA224withDSA:"2.16.840.1.101.3.4.3.1",SHA256withDSA:"2.16.840.1.101.3.4.3.2",rsaEncryption:"1.2.840.113549.1.1.1",commonName:"2.5.4.3",countryName:"2.5.4.6",localityName:"2.5.4.7",stateOrProvinceName:"2.5.4.8",streetAddress:"2.5.4.9",organizationName:"2.5.4.10",organizationalUnitName:"2.5.4.11",domainComponent:"0.9.2342.19200300.100.1.25",userId:"0.9.2342.19200300.100.1.1",surname:"2.5.4.4",title:"2.5.4.12",distinguishedName:"2.5.4.49",emailAddress:"1.2.840.113549.1.9.1",description:"2.5.4.13",businessCategory:"2.5.4.15",postalCode:"2.5.4.17",uniqueIdentifier:"2.5.4.45",organizationIdentifier:"2.5.4.97",jurisdictionOfIncorporationL:"1.3.6.1.4.1.311.60.2.1.1",jurisdictionOfIncorporationSP:"1.3.6.1.4.1.311.60.2.1.2",jurisdictionOfIncorporationC:"1.3.6.1.4.1.311.60.2.1.3",subjectKeyIdentifier:"2.5.29.14",keyUsage:"2.5.29.15",subjectAltName:"2.5.29.17",issuerAltName:"2.5.29.18",basicConstraints:"2.5.29.19",nameConstraints:"2.5.29.30",cRLDistributionPoints:"2.5.29.31",certificatePolicies:"2.5.29.32",authorityKeyIdentifier:"2.5.29.35",policyConstraints:"2.5.29.36",extKeyUsage:"2.5.29.37",authorityInfoAccess:"1.3.6.1.5.5.7.1.1",ocsp:"1.3.6.1.5.5.7.48.1",caIssuers:"1.3.6.1.5.5.7.48.2",anyExtendedKeyUsage:"2.5.29.37.0",serverAuth:"1.3.6.1.5.5.7.3.1",clientAuth:"1.3.6.1.5.5.7.3.2",codeSigning:"1.3.6.1.5.5.7.3.3",emailProtection:"1.3.6.1.5.5.7.3.4",timeStamping:"1.3.6.1.5.5.7.3.8",ocspSigning:"1.3.6.1.5.5.7.3.9",ecPublicKey:"1.2.840.10045.2.1",secp256r1:"1.2.840.10045.3.1.7",secp256k1:"1.3.132.0.10",secp384r1:"1.3.132.0.34",pkcs5PBES2:"1.2.840.113549.1.5.13",pkcs5PBKDF2:"1.2.840.113549.1.5.12","des-EDE3-CBC":"1.2.840.113549.3.7",data:"1.2.840.113549.1.7.1","signed-data":"1.2.840.113549.1.7.2","enveloped-data":"1.2.840.113549.1.7.3","digested-data":"1.2.840.113549.1.7.5","encrypted-data":"1.2.840.113549.1.7.6","authenticated-data":"1.2.840.113549.1.9.16.1.2",tstinfo:"1.2.840.113549.1.9.16.1.4",extensionRequest:"1.2.840.113549.1.9.14",};this.objCache={};this.name2obj=function(b){if(typeof this.objCache[b]!="undefined"){return this.objCache[b]}if(typeof this.name2oidList[b]=="undefined"){throw"Name of ObjectIdentifier not defined: "+b}var c=this.name2oidList[b];var d=new KJUR.asn1.DERObjectIdentifier({oid:c});this.objCache[b]=d;return d};this.atype2obj=function(b){if(typeof this.objCache[b]!="undefined"){return this.objCache[b]}if(typeof this.atype2oidList[b]=="undefined"){throw"AttributeType name undefined: "+b}var c=this.atype2oidList[b];var d=new KJUR.asn1.DERObjectIdentifier({oid:c});this.objCache[b]=d;return d};};KJUR.asn1.x509.OID.oid2name=function(b){var c=KJUR.asn1.x509.OID.name2oidList;for(var a in c){if(c[a]==b){return a}}return ""};KJUR.asn1.x509.OID.oid2atype=function(b){var c=KJUR.asn1.x509.OID.atype2oidList;for(var a in c){if(c[a]==b){return a}}return b};KJUR.asn1.x509.OID.name2oid=function(a){var b=KJUR.asn1.x509.OID.name2oidList;if(b[a]===undefined){return ""}return b[a]};KJUR.asn1.x509.X509Util={};KJUR.asn1.x509.X509Util.newCertPEM=function(h){var g=KJUR.asn1.x509,b=g.TBSCertificate,a=g.Certificate;var f=new b();if(h.serial!==undefined){f.setSerialNumberByParam(h.serial);}else{throw"serial number undefined."}if(typeof h.sigalg.name==="string"){f.setSignatureAlgByParam(h.sigalg);}else{throw"unproper signature algorithm name"}if(h.issuer!==undefined){f.setIssuerByParam(h.issuer);}else{throw"issuer name undefined."}if(h.notbefore!==undefined){f.setNotBeforeByParam(h.notbefore);}else{throw"notbefore undefined."}if(h.notafter!==undefined){f.setNotAfterByParam(h.notafter);}else{throw"notafter undefined."}if(h.subject!==undefined){f.setSubjectByParam(h.subject);}else{throw"subject name undefined."}if(h.sbjpubkey!==undefined){f.setSubjectPublicKeyByGetKey(h.sbjpubkey);}else{throw"subject public key undefined."}if(h.ext!==undefined&&h.ext.length!==undefined){for(var d=0;d<h.ext.length;d++){for(key in h.ext[d]){f.appendExtensionByName(key,h.ext[d][key]);}}}if(h.cakey===undefined&&h.sighex===undefined){throw"param cakey and sighex undefined."}var e=null;var c=null;if(h.cakey){if(h.cakey.isPrivate===true){e=h.cakey;}else{e=KEYUTIL.getKey.apply(null,h.cakey);}c=new a({tbscertobj:f,prvkeyobj:e});c.sign();}if(h.sighex){c=new a({tbscertobj:f});c.setSignatureHex(h.sighex);}return c.getPEMString()};
if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={};}if(typeof KJUR.asn1.cms=="undefined"||!KJUR.asn1.cms){KJUR.asn1.cms={};}KJUR.asn1.cms.Attribute=function(d){var c=KJUR,b=c.asn1;b.cms.Attribute.superclass.constructor.call(this);this.getEncodedHex=function(){var h,g,e;h=new b.DERObjectIdentifier({oid:this.attrTypeOid});g=new b.DERSet({array:this.valueList});try{g.getEncodedHex();}catch(f){throw"fail valueSet.getEncodedHex in Attribute(1)/"+f}e=new b.DERSequence({array:[h,g]});try{this.hTLV=e.getEncodedHex();}catch(f){throw"failed seq.getEncodedHex in Attribute(2)/"+f}return this.hTLV};};YAHOO.lang.extend(KJUR.asn1.cms.Attribute,KJUR.asn1.ASN1Object);KJUR.asn1.cms.ContentType=function(d){var c=KJUR,b=c.asn1;b.cms.ContentType.superclass.constructor.call(this);this.attrTypeOid="1.2.840.113549.1.9.3";var a=null;if(typeof d!="undefined"){var a=new b.DERObjectIdentifier(d);this.valueList=[a];}};YAHOO.lang.extend(KJUR.asn1.cms.ContentType,KJUR.asn1.cms.Attribute);KJUR.asn1.cms.MessageDigest=function(d){var b=KJUR,e=b.asn1,g=e.DEROctetString,i=e.cms;i.MessageDigest.superclass.constructor.call(this);this.attrTypeOid="1.2.840.113549.1.9.4";if(d!==undefined){if(d.eciObj instanceof i.EncapsulatedContentInfo&&typeof d.hashAlg==="string"){var h=d.eciObj.eContentValueHex;var c=d.hashAlg;var a=b.crypto.Util.hashHex(h,c);var f=new g({hex:a});f.getEncodedHex();this.valueList=[f];}else{var f=new g(d);f.getEncodedHex();this.valueList=[f];}}};YAHOO.lang.extend(KJUR.asn1.cms.MessageDigest,KJUR.asn1.cms.Attribute);KJUR.asn1.cms.SigningTime=function(e){var d=KJUR,c=d.asn1;c.cms.SigningTime.superclass.constructor.call(this);this.attrTypeOid="1.2.840.113549.1.9.5";if(e!==undefined){var a=new c.x509.Time(e);try{a.getEncodedHex();}catch(b){throw"SigningTime.getEncodedHex() failed/"+b}this.valueList=[a];}};YAHOO.lang.extend(KJUR.asn1.cms.SigningTime,KJUR.asn1.cms.Attribute);KJUR.asn1.cms.SigningCertificate=function(f){var c=KJUR,b=c.asn1,a=b.DERSequence,e=b.cms;e.SigningCertificate.superclass.constructor.call(this);this.attrTypeOid="1.2.840.113549.1.9.16.2.12";this.setCerts=function(n){var l=[];for(var k=0;k<n.length;k++){var h=pemtohex(n[k]);var g=c.crypto.Util.hashHex(h,"sha1");var o=new b.DEROctetString({hex:g});o.getEncodedHex();var m=new e.IssuerAndSerialNumber({cert:n[k]});m.getEncodedHex();var p=new a({array:[o,m]});p.getEncodedHex();l.push(p);}var j=new a({array:l});j.getEncodedHex();this.valueList=[j];};if(f!==undefined){if(typeof f.array=="object"){this.setCerts(f.array);}}};YAHOO.lang.extend(KJUR.asn1.cms.SigningCertificate,KJUR.asn1.cms.Attribute);KJUR.asn1.cms.SigningCertificateV2=function(h){var d=KJUR,c=d.asn1,b=c.DERSequence,g=c.x509,f=c.cms,e=d.crypto;f.SigningCertificateV2.superclass.constructor.call(this);this.attrTypeOid="1.2.840.113549.1.9.16.2.47";this.setCerts=function(r,k){var p=[];for(var n=0;n<r.length;n++){var l=pemtohex(r[n]);var t=[];if(k!=="sha256"){t.push(new g.AlgorithmIdentifier({name:k}));}var j=e.Util.hashHex(l,k);var s=new c.DEROctetString({hex:j});s.getEncodedHex();t.push(s);var o=new f.IssuerAndSerialNumber({cert:r[n]});o.getEncodedHex();t.push(o);var q=new b({array:t});q.getEncodedHex();p.push(q);}var m=new b({array:p});m.getEncodedHex();this.valueList=[m];};if(h!==undefined){if(typeof h.array=="object"){var a="sha256";if(typeof h.hashAlg=="string"){a=h.hashAlg;}this.setCerts(h.array,a);}}};YAHOO.lang.extend(KJUR.asn1.cms.SigningCertificateV2,KJUR.asn1.cms.Attribute);KJUR.asn1.cms.IssuerAndSerialNumber=function(e){var b=KJUR,g=b.asn1,f=g.DERInteger,i=g.cms,d=g.x509,a=d.X500Name,c=X509;i.IssuerAndSerialNumber.superclass.constructor.call(this);this.setByCertPEM=function(n){var l=pemtohex(n);var k=new c();k.hex=l;var o=k.getIssuerHex();this.dIssuer=new a();this.dIssuer.hTLV=o;var m=k.getSerialNumberHex();this.dSerial=new f({hex:m});};this.getEncodedHex=function(){var k=new g.DERSequence({array:[this.dIssuer,this.dSerial]});this.hTLV=k.getEncodedHex();return this.hTLV};if(e!==undefined){if(typeof e=="string"&&e.indexOf("-----BEGIN ")!=-1){this.setByCertPEM(e);}if(e.issuer&&e.serial){if(e.issuer instanceof a){this.dIssuer=e.issuer;}else{this.dIssuer=new a(e.issuer);}if(e.serial instanceof f){this.dSerial=e.serial;}else{this.dSerial=new f(e.serial);}}if(typeof e.cert=="string"){this.setByCertPEM(e.cert);}}};YAHOO.lang.extend(KJUR.asn1.cms.IssuerAndSerialNumber,KJUR.asn1.ASN1Object);KJUR.asn1.cms.AttributeList=function(d){var b=KJUR,a=b.asn1,c=a.cms;c.AttributeList.superclass.constructor.call(this);this.list=new Array();this.sortFlag=true;this.add=function(e){if(e instanceof c.Attribute){this.list.push(e);}};this.length=function(){return this.list.length};this.clear=function(){this.list=new Array();this.hTLV=null;this.hV=null;};this.getEncodedHex=function(){if(typeof this.hTLV=="string"){return this.hTLV}var e=new a.DERSet({array:this.list,sortflag:this.sortFlag});this.hTLV=e.getEncodedHex();return this.hTLV};if(d!==undefined){if(typeof d.sortflag!="undefined"&&d.sortflag==false){this.sortFlag=false;}}};YAHOO.lang.extend(KJUR.asn1.cms.AttributeList,KJUR.asn1.ASN1Object);KJUR.asn1.cms.SignerInfo=function(e){var a=KJUR,h=a.asn1,b=h.DERTaggedObject,n=h.cms,j=n.AttributeList,g=n.ContentType,k=n.EncapsulatedContentInfo,c=n.MessageDigest,l=n.SignedData,d=h.x509,m=d.AlgorithmIdentifier,f=a.crypto,i=KEYUTIL;n.SignerInfo.superclass.constructor.call(this);this.dCMSVersion=new h.DERInteger({"int":1});this.dSignerIdentifier=null;this.dDigestAlgorithm=null;this.dSignedAttrs=new j();this.dSigAlg=null;this.dSig=null;this.dUnsignedAttrs=new j();this.setSignerIdentifier=function(p){if(typeof p=="string"&&p.indexOf("CERTIFICATE")!=-1&&p.indexOf("BEGIN")!=-1&&p.indexOf("END")!=-1){this.dSignerIdentifier=new n.IssuerAndSerialNumber({cert:p});}};this.setForContentAndHash=function(o){if(o!==undefined){if(o.eciObj instanceof k){this.dSignedAttrs.add(new g({oid:"1.2.840.113549.1.7.1"}));this.dSignedAttrs.add(new c({eciObj:o.eciObj,hashAlg:o.hashAlg}));}if(o.sdObj!==undefined&&o.sdObj instanceof l){if(o.sdObj.digestAlgNameList.join(":").indexOf(o.hashAlg)==-1){o.sdObj.digestAlgNameList.push(o.hashAlg);}}if(typeof o.hashAlg=="string"){this.dDigestAlgorithm=new m({name:o.hashAlg});}}};this.sign=function(t,p){this.dSigAlg=new m({name:p});var q=this.dSignedAttrs.getEncodedHex();var o=i.getKey(t);var s=new f.Signature({alg:p});s.init(o);s.updateHex(q);var r=s.sign();this.dSig=new h.DEROctetString({hex:r});};this.addUnsigned=function(o){this.hTLV=null;this.dUnsignedAttrs.hTLV=null;this.dUnsignedAttrs.add(o);};this.getEncodedHex=function(){if(this.dSignedAttrs instanceof j&&this.dSignedAttrs.length()==0){throw"SignedAttrs length = 0 (empty)"}var o=new b({obj:this.dSignedAttrs,tag:"a0",explicit:false});var r=null;if(this.dUnsignedAttrs.length()>0){r=new b({obj:this.dUnsignedAttrs,tag:"a1",explicit:false});}var q=[this.dCMSVersion,this.dSignerIdentifier,this.dDigestAlgorithm,o,this.dSigAlg,this.dSig,];if(r!=null){q.push(r);}var p=new h.DERSequence({array:q});this.hTLV=p.getEncodedHex();return this.hTLV};};YAHOO.lang.extend(KJUR.asn1.cms.SignerInfo,KJUR.asn1.ASN1Object);KJUR.asn1.cms.EncapsulatedContentInfo=function(g){var c=KJUR,b=c.asn1,e=b.DERTaggedObject,a=b.DERSequence,h=b.DERObjectIdentifier,d=b.DEROctetString,f=b.cms;f.EncapsulatedContentInfo.superclass.constructor.call(this);this.dEContentType=new h({name:"data"});this.dEContent=null;this.isDetached=false;this.eContentValueHex=null;this.setContentType=function(i){if(i.match(/^[0-2][.][0-9.]+$/)){this.dEContentType=new h({oid:i});}else{this.dEContentType=new h({name:i});}};this.setContentValue=function(i){if(i!==undefined){if(typeof i.hex=="string"){this.eContentValueHex=i.hex;}else{if(typeof i.str=="string"){this.eContentValueHex=utf8tohex(i.str);}}}};this.setContentValueHex=function(i){this.eContentValueHex=i;};this.setContentValueStr=function(i){this.eContentValueHex=utf8tohex(i);};this.getEncodedHex=function(){if(typeof this.eContentValueHex!="string"){throw"eContentValue not yet set"}var k=new d({hex:this.eContentValueHex});this.dEContent=new e({obj:k,tag:"a0",explicit:true});var i=[this.dEContentType];if(!this.isDetached){i.push(this.dEContent);}var j=new a({array:i});this.hTLV=j.getEncodedHex();return this.hTLV};};YAHOO.lang.extend(KJUR.asn1.cms.EncapsulatedContentInfo,KJUR.asn1.ASN1Object);KJUR.asn1.cms.ContentInfo=function(f){var c=KJUR,b=c.asn1,d=b.DERTaggedObject,a=b.DERSequence,e=b.x509;KJUR.asn1.cms.ContentInfo.superclass.constructor.call(this);this.dContentType=null;this.dContent=null;this.setContentType=function(g){if(typeof g=="string"){this.dContentType=e.OID.name2obj(g);}};this.getEncodedHex=function(){var h=new d({obj:this.dContent,tag:"a0",explicit:true});var g=new a({array:[this.dContentType,h]});this.hTLV=g.getEncodedHex();return this.hTLV};if(f!==undefined){if(f.type){this.setContentType(f.type);}if(f.obj&&f.obj instanceof b.ASN1Object){this.dContent=f.obj;}}};YAHOO.lang.extend(KJUR.asn1.cms.ContentInfo,KJUR.asn1.ASN1Object);KJUR.asn1.cms.SignedData=function(e){var a=KJUR,h=a.asn1,j=h.ASN1Object,g=h.DERInteger,m=h.DERSet,f=h.DERSequence,b=h.DERTaggedObject,l=h.cms,i=l.EncapsulatedContentInfo,d=l.SignerInfo,n=l.ContentInfo,c=h.x509,k=c.AlgorithmIdentifier;KJUR.asn1.cms.SignedData.superclass.constructor.call(this);this.dCMSVersion=new g({"int":1});this.dDigestAlgs=null;this.digestAlgNameList=[];this.dEncapContentInfo=new i();this.dCerts=null;this.certificateList=[];this.crlList=[];this.signerInfoList=[new d()];this.addCertificatesByPEM=function(p){var q=pemtohex(p);var r=new j();r.hTLV=q;this.certificateList.push(r);};this.getEncodedHex=function(){if(typeof this.hTLV=="string"){return this.hTLV}if(this.dDigestAlgs==null){var u=[];for(var t=0;t<this.digestAlgNameList.length;t++){var s=this.digestAlgNameList[t];var w=new k({name:s});u.push(w);}this.dDigestAlgs=new m({array:u});}var p=[this.dCMSVersion,this.dDigestAlgs,this.dEncapContentInfo];if(this.dCerts==null){if(this.certificateList.length>0){var v=new m({array:this.certificateList});this.dCerts=new b({obj:v,tag:"a0",explicit:false});}}if(this.dCerts!=null){p.push(this.dCerts);}var r=new m({array:this.signerInfoList});p.push(r);var q=new f({array:p});this.hTLV=q.getEncodedHex();return this.hTLV};this.getContentInfo=function(){this.getEncodedHex();var o=new n({type:"signed-data",obj:this});return o};this.getContentInfoEncodedHex=function(){var o=this.getContentInfo();var p=o.getEncodedHex();return p};this.getPEM=function(){return hextopem(this.getContentInfoEncodedHex(),"CMS")};};YAHOO.lang.extend(KJUR.asn1.cms.SignedData,KJUR.asn1.ASN1Object);KJUR.asn1.cms.CMSUtil=new function(){};KJUR.asn1.cms.CMSUtil.newSignedData=function(d){var b=KJUR,j=b.asn1,q=j.cms,f=q.SignerInfo,n=q.SignedData,o=q.SigningTime,a=q.SigningCertificate,p=q.SigningCertificateV2,c=j.cades,e=c.SignaturePolicyIdentifier;var m=new n();m.dEncapContentInfo.setContentValue(d.content);if(typeof d.certs=="object"){for(var h=0;h<d.certs.length;h++){m.addCertificatesByPEM(d.certs[h]);}}m.signerInfoList=[];for(var h=0;h<d.signerInfos.length;h++){var k=d.signerInfos[h];var g=new f();g.setSignerIdentifier(k.signerCert);g.setForContentAndHash({sdObj:m,eciObj:m.dEncapContentInfo,hashAlg:k.hashAlg});for(attrName in k.sAttr){var r=k.sAttr[attrName];if(attrName=="SigningTime"){var l=new o(r);g.dSignedAttrs.add(l);}if(attrName=="SigningCertificate"){var l=new a(r);g.dSignedAttrs.add(l);}if(attrName=="SigningCertificateV2"){var l=new p(r);g.dSignedAttrs.add(l);}if(attrName=="SignaturePolicyIdentifier"){var l=new e(r);g.dSignedAttrs.add(l);}}g.sign(k.signerPrvKey,k.sigAlg);m.signerInfoList.push(g);}return m};KJUR.asn1.cms.CMSUtil.verifySignedData=function(n){var C=KJUR,i=C.lang.String.isHex,v=ASN1HEX,h=v.getVbyList,a=v.getTLVbyList,t=v.getIdxbyList,z=v.getChildIdx,c=v.getTLV,B=v.oidname,j=C.crypto.Util.hashHex;if(n.cms===undefined&&!i(n.cms));var E=n.cms;var g=function(J,H){var G;for(var I=3;I<6;I++){G=t(J,0,[1,0,I]);if(G!==undefined){var F=J.substr(G,2);if(F==="a0"){H.certsIdx=G;}if(F==="a1"){H.revinfosIdx=G;}if(F==="31"){H.signerinfosIdx=G;}}}};var l=function(I,F){var H=F.signerinfosIdx;if(H===undefined){return}var L=z(I,H);F.signerInfoIdxList=L;for(var G=0;G<L.length;G++){var K=L[G];var J={idx:K};k(I,J);F.signerInfos.push(J);}};var k=function(I,J){var F=J.idx;J.signerid_issuer1=a(I,F,[1,0],"30");J.signerid_serial1=h(I,F,[1,1],"02");J.hashalg=B(h(I,F,[2,0],"06"));var H=t(I,F,[3],"a0");J.idxSignedAttrs=H;f(I,J,H);var G=z(I,F);var K=G.length;if(K<6){throw"malformed SignerInfo"}J.sigalg=B(h(I,F,[K-2,0],"06"));J.sigval=h(I,F,[K-1],"04");};var f=function(L,M,F){var J=z(L,F);M.signedAttrIdxList=J;for(var K=0;K<J.length;K++){var I=J[K];var G=h(L,I,[0],"06");var H;if(G==="2a864886f70d010905"){H=hextoutf8(h(L,I,[1,0]));M.saSigningTime=H;}else{if(G==="2a864886f70d010904"){H=h(L,I,[1,0],"04");M.saMessageDigest=H;}}}};var w=function(G,F){if(h(G,0,[0],"06")!=="2a864886f70d010702"){return F}F.cmsType="signedData";F.econtent=h(G,0,[1,0,2,1,0]);g(G,F);F.signerInfos=[];l(G,F);};var o=function(J,F){var G=F.parse.signerInfos;var L=G.length;var K=true;for(var I=0;I<L;I++){var H=G[I];e(J,F,H);if(!H.isValid){K=false;}}F.isValid=K;};var x=function(F,Q,J,P){var N=Q.parse.certsIdx;var H;if(Q.certs===undefined){H=[];Q.certkeys=[];var K=z(F,N);for(var I=0;I<K.length;I++){var M=c(F,K[I]);var O=new X509();O.readCertHex(M);H[I]=O;Q.certkeys[I]=O.getPublicKey();}Q.certs=H;}else{H=Q.certs;}Q.cccc=H.length;Q.cccci=K.length;for(var I=0;I<H.length;I++){var L=O.getIssuerHex();var G=O.getSerialNumberHex();if(J.signerid_issuer1===L&&J.signerid_serial1===G){J.certkey_idx=I;}}};var e=function(F,R,I,N){I.verifyDetail={};var Q=I.verifyDetail;var K=R.parse.econtent;var G=I.hashalg;var L=I.saMessageDigest;Q.validMessageDigest=false;if(j(K,G)===L){Q.validMessageDigest=true;}x(F,R,I);Q.validSignatureValue=false;var H=I.sigalg;var M="31"+c(F,I.idxSignedAttrs).substr(2);I.signedattrshex=M;var J=R.certs[I.certkey_idx].getPublicKey();var P=new KJUR.crypto.Signature({alg:H});P.init(J);P.updateHex(M);var O=P.verify(I.sigval);Q.validSignatureValue_isValid=O;if(O===true){Q.validSignatureValue=true;}I.isValid=false;if(Q.validMessageDigest&&Q.validSignatureValue){I.isValid=true;}};var r={isValid:false,parse:{}};w(E,r.parse);o(E,r);return r};
if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={};}if(typeof KJUR.asn1.tsp=="undefined"||!KJUR.asn1.tsp){KJUR.asn1.tsp={};}KJUR.asn1.tsp.Accuracy=function(f){var c=KJUR,b=c.asn1,e=b.DERInteger,a=b.DERSequence,d=b.DERTaggedObject;b.tsp.Accuracy.superclass.constructor.call(this);this.seconds=null;this.millis=null;this.micros=null;this.getEncodedHex=function(){var i=null;var k=null;var m=null;var g=[];if(this.seconds!=null){i=new e({"int":this.seconds});g.push(i);}if(this.millis!=null){var l=new e({"int":this.millis});k=new d({obj:l,tag:"80",explicit:false});g.push(k);}if(this.micros!=null){var j=new e({"int":this.micros});m=new d({obj:j,tag:"81",explicit:false});g.push(m);}var h=new a({array:g});this.hTLV=h.getEncodedHex();return this.hTLV};if(f!==undefined){if(typeof f.seconds=="number"){this.seconds=f.seconds;}if(typeof f.millis=="number"){this.millis=f.millis;}if(typeof f.micros=="number"){this.micros=f.micros;}}};YAHOO.lang.extend(KJUR.asn1.tsp.Accuracy,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.MessageImprint=function(g){var c=KJUR,b=c.asn1,a=b.DERSequence,d=b.DEROctetString,f=b.x509,e=f.AlgorithmIdentifier;b.tsp.MessageImprint.superclass.constructor.call(this);this.dHashAlg=null;this.dHashValue=null;this.getEncodedHex=function(){if(typeof this.hTLV=="string"){return this.hTLV}var h=new a({array:[this.dHashAlg,this.dHashValue]});return h.getEncodedHex()};if(g!==undefined){if(typeof g.hashAlg=="string"){this.dHashAlg=new e({name:g.hashAlg});}if(typeof g.hashValue=="string"){this.dHashValue=new d({hex:g.hashValue});}}};YAHOO.lang.extend(KJUR.asn1.tsp.MessageImprint,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.TimeStampReq=function(c){var a=KJUR,f=a.asn1,d=f.DERSequence,e=f.DERInteger,g=f.DERBoolean,i=f.DERObjectIdentifier,h=f.tsp,b=h.MessageImprint;h.TimeStampReq.superclass.constructor.call(this);this.dVersion=new e({"int":1});this.dMessageImprint=null;this.dPolicy=null;this.dNonce=null;this.certReq=true;this.setMessageImprint=function(j){if(j instanceof b){this.dMessageImprint=j;return}if(typeof j=="object"){this.dMessageImprint=new b(j);}};this.getEncodedHex=function(){if(this.dMessageImprint==null){throw"messageImprint shall be specified"}var j=[this.dVersion,this.dMessageImprint];if(this.dPolicy!=null){j.push(this.dPolicy);}if(this.dNonce!=null){j.push(this.dNonce);}if(this.certReq){j.push(new g());}var k=new d({array:j});this.hTLV=k.getEncodedHex();return this.hTLV};if(c!==undefined){if(typeof c.mi=="object"){this.setMessageImprint(c.mi);}if(typeof c.policy=="object"){this.dPolicy=new i(c.policy);}if(typeof c.nonce=="object"){this.dNonce=new e(c.nonce);}if(typeof c.certreq=="boolean"){this.certReq=c.certreq;}}};YAHOO.lang.extend(KJUR.asn1.tsp.TimeStampReq,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.TSTInfo=function(e){var c=KJUR,i=c.asn1,f=i.DERSequence,h=i.DERInteger,k=i.DERBoolean,g=i.DERGeneralizedTime,l=i.DERObjectIdentifier,j=i.tsp,d=j.MessageImprint,b=j.Accuracy,a=i.x509.X500Name;j.TSTInfo.superclass.constructor.call(this);this.dVersion=new h({"int":1});this.dPolicy=null;this.dMessageImprint=null;this.dSerialNumber=null;this.dGenTime=null;this.dAccuracy=null;this.dOrdering=null;this.dNonce=null;this.dTsa=null;this.getEncodedHex=function(){var m=[this.dVersion];if(this.dPolicy==null){throw"policy shall be specified."}m.push(this.dPolicy);if(this.dMessageImprint==null){throw"messageImprint shall be specified."}m.push(this.dMessageImprint);if(this.dSerialNumber==null){throw"serialNumber shall be specified."}m.push(this.dSerialNumber);if(this.dGenTime==null){throw"genTime shall be specified."}m.push(this.dGenTime);if(this.dAccuracy!=null){m.push(this.dAccuracy);}if(this.dOrdering!=null){m.push(this.dOrdering);}if(this.dNonce!=null){m.push(this.dNonce);}if(this.dTsa!=null){m.push(this.dTsa);}var n=new f({array:m});this.hTLV=n.getEncodedHex();return this.hTLV};if(e!==undefined){if(typeof e.policy=="string"){if(!e.policy.match(/^[0-9.]+$/)){throw"policy shall be oid like 0.1.4.134"}this.dPolicy=new l({oid:e.policy});}if(e.messageImprint!==undefined){this.dMessageImprint=new d(e.messageImprint);}if(e.serialNumber!==undefined){this.dSerialNumber=new h(e.serialNumber);}if(e.genTime!==undefined){this.dGenTime=new g(e.genTime);}if(e.accuracy!==undefined){this.dAccuracy=new b(e.accuracy);}if(e.ordering!==undefined&&e.ordering==true){this.dOrdering=new k();}if(e.nonce!==undefined){this.dNonce=new h(e.nonce);}if(e.tsa!==undefined){this.dTsa=new a(e.tsa);}}};YAHOO.lang.extend(KJUR.asn1.tsp.TSTInfo,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.TimeStampResp=function(g){var e=KJUR,d=e.asn1,c=d.DERSequence,f=d.ASN1Object,a=d.tsp,b=a.PKIStatusInfo;a.TimeStampResp.superclass.constructor.call(this);this.dStatus=null;this.dTST=null;this.getEncodedHex=function(){if(this.dStatus==null){throw"status shall be specified"}var h=[this.dStatus];if(this.dTST!=null){h.push(this.dTST);}var i=new c({array:h});this.hTLV=i.getEncodedHex();return this.hTLV};if(g!==undefined){if(typeof g.status=="object"){this.dStatus=new b(g.status);}if(g.tst!==undefined&&g.tst instanceof f){this.dTST=g.tst.getContentInfo();}}};YAHOO.lang.extend(KJUR.asn1.tsp.TimeStampResp,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.PKIStatusInfo=function(h){var g=KJUR,f=g.asn1,e=f.DERSequence,a=f.tsp,d=a.PKIStatus,c=a.PKIFreeText,b=a.PKIFailureInfo;a.PKIStatusInfo.superclass.constructor.call(this);this.dStatus=null;this.dStatusString=null;this.dFailureInfo=null;this.getEncodedHex=function(){if(this.dStatus==null){throw"status shall be specified"}var i=[this.dStatus];if(this.dStatusString!=null){i.push(this.dStatusString);}if(this.dFailureInfo!=null){i.push(this.dFailureInfo);}var j=new e({array:i});this.hTLV=j.getEncodedHex();return this.hTLV};if(h!==undefined){if(typeof h.status=="object"){this.dStatus=new d(h.status);}if(typeof h.statstr=="object"){this.dStatusString=new c({array:h.statstr});}if(typeof h.failinfo=="object"){this.dFailureInfo=new b(h.failinfo);}}};YAHOO.lang.extend(KJUR.asn1.tsp.PKIStatusInfo,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.PKIStatus=function(h){var d=KJUR,c=d.asn1,g=c.DERInteger,a=c.tsp,b=a.PKIStatus;a.PKIStatus.superclass.constructor.call(this);this.getEncodedHex=function(){this.hTLV=this.dStatus.getEncodedHex();return this.hTLV};if(h!==undefined){if(h.name!==undefined){var e=b.valueList;if(e[h.name]===undefined){throw"name undefined: "+h.name}this.dStatus=new g({"int":e[h.name]});}else{this.dStatus=new g(h);}}};YAHOO.lang.extend(KJUR.asn1.tsp.PKIStatus,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.PKIStatus.valueList={granted:0,grantedWithMods:1,rejection:2,waiting:3,revocationWarning:4,revocationNotification:5};KJUR.asn1.tsp.PKIFreeText=function(f){var e=KJUR,d=e.asn1,b=d.DERSequence,c=d.DERUTF8String,a=d.tsp;a.PKIFreeText.superclass.constructor.call(this);this.textList=[];this.getEncodedHex=function(){var g=[];for(var j=0;j<this.textList.length;j++){g.push(new c({str:this.textList[j]}));}var h=new b({array:g});this.hTLV=h.getEncodedHex();return this.hTLV};if(f!==undefined){if(typeof f.array=="object"){this.textList=f.array;}}};YAHOO.lang.extend(KJUR.asn1.tsp.PKIFreeText,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.PKIFailureInfo=function(g){var d=KJUR,c=d.asn1,f=c.DERBitString,a=c.tsp,b=a.PKIFailureInfo;b.superclass.constructor.call(this);this.value=null;this.getEncodedHex=function(){if(this.value==null){throw"value shall be specified"}var h=new Number(this.value).toString(2);var i=new f();i.setByBinaryString(h);this.hTLV=i.getEncodedHex();return this.hTLV};if(g!==undefined){if(typeof g.name=="string"){var e=b.valueList;if(e[g.name]===undefined){throw"name undefined: "+g.name}this.value=e[g.name];}else{if(typeof g["int"]=="number"){this.value=g["int"];}}}};YAHOO.lang.extend(KJUR.asn1.tsp.PKIFailureInfo,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.PKIFailureInfo.valueList={badAlg:0,badRequest:2,badDataFormat:5,timeNotAvailable:14,unacceptedPolicy:15,unacceptedExtension:16,addInfoNotAvailable:17,systemFailure:25};KJUR.asn1.tsp.AbstractTSAAdapter=function(a){this.getTSTHex=function(c,b){throw"not implemented yet"};};KJUR.asn1.tsp.SimpleTSAAdapter=function(e){var d=KJUR,c=d.asn1,a=c.tsp,b=d.crypto.Util.hashHex;a.SimpleTSAAdapter.superclass.constructor.call(this);this.params=null;this.serial=0;this.getTSTHex=function(g,f){var i=b(g,f);this.params.tstInfo.messageImprint={hashAlg:f,hashValue:i};this.params.tstInfo.serialNumber={"int":this.serial++};var h=Math.floor(Math.random()*1000000000);this.params.tstInfo.nonce={"int":h};var j=a.TSPUtil.newTimeStampToken(this.params);return j.getContentInfoEncodedHex()};if(e!==undefined){this.params=e;}};YAHOO.lang.extend(KJUR.asn1.tsp.SimpleTSAAdapter,KJUR.asn1.tsp.AbstractTSAAdapter);KJUR.asn1.tsp.FixedTSAAdapter=function(e){var d=KJUR,c=d.asn1,a=c.tsp,b=d.crypto.Util.hashHex;a.FixedTSAAdapter.superclass.constructor.call(this);this.params=null;this.getTSTHex=function(g,f){var h=b(g,f);this.params.tstInfo.messageImprint={hashAlg:f,hashValue:h};var i=a.TSPUtil.newTimeStampToken(this.params);return i.getContentInfoEncodedHex()};if(e!==undefined){this.params=e;}};YAHOO.lang.extend(KJUR.asn1.tsp.FixedTSAAdapter,KJUR.asn1.tsp.AbstractTSAAdapter);KJUR.asn1.tsp.TSPUtil=new function(){};KJUR.asn1.tsp.TSPUtil.newTimeStampToken=function(c){var b=KJUR,h=b.asn1,m=h.cms,a=h.tsp.TSTInfo;var j=new m.SignedData();var g=new a(c.tstInfo);var f=g.getEncodedHex();j.dEncapContentInfo.setContentValue({hex:f});j.dEncapContentInfo.setContentType("tstinfo");if(typeof c.certs=="object"){for(var e=0;e<c.certs.length;e++){j.addCertificatesByPEM(c.certs[e]);}}var d=j.signerInfoList[0];d.setSignerIdentifier(c.signerCert);d.setForContentAndHash({sdObj:j,eciObj:j.dEncapContentInfo,hashAlg:c.hashAlg});var l=new m.SigningCertificate({array:[c.signerCert]});d.dSignedAttrs.add(l);d.sign(c.signerPrvKey,c.sigAlg);return j};KJUR.asn1.tsp.TSPUtil.parseTimeStampReq=function(m){var l=ASN1HEX;var h=l.getChildIdx;var f=l.getV;var b=l.getTLV;var j={};j.certreq=false;var a=h(m,0);if(a.length<2){throw"TimeStampReq must have at least 2 items"}var e=b(m,a[1]);j.mi=KJUR.asn1.tsp.TSPUtil.parseMessageImprint(e);for(var d=2;d<a.length;d++){var g=a[d];var k=m.substr(g,2);if(k=="06"){var c=f(m,g);j.policy=l.hextooidstr(c);}if(k=="02"){j.nonce=f(m,g);}if(k=="01"){j.certreq=true;}}return j};KJUR.asn1.tsp.TSPUtil.parseMessageImprint=function(c){var m=ASN1HEX;var j=m.getChildIdx;var i=m.getV;var g=m.getIdxbyList;var k={};if(c.substr(0,2)!="30"){throw"head of messageImprint hex shall be '30'"}var a=j(c,0);var l=g(c,0,[0,0]);var e=i(c,l);var d=m.hextooidstr(e);var h=KJUR.asn1.x509.OID.oid2name(d);if(h==""){throw"hashAlg name undefined: "+d}var b=h;var f=g(c,0,[1]);k.hashAlg=b;k.hashValue=i(c,f);return k};
if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={};}if(typeof KJUR.asn1.cades=="undefined"||!KJUR.asn1.cades){KJUR.asn1.cades={};}KJUR.asn1.cades.SignaturePolicyIdentifier=function(f){var b=KJUR,h=b.asn1,i=h.DERObjectIdentifier,g=h.DERSequence,e=h.cades,c=e.OtherHashAlgAndValue;e.SignaturePolicyIdentifier.superclass.constructor.call(this);this.attrTypeOid="1.2.840.113549.1.9.16.2.15";if(f!==undefined){if(typeof f.oid=="string"&&typeof f.hash=="object"){var d=new i({oid:f.oid});var a=new c(f.hash);var j=new g({array:[d,a]});this.valueList=[j];}}};YAHOO.lang.extend(KJUR.asn1.cades.SignaturePolicyIdentifier,KJUR.asn1.cms.Attribute);KJUR.asn1.cades.OtherHashAlgAndValue=function(e){var a=KJUR,g=a.asn1,f=g.DERSequence,h=g.DEROctetString,d=g.x509,i=d.AlgorithmIdentifier,c=g.cades,b=c.OtherHashAlgAndValue;b.superclass.constructor.call(this);this.dAlg=null;this.dHash=null;this.getEncodedHex=function(){var j=new f({array:[this.dAlg,this.dHash]});this.hTLV=j.getEncodedHex();return this.hTLV};if(e!==undefined){if(typeof e.alg=="string"&&typeof e.hash=="string"){this.dAlg=new i({name:e.alg});this.dHash=new h({hex:e.hash});}}};YAHOO.lang.extend(KJUR.asn1.cades.OtherHashAlgAndValue,KJUR.asn1.ASN1Object);KJUR.asn1.cades.SignatureTimeStamp=function(h){var c=KJUR,b=c.asn1,e=b.ASN1Object,a=b.cades;a.SignatureTimeStamp.superclass.constructor.call(this);this.attrTypeOid="1.2.840.113549.1.9.16.2.14";this.tstHex=null;if(h!==undefined){if(h.res!==undefined){if(typeof h.res=="string"&&h.res.match(/^[0-9A-Fa-f]+$/));else{if(h.res instanceof e);else{throw"res param shall be ASN1Object or hex string"}}}if(h.tst!==undefined){if(typeof h.tst=="string"&&h.tst.match(/^[0-9A-Fa-f]+$/)){var f=new e();this.tstHex=h.tst;f.hTLV=this.tstHex;f.getEncodedHex();this.valueList=[f];}else{if(h.tst instanceof e);else{throw"tst param shall be ASN1Object or hex string"}}}}};YAHOO.lang.extend(KJUR.asn1.cades.SignatureTimeStamp,KJUR.asn1.cms.Attribute);KJUR.asn1.cades.CompleteCertificateRefs=function(d){var c=KJUR,b=c.asn1,a=b.cades;a.CompleteCertificateRefs.superclass.constructor.call(this);this.attrTypeOid="1.2.840.113549.1.9.16.2.21";this.setByArray=function(e){this.valueList=[];for(var f=0;f<e.length;f++){var g=new a.OtherCertID(e[f]);this.valueList.push(g);}};if(d!==undefined){if(typeof d=="object"&&typeof d.length=="number"){this.setByArray(d);}}};YAHOO.lang.extend(KJUR.asn1.cades.CompleteCertificateRefs,KJUR.asn1.cms.Attribute);KJUR.asn1.cades.OtherCertID=function(e){var c=KJUR,b=c.asn1,d=b.cms,a=b.cades;a.OtherCertID.superclass.constructor.call(this);this.hasIssuerSerial=true;this.dOtherCertHash=null;this.dIssuerSerial=null;this.setByCertPEM=function(f){this.dOtherCertHash=new a.OtherHash(f);if(this.hasIssuerSerial){this.dIssuerSerial=new d.IssuerAndSerialNumber(f);}};this.getEncodedHex=function(){if(this.hTLV!=null){return this.hTLV}if(this.dOtherCertHash==null){throw"otherCertHash not set"}var f=[this.dOtherCertHash];if(this.dIssuerSerial!=null){f.push(this.dIssuerSerial);}var g=new b.DERSequence({array:f});this.hTLV=g.getEncodedHex();return this.hTLV};if(e!==undefined){if(typeof e=="string"&&e.indexOf("-----BEGIN ")!=-1){this.setByCertPEM(e);}if(typeof e=="object"){if(e.hasis===false){this.hasIssuerSerial=false;}if(typeof e.cert=="string"){this.setByCertPEM(e.cert);}}}};YAHOO.lang.extend(KJUR.asn1.cades.OtherCertID,KJUR.asn1.ASN1Object);KJUR.asn1.cades.OtherHash=function(f){var d=KJUR,c=d.asn1,b=c.cades,g=b.OtherHashAlgAndValue,a=d.crypto.Util.hashHex;b.OtherHash.superclass.constructor.call(this);this.alg="sha256";this.dOtherHash=null;this.setByCertPEM=function(h){if(h.indexOf("-----BEGIN ")==-1){throw"certPEM not to seem PEM format"}var i=pemtohex(h);var j=a(i,this.alg);this.dOtherHash=new g({alg:this.alg,hash:j});};this.getEncodedHex=function(){if(this.dOtherHash==null){throw"OtherHash not set"}return this.dOtherHash.getEncodedHex()};if(f!==undefined){if(typeof f=="string"){if(f.indexOf("-----BEGIN ")!=-1){this.setByCertPEM(f);}else{if(f.match(/^[0-9A-Fa-f]+$/)){this.dOtherHash=new c.DEROctetString({hex:f});}else{throw"unsupported string value for params"}}}else{if(typeof f=="object"){if(typeof f.cert=="string"){if(typeof f.alg=="string"){this.alg=f.alg;}this.setByCertPEM(f.cert);}else{this.dOtherHash=new g(f);}}}}};YAHOO.lang.extend(KJUR.asn1.cades.OtherHash,KJUR.asn1.ASN1Object);KJUR.asn1.cades.CAdESUtil=new function(){};KJUR.asn1.cades.CAdESUtil.addSigTS=function(c,b,a){};KJUR.asn1.cades.CAdESUtil.parseSignedDataForAddingUnsigned=function(e){var p=ASN1HEX,u=p.getChildIdx,b=p.getTLV,a=p.getTLVbyList,k=p.getIdxbyList,A=KJUR,g=A.asn1,l=g.ASN1Object,j=g.cms,h=j.SignedData,v=g.cades,z=v.CAdESUtil;var m={};if(a(e,0,[0])!="06092a864886f70d010702"){throw"hex is not CMS SignedData"}var y=k(e,0,[1,0]);var B=u(e,y);if(B.length<4){throw"num of SignedData elem shall be 4 at least"}var d=B.shift();m.version=b(e,d);var w=B.shift();m.algs=b(e,w);var c=B.shift();m.encapcontent=b(e,c);m.certs=null;m.revs=null;m.si=[];var o=B.shift();if(e.substr(o,2)=="a0"){m.certs=b(e,o);o=B.shift();}if(e.substr(o,2)=="a1"){m.revs=b(e,o);o=B.shift();}var t=o;if(e.substr(t,2)!="31"){throw"Can't find signerInfos"}var f=u(e,t);for(var q=0;q<f.length;q++){var s=f[q];var n=z.parseSignerInfoForAddingUnsigned(e,s,q);m.si[q]=n;}var x=null;m.obj=new h();x=new l();x.hTLV=m.version;m.obj.dCMSVersion=x;x=new l();x.hTLV=m.algs;m.obj.dDigestAlgs=x;x=new l();x.hTLV=m.encapcontent;m.obj.dEncapContentInfo=x;x=new l();x.hTLV=m.certs;m.obj.dCerts=x;m.obj.signerInfoList=[];for(var q=0;q<m.si.length;q++){m.obj.signerInfoList.push(m.si[q].obj);}return m};KJUR.asn1.cades.CAdESUtil.parseSignerInfoForAddingUnsigned=function(g,q,c){var p=ASN1HEX,s=p.getChildIdx,a=p.getTLV,l=p.getV,v=KJUR,h=v.asn1,n=h.ASN1Object,j=h.cms,k=j.AttributeList,w=j.SignerInfo;var o={};var t=s(g,q);if(t.length!=6){throw"not supported items for SignerInfo (!=6)"}var d=t.shift();o.version=a(g,d);var e=t.shift();o.si=a(g,e);var m=t.shift();o.digalg=a(g,m);var f=t.shift();o.sattrs=a(g,f);var i=t.shift();o.sigalg=a(g,i);var b=t.shift();o.sig=a(g,b);o.sigval=l(g,b);var u=null;o.obj=new w();u=new n();u.hTLV=o.version;o.obj.dCMSVersion=u;u=new n();u.hTLV=o.si;o.obj.dSignerIdentifier=u;u=new n();u.hTLV=o.digalg;o.obj.dDigestAlgorithm=u;u=new n();u.hTLV=o.sattrs;o.obj.dSignedAttrs=u;u=new n();u.hTLV=o.sigalg;o.obj.dSigAlg=u;u=new n();u.hTLV=o.sig;o.obj.dSig=u;o.obj.dUnsignedAttrs=new k();return o};
if(typeof KJUR.asn1.csr=="undefined"||!KJUR.asn1.csr){KJUR.asn1.csr={};}KJUR.asn1.csr.CertificationRequest=function(d){var a=KJUR,f=a.asn1,b=f.DERBitString,e=f.DERSequence,k=f.csr,c=f.x509;k.CertificationRequest.superclass.constructor.call(this);this.sign=function(o,n){if(this.prvKey==null){this.prvKey=n;}this.asn1SignatureAlg=new c.AlgorithmIdentifier({name:o});sig=new a.crypto.Signature({alg:o});sig.init(this.prvKey);sig.updateHex(this.asn1CSRInfo.getEncodedHex());this.hexSig=sig.sign();this.asn1Sig=new b({hex:"00"+this.hexSig});var m=new e({array:[this.asn1CSRInfo,this.asn1SignatureAlg,this.asn1Sig]});this.hTLV=m.getEncodedHex();this.isModified=false;};this.getPEMString=function(){return hextopem(this.getEncodedHex(),"CERTIFICATE REQUEST")};this.getEncodedHex=function(){if(this.isModified==false&&this.hTLV!=null){return this.hTLV}throw"not signed yet"};if(d!==undefined&&d.csrinfo!==undefined){this.asn1CSRInfo=d.csrinfo;}};YAHOO.lang.extend(KJUR.asn1.csr.CertificationRequest,KJUR.asn1.ASN1Object);KJUR.asn1.csr.CertificationRequestInfo=function(e){var b=KJUR,h=b.asn1,g=h.DERInteger,f=h.DERSequence,m=h.DERSet,j=h.DERNull,c=h.DERTaggedObject,k=h.DERObjectIdentifier,l=h.csr,d=h.x509,a=d.X500Name,n=d.Extension,i=KEYUTIL;l.CertificationRequestInfo.superclass.constructor.call(this);this._initialize=function(){this.asn1Array=new Array();this.asn1Version=new g({"int":0});this.asn1Subject=null;this.asn1SubjPKey=null;this.extensionsArray=new Array();};this.setSubjectByParam=function(o){this.asn1Subject=new a(o);};this.setSubjectPublicKeyByGetKey=function(p){var o=i.getKey(p);this.asn1SubjPKey=new d.SubjectPublicKeyInfo(o);};this.appendExtensionByName=function(p,o){n.appendByNameToArray(p,o,this.extensionsArray);};this.getEncodedHex=function(){this.asn1Array=new Array();this.asn1Array.push(this.asn1Version);this.asn1Array.push(this.asn1Subject);this.asn1Array.push(this.asn1SubjPKey);if(this.extensionsArray.length>0){var s=new f({array:this.extensionsArray});var r=new m({array:[s]});var q=new f({array:[new k({oid:"1.2.840.113549.1.9.14"}),r]});var p=new c({explicit:true,tag:"a0",obj:q});this.asn1Array.push(p);}else{var p=new c({explicit:false,tag:"a0",obj:new j()});this.asn1Array.push(p);}var t=new f({array:this.asn1Array});this.hTLV=t.getEncodedHex();this.isModified=false;return this.hTLV};this._initialize();};YAHOO.lang.extend(KJUR.asn1.csr.CertificationRequestInfo,KJUR.asn1.ASN1Object);KJUR.asn1.csr.CSRUtil=new function(){};KJUR.asn1.csr.CSRUtil.newCSRPEM=function(h){var c=KEYUTIL,b=KJUR.asn1.csr;if(h.subject===undefined){throw"parameter subject undefined"}if(h.sbjpubkey===undefined){throw"parameter sbjpubkey undefined"}if(h.sigalg===undefined){throw"parameter sigalg undefined"}if(h.sbjprvkey===undefined){throw"parameter sbjpubkey undefined"}var d=new b.CertificationRequestInfo();d.setSubjectByParam(h.subject);d.setSubjectPublicKeyByGetKey(h.sbjpubkey);if(h.ext!==undefined&&h.ext.length!==undefined){for(var e=0;e<h.ext.length;e++){for(key in h.ext[e]){d.appendExtensionByName(key,h.ext[e][key]);}}}var f=new b.CertificationRequest({csrinfo:d});var a=c.getKey(h.sbjprvkey);f.sign(h.sigalg,a);var g=f.getPEMString();return g};KJUR.asn1.csr.CSRUtil.getInfo=function(b){var d=ASN1HEX;var e=d.getTLVbyList;var a={};a.subject={};a.pubkey={};if(b.indexOf("-----BEGIN CERTIFICATE REQUEST")==-1){throw"argument is not PEM file"}var c=pemtohex(b,"CERTIFICATE REQUEST");a.subject.hex=e(c,0,[0,1]);a.subject.name=X509.hex2dn(a.subject.hex);a.pubkey.hex=e(c,0,[0,2]);a.pubkey.obj=KEYUTIL.getKey(a.pubkey.hex,null,"pkcs8pub");return a};
if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={};}if(typeof KJUR.asn1.ocsp=="undefined"||!KJUR.asn1.ocsp){KJUR.asn1.ocsp={};}KJUR.asn1.ocsp.DEFAULT_HASH="sha1";KJUR.asn1.ocsp.CertID=function(g){var d=KJUR,k=d.asn1,m=k.DEROctetString,j=k.DERInteger,h=k.DERSequence,f=k.x509,n=f.AlgorithmIdentifier,o=k.ocsp,l=o.DEFAULT_HASH,i=d.crypto,e=i.Util.hashHex,c=X509,q=ASN1HEX;o.CertID.superclass.constructor.call(this);this.dHashAlg=null;this.dIssuerNameHash=null;this.dIssuerKeyHash=null;this.dSerialNumber=null;this.setByValue=function(t,s,p,r){if(r===undefined){r=l;}this.dHashAlg=new n({name:r});this.dIssuerNameHash=new m({hex:t});this.dIssuerKeyHash=new m({hex:s});this.dSerialNumber=new j({hex:p});};this.setByCert=function(x,t,v){if(v===undefined){v=l;}var p=new c();p.readCertPEM(t);var y=new c();y.readCertPEM(x);var z=y.getPublicKeyHex();var w=q.getTLVbyList(z,0,[1,0],"30");var r=p.getSerialNumberHex();var s=e(y.getSubjectHex(),v);var u=e(w,v);this.setByValue(s,u,r,v);this.hoge=p.getSerialNumberHex();};this.getEncodedHex=function(){if(this.dHashAlg===null&&this.dIssuerNameHash===null&&this.dIssuerKeyHash===null&&this.dSerialNumber===null){throw"not yet set values"}var p=[this.dHashAlg,this.dIssuerNameHash,this.dIssuerKeyHash,this.dSerialNumber];var r=new h({array:p});this.hTLV=r.getEncodedHex();return this.hTLV};if(g!==undefined){var b=g;if(b.issuerCert!==undefined&&b.subjectCert!==undefined){var a=l;if(b.alg===undefined){a=undefined;}this.setByCert(b.issuerCert,b.subjectCert,a);}else{if(b.namehash!==undefined&&b.keyhash!==undefined&&b.serial!==undefined){var a=l;if(b.alg===undefined){a=undefined;}this.setByValue(b.namehash,b.keyhash,b.serial,a);}else{throw"invalid constructor arguments"}}}};YAHOO.lang.extend(KJUR.asn1.ocsp.CertID,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.Request=function(f){var c=KJUR,b=c.asn1,a=b.DERSequence,d=b.ocsp;d.Request.superclass.constructor.call(this);this.dReqCert=null;this.dExt=null;this.getEncodedHex=function(){var g=[];if(this.dReqCert===null){throw"reqCert not set"}g.push(this.dReqCert);var h=new a({array:g});this.hTLV=h.getEncodedHex();return this.hTLV};if(typeof f!=="undefined"){var e=new d.CertID(f);this.dReqCert=e;}};YAHOO.lang.extend(KJUR.asn1.ocsp.Request,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.TBSRequest=function(e){var c=KJUR,b=c.asn1,a=b.DERSequence,d=b.ocsp;d.TBSRequest.superclass.constructor.call(this);this.version=0;this.dRequestorName=null;this.dRequestList=[];this.dRequestExt=null;this.setRequestListByParam=function(h){var f=[];for(var g=0;g<h.length;g++){var j=new d.Request(h[0]);f.push(j);}this.dRequestList=f;};this.getEncodedHex=function(){var f=[];if(this.version!==0){throw"not supported version: "+this.version}if(this.dRequestorName!==null){throw"requestorName not supported"}var h=new a({array:this.dRequestList});f.push(h);if(this.dRequestExt!==null){throw"requestExtensions not supported"}var g=new a({array:f});this.hTLV=g.getEncodedHex();return this.hTLV};if(e!==undefined){if(e.reqList!==undefined){this.setRequestListByParam(e.reqList);}}};YAHOO.lang.extend(KJUR.asn1.ocsp.TBSRequest,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.OCSPRequest=function(f){var c=KJUR,b=c.asn1,a=b.DERSequence,d=b.ocsp;d.OCSPRequest.superclass.constructor.call(this);this.dTbsRequest=null;this.dOptionalSignature=null;this.getEncodedHex=function(){var g=[];if(this.dTbsRequest!==null){g.push(this.dTbsRequest);}else{throw"tbsRequest not set"}if(this.dOptionalSignature!==null){throw"optionalSignature not supported"}var h=new a({array:g});this.hTLV=h.getEncodedHex();return this.hTLV};if(f!==undefined){if(f.reqList!==undefined){var e=new d.TBSRequest(f);this.dTbsRequest=e;}}};YAHOO.lang.extend(KJUR.asn1.ocsp.OCSPRequest,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.OCSPUtil={};KJUR.asn1.ocsp.OCSPUtil.getRequestHex=function(a,b,h){var d=KJUR,c=d.asn1,e=c.ocsp;if(h===undefined){h=e.DEFAULT_HASH;}var g={alg:h,issuerCert:a,subjectCert:b};var f=new e.OCSPRequest({reqList:[g]});return f.getEncodedHex()};KJUR.asn1.ocsp.OCSPUtil.getOCSPResponseInfo=function(b){var k=ASN1HEX;var c=k.getVbyList;var d=k.getIdxbyList;var c=k.getVbyList;var f=k.getV;var l={};try{var i=c(b,0,[0],"0a");l.responseStatus=parseInt(i,16);}catch(e){}if(l.responseStatus!==0){return l}try{var g=d(b,0,[1,0,1,0,0,2,0,1]);if(b.substr(g,2)==="80"){l.certStatus="good";}else{if(b.substr(g,2)==="a1"){l.certStatus="revoked";l.revocationTime=hextoutf8(c(b,g,[0]));}else{if(b.substr(g,2)==="82"){l.certStatus="unknown";}}}}catch(e){}try{var a=d(b,0,[1,0,1,0,0,2,0,2]);l.thisUpdate=hextoutf8(f(b,a));}catch(e){}try{var j=d(b,0,[1,0,1,0,0,2,0,3]);if(b.substr(j,2)==="a0"){l.nextUpdate=hextoutf8(c(b,j,[0]));}}catch(e){}return l};
var KJUR;if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.lang=="undefined"||!KJUR.lang){KJUR.lang={};}KJUR.lang.String=function(){};function stoBA(d){var b=new Array();for(var c=0;c<d.length;c++){b[c]=d.charCodeAt(c);}return b}function BAtos(b){var d="";for(var c=0;c<b.length;c++){d=d+String.fromCharCode(b[c]);}return d}function BAtohex(b){var e="";for(var d=0;d<b.length;d++){var c=b[d].toString(16);if(c.length==1){c="0"+c;}e=e+c;}return e}function stohex(a){return BAtohex(stoBA(a))}function stob64(a){return hex2b64(stohex(a))}function stob64u(a){return b64tob64u(hex2b64(stohex(a)))}function b64utos(a){return BAtos(b64toBA(b64utob64(a)))}function b64tob64u(a){a=a.replace(/\=/g,"");a=a.replace(/\+/g,"-");a=a.replace(/\//g,"_");return a}function b64utob64(a){if(a.length%4==2){a=a+"==";}else{if(a.length%4==3){a=a+"=";}}a=a.replace(/-/g,"+");a=a.replace(/_/g,"/");return a}function hextob64u(a){if(a.length%2==1){a="0"+a;}return b64tob64u(hex2b64(a))}function b64utohex(a){return b64tohex(b64utob64(a))}var utf8tob64u,b64utoutf8;if(typeof Buffer==="function"){utf8tob64u=function(a){return b64tob64u(new Buffer(a,"utf8").toString("base64"))};b64utoutf8=function(a){return new Buffer(b64utob64(a),"base64").toString("utf8")};}else{utf8tob64u=function(a){return hextob64u(uricmptohex(encodeURIComponentAll(a)))};b64utoutf8=function(a){return decodeURIComponent(hextouricmp(b64utohex(a)))};}function utf8tob64(a){return hex2b64(uricmptohex(encodeURIComponentAll(a)))}function b64toutf8(a){return decodeURIComponent(hextouricmp(b64tohex(a)))}function utf8tohex(a){return uricmptohex(encodeURIComponentAll(a))}function hextoutf8(a){return decodeURIComponent(hextouricmp(a))}function hextorstr(c){var b="";for(var a=0;a<c.length-1;a+=2){b+=String.fromCharCode(parseInt(c.substr(a,2),16));}return b}function rstrtohex(c){var a="";for(var b=0;b<c.length;b++){a+=("0"+c.charCodeAt(b).toString(16)).slice(-2);}return a}function hextob64(a){return hex2b64(a)}function hextob64nl(b){var a=hextob64(b);var c=a.replace(/(.{64})/g,"$1\r\n");c=c.replace(/\r\n$/,"");return c}function b64nltohex(b){var a=b.replace(/[^0-9A-Za-z\/+=]*/g,"");var c=b64tohex(a);return c}function hextopem(a,b){var c=hextob64nl(a);return "-----BEGIN "+b+"-----\r\n"+c+"\r\n-----END "+b+"-----\r\n"}function pemtohex(a,b){if(a.indexOf("-----BEGIN ")==-1){throw"can't find PEM header: "+b}if(b!==undefined){a=a.replace("-----BEGIN "+b+"-----","");a=a.replace("-----END "+b+"-----","");}else{a=a.replace(/-----BEGIN [^-]+-----/,"");a=a.replace(/-----END [^-]+-----/,"");}return b64nltohex(a)}function hextoArrayBuffer(d){if(d.length%2!=0){throw"input is not even length"}if(d.match(/^[0-9A-Fa-f]+$/)==null){throw"input is not hexadecimal"}var b=new ArrayBuffer(d.length/2);var a=new DataView(b);for(var c=0;c<d.length/2;c++){a.setUint8(c,parseInt(d.substr(c*2,2),16));}return b}function ArrayBuffertohex(b){var d="";var a=new DataView(b);for(var c=0;c<b.byteLength;c++){d+=("00"+a.getUint8(c).toString(16)).slice(-2);}return d}function zulutomsec(n){var l,j,m,e,f,i,b;var a,h,g,c;c=n.match(/^(\d{2}|\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/);if(c){a=c[1];l=parseInt(a);if(a.length===2){if(50<=l&&l<100){l=1900+l;}else{if(0<=l&&l<50){l=2000+l;}}}j=parseInt(c[2])-1;m=parseInt(c[3]);e=parseInt(c[4]);f=parseInt(c[5]);i=parseInt(c[6]);b=0;h=c[7];if(h!==""){g=(h.substr(1)+"00").substr(0,3);b=parseInt(g);}return Date.UTC(l,j,m,e,f,i,b)}throw"unsupported zulu format: "+n}function zulutosec(a){var b=zulutomsec(a);return ~~(b/1000)}function zulutodate(a){return new Date(zulutomsec(a))}function datetozulu(g,e,f){var b;var a=g.getUTCFullYear();if(e){if(a<1950||2049<a){throw"not proper year for UTCTime: "+a}b=(""+a).slice(-2);}else{b=("000"+a).slice(-4);}b+=("0"+(g.getUTCMonth()+1)).slice(-2);b+=("0"+g.getUTCDate()).slice(-2);b+=("0"+g.getUTCHours()).slice(-2);b+=("0"+g.getUTCMinutes()).slice(-2);b+=("0"+g.getUTCSeconds()).slice(-2);if(f){var c=g.getUTCMilliseconds();if(c!==0){c=("00"+c).slice(-3);c=c.replace(/0+$/g,"");b+="."+c;}}b+="Z";return b}function uricmptohex(a){return a.replace(/%/g,"")}function hextouricmp(a){return a.replace(/(..)/g,"%$1")}function ipv6tohex(g){var b="malformed IPv6 address";if(!g.match(/^[0-9A-Fa-f:]+$/)){throw b}g=g.toLowerCase();var d=g.split(":").length-1;if(d<2){throw b}var e=":".repeat(7-d+2);g=g.replace("::",e);var c=g.split(":");if(c.length!=8){throw b}for(var f=0;f<8;f++){c[f]=("0000"+c[f]).slice(-4);}return c.join("")}function hextoipv6(e){if(!e.match(/^[0-9A-Fa-f]{32}$/)){throw"malformed IPv6 address octet"}e=e.toLowerCase();var b=e.match(/.{1,4}/g);for(var d=0;d<8;d++){b[d]=b[d].replace(/^0+/,"");if(b[d]==""){b[d]="0";}}e=":"+b.join(":")+":";var c=e.match(/:(0:){2,}/g);if(c===null){return e.slice(1,-1)}var f="";for(var d=0;d<c.length;d++){if(c[d].length>f.length){f=c[d];}}e=e.replace(f,"::");return e.slice(1,-1)}function hextoip(b){var d="malformed hex value";if(!b.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/)){throw d}if(b.length==8){var c;try{c=parseInt(b.substr(0,2),16)+"."+parseInt(b.substr(2,2),16)+"."+parseInt(b.substr(4,2),16)+"."+parseInt(b.substr(6,2),16);return c}catch(a){throw d}}else{if(b.length==32){return hextoipv6(b)}else{return b}}}function iptohex(f){var j="malformed IP address";f=f.toLowerCase(f);if(f.match(/^[0-9.]+$/)){var b=f.split(".");if(b.length!==4){throw j}var g="";try{for(var e=0;e<4;e++){var h=parseInt(b[e]);g+=("0"+h.toString(16)).slice(-2);}return g}catch(c){throw j}}else{if(f.match(/^[0-9a-f:]+$/)&&f.indexOf(":")!==-1){return ipv6tohex(f)}else{throw j}}}function encodeURIComponentAll(a){var d=encodeURIComponent(a);var b="";for(var c=0;c<d.length;c++){if(d[c]=="%"){b=b+d.substr(c,3);c=c+2;}else{b=b+"%"+stohex(d[c]);}}return b}function newline_toUnix(a){a=a.replace(/\r\n/mg,"\n");return a}function newline_toDos(a){a=a.replace(/\r\n/mg,"\n");a=a.replace(/\n/mg,"\r\n");return a}KJUR.lang.String.isInteger=function(a){if(a.match(/^[0-9]+$/)){return true}else{if(a.match(/^-[0-9]+$/)){return true}else{return false}}};KJUR.lang.String.isHex=function(a){if(a.length%2==0&&(a.match(/^[0-9a-f]+$/)||a.match(/^[0-9A-F]+$/))){return true}else{return false}};KJUR.lang.String.isBase64=function(a){a=a.replace(/\s+/g,"");if(a.match(/^[0-9A-Za-z+\/]+={0,3}$/)&&a.length%4==0){return true}else{return false}};KJUR.lang.String.isBase64URL=function(a){if(a.match(/[+/=]/)){return false}a=b64utob64(a);return KJUR.lang.String.isBase64(a)};KJUR.lang.String.isIntegerArray=function(a){a=a.replace(/\s+/g,"");if(a.match(/^\[[0-9,]+\]$/)){return true}else{return false}};function hextoposhex(a){if(a.length%2==1){return "0"+a}if(a.substr(0,1)>"7"){return "00"+a}return a}function intarystrtohex(b){b=b.replace(/^\s*\[\s*/,"");b=b.replace(/\s*\]\s*$/,"");b=b.replace(/\s*/g,"");try{var c=b.split(/,/).map(function(g,e,h){var f=parseInt(g);if(f<0||255<f){throw"integer not in range 0-255"}var d=("00"+f.toString(16)).slice(-2);return d}).join("");return c}catch(a){throw"malformed integer array string: "+a}}var strdiffidx=function(c,a){var d=c.length;if(c.length>a.length){d=a.length;}for(var b=0;b<d;b++){if(c.charCodeAt(b)!=a.charCodeAt(b)){return b}}if(c.length!=a.length){return d}return -1};
if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.crypto=="undefined"||!KJUR.crypto){KJUR.crypto={};}KJUR.crypto.Util=new function(){this.DIGESTINFOHEAD={sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",ripemd160:"3021300906052b2403020105000414",};this.DEFAULTPROVIDER={md5:"cryptojs",sha1:"cryptojs",sha224:"cryptojs",sha256:"cryptojs",sha384:"cryptojs",sha512:"cryptojs",ripemd160:"cryptojs",hmacmd5:"cryptojs",hmacsha1:"cryptojs",hmacsha224:"cryptojs",hmacsha256:"cryptojs",hmacsha384:"cryptojs",hmacsha512:"cryptojs",hmacripemd160:"cryptojs",MD5withRSA:"cryptojs/jsrsa",SHA1withRSA:"cryptojs/jsrsa",SHA224withRSA:"cryptojs/jsrsa",SHA256withRSA:"cryptojs/jsrsa",SHA384withRSA:"cryptojs/jsrsa",SHA512withRSA:"cryptojs/jsrsa",RIPEMD160withRSA:"cryptojs/jsrsa",MD5withECDSA:"cryptojs/jsrsa",SHA1withECDSA:"cryptojs/jsrsa",SHA224withECDSA:"cryptojs/jsrsa",SHA256withECDSA:"cryptojs/jsrsa",SHA384withECDSA:"cryptojs/jsrsa",SHA512withECDSA:"cryptojs/jsrsa",RIPEMD160withECDSA:"cryptojs/jsrsa",SHA1withDSA:"cryptojs/jsrsa",SHA224withDSA:"cryptojs/jsrsa",SHA256withDSA:"cryptojs/jsrsa",MD5withRSAandMGF1:"cryptojs/jsrsa",SHA1withRSAandMGF1:"cryptojs/jsrsa",SHA224withRSAandMGF1:"cryptojs/jsrsa",SHA256withRSAandMGF1:"cryptojs/jsrsa",SHA384withRSAandMGF1:"cryptojs/jsrsa",SHA512withRSAandMGF1:"cryptojs/jsrsa",RIPEMD160withRSAandMGF1:"cryptojs/jsrsa",};this.CRYPTOJSMESSAGEDIGESTNAME={md5:CryptoJS.algo.MD5,sha1:CryptoJS.algo.SHA1,sha224:CryptoJS.algo.SHA224,sha256:CryptoJS.algo.SHA256,sha384:CryptoJS.algo.SHA384,sha512:CryptoJS.algo.SHA512,ripemd160:CryptoJS.algo.RIPEMD160};this.getDigestInfoHex=function(a,b){if(typeof this.DIGESTINFOHEAD[b]=="undefined"){throw"alg not supported in Util.DIGESTINFOHEAD: "+b}return this.DIGESTINFOHEAD[b]+a};this.getPaddedDigestInfoHex=function(h,a,j){var c=this.getDigestInfoHex(h,a);var d=j/4;if(c.length+22>d){throw"key is too short for SigAlg: keylen="+j+","+a}var b="0001";var k="00"+c;var g="";var l=d-b.length-k.length;for(var f=0;f<l;f+=2){g+="ff";}var e=b+g+k;return e};this.hashString=function(a,c){var b=new KJUR.crypto.MessageDigest({alg:c});return b.digestString(a)};this.hashHex=function(b,c){var a=new KJUR.crypto.MessageDigest({alg:c});return a.digestHex(b)};this.sha1=function(a){var b=new KJUR.crypto.MessageDigest({alg:"sha1",prov:"cryptojs"});return b.digestString(a)};this.sha256=function(a){var b=new KJUR.crypto.MessageDigest({alg:"sha256",prov:"cryptojs"});return b.digestString(a)};this.sha256Hex=function(a){var b=new KJUR.crypto.MessageDigest({alg:"sha256",prov:"cryptojs"});return b.digestHex(a)};this.sha512=function(a){var b=new KJUR.crypto.MessageDigest({alg:"sha512",prov:"cryptojs"});return b.digestString(a)};this.sha512Hex=function(a){var b=new KJUR.crypto.MessageDigest({alg:"sha512",prov:"cryptojs"});return b.digestHex(a)};};KJUR.crypto.Util.md5=function(a){var b=new KJUR.crypto.MessageDigest({alg:"md5",prov:"cryptojs"});return b.digestString(a)};KJUR.crypto.Util.ripemd160=function(a){var b=new KJUR.crypto.MessageDigest({alg:"ripemd160",prov:"cryptojs"});return b.digestString(a)};KJUR.crypto.Util.SECURERANDOMGEN=new SecureRandom();KJUR.crypto.Util.getRandomHexOfNbytes=function(b){var a=new Array(b);KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(a);return BAtohex(a)};KJUR.crypto.Util.getRandomBigIntegerOfNbytes=function(a){return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbytes(a),16)};KJUR.crypto.Util.getRandomHexOfNbits=function(d){var c=d%8;var a=(d-c)/8;var b=new Array(a+1);KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(b);b[0]=(((255<<c)&255)^255)&b[0];return BAtohex(b)};KJUR.crypto.Util.getRandomBigIntegerOfNbits=function(a){return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbits(a),16)};KJUR.crypto.Util.getRandomBigIntegerZeroToMax=function(b){var a=b.bitLength();while(1){var c=KJUR.crypto.Util.getRandomBigIntegerOfNbits(a);if(b.compareTo(c)!=-1){return c}}};KJUR.crypto.Util.getRandomBigIntegerMinToMax=function(e,b){var c=e.compareTo(b);if(c==1){throw"biMin is greater than biMax"}if(c==0){return e}var a=b.subtract(e);var d=KJUR.crypto.Util.getRandomBigIntegerZeroToMax(a);return d.add(e)};KJUR.crypto.MessageDigest=function(c){this.setAlgAndProvider=function(g,f){g=KJUR.crypto.MessageDigest.getCanonicalAlgName(g);if(g!==null&&f===undefined){f=KJUR.crypto.Util.DEFAULTPROVIDER[g];}if(":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g)!=-1&&f=="cryptojs"){try{this.md=KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g].create();}catch(e){throw"setAlgAndProvider hash alg set fail alg="+g+"/"+e}this.updateString=function(h){this.md.update(h);};this.updateHex=function(h){var i=CryptoJS.enc.Hex.parse(h);this.md.update(i);};this.digest=function(){var h=this.md.finalize();return h.toString(CryptoJS.enc.Hex)};this.digestString=function(h){this.updateString(h);return this.digest()};this.digestHex=function(h){this.updateHex(h);return this.digest()};}if(":sha256:".indexOf(g)!=-1&&f=="sjcl"){try{this.md=new sjcl.hash.sha256();}catch(e){throw"setAlgAndProvider hash alg set fail alg="+g+"/"+e}this.updateString=function(h){this.md.update(h);};this.updateHex=function(i){var h=sjcl.codec.hex.toBits(i);this.md.update(h);};this.digest=function(){var h=this.md.finalize();return sjcl.codec.hex.fromBits(h)};this.digestString=function(h){this.updateString(h);return this.digest()};this.digestHex=function(h){this.updateHex(h);return this.digest()};}};this.updateString=function(e){throw"updateString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName};this.updateHex=function(e){throw"updateHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName};this.digest=function(){throw"digest() not supported for this alg/prov: "+this.algName+"/"+this.provName};this.digestString=function(e){throw"digestString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName};this.digestHex=function(e){throw"digestHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName};if(c!==undefined){if(c.alg!==undefined){this.algName=c.alg;if(c.prov===undefined){this.provName=KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];}this.setAlgAndProvider(this.algName,this.provName);}}};KJUR.crypto.MessageDigest.getCanonicalAlgName=function(a){if(typeof a==="string"){a=a.toLowerCase();a=a.replace(/-/,"");}return a};KJUR.crypto.MessageDigest.getHashLength=function(c){var b=KJUR.crypto.MessageDigest;var a=b.getCanonicalAlgName(c);if(b.HASHLENGTH[a]===undefined){throw"not supported algorithm: "+c}return b.HASHLENGTH[a]};KJUR.crypto.MessageDigest.HASHLENGTH={md5:16,sha1:20,sha224:28,sha256:32,sha384:48,sha512:64,ripemd160:20};KJUR.crypto.Mac=function(d){this.setAlgAndProvider=function(k,i){k=k.toLowerCase();if(k==null){k="hmacsha1";}k=k.toLowerCase();if(k.substr(0,4)!="hmac"){throw"setAlgAndProvider unsupported HMAC alg: "+k}if(i===undefined){i=KJUR.crypto.Util.DEFAULTPROVIDER[k];}this.algProv=k+"/"+i;var g=k.substr(4);if(":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g)!=-1&&i=="cryptojs"){try{var j=KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g];this.mac=CryptoJS.algo.HMAC.create(j,this.pass);}catch(h){throw"setAlgAndProvider hash alg set fail hashAlg="+g+"/"+h}this.updateString=function(l){this.mac.update(l);};this.updateHex=function(l){var m=CryptoJS.enc.Hex.parse(l);this.mac.update(m);};this.doFinal=function(){var l=this.mac.finalize();return l.toString(CryptoJS.enc.Hex)};this.doFinalString=function(l){this.updateString(l);return this.doFinal()};this.doFinalHex=function(l){this.updateHex(l);return this.doFinal()};}};this.updateString=function(g){throw"updateString(str) not supported for this alg/prov: "+this.algProv};this.updateHex=function(g){throw"updateHex(hex) not supported for this alg/prov: "+this.algProv};this.doFinal=function(){throw"digest() not supported for this alg/prov: "+this.algProv};this.doFinalString=function(g){throw"digestString(str) not supported for this alg/prov: "+this.algProv};this.doFinalHex=function(g){throw"digestHex(hex) not supported for this alg/prov: "+this.algProv};this.setPassword=function(h){if(typeof h=="string"){var g=h;if(h.length%2==1||!h.match(/^[0-9A-Fa-f]+$/)){g=rstrtohex(h);}this.pass=CryptoJS.enc.Hex.parse(g);return}if(typeof h!="object"){throw"KJUR.crypto.Mac unsupported password type: "+h}var g=null;if(h.hex!==undefined){if(h.hex.length%2!=0||!h.hex.match(/^[0-9A-Fa-f]+$/)){throw"Mac: wrong hex password: "+h.hex}g=h.hex;}if(h.utf8!==undefined){g=utf8tohex(h.utf8);}if(h.rstr!==undefined){g=rstrtohex(h.rstr);}if(h.b64!==undefined){g=b64tohex(h.b64);}if(h.b64u!==undefined){g=b64utohex(h.b64u);}if(g==null){throw"KJUR.crypto.Mac unsupported password type: "+h}this.pass=CryptoJS.enc.Hex.parse(g);};if(d!==undefined){if(d.pass!==undefined){this.setPassword(d.pass);}if(d.alg!==undefined){this.algName=d.alg;if(d.prov===undefined){this.provName=KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];}this.setAlgAndProvider(this.algName,this.provName);}}};KJUR.crypto.Signature=function(o){var q=null;this._setAlgNames=function(){var s=this.algName.match(/^(.+)with(.+)$/);if(s){this.mdAlgName=s[1].toLowerCase();this.pubkeyAlgName=s[2].toLowerCase();}};this._zeroPaddingOfSignature=function(x,w){var v="";var t=w/4-x.length;for(var u=0;u<t;u++){v=v+"0";}return v+x};this.setAlgAndProvider=function(u,t){this._setAlgNames();if(t!="cryptojs/jsrsa"){throw"provider not supported: "+t}if(":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName)!=-1){try{this.md=new KJUR.crypto.MessageDigest({alg:this.mdAlgName});}catch(s){throw"setAlgAndProvider hash alg set fail alg="+this.mdAlgName+"/"+s}this.init=function(w,x){var y=null;try{if(x===undefined){y=KEYUTIL.getKey(w);}else{y=KEYUTIL.getKey(w,x);}}catch(v){throw"init failed:"+v}if(y.isPrivate===true){this.prvKey=y;this.state="SIGN";}else{if(y.isPublic===true){this.pubKey=y;this.state="VERIFY";}else{throw"init failed.:"+y}}};this.updateString=function(v){this.md.updateString(v);};this.updateHex=function(v){this.md.updateHex(v);};this.sign=function(){this.sHashHex=this.md.digest();if(typeof this.ecprvhex!="undefined"&&typeof this.eccurvename!="undefined"){var v=new KJUR.crypto.ECDSA({curve:this.eccurvename});this.hSign=v.signHex(this.sHashHex,this.ecprvhex);}else{if(this.prvKey instanceof RSAKey&&this.pubkeyAlgName==="rsaandmgf1"){this.hSign=this.prvKey.signWithMessageHashPSS(this.sHashHex,this.mdAlgName,this.pssSaltLen);}else{if(this.prvKey instanceof RSAKey&&this.pubkeyAlgName==="rsa"){this.hSign=this.prvKey.signWithMessageHash(this.sHashHex,this.mdAlgName);}else{if(this.prvKey instanceof KJUR.crypto.ECDSA){this.hSign=this.prvKey.signWithMessageHash(this.sHashHex);}else{if(this.prvKey instanceof KJUR.crypto.DSA){this.hSign=this.prvKey.signWithMessageHash(this.sHashHex);}else{throw"Signature: unsupported private key alg: "+this.pubkeyAlgName}}}}}return this.hSign};this.signString=function(v){this.updateString(v);return this.sign()};this.signHex=function(v){this.updateHex(v);return this.sign()};this.verify=function(v){this.sHashHex=this.md.digest();if(typeof this.ecpubhex!="undefined"&&typeof this.eccurvename!="undefined"){var w=new KJUR.crypto.ECDSA({curve:this.eccurvename});return w.verifyHex(this.sHashHex,v,this.ecpubhex)}else{if(this.pubKey instanceof RSAKey&&this.pubkeyAlgName==="rsaandmgf1"){return this.pubKey.verifyWithMessageHashPSS(this.sHashHex,v,this.mdAlgName,this.pssSaltLen)}else{if(this.pubKey instanceof RSAKey&&this.pubkeyAlgName==="rsa"){return this.pubKey.verifyWithMessageHash(this.sHashHex,v)}else{if(KJUR.crypto.ECDSA!==undefined&&this.pubKey instanceof KJUR.crypto.ECDSA){return this.pubKey.verifyWithMessageHash(this.sHashHex,v)}else{if(KJUR.crypto.DSA!==undefined&&this.pubKey instanceof KJUR.crypto.DSA){return this.pubKey.verifyWithMessageHash(this.sHashHex,v)}else{throw"Signature: unsupported public key alg: "+this.pubkeyAlgName}}}}}};}};this.init=function(s,t){throw"init(key, pass) not supported for this alg:prov="+this.algProvName};this.updateString=function(s){throw"updateString(str) not supported for this alg:prov="+this.algProvName};this.updateHex=function(s){throw"updateHex(hex) not supported for this alg:prov="+this.algProvName};this.sign=function(){throw"sign() not supported for this alg:prov="+this.algProvName};this.signString=function(s){throw"digestString(str) not supported for this alg:prov="+this.algProvName};this.signHex=function(s){throw"digestHex(hex) not supported for this alg:prov="+this.algProvName};this.verify=function(s){throw"verify(hSigVal) not supported for this alg:prov="+this.algProvName};this.initParams=o;if(o!==undefined){if(o.alg!==undefined){this.algName=o.alg;if(o.prov===undefined){this.provName=KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];}else{this.provName=o.prov;}this.algProvName=this.algName+":"+this.provName;this.setAlgAndProvider(this.algName,this.provName);this._setAlgNames();}if(o.psssaltlen!==undefined){this.pssSaltLen=o.psssaltlen;}if(o.prvkeypem!==undefined){if(o.prvkeypas!==undefined){throw"both prvkeypem and prvkeypas parameters not supported"}else{try{var q=KEYUTIL.getKey(o.prvkeypem);this.init(q);}catch(m){throw"fatal error to load pem private key: "+m}}}}};KJUR.crypto.Cipher=function(a){};KJUR.crypto.Cipher.encrypt=function(e,f,d){if(f instanceof RSAKey&&f.isPublic){var c=KJUR.crypto.Cipher.getAlgByKeyAndName(f,d);if(c==="RSA"){return f.encrypt(e)}if(c==="RSAOAEP"){return f.encryptOAEP(e,"sha1")}var b=c.match(/^RSAOAEP(\d+)$/);if(b!==null){return f.encryptOAEP(e,"sha"+b[1])}throw"Cipher.encrypt: unsupported algorithm for RSAKey: "+d}else{throw"Cipher.encrypt: unsupported key or algorithm"}};KJUR.crypto.Cipher.decrypt=function(e,f,d){if(f instanceof RSAKey&&f.isPrivate){var c=KJUR.crypto.Cipher.getAlgByKeyAndName(f,d);if(c==="RSA"){return f.decrypt(e)}if(c==="RSAOAEP"){return f.decryptOAEP(e,"sha1")}var b=c.match(/^RSAOAEP(\d+)$/);if(b!==null){return f.decryptOAEP(e,"sha"+b[1])}throw"Cipher.decrypt: unsupported algorithm for RSAKey: "+d}else{throw"Cipher.decrypt: unsupported key or algorithm"}};KJUR.crypto.Cipher.getAlgByKeyAndName=function(b,a){if(b instanceof RSAKey){if(":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(a)!=-1){return a}if(a===null||a===undefined){return "RSA"}throw"getAlgByKeyAndName: not supported algorithm name for RSAKey: "+a}throw"getAlgByKeyAndName: not supported algorithm name: "+a};KJUR.crypto.OID=new function(){this.oidhex2name={"2a864886f70d010101":"rsaEncryption","2a8648ce3d0201":"ecPublicKey","2a8648ce380401":"dsa","2a8648ce3d030107":"secp256r1","2b8104001f":"secp192k1","2b81040021":"secp224r1","2b8104000a":"secp256k1","2b81040023":"secp521r1","2b81040022":"secp384r1","2a8648ce380403":"SHA1withDSA","608648016503040301":"SHA224withDSA","608648016503040302":"SHA256withDSA",};};
if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.crypto=="undefined"||!KJUR.crypto){KJUR.crypto={};}KJUR.crypto.ECDSA=function(h){var e="secp256r1";var a=new SecureRandom();this.type="EC";this.isPrivate=false;this.isPublic=false;this.getBigRandom=function(i){return new BigInteger(i.bitLength(),a).mod(i.subtract(BigInteger.ONE)).add(BigInteger.ONE)};this.setNamedCurve=function(i){this.ecparams=KJUR.crypto.ECParameterDB.getByName(i);this.prvKeyHex=null;this.pubKeyHex=null;this.curveName=i;};this.setPrivateKeyHex=function(i){this.isPrivate=true;this.prvKeyHex=i;};this.setPublicKeyHex=function(i){this.isPublic=true;this.pubKeyHex=i;};this.getPublicKeyXYHex=function(){var k=this.pubKeyHex;if(k.substr(0,2)!=="04"){throw"this method supports uncompressed format(04) only"}var j=this.ecparams.keylen/4;if(k.length!==2+j*2){throw"malformed public key hex length"}var i={};i.x=k.substr(2,j);i.y=k.substr(2+j);return i};this.getShortNISTPCurveName=function(){var i=this.curveName;if(i==="secp256r1"||i==="NIST P-256"||i==="P-256"||i==="prime256v1"){return "P-256"}if(i==="secp384r1"||i==="NIST P-384"||i==="P-384"){return "P-384"}return null};this.generateKeyPairHex=function(){var k=this.ecparams.n;var n=this.getBigRandom(k);var l=this.ecparams.G.multiply(n);var q=l.getX().toBigInteger();var o=l.getY().toBigInteger();var i=this.ecparams.keylen/4;var m=("0000000000"+n.toString(16)).slice(-i);var r=("0000000000"+q.toString(16)).slice(-i);var p=("0000000000"+o.toString(16)).slice(-i);var j="04"+r+p;this.setPrivateKeyHex(m);this.setPublicKeyHex(j);return {ecprvhex:m,ecpubhex:j}};this.signWithMessageHash=function(i){return this.signHex(i,this.prvKeyHex)};this.signHex=function(o,j){var t=new BigInteger(j,16);var l=this.ecparams.n;var q=new BigInteger(o,16);do{var m=this.getBigRandom(l);var u=this.ecparams.G;var p=u.multiply(m);var i=p.getX().toBigInteger().mod(l);}while(i.compareTo(BigInteger.ZERO)<=0);var v=m.modInverse(l).multiply(q.add(t.multiply(i))).mod(l);return KJUR.crypto.ECDSA.biRSSigToASN1Sig(i,v)};this.sign=function(m,u){var q=u;var j=this.ecparams.n;var p=BigInteger.fromByteArrayUnsigned(m);do{var l=this.getBigRandom(j);var t=this.ecparams.G;var o=t.multiply(l);var i=o.getX().toBigInteger().mod(j);}while(i.compareTo(BigInteger.ZERO)<=0);var v=l.modInverse(j).multiply(p.add(q.multiply(i))).mod(j);return this.serializeSig(i,v)};this.verifyWithMessageHash=function(j,i){return this.verifyHex(j,i,this.pubKeyHex)};this.verifyHex=function(m,i,p){var l,j;var o=KJUR.crypto.ECDSA.parseSigHex(i);l=o.r;j=o.s;var k;k=ECPointFp.decodeFromHex(this.ecparams.curve,p);var n=new BigInteger(m,16);return this.verifyRaw(n,l,j,k)};this.verify=function(o,p,j){var l,i;if(Bitcoin.Util.isArray(p)){var n=this.parseSig(p);l=n.r;i=n.s;}else{if("object"===typeof p&&p.r&&p.s){l=p.r;i=p.s;}else{throw"Invalid value for signature"}}var k;if(j instanceof ECPointFp){k=j;}else{if(Bitcoin.Util.isArray(j)){k=ECPointFp.decodeFrom(this.ecparams.curve,j);}else{throw"Invalid format for pubkey value, must be byte array or ECPointFp"}}var m=BigInteger.fromByteArrayUnsigned(o);return this.verifyRaw(m,l,i,k)};this.verifyRaw=function(o,i,w,m){var l=this.ecparams.n;var u=this.ecparams.G;if(i.compareTo(BigInteger.ONE)<0||i.compareTo(l)>=0){return false}if(w.compareTo(BigInteger.ONE)<0||w.compareTo(l)>=0){return false}var p=w.modInverse(l);var k=o.multiply(p).mod(l);var j=i.multiply(p).mod(l);var q=u.multiply(k).add(m.multiply(j));var t=q.getX().toBigInteger().mod(l);return t.equals(i)};this.serializeSig=function(k,j){var l=k.toByteArraySigned();var i=j.toByteArraySigned();var m=[];m.push(2);m.push(l.length);m=m.concat(l);m.push(2);m.push(i.length);m=m.concat(i);m.unshift(m.length);m.unshift(48);return m};this.parseSig=function(n){var m;if(n[0]!=48){throw new Error("Signature not a valid DERSequence")}m=2;if(n[m]!=2){throw new Error("First element in signature must be a DERInteger")}var l=n.slice(m+2,m+2+n[m+1]);m+=2+n[m+1];if(n[m]!=2){throw new Error("Second element in signature must be a DERInteger")}var i=n.slice(m+2,m+2+n[m+1]);m+=2+n[m+1];var k=BigInteger.fromByteArrayUnsigned(l);var j=BigInteger.fromByteArrayUnsigned(i);return {r:k,s:j}};this.parseSigCompact=function(m){if(m.length!==65){throw"Signature has the wrong length"}var j=m[0]-27;if(j<0||j>7){throw"Invalid signature type"}var o=this.ecparams.n;var l=BigInteger.fromByteArrayUnsigned(m.slice(1,33)).mod(o);var k=BigInteger.fromByteArrayUnsigned(m.slice(33,65)).mod(o);return {r:l,s:k,i:j}};this.readPKCS5PrvKeyHex=function(l){var n=ASN1HEX;var m=KJUR.crypto.ECDSA.getName;var p=n.getVbyList;if(n.isASN1HEX(l)===false){throw"not ASN.1 hex string"}var i,k,o;try{i=p(l,0,[2,0],"06");k=p(l,0,[1],"04");try{o=p(l,0,[3,0],"03").substr(2);}catch(j){}}catch(j){throw"malformed PKCS#1/5 plain ECC private key"}this.curveName=m(i);if(this.curveName===undefined){throw"unsupported curve name"}this.setNamedCurve(this.curveName);this.setPublicKeyHex(o);this.setPrivateKeyHex(k);this.isPublic=false;};this.readPKCS8PrvKeyHex=function(l){var q=ASN1HEX;var i=KJUR.crypto.ECDSA.getName;var n=q.getVbyList;if(q.isASN1HEX(l)===false){throw"not ASN.1 hex string"}var j,p,m,k;try{j=n(l,0,[1,0],"06");p=n(l,0,[1,1],"06");m=n(l,0,[2,0,1],"04");try{k=n(l,0,[2,0,2,0],"03").substr(2);}catch(o){}}catch(o){throw"malformed PKCS#8 plain ECC private key"}this.curveName=i(p);if(this.curveName===undefined){throw"unsupported curve name"}this.setNamedCurve(this.curveName);this.setPublicKeyHex(k);this.setPrivateKeyHex(m);this.isPublic=false;};this.readPKCS8PubKeyHex=function(l){var n=ASN1HEX;var m=KJUR.crypto.ECDSA.getName;var p=n.getVbyList;if(n.isASN1HEX(l)===false){throw"not ASN.1 hex string"}var k,i,o;try{k=p(l,0,[0,0],"06");i=p(l,0,[0,1],"06");o=p(l,0,[1],"03").substr(2);}catch(j){throw"malformed PKCS#8 ECC public key"}this.curveName=m(i);if(this.curveName===null){throw"unsupported curve name"}this.setNamedCurve(this.curveName);this.setPublicKeyHex(o);};this.readCertPubKeyHex=function(k,p){if(p!==5){p=6;}var m=ASN1HEX;var l=KJUR.crypto.ECDSA.getName;var o=m.getVbyList;if(m.isASN1HEX(k)===false){throw"not ASN.1 hex string"}var i,n;try{i=o(k,0,[0,p,0,1],"06");n=o(k,0,[0,p,1],"03").substr(2);}catch(j){throw"malformed X.509 certificate ECC public key"}this.curveName=l(i);if(this.curveName===null){throw"unsupported curve name"}this.setNamedCurve(this.curveName);this.setPublicKeyHex(n);};if(h!==undefined){if(h.curve!==undefined){this.curveName=h.curve;}}if(this.curveName===undefined){this.curveName=e;}this.setNamedCurve(this.curveName);if(h!==undefined){if(h.prv!==undefined){this.setPrivateKeyHex(h.prv);}if(h.pub!==undefined){this.setPublicKeyHex(h.pub);}}};KJUR.crypto.ECDSA.parseSigHex=function(a){var b=KJUR.crypto.ECDSA.parseSigHexInHexRS(a);var d=new BigInteger(b.r,16);var c=new BigInteger(b.s,16);return {r:d,s:c}};KJUR.crypto.ECDSA.parseSigHexInHexRS=function(f){var j=ASN1HEX;var i=j.getChildIdx;var g=j.getV;if(f.substr(0,2)!="30"){throw"signature is not a ASN.1 sequence"}var h=i(f,0);if(h.length!=2){throw"number of signature ASN.1 sequence elements seem wrong"}var e=h[0];var d=h[1];if(f.substr(e,2)!="02"){throw"1st item of sequene of signature is not ASN.1 integer"}if(f.substr(d,2)!="02"){throw"2nd item of sequene of signature is not ASN.1 integer"}var c=g(f,e);var b=g(f,d);return {r:c,s:b}};KJUR.crypto.ECDSA.asn1SigToConcatSig=function(c){var d=KJUR.crypto.ECDSA.parseSigHexInHexRS(c);var b=d.r;var a=d.s;if(b.substr(0,2)=="00"&&(b.length%32)==2){b=b.substr(2);}if(a.substr(0,2)=="00"&&(a.length%32)==2){a=a.substr(2);}if((b.length%32)==30){b="00"+b;}if((a.length%32)==30){a="00"+a;}if(b.length%32!=0){throw"unknown ECDSA sig r length error"}if(a.length%32!=0){throw"unknown ECDSA sig s length error"}return b+a};KJUR.crypto.ECDSA.concatSigToASN1Sig=function(a){if((((a.length/2)*8)%(16*8))!=0){throw"unknown ECDSA concatinated r-s sig  length error"}var c=a.substr(0,a.length/2);var b=a.substr(a.length/2);return KJUR.crypto.ECDSA.hexRSSigToASN1Sig(c,b)};KJUR.crypto.ECDSA.hexRSSigToASN1Sig=function(b,a){var d=new BigInteger(b,16);var c=new BigInteger(a,16);return KJUR.crypto.ECDSA.biRSSigToASN1Sig(d,c)};KJUR.crypto.ECDSA.biRSSigToASN1Sig=function(f,d){var c=KJUR.asn1;var b=new c.DERInteger({bigint:f});var a=new c.DERInteger({bigint:d});var e=new c.DERSequence({array:[b,a]});return e.getEncodedHex()};KJUR.crypto.ECDSA.getName=function(a){if(a==="2a8648ce3d030107"){return "secp256r1"}if(a==="2b8104000a"){return "secp256k1"}if(a==="2b81040022"){return "secp384r1"}if("|secp256r1|NIST P-256|P-256|prime256v1|".indexOf(a)!==-1){return "secp256r1"}if("|secp256k1|".indexOf(a)!==-1){return "secp256k1"}if("|secp384r1|NIST P-384|P-384|".indexOf(a)!==-1){return "secp384r1"}return null};
if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.crypto=="undefined"||!KJUR.crypto){KJUR.crypto={};}KJUR.crypto.ECParameterDB=new function(){var b={};var c={};function a(d){return new BigInteger(d,16)}this.getByName=function(e){var d=e;if(typeof c[d]!="undefined"){d=c[e];}if(typeof b[d]!="undefined"){return b[d]}throw"unregistered EC curve name: "+d};this.regist=function(A,l,o,g,m,e,j,f,k,u,d,x){b[A]={};var s=a(o);var z=a(g);var y=a(m);var t=a(e);var w=a(j);var r=new ECCurveFp(s,z,y);var q=r.decodePointHex("04"+f+k);b[A]["name"]=A;b[A]["keylen"]=l;b[A]["curve"]=r;b[A]["G"]=q;b[A]["n"]=t;b[A]["h"]=w;b[A]["oid"]=d;b[A]["info"]=x;for(var v=0;v<u.length;v++){c[u[v]]=A;}};};KJUR.crypto.ECParameterDB.regist("secp128r1",128,"FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF","FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC","E87579C11079F43DD824993C2CEE5ED3","FFFFFFFE0000000075A30D1B9038A115","1","161FF7528B899B2D0C28607CA52C5B86","CF5AC8395BAFEB13C02DA292DDED7A83",[],"","secp128r1 : SECG curve over a 128 bit prime field");KJUR.crypto.ECParameterDB.regist("secp160k1",160,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73","0","7","0100000000000000000001B8FA16DFAB9ACA16B6B3","1","3B4C382CE37AA192A4019E763036F4F5DD4D7EBB","938CF935318FDCED6BC28286531733C3F03C4FEE",[],"","secp160k1 : SECG curve over a 160 bit prime field");KJUR.crypto.ECParameterDB.regist("secp160r1",160,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC","1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45","0100000000000000000001F4C8F927AED3CA752257","1","4A96B5688EF573284664698968C38BB913CBFC82","23A628553168947D59DCC912042351377AC5FB32",[],"","secp160r1 : SECG curve over a 160 bit prime field");KJUR.crypto.ECParameterDB.regist("secp192k1",192,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37","0","3","FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D","1","DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D","9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D",[]);KJUR.crypto.ECParameterDB.regist("secp192r1",192,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC","64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1","FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831","1","188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012","07192B95FFC8DA78631011ED6B24CDD573F977A11E794811",[]);KJUR.crypto.ECParameterDB.regist("secp224r1",224,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE","B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4","FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D","1","B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21","BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34",[]);KJUR.crypto.ECParameterDB.regist("secp256k1",256,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F","0","7","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141","1","79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798","483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8",[]);KJUR.crypto.ECParameterDB.regist("secp256r1",256,"FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF","FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC","5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B","FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551","1","6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296","4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5",["NIST P-256","P-256","prime256v1"]);KJUR.crypto.ECParameterDB.regist("secp384r1",384,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC","B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973","1","AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7","3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f",["NIST P-384","P-384"]);KJUR.crypto.ECParameterDB.regist("secp521r1",521,"1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF","1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC","051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00","1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409","1","C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66","011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650",["NIST P-521","P-521"]);
if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.crypto=="undefined"||!KJUR.crypto){KJUR.crypto={};}KJUR.crypto.DSA=function(){this.p=null;this.q=null;this.g=null;this.y=null;this.x=null;this.type="DSA";this.isPrivate=false;this.isPublic=false;this.setPrivate=function(d,c,b,e,a){this.isPrivate=true;this.p=d;this.q=c;this.g=b;this.y=e;this.x=a;};this.setPrivateHex=function(d,b,f,i,j){var c,a,e,g,h;c=new BigInteger(d,16);a=new BigInteger(b,16);e=new BigInteger(f,16);if(typeof i==="string"&&i.length>1){g=new BigInteger(i,16);}else{g=null;}h=new BigInteger(j,16);this.setPrivate(c,a,e,g,h);};this.setPublic=function(c,b,a,d){this.isPublic=true;this.p=c;this.q=b;this.g=a;this.y=d;this.x=null;};this.setPublicHex=function(f,e,d,g){var b,a,h,c;b=new BigInteger(f,16);a=new BigInteger(e,16);h=new BigInteger(d,16);c=new BigInteger(g,16);this.setPublic(b,a,h,c);};this.signWithMessageHash=function(d){var c=this.p;var b=this.q;var f=this.g;var j=this.x;var e=KJUR.crypto.Util.getRandomBigIntegerMinToMax(BigInteger.ONE.add(BigInteger.ONE),b.subtract(BigInteger.ONE));var l=d.substr(0,b.bitLength()/4);var h=new BigInteger(l,16);var a=(f.modPow(e,c)).mod(b);var n=(e.modInverse(b).multiply(h.add(j.multiply(a)))).mod(b);var m=KJUR.asn1.ASN1Util.jsonToASN1HEX({seq:[{"int":{bigint:a}},{"int":{bigint:n}}]});return m};this.verifyWithMessageHash=function(h,f){var d=this.p;var b=this.q;var j=this.g;var l=this.y;var i=this.parseASN1Signature(f);var a=i[0];var t=i[1];var o=h.substr(0,b.bitLength()/4);var k=new BigInteger(o,16);if(BigInteger.ZERO.compareTo(a)>0||a.compareTo(b)>0){throw"invalid DSA signature"}if(BigInteger.ZERO.compareTo(t)>=0||t.compareTo(b)>0){throw"invalid DSA signature"}var m=t.modInverse(b);var e=k.multiply(m).mod(b);var c=a.multiply(m).mod(b);var n=j.modPow(e,d).multiply(l.modPow(c,d)).mod(d).mod(b);return n.compareTo(a)==0};this.parseASN1Signature=function(a){try{var d=new BigInteger(ASN1HEX.getVbyList(a,0,[0],"02"),16);var c=new BigInteger(ASN1HEX.getVbyList(a,0,[1],"02"),16);return [d,c]}catch(b){throw"malformed ASN.1 DSA signature"}};this.readPKCS5PrvKeyHex=function(c){var b,a,f,g,i;var j=ASN1HEX;var d=j.getVbyList;if(j.isASN1HEX(c)===false){throw"not ASN.1 hex string"}try{b=d(c,0,[1],"02");a=d(c,0,[2],"02");f=d(c,0,[3],"02");g=d(c,0,[4],"02");i=d(c,0,[5],"02");}catch(e){console.log("EXCEPTION:"+e);throw"malformed PKCS#1/5 plain DSA private key"}this.setPrivateHex(b,a,f,g,i);};this.readPKCS8PrvKeyHex=function(d){var f,c,b,g;var e=ASN1HEX;var i=e.getVbyList;if(e.isASN1HEX(d)===false){throw"not ASN.1 hex string"}try{f=i(d,0,[1,1,0],"02");c=i(d,0,[1,1,1],"02");b=i(d,0,[1,1,2],"02");g=i(d,0,[2,0],"02");}catch(a){console.log("EXCEPTION:"+a);throw"malformed PKCS#8 plain DSA private key"}this.setPrivateHex(f,c,b,null,g);};this.readPKCS8PubKeyHex=function(d){var f,c,b,g;var e=ASN1HEX;var i=e.getVbyList;if(e.isASN1HEX(d)===false){throw"not ASN.1 hex string"}try{f=i(d,0,[0,1,0],"02");c=i(d,0,[0,1,1],"02");b=i(d,0,[0,1,2],"02");g=i(d,0,[1,0],"02");}catch(a){console.log("EXCEPTION:"+a);throw"malformed PKCS#8 DSA public key"}this.setPublicHex(f,c,b,g);};this.readCertPubKeyHex=function(c,f){if(f!==5){f=6;}var b,a,g,i;var j=ASN1HEX;var d=j.getVbyList;if(j.isASN1HEX(c)===false){throw"not ASN.1 hex string"}try{b=d(c,0,[0,f,0,1,0],"02");a=d(c,0,[0,f,0,1,1],"02");g=d(c,0,[0,f,0,1,2],"02");i=d(c,0,[0,f,1,0],"02");}catch(e){console.log("EXCEPTION:"+e);throw"malformed X.509 certificate DSA public key"}this.setPublicHex(b,a,g,i);};};
var KEYUTIL=function(){var d=function(p,r,q){return k(CryptoJS.AES,p,r,q)};var e=function(p,r,q){return k(CryptoJS.TripleDES,p,r,q)};var a=function(p,r,q){return k(CryptoJS.DES,p,r,q)};var k=function(s,x,u,q){var r=CryptoJS.enc.Hex.parse(x);var w=CryptoJS.enc.Hex.parse(u);var p=CryptoJS.enc.Hex.parse(q);var t={};t.key=w;t.iv=p;t.ciphertext=r;var v=s.decrypt(t,w,{iv:p});return CryptoJS.enc.Hex.stringify(v)};var l=function(p,r,q){return g(CryptoJS.AES,p,r,q)};var o=function(p,r,q){return g(CryptoJS.TripleDES,p,r,q)};var f=function(p,r,q){return g(CryptoJS.DES,p,r,q)};var g=function(t,y,v,q){var s=CryptoJS.enc.Hex.parse(y);var x=CryptoJS.enc.Hex.parse(v);var p=CryptoJS.enc.Hex.parse(q);var w=t.encrypt(s,x,{iv:p});var r=CryptoJS.enc.Hex.parse(w.toString());var u=CryptoJS.enc.Base64.stringify(r);return u};var i={"AES-256-CBC":{proc:d,eproc:l,keylen:32,ivlen:16},"AES-192-CBC":{proc:d,eproc:l,keylen:24,ivlen:16},"AES-128-CBC":{proc:d,eproc:l,keylen:16,ivlen:16},"DES-EDE3-CBC":{proc:e,eproc:o,keylen:24,ivlen:8},"DES-CBC":{proc:a,eproc:f,keylen:8,ivlen:8}};var m=function(p){var r=CryptoJS.lib.WordArray.random(p);var q=CryptoJS.enc.Hex.stringify(r);return q};var n=function(v){var w={};var q=v.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)","m"));if(q){w.cipher=q[1];w.ivsalt=q[2];}var p=v.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));if(p){w.type=p[1];}var u=-1;var x=0;if(v.indexOf("\r\n\r\n")!=-1){u=v.indexOf("\r\n\r\n");x=2;}if(v.indexOf("\n\n")!=-1){u=v.indexOf("\n\n");x=1;}var t=v.indexOf("-----END");if(u!=-1&&t!=-1){var r=v.substring(u+x*2,t-x);r=r.replace(/\s+/g,"");w.data=r;}return w};var j=function(q,y,p){var v=p.substring(0,16);var t=CryptoJS.enc.Hex.parse(v);var r=CryptoJS.enc.Utf8.parse(y);var u=i[q]["keylen"]+i[q]["ivlen"];var x="";var w=null;for(;;){var s=CryptoJS.algo.MD5.create();if(w!=null){s.update(w);}s.update(r);s.update(t);w=s.finalize();x=x+CryptoJS.enc.Hex.stringify(w);if(x.length>=u*2){break}}var z={};z.keyhex=x.substr(0,i[q]["keylen"]*2);z.ivhex=x.substr(i[q]["keylen"]*2,i[q]["ivlen"]*2);return z};var b=function(p,v,r,w){var s=CryptoJS.enc.Base64.parse(p);var q=CryptoJS.enc.Hex.stringify(s);var u=i[v]["proc"];var t=u(q,r,w);return t};var h=function(p,s,q,u){var r=i[s]["eproc"];var t=r(p,q,u);return t};return {version:"1.0.0",parsePKCS5PEM:function(p){return n(p)},getKeyAndUnusedIvByPasscodeAndIvsalt:function(q,p,r){return j(q,p,r)},decryptKeyB64:function(p,r,q,s){return b(p,r,q,s)},getDecryptedKeyHex:function(y,x){var q=n(y);var r=q.cipher;var p=q.ivsalt;var s=q.data;var w=j(r,x,p);var v=w.keyhex;var u=b(s,r,v,p);return u},getEncryptedPKCS5PEMFromPrvKeyHex:function(x,s,A,t,r){var p="";if(typeof t=="undefined"||t==null){t="AES-256-CBC";}if(typeof i[t]=="undefined"){throw"KEYUTIL unsupported algorithm: "+t}if(typeof r=="undefined"||r==null){var v=i[t]["ivlen"];var u=m(v);r=u.toUpperCase();}var z=j(t,A,r);var y=z.keyhex;var w=h(s,t,y,r);var q=w.replace(/(.{64})/g,"$1\r\n");var p="-----BEGIN "+x+" PRIVATE KEY-----\r\n";p+="Proc-Type: 4,ENCRYPTED\r\n";p+="DEK-Info: "+t+","+r+"\r\n";p+="\r\n";p+=q;p+="\r\n-----END "+x+" PRIVATE KEY-----\r\n";return p},parseHexOfEncryptedPKCS8:function(y){var B=ASN1HEX;var z=B.getChildIdx;var w=B.getV;var t={};var r=z(y,0);if(r.length!=2){throw"malformed format: SEQUENCE(0).items != 2: "+r.length}t.ciphertext=w(y,r[1]);var A=z(y,r[0]);if(A.length!=2){throw"malformed format: SEQUENCE(0.0).items != 2: "+A.length}if(w(y,A[0])!="2a864886f70d01050d"){throw"this only supports pkcs5PBES2"}var p=z(y,A[1]);if(A.length!=2){throw"malformed format: SEQUENCE(0.0.1).items != 2: "+p.length}var q=z(y,p[1]);if(q.length!=2){throw"malformed format: SEQUENCE(0.0.1.1).items != 2: "+q.length}if(w(y,q[0])!="2a864886f70d0307"){throw"this only supports TripleDES"}t.encryptionSchemeAlg="TripleDES";t.encryptionSchemeIV=w(y,q[1]);var s=z(y,p[0]);if(s.length!=2){throw"malformed format: SEQUENCE(0.0.1.0).items != 2: "+s.length}if(w(y,s[0])!="2a864886f70d01050c"){throw"this only supports pkcs5PBKDF2"}var x=z(y,s[1]);if(x.length<2){throw"malformed format: SEQUENCE(0.0.1.0.1).items < 2: "+x.length}t.pbkdf2Salt=w(y,x[0]);var u=w(y,x[1]);try{t.pbkdf2Iter=parseInt(u,16);}catch(v){throw"malformed format pbkdf2Iter: "+u}return t},getPBKDF2KeyHexFromParam:function(u,p){var t=CryptoJS.enc.Hex.parse(u.pbkdf2Salt);var q=u.pbkdf2Iter;var s=CryptoJS.PBKDF2(p,t,{keySize:192/32,iterations:q});var r=CryptoJS.enc.Hex.stringify(s);return r},_getPlainPKCS8HexFromEncryptedPKCS8PEM:function(x,y){var r=pemtohex(x,"ENCRYPTED PRIVATE KEY");var p=this.parseHexOfEncryptedPKCS8(r);var u=KEYUTIL.getPBKDF2KeyHexFromParam(p,y);var v={};v.ciphertext=CryptoJS.enc.Hex.parse(p.ciphertext);var t=CryptoJS.enc.Hex.parse(u);var s=CryptoJS.enc.Hex.parse(p.encryptionSchemeIV);var w=CryptoJS.TripleDES.decrypt(v,t,{iv:s});var q=CryptoJS.enc.Hex.stringify(w);return q},getKeyFromEncryptedPKCS8PEM:function(s,q){var p=this._getPlainPKCS8HexFromEncryptedPKCS8PEM(s,q);var r=this.getKeyFromPlainPrivatePKCS8Hex(p);return r},parsePlainPrivatePKCS8Hex:function(s){var v=ASN1HEX;var u=v.getChildIdx;var t=v.getV;var q={};q.algparam=null;if(s.substr(0,2)!="30"){throw"malformed plain PKCS8 private key(code:001)"}var r=u(s,0);if(r.length!=3){throw"malformed plain PKCS8 private key(code:002)"}if(s.substr(r[1],2)!="30"){throw"malformed PKCS8 private key(code:003)"}var p=u(s,r[1]);if(p.length!=2){throw"malformed PKCS8 private key(code:004)"}if(s.substr(p[0],2)!="06"){throw"malformed PKCS8 private key(code:005)"}q.algoid=t(s,p[0]);if(s.substr(p[1],2)=="06"){q.algparam=t(s,p[1]);}if(s.substr(r[2],2)!="04"){throw"malformed PKCS8 private key(code:006)"}q.keyidx=v.getVidx(s,r[2]);return q},getKeyFromPlainPrivatePKCS8PEM:function(q){var p=pemtohex(q,"PRIVATE KEY");var r=this.getKeyFromPlainPrivatePKCS8Hex(p);return r},getKeyFromPlainPrivatePKCS8Hex:function(p){var q=this.parsePlainPrivatePKCS8Hex(p);var r;if(q.algoid=="2a864886f70d010101"){r=new RSAKey();}else{if(q.algoid=="2a8648ce380401"){r=new KJUR.crypto.DSA();}else{if(q.algoid=="2a8648ce3d0201"){r=new KJUR.crypto.ECDSA();}else{throw"unsupported private key algorithm"}}}r.readPKCS8PrvKeyHex(p);return r},_getKeyFromPublicPKCS8Hex:function(q){var p;var r=ASN1HEX.getVbyList(q,0,[0,0],"06");if(r==="2a864886f70d010101"){p=new RSAKey();}else{if(r==="2a8648ce380401"){p=new KJUR.crypto.DSA();}else{if(r==="2a8648ce3d0201"){p=new KJUR.crypto.ECDSA();}else{throw"unsupported PKCS#8 public key hex"}}}p.readPKCS8PubKeyHex(q);return p},parsePublicRawRSAKeyHex:function(r){var u=ASN1HEX;var t=u.getChildIdx;var s=u.getV;var p={};if(r.substr(0,2)!="30"){throw"malformed RSA key(code:001)"}var q=t(r,0);if(q.length!=2){throw"malformed RSA key(code:002)"}if(r.substr(q[0],2)!="02"){throw"malformed RSA key(code:003)"}p.n=s(r,q[0]);if(r.substr(q[1],2)!="02"){throw"malformed RSA key(code:004)"}p.e=s(r,q[1]);return p},parsePublicPKCS8Hex:function(t){var v=ASN1HEX;var u=v.getChildIdx;var s=v.getV;var q={};q.algparam=null;var r=u(t,0);if(r.length!=2){throw"outer DERSequence shall have 2 elements: "+r.length}var w=r[0];if(t.substr(w,2)!="30"){throw"malformed PKCS8 public key(code:001)"}var p=u(t,w);if(p.length!=2){throw"malformed PKCS8 public key(code:002)"}if(t.substr(p[0],2)!="06"){throw"malformed PKCS8 public key(code:003)"}q.algoid=s(t,p[0]);if(t.substr(p[1],2)=="06"){q.algparam=s(t,p[1]);}else{if(t.substr(p[1],2)=="30"){q.algparam={};q.algparam.p=v.getVbyList(t,p[1],[0],"02");q.algparam.q=v.getVbyList(t,p[1],[1],"02");q.algparam.g=v.getVbyList(t,p[1],[2],"02");}}if(t.substr(r[1],2)!="03"){throw"malformed PKCS8 public key(code:004)"}q.key=s(t,r[1]).substr(2);return q},}}();KEYUTIL.getKey=function(l,k,n){var G=ASN1HEX,L=G.getChildIdx,d=G.getVbyList,c=KJUR.crypto,i=c.ECDSA,C=c.DSA,w=RSAKey,M=pemtohex,F=KEYUTIL;if(typeof w!="undefined"&&l instanceof w){return l}if(typeof i!="undefined"&&l instanceof i){return l}if(typeof C!="undefined"&&l instanceof C){return l}if(l.curve!==undefined&&l.xy!==undefined&&l.d===undefined){return new i({pub:l.xy,curve:l.curve})}if(l.curve!==undefined&&l.d!==undefined){return new i({prv:l.d,curve:l.curve})}if(l.kty===undefined&&l.n!==undefined&&l.e!==undefined&&l.d===undefined){var P=new w();P.setPublic(l.n,l.e);return P}if(l.kty===undefined&&l.n!==undefined&&l.e!==undefined&&l.d!==undefined&&l.p!==undefined&&l.q!==undefined&&l.dp!==undefined&&l.dq!==undefined&&l.co!==undefined&&l.qi===undefined){var P=new w();P.setPrivateEx(l.n,l.e,l.d,l.p,l.q,l.dp,l.dq,l.co);return P}if(l.kty===undefined&&l.n!==undefined&&l.e!==undefined&&l.d!==undefined&&l.p===undefined){var P=new w();P.setPrivate(l.n,l.e,l.d);return P}if(l.p!==undefined&&l.q!==undefined&&l.g!==undefined&&l.y!==undefined&&l.x===undefined){var P=new C();P.setPublic(l.p,l.q,l.g,l.y);return P}if(l.p!==undefined&&l.q!==undefined&&l.g!==undefined&&l.y!==undefined&&l.x!==undefined){var P=new C();P.setPrivate(l.p,l.q,l.g,l.y,l.x);return P}if(l.kty==="RSA"&&l.n!==undefined&&l.e!==undefined&&l.d===undefined){var P=new w();P.setPublic(b64utohex(l.n),b64utohex(l.e));return P}if(l.kty==="RSA"&&l.n!==undefined&&l.e!==undefined&&l.d!==undefined&&l.p!==undefined&&l.q!==undefined&&l.dp!==undefined&&l.dq!==undefined&&l.qi!==undefined){var P=new w();P.setPrivateEx(b64utohex(l.n),b64utohex(l.e),b64utohex(l.d),b64utohex(l.p),b64utohex(l.q),b64utohex(l.dp),b64utohex(l.dq),b64utohex(l.qi));return P}if(l.kty==="RSA"&&l.n!==undefined&&l.e!==undefined&&l.d!==undefined){var P=new w();P.setPrivate(b64utohex(l.n),b64utohex(l.e),b64utohex(l.d));return P}if(l.kty==="EC"&&l.crv!==undefined&&l.x!==undefined&&l.y!==undefined&&l.d===undefined){var j=new i({curve:l.crv});var t=j.ecparams.keylen/4;var B=("0000000000"+b64utohex(l.x)).slice(-t);var z=("0000000000"+b64utohex(l.y)).slice(-t);var u="04"+B+z;j.setPublicKeyHex(u);return j}if(l.kty==="EC"&&l.crv!==undefined&&l.x!==undefined&&l.y!==undefined&&l.d!==undefined){var j=new i({curve:l.crv});var t=j.ecparams.keylen/4;var B=("0000000000"+b64utohex(l.x)).slice(-t);var z=("0000000000"+b64utohex(l.y)).slice(-t);var u="04"+B+z;var b=("0000000000"+b64utohex(l.d)).slice(-t);j.setPublicKeyHex(u);j.setPrivateKeyHex(b);return j}if(n==="pkcs5prv"){var J=l,G=ASN1HEX,N,P;N=L(J,0);if(N.length===9){P=new w();P.readPKCS5PrvKeyHex(J);}else{if(N.length===6){P=new C();P.readPKCS5PrvKeyHex(J);}else{if(N.length>2&&J.substr(N[1],2)==="04"){P=new i();P.readPKCS5PrvKeyHex(J);}else{throw"unsupported PKCS#1/5 hexadecimal key"}}}return P}if(n==="pkcs8prv"){var P=F.getKeyFromPlainPrivatePKCS8Hex(l);return P}if(n==="pkcs8pub"){return F._getKeyFromPublicPKCS8Hex(l)}if(n==="x509pub"){return X509.getPublicKeyFromCertHex(l)}if(l.indexOf("-END CERTIFICATE-",0)!=-1||l.indexOf("-END X509 CERTIFICATE-",0)!=-1||l.indexOf("-END TRUSTED CERTIFICATE-",0)!=-1){return X509.getPublicKeyFromCertPEM(l)}if(l.indexOf("-END PUBLIC KEY-")!=-1){var O=pemtohex(l,"PUBLIC KEY");return F._getKeyFromPublicPKCS8Hex(O)}if(l.indexOf("-END RSA PRIVATE KEY-")!=-1&&l.indexOf("4,ENCRYPTED")==-1){var m=M(l,"RSA PRIVATE KEY");return F.getKey(m,null,"pkcs5prv")}if(l.indexOf("-END DSA PRIVATE KEY-")!=-1&&l.indexOf("4,ENCRYPTED")==-1){var I=M(l,"DSA PRIVATE KEY");var E=d(I,0,[1],"02");var D=d(I,0,[2],"02");var K=d(I,0,[3],"02");var r=d(I,0,[4],"02");var s=d(I,0,[5],"02");var P=new C();P.setPrivate(new BigInteger(E,16),new BigInteger(D,16),new BigInteger(K,16),new BigInteger(r,16),new BigInteger(s,16));return P}if(l.indexOf("-END PRIVATE KEY-")!=-1){return F.getKeyFromPlainPrivatePKCS8PEM(l)}if(l.indexOf("-END RSA PRIVATE KEY-")!=-1&&l.indexOf("4,ENCRYPTED")!=-1){var o=F.getDecryptedKeyHex(l,k);var H=new RSAKey();H.readPKCS5PrvKeyHex(o);return H}if(l.indexOf("-END EC PRIVATE KEY-")!=-1&&l.indexOf("4,ENCRYPTED")!=-1){var I=F.getDecryptedKeyHex(l,k);var P=d(I,0,[1],"04");var f=d(I,0,[2,0],"06");var A=d(I,0,[3,0],"03").substr(2);var e="";if(KJUR.crypto.OID.oidhex2name[f]!==undefined){e=KJUR.crypto.OID.oidhex2name[f];}else{throw"undefined OID(hex) in KJUR.crypto.OID: "+f}var j=new i({curve:e});j.setPublicKeyHex(A);j.setPrivateKeyHex(P);j.isPublic=false;return j}if(l.indexOf("-END DSA PRIVATE KEY-")!=-1&&l.indexOf("4,ENCRYPTED")!=-1){var I=F.getDecryptedKeyHex(l,k);var E=d(I,0,[1],"02");var D=d(I,0,[2],"02");var K=d(I,0,[3],"02");var r=d(I,0,[4],"02");var s=d(I,0,[5],"02");var P=new C();P.setPrivate(new BigInteger(E,16),new BigInteger(D,16),new BigInteger(K,16),new BigInteger(r,16),new BigInteger(s,16));return P}if(l.indexOf("-END ENCRYPTED PRIVATE KEY-")!=-1){return F.getKeyFromEncryptedPKCS8PEM(l,k)}throw"not supported argument"};KEYUTIL.generateKeypair=function(a,c){if(a=="RSA"){var b=c;var h=new RSAKey();h.generate(b,"10001");h.isPrivate=true;h.isPublic=true;var f=new RSAKey();var e=h.n.toString(16);var i=h.e.toString(16);f.setPublic(e,i);f.isPrivate=false;f.isPublic=true;var k={};k.prvKeyObj=h;k.pubKeyObj=f;return k}else{if(a=="EC"){var d=c;var g=new KJUR.crypto.ECDSA({curve:d});var j=g.generateKeyPairHex();var h=new KJUR.crypto.ECDSA({curve:d});h.setPublicKeyHex(j.ecpubhex);h.setPrivateKeyHex(j.ecprvhex);h.isPrivate=true;h.isPublic=false;var f=new KJUR.crypto.ECDSA({curve:d});f.setPublicKeyHex(j.ecpubhex);f.isPrivate=false;f.isPublic=true;var k={};k.prvKeyObj=h;k.pubKeyObj=f;return k}else{throw"unknown algorithm: "+a}}};KEYUTIL.getPEM=function(b,D,y,m,q,j){var F=KJUR,k=F.asn1,z=k.DERObjectIdentifier,f=k.DERInteger,l=k.ASN1Util.newObject,a=k.x509,C=a.SubjectPublicKeyInfo,e=F.crypto,u=e.DSA,r=e.ECDSA,n=RSAKey;function A(s){var G=l({seq:[{"int":0},{"int":{bigint:s.n}},{"int":s.e},{"int":{bigint:s.d}},{"int":{bigint:s.p}},{"int":{bigint:s.q}},{"int":{bigint:s.dmp1}},{"int":{bigint:s.dmq1}},{"int":{bigint:s.coeff}}]});return G}function B(G){var s=l({seq:[{"int":1},{octstr:{hex:G.prvKeyHex}},{tag:["a0",true,{oid:{name:G.curveName}}]},{tag:["a1",true,{bitstr:{hex:"00"+G.pubKeyHex}}]}]});return s}function x(s){var G=l({seq:[{"int":0},{"int":{bigint:s.p}},{"int":{bigint:s.q}},{"int":{bigint:s.g}},{"int":{bigint:s.y}},{"int":{bigint:s.x}}]});return G}if(((n!==undefined&&b instanceof n)||(u!==undefined&&b instanceof u)||(r!==undefined&&b instanceof r))&&b.isPublic==true&&(D===undefined||D=="PKCS8PUB")){var E=new C(b);var w=E.getEncodedHex();return hextopem(w,"PUBLIC KEY")}if(D=="PKCS1PRV"&&n!==undefined&&b instanceof n&&(y===undefined||y==null)&&b.isPrivate==true){var E=A(b);var w=E.getEncodedHex();return hextopem(w,"RSA PRIVATE KEY")}if(D=="PKCS1PRV"&&r!==undefined&&b instanceof r&&(y===undefined||y==null)&&b.isPrivate==true){var i=new z({name:b.curveName});var v=i.getEncodedHex();var h=B(b);var t=h.getEncodedHex();var p="";p+=hextopem(v,"EC PARAMETERS");p+=hextopem(t,"EC PRIVATE KEY");return p}if(D=="PKCS1PRV"&&u!==undefined&&b instanceof u&&(y===undefined||y==null)&&b.isPrivate==true){var E=x(b);var w=E.getEncodedHex();return hextopem(w,"DSA PRIVATE KEY")}if(D=="PKCS5PRV"&&n!==undefined&&b instanceof n&&(y!==undefined&&y!=null)&&b.isPrivate==true){var E=A(b);var w=E.getEncodedHex();if(m===undefined){m="DES-EDE3-CBC";}return this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA",w,y,m,j)}if(D=="PKCS5PRV"&&r!==undefined&&b instanceof r&&(y!==undefined&&y!=null)&&b.isPrivate==true){var E=B(b);var w=E.getEncodedHex();if(m===undefined){m="DES-EDE3-CBC";}return this.getEncryptedPKCS5PEMFromPrvKeyHex("EC",w,y,m,j)}if(D=="PKCS5PRV"&&u!==undefined&&b instanceof u&&(y!==undefined&&y!=null)&&b.isPrivate==true){var E=x(b);var w=E.getEncodedHex();if(m===undefined){m="DES-EDE3-CBC";}return this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA",w,y,m,j)}var o=function(G,s){var I=c(G,s);var H=new l({seq:[{seq:[{oid:{name:"pkcs5PBES2"}},{seq:[{seq:[{oid:{name:"pkcs5PBKDF2"}},{seq:[{octstr:{hex:I.pbkdf2Salt}},{"int":I.pbkdf2Iter}]}]},{seq:[{oid:{name:"des-EDE3-CBC"}},{octstr:{hex:I.encryptionSchemeIV}}]}]}]},{octstr:{hex:I.ciphertext}}]});return H.getEncodedHex()};var c=function(N,O){var H=100;var M=CryptoJS.lib.WordArray.random(8);var L="DES-EDE3-CBC";var s=CryptoJS.lib.WordArray.random(8);var I=CryptoJS.PBKDF2(O,M,{keySize:192/32,iterations:H});var J=CryptoJS.enc.Hex.parse(N);var K=CryptoJS.TripleDES.encrypt(J,I,{iv:s})+"";var G={};G.ciphertext=K;G.pbkdf2Salt=CryptoJS.enc.Hex.stringify(M);G.pbkdf2Iter=H;G.encryptionSchemeAlg=L;G.encryptionSchemeIV=CryptoJS.enc.Hex.stringify(s);return G};if(D=="PKCS8PRV"&&n!=undefined&&b instanceof n&&b.isPrivate==true){var g=A(b);var d=g.getEncodedHex();var E=l({seq:[{"int":0},{seq:[{oid:{name:"rsaEncryption"}},{"null":true}]},{octstr:{hex:d}}]});var w=E.getEncodedHex();if(y===undefined||y==null){return hextopem(w,"PRIVATE KEY")}else{var t=o(w,y);return hextopem(t,"ENCRYPTED PRIVATE KEY")}}if(D=="PKCS8PRV"&&r!==undefined&&b instanceof r&&b.isPrivate==true){var g=new l({seq:[{"int":1},{octstr:{hex:b.prvKeyHex}},{tag:["a1",true,{bitstr:{hex:"00"+b.pubKeyHex}}]}]});var d=g.getEncodedHex();var E=l({seq:[{"int":0},{seq:[{oid:{name:"ecPublicKey"}},{oid:{name:b.curveName}}]},{octstr:{hex:d}}]});var w=E.getEncodedHex();if(y===undefined||y==null){return hextopem(w,"PRIVATE KEY")}else{var t=o(w,y);return hextopem(t,"ENCRYPTED PRIVATE KEY")}}if(D=="PKCS8PRV"&&u!==undefined&&b instanceof u&&b.isPrivate==true){var g=new f({bigint:b.x});var d=g.getEncodedHex();var E=l({seq:[{"int":0},{seq:[{oid:{name:"dsa"}},{seq:[{"int":{bigint:b.p}},{"int":{bigint:b.q}},{"int":{bigint:b.g}}]}]},{octstr:{hex:d}}]});var w=E.getEncodedHex();if(y===undefined||y==null){return hextopem(w,"PRIVATE KEY")}else{var t=o(w,y);return hextopem(t,"ENCRYPTED PRIVATE KEY")}}throw"unsupported object nor format"};KEYUTIL.getKeyFromCSRPEM=function(b){var a=pemtohex(b,"CERTIFICATE REQUEST");var c=KEYUTIL.getKeyFromCSRHex(a);return c};KEYUTIL.getKeyFromCSRHex=function(a){var c=KEYUTIL.parseCSRHex(a);var b=KEYUTIL.getKey(c.p8pubkeyhex,null,"pkcs8pub");return b};KEYUTIL.parseCSRHex=function(d){var i=ASN1HEX;var f=i.getChildIdx;var c=i.getTLV;var b={};var g=d;if(g.substr(0,2)!="30"){throw"malformed CSR(code:001)"}var e=f(g,0);if(e.length<1){throw"malformed CSR(code:002)"}if(g.substr(e[0],2)!="30"){throw"malformed CSR(code:003)"}var a=f(g,e[0]);if(a.length<3){throw"malformed CSR(code:004)"}b.p8pubkeyhex=c(g,a[2]);return b};KEYUTIL.getJWKFromKey=function(d){var b={};if(d instanceof RSAKey&&d.isPrivate){b.kty="RSA";b.n=hextob64u(d.n.toString(16));b.e=hextob64u(d.e.toString(16));b.d=hextob64u(d.d.toString(16));b.p=hextob64u(d.p.toString(16));b.q=hextob64u(d.q.toString(16));b.dp=hextob64u(d.dmp1.toString(16));b.dq=hextob64u(d.dmq1.toString(16));b.qi=hextob64u(d.coeff.toString(16));return b}else{if(d instanceof RSAKey&&d.isPublic){b.kty="RSA";b.n=hextob64u(d.n.toString(16));b.e=hextob64u(d.e.toString(16));return b}else{if(d instanceof KJUR.crypto.ECDSA&&d.isPrivate){var a=d.getShortNISTPCurveName();if(a!=="P-256"&&a!=="P-384"){throw"unsupported curve name for JWT: "+a}var c=d.getPublicKeyXYHex();b.kty="EC";b.crv=a;b.x=hextob64u(c.x);b.y=hextob64u(c.y);b.d=hextob64u(d.prvKeyHex);return b}else{if(d instanceof KJUR.crypto.ECDSA&&d.isPublic){var a=d.getShortNISTPCurveName();if(a!=="P-256"&&a!=="P-384"){throw"unsupported curve name for JWT: "+a}var c=d.getPublicKeyXYHex();b.kty="EC";b.crv=a;b.x=hextob64u(c.x);b.y=hextob64u(c.y);return b}}}}throw"not supported key object"};
RSAKey.getPosArrayOfChildrenFromHex=function(a){return ASN1HEX.getChildIdx(a,0)};RSAKey.getHexValueArrayOfChildrenFromHex=function(f){var n=ASN1HEX;var i=n.getV;var k=RSAKey.getPosArrayOfChildrenFromHex(f);var e=i(f,k[0]);var j=i(f,k[1]);var b=i(f,k[2]);var c=i(f,k[3]);var h=i(f,k[4]);var g=i(f,k[5]);var m=i(f,k[6]);var l=i(f,k[7]);var d=i(f,k[8]);var k=new Array();k.push(e,j,b,c,h,g,m,l,d);return k};RSAKey.prototype.readPrivateKeyFromPEMString=function(d){var c=pemtohex(d);var b=RSAKey.getHexValueArrayOfChildrenFromHex(c);this.setPrivateEx(b[1],b[2],b[3],b[4],b[5],b[6],b[7],b[8]);};RSAKey.prototype.readPKCS5PrvKeyHex=function(c){var b=RSAKey.getHexValueArrayOfChildrenFromHex(c);this.setPrivateEx(b[1],b[2],b[3],b[4],b[5],b[6],b[7],b[8]);};RSAKey.prototype.readPKCS8PrvKeyHex=function(e){var c,j,l,b,a,f,d,k;var m=ASN1HEX;var g=m.getVbyList;if(m.isASN1HEX(e)===false){throw"not ASN.1 hex string"}try{c=g(e,0,[2,0,1],"02");j=g(e,0,[2,0,2],"02");l=g(e,0,[2,0,3],"02");b=g(e,0,[2,0,4],"02");a=g(e,0,[2,0,5],"02");f=g(e,0,[2,0,6],"02");d=g(e,0,[2,0,7],"02");k=g(e,0,[2,0,8],"02");}catch(i){throw"malformed PKCS#8 plain RSA private key"}this.setPrivateEx(c,j,l,b,a,f,d,k);};RSAKey.prototype.readPKCS5PubKeyHex=function(c){var e=ASN1HEX;var b=e.getV;if(e.isASN1HEX(c)===false){throw"keyHex is not ASN.1 hex string"}var a=e.getChildIdx(c,0);if(a.length!==2||c.substr(a[0],2)!=="02"||c.substr(a[1],2)!=="02"){throw"wrong hex for PKCS#5 public key"}var f=b(c,a[0]);var d=b(c,a[1]);this.setPublic(f,d);};RSAKey.prototype.readPKCS8PubKeyHex=function(b){var c=ASN1HEX;if(c.isASN1HEX(b)===false){throw"not ASN.1 hex string"}if(c.getTLVbyList(b,0,[0,0])!=="06092a864886f70d010101"){throw"not PKCS8 RSA public key"}var a=c.getTLVbyList(b,0,[1,0]);this.readPKCS5PubKeyHex(a);};RSAKey.prototype.readCertPubKeyHex=function(b,d){var a,c;a=new X509();a.readCertHex(b);c=a.getPublicKeyHex();this.readPKCS8PubKeyHex(c);};
var _RE_HEXDECONLY=new RegExp("");_RE_HEXDECONLY.compile("[^0-9a-f]","gi");function _zeroPaddingOfSignature(e,d){var c="";var a=d/4-e.length;for(var b=0;b<a;b++){c=c+"0";}return c+e}RSAKey.prototype.sign=function(d,a){var b=function(e){return KJUR.crypto.Util.hashString(e,a)};var c=b(d);return this.signWithMessageHash(c,a)};RSAKey.prototype.signWithMessageHash=function(e,c){var f=KJUR.crypto.Util.getPaddedDigestInfoHex(e,c,this.n.bitLength());var b=parseBigInt(f,16);var d=this.doPrivate(b);var a=d.toString(16);return _zeroPaddingOfSignature(a,this.n.bitLength())};function pss_mgf1_str(c,a,e){var b="",d=0;while(b.length<a){b+=hextorstr(e(rstrtohex(c+String.fromCharCode.apply(String,[(d&4278190080)>>24,(d&16711680)>>16,(d&65280)>>8,d&255]))));d+=1;}return b}RSAKey.prototype.signPSS=function(e,a,d){var c=function(f){return KJUR.crypto.Util.hashHex(f,a)};var b=c(rstrtohex(e));if(d===undefined){d=-1;}return this.signWithMessageHashPSS(b,a,d)};RSAKey.prototype.signWithMessageHashPSS=function(l,a,k){var b=hextorstr(l);var g=b.length;var m=this.n.bitLength()-1;var c=Math.ceil(m/8);var d;var o=function(i){return KJUR.crypto.Util.hashHex(i,a)};if(k===-1||k===undefined){k=g;}else{if(k===-2){k=c-g-2;}else{if(k<-2){throw"invalid salt length"}}}if(c<(g+k+2)){throw"data too long"}var f="";if(k>0){f=new Array(k);new SecureRandom().nextBytes(f);f=String.fromCharCode.apply(String,f);}var n=hextorstr(o(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00"+b+f)));var j=[];for(d=0;d<c-k-g-2;d+=1){j[d]=0;}var e=String.fromCharCode.apply(String,j)+"\x01"+f;var h=pss_mgf1_str(n,e.length,o);var q=[];for(d=0;d<e.length;d+=1){q[d]=e.charCodeAt(d)^h.charCodeAt(d);}var p=(65280>>(8*c-m))&255;q[0]&=~p;for(d=0;d<g;d++){q.push(n.charCodeAt(d));}q.push(188);return _zeroPaddingOfSignature(this.doPrivate(new BigInteger(q)).toString(16),this.n.bitLength())};function _rsasign_getAlgNameAndHashFromHexDisgestInfo(f){for(var e in KJUR.crypto.Util.DIGESTINFOHEAD){var d=KJUR.crypto.Util.DIGESTINFOHEAD[e];var b=d.length;if(f.substring(0,b)==d){var c=[e,f.substring(b)];return c}}return []}RSAKey.prototype.verify=function(f,j){j=j.replace(_RE_HEXDECONLY,"");j=j.replace(/[ \n]+/g,"");var b=parseBigInt(j,16);if(b.bitLength()>this.n.bitLength()){return 0}var i=this.doPublic(b);var e=i.toString(16).replace(/^1f+00/,"");var g=_rsasign_getAlgNameAndHashFromHexDisgestInfo(e);if(g.length==0){return false}var d=g[0];var h=g[1];var a=function(k){return KJUR.crypto.Util.hashString(k,d)};var c=a(f);return(h==c)};RSAKey.prototype.verifyWithMessageHash=function(e,a){a=a.replace(_RE_HEXDECONLY,"");a=a.replace(/[ \n]+/g,"");var b=parseBigInt(a,16);if(b.bitLength()>this.n.bitLength()){return 0}var h=this.doPublic(b);var g=h.toString(16).replace(/^1f+00/,"");var c=_rsasign_getAlgNameAndHashFromHexDisgestInfo(g);if(c.length==0){return false}var f=c[1];return(f==e)};RSAKey.prototype.verifyPSS=function(c,b,a,f){var e=function(g){return KJUR.crypto.Util.hashHex(g,a)};var d=e(rstrtohex(c));if(f===undefined){f=-1;}return this.verifyWithMessageHashPSS(d,b,a,f)};RSAKey.prototype.verifyWithMessageHashPSS=function(f,s,l,c){var k=new BigInteger(s,16);if(k.bitLength()>this.n.bitLength()){return false}var r=function(i){return KJUR.crypto.Util.hashHex(i,l)};var j=hextorstr(f);var h=j.length;var g=this.n.bitLength()-1;var m=Math.ceil(g/8);var q;if(c===-1||c===undefined){c=h;}else{if(c===-2){c=m-h-2;}else{if(c<-2){throw"invalid salt length"}}}if(m<(h+c+2)){throw"data too long"}var a=this.doPublic(k).toByteArray();for(q=0;q<a.length;q+=1){a[q]&=255;}while(a.length<m){a.unshift(0);}if(a[m-1]!==188){throw"encoded message does not end in 0xbc"}a=String.fromCharCode.apply(String,a);var d=a.substr(0,m-h-1);var e=a.substr(d.length,h);var p=(65280>>(8*m-g))&255;if((d.charCodeAt(0)&p)!==0){throw"bits beyond keysize not zero"}var n=pss_mgf1_str(e,d.length,r);var o=[];for(q=0;q<d.length;q+=1){o[q]=d.charCodeAt(q)^n.charCodeAt(q);}o[0]&=~p;var b=m-h-c-2;for(q=0;q<b;q+=1){if(o[q]!==0){throw"leftmost octets not zero"}}if(o[b]!==1){throw"0x01 marker not found"}return e===hextorstr(r(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00"+j+String.fromCharCode.apply(String,o.slice(-c)))))};RSAKey.SALT_LEN_HLEN=-1;RSAKey.SALT_LEN_MAX=-2;RSAKey.SALT_LEN_RECOVER=-2;
function X509(){var k=ASN1HEX,j=k.getChildIdx,h=k.getV,b=k.getTLV,f=k.getVbyList,c=k.getTLVbyList,g=k.getIdxbyList,d=k.getVidx,i=k.oidname,a=X509,e=pemtohex;this.hex=null;this.version=0;this.foffset=0;this.aExtInfo=null;this.getVersion=function(){if(this.hex===null||this.version!==0){return this.version}if(c(this.hex,0,[0,0])!=="a003020102"){this.version=1;this.foffset=-1;return 1}this.version=3;return 3};this.getSerialNumberHex=function(){return f(this.hex,0,[0,1+this.foffset],"02")};this.getSignatureAlgorithmField=function(){return i(f(this.hex,0,[0,2+this.foffset,0],"06"))};this.getIssuerHex=function(){return c(this.hex,0,[0,3+this.foffset],"30")};this.getIssuerString=function(){return a.hex2dn(this.getIssuerHex())};this.getSubjectHex=function(){return c(this.hex,0,[0,5+this.foffset],"30")};this.getSubjectString=function(){return a.hex2dn(this.getSubjectHex())};this.getNotBefore=function(){var l=f(this.hex,0,[0,4+this.foffset,0]);l=l.replace(/(..)/g,"%$1");l=decodeURIComponent(l);return l};this.getNotAfter=function(){var l=f(this.hex,0,[0,4+this.foffset,1]);l=l.replace(/(..)/g,"%$1");l=decodeURIComponent(l);return l};this.getPublicKeyHex=function(){return k.getTLVbyList(this.hex,0,[0,6+this.foffset],"30")};this.getPublicKeyIdx=function(){return g(this.hex,0,[0,6+this.foffset],"30")};this.getPublicKeyContentIdx=function(){var l=this.getPublicKeyIdx();return g(this.hex,l,[1,0],"30")};this.getPublicKey=function(){return KEYUTIL.getKey(this.getPublicKeyHex(),null,"pkcs8pub")};this.getSignatureAlgorithmName=function(){return i(f(this.hex,0,[1,0],"06"))};this.getSignatureValueHex=function(){return f(this.hex,0,[2],"03",true)};this.verifySignature=function(n){var o=this.getSignatureAlgorithmName();var l=this.getSignatureValueHex();var m=c(this.hex,0,[0],"30");var p=new KJUR.crypto.Signature({alg:o});p.init(n);p.updateHex(m);return p.verify(l)};this.parseExt=function(){if(this.version!==3){return -1}var p=g(this.hex,0,[0,7,0],"30");var m=j(this.hex,p);this.aExtInfo=new Array();for(var n=0;n<m.length;n++){var q={};q.critical=false;var l=j(this.hex,m[n]);var r=0;if(l.length===3){q.critical=true;r=1;}q.oid=k.hextooidstr(f(this.hex,m[n],[0],"06"));var o=g(this.hex,m[n],[1+r]);q.vidx=d(this.hex,o);this.aExtInfo.push(q);}};this.getExtInfo=function(n){var l=this.aExtInfo;var o=n;if(!n.match(/^[0-9.]+$/)){o=KJUR.asn1.x509.OID.name2oid(n);}if(o===""){return undefined}for(var m=0;m<l.length;m++){if(l[m].oid===o){return l[m]}}return undefined};this.getExtBasicConstraints=function(){var n=this.getExtInfo("basicConstraints");if(n===undefined){return n}var l=h(this.hex,n.vidx);if(l===""){return {}}if(l==="0101ff"){return {cA:true}}if(l.substr(0,8)==="0101ff02"){var o=h(l,6);var m=parseInt(o,16);return {cA:true,pathLen:m}}throw"basicConstraints parse error"};this.getExtKeyUsageBin=function(){var o=this.getExtInfo("keyUsage");if(o===undefined){return ""}var m=h(this.hex,o.vidx);if(m.length%2!=0||m.length<=2){throw"malformed key usage value"}var l=parseInt(m.substr(0,2));var n=parseInt(m.substr(2),16).toString(2);return n.substr(0,n.length-l)};this.getExtKeyUsageString=function(){var n=this.getExtKeyUsageBin();var l=new Array();for(var m=0;m<n.length;m++){if(n.substr(m,1)=="1"){l.push(X509.KEYUSAGE_NAME[m]);}}return l.join(",")};this.getExtSubjectKeyIdentifier=function(){var l=this.getExtInfo("subjectKeyIdentifier");if(l===undefined){return l}return h(this.hex,l.vidx)};this.getExtAuthorityKeyIdentifier=function(){var p=this.getExtInfo("authorityKeyIdentifier");if(p===undefined){return p}var l={};var o=b(this.hex,p.vidx);var m=j(o,0);for(var n=0;n<m.length;n++){if(o.substr(m[n],2)==="80"){l.kid=h(o,m[n]);}}return l};this.getExtExtKeyUsageName=function(){var p=this.getExtInfo("extKeyUsage");if(p===undefined){return p}var l=new Array();var o=b(this.hex,p.vidx);if(o===""){return l}var m=j(o,0);for(var n=0;n<m.length;n++){l.push(i(h(o,m[n])));}return l};this.getExtSubjectAltName=function(){var m=this.getExtSubjectAltName2();var l=new Array();for(var n=0;n<m.length;n++){if(m[n][0]==="DNS"){l.push(m[n][1]);}}return l};this.getExtSubjectAltName2=function(){var p,s,r;var q=this.getExtInfo("subjectAltName");if(q===undefined){return q}var l=new Array();var o=b(this.hex,q.vidx);var m=j(o,0);for(var n=0;n<m.length;n++){r=o.substr(m[n],2);p=h(o,m[n]);if(r==="81"){s=hextoutf8(p);l.push(["MAIL",s]);}if(r==="82"){s=hextoutf8(p);l.push(["DNS",s]);}if(r==="84"){s=X509.hex2dn(p,0);l.push(["DN",s]);}if(r==="86"){s=hextoutf8(p);l.push(["URI",s]);}if(r==="87"){s=hextoip(p);l.push(["IP",s]);}}return l};this.getExtCRLDistributionPointsURI=function(){var q=this.getExtInfo("cRLDistributionPoints");if(q===undefined){return q}var l=new Array();var m=j(this.hex,q.vidx);for(var o=0;o<m.length;o++){try{var r=f(this.hex,m[o],[0,0,0],"86");var p=hextoutf8(r);l.push(p);}catch(n){}}return l};this.getExtAIAInfo=function(){var p=this.getExtInfo("authorityInfoAccess");if(p===undefined){return p}var l={ocsp:[],caissuer:[]};var m=j(this.hex,p.vidx);for(var n=0;n<m.length;n++){var q=f(this.hex,m[n],[0],"06");var o=f(this.hex,m[n],[1],"86");if(q==="2b06010505073001"){l.ocsp.push(hextoutf8(o));}if(q==="2b06010505073002"){l.caissuer.push(hextoutf8(o));}}return l};this.getExtCertificatePolicies=function(){var o=this.getExtInfo("certificatePolicies");if(o===undefined){return o}var l=b(this.hex,o.vidx);var u=[];var s=j(l,0);for(var r=0;r<s.length;r++){var t={};var n=j(l,s[r]);t.id=i(h(l,n[0]));if(n.length===2){var m=j(l,n[1]);for(var q=0;q<m.length;q++){var p=f(l,m[q],[0],"06");if(p==="2b06010505070201"){t.cps=hextoutf8(f(l,m[q],[1]));}else{if(p==="2b06010505070202"){t.unotice=hextoutf8(f(l,m[q],[1,0]));}}}}u.push(t);}return u};this.readCertPEM=function(l){this.readCertHex(e(l));};this.readCertHex=function(l){this.hex=l;this.getVersion();try{g(this.hex,0,[0,7],"a3");this.parseExt();}catch(m){}};this.getInfo=function(){var B,u,z;B="Basic Fields\n";B+="  serial number: "+this.getSerialNumberHex()+"\n";B+="  signature algorithm: "+this.getSignatureAlgorithmField()+"\n";B+="  issuer: "+this.getIssuerString()+"\n";B+="  notBefore: "+this.getNotBefore()+"\n";B+="  notAfter: "+this.getNotAfter()+"\n";B+="  subject: "+this.getSubjectString()+"\n";B+="  subject public key info: \n";u=this.getPublicKey();B+="    key algorithm: "+u.type+"\n";if(u.type==="RSA"){B+="    n="+hextoposhex(u.n.toString(16)).substr(0,16)+"...\n";B+="    e="+hextoposhex(u.e.toString(16))+"\n";}z=this.aExtInfo;if(z!==undefined&&z!==null){B+="X509v3 Extensions:\n";for(var r=0;r<z.length;r++){var n=z[r];var A=KJUR.asn1.x509.OID.oid2name(n.oid);if(A===""){A=n.oid;}var x="";if(n.critical===true){x="CRITICAL";}B+="  "+A+" "+x+":\n";if(A==="basicConstraints"){var v=this.getExtBasicConstraints();if(v.cA===undefined){B+="    {}\n";}else{B+="    cA=true";if(v.pathLen!==undefined){B+=", pathLen="+v.pathLen;}B+="\n";}}else{if(A==="keyUsage"){B+="    "+this.getExtKeyUsageString()+"\n";}else{if(A==="subjectKeyIdentifier"){B+="    "+this.getExtSubjectKeyIdentifier()+"\n";}else{if(A==="authorityKeyIdentifier"){var l=this.getExtAuthorityKeyIdentifier();if(l.kid!==undefined){B+="    kid="+l.kid+"\n";}}else{if(A==="extKeyUsage"){var w=this.getExtExtKeyUsageName();B+="    "+w.join(", ")+"\n";}else{if(A==="subjectAltName"){var t=this.getExtSubjectAltName2();B+="    "+t+"\n";}else{if(A==="cRLDistributionPoints"){var y=this.getExtCRLDistributionPointsURI();B+="    "+y+"\n";}else{if(A==="authorityInfoAccess"){var p=this.getExtAIAInfo();if(p.ocsp!==undefined){B+="    ocsp: "+p.ocsp.join(",")+"\n";}if(p.caissuer!==undefined){B+="    caissuer: "+p.caissuer.join(",")+"\n";}}else{if(A==="certificatePolicies"){var o=this.getExtCertificatePolicies();for(var q=0;q<o.length;q++){if(o[q].id!==undefined){B+="    policy oid: "+o[q].id+"\n";}if(o[q].cps!==undefined){B+="    cps: "+o[q].cps+"\n";}}}}}}}}}}}}}B+="signature algorithm: "+this.getSignatureAlgorithmName()+"\n";B+="signature: "+this.getSignatureValueHex().substr(0,16)+"...\n";return B};}X509.hex2dn=function(f,b){if(b===undefined){b=0;}if(f.substr(b,2)!=="30"){throw"malformed DN"}var c=new Array();var d=ASN1HEX.getChildIdx(f,b);for(var e=0;e<d.length;e++){c.push(X509.hex2rdn(f,d[e]));}c=c.map(function(a){return a.replace("/","\\/")});return "/"+c.join("/")};X509.hex2rdn=function(f,b){if(b===undefined){b=0;}if(f.substr(b,2)!=="31"){throw"malformed RDN"}var c=new Array();var d=ASN1HEX.getChildIdx(f,b);for(var e=0;e<d.length;e++){c.push(X509.hex2attrTypeValue(f,d[e]));}c=c.map(function(a){return a.replace("+","\\+")});return c.join("+")};X509.hex2attrTypeValue=function(d,i){var j=ASN1HEX;var h=j.getV;if(i===undefined){i=0;}if(d.substr(i,2)!=="30"){throw"malformed attribute type and value"}var g=j.getChildIdx(d,i);if(g.length!==2||d.substr(g[0],2)!=="06");var b=h(d,g[0]);var f=KJUR.asn1.ASN1Util.oidHexToInt(b);var e=KJUR.asn1.x509.OID.oid2atype(f);var a=h(d,g[1]);var c=hextorstr(a);return e+"="+c};X509.getPublicKeyFromCertHex=function(b){var a=new X509();a.readCertHex(b);return a.getPublicKey()};X509.getPublicKeyFromCertPEM=function(b){var a=new X509();a.readCertPEM(b);return a.getPublicKey()};X509.getPublicKeyInfoPropOfCertPEM=function(c){var e=ASN1HEX;var g=e.getVbyList;var b={};var a,f;b.algparam=null;a=new X509();a.readCertPEM(c);f=a.getPublicKeyHex();b.keyhex=g(f,0,[1],"03").substr(2);b.algoid=g(f,0,[0,0],"06");if(b.algoid==="2a8648ce3d0201"){b.algparam=g(f,0,[0,1],"06");}return b};X509.KEYUSAGE_NAME=["digitalSignature","nonRepudiation","keyEncipherment","dataEncipherment","keyAgreement","keyCertSign","cRLSign","encipherOnly","decipherOnly"];
if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.jws=="undefined"||!KJUR.jws){KJUR.jws={};}KJUR.jws.JWS=function(){var b=KJUR,a=b.jws.JWS,c=a.isSafeJSONString;this.parseJWS=function(g,j){if((this.parsedJWS!==undefined)&&(j||(this.parsedJWS.sigvalH!==undefined))){return}var i=g.match(/^([^.]+)\.([^.]+)\.([^.]+)$/);if(i==null){throw"JWS signature is not a form of 'Head.Payload.SigValue'."}var k=i[1];var e=i[2];var l=i[3];var n=k+"."+e;this.parsedJWS={};this.parsedJWS.headB64U=k;this.parsedJWS.payloadB64U=e;this.parsedJWS.sigvalB64U=l;this.parsedJWS.si=n;if(!j){var h=b64utohex(l);var f=parseBigInt(h,16);this.parsedJWS.sigvalH=h;this.parsedJWS.sigvalBI=f;}var d=b64utoutf8(k);var m=b64utoutf8(e);this.parsedJWS.headS=d;this.parsedJWS.payloadS=m;if(!c(d,this.parsedJWS,"headP")){throw"malformed JSON string for JWS Head: "+d}};};KJUR.jws.JWS.sign=function(i,v,y,z,a){var w=KJUR,m=w.jws,q=m.JWS,g=q.readSafeJSONString,p=q.isSafeJSONString,d=w.crypto,o=d.Mac,c=d.Signature,t=JSON;var s,j,n;if(typeof v!="string"&&typeof v!="object"){throw"spHeader must be JSON string or object: "+v}if(typeof v=="object"){j=v;s=t.stringify(j);}if(typeof v=="string"){s=v;if(!p(s)){throw"JWS Head is not safe JSON string: "+s}j=g(s);}n=y;if(typeof y=="object"){n=t.stringify(y);}if((i==""||i==null)&&j.alg!==undefined){i=j.alg;}if((i!=""&&i!=null)&&j.alg===undefined){j.alg=i;s=t.stringify(j);}if(i!==j.alg){throw"alg and sHeader.alg doesn't match: "+i+"!="+j.alg}var r=null;if(q.jwsalg2sigalg[i]===undefined){throw"unsupported alg name: "+i}else{r=q.jwsalg2sigalg[i];}var e=utf8tob64u(s);var l=utf8tob64u(n);var b=e+"."+l;var x="";if(r.substr(0,4)=="Hmac"){if(z===undefined){throw"mac key shall be specified for HS* alg"}var h=new o({alg:r,prov:"cryptojs",pass:z});h.updateString(b);x=h.doFinal();}else{if(r.indexOf("withECDSA")!=-1){var f=new c({alg:r});f.init(z,a);f.updateString(b);hASN1Sig=f.sign();x=KJUR.crypto.ECDSA.asn1SigToConcatSig(hASN1Sig);}else{if(r!="none"){var f=new c({alg:r});f.init(z,a);f.updateString(b);x=f.sign();}}}var u=hextob64u(x);return b+"."+u};KJUR.jws.JWS.verify=function(w,B,n){var x=KJUR,q=x.jws,t=q.JWS,i=t.readSafeJSONString,e=x.crypto,p=e.ECDSA,s=e.Mac,d=e.Signature,m;if(typeof RSAKey!==undefined){m=RSAKey;}var y=w.split(".");if(y.length!==3){return false}var f=y[0];var r=y[1];var c=f+"."+r;var A=b64utohex(y[2]);var l=i(b64utoutf8(y[0]));var k=null;var z=null;if(l.alg===undefined){throw"algorithm not specified in header"}else{k=l.alg;z=k.substr(0,2);}if(n!=null&&Object.prototype.toString.call(n)==="[object Array]"&&n.length>0){var b=":"+n.join(":")+":";if(b.indexOf(":"+k+":")==-1){throw"algorithm '"+k+"' not accepted in the list"}}if(k!="none"&&B===null){throw"key shall be specified to verify."}if(typeof B=="string"&&B.indexOf("-----BEGIN ")!=-1){B=KEYUTIL.getKey(B);}if(z=="RS"||z=="PS"){if(!(B instanceof m)){throw"key shall be a RSAKey obj for RS* and PS* algs"}}if(z=="ES"){if(!(B instanceof p)){throw"key shall be a ECDSA obj for ES* algs"}}var u=null;if(t.jwsalg2sigalg[l.alg]===undefined){throw"unsupported alg name: "+k}else{u=t.jwsalg2sigalg[k];}if(u=="none"){throw"not supported"}else{if(u.substr(0,4)=="Hmac"){var o=null;if(B===undefined){throw"hexadecimal key shall be specified for HMAC"}var j=new s({alg:u,pass:B});j.updateString(c);o=j.doFinal();return A==o}else{if(u.indexOf("withECDSA")!=-1){var h=null;try{h=p.concatSigToASN1Sig(A);}catch(v){return false}var g=new d({alg:u});g.init(B);g.updateString(c);return g.verify(h)}else{var g=new d({alg:u});g.init(B);g.updateString(c);return g.verify(A)}}}};KJUR.jws.JWS.parse=function(g){var c=g.split(".");var b={};var f,e,d;if(c.length!=2&&c.length!=3){throw"malformed sJWS: wrong number of '.' splitted elements"}f=c[0];e=c[1];if(c.length==3){d=c[2];}b.headerObj=KJUR.jws.JWS.readSafeJSONString(b64utoutf8(f));b.payloadObj=KJUR.jws.JWS.readSafeJSONString(b64utoutf8(e));b.headerPP=JSON.stringify(b.headerObj,null,"  ");if(b.payloadObj==null){b.payloadPP=b64utoutf8(e);}else{b.payloadPP=JSON.stringify(b.payloadObj,null,"  ");}if(d!==undefined){b.sigHex=b64utohex(d);}return b};KJUR.jws.JWS.verifyJWT=function(e,l,r){var d=KJUR,j=d.jws,o=j.JWS,n=o.readSafeJSONString,p=o.inArray,f=o.includedArray;var k=e.split(".");var c=k[0];var i=k[1];var m=b64utohex(k[2]);var h=n(b64utoutf8(c));var g=n(b64utoutf8(i));if(h.alg===undefined){return false}if(r.alg===undefined){throw"acceptField.alg shall be specified"}if(!p(h.alg,r.alg)){return false}if(g.iss!==undefined&&typeof r.iss==="object"){if(!p(g.iss,r.iss)){return false}}if(g.sub!==undefined&&typeof r.sub==="object"){if(!p(g.sub,r.sub)){return false}}if(g.aud!==undefined&&typeof r.aud==="object"){if(typeof g.aud=="string"){if(!p(g.aud,r.aud)){return false}}else{if(typeof g.aud=="object"){if(!f(g.aud,r.aud)){return false}}}}var b=j.IntDate.getNow();if(r.verifyAt!==undefined&&typeof r.verifyAt==="number"){b=r.verifyAt;}if(r.gracePeriod===undefined||typeof r.gracePeriod!=="number"){r.gracePeriod=0;}if(g.exp!==undefined&&typeof g.exp=="number"){if(g.exp+r.gracePeriod<b){return false}}if(g.nbf!==undefined&&typeof g.nbf=="number"){if(b<g.nbf-r.gracePeriod){return false}}if(g.iat!==undefined&&typeof g.iat=="number"){if(b<g.iat-r.gracePeriod){return false}}if(g.jti!==undefined&&r.jti!==undefined){if(g.jti!==r.jti){return false}}if(!o.verify(e,l,r.alg)){return false}return true};KJUR.jws.JWS.includedArray=function(b,a){var c=KJUR.jws.JWS.inArray;if(b===null){return false}if(typeof b!=="object"){return false}if(typeof b.length!=="number"){return false}for(var d=0;d<b.length;d++){if(!c(b[d],a)){return false}}return true};KJUR.jws.JWS.inArray=function(d,b){if(b===null){return false}if(typeof b!=="object"){return false}if(typeof b.length!=="number"){return false}for(var c=0;c<b.length;c++){if(b[c]==d){return true}}return false};KJUR.jws.JWS.jwsalg2sigalg={HS256:"HmacSHA256",HS384:"HmacSHA384",HS512:"HmacSHA512",RS256:"SHA256withRSA",RS384:"SHA384withRSA",RS512:"SHA512withRSA",ES256:"SHA256withECDSA",ES384:"SHA384withECDSA",PS256:"SHA256withRSAandMGF1",PS384:"SHA384withRSAandMGF1",PS512:"SHA512withRSAandMGF1",none:"none",};KJUR.jws.JWS.isSafeJSONString=function(c,b,d){var e=null;try{e=jsonParse(c);if(typeof e!="object"){return 0}if(e.constructor===Array){return 0}if(b){b[d]=e;}return 1}catch(a){return 0}};KJUR.jws.JWS.readSafeJSONString=function(b){var c=null;try{c=jsonParse(b);if(typeof c!="object"){return null}if(c.constructor===Array){return null}return c}catch(a){return null}};KJUR.jws.JWS.getEncodedSignatureValueFromJWS=function(b){var a=b.match(/^[^.]+\.[^.]+\.([^.]+)$/);if(a==null){throw"JWS signature is not a form of 'Head.Payload.SigValue'."}return a[1]};KJUR.jws.JWS.getJWKthumbprint=function(d){if(d.kty!=="RSA"&&d.kty!=="EC"&&d.kty!=="oct"){throw"unsupported algorithm for JWK Thumprint"}var a="{";if(d.kty==="RSA"){if(typeof d.n!="string"||typeof d.e!="string"){throw"wrong n and e value for RSA key"}a+='"e":"'+d.e+'",';a+='"kty":"'+d.kty+'",';a+='"n":"'+d.n+'"}';}else{if(d.kty==="EC"){if(typeof d.crv!="string"||typeof d.x!="string"||typeof d.y!="string"){throw"wrong crv, x and y value for EC key"}a+='"crv":"'+d.crv+'",';a+='"kty":"'+d.kty+'",';a+='"x":"'+d.x+'",';a+='"y":"'+d.y+'"}';}else{if(d.kty==="oct"){if(typeof d.k!="string"){throw"wrong k value for oct(symmetric) key"}a+='"kty":"'+d.kty+'",';a+='"k":"'+d.k+'"}';}}}var b=rstrtohex(a);var c=KJUR.crypto.Util.hashHex(b,"sha256");var e=hextob64u(c);return e};KJUR.jws.IntDate={};KJUR.jws.IntDate.get=function(c){var b=KJUR.jws.IntDate,d=b.getNow,a=b.getZulu;if(c=="now"){return d()}else{if(c=="now + 1hour"){return d()+60*60}else{if(c=="now + 1day"){return d()+60*60*24}else{if(c=="now + 1month"){return d()+60*60*24*30}else{if(c=="now + 1year"){return d()+60*60*24*365}else{if(c.match(/Z$/)){return a(c)}else{if(c.match(/^[0-9]+$/)){return parseInt(c)}}}}}}}throw"unsupported format: "+c};KJUR.jws.IntDate.getZulu=function(a){return zulutosec(a)};KJUR.jws.IntDate.getNow=function(){var a=~~(new Date()/1000);return a};KJUR.jws.IntDate.intDate2UTCString=function(a){var b=new Date(a*1000);return b.toUTCString()};KJUR.jws.IntDate.intDate2Zulu=function(e){var i=new Date(e*1000),h=("0000"+i.getUTCFullYear()).slice(-4),g=("00"+(i.getUTCMonth()+1)).slice(-2),b=("00"+i.getUTCDate()).slice(-2),a=("00"+i.getUTCHours()).slice(-2),c=("00"+i.getUTCMinutes()).slice(-2),f=("00"+i.getUTCSeconds()).slice(-2);return h+g+b+a+c+f+"Z"};
if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.jws=="undefined"||!KJUR.jws){KJUR.jws={};}KJUR.jws.JWSJS=function(){var c=KJUR,b=c.jws,a=b.JWS,d=a.readSafeJSONString;this.aHeader=[];this.sPayload="";this.aSignature=[];this.init=function(){this.aHeader=[];this.sPayload=undefined;this.aSignature=[];};this.initWithJWS=function(f){this.init();var e=f.split(".");if(e.length!=3){throw"malformed input JWS"}this.aHeader.push(e[0]);this.sPayload=e[1];this.aSignature.push(e[2]);};this.addSignature=function(e,h,m,k){if(this.sPayload===undefined||this.sPayload===null){throw"there's no JSON-JS signature to add."}var l=this.aHeader.length;if(this.aHeader.length!=this.aSignature.length){throw"aHeader.length != aSignature.length"}try{var f=KJUR.jws.JWS.sign(e,h,this.sPayload,m,k);var j=f.split(".");this.aHeader.push(j[0]);this.aSignature.push(j[2]);}catch(i){if(this.aHeader.length>l){this.aHeader.pop();}if(this.aSignature.length>l){this.aSignature.pop();}throw"addSignature failed: "+i}};this.verifyAll=function(h){if(this.aHeader.length!==h.length||this.aSignature.length!==h.length){return false}for(var g=0;g<h.length;g++){var f=h[g];if(f.length!==2){return false}var e=this.verifyNth(g,f[0],f[1]);if(e===false){return false}}return true};this.verifyNth=function(f,j,g){if(this.aHeader.length<=f||this.aSignature.length<=f){return false}var h=this.aHeader[f];var k=this.aSignature[f];var l=h+"."+this.sPayload+"."+k;var e=false;try{e=a.verify(l,j,g);}catch(i){return false}return e};this.readJWSJS=function(g){if(typeof g==="string"){var f=d(g);if(f==null){throw"argument is not safe JSON object string"}this.aHeader=f.headers;this.sPayload=f.payload;this.aSignature=f.signatures;}else{try{if(g.headers.length>0){this.aHeader=g.headers;}else{throw"malformed header"}if(typeof g.payload==="string"){this.sPayload=g.payload;}else{throw"malformed signatures"}if(g.signatures.length>0){this.aSignatures=g.signatures;}else{throw"malformed signatures"}}catch(e){throw"malformed JWS-JS JSON object: "+e}}};this.getJSON=function(){return {headers:this.aHeader,payload:this.sPayload,signatures:this.aSignature}};this.isEmpty=function(){if(this.aHeader.length==0){return 1}return 0};};
var SecureRandom_1 = SecureRandom;
var rng_seed_time_1 = rng_seed_time;

var BigInteger_1 = BigInteger;
var RSAKey_1 = RSAKey;
var ECDSA = KJUR.crypto.ECDSA;
var DSA = KJUR.crypto.DSA;
var Signature = KJUR.crypto.Signature;
var MessageDigest = KJUR.crypto.MessageDigest;
var Mac = KJUR.crypto.Mac;
var Cipher = KJUR.crypto.Cipher;
var KEYUTIL_1 = KEYUTIL;
var ASN1HEX_1 = ASN1HEX;
var X509_1 = X509;
var CryptoJS_1 = CryptoJS;

// ext/base64.js
var b64tohex_1 = b64tohex;
var b64toBA_1 = b64toBA;

// base64x.js
var stoBA_1 = stoBA;
var BAtos_1 = BAtos;
var BAtohex_1 = BAtohex;
var stohex_1 = stohex;
var stob64_1 = stob64;
var stob64u_1 = stob64u;
var b64utos_1 = b64utos;
var b64tob64u_1 = b64tob64u;
var b64utob64_1 = b64utob64;
var hex2b64_1 = hex2b64;
var hextob64u_1 = hextob64u;
var b64utohex_1 = b64utohex;
var utf8tob64u_1 = utf8tob64u;
var b64utoutf8_1 = b64utoutf8;
var utf8tob64_1 = utf8tob64;
var b64toutf8_1 = b64toutf8;
var utf8tohex_1 = utf8tohex;
var hextoutf8_1 = hextoutf8;
var hextorstr_1 = hextorstr;
var rstrtohex_1 = rstrtohex;
var hextob64_1 = hextob64;
var hextob64nl_1 = hextob64nl;
var b64nltohex_1 = b64nltohex;
var hextopem_1 = hextopem;
var pemtohex_1 = pemtohex;
var hextoArrayBuffer_1 = hextoArrayBuffer;
var ArrayBuffertohex_1 = ArrayBuffertohex;
var zulutomsec_1 = zulutomsec;
var zulutosec_1 = zulutosec;
var zulutodate_1 = zulutodate;
var datetozulu_1 = datetozulu;
var uricmptohex_1 = uricmptohex;
var hextouricmp_1 = hextouricmp;
var ipv6tohex_1 = ipv6tohex;
var hextoipv6_1 = hextoipv6;
var hextoip_1 = hextoip;
var iptohex_1 = iptohex;
var encodeURIComponentAll_1 = encodeURIComponentAll;
var newline_toUnix_1 = newline_toUnix;
var newline_toDos_1 = newline_toDos;
var hextoposhex_1 = hextoposhex;
var intarystrtohex_1 = intarystrtohex;
var strdiffidx_1 = strdiffidx;

// name spaces
var KJUR_1 = KJUR;
var crypto_1 = KJUR.crypto;
var asn1 = KJUR.asn1;
var jws = KJUR.jws;
var lang = KJUR.lang;

var jsrsasign = {
	SecureRandom: SecureRandom_1,
	rng_seed_time: rng_seed_time_1,
	BigInteger: BigInteger_1,
	RSAKey: RSAKey_1,
	ECDSA: ECDSA,
	DSA: DSA,
	Signature: Signature,
	MessageDigest: MessageDigest,
	Mac: Mac,
	Cipher: Cipher,
	KEYUTIL: KEYUTIL_1,
	ASN1HEX: ASN1HEX_1,
	X509: X509_1,
	CryptoJS: CryptoJS_1,
	b64tohex: b64tohex_1,
	b64toBA: b64toBA_1,
	stoBA: stoBA_1,
	BAtos: BAtos_1,
	BAtohex: BAtohex_1,
	stohex: stohex_1,
	stob64: stob64_1,
	stob64u: stob64u_1,
	b64utos: b64utos_1,
	b64tob64u: b64tob64u_1,
	b64utob64: b64utob64_1,
	hex2b64: hex2b64_1,
	hextob64u: hextob64u_1,
	b64utohex: b64utohex_1,
	utf8tob64u: utf8tob64u_1,
	b64utoutf8: b64utoutf8_1,
	utf8tob64: utf8tob64_1,
	b64toutf8: b64toutf8_1,
	utf8tohex: utf8tohex_1,
	hextoutf8: hextoutf8_1,
	hextorstr: hextorstr_1,
	rstrtohex: rstrtohex_1,
	hextob64: hextob64_1,
	hextob64nl: hextob64nl_1,
	b64nltohex: b64nltohex_1,
	hextopem: hextopem_1,
	pemtohex: pemtohex_1,
	hextoArrayBuffer: hextoArrayBuffer_1,
	ArrayBuffertohex: ArrayBuffertohex_1,
	zulutomsec: zulutomsec_1,
	zulutosec: zulutosec_1,
	zulutodate: zulutodate_1,
	datetozulu: datetozulu_1,
	uricmptohex: uricmptohex_1,
	hextouricmp: hextouricmp_1,
	ipv6tohex: ipv6tohex_1,
	hextoipv6: hextoipv6_1,
	hextoip: hextoip_1,
	iptohex: iptohex_1,
	encodeURIComponentAll: encodeURIComponentAll_1,
	newline_toUnix: newline_toUnix_1,
	newline_toDos: newline_toDos_1,
	hextoposhex: hextoposhex_1,
	intarystrtohex: intarystrtohex_1,
	strdiffidx: strdiffidx_1,
	KJUR: KJUR_1,
	crypto: crypto_1,
	asn1: asn1,
	jws: jws,
	lang: lang
};

var Utilities;
(function (Utilities) {
    function getCookie(name) {
        return js_cookie.get(name);
    }
    Utilities.getCookie = getCookie;
    function deleteCookie(name) {
        return js_cookie.remove(name, { path: '/', domain: '.crossroads.net' });
    }
    Utilities.deleteCookie = deleteCookie;
    function setCookie(name, value) {
        js_cookie.set(name, value, {
            expires: 24,
            path: '/',
            domain: '.crossroads.net'
        });
    }
    Utilities.setCookie = setCookie;
    function setNetlifyJWT() {
        const oHeader = { alg: 'HS256', typ: 'JWT' };
        const sHeader = JSON.stringify(oHeader);
        var myDate = new Date();
        myDate.setHours(myDate.getHours() + 24);
        const sPayload = JSON.stringify({
            app_metadata: {
                authorization: {
                    roles: ['user']
                }
            },
            exp: Math.floor(myDate.getTime() / 1000)
        });
        const token = jsrsasign.jws.JWS.sign('HS256', sHeader, sPayload, 'netlifySecretThatsNotASecret');
        setCookie('nf_jwt', token);
    }
    Utilities.setNetlifyJWT = setNetlifyJWT;
})(Utilities || (Utilities = {}));

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


var atob$1 = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob$1(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

var base64_url_decode = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob$1(output);
  }
};

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

var lib = function (token,options) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
};

var InvalidTokenError_1 = InvalidTokenError;
lib.InvalidTokenError = InvalidTokenError_1;

class CrdsMpService {
    constructor(accessTokenCookie, refreshTokenCookie, issuer) {
        this.accessTokenCookie = accessTokenCookie;
        this.refreshTokenCookie = refreshTokenCookie;
        this.issuer = issuer;
    }
    authenticated() {
        // Just check for the presence of a cookie
        let accessToken = Utilities.getCookie(this.accessTokenCookie);
        let refreshToken = Utilities.getCookie(this.refreshTokenCookie);
        if (accessToken) {
            var decoded = lib(accessToken);
            if (Date.now() <= decoded.exp * 1000)
                return of(CrdsMpTokens.From({ access_token: { 'accessToken': accessToken }, refresh_token: refreshToken }));
            return from$1(this.authenticate(accessToken, refreshToken));
        }
        else
            return of(null);
    }
    async authenticate(accessToken, refreshToken) {
        try {
            var authResponse = await axios$1.get(this.issuer, {
                headers: {
                    "Authorization": accessToken,
                    "RefreshToken": refreshToken
                }
            });
            accessToken = authResponse.headers['sessionid'];
            refreshToken = authResponse.headers['refreshtoken'];
            if (!accessToken)
                return null;
            Utilities.setCookie(this.refreshTokenCookie, refreshToken);
            Utilities.setCookie(this.accessTokenCookie, accessToken);
            return CrdsMpTokens.From({ access_token: { 'accessToken': accessToken }, refresh_token: refreshToken });
        }
        catch (err) {
            return null;
        }
    }
    signOut() {
        let accessToken = Utilities.getCookie(this.accessTokenCookie);
        if (accessToken) {
            // clear both the access and refresh tokens
            Utilities.deleteCookie(this.accessTokenCookie);
            Utilities.deleteCookie(this.refreshTokenCookie);
            return of(true);
        }
        else {
            return of(false);
        }
    }
}

class CrdsLoggerService {
    constructor(on) {
        this.on = on;
    }
    Error(header, detail) {
        if (this.on) {
            if (detail != null) {
                console.error(`CRDS-OKTA-AUTH: ${header}`, detail);
            }
            else {
                console.error(`CRDS-OKTA-AUTH: ${header}`);
            }
        }
    }
    Warn(header, detail) {
        if (this.on) {
            if (detail != null) {
                console.warn(`CRDS-OKTA-AUTH: ${header}`, detail);
            }
            else {
                console.warn(`CRDS-OKTA-AUTH: ${header}`);
            }
        }
    }
    Info(header, detail) {
        if (this.on) {
            if (detail != null) {
                console.info(`CRDS-OKTA-AUTH: ${header}`, detail);
            }
            else {
                console.info(`CRDS-OKTA-AUTH: ${header}`);
            }
        }
    }
    Log(header, detail) {
        if (this.on) {
            if (detail != null) {
                console.log(`CRDS-OKTA-AUTH: ${header}`, detail);
            }
            else {
                console.log(`CRDS-OKTA-AUTH: ${header}`);
            }
        }
    }
}

var browserPonyfill = createCommonjsModule(function (module, exports) {
var __self__ = (function (root) {
function F() {
this.fetch = false;
this.DOMException = root.DOMException;
}
F.prototype = root;
return new F();
})(typeof self !== 'undefined' ? self : commonjsGlobal);
(function(self) {

var irrelevant = (function (exports) {
  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  return exports;

}({}));
})(__self__);
delete __self__.fetch.polyfill;
exports = __self__.fetch; // To enable: import fetch from 'cross-fetch'
exports.default = __self__.fetch; // For TypeScript consumers without esModuleInterop.
exports.fetch = __self__.fetch; // To enable: import {fetch} from 'cross-fetch'
exports.Headers = __self__.Headers;
exports.Request = __self__.Request;
exports.Response = __self__.Response;
module.exports = exports;
});

/*!
 * Copyright (c) 2018-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */



/* eslint-disable complexity */
function fetchRequest(method, url, args) {
  var body = args.data;
  var headers = args.headers || {};
  var contentType = (headers['Content-Type'] || headers['content-type'] || '');

  // JSON encode body (if appropriate)
  if (contentType === 'application/json' && body && typeof body !== 'string') {
    body = JSON.stringify(body);
  }

  var fetchPromise = browserPonyfill(url, {
    method: method,
    headers: args.headers,
    body: body,
    credentials: args.withCredentials === false ? 'omit' : 'include'
  })
  .then(function(response) {
    var error = !response.ok;
    var status = response.status;
    var respHandler = function(resp) {
      var result = {
        responseText: resp,
        status: status
      };
      if (error) {
        // Throwing response object since error handling is done in http.js
        throw result;
      }
      return result;
    };
    if (response.headers.get('Content-Type') &&
        response.headers.get('Content-Type').toLowerCase().indexOf('application/json') >= 0) {
      return response.json().then(respHandler);
    } else {
      return response.text().then(respHandler);
    }
  });
  return fetchPromise;
}

var fetchRequest_1 = fetchRequest;

var js_cookie$1 = createCommonjsModule(function (module, exports) {
(function (factory) {
	var registeredInModuleLoader = false;
	{
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));
});

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

function AuthSdkError(msg, xhr) {
  this.name = 'AuthSdkError';
  this.message = msg;

  this.errorCode = 'INTERNAL';
  this.errorSummary = msg;
  this.errorLink = 'INTERNAL';
  this.errorId = 'INTERNAL';
  this.errorCauses = [];
  if (xhr) {
    this.xhr = xhr;
  }
}
AuthSdkError.prototype = new Error();

var AuthSdkError_1 = AuthSdkError;

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */



// storage must have getItem and setItem
function storageBuilder(webstorage, storageName) {
  if (typeof storageName !== 'string' || !storageName.length) {
    throw new AuthSdkError_1('"storageName" is required');
  }

  function getStorage() {
    var storageString = webstorage.getItem(storageName);
    storageString = storageString || '{}';
    try {
      return JSON.parse(storageString);
    } catch(e) {
      throw new AuthSdkError_1('Unable to parse storage string: ' + storageName);
    }
  }

  function setStorage(storage) {
    try {
      var storageString = JSON.stringify(storage);
      webstorage.setItem(storageName, storageString);
    } catch(e) {
      throw new AuthSdkError_1('Unable to set storage: ' + storageName);
    }
  }

  function clearStorage(key) {
    if (!key) {
      setStorage({});
    }
    var storage = getStorage();
    delete storage[key];
    setStorage(storage);
  }

  function updateStorage(key, value) {
    var storage = getStorage();
    storage[key] = value;
    setStorage(storage);
  }

  return {
    getStorage: getStorage,
    setStorage: setStorage,
    clearStorage: clearStorage,
    updateStorage: updateStorage
  };
}

var storageBuilder_1 = storageBuilder;

var config$1 = {
  "STATE_TOKEN_KEY_NAME": "oktaStateToken",
  "DEFAULT_POLLING_DELAY": 500,
  "DEFAULT_MAX_CLOCK_SKEW": 300,
  "DEFAULT_CACHE_DURATION": 86400,
  "FRAME_ID": "okta-oauth-helper-frame",
  "REDIRECT_OAUTH_PARAMS_COOKIE_NAME": "okta-oauth-redirect-params",
  "REDIRECT_STATE_COOKIE_NAME": "okta-oauth-state",
  "REDIRECT_NONCE_COOKIE_NAME": "okta-oauth-nonce",
  "TOKEN_STORAGE_NAME": "okta-token-storage",
  "CACHE_STORAGE_NAME": "okta-cache-storage",
  "PKCE_STORAGE_NAME": "okta-pkce-storage",
  "SDK_VERSION": "2.8.0"
};

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */





// Building this as an object allows us to mock the functions in our tests
var storageUtil = {};

// IE11 bug that Microsoft doesn't plan to fix
// https://connect.microsoft.com/IE/Feedback/Details/1496040
storageUtil.browserHasLocalStorage = function() {
  try {
    var storage = storageUtil.getLocalStorage();
    return storageUtil.testStorage(storage);
  } catch (e) {
    return false;
  }
};

storageUtil.browserHasSessionStorage = function() {
  try {
    var storage = storageUtil.getSessionStorage();
    return storageUtil.testStorage(storage);
  } catch (e) {
    return false;
  }
};

storageUtil.getPKCEStorage = function() {
  if (storageUtil.browserHasLocalStorage()) {
    return storageBuilder_1(storageUtil.getLocalStorage(), config$1.PKCE_STORAGE_NAME);
  } else if (storageUtil.browserHasSessionStorage()) {
    return storageBuilder_1(storageUtil.getSessionStorage(), config$1.PKCE_STORAGE_NAME);
  } else {
    return storageBuilder_1(storageUtil.getCookieStorage(), config$1.PKCE_STORAGE_NAME);
  }
};

storageUtil.getHttpCache = function() {
  if (storageUtil.browserHasLocalStorage()) {
    return storageBuilder_1(storageUtil.getLocalStorage(), config$1.CACHE_STORAGE_NAME);
  } else if (storageUtil.browserHasSessionStorage()) {
    return storageBuilder_1(storageUtil.getSessionStorage(), config$1.CACHE_STORAGE_NAME);
  } else {
    return storageBuilder_1(storageUtil.getCookieStorage(), config$1.CACHE_STORAGE_NAME);
  }
};

storageUtil.getLocalStorage = function() {
  return localStorage;
};

storageUtil.getSessionStorage = function() {
  return sessionStorage;
};

// Provides webStorage-like interface for cookies
storageUtil.getCookieStorage = function(options) {
  options = options || {};
  return {
    getItem: storageUtil.storage.get,
    setItem: function(key, value) {
      // Cookie shouldn't expire
      storageUtil.storage.set(key, value, '2200-01-01T00:00:00.000Z', options.secure);
    }
  };
};

storageUtil.testStorage = function(storage) {
  var key = 'okta-test-storage';
  try {
    storage.setItem(key, key);
    storage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

storageUtil.storage = {
  set: function(name, value, expiresAt, secure) {
    var cookieOptions = {
      path: '/',
      secure: secure
    };

    // eslint-disable-next-line no-extra-boolean-cast
    if (!!(Date.parse(expiresAt))) {
      // Expires value can be converted to a Date object.
      //
      // If the 'expiresAt' value is not provided, or the value cannot be
      // parsed as a Date object, the cookie will set as a session cookie.
      cookieOptions.expires = new Date(expiresAt);
    }

    js_cookie$1.set(name, value, cookieOptions);
    return storageUtil.storage.get(name);
  },

  get: function(name) {
    return js_cookie$1.get(name);
  },

  delete: function(name) {
    return js_cookie$1.remove(name, { path: '/' });
  }
};

var browserStorage = storageUtil;

var base64 = createCommonjsModule(function (module, exports) {
(function () {

  var object =  exports ; // #8: web workers
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  function InvalidCharacterError(message) {
    this.message = message;
  }
  InvalidCharacterError.prototype = new Error;
  InvalidCharacterError.prototype.name = 'InvalidCharacterError';

  // encoder
  // [https://gist.github.com/999166] by [https://github.com/nignag]
  object.btoa || (
  object.btoa = function (input) {
    var str = String(input);
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars, output = '';
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      str.charAt(idx | 0) || (map = '=', idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
      charCode = str.charCodeAt(idx += 3/4);
      if (charCode > 0xFF) {
        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      block = block << 8 | charCode;
    }
    return output;
  });

  // decoder
  // [https://gist.github.com/1020396] by [https://github.com/atk]
  object.atob || (
  object.atob = function (input) {
    var str = String(input).replace(/=+$/, '');
    if (str.length % 4 == 1) {
      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = '';
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  });

}());
});

/*!
 * Copyright (c) 2015-2016, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */



// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;

    // 1. Let o be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var o = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of o with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = o.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of o with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of o with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in o && o[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

if (!Array.isArray) {
  Array.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
}

var util_1 = createCommonjsModule(function (module) {
/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */
/* eslint-env es6 */
var util = module.exports;

// converts a string to base64 (url/filename safe variant)
util.stringToBase64Url = function(str) {
  var b64 = btoa(str);
  return util.base64ToBase64Url(b64);
};

// converts a standard base64-encoded string to a "url/filename safe" variant
util.base64ToBase64Url = function(b64) {
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

// converts a "url/filename safe" base64 string to a "standard" base64 string
util.base64UrlToBase64 = function(b64u) {
  return b64u.replace(/-/g, '+').replace(/_/g, '/');
};

util.base64UrlToString = function(b64u) {
  var b64 = util.base64UrlToBase64(b64u);
  switch (b64.length % 4) {
    case 0:
      break;
    case 2:
      b64 += '==';
      break;
    case 3:
      b64 += '=';
      break;
    default:
      throw 'Not a valid Base64Url';
  }
  var utf8 = atob(b64);
  try {
    return decodeURIComponent(escape(utf8));
  } catch (e) {
    return utf8;
  }
};

util.stringToBuffer = function(str) {
  var buffer = new Uint8Array(str.length);
  for (var i = 0; i < str.length; i++) {
    buffer[i] = str.charCodeAt(i);
  }
  return buffer;
};

util.base64UrlDecode = function(str) {
  return atob(util.base64UrlToBase64(str));
};

util.bind = function(fn, ctx) {
  var additionalArgs = Array.prototype.slice.call(arguments, 2);
  return function() {
    var args = Array.prototype.slice.call(arguments);
    args = additionalArgs.concat(args);
    return fn.apply(ctx, args);
  };
};

util.isAbsoluteUrl = function(url) {
  return /^(?:[a-z]+:)?\/\//i.test(url);
};

util.isString = function(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
};

util.isObject = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

util.isNumber = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Number]';
};

util.isArray = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

util.isoToUTCString = function(str) {
  var parts = str.match(/\d+/g),
      isoTime = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]),
      isoDate = new Date(isoTime);

  return isoDate.toUTCString();
};

util.toQueryParams = function(obj) {
  var str = [];
  if (obj !== null) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key) &&
          obj[key] !== undefined &&
          obj[key] !== null) {
        str.push(key + '=' + encodeURIComponent(obj[key]));
      }
    }
  }
  if (str.length) {
    return '?' + str.join('&');
  } else {
    return '';
  }
};

util.genRandomString = function(length) {
  var randomCharset = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var random = '';
  for (var c = 0, cl = randomCharset.length; c < length; ++c) {
    random += randomCharset[Math.floor(Math.random() * cl)];
  }
  return random;
};

util.extend = function() {
  // First object will be modified!
  var obj1 = arguments[0];
  // Properties from other objects will be copied over
  var objArray = [].slice.call(arguments, 1);
  objArray.forEach(function(obj) {
    for (var prop in obj) {
      // copy over all properties with defined values
      if (obj.hasOwnProperty(prop) && obj[prop] !== undefined) {
        obj1[prop] = obj[prop];
      }
    }
  });
  return obj1; // return the modified object
};

util.removeNils = function(obj) {
  var cleaned = {};
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      var value = obj[prop];
      if (value !== null && value !== undefined) {
        cleaned[prop] = value;
      }
    }
  }
  return cleaned;
};

util.clone = function(obj) {
  if (obj) {
    var str = JSON.stringify(obj);
    if (str) {
      return JSON.parse(str);
    }
  }
  return obj;
};

// Analogous to _.omit
util.omit = function(obj) {
  var props = Array.prototype.slice.call(arguments, 1);
  var newobj = {};
  for (var p in obj) {
    if (obj.hasOwnProperty(p) && props.indexOf(p) == -1) {
      newobj[p] = obj[p];
    }
  }
  return util.clone(newobj);
};

util.find = function(collection, searchParams) {
  var c = collection.length;
  while (c--) {
    var item = collection[c];
    var found = true;
    for (var prop in searchParams) {
      if (!searchParams.hasOwnProperty(prop)) {
        continue;
      }
      if (item[prop] !== searchParams[prop]) {
        found = false;
        break;
      }
    }
    if (found) {
      return item;
    }
  }
};

util.getLink = function(obj, linkName, altName) {
  if (!obj || !obj._links) {
    return;
  }

  var link = util.clone(obj._links[linkName]);

  // If a link has a name and we have an altName, return if they match
  if (link && link.name && altName) {
    if (link.name === altName) {
      return link;
    }
  } else {
    return link;
  }
};

util.getNativeConsole = function() {
  if (typeof window !== 'undefined') {
    return window.console;
  } else if (typeof console !== 'undefined') {
    return console;
  } else {
    return undefined;
  }
};

util.getConsole = function() {
  var nativeConsole = util.getNativeConsole();
  if (nativeConsole && nativeConsole.log) {
    return nativeConsole;
  }
  return {
    log: function() {}
  };
};

util.warn = function(text) {
  /* eslint-disable no-console */
  util.getConsole().log('[okta-auth-sdk] WARN: ' + text);
  /* eslint-enable */
};

util.deprecate = function(text) {
  /* eslint-disable no-console */
  util.getConsole().log('[okta-auth-sdk] DEPRECATION: ' + text);
  /* eslint-enable */
};

util.deprecateWrap = function(text, fn) {
  return function() {
    util.deprecate(text);
    return fn.apply(null, arguments);
  };
};

util.removeTrailingSlash = function(path) {
  if (!path) {
    return;
  }
  // Remove any whitespace before or after string
  var trimmed = path.replace(/^\s+|\s+$/gm,'');
  if (trimmed.slice(-1) === '/') {
    return trimmed.slice(0, -1);
  }
  return trimmed;
};

util.isIE11OrLess = function() {
  return !!document.documentMode && document.documentMode <= 11;
};

util.isFunction = function(fn) {
  return !!fn && {}.toString.call(fn) === '[object Function]';
};
});

var q = createCommonjsModule(function (module, exports) {
// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else {
        module.exports = definition();

    // RequireJS
    }

})(function () {

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick$1 =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;
    // queue for late tasks, used by unhandled rejection tracking
    var laterQueue = [];

    function flush() {
        /* jshint loopfunc: true */
        var task, domain;

        while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }
            runSingle(task, domain);

        }
        while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
        }
        flushing = false;
    }
    // runs a single function in the async queue
    function runSingle(task, domain) {
        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function () {
                    throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    nextTick$1 = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process === "object" &&
        process.toString() === "[object process]" && nextTick) {
        // Ensure Q is in a real Node environment, with a `process.nextTick`.
        // To see through fake Node environments:
        // * Mocha test runner - exposes a `process` global without a `nextTick`
        // * Browserify - exposes a `process.nexTick` function that uses
        //   `setTimeout`. In this case `setImmediate` is preferred because
        //    it is faster. Browserify's `process.toString()` yields
        //   "[object Object]", while in a real Node environment
        //   `process.nextTick()` yields "[object process]".
        isNodeJS = true;

        requestTick = function () {
            nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }
    // runs a task after all other tasks have been run
    // this is useful for unhandled rejection tracking that needs to happen
    // after all `then`d tasks have been run.
    nextTick$1.runAfter = function (task) {
        laterQueue.push(task);
        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };
    return nextTick$1;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined$1, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack &&
        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (value instanceof Promise) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick$1;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

// enable long stacks if Q_DEBUG is set
if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
    Q.longStackSupport = true;
}

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            Q.nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;
        promise.source = newPromise;

        array_reduce(messages, function (undefined$1, message) {
            Q.nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined$1, progressListener) {
            Q.nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become settled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be settled
 */
Q.race = race;
function race(answerPs) {
    return promise(function (resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function (answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    Q.nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

Q.tap = function (promise, callback) {
    return Q(promise).tap(callback);
};

/**
 * Works almost like "finally", but not called for rejections.
 * Original resolution value is passed through callback unaffected.
 * Callback may return a promise that will be awaited for.
 * @param {Function} callback
 * @returns {Q.Promise}
 * @example
 * doSomething()
 *   .then(...)
 *   .tap(console.log)
 *   .then(...);
 */
Promise.prototype.tap = function (callback) {
    callback = Q(callback);

    return this.then(function (value) {
        return callback.fcall(value).thenResolve(value);
    });
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return object instanceof Promise;
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var reportedUnhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }
    if (typeof process === "object" && typeof process.emit === "function") {
        Q.nextTick.runAfter(function () {
            if (array_indexOf(unhandledRejections, promise) !== -1) {
                process.emit("unhandledRejection", reason, promise);
                reportedUnhandledRejections.push(promise);
            }
        });
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function () {
                var atReport = array_indexOf(reportedUnhandledRejections, promise);
                if (atReport !== -1) {
                    process.emit("rejectionHandled", unhandledReasons[at], promise);
                    reportedUnhandledRejections.splice(atReport, 1);
                }
            });
        }
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return Q(result.value);
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return Q(exception.value);
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var pendingCount = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined$1, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++pendingCount;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (pendingCount === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Returns the first resolved promise of an array. Prior rejected promises are
 * ignored.  Rejects only if all promises are rejected.
 * @param {Array*} an array containing values or promises for values
 * @returns a promise fulfilled with the value of the first resolved promise,
 * or a rejected promise if all promises are rejected.
 */
Q.any = any;

function any(promises) {
    if (promises.length === 0) {
        return Q.resolve();
    }

    var deferred = Q.defer();
    var pendingCount = 0;
    array_reduce(promises, function (prev, current, index) {
        var promise = promises[index];

        pendingCount++;

        when(promise, onFulfilled, onRejected, onProgress);
        function onFulfilled(result) {
            deferred.resolve(result);
        }
        function onRejected() {
            pendingCount--;
            if (pendingCount === 0) {
                deferred.reject(new Error(
                    "Can't get fulfillment value from any promise, all " +
                    "promises were rejected."
                ));
            }
        }
        function onProgress(progress) {
            deferred.notify({
                index: index,
                value: progress
            });
        }
    }, undefined);

    return deferred.promise;
}

Promise.prototype.any = function () {
    return any(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        Q.nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {Any*} custom error message or Error object (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, error) {
    return Q(object).timeout(ms, error);
};

Promise.prototype.timeout = function (ms, error) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
        }
        deferred.reject(error);
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            Q.nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            Q.nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

Q.noConflict = function() {
    throw new Error("Q.noConflict only works when Q is used as a global");
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});
});

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

function AuthApiError(err, xhr) {
  this.name = 'AuthApiError';
  this.message = err.errorSummary;
  this.errorSummary = err.errorSummary;
  this.errorCode = err.errorCode;
  this.errorLink = err.errorLink;
  this.errorId = err.errorId;
  this.errorCauses = err.errorCauses;

  if (xhr) {
    this.xhr = xhr;
  }
}
AuthApiError.prototype = new Error();

var AuthApiError_1 = AuthApiError;

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */

/* eslint-disable complexity */





function httpRequest(sdk, options) {
  options = options || {};
  var url = options.url,
      method = options.method,
      args = options.args,
      saveAuthnState = options.saveAuthnState,
      accessToken = options.accessToken,
      withCredentials = options.withCredentials !== false, // default value is true
      storageUtil = sdk.options.storageUtil,
      storage = storageUtil.storage,
      httpCache = storageUtil.getHttpCache();

  if (options.cacheResponse) {
    var cacheContents = httpCache.getStorage();
    var cachedResponse = cacheContents[url];
    if (cachedResponse && Date.now()/1000 < cachedResponse.expiresAt) {
      return q.resolve(cachedResponse.response);
    }
  }

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Okta-User-Agent-Extended': sdk.userAgent
  };
  util_1.extend(headers, sdk.options.headers, options.headers);

  if (accessToken && util_1.isString(accessToken)) {
    headers['Authorization'] = 'Bearer ' + accessToken;
  }

  var ajaxOptions = {
    headers: headers,
    data: args || undefined,
    withCredentials: withCredentials
  };

  var err, res;
  return new q(sdk.options.httpRequestClient(method, url, ajaxOptions))
    .then(function(resp) {
      res = resp.responseText;
      if (res && util_1.isString(res)) {
        res = JSON.parse(res);
      }

      if (saveAuthnState) {
        if (!res.stateToken) {
          storage.delete(config$1.STATE_TOKEN_KEY_NAME);
        }
      }

      if (res && res.stateToken && res.expiresAt) {
        storage.set(config$1.STATE_TOKEN_KEY_NAME, res.stateToken, res.expiresAt);
      }

      if (res && options.cacheResponse) {
        httpCache.updateStorage(url, {
          expiresAt: Math.floor(Date.now()/1000) + config$1.DEFAULT_CACHE_DURATION,
          response: res
        });
      }

      return res;
    })
    .fail(function(resp) {
      var serverErr = resp.responseText || {};
      if (util_1.isString(serverErr)) {
        try {
          serverErr = JSON.parse(serverErr);
        } catch (e) {
          serverErr = {
            errorSummary: 'Unknown error'
          };
        }
      }

      if (resp.status >= 500) {
        serverErr.errorSummary = 'Unknown error';
      }

      if (sdk.options.transformErrorXHR) {
        resp = sdk.options.transformErrorXHR(util_1.clone(resp));
      }

      err = new AuthApiError_1(serverErr, resp);

      if (err.errorCode === 'E0000011') {
        storage.delete(config$1.STATE_TOKEN_KEY_NAME);
      }

      throw err;
    });
}

function get(sdk, url, options) {
  url = util_1.isAbsoluteUrl(url) ? url : sdk.options.url + url;
  var getOptions = {
    url: url,
    method: 'GET'
  };
  util_1.extend(getOptions, options);
  return httpRequest(sdk, getOptions);
}

function post(sdk, url, args, options) {
  url = util_1.isAbsoluteUrl(url) ? url : sdk.options.url + url;
  var postOptions = {
    url: url,
    method: 'POST',
    args: args,
    saveAuthnState: true
  };
  util_1.extend(postOptions, options);
  return httpRequest(sdk, postOptions);
}

var http = {
  get: get,
  post: post,
  httpRequest: httpRequest
};

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

function AuthPollStopError() {
  this.name = 'AuthPollStopError';
  this.message = 'The poll was stopped by the sdk';
}
AuthPollStopError.prototype = new Error();

var AuthPollStopError_1 = AuthPollStopError;

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */

/* eslint-disable complexity, max-statements */







function addStateToken(res, options) {
  var builtArgs = {};
  util_1.extend(builtArgs, options);

  // Add the stateToken if one isn't passed and we have one
  if (!builtArgs.stateToken && res.stateToken) {
    builtArgs.stateToken = res.stateToken;
  }

  return builtArgs;
}

function getStateToken(res) {
  return addStateToken(res);
}

function transactionStatus(sdk, args) {
  args = addStateToken(sdk, args);
  return http.post(sdk, sdk.options.url + '/api/v1/authn', args);
}

function resumeTransaction(sdk, args) {
  if (!args || !args.stateToken) {
    var stateToken = sdk.tx.exists._get(config$1.STATE_TOKEN_KEY_NAME);
    if (stateToken) {
      args = {
        stateToken: stateToken
      };
    } else {
      return q.reject(new AuthSdkError_1('No transaction to resume'));
    }
  }
  return sdk.tx.status(args)
    .then(function(res) {
      return new AuthTransaction(sdk, res);
    });
}

function introspect (sdk, args) {
  if (!args || !args.stateToken) {
    var stateToken = sdk.tx.exists._get(config$1.STATE_TOKEN_KEY_NAME);
    if (stateToken) {
      args = {
        stateToken: stateToken
      };
    } else {
      return q.reject(new AuthSdkError_1('No transaction to evaluate'));
    }
  }
  return transactionStep(sdk, args)
    .then(function (res) {
      return new AuthTransaction(sdk, res);
    });
}

function transactionStep(sdk, args) {
  args = addStateToken(sdk, args);
  return http.post(sdk, sdk.options.url + '/idp/idx/introspect', args);
}

function transactionExists(sdk) {
  // We have a cookie state token
  return !!sdk.tx.exists._get(config$1.STATE_TOKEN_KEY_NAME);
}

function postToTransaction(sdk, url, args, options) {
  return http.post(sdk, url, args, options)
    .then(function(res) {
      return new AuthTransaction(sdk, res);
    });
}

function getPollFn(sdk, res, ref) {
  return function (options) {
    var delay;
    var rememberDevice;
    var autoPush;

    if (util_1.isNumber(options)) {
      delay = options;
    } else if (util_1.isObject(options)) {
      delay = options.delay;
      rememberDevice = options.rememberDevice;
      autoPush = options.autoPush;
    }

    if (!delay && delay !== 0) {
      delay = config$1.DEFAULT_POLLING_DELAY;
    }

    // Get the poll function
    var pollLink = util_1.getLink(res, 'next', 'poll');
    function pollFn() {
      var opts = {};
      if (typeof autoPush === 'function') {
        try {
          opts.autoPush = !!autoPush();
        }
        catch (e) {
          return q.reject(new AuthSdkError_1('AutoPush resulted in an error.'));
        }
      }
      else if (autoPush !== undefined && autoPush !== null) {
        opts.autoPush = !!autoPush;
      }
      if (typeof rememberDevice === 'function') {
        try {
          opts.rememberDevice = !!rememberDevice();
        }
        catch (e) {
          return q.reject(new AuthSdkError_1('RememberDevice resulted in an error.'));
        }
      }
      else if (rememberDevice !== undefined && rememberDevice !== null) {
        opts.rememberDevice = !!rememberDevice;
      }

      var href = pollLink.href + util_1.toQueryParams(opts);
      return http.post(sdk, href, getStateToken(res), {
        saveAuthnState: false  
      });
    }

    ref.isPolling = true;

    var retryCount = 0;
    var recursivePoll = function () {
      // If the poll was manually stopped during the delay
      if (!ref.isPolling) {
        return q.reject(new AuthPollStopError_1());
      }
      return pollFn()
        .then(function (pollRes) {
          // Reset our retry counter on success
          retryCount = 0;

          // If we're still waiting
          if (pollRes.factorResult && pollRes.factorResult === 'WAITING') {

            // If the poll was manually stopped while the pollFn was called
            if (!ref.isPolling) {
              throw new AuthPollStopError_1();
            }

            // Continue poll
            return q.delay(delay)
              .then(recursivePoll);

          } else {
            // Any non-waiting result, even if polling was stopped
            // during a request, will return
            ref.isPolling = false;
            return new AuthTransaction(sdk, pollRes);
          }
        })
        .fail(function(err) {
          // Exponential backoff, up to 16 seconds
          if (err.xhr &&
              (err.xhr.status === 0 || err.xhr.status === 429) &&
              retryCount <= 4) {
            var delayLength = Math.pow(2, retryCount) * 1000;
            retryCount++;
            return q.delay(delayLength)
              .then(recursivePoll);
          }
          throw err;
        });
    };
    return recursivePoll()
      .fail(function(err) {
        ref.isPolling = false;
        throw err;
      });
  };
}

function link2fn(sdk, res, obj, link, ref) {
  if (Array.isArray(link)) {
    return function(name, opts) {
      if (!name) {
        throw new AuthSdkError_1('Must provide a link name');
      }

      var lk = util_1.find(link, {name: name});
      if (!lk) {
        throw new AuthSdkError_1('No link found for that name');
      }

      return link2fn(sdk, res, obj, lk, ref)(opts);
    };

  } else if (link.hints &&
      link.hints.allow &&
      link.hints.allow.length === 1) {
    var method = link.hints.allow[0];
    switch (method) {

      case 'GET':
        return function() {
          return http.get(sdk, link.href);
        };

      case 'POST':
        return function(opts) {
          if (ref && ref.isPolling) {
            ref.isPolling = false;
          }

          var data = addStateToken(res, opts);

          if (res.status === 'MFA_ENROLL' || res.status === 'FACTOR_ENROLL') {
            // Add factorType and provider
            util_1.extend(data, {
              factorType: obj.factorType,
              provider: obj.provider
            });
          }

          var params = {};
          var autoPush = data.autoPush;
          if (autoPush !== undefined) {
            if (typeof autoPush === 'function') {
              try {
                params.autoPush = !!autoPush();
              }
              catch (e) {
                return q.reject(new AuthSdkError_1('AutoPush resulted in an error.'));
              }
            }
            else if (autoPush !== null) {
              params.autoPush = !!autoPush;
            }
            data = util_1.omit(data, 'autoPush');
          }

          var rememberDevice = data.rememberDevice;
          if (rememberDevice !== undefined) {
            if (typeof rememberDevice === 'function') {
              try {
                params.rememberDevice = !!rememberDevice();
              }
              catch (e) {
                return q.reject(new AuthSdkError_1('RememberDevice resulted in an error.'));
              }
            }
            else if (rememberDevice !== null) {
              params.rememberDevice = !!rememberDevice;
            }
            data = util_1.omit(data, 'rememberDevice');

          } else if (data.profile &&
                    data.profile.updatePhone !== undefined) {
            if (data.profile.updatePhone) {
              params.updatePhone = true;
            }
            data.profile = util_1.omit(data.profile, 'updatePhone');
          }
          var href = link.href + util_1.toQueryParams(params);
          return postToTransaction(sdk, href, data);
        };
    }
  }
}

function links2fns(sdk, res, obj, ref) {
  var fns = {};
  for (var linkName in obj._links) {
    if (!obj._links.hasOwnProperty(linkName)) {
      continue;
    }

    var link = obj._links[linkName];
    
    if (linkName === 'next') {
      linkName = link.name;
    }

    if (link.type) {
      fns[linkName] = link;
      continue;
    }

    switch (linkName) {
      // poll is only found at the transaction
      // level, so we don't need to pass the link
      case 'poll':
        fns.poll = getPollFn(sdk, res, ref);
        break;

      default:
        var fn = link2fn(sdk, res, obj, link, ref);
        if (fn) {
          fns[linkName] = fn;
        }
    }
  }
  return fns;
}

function flattenEmbedded(sdk, res, obj, ref) {
  obj = obj || res;
  obj = util_1.clone(obj);

  if (Array.isArray(obj)) {
    var objArr = [];
    for (var o = 0, ol = obj.length; o < ol; o++) {
      objArr.push(flattenEmbedded(sdk, res, obj[o], ref));
    }
    return objArr;
  }

  var embedded = obj._embedded || {};

  for (var key in embedded) {
    if (!embedded.hasOwnProperty(key)) {
      continue;
    }

    // Flatten any nested _embedded objects
    if (util_1.isObject(embedded[key]) || Array.isArray(embedded[key])) {
      embedded[key] = flattenEmbedded(sdk, res, embedded[key], ref);
    }
  }

  // Convert any links on the embedded object
  var fns = links2fns(sdk, res, obj, ref);
  util_1.extend(embedded, fns);

  obj = util_1.omit(obj, '_embedded', '_links');
  util_1.extend(obj, embedded);
  return obj;
}

function AuthTransaction(sdk, res) {
  if (res) {
    this.data = res;
    util_1.extend(this, flattenEmbedded(sdk, res, res, {}));
    delete this.stateToken;

    // RECOVERY_CHALLENGE has some responses without _links.
    // Without _links, we emulate cancel to make it intuitive
    // to return to the starting state. We may remove this
    // when OKTA-75434 is resolved
    if (res.status === 'RECOVERY_CHALLENGE' && !res._links) {
      this.cancel = function() {
        return new q(new AuthTransaction(sdk));
      };
    }
  }
}

var tx = {
  transactionStatus: transactionStatus,
  resumeTransaction: resumeTransaction,
  transactionExists: transactionExists,
  postToTransaction: postToTransaction,
  introspect: introspect,
};

/*!
 * Copyright (c) 2018-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */





function getValidUrl(args) {
  if (!args) {
    throw new AuthSdkError_1('No arguments passed to constructor. ' +
      'Required usage: new OktaAuth(args)');
  }

  var url = args.url;
  if (!url) {
    var isUrlRegex = new RegExp('^http?s?://.+');
    if (args.issuer && isUrlRegex.test(args.issuer)) {
      // Infer the URL from the issuer URL, omitting the /oauth2/{authServerId}
      url = args.issuer.split('/oauth2/')[0];
    } else {
      throw new AuthSdkError_1('No url passed to constructor. ' +
      'Required usage: new OktaAuth({url: "https://{yourOktaDomain}.com"})');
    }
  }

  if (url.indexOf('-admin.') !== -1) {
    throw new AuthSdkError_1('URL passed to constructor contains "-admin" in subdomain. ' +
      'Required usage: new OktaAuth({url: "https://{yourOktaDomain}.com})');
  }

  return url;
}

function addSharedPrototypes(proto) {
  // { username, (relayState) }
  proto.forgotPassword = function (opts) {
    return tx.postToTransaction(this, '/api/v1/authn/recovery/password', opts);
  };

  // { username, (relayState) }
  proto.unlockAccount = function (opts) {
    return tx.postToTransaction(this, '/api/v1/authn/recovery/unlock', opts);
  };

  // { recoveryToken }
  proto.verifyRecoveryToken = function (opts) {
    return tx.postToTransaction(this, '/api/v1/authn/recovery/token', opts);
  };
}

function buildOktaAuth(OktaAuthBuilder) {
  return function(storageUtil, httpRequestClient) {
    function OktaAuth(args) {
      if (!(this instanceof OktaAuth)) {
        return new OktaAuth(args);
      }

      if (args) {
        args.storageUtil = storageUtil;

        if (args.ajaxRequest) {
          util_1.deprecate('ajaxRequest is being deprecated, use httpRequestClient attribute instead.');
          args.httpRequestClient = args.ajaxRequest;
        } else if (!args.httpRequestClient) {
          args.httpRequestClient = httpRequestClient;
        }
      }

      util_1.bind(OktaAuthBuilder, this)(args);
    }
    OktaAuth.prototype = OktaAuthBuilder.prototype;
    OktaAuth.prototype.constructor = OktaAuth;

    // Hoist feature detection functions to static type
    OktaAuth.features = OktaAuthBuilder.prototype.features;

    return OktaAuth;
  };
}

var builderUtil = {
  addSharedPrototypes: addSharedPrototypes,
  buildOktaAuth: buildOktaAuth,
  getValidUrl: getValidUrl
};

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */

/* eslint-disable complexity, max-statements */





var httpCache = browserStorage.getHttpCache();

function generateState() {
  return util_1.genRandomString(64);
}

function generateNonce() {
  return util_1.genRandomString(64);
}

function isToken(obj) {
  if (obj &&
      (obj.accessToken || obj.idToken) &&
      Array.isArray(obj.scopes)) {
    return true;
  }
  return false;
}

function addListener(eventTarget, name, fn) {
  if (eventTarget.addEventListener) {
    eventTarget.addEventListener(name, fn);
  } else {
    eventTarget.attachEvent('on' + name, fn);
  }
}

function removeListener(eventTarget, name, fn) {
  if (eventTarget.removeEventListener) {
    eventTarget.removeEventListener(name, fn);
  } else {
    eventTarget.detachEvent('on' + name, fn);
  }
}

function loadFrame(src) {
  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = src;

  return document.body.appendChild(iframe);
}

function loadPopup(src, options) {
  var title = options.popupTitle || 'External Identity Provider User Authentication';
  var appearance = 'toolbar=no, scrollbars=yes, resizable=yes, ' +
    'top=100, left=500, width=600, height=600';

  if (util_1.isIE11OrLess()) {
    // IE<=11 doesn't fully support postMessage at time of writting.
    // the following simple solution happened to solve the issue
    // without adding another proxy layer which makes flow more complecated.
    var winEl = window.open('/', title, appearance);
    winEl.location.href = src;
    return winEl;
  } else {
    return window.open(src, title, appearance);
  }
}

function getWellKnown(sdk, issuer) {
  return http.get(sdk, (issuer || sdk.options.url) + '/.well-known/openid-configuration', {
    cacheResponse: true
  });
}

function getKey(sdk, issuer, kid) {
  return getWellKnown(sdk, issuer)
  .then(function(wellKnown) {
    var jwksUri = wellKnown['jwks_uri'];

    // Check our kid against the cached version (if it exists and isn't expired)
    var cacheContents = httpCache.getStorage();
    var cachedResponse = cacheContents[jwksUri];
    if (cachedResponse && Date.now()/1000 < cachedResponse.expiresAt) {
      var cachedKey = util_1.find(cachedResponse.response.keys, {
        kid: kid
      });

      if (cachedKey) {
        return cachedKey;
      }
    }

    // Remove cache for the key
    httpCache.clearStorage(jwksUri);

    // Pull the latest keys if the key wasn't in the cache
    return http.get(sdk, jwksUri, {
      cacheResponse: true
    })
    .then(function(res) {
      var key = util_1.find(res.keys, {
        kid: kid
      });

      if (key) {
        return key;
      }

      throw new AuthSdkError_1('The key id, ' + kid + ', was not found in the server\'s keys');
    });
  });
}

function validateClaims(sdk, claims, validationParams) {
  var aud = validationParams.clientId;
  var iss = validationParams.issuer;
  var nonce = validationParams.nonce;

  if (!claims || !iss || !aud) {
    throw new AuthSdkError_1('The jwt, iss, and aud arguments are all required');
  }

  if (nonce && claims.nonce !== nonce) {
    throw new AuthSdkError_1('OAuth flow response nonce doesn\'t match request nonce');
  }

  var now = Math.floor(Date.now()/1000);

  if (claims.iss !== iss) {
    throw new AuthSdkError_1('The issuer [' + claims.iss + '] ' +
      'does not match [' + iss + ']');
  }

  if (claims.aud !== aud) {
    throw new AuthSdkError_1('The audience [' + claims.aud + '] ' +
      'does not match [' + aud + ']');
  }

  if (claims.iat > claims.exp) {
    throw new AuthSdkError_1('The JWT expired before it was issued');
  }

  if ((now - sdk.options.maxClockSkew) > claims.exp) {
    throw new AuthSdkError_1('The JWT expired and is no longer valid');
  }

  if (claims.iat > (now + sdk.options.maxClockSkew)) {
    throw new AuthSdkError_1('The JWT was issued in the future');
  }
}

function getOAuthUrls(sdk, oauthParams, options) {
  options = options || {};

  // Get user-supplied arguments
  var authorizeUrl = util_1.removeTrailingSlash(options.authorizeUrl) || sdk.options.authorizeUrl;
  var issuer = util_1.removeTrailingSlash(options.issuer) || sdk.options.issuer;
  var userinfoUrl = util_1.removeTrailingSlash(options.userinfoUrl) || sdk.options.userinfoUrl;
  var tokenUrl = util_1.removeTrailingSlash(options.tokenUrl) || sdk.options.tokenUrl;

  // If an issuer exists but it's not a url, assume it's an authServerId
  if (issuer && !(/^https?:/.test(issuer))) {
    // Make it a url
    issuer = sdk.options.url + '/oauth2/' + issuer;
  }

  // If an authorizeUrl is supplied without an issuer, and an id_token is requested
  if (!issuer && authorizeUrl &&
      oauthParams.responseType.indexOf('id_token') !== -1) {
    // The issuer is ambiguous, so we won't be able to validate the id_token jwt
    throw new AuthSdkError_1('Cannot request idToken with an authorizeUrl without an issuer');
  }

  // If a token is requested without an issuer
  if (!issuer && oauthParams.responseType.indexOf('token') !== -1) {
    // If an authorizeUrl is supplied without a userinfoUrl
    if (authorizeUrl && !userinfoUrl) {
      // The userinfoUrl is ambiguous, so we won't be able to call getUserInfo
      throw new AuthSdkError_1('Cannot request accessToken with an authorizeUrl without an issuer or userinfoUrl');
    }

    // If a userinfoUrl is supplied without a authorizeUrl
    if (userinfoUrl && !authorizeUrl) {
      // The authorizeUrl is ambiguous, so we won't be able to call the authorize endpoint
      throw new AuthSdkError_1('Cannot request token with an userinfoUrl without an issuer or authorizeUrl');
    }
  }

  var sharedResourceServerRegex = new RegExp('^https?://.*?/oauth2/.+');

  // Default the issuer to our baseUrl
  issuer = issuer || sdk.options.url;

  // A shared resource server issuer looks like:
  // https://example.okta.com/oauth2/aus8aus76q8iphupD0h7
  if (sharedResourceServerRegex.test(issuer)) {
    // A shared resource server authorizeUrl looks like:
    // https://example.okta.com/oauth2/aus8aus76q8iphupD0h7/v1/authorize
    authorizeUrl = authorizeUrl || issuer + '/v1/authorize';
    // Shared resource server userinfoUrls look like:
    // https://example.okta.com/oauth2/aus8aus76q8iphupD0h7/v1/userinfo
    userinfoUrl = userinfoUrl || issuer + '/v1/userinfo';
    // Shared resource server tokenUrls look like:
    // https://example.okta.com/oauth2/aus8aus76q8iphupD0h7/v1/token
    tokenUrl = tokenUrl || issuer + '/v1/token';
  // Normally looks like:
  // https://example.okta.com
  } else {
    // Normal authorizeUrls look like:
    // https://example.okta.com/oauth2/v1/authorize
    authorizeUrl = authorizeUrl || issuer + '/oauth2/v1/authorize';
    // Normal userinfoUrls look like:
    // https://example.okta.com/oauth2/v1/userinfo
    userinfoUrl = userinfoUrl || issuer + '/oauth2/v1/userinfo';
    // Normal tokenUrls look like:
    // https://example.okta.com/oauth2/v1/token
    tokenUrl = tokenUrl || issuer + '/oauth2/v1/token';
  }

  return {
    issuer: issuer,
    authorizeUrl: authorizeUrl,
    userinfoUrl: userinfoUrl,
    tokenUrl: tokenUrl
  };
}

function hashToObject(hash) {
  // Predefine regexs for parsing hash
  var plus2space = /\+/g;
  var paramSplit = /([^&=]+)=?([^&]*)/g;

  // Remove the leading hash
  var fragment = hash.substring(1);

  var obj = {};

  // Loop until we have no more params
  var param;
  while (true) { // eslint-disable-line no-constant-condition
    param = paramSplit.exec(fragment);
    if (!param) { break; }

    var key = param[1];
    var value = param[2];

    // id_token should remain base64url encoded
    if (key === 'id_token' || key === 'access_token' || key === 'code') {
      obj[key] = value;
    } else {
      obj[key] = decodeURIComponent(value.replace(plus2space, ' '));
    }
  }
  return obj;
}

var oauthUtil = {
  generateState: generateState,
  generateNonce: generateNonce,
  getWellKnown: getWellKnown,
  getKey: getKey,
  validateClaims: validateClaims,
  getOAuthUrls: getOAuthUrls,
  loadFrame: loadFrame,
  loadPopup: loadPopup,
  hashToObject: hashToObject,
  isToken: isToken,
  addListener: addListener,
  removeListener: removeListener
};

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */




function sessionExists(sdk) {
  return sdk.session.get()
    .then(function(res) {
      if (res.status === 'ACTIVE') {
        return true;
      }
      return false;
    })
    .fail(function() {
      return false;
    });
}

function getSession(sdk) { 
  return http.get(sdk, '/api/v1/sessions/me')
  .then(function(session) {
    var res = util_1.omit(session, '_links');

    res.refresh = function() {
      return http.post(sdk, util_1.getLink(session, 'refresh').href);
    };

    res.user = function() {
      return http.get(sdk, util_1.getLink(session, 'user').href);
    };

    return res;
  })
  .fail(function() {
    // Return INACTIVE status on failure
    return {status: 'INACTIVE'};
  });
}

function closeSession(sdk) {
  return http.httpRequest(sdk, {
    url: sdk.options.url + '/api/v1/sessions/me',
    method: 'DELETE'
  });
}

function refreshSession(sdk) {
  return http.post(sdk, '/api/v1/sessions/me/lifecycle/refresh');
}

function setCookieAndRedirect(sdk, sessionToken, redirectUrl) {
  redirectUrl = redirectUrl || window.location.href;
  window.location = sdk.options.url + '/login/sessionCookieRedirect' +
    util_1.toQueryParams({
      checkAccountSetupComplete: true,
      token: sessionToken,
      redirectUrl: redirectUrl
    });
}

var session = {
  sessionExists: sessionExists,
  getSession: getSession,
  closeSession: closeSession,
  refreshSession: refreshSession,
  setCookieAndRedirect: setCookieAndRedirect
};

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */



function verifyToken(idToken, key) {
  key = util_1.clone(key);

  var format = 'jwk';
  var algo = {
    name: 'RSASSA-PKCS1-v1_5',
    hash: { name: 'SHA-256' }
  };
  var extractable = true;
  var usages = ['verify'];

  // https://connect.microsoft.com/IE/feedback/details/2242108/webcryptoapi-importing-jwk-with-use-field-fails
  // This is a metadata tag that specifies the intent of how the key should be used.
  // It's not necessary to properly verify the jwt's signature.
  delete key.use;

  return crypto.subtle.importKey(
    format,
    key,
    algo,
    extractable,
    usages
  )
  .then(function(cryptoKey) {
    var jwt = idToken.split('.');
    var payload = util_1.stringToBuffer(jwt[0] + '.' + jwt[1]);
    var b64Signature = util_1.base64UrlDecode(jwt[2]);
    var signature = util_1.stringToBuffer(b64Signature);

    return crypto.subtle.verify(
      algo,
      cryptoKey,
      signature,
      payload
    );
  });
}

var crypto_1$1 = {
  verifyToken: verifyToken
};

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

function OAuthError(errorCode, summary) {
  this.name = 'OAuthError';
  this.message = summary;

  this.errorCode = errorCode;
  this.errorSummary = summary;
}
OAuthError.prototype = new Error();

var OAuthError_1 = OAuthError;

/*!
 * Copyright (c) 2019-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */

 /* eslint-disable complexity, max-statements */




// Code verifier: Random URL-safe string with a minimum length of 43 characters.
// Code challenge: Base64 URL-encoded SHA-256 hash of the code verifier.
var MIN_VERIFIER_LENGTH = 43;
var MAX_VERIFIER_LENGTH = 128;
var DEFAULT_CODE_CHALLENGE_METHOD = 'S256';

function dec2hex (dec) {
  return ('0' + dec.toString(16)).substr(-2);
}

function getRandomString(length) {
  var a = new Uint8Array(Math.ceil(length / 2));
  crypto.getRandomValues(a);
  var str = Array.from(a, dec2hex).join('');
  return str.slice(0, length);
}

function generateVerifier(prefix) {
  var verifier = prefix || '';
  if (verifier.length < MIN_VERIFIER_LENGTH) {
    verifier = verifier + getRandomString(MIN_VERIFIER_LENGTH - verifier.length);
  }
  return encodeURIComponent(verifier).slice(0, MAX_VERIFIER_LENGTH);
}

function saveMeta(sdk, meta) {
  var storage = sdk.options.storageUtil.getPKCEStorage();
  storage.setStorage(meta);
}

function loadMeta(sdk) {
  var storage = sdk.options.storageUtil.getPKCEStorage();
  var obj = storage.getStorage();
  return obj;
}

function clearMeta(sdk) {
  var storage = sdk.options.storageUtil.getPKCEStorage();
  storage.clearStorage();
}

/* global Uint8Array, TextEncoder */
function computeChallenge(str) {  
  var buffer = new TextEncoder().encode(str);
  return crypto.subtle.digest('SHA-256', buffer).then(function(arrayBuffer) {
    var hash = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
    var b64u = util_1.stringToBase64Url(hash); // url-safe base64 variant
    return b64u;
  });
}


function validateOptions(oauthOptions) {
  // Quick validation
  if (!oauthOptions.clientId) {
    throw new AuthSdkError_1('A clientId must be specified in the OktaAuth constructor to get a token');
  }

  if (!oauthOptions.redirectUri) {
    throw new AuthSdkError_1('The redirectUri passed to /authorize must also be passed to /token');
  }

  if (!oauthOptions.authorizationCode) {
    throw new AuthSdkError_1('An authorization code (returned from /authorize) must be passed to /token');
  }

  if (!oauthOptions.codeVerifier) {
    throw new AuthSdkError_1('The "codeVerifier" (generated and saved by your app) must be passed to /token');
  }
}

function getPostData(options) {
  // Convert options to OAuth params
  var params = util_1.removeNils({
    'client_id': options.clientId,
    'redirect_uri': options.redirectUri,
    'grant_type': 'authorization_code',
    'code': options.authorizationCode,
    'code_verifier': options.codeVerifier
  });
  // Encode as URL string
  return util_1.toQueryParams(params).slice(1);
}

// exchange authorization code for an access token
function getToken(sdk, oauthOptions, urls) {
  validateOptions(oauthOptions);
  var data = getPostData(oauthOptions);

  return http.httpRequest(sdk, {
    url: urls.tokenUrl,
    method: 'POST',
    args: data,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

var pkce = {
  DEFAULT_CODE_CHALLENGE_METHOD: DEFAULT_CODE_CHALLENGE_METHOD,
  generateVerifier: generateVerifier,
  clearMeta: clearMeta,
  saveMeta: saveMeta,
  loadMeta: loadMeta,
  computeChallenge: computeChallenge,
  getToken: getToken
};

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */

/* eslint-disable complexity, max-statements */








var cookies$1       = browserStorage.storage;


function decodeToken(token) {
  var jwt = token.split('.');
  var decodedToken;

  try {
    decodedToken = {
      header: JSON.parse(util_1.base64UrlToString(jwt[0])),
      payload: JSON.parse(util_1.base64UrlToString(jwt[1])),
      signature: jwt[2]
    };
  } catch(e) {
    throw new AuthSdkError_1('Malformed token');
  }

  return decodedToken;
}

function verifyToken$1(sdk, token, validationParams) {
  return new q()
  .then(function() {
    if (!token || !token.idToken) {
      throw new AuthSdkError_1('Only idTokens may be verified');
    }

    var jwt = decodeToken(token.idToken);

    var validationOptions = {
      clientId: sdk.options.clientId,
      issuer: sdk.options.issuer || sdk.options.url,
      ignoreSignature: sdk.options.ignoreSignature
    };

    util_1.extend(validationOptions, validationParams);

    // Standard claim validation
    oauthUtil.validateClaims(sdk, jwt.payload, validationOptions);

    // If the browser doesn't support native crypto or we choose not
    // to verify the signature, bail early
    if (validationOptions.ignoreSignature == true || !sdk.features.isTokenVerifySupported()) {
      return token;
    }

    return oauthUtil.getKey(sdk, token.issuer, jwt.header.kid)
    .then(function(key) {
      return crypto_1$1.verifyToken(token.idToken, key);
    })
    .then(function(valid) {
      if (!valid) {
        throw new AuthSdkError_1('The token signature is not valid');
      }
      return token;
    });
  });
}

function addPostMessageListener(sdk, timeout, state) {
  var deferred = q.defer();

  function responseHandler(e) {
    if (!e.data ||
        e.origin !== sdk.options.url ||
        (e.data && util_1.isString(state) && e.data.state !== state)) {
      return;
    }
    deferred.resolve(e.data);
  }

  oauthUtil.addListener(window, 'message', responseHandler);

  return deferred.promise.timeout(timeout || 120000, new AuthSdkError_1('OAuth flow timed out'))
    .fin(function() {
      oauthUtil.removeListener(window, 'message', responseHandler);
    });
}

function addFragmentListener(sdk, windowEl, timeout) {
  var deferred = q.defer();

  function hashChangeHandler() {
    /*
      We are only able to access window.location.hash on a window
      that has the same domain. A try/catch is necessary because
      there's no other way to determine that the popup is in
      another domain. When we try to access a window on another
      domain, an error is thrown.
    */
    try {
      if (windowEl &&
          windowEl.location &&
          windowEl.location.hash) {
        deferred.resolve(oauthUtil.hashToObject(windowEl.location.hash));
      } else if (windowEl && !windowEl.closed) {
        setTimeout(hashChangeHandler, 500);
      }
    } catch (err) {
      setTimeout(hashChangeHandler, 500);
    }
  }

  hashChangeHandler();

  return deferred.promise.timeout(timeout || 120000, new AuthSdkError_1('OAuth flow timed out'));
}

function exchangeCodeForToken(sdk, oauthParams, authorizationCode, urls) {
  // PKCE authorization_code flow
  // Retrieve saved values and build oauthParams for call to /token
  var meta = pkce.loadMeta(sdk);
  var getTokenParams = {
    clientId: oauthParams.clientId,
    authorizationCode: authorizationCode,
    codeVerifier: meta.codeVerifier,
    redirectUri: meta.redirectUri
  };
  return pkce.getToken(sdk, getTokenParams, urls)
  .then(function(res) {
    validateResponse(res, getTokenParams);
    return res;
  })
  .fin(function() {
    pkce.clearMeta(sdk);
  });
}

function validateResponse(res, oauthParams) {
  if (res['error'] || res['error_description']) {
    throw new OAuthError_1(res['error'], res['error_description']);
  }

  if (res.state !== oauthParams.state) {
    throw new AuthSdkError_1('OAuth flow response state doesn\'t match request state');
  }
}

function handleOAuthResponse(sdk, oauthParams, res, urls) {
  urls = urls || {};

  var responseType = oauthParams.responseType;
  var scopes = util_1.clone(oauthParams.scopes);
  var clientId = oauthParams.clientId || sdk.options.clientId;

  return new q()
  .then(function() {
    validateResponse(res, oauthParams);

    // We do not support "hybrid" scenarios where the response includes both a code and a token.
    // If the response contains a code it is used immediately to obtain new tokens.
    if (res['code']) {
      responseType = ['token', 'id_token']; // what we expect the code to provide us
      return exchangeCodeForToken(sdk, oauthParams, res['code'], urls);
    }
    return res;
  }).then(function(res) {
    var tokenDict = {};

    if (res['access_token']) {
      tokenDict['token'] = {
        accessToken: res['access_token'],
        expiresAt: Number(res['expires_in']) + Math.floor(Date.now()/1000),
        tokenType: res['token_type'],
        scopes: scopes,
        authorizeUrl: urls.authorizeUrl,
        userinfoUrl: urls.userinfoUrl
      };
    }

    if (res['id_token']) {
      var jwt = sdk.token.decode(res['id_token']);

      var idToken = {
        idToken: res['id_token'],
        claims: jwt.payload,
        expiresAt: jwt.payload.exp,
        scopes: scopes,
        authorizeUrl: urls.authorizeUrl,
        issuer: urls.issuer,
        clientId: clientId
      };

      var validationParams = {
        clientId: clientId,
        issuer: urls.issuer,
        nonce: oauthParams.nonce
      };

      if (oauthParams.ignoreSignature !== undefined) {
        validationParams.ignoreSignature = oauthParams.ignoreSignature;
      }

      return verifyToken$1(sdk, idToken, validationParams)
      .then(function() {
        tokenDict['id_token'] = idToken;
        return tokenDict;
      });
    }

    return tokenDict;
  })
  .then(function(tokenDict) {
    if (!Array.isArray(responseType)) {
      return tokenDict[responseType];
    }

    // Validate response against tokenTypes
    var validateTokenTypes =  ['token', 'id_token'];
    validateTokenTypes.filter(function(key) {
      return (responseType.indexOf(key) !== -1);
    }).forEach(function(key) {
      if (!tokenDict[key]) {
        throw new AuthSdkError_1('Unable to parse OAuth flow response: ' + key + ' was not returned.');
      }     
    });

    // Create token array in the order of the responseType array
    return responseType.map(function(item) {
      return tokenDict[item];
    });
  });
}

function getDefaultOAuthParams(sdk) {
  return {
    pkce: sdk.options.pkce || false,
    clientId: sdk.options.clientId,
    redirectUri: sdk.options.redirectUri || window.location.href,
    responseType: 'id_token',
    responseMode: 'okta_post_message',
    state: oauthUtil.generateState(),
    nonce: oauthUtil.generateNonce(),
    scopes: ['openid', 'email'],
    ignoreSignature: sdk.options.ignoreSignature
  };
}

function convertOAuthParamsToQueryParams(oauthParams) {
  // Quick validation
  if (!oauthParams.clientId) {
    throw new AuthSdkError_1('A clientId must be specified in the OktaAuth constructor to get a token');
  }

  if (util_1.isString(oauthParams.responseType) && oauthParams.responseType.indexOf(' ') !== -1) {
    throw new AuthSdkError_1('Multiple OAuth responseTypes must be defined as an array');
  }

  // Convert our params to their actual OAuth equivalents
  var oauthQueryParams = util_1.removeNils({
    'client_id': oauthParams.clientId,
    'code_challenge': oauthParams.codeChallenge,
    'code_challenge_method': oauthParams.codeChallengeMethod,
    'display': oauthParams.display,
    'idp': oauthParams.idp,
    'idp_scope': oauthParams.idpScope,
    'login_hint': oauthParams.loginHint,
    'max_age': oauthParams.maxAge,
    'nonce': oauthParams.nonce,
    'prompt': oauthParams.prompt,
    'redirect_uri': oauthParams.redirectUri,
    'response_mode': oauthParams.responseMode,
    'response_type': oauthParams.responseType,
    'sessionToken': oauthParams.sessionToken,
    'state': oauthParams.state,
  });

  ['idp_scope', 'response_type'].forEach( function( mayBeArray ) { 
    if (Array.isArray(oauthQueryParams[mayBeArray])) {
      oauthQueryParams[mayBeArray] = oauthQueryParams[mayBeArray].join(' ');
    }
  });

  if (oauthParams.responseType.indexOf('id_token') !== -1 &&
      oauthParams.scopes.indexOf('openid') === -1) {
    throw new AuthSdkError_1('openid scope must be specified in the scopes argument when requesting an id_token');
  } else {
    oauthQueryParams.scope = oauthParams.scopes.join(' ');
  }

  return oauthQueryParams;
}

function buildAuthorizeParams(oauthParams) {
  var oauthQueryParams = convertOAuthParamsToQueryParams(oauthParams);
  return util_1.toQueryParams(oauthQueryParams);
}

/*
 * Retrieve an idToken from an Okta or a third party idp
 *
 * Two main flows:
 *
 *  1) Exchange a sessionToken for a token
 *
 *    Required:
 *      clientId: passed via the OktaAuth constructor or into getToken
 *      sessionToken: 'yourtoken'
 *
 *    Optional:
 *      redirectUri: defaults to window.location.href
 *      scopes: defaults to ['openid', 'email']
 *
 *    Forced:
 *      prompt: 'none'
 *      responseMode: 'okta_post_message'
 *      display: undefined
 *
 *  2) Get a token from an idp
 *
 *    Required:
 *      clientId: passed via the OktaAuth constructor or into getToken
 *
 *    Optional:
 *      redirectUri: defaults to window.location.href
 *      scopes: defaults to ['openid', 'email']
 *      idp: defaults to Okta as an idp
 *      prompt: no default. Pass 'none' to throw an error if user is not signed in
 *
 *    Forced:
 *      display: 'popup'
 *
 *  Only common optional params shown. Any OAuth parameters not explicitly forced are available to override
 *
 * @param {Object} oauthOptions
 * @param {String} [oauthOptions.clientId] ID of this client
 * @param {String} [oauthOptions.redirectUri] URI that the iframe or popup will go to once authenticated
 * @param {String[]} [oauthOptions.scopes] OAuth 2.0 scopes to request (openid must be specified)
 * @param {String} [oauthOptions.idp] ID of an external IdP to use for user authentication
 * @param {String} [oauthOptions.sessionToken] Bootstrap Session Token returned by the Okta Authentication API
 * @param {String} [oauthOptions.prompt] Determines whether the Okta login will be displayed on failure.
 *                                       Use 'none' to prevent this behavior
 *
 * @param {Object} options
 * @param {Integer} [options.timeout] Time in ms before the flow is automatically terminated. Defaults to 120000
 * @param {String} [options.popupTitle] Title dispayed in the popup.
 *                                      Defaults to 'External Identity Provider User Authentication'
 */
function getToken$1(sdk, oauthOptions, options) {
  oauthOptions = oauthOptions || {};
  options = options || {};

  return prepareOauthParams(sdk, oauthOptions)
  .then(function(oauthParams) {

    // Start overriding any options that don't make sense
    var sessionTokenOverrides = {
      prompt: 'none',
      responseMode: 'okta_post_message',
      display: null
    };

    var idpOverrides = {
      display: 'popup'
    };

    if (oauthOptions.sessionToken) {
      util_1.extend(oauthParams, sessionTokenOverrides);
    } else if (oauthOptions.idp) {
      util_1.extend(oauthParams, idpOverrides);
    }

    // Use the query params to build the authorize url
    var requestUrl,
        endpoint,
        urls;
    try {
      // Get authorizeUrl and issuer
      urls = oauthUtil.getOAuthUrls(sdk, oauthParams, options);
      endpoint = oauthOptions.codeVerifier ? urls.tokenUrl : urls.authorizeUrl;
      requestUrl = endpoint + buildAuthorizeParams(oauthParams);
    } catch (e) {
      return q.reject(e);
    }

    // Determine the flow type
    var flowType;
    if (oauthParams.sessionToken || oauthParams.display === null) {
      flowType = 'IFRAME';
    } else if (oauthParams.display === 'popup') {
      flowType = 'POPUP';
    } else {
      flowType = 'IMPLICIT';
    }

    function getOrigin(url) {
      /* eslint-disable-next-line no-useless-escape */
      var originRegex = /^(https?\:\/\/)?([^:\/?#]*(?:\:[0-9]+)?)/;
      return originRegex.exec(url)[0];
    }

    // Execute the flow type
    switch (flowType) {
      case 'IFRAME':
        var iframePromise = addPostMessageListener(sdk, options.timeout, oauthParams.state);
        var iframeEl = oauthUtil.loadFrame(requestUrl);
        return iframePromise
          .then(function(res) {
            return handleOAuthResponse(sdk, oauthParams, res, urls);
          })
          .fin(function() {
            if (document.body.contains(iframeEl)) {
              iframeEl.parentElement.removeChild(iframeEl);
            }
          });

      case 'POPUP': // eslint-disable-line no-case-declarations
        var popupPromise;

        // Add listener on postMessage before window creation, so
        // postMessage isn't triggered before we're listening
        if (oauthParams.responseMode === 'okta_post_message') {
          if (!sdk.features.isPopupPostMessageSupported()) {
            return q.reject(new AuthSdkError_1('This browser doesn\'t have full postMessage support'));
          }
          popupPromise = addPostMessageListener(sdk, options.timeout, oauthParams.state);
        }

        // Create the window
        var windowOptions = {
          popupTitle: options.popupTitle
        };
        var windowEl = oauthUtil.loadPopup(requestUrl, windowOptions);

        // Poll until we get a valid hash fragment
        if (oauthParams.responseMode === 'fragment') {
          var windowOrigin = getOrigin(sdk.idToken.authorize._getLocationHref());
          var redirectUriOrigin = getOrigin(oauthParams.redirectUri);
          if (windowOrigin !== redirectUriOrigin) {
            return q.reject(new AuthSdkError_1('Using fragment, the redirectUri origin (' + redirectUriOrigin +
              ') must match the origin of this page (' + windowOrigin + ')'));
          }
          popupPromise = addFragmentListener(sdk, windowEl, options.timeout);
        }

        // Both postMessage and fragment require a poll to see if the popup closed
        var popupDeferred = q.defer();
        /* eslint-disable-next-line no-case-declarations, no-inner-declarations */
        function hasClosed(win) {
          if (win.closed) {
            popupDeferred.reject(new AuthSdkError_1('Unable to parse OAuth flow response'));
          }
        }
        var closePoller = setInterval(function() {
          hasClosed(windowEl);
        }, 500);

        // Proxy the promise results into the deferred
        popupPromise
        .then(function(res) {
          popupDeferred.resolve(res);
        })
        .fail(function(err) {
          popupDeferred.reject(err);
        });

        return popupDeferred.promise
          .then(function(res) {
            return handleOAuthResponse(sdk, oauthParams, res, urls);
          })
          .fin(function() {
            if (!windowEl.closed) {
              clearInterval(closePoller);
              windowEl.close();
            }
          });

      default:
        return q.reject(new AuthSdkError_1('The full page redirect flow is not supported'));
    }
  });
}

function getWithoutPrompt(sdk, oauthOptions, options) {
  var oauthParams = util_1.clone(oauthOptions) || {};
  util_1.extend(oauthParams, {
    prompt: 'none',
    responseMode: 'okta_post_message',
    display: null
  });
  return getToken$1(sdk, oauthParams, options);
}

function getWithPopup(sdk, oauthOptions, options) {
  var oauthParams = util_1.clone(oauthOptions) || {};
  util_1.extend(oauthParams, {
    display: 'popup',
    responseMode: 'okta_post_message'
  });
  return getToken$1(sdk, oauthParams, options);
}

function prepareOauthParams(sdk, oauthOptions) {
  // clone and prepare options
  oauthOptions = util_1.clone(oauthOptions) || {};

  // OKTA-242989: support for grantType will be removed in 3.0 
  if (oauthOptions.grantType === 'authorization_code') {
    oauthOptions.pkce = true;
  }

  // build params using defaults + options
  var oauthParams = getDefaultOAuthParams(sdk);
  util_1.extend(oauthParams, oauthOptions);

  if (oauthParams.pkce !== true) {
    return q.resolve(oauthParams);
  }

  // PKCE flow
  if (!sdk.features.isPKCESupported()) {
    return q.reject(new AuthSdkError_1('This browser doesn\'t support PKCE'));
  }

  // set default code challenge method, if none provided
  if (!oauthParams.codeChallengeMethod) {
    oauthParams.codeChallengeMethod = pkce.DEFAULT_CODE_CHALLENGE_METHOD;
  }

  // responseType is forced
  oauthParams.responseType = 'code';

  return oauthUtil.getWellKnown(sdk, null)
    .then(function(res) {
      var methods = res['code_challenge_methods_supported'] || [];
      if (methods.indexOf(oauthParams.codeChallengeMethod) === -1) {
        throw new AuthSdkError_1('Invalid code_challenge_method');
      }
    })
    .then(function() {
      // PKCE authorization_code flow
      var codeVerifier = pkce.generateVerifier(oauthParams.codeVerifier);

      // We will need these values after redirect when we call /token
      var meta = {
        codeVerifier: codeVerifier,
        redirectUri: oauthParams.redirectUri
      };
      pkce.saveMeta(sdk, meta);

      return pkce.computeChallenge(codeVerifier);
    })
    .then(function(codeChallenge) {

      // Clone/copy the params. Set codeChallenge
      var clonedParams = util_1.clone(oauthParams) || {};
      util_1.extend(clonedParams, oauthParams, {
        codeChallenge: codeChallenge,
      });
      return clonedParams;
    });
}

function getWithRedirect(sdk, oauthOptions, options) {
  oauthOptions = util_1.clone(oauthOptions) || {};

  return prepareOauthParams(sdk, oauthOptions)
    .then(function(oauthParams) {

      // Dynamically set the responseMode unless the user has provided one
      // Server-side flow requires query. Client-side apps usually prefer fragment.
      if (!oauthOptions.responseMode) {
        if (oauthParams.responseType.includes('code') && !oauthParams.pkce) {
          // server-side flows using authorization_code
          oauthParams.responseMode = 'query';
        } else {
          // general case, client-side flow.
          oauthParams.responseMode = 'fragment';
        }
      }

      var urls = oauthUtil.getOAuthUrls(sdk, oauthParams, options);
      var requestUrl = urls.authorizeUrl + buildAuthorizeParams(oauthParams);

      // Set session cookie to store the oauthParams
      cookies$1.set(config$1.REDIRECT_OAUTH_PARAMS_COOKIE_NAME, JSON.stringify({
        responseType: oauthParams.responseType,
        state: oauthParams.state,
        nonce: oauthParams.nonce,
        scopes: oauthParams.scopes,
        clientId: oauthParams.clientId,
        urls: urls,
        ignoreSignature: oauthParams.ignoreSignature
      }));

      // Set nonce cookie for servers to validate nonce in id_token
      cookies$1.set(config$1.REDIRECT_NONCE_COOKIE_NAME, oauthParams.nonce);

      // Set state cookie for servers to validate state
      cookies$1.set(config$1.REDIRECT_STATE_COOKIE_NAME, oauthParams.state);

      sdk.token.getWithRedirect._setLocation(requestUrl);
    });
}

function renewToken(sdk, token) {
  if (!oauthUtil.isToken(token)) {
    return q.reject(new AuthSdkError_1('Renew must be passed a token with ' +
      'an array of scopes and an accessToken or idToken'));
  }

  var responseType;
  if (sdk.options.pkce) {
    responseType = 'code';
  } else if (token.accessToken) {
    responseType = 'token';
  } else {
    responseType = 'id_token';
  }

  return sdk.token.getWithoutPrompt({
    responseType: responseType,
    scopes: token.scopes
  }, {
    authorizeUrl: token.authorizeUrl,
    userinfoUrl: token.userinfoUrl,
    issuer: token.issuer
  });
}

function removeHash(sdk) {
  var nativeHistory = sdk.token.parseFromUrl._getHistory();
  var nativeDoc = sdk.token.parseFromUrl._getDocument();
  var nativeLoc = sdk.token.parseFromUrl._getLocation();
  if (nativeHistory && nativeHistory.replaceState) {
    nativeHistory.replaceState(null, nativeDoc.title, nativeLoc.pathname + nativeLoc.search);
  } else {
    nativeLoc.hash = '';
  }
}

function parseFromUrl(sdk, url) {
  var nativeLoc = sdk.token.parseFromUrl._getLocation();
  var hash = nativeLoc.hash;
  if (url) {
    hash = url.substring(url.indexOf('#'));
  }

  if (!hash) {
    return q.reject(new AuthSdkError_1('Unable to parse a token from the url'));
  }

  var oauthParamsCookie = cookies$1.get(config$1.REDIRECT_OAUTH_PARAMS_COOKIE_NAME);
  if (!oauthParamsCookie) {
    return q.reject(new AuthSdkError_1('Unable to retrieve OAuth redirect params cookie'));
  }

  try {
    var oauthParams = JSON.parse(oauthParamsCookie);
    var urls = oauthParams.urls;
    delete oauthParams.urls;
    cookies$1.delete(config$1.REDIRECT_OAUTH_PARAMS_COOKIE_NAME);
  } catch(e) {
    return q.reject(new AuthSdkError_1('Unable to parse the ' +
      config$1.REDIRECT_OAUTH_PARAMS_COOKIE_NAME + ' cookie: ' + e.message));
  }

  return q.resolve(oauthUtil.hashToObject(hash))
    .then(function(res) {
      if (!url) {
        // Remove the hash from the url
        removeHash(sdk);
      }
      return handleOAuthResponse(sdk, oauthParams, res, urls);
    });
}

function getUserInfo(sdk, accessTokenObject) {
  if (!accessTokenObject ||
      (!oauthUtil.isToken(accessTokenObject) && !accessTokenObject.accessToken && !accessTokenObject.userinfoUrl)) {
    return q.reject(new AuthSdkError_1('getUserInfo requires an access token object'));
  }
  return http.httpRequest(sdk, {
    url: accessTokenObject.userinfoUrl,
    method: 'GET',
    accessToken: accessTokenObject.accessToken
  })
  .fail(function(err) {
    if (err.xhr && (err.xhr.status === 401 || err.xhr.status === 403)) {
      var authenticateHeader;
      if (err.xhr.headers && util_1.isFunction(err.xhr.headers.get) && err.xhr.headers.get('WWW-Authenticate')) {
        authenticateHeader = err.xhr.headers.get('WWW-Authenticate');
      } else if (util_1.isFunction(err.xhr.getResponseHeader)) {
        authenticateHeader = err.xhr.getResponseHeader('WWW-Authenticate');
      }
      if (authenticateHeader) {
        var errorMatches = authenticateHeader.match(/error="(.*?)"/) || [];
        var errorDescriptionMatches = authenticateHeader.match(/error_description="(.*?)"/) || [];
        var error = errorMatches[1];
        var errorDescription = errorDescriptionMatches[1];
        if (error && errorDescription) {
          err = new OAuthError_1(error, errorDescription);
        }
      }
    }
    throw err;
  });
}

var token = {
  getToken: getToken$1,
  getWithoutPrompt: getWithoutPrompt,
  getWithPopup: getWithPopup,
  getWithRedirect: getWithRedirect,
  parseFromUrl: parseFromUrl,
  decodeToken: decodeToken,
  renewToken: renewToken,
  getUserInfo: getUserInfo,
  verifyToken: verifyToken$1,
  handleOAuthResponse: handleOAuthResponse,
  prepareOauthParams: prepareOauthParams
};

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

var tinyEmitter = E;

function SdkClock(localOffset) {
  // Calculated local clock offset from server time (in milliseconds). Can be positive or negative.
  this.localOffset = parseInt(localOffset || 0);
}

util_1.extend(SdkClock.prototype, {
  // Return the current time (in seconds)
  now: function() {
    var now = (Date.now() + this.localOffset) / 1000;
    return now;
  }
});

// factory method. Create an instance of a clock from current context.
SdkClock.create = function(/* sdk, options */) {
  // TODO: calculate localOffset
  var localOffset = 0;
  return new SdkClock(localOffset);
};

var clock = SdkClock;

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */

/* eslint complexity:[0,8] max-statements:[0,21] */









var DEFAULT_OPTIONS = {
  autoRenew: true,
  storage: 'localStorage',
  expireEarlySeconds: 30
};

function getExpireTime(tokenMgmtRef, token) {
  var expireTime = token.expiresAt - tokenMgmtRef.options.expireEarlySeconds;
  return expireTime;
}

function hasExpired(tokenMgmtRef, token) {
  var expireTime = getExpireTime(tokenMgmtRef, token);
  return expireTime <= tokenMgmtRef.clock.now();
}

function emitExpired(tokenMgmtRef, key, token) {
  tokenMgmtRef.emitter.emit('expired', key, token);
}

function emitError(tokenMgmtRef, error) {
  tokenMgmtRef.emitter.emit('error', error);
}

function clearExpireEventTimeout(tokenMgmtRef, key) {
  clearTimeout(tokenMgmtRef.expireTimeouts[key]);
  delete tokenMgmtRef.expireTimeouts[key];

  // Remove the renew promise (if it exists)
  delete tokenMgmtRef.renewPromise[key];
}

function clearExpireEventTimeoutAll(tokenMgmtRef) {
  var expireTimeouts = tokenMgmtRef.expireTimeouts;
  for (var key in expireTimeouts) {
    if (!expireTimeouts.hasOwnProperty(key)) {
      continue;
    }
    clearExpireEventTimeout(tokenMgmtRef, key);
  }
}

function setExpireEventTimeout(sdk, tokenMgmtRef, key, token) {
  var expireTime = getExpireTime(tokenMgmtRef, token);
  var expireEventWait = Math.max(expireTime - tokenMgmtRef.clock.now(), 0) * 1000;

  // Clear any existing timeout
  clearExpireEventTimeout(tokenMgmtRef, key);

  var expireEventTimeout = setTimeout(function() {
    emitExpired(tokenMgmtRef, key, token);
  }, expireEventWait);

  // Add a new timeout
  tokenMgmtRef.expireTimeouts[key] = expireEventTimeout;
}

function setExpireEventTimeoutAll(sdk, tokenMgmtRef, storage) {
  try {
    var tokenStorage = storage.getStorage();
  } catch(e) {
    // Any errors thrown on instantiation will not be caught,
    // because there are no listeners yet
    emitError(tokenMgmtRef, e);
    return;
  }

  for(var key in tokenStorage) {
    if (!tokenStorage.hasOwnProperty(key)) {
      continue;
    }
    var token = tokenStorage[key];
    setExpireEventTimeout(sdk, tokenMgmtRef, key, token);
  }
}

function add(sdk, tokenMgmtRef, storage, key, token) {
  var tokenStorage = storage.getStorage();
  if (!util_1.isObject(token) ||
      !token.scopes ||
      (!token.expiresAt && token.expiresAt !== 0) ||
      (!token.idToken && !token.accessToken)) {
    throw new AuthSdkError_1('Token must be an Object with scopes, expiresAt, and an idToken or accessToken properties');
  }
  tokenStorage[key] = token;
  storage.setStorage(tokenStorage);
  setExpireEventTimeout(sdk, tokenMgmtRef, key, token);
}

function get$1(storage, key) {
  var tokenStorage = storage.getStorage();
  return tokenStorage[key];
}

function getAsync(sdk, tokenMgmtRef, storage, key) {
  return q.Promise(function(resolve) {
    var token = get$1(storage, key);
    if (!token || !hasExpired(tokenMgmtRef, token)) {
      return resolve(token);
    }

    var tokenPromise = tokenMgmtRef.options.autoRenew
      ? renew(sdk, tokenMgmtRef, storage, key)
      : remove(tokenMgmtRef, storage, key);

    return resolve(tokenPromise);
  });
}

function remove(tokenMgmtRef, storage, key) {
  // Clear any listener for this token
  clearExpireEventTimeout(tokenMgmtRef, key);

  // Remove it from storage
  var tokenStorage = storage.getStorage();
  delete tokenStorage[key];
  storage.setStorage(tokenStorage);
}

function renew(sdk, tokenMgmtRef, storage, key) {
  try {
    var token = get$1(storage, key);
    if (!token) {
      throw new AuthSdkError_1('The tokenManager has no token for the key: ' + key);
    }
  } catch (e) {
    return q.reject(e);
  }

  // Remove existing autoRenew timeout for this key
  clearExpireEventTimeout(tokenMgmtRef, key);

  // Store the renew promise state, to avoid renewing again
  if (!tokenMgmtRef.renewPromise[key]) {
    tokenMgmtRef.renewPromise[key] = sdk.token.renew(token)
    .then(function(freshTokens) {
      var freshToken = freshTokens;
      // With PKCE flow we will receive multiple tokens. Find the one we are looking for
      if (freshTokens instanceof Array) {
        freshToken = freshTokens.find(function(freshToken) {
          return (freshToken.idToken && token.idToken) || (freshToken.accessToken && token.accessToken);
        });
      }

      var oldToken = get$1(storage, key);
      if (!oldToken) {
        // It is possible to enter a state where the tokens have been cleared
        // after a renewal request was triggered. To ensure we do not store a
        // renewed token, we verify the promise key doesn't exist and return.
        return;
      }
      add(sdk, tokenMgmtRef, storage, key, freshToken);
      tokenMgmtRef.emitter.emit('renewed', key, freshToken, oldToken);
      
      // Remove existing promise key
      delete tokenMgmtRef.renewPromise[key];
      return freshToken;
    })
    .fail(function(err) {
      if (err.name === 'OAuthError') {
        remove(tokenMgmtRef, storage, key);
        emitError(tokenMgmtRef, err);
      }

      throw err;
    });
  }
  return tokenMgmtRef.renewPromise[key];
}

function clear(tokenMgmtRef, storage) {
  clearExpireEventTimeoutAll(tokenMgmtRef);
  storage.clearStorage();
}

function TokenManager(sdk, options) {
  options = util_1.extend({}, DEFAULT_OPTIONS, util_1.removeNils(options));

  if (options.storage === 'localStorage' && !browserStorage.browserHasLocalStorage()) {
    util_1.warn('This browser doesn\'t support localStorage. Switching to sessionStorage.');
    options.storage = 'sessionStorage';
  }

  if (options.storage === 'sessionStorage' && !browserStorage.browserHasSessionStorage()) {
    util_1.warn('This browser doesn\'t support sessionStorage. Switching to cookie-based storage.');
    options.storage = 'cookie';
  }

  var storage;
  switch(options.storage) {
    case 'localStorage':
      storage = storageBuilder_1(localStorage, config$1.TOKEN_STORAGE_NAME);
      break;
    case 'sessionStorage':
      storage = storageBuilder_1(sessionStorage, config$1.TOKEN_STORAGE_NAME);
      break;
    case 'cookie':
      storage = storageBuilder_1(browserStorage.getCookieStorage(options), config$1.TOKEN_STORAGE_NAME);
      break;
    default:
      throw new AuthSdkError_1('Unrecognized storage option');
  }

  var clock$1 = clock.create(sdk, options);
  var tokenMgmtRef = {
    clock: clock$1,
    options: options,
    emitter: new tinyEmitter(),
    expireTimeouts: {},
    renewPromise: {}
  };

  this.add = util_1.bind(add, this, sdk, tokenMgmtRef, storage);
  this.get = util_1.bind(getAsync, this, sdk, tokenMgmtRef, storage);
  this.remove = util_1.bind(remove, this, tokenMgmtRef, storage);
  this.clear = util_1.bind(clear, this, tokenMgmtRef, storage);
  this.renew = util_1.bind(renew, this, sdk, tokenMgmtRef, storage);
  this.on = util_1.bind(tokenMgmtRef.emitter.on, tokenMgmtRef.emitter);
  this.off = util_1.bind(tokenMgmtRef.emitter.off, tokenMgmtRef.emitter);

  setExpireEventTimeoutAll(sdk, tokenMgmtRef, storage);
}

var TokenManager_1 = TokenManager;

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */
/* eslint-disable complexity */
/* eslint-disable max-statements */






var cookies$2           = browserStorage.storage;









function OktaAuthBuilder(args) {
  var sdk = this;

  var url = builderUtil.getValidUrl(args);
  // OKTA-242989: support for grantType will be removed in 3.0 
  var usePKCE = args.pkce || args.grantType === 'authorization_code';
  this.options = {
    url: util_1.removeTrailingSlash(url),
    clientId: args.clientId,
    issuer: util_1.removeTrailingSlash(args.issuer),
    authorizeUrl: util_1.removeTrailingSlash(args.authorizeUrl),
    userinfoUrl: util_1.removeTrailingSlash(args.userinfoUrl),
    tokenUrl: util_1.removeTrailingSlash(args.tokenUrl),
    pkce: usePKCE,
    redirectUri: args.redirectUri,
    httpRequestClient: args.httpRequestClient,
    storageUtil: args.storageUtil,
    transformErrorXHR: args.transformErrorXHR,
    headers: args.headers
  };

  if (this.options.pkce && !sdk.features.isPKCESupported()) {
    throw new AuthSdkError_1('This browser doesn\'t support PKCE');
  }

  this.userAgent = 'okta-auth-js-' + config$1.SDK_VERSION;

  // Digital clocks will drift over time, so the server
  // can misalign with the time reported by the browser.
  // The maxClockSkew allows relaxing the time-based
  // validation of tokens (in seconds, not milliseconds).
  // It currently defaults to 300, because 5 min is the
  // default maximum tolerance allowed by Kerberos.
  // (https://technet.microsoft.com/en-us/library/cc976357.aspx)
  if (!args.maxClockSkew && args.maxClockSkew !== 0) {
    this.options.maxClockSkew = config$1.DEFAULT_MAX_CLOCK_SKEW;
  } else {
    this.options.maxClockSkew = args.maxClockSkew;
  }

  // Give the developer the ability to disable token signature
  // validation.
  this.options.ignoreSignature = !!args.ignoreSignature;

  sdk.session = {
    close: util_1.bind(session.closeSession, null, sdk),
    exists: util_1.bind(session.sessionExists, null, sdk),
    get: util_1.bind(session.getSession, null, sdk),
    refresh: util_1.bind(session.refreshSession, null, sdk),
    setCookieAndRedirect: util_1.bind(session.setCookieAndRedirect, null, sdk)
  };

  sdk.tx = {
    status: util_1.bind(tx.transactionStatus, null, sdk),
    resume: util_1.bind(tx.resumeTransaction, null, sdk),
    exists: util_1.bind(tx.transactionExists, null, sdk),
    introspect: util_1.bind(tx.introspect, null, sdk)
  };

  // This is exposed so we can mock document.cookie in our tests
  sdk.tx.exists._get = function(name) {
    return cookies$2.get(name);
  };

  // This is exposed so we can mock window.location.href in our tests
  sdk.idToken = {
    authorize: {
      _getLocationHref: function() {
        return window.location.href;
      }
    }
  };

  sdk.token = {
    getWithoutPrompt: util_1.bind(token.getWithoutPrompt, null, sdk),
    getWithPopup: util_1.bind(token.getWithPopup, null, sdk),
    getWithRedirect: util_1.bind(token.getWithRedirect, null, sdk),
    parseFromUrl: util_1.bind(token.parseFromUrl, null, sdk),
    decode: token.decodeToken,
    renew: util_1.bind(token.renewToken, null, sdk),
    getUserInfo: util_1.bind(token.getUserInfo, null, sdk),
    verify: util_1.bind(token.verifyToken, null, sdk)
  };

  // This is exposed so we can set window.location in our tests
  sdk.token.getWithRedirect._setLocation = function(url) {
    window.location = url;
  };

  // This is exposed so we can mock getting window.history in our tests
  sdk.token.parseFromUrl._getHistory = function() {
    return window.history;
  };

  // This is exposed so we can mock getting window.location in our tests
  sdk.token.parseFromUrl._getLocation = function() {
    return window.location;
  };

  // This is exposed so we can mock getting window.document in our tests
  sdk.token.parseFromUrl._getDocument = function() {
    return window.document;
  };

  sdk.fingerprint._getUserAgent = function() {
    return navigator.userAgent;
  };

  var isWindowsPhone = /windows phone|iemobile|wpdesktop/i;
  sdk.features.isFingerprintSupported = function() {
    var agent = sdk.fingerprint._getUserAgent();
    return agent && !isWindowsPhone.test(agent);
  };

  sdk.tokenManager = new TokenManager_1(sdk, args.tokenManager);
}

var proto = OktaAuthBuilder.prototype;

proto.features = {};

proto.features.isPopupPostMessageSupported = function() {
  var isIE8or9 = document.documentMode && document.documentMode < 10;
  if (window.postMessage && !isIE8or9) {
    return true;
  }
  return false;
};

proto.features.isTokenVerifySupported = function() {
  return typeof crypto !== 'undefined' && crypto.subtle && typeof Uint8Array !== 'undefined';
};

proto.features.isPKCESupported = function() {
  return proto.features.isTokenVerifySupported();
};

// { username, password, (relayState), (context) }
proto.signIn = function (opts) {
  var sdk = this;
  opts = util_1.clone(opts || {});
  function postToTransaction(options) {
    delete opts.sendFingerprint;
    return tx.postToTransaction(sdk, '/api/v1/authn', opts, options);
  }
  if (!opts.sendFingerprint) {
    return postToTransaction();
  }
  return sdk.fingerprint()
  .then(function(fingerprint) {
    return postToTransaction({
      headers: {
        'X-Device-Fingerprint': fingerprint
      }
    });
  });
};

proto.signOut = function () {
  return this.session.close();
};

builderUtil.addSharedPrototypes(proto);

// { resource, (rel), (requestContext)}
proto.webfinger = function (opts) {
  var url = '/.well-known/webfinger' + util_1.toQueryParams(opts);
  var options = {
    headers: {
      'Accept': 'application/jrd+json'
    }
  };
  return http.get(this, url, options);
};

proto.fingerprint = function(options) {
  options = options || {};
  var sdk = this;
  if (!sdk.features.isFingerprintSupported()) {
    return q.reject(new AuthSdkError_1('Fingerprinting is not supported on this device'));
  }

  var deferred = q.defer();

  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';

  function listener(e) {
    if (!e || !e.data || e.origin !== sdk.options.url) {
      return;
    }

    try {
      var msg = JSON.parse(e.data);
    } catch (err) {
      return deferred.reject(new AuthSdkError_1('Unable to parse iframe response'));
    }

    if (!msg) { return; }
    if (msg.type === 'FingerprintAvailable') {
      return deferred.resolve(msg.fingerprint);
    }
    if (msg.type === 'FingerprintServiceReady') {
      e.source.postMessage(JSON.stringify({
        type: 'GetFingerprint'
      }), e.origin);
    }
  }
  oauthUtil.addListener(window, 'message', listener);

  iframe.src = sdk.options.url + '/auth/services/devicefingerprint';
  document.body.appendChild(iframe);

  var timeout = setTimeout(function() {
    deferred.reject(new AuthSdkError_1('Fingerprinting timed out'));
  }, options.timeout || 15000);

  return deferred.promise.fin(function() {
    clearTimeout(timeout);
    oauthUtil.removeListener(window, 'message', listener);
    if (document.body.contains(iframe)) {
      iframe.parentElement.removeChild(iframe);
    }
  });
};

var browser = builderUtil.buildOktaAuth(OktaAuthBuilder);

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */




var browserIndex = browser(browserStorage, fetchRequest_1);

class CrdsAuthenticationService {
    constructor(crdsAuthConfig) {
        this.crdsAuthConfig = crdsAuthConfig;
        this.providerServiceKVP = {};
        this.authenticationStatus$ = new BehaviorSubject(null);
        this.logService = new CrdsLoggerService(crdsAuthConfig.logging);
        let oktajs = new browserIndex(this.crdsAuthConfig.oktaConfig);
        let oktaService = new CrdsOktaService(oktajs, this.logService);
        oktaService.subscribeToTokenExpiration(() => {
            this.authenticate().pipe(first()).subscribe(); //Force a token update
        });
        oktaService.subscribeToTokenRenewed(() => {
            this.logService.Info("Token Renewed");
        });
        oktaService.subscribeToTokenError(() => {
            this.authenticationStatus$.next(null);
        });
        let visibilityChange = this.getVisibilityChange();
        document.addEventListener(visibilityChange, () => {
            if (document.visibilityState === 'visible') {
                this.authenticate().pipe(first()).subscribe();
            }
        });
        this.providerServiceKVP[CrdsAuthenticationProviders.Okta] = oktaService;
        this.providerServiceKVP[CrdsAuthenticationProviders.Mp] = new CrdsMpService(crdsAuthConfig.mpConfig.accessTokenCookie, crdsAuthConfig.mpConfig.refreshTokenCookie, crdsAuthConfig.mpConfig.issuer);
    }
    getVisibilityChange() {
        let visibilityChange;
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
            visibilityChange = "visibilitychange";
        }
        else if (typeof document.mozHidden !== "undefined") {
            visibilityChange = "mozvisibilitychange";
        }
        else if (typeof document.msHidden !== "undefined") {
            visibilityChange = "msvisibilitychange";
        }
        else if (typeof document.webkitHidden !== "undefined") {
            visibilityChange = "webkitvisibilitychange";
        }
        return visibilityChange;
    }
    authenticated() {
        if (this.authenticationStatus$.value) {
            return this.authenticationStatus$.asObservable();
        }
        else {
            return this.authenticate().pipe(first(), tap(tokens => {
                this.authenticationStatus$.next(tokens);
            }), switchMap((tokens) => {
                return this.authenticationStatus$.asObservable();
            }));
        }
    }
    authenticate() {
        return this.AuthenticateByProvider(0).pipe(first(), tap(tokens => {
            this.authenticationStatus$.next(tokens);
        }), map$2(tokens => {
            if (!!tokens)
                Utilities.setNetlifyJWT();
            return tokens;
        }));
    }
    AuthenticateByProvider(iterator) {
        if (iterator >= Object.keys(this.providerServiceKVP).length)
            return of(null);
        return this.providerServiceKVP[this.crdsAuthConfig.providerPreference[iterator]].authenticated().pipe(first(), switchMap(tokens => {
            if (tokens != null) {
                return of(tokens);
            }
            else {
                return this.AuthenticateByProvider(++iterator);
            }
        }));
    }
    signOut() {
        return this.SignOutByProvider(0);
    }
    SignOutByProvider(iterator) {
        if (iterator >= Object.keys(this.providerServiceKVP).length)
            return of(false);
        let provider = this.crdsAuthConfig.providerPreference[iterator];
        return this.providerServiceKVP[provider].signOut().pipe(first(), switchMap(success => {
            if (success) {
                Utilities.deleteCookie('nf_jwt');
                this.authenticationStatus$.next(null);
                return of(success);
            }
            else {
                return this.SignOutByProvider(++iterator);
            }
        }));
    }
}

class Auth {
    constructor(config = {}) {
        this.authenticated = false;
        this.subdomainMap = {
            prod: 'www'
        };
        this.config = config;
        this.analytics = window['analytics'] || {};
        const oktaConfig = {
            clientId: config.okta_client_id,
            issuer: config.okta_issuer,
            tokenManager: {
                storage: 'localStorage'
            }
        };
        const mpConfig = {
            accessTokenCookie: config.mp_access_token_cookie,
            refreshTokenCookie: config.mp_refresh_token_cookie,
            issuer: Auth.getMPIssuerEndpoint(this.config.env)
        };
        const authConfig = {
            oktaConfig: oktaConfig,
            mpConfig: mpConfig,
            logging: config.logging || false,
            providerPreference: [CrdsAuthenticationProviders.Okta, CrdsAuthenticationProviders.Mp]
        };
        this.authService = new CrdsAuthenticationService(authConfig);
    }
    listen(callback) {
        this.authService.authenticated().subscribe(token => {
            if (!token)
                return (this.authenticated = false);
            this.authenticated = true;
            this.token = token;
            this.isMp = token.provider == CrdsAuthenticationProviders.Mp;
            this.isOkta = token.provider == CrdsAuthenticationProviders.Okta;
            this.updateCurrentUser();
            callback(this);
        });
    }
    signOut(callback) {
        this.authService.signOut().subscribe(success => {
            if (success) {
                this.authenticated = false;
                this.updateCurrentUser();
                callback(this);
            }
            else {
                console.log('log out failed');
            }
        });
    }
    updateCurrentUser() {
        if (!this.authenticated)
            return (this.currentUser = null);
        const userId = this.getUserId();
        const userName = this.getUser();
        if (this.analytics)
            this.analytics.identify(userId, {
                name: userName
            });
        return (this.currentUser = {
            id: userId,
            name: userName,
            avatarUrl: this.getUserImageUrl()
        });
    }
    getUserId() {
        if (!this.authenticated)
            return null;
        if (this.isOkta)
            return this.token.id_token.claims.mpContactId;
        if (this.isMp)
            return Utils.getCookie('userId');
    }
    getUser() {
        if (!this.authenticated)
            return null;
        if (this.isOkta)
            return this.token.id_token.claims.name;
        if (this.isMp)
            return Utils.getCookie('username');
    }
    getUserImageUrl() {
        if (!this.authenticated)
            return null;
        const userId = this.getUserId();
        if (!userId)
            return null;
        const subdomain = Utils.getSubdomain(this.config.env);
        return `https://${subdomain}.crossroads.net/proxy/gateway/api/image/profile/${userId}`;
    }
    static getMPIssuerEndpoint(env) {
        const subdomain = env == 'int' || env == 'demo' ? env : '';
        return `https://gateway${subdomain}.crossroads.net/gateway/api/authenticated`;
    }
}

var main = {
	"class": "menu",
	innerHTML: "<svg id=\"menu-thin\" width=\"256\" height=\"256\" viewBox=\"0 0 256 256\"><g><path d=\"M242.852679,47.6875 L14.1473214,47.6875 C12.4091038,47.6875 11,46.5915304 11,45.2395833 L11,35.4479167 C11,34.0959696 12.4091038,33 14.1473214,33 L242.852679,33 C244.590896,33 246,34.0959696 246,35.4479167 L246,45.2395833 C246,46.5915304 244.590896,47.6875 242.852679,47.6875 Z M242.852679,135.8125 L14.1473214,135.8125 C12.4091038,135.8125 11,134.71653 11,133.364583 L11,123.572917 C11,122.22097 12.4091038,121.125 14.1473214,121.125 L242.852679,121.125 C244.590896,121.125 246,122.22097 246,123.572917 L246,133.364583 C246,134.71653 244.590896,135.8125 242.852679,135.8125 Z M242.852679,223.9375 L14.1473214,223.9375 C12.4091038,223.9375 11,222.84153 11,221.489583 L11,211.697917 C11,210.34597 12.4091038,209.25 14.1473214,209.25 L242.852679,209.25 C244.590896,209.25 246,210.34597 246,211.697917 L246,221.489583 C246,222.84153 244.590896,223.9375 242.852679,223.9375 Z\"/></g></svg>"
};
var search = {
	"class": "search",
	innerHTML: "<svg id=\"search-thin\" width=\"256\" height=\"256\" viewBox=\"0 0 256 256\"><g><path d=\"M244.375275,231.976661 L184.91724,172.518627 C183.857136,171.458523 182.474391,170.905425 180.999463,170.905425 L176.252038,170.905425 C192.061423,153.805478 201.740638,130.990186 201.740638,105.870319 C201.740638,52.911186 158.829452,10 105.870319,10 C52.911186,10 10,52.911186 10,105.870319 C10,158.829452 52.911186,201.740638 105.870319,201.740638 C130.990186,201.740638 153.805478,192.061423 170.905425,176.29813 L170.905425,180.999463 C170.905425,182.474391 171.504614,183.857136 172.518627,184.91724 L231.976661,244.375275 C234.142962,246.541575 237.645916,246.541575 239.812216,244.375275 L244.375275,239.812216 C246.541575,237.645916 246.541575,234.142962 244.375275,231.976661 Z M105.870319,186.991358 C61.0232899,186.991358 24.7492798,150.717348 24.7492798,105.870319 C24.7492798,61.0232899 61.0232899,24.7492798 105.870319,24.7492798 C150.717348,24.7492798 186.991358,61.0232899 186.991358,105.870319 C186.991358,150.717348 150.717348,186.991358 105.870319,186.991358 Z\"/></g></svg>"
};
var logo = {
	"class": "logo",
	innerHTML: "<svg width=\"308\" height=\"81\" viewBox=\"0 0 308 81\" xmlns=\"http://www.w3.org/2000/svg\"><path id=\"crossroads-church-logo\" d=\"M211.9 52.2h3.3v10.5h.1c1.1-2.4 3.9-3.4 6.3-3.4 5.2 0 6.8 3 6.8 7.3v13H225V66.2c0-2.4-1.5-4-4-4-4 0-5.9 2.6-5.9 6.2v11.2h-3.3V52.2h.1zm-7.2 14c-.5-2.5-2.2-4-4.9-4-4.7 0-6.2 3.7-6.2 7.8 0 3.6 1.7 7.3 5.8 7.3 3.1 0 5-1.8 5.4-4.8h3.3c-.7 4.8-3.8 7.7-8.7 7.7-6.1 0-9.3-4.2-9.3-10.1 0-5.9 3.1-10.6 9.4-10.6 4.5 0 8.1 2.1 8.6 6.8h-3.4v-.1zm49.5-6.4h3.1V64h.1c1.6-3.2 3.8-4.8 7.3-4.6v3.5c-5.3 0-7.2 3-7.2 8v8.8h-3.3V59.8zm-4.8 19.8h-3.1v-3.1h-.1c-1.4 2.5-3.6 3.6-6.4 3.6-5.2 0-6.8-3-6.8-7.3v-13h3.3v13.4c0 2.4 1.5 4 4 4 4 0 5.9-2.6 5.9-6.2V59.8h3.3v19.8h-.1zm38.2-27.4h3.3v10.5h.1c1.1-2.4 3.9-3.4 6.3-3.4 5.2 0 6.8 3 6.8 7.3v13h-3.3V66.2c0-2.4-1.5-4-4-4-4 0-5.9 2.6-5.9 6.2v11.2h-3.3V52.2zm-7.2 14c-.5-2.5-2.2-4-4.9-4-4.7 0-6.2 3.7-6.2 7.8 0 3.6 1.7 7.3 5.8 7.3 3.1 0 5-1.8 5.4-4.8h3.3c-.7 4.8-3.8 7.7-8.7 7.7-6.1 0-9.3-4.2-9.3-10.1 0-5.9 3.1-10.6 9.4-10.6 4.5 0 8.1 2.1 8.6 6.8h-3.4v-.1zm7.6-45.7c0-1.6 1.4-2.2 3.6-2.2 1 0 1.9.2 2.5.8.7.5 1.1 1.3 1.2 2.3h11.4c-.7-8.4-8.8-10-15.7-10-6 0-13.6 2-14.8 8.6V.5h-12.6v15c-2.7-3.1-5.4-4.1-9.4-4.1-6.5 0-11.7 5-13 13 0-7.5-1-13-15.9-13-12.5 0-17.3 3.9-17.3 10.6h12.1c.3-2.7 2.7-3.1 4.4-3.1 1.3 0 4.1.3 4.1 2.6 0 4.7-14.5 1.5-20.2 7.4v-1.2c0-9.8-6.9-16.4-18-16.4-6.5 0-11.7 2.3-14.8 6.5v-6.3c-.5-.1-1.1-.2-1.6-.2-4.9 0-8 2.4-9.7 7.3l-.1-6.4h-11.4v17.6c-3.9-7.3-19.1-5.6-19.1-9.4 0-1.6 1.4-2.2 3.6-2.2 1 0 1.9.2 2.5.8.7.5 1.1 1.3 1.2 2.3h11.4c-.7-8.4-8.8-10-15.7-10-6.6 0-14.9 2.4-14.9 10.4 0 12.3 19.4 8.2 19.4 13.3 0 2.2-2.1 2.8-4 2.8-1.2 0-2.3-.3-3.1-1-.8-.7-1.3-1.6-1.3-2.9H123v-.3c0-11.8-20-8.9-20-13.3 0-1.6 1.4-2.2 3.6-2.2 1 0 1.9.2 2.5.8.7.5 1.1 1.3 1.2 2.3h11.4c-.7-8.4-8.8-10-15.7-10-6.6 0-15 2.4-15 10.4v.3c-2.2-6.6-8.3-10.7-17.1-10.7-6.5 0-11.7 2.3-14.8 6.5v-6.3c-.5-.1-1.1-.2-1.6-.2-4.9 0-8 2.4-9.7 7.3l-.1-6.4H36.3v19.4H23.8c-.4 2.5-1.6 4.7-4.9 4.7-3.7 0-5.5-3.1-5.5-7.9 0-3.7.8-8.6 5.5-8.6 1.4 0 2.5.4 3.2 1.3.8.8 1.3 1.9 1.3 3.3h12.7c-.9-9.4-8.9-13-17.3-13-10.4 0-18 6.2-18 17 0 10.7 7.8 16.4 18 16.4 8.4 0 15.8-3.3 17.4-12v11.1h12.5V33c0-6.8 2.6-9.2 7.7-9.2-.3 1.5-.5 3-.5 4.7 0 10.8 7.8 16.3 18 16.3 7.4 0 13.6-2.9 16.4-9 1.5 7.1 8.9 9 15.6 9 8.7 0 14-2.5 16-6.6 2.5 5.1 8.9 6.6 14.8 6.6 8.9 0 14.1-2.6 16.1-6.8v5.9h12.6V33c0-6.8 2.6-9.2 7.7-9.2-.3 1.5-.5 3-.5 4.7 0 10.8 7.8 16.3 18 16.3 6.9 0 12.8-2.5 15.8-7.8.9 5.4 5.7 7.8 11.1 7.8 4.7 0 8.3-1 11.9-4.3l.6 3.4h13v-.6c-1.6-1.3-1.7-2.2-1.7-4v-6.5c1.3 7 6 12.1 14 12.1 4 0 6.7-1.3 9.7-5.1V44h11.3v-5.6c2.6 5 8.9 6.5 14.7 6.5 11.6 0 17-4.5 17-11 0-11.9-20-9-20-13.4zM74 36.4c-3.2 0-5.4-2.6-5.4-8.6 0-3.5 1.3-8 5.6-8 3.3-.2 5.3 3.3 5.3 8-.1 6-2.1 8.6-5.5 8.6zm32.5 1.6c-1.2 0-2.3-.3-3.1-1-.8-.7-1.3-1.6-1.3-2.9h-11c.6-1.8.9-3.9.9-6.3 0-.8-.1-1.5-.1-2.2 3.6 7.7 18.6 5.1 18.6 9.6-.1 2.1-2.1 2.8-4 2.8zm84.1-1.6c-3.2 0-5.4-2.6-5.4-8.6 0-3.5 1.3-8 5.5-8 3.3-.2 5.3 3.3 5.3 8 0 6-2 8.6-5.4 8.6zm32.6 1.3c-2.5 0-4-1.1-4-2.7 0-4.1 5.4-3.1 9.5-5.1.3 4.4-1.1 7.8-5.5 7.8zm35.2-1.9c-4.1 0-4.9-3.9-4.9-7.2 0-3.5 1.1-7.5 5.3-7.5 4.2 0 5.4 3.8 5.4 7.3-.1 3.7-1.4 7.4-5.8 7.4zm33.1 2.2c-1.2 0-2.3-.3-3.1-1-.9-.7-1.3-1.6-1.3-2.9h-10.8V23.8c1.9 9.9 19.2 6.6 19.2 11.4 0 2.1-2.1 2.8-4 2.8z\" fill-rule=\"nonzero\" fill=\"\"/></svg>"
};
var give = {
	"class": "donate",
	innerHTML: "<svg viewBox=\"0 0 244.36 244.36\"><defs><mask id=\"a\" x=\"-6\" y=\"-6\" width=\"256\" height=\"256\" maskUnits=\"userSpaceOnUse\"><g transform=\"translate(-6 -6)\"><rect width=\"256\" height=\"256\" style=\"fill:#fff\"/></g></mask></defs><g style=\"mask:url(#a)\"><path d=\"M113.39,109.09A27.82,27.82,0,0,1,100,100.74a25.23,25.23,0,0,1-6.2-14.08,24.08,24.08,0,0,1,6.44-19.09,24.39,24.39,0,0,1,18.85-8.12h1.44V48a4.09,4.09,0,0,1,3.81-3.82H132A4.11,4.11,0,0,1,135.82,48V59.45h.48a33.71,33.71,0,0,1,20.52,6.69,5.46,5.46,0,0,1,1.67,3.1,3.56,3.56,0,0,1-1.19,3.1l-5.25,5.25a4.29,4.29,0,0,1-2.39,1.19,2.6,2.6,0,0,1-2.39-.71,17.88,17.88,0,0,0-10.5-3.34H119.11A9.72,9.72,0,0,0,112,77.59,8.94,8.94,0,0,0,109.09,84,10.29,10.29,0,0,0,111,90.24a9.5,9.5,0,0,0,5.25,3.58l28.16,8.11a24.66,24.66,0,0,1,15.27,12.41,23.29,23.29,0,0,1,1.43,20,22.1,22.1,0,0,1-9.3,12.17,27.73,27.73,0,0,1-15.51,4.53h-.48v11.46a4.11,4.11,0,0,1-3.82,3.81h-7.64a4.09,4.09,0,0,1-3.81-3.81V151.09h-.48a32.24,32.24,0,0,1-20.52-7.16,3.64,3.64,0,0,1-1.68-2.62,3.58,3.58,0,0,1,1.2-3.11l5.25-5.25a4.29,4.29,0,0,1,2.38-1.19,2.58,2.58,0,0,1,2.39.72,18.71,18.71,0,0,0,11,3.34h17.18a9.72,9.72,0,0,0,7.16-2.87,8.87,8.87,0,0,0,2.86-6.44,10.2,10.2,0,0,0-1.91-6.2,9.45,9.45,0,0,0-5.25-3.58Zm121.7,34.36a15.49,15.49,0,0,1,15.27,15.28v76.36a15.47,15.47,0,0,1-15.27,15.27H21.27a14.71,14.71,0,0,1-10.74-4.53A14.68,14.68,0,0,1,6,235.09V158.73A14.68,14.68,0,0,1,10.53,148a14.72,14.72,0,0,1,10.74-4.54H36.55a97.2,97.2,0,0,1-7.64-38.18A96.4,96.4,0,0,1,42.27,55.4a100.25,100.25,0,0,1,36-36A96.4,96.4,0,0,1,128.18,6a96.43,96.43,0,0,1,49.88,13.36,100.3,100.3,0,0,1,36,36,96.4,96.4,0,0,1,13.36,49.87,97.37,97.37,0,0,1-7.63,38.18ZM128.18,21.27a83.6,83.6,0,0,0-84,84,83.57,83.57,0,0,0,84,84,83.57,83.57,0,0,0,84-84,83.6,83.6,0,0,0-84-84ZM235.09,235.09V158.73H211.7a99.76,99.76,0,0,1-30.54,30.54h19.57a4.11,4.11,0,0,1,3.81,3.82v7.64a4.09,4.09,0,0,1-3.81,3.81H55.64a4.09,4.09,0,0,1-3.82-3.81v-7.64a4.11,4.11,0,0,1,3.82-3.82h20a97.93,97.93,0,0,1-31-30.54H21.27v76.36Z\" transform=\"translate(-6 -6)\"/></g></svg>"
};
var profile = {
	"class": "account",
	innerHTML: "<svg id=\"account-thin\" width=\"256\" height=\"256\" viewBox=\"0 0 256 256\"><g><path d=\"M128,10 C62.8145161,10 10,62.8145161 10,128 C10,193.185484 62.8145161,246 128,246 C193.185484,246 246,193.185484 246,128 C246,62.8145161 193.185484,10 128,10 Z M188.903226,210.6 C171.821774,223.208871 150.791129,230.774194 128,230.774194 C105.208871,230.774194 84.1782258,223.208871 67.0967742,210.6 L67.0967742,204.129032 C67.0967742,187.333065 80.7524194,173.677419 97.5483871,173.677419 C102.829839,173.677419 110.633065,179.101613 128,179.101613 C145.414516,179.101613 153.122581,173.677419 158.451613,173.677419 C175.247581,173.677419 188.903226,187.333065 188.903226,204.129032 L188.903226,210.6 Z M203.462903,197.515323 C200.227419,175.437903 181.433065,158.451613 158.451613,158.451613 C148.697581,158.451613 143.987097,163.875806 128,163.875806 C112.012903,163.875806 107.35,158.451613 97.5483871,158.451613 C74.5669355,158.451613 55.7725806,175.437903 52.5370968,197.515323 C35.6459677,179.196774 25.2258065,154.835484 25.2258065,128 C25.2258065,71.3314516 71.3314516,25.2258065 128,25.2258065 C184.668548,25.2258065 230.774194,71.3314516 230.774194,128 C230.774194,154.835484 220.354032,179.196774 203.462903,197.515323 Z M128,63.2903226 C104.875806,63.2903226 86.1290323,82.0370968 86.1290323,105.16129 C86.1290323,128.285484 104.875806,147.032258 128,147.032258 C151.124194,147.032258 169.870968,128.285484 169.870968,105.16129 C169.870968,82.0370968 151.124194,63.2903226 128,63.2903226 Z M128,131.806452 C113.297581,131.806452 101.354839,119.86371 101.354839,105.16129 C101.354839,90.458871 113.297581,78.516129 128,78.516129 C142.702419,78.516129 154.645161,90.458871 154.645161,105.16129 C154.645161,119.86371 142.702419,131.806452 128,131.806452 Z\"/></g></svg>"
};
var close = {
	"class": "close",
	innerHTML: "<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fal\" data-icon=\"times\" class=\"svg-inline--fa fa-times fa-w-10\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\"><path fill=\"\" d=\"M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z\"></path></svg>"
};

const GlobalNav = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.data = {};
        this.openNavName = '';
        this.isAuthenticated = false;
        this.auth = {};
    }
    componentWillLoad() {
        if (!this.data.config || this.auth.config)
            return;
        this.auth = new Auth(Object.assign(this.data.config, { env: this.env }));
        this.auth.listen(this.authChangeCallback.bind(this));
    }
    componentDidLoad() {
        this.topOffset = this.element.getBoundingClientRect().top + window.scrollY;
    }
    /* Handle authentication */
    handleSignOut() {
        this.auth.signOut(this.authChangeCallback.bind(this));
    }
    authChangeCallback() {
        this.isAuthenticated = this.auth.authenticated;
        if (!this.isAuthenticated) {
            this.redirectToRoot();
        }
    }
    redirectToRoot() {
        window.location.replace(this.rootURL());
    }
    /* Handle nav open/close */
    isNavOpen() {
        const navNames = ['main-nav', 'give-nav', 'profile-nav'];
        return navNames.includes(this.openNavName);
    }
    toggleNav(event, navName, navRequiresAuth = false) {
        event.stopPropagation();
        if (this.openNavName === navName) {
            event.preventDefault();
            this.openNavName = '';
        }
        else if (navRequiresAuth) {
            if (this.isAuthenticated) {
                event.preventDefault();
                this.openNavName = navName;
            }
        }
        else {
            event.preventDefault();
            this.openNavName = navName;
        }
        const docStyle = this.isNavOpen() ? 'overflow: hidden; position: absolute; width: 100vw;' : 'overflow: scroll;';
        document.body.setAttribute('style', docStyle);
    }
    closeNav(event) {
        if (this.isNavOpen()) {
            event.preventDefault();
        }
        this.openNavName = '';
        document.body.setAttribute('style', 'overflow: scroll;');
    }
    /* Misc */
    rootURL() {
        return `https://${Utils.getSubdomain(this.env)}.crossroads.net`;
    }
    authProfileIcon() {
        const avatarUrl = this.auth.currentUser && this.auth.currentUser.avatarUrl;
        return `<div class="account-authenticated" style="background-image: url('${avatarUrl || ''}');"/>`;
    }
    /* Render elements */
    render() {
        return (h(Fragment, null, h("header", { ref: el => (this.element = el), class: this.isNavOpen() ? 'nav-is-showing' : '', style: { top: `${this.openNavName === 'profile-nav' || this.openNavName === 'give-nav' ? this.topOffset : 0}px` } }, h("div", null, h("div", { class: "global-nav-items" }, h("div", { class: "global-actions" }, h("a", { class: `menu-container ${this.openNavName === 'main-nav' ? 'nav-is-showing' : ''}`, onClick: event => this.toggleNav(event, 'main-nav'), "data-label": "menu", "data-automation-id": "sh-menu" }, h("div", { class: main.class, innerHTML: main.innerHTML }), h("div", { class: close.class, innerHTML: close.innerHTML })), h("a", { href: `${this.rootURL()}/search`, class: "search-container", "data-automation-id": "sh-search", "data-label": "search" }, h("div", { class: search.class, innerHTML: search.innerHTML }))), h("a", { href: this.rootURL(), "data-automation-id": "sh-logo", class: logo.class, innerHTML: logo.innerHTML }), h("div", { class: "user-actions" }, h("a", { class: `give-container ${this.openNavName === 'give-nav' ? 'nav-is-showing' : ''}`, onClick: event => this.toggleNav(event, 'give-nav'), "data-label": "give", "data-automation-id": "sh-give" }, h("div", { class: give.class, innerHTML: give.innerHTML }), h("div", { class: close.class, innerHTML: close.innerHTML })), h("a", { class: `profile-container ${this.openNavName === 'profile-nav' ? 'nav-is-showing' : ''}`, onClick: event => this.toggleNav(event, 'profile-nav', true), "data-label": this.isAuthenticated ? 'my account' : 'sign in', href: `${this.rootURL()}/signin`, "data-automation-id": "sh-profile" }, h("div", { class: profile.class, innerHTML: this.isAuthenticated ? this.authProfileIcon() : profile.innerHTML }), h("div", { class: close.class, innerHTML: close.innerHTML })))), h("give-nav", { isNavShowing: this.openNavName === 'give-nav', data: this.data.give }), h("profile-nav", { isNavShowing: this.openNavName === 'profile-nav' && this.isAuthenticated, handleSignOut: this.handleSignOut.bind(this), currentUser: this.auth.currentUser, data: this.data.profile }))), h("main-nav", { isNavShowing: this.openNavName === 'main-nav', data: this.data.nav, promoData: this.data.promos }), h("div", { class: `close-nav ${this.isNavOpen() ? 'is-showing' : ''}` }, h("div", { class: "close-nav-icon", innerHTML: close.innerHTML, onClick: this.closeNav.bind(this) }))));
    }
    static get style() { return "header{background-color:#0095d9;position:relative;top:0;width:100%;z-index:2}\@supports ((position:-webkit-sticky) or (position:sticky)){header{position:-webkit-sticky;position:sticky}}header.nav-is-showing{position:fixed}\@supports ((position:-webkit-sticky) or (position:sticky)){header.nav-is-showing{position:-webkit-sticky;position:sticky}}header>div{margin:0 auto;max-width:1170px;padding:0 15px;position:relative}.global-nav-items{-ms-flex-pack:justify;justify-content:space-between;padding:2px}.global-actions,.global-nav-items,.user-actions{display:-ms-flexbox;display:flex}.global-actions a:first-of-type,.user-actions a:first-of-type{margin-right:18px}.logo{left:50%;margin:7px 0 0 -52px;position:absolute}.logo svg{fill:#fff;height:29px;width:111px}.account,.donate,.menu,.search{display:block;height:22px;padding:12px 0;width:22px}.account svg,.donate svg,.menu svg,.search svg{height:22px;width:22px}.account .account-authenticated{background-color:#fff;background-position:50%;background-repeat:no-repeat;background-size:22px;border:1.5px solid #fff;border-radius:50%;-webkit-box-sizing:border-box;box-sizing:border-box;height:22px;width:22px}\@media (hover){.account .account-authenticated:hover{-webkit-filter:brightness(90%);filter:brightness(90%)}}.close{display:block;padding:9px 0}.close,.close svg{height:26px;width:26px}.give-container,.menu-container,.profile-container,.search-container{color:#fff;display:-ms-flexbox;display:flex;text-decoration:none}\@media (min-width:768px){.give-container:after,.menu-container:after,.profile-container:after,.search-container:after{-ms-flex-item-align:center;align-self:center;bottom:2px;content:attr(data-label);display:inline-block;font-size:13px;margin-left:7px;position:relative;text-transform:capitalize}}.give-container svg,.menu-container svg,.profile-container svg,.search-container svg{fill:#fff}\@media (hover){.give-container:hover,.menu-container:hover,.profile-container:hover,.search-container:hover{color:#ccc}.give-container:hover svg,.menu-container:hover svg,.profile-container:hover svg,.search-container:hover svg{fill:#ccc}}.menu-container .close{display:none;margin-right:-4px}\@media (min-width:992px){.menu-container.nav-is-showing .menu{display:none}.menu-container.nav-is-showing .close{display:block}}.profile-container .close{display:none;margin-right:-4px}\@media (min-width:992px){.profile-container.nav-is-showing .account{display:none}.profile-container.nav-is-showing .close{display:block}}.give-container .close{display:none;margin-right:-4px}\@media (min-width:992px){.give-container.nav-is-showing .donate{display:none}.give-container.nav-is-showing .close{display:block}}.close-nav{background:-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.9)));background:linear-gradient(180deg,transparent,rgba(0,0,0,.9));bottom:0;display:none;height:125px;padding-left:22px;position:fixed;width:100%;z-index:3}\@media (max-width:992px){.close-nav.is-showing{display:block}}.close-nav-icon{background-color:#0095d9;border-radius:50%;bottom:22px;-webkit-box-shadow:0 5px 24px -5px rgba(0,0,0,.75);box-shadow:0 5px 24px -5px rgba(0,0,0,.75);cursor:pointer;height:64px;position:absolute;width:64px}.close-nav svg{fill:#fff;height:30px;left:50%;position:absolute;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:30px}"; }
};

const MainMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isNavShowing = true;
        this.data = [];
    }
    handleBackClick(event) {
        event.preventDefault();
        this.activeSection = null;
    }
    handleSectionClick(event, sectionName) {
        event.preventDefault();
        this.activeSection = sectionName;
    }
    maybeRenderSections() {
        const sectionList = this.data.map(section => {
            const sectionName = Utils.parameterize(section.title);
            return (h("nav-section", { sectionName: sectionName, handleClick: this.handleSectionClick.bind(this), isActive: this.activeSection === sectionName }, h("h2", null, section.title), h("p", null, section.description)));
        });
        return sectionList.length > 0 && (h("ul", null, sectionList));
    }
    renderSubNavOrCtas() {
        return this.activeSection ?
            (h("div", { class: "subnavigation" }, this.maybeRenderActiveSubNav())) : (h("nav-ctas", { data: this.promoData }));
    }
    maybeRenderActiveSubNav() {
        const activeSectionData = this.data.find((section) => {
            section.subNavName = Utils.parameterize(section.title);
            return section.subNavName === this.activeSection;
        });
        return activeSectionData &&
            (h("nav-section-subnav", { subNavName: activeSectionData.subNavName, data: activeSectionData, handleBackClick: this.handleBackClick.bind(this), isActive: true }));
    }
    getNavClass() {
        let classes = [];
        if (this.isNavShowing)
            classes.push('is-showing');
        if (this.activeSection)
            classes.push(`section--${this.activeSection}`);
        return classes.join(' ');
    }
    render() {
        if (!this.isNavShowing || !Array.isArray(this.data))
            return null;
        return (h("nav", { class: this.getNavClass(), onClick: event => event.stopPropagation() }, h("div", { class: "content" }, h("div", { class: "navigation" }, this.maybeRenderSections()), this.renderSubNavOrCtas())));
    }
    static get style() { return "nav{background-color:#000;background-repeat:no-repeat;background-size:cover;color:#fff;display:none;font-family:acumin-pro,helvetica,arial,sans-serif;height:calc(100% - 47px);overflow-x:hidden;overflow-y:scroll;position:fixed;top:47px;-webkit-transform:translateX(0);transform:translateX(0);width:100vw;z-index:2;background-image:url(https://crds-media.imgix.net/7B6MoNNiWMZOtdusfRpipl/651049926b72990ae4f510a725cc2b26/nav-section-default-mobile.jpg?auto=format%2Ccompress)}nav.is-showing{display:block}\@media (min-width:768px){nav{height:100vh}}\@media (min-width:992px){nav{background-size:100%;background-image:url(https://crds-media.imgix.net/1OTqm9FjFl6wtjCXAkA04V/d44f06765e1fe0cf6a33ac3222b29302/nav-section-default.jpg?auto=format%2Ccompress)}}nav.section--come-visit{background-image:url(https://crds-media.imgix.net/7tP5INZjs0NUsWUlUDRpKv/6af5b40c0caf555a52876d51037de2a2/nav-section-locations-mobile.jpg?auto=format%2Ccompress)}\@media (min-width:992px){nav.section--come-visit{background-image:url(https://crds-media.imgix.net/49tv3Wjdt28dPnim7TbR89/6e9931a3700a3894510faa32d6dcea0f/nav-section-locations.jpg?auto=format%2Ccompress)}}nav.section--find-community{background-image:url(https://crds-media.imgix.net/67LrfkAcGom2zu23JncnA0/6e3c9b52f38f455d69f8b441d0d60726/nav-section-community-mobile.jpg?auto=format%2Ccompress)}\@media (min-width:992px){nav.section--find-community{background-image:url(https://crds-media.imgix.net/zEx1Ajg3dIlh5SpvzQ1qI/981c79df660b3dc5b393338a7640b2a1/nav-section-community.jpg?auto=format%2Ccompress)}}nav.section--get-support{background-image:url(https://crds-media.imgix.net/Cx02UnQr9sbVzjpXIcuqY/92b73ec270bf84af99c590bbd0173c54/nav-section-support-mobile.jpg?auto=format%2Ccompress)}\@media (min-width:992px){nav.section--get-support{background-image:url(https://crds-media.imgix.net/7i7YFUv6uY8MpwztZwIZE0/d093954885a5af29757040281c3b7e4c/nav-section-support.jpg?auto=format%2Ccompress)}}nav.section--watch-listen-read{background-image:url(https://crds-media.imgix.net/5lMvnR6A9cavGG4aS0zzO8/bcff1c0f42284f027a411b22a85bfb55/nav-section-media-mobile.jpg?auto=format%2Ccompress)}\@media (min-width:992px){nav.section--watch-listen-read{background-image:url(https://crds-media.imgix.net/59liSAMGW8dBCeUza5NUvj/b43c1e158ac599fd6debc40b916997d9/nav-section-media.jpg?auto=format%2Ccompress)}}nav .content{position:relative;width:200vw;z-index:3;margin:0 auto;max-width:1170px}\@media (max-width:992px){nav .content{padding-bottom:125px;-webkit-transform:translateX(0);transform:translateX(0);-webkit-transition:-webkit-transform .2s linear;transition:-webkit-transform .2s linear;transition:transform .2s linear;transition:transform .2s linear,-webkit-transform .2s linear}}\@media (min-width:992px){nav .content{display:-ms-flexbox;display:flex;padding-bottom:0}}\@media (max-width:992px){nav[class*=section--] .content{-webkit-transform:translateX(-100vw);transform:translateX(-100vw);-webkit-transition:-webkit-transform .2s linear;transition:-webkit-transform .2s linear;transition:transform .2s linear;transition:transform .2s linear,-webkit-transform .2s linear}}\@media (min-width:992px){nav[class*=section--] .ctas{display:none}}.navigation{position:relative;width:100vw}\@media (min-width:992px){.navigation{margin-right:1.2%;width:50%}}.navigation ul{padding-left:0;margin:0;padding:30px 0 20px}.navigation ul li{list-style:none}\@media (min-width:992px){.navigation ul{padding:50px 20px 0;position:relative;z-index:1}}.navigation li{width:100%}.navigation:after{background-color:#d8d8d8;bottom:0;content:\"\";height:2px;left:20px;margin:0 auto;opacity:.2;position:absolute;width:calc(100vw - 40px)}\@media (min-width:992px){.navigation:after{background:-webkit-gradient(linear,left top,left bottom,from(#fff),to(hsla(0,0%,100%,0)));background:linear-gradient(180deg,#fff 0,hsla(0,0%,100%,0));height:100%;left:auto;right:56px;top:50px;width:2px}}\@media (max-width:992px){.subnavigation{left:100vw;padding-bottom:125px;position:absolute;top:0}}\@media (min-width:992px){.subnavigation{padding-top:47px;width:calc(50% - 40px)}}"; }
};

/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var isExtendable = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
};

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

function unescape$1(str, type) {
  if (!isString$2(str)) return '';
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

function isString$2(str) {
  return str && typeof str === 'string';
}

/**
 * Expose charSets
 */

unescape$1.chars = charSets.default;
unescape$1.extras = charSets.extras;
// don't trip the "charSets" getter unless it's explicitly called
Object.defineProperty(unescape$1, 'all', {
  get: function() {
    return charSets.all;
  }
});

/**
 * Expose `unescape`
 */

var _unescape = unescape$1;

const NavCtas = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    decodedData() {
        return _unescape(this.data || '');
    }
    render() {
        return h("div", { class: "ctas", innerHTML: this.decodedData() });
    }
    static get style() { return ".ctas{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;padding:40px 20px 0}\@media (max-width:992px){.ctas{width:calc(100vw - 40px)}}\@media (min-width:992px){.ctas{padding:70px 0 0}}.ctas h3{font-size:11px;margin-top:0;opacity:.5;text-transform:uppercase}.cta{background-color:rgba(21,21,21,.8);display:-ms-flexbox;display:flex;margin-bottom:10px;text-decoration:none}.cta-image{height:75px}.cta-image img{height:75px;width:100px}.cta-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;padding:0 20px;width:100%}.cta-content h4{color:#fff;font-size:14px;font-weight:600;text-transform:uppercase}.cta-content h4,.cta-content p{margin:0}.cta-content p{color:#979797;font-size:12px;font-weight:300;line-height:18px}.cta:hover-content h4{color:#ccc}.more-updates{color:#0095d9;font-size:12px;text-decoration:none;text-transform:capitalize}"; }
};

const NavigationSection = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isActive = false;
        /**
         * Print log messages?
         */
        this.debug = true;
    }
    componentWillLoad() {
        this.console = new Logger(this.debug);
        this.config = new Config();
    }
    onClick(event) {
        if (typeof this.handleClick === 'function') {
            this.handleClick(event, this.sectionName);
        }
        else {
            console.error('Function to handle nav-section click not provided');
        }
    }
    render() {
        return (h("li", null, h("a", { class: this.isActive ? 'is-active' : '', "data-automation-id": `sh-section-${this.sectionName}`, onClick: this.onClick.bind(this) }, h("slot", null))));
    }
    static get style() { return "nav-section a{cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin-bottom:10px;padding:15px 20px}\@media (min-width:992px){nav-section a{height:96px;-ms-flex-pack:center;justify-content:center;margin-bottom:0;position:relative;width:86%}}nav-section a:after{border-color:transparent transparent transparent #0095d9;border-style:solid;border-width:63px 0 63px 50px;content:\"\";height:0;left:0;position:absolute;top:0;visibility:hidden;width:0}nav-section a:before{background-color:#0095d9;content:\"\";display:inline-block;height:100%;left:0;position:absolute}\@media (min-width:992px){nav-section a:hover:before{width:4px}}\@media (min-width:992px){nav-section a.is-active:after{left:100%;-webkit-transition:left .4s ease;transition:left .4s ease;visibility:visible}nav-section a.is-active:before{-webkit-transition:width .4s ease;transition:width .4s ease;width:100%}}nav-section a h2{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;display:-ms-flexbox;display:flex;font-size:48px;-ms-flex-pack:justify;justify-content:space-between;line-height:.6;margin:0;position:relative;text-transform:uppercase}\@media (max-width:992px){nav-section a h2:after{background-image:url(/assets/images/chevron-right-light.svg);background-size:12px 22px;content:\"\";display:-ms-flexbox;display:flex;height:22px;position:absolute;right:0;top:20%;width:12px}}nav-section a p{font-size:14px;margin:12px 0 0;opacity:.7}"; }
};

const NavSectionSubnav = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isActive = false;
        this.data = {};
        this.simpleNav = new SimpleNavHelper();
        this.simpleNav.formatMenuEntry = (element) => { return element; }; //Don't add extra formatting to entries
    }
    onClick(event) {
        if (typeof this.handleBackClick === 'function') {
            this.handleBackClick(event);
        }
        else {
            console.error('Function to handle nav-section-subnav click not provided');
        }
    }
    render() {
        let chevronLeftLight = '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg>';
        return (h("div", { class: this.isActive ? '' : 'hidden' }, h("a", { "data-automation-id": `sh-section-subnav-${this.subNavName}`, class: "back", href: "", onClick: event => this.handleBackClick(event) }, h("span", { innerHTML: chevronLeftLight }), "Back"), this.simpleNav.formatMenuTitle(this.data.title), this.simpleNav.maybeRenderNavEntries(this.data.children)));
    }
    static get style() { return "nav-section-subnav{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;color:#fff}nav-section-subnav div{padding:30px 20px 0}nav-section-subnav a{color:#fff;display:inline-block;font-size:19px;margin-bottom:10px;padding-left:10px;text-decoration:none;text-transform:capitalize}nav-section-subnav a.all{margin-bottom:30px}nav-section-subnav a:hover{color:#ccc}nav-section-subnav h2{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;font-size:48px;line-height:48px;margin:0;text-transform:uppercase;margin-bottom:10px}nav-section-subnav h4{font-size:11px;margin:0 0 10px;opacity:.5;text-transform:uppercase}nav-section-subnav ul{padding-left:0;margin-top:0}nav-section-subnav ul li{list-style:none}nav-section-subnav ul li.top-level a{padding-left:0}nav-section-subnav .hidden{display:none}\@media (min-width:992px){nav-section-subnav h2{display:none}}nav-section-subnav .back{font-size:14px;padding-left:0;position:relative}\@media (min-width:992px){nav-section-subnav .back{display:none}}nav-section-subnav .back span{display:inline-block;height:13px;margin-right:8px;padding:12px 0;position:relative;top:1px;width:7px}nav-section-subnav .back svg{fill:#fff;height:13px;width:7px}"; }
};

const ProfileMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isNavShowing = true;
        this.data = {};
        this.simpleNav = new SimpleNavHelper(this.handleSignOut);
    }
    navTitle() {
        const title = (this.data && this.data.title) || '';
        return unescape(title.replace('%user_name%', this.currentUser.name || ''));
    }
    backgroundImageURL() {
        return (this.currentUser && this.currentUser.avatarUrl) || '';
    }
    render() {
        if (!this.isNavShowing || !this.simpleNav.isObjectTruthyNonArray(this.data))
            return null;
        return (h("div", { class: "profile-nav" }, h("div", { class: "profile-nav-img", style: {
                backgroundImage: `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%),url('${this.backgroundImageURL()}')`
            } }), this.simpleNav.renderNav(this.data, this.navTitle())));
    }
    static get style() { return ".give-nav,.profile-nav{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;color:#fff;background-color:#000;background-repeat:no-repeat;background-size:100%;height:100vh;left:0;margin-left:-15px;max-height:100vh;overflow-y:scroll;position:-webkit-sticky;position:sticky;top:48px;width:100vw;z-index:2}.give-nav div,.profile-nav div{height:auto;padding:30px 20px 90px}.give-nav a,.profile-nav a{color:#fff;display:inline-block;font-size:19px;margin-bottom:10px;padding-left:10px;text-decoration:none;text-transform:capitalize}.give-nav a.all,.profile-nav a.all{margin-bottom:30px}.give-nav a:hover,.profile-nav a:hover{color:#ccc}.give-nav h2,.profile-nav h2{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;font-size:48px;line-height:48px;margin:0;text-transform:uppercase;margin-bottom:20px}.give-nav h4,.profile-nav h4{font-size:11px;margin:0 0 10px;opacity:.5;text-transform:uppercase}.give-nav ul,.profile-nav ul{padding-left:0;margin-top:0}.give-nav ul li,.profile-nav ul li{list-style:none}.give-nav ul li.top-level a,.profile-nav ul li.top-level a{padding-left:0}\@media (min-width:992px){.give-nav,.profile-nav{height:auto;left:auto;margin-right:-15px;position:absolute;right:15px;width:375px}}\@media (min-width:1170px){.give-nav,.profile-nav{margin-right:0}}.give-nav::-webkit-scrollbar,.profile-nav::-webkit-scrollbar{width:0}.give-nav ul:last-of-type,.profile-nav ul:last-of-type{padding-bottom:30px}.give-nav{background-image:url(https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress)}.profile-nav:after{background-color:rgba(0,0,0,.75);content:\" \";z-index:-1}.profile-nav .profile-nav-img,.profile-nav:after{height:100%;left:0;position:absolute;top:0;width:100%}.profile-nav .profile-nav-img{background-position:top;background-repeat:no-repeat;background-size:100% auto;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-filter:blur(2px);filter:blur(2px);z-index:-2}\@media (min-width:992px){.profile-nav div{padding-bottom:0}}"; }
};

export { CrdsDefaultLayout as crds_default_card, CrdsGreeting as crds_greeting, HeartButton as crds_heart_button, CrdsIcon as crds_icon, CrdsImage as crds_image, CrdsMediaCard as crds_media_card, CrdsModal as crds_modal, CrdsRecommendedContent as crds_recommended_content, SharedFooter as crds_shared_footer, SharedHeader as crds_shared_header, SiteHappenings as crds_site_happenings, SnailTrail as crds_snail_trail, SnailTrailLink as crds_snail_trail_link, CrdsSubscribe as crds_subscribe, GiveMenu as give_nav, GlobalNav as global_nav, MainMenu as main_nav, NavCtas as nav_ctas, NavigationSection as nav_section, NavSectionSubnav as nav_section_subnav, ProfileMenu as profile_nav };
