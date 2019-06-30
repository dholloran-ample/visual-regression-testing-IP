"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crds_components_core_js_1 = require("../crds-components.core.js");
var chunk_9d0e91ad_js_1 = require("./chunk-9d0e91ad.js");
var chunk_77ecfe7f_js_1 = require("./chunk-77ecfe7f.js");
var chunk_15914d3f_js_1 = require("./chunk-15914d3f.js");
var chunk_e3f15c9a_js_1 = require("./chunk-e3f15c9a.js");
var GiveMenu = function () { function e() { this.giveNavIsShowing = !0, this.renderSections = function (e) { var t = !1; return crds_components_core_js_1.h("div", null, crds_components_core_js_1.h("h2", null, " ", e.title, " "), e.children.map(function (e) { return t = t || "string" == typeof e, crds_components_core_js_1.h("div", { style: { padding: "0" } }, "string" == typeof e && crds_components_core_js_1.h("h4", null, e), "string" != typeof e && crds_components_core_js_1.h("ul", null, e.map(function (e) { if ("string" != typeof e)
    return crds_components_core_js_1.h("li", { class: t ? "" : "top-level" }, crds_components_core_js_1.h("a", { href: e.href, "data-automation-id": e["automation-id"] }, e.title)); }))); })); }; } return e.prototype.handleClick = function (e) { e.stopPropagation(); }, e.prototype.render = function () { return this.giveNavIsShowing ? crds_components_core_js_1.h("div", { class: "give-nav", style: { backgroundImage: "url(" + this.data.background_img + ")" } }, this.renderSections(this.data)) : null; }, Object.defineProperty(e, "is", { get: function () { return "give-nav"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { data: { type: "Any", attr: "data" }, giveNavIsShowing: { type: Boolean, attr: "give-nav-is-showing" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "listeners", { get: function () { return [{ name: "click", method: "handleClick" }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ".give-nav,.profile-nav{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;color:#fff;background-color:#000;background-repeat:no-repeat;background-size:100%;height:100vh;left:0;max-height:100vh;overflow-y:scroll;position:fixed;top:48px;width:100vw;z-index:2}.give-nav div,.profile-nav div{height:auto;padding:30px 20px 90px}.give-nav a,.profile-nav a{color:#fff;display:inline-block;font-size:19px;margin-bottom:10px;padding-left:10px;text-decoration:none;text-transform:capitalize}.give-nav a.all,.profile-nav a.all{margin-bottom:30px}.give-nav a:hover,.profile-nav a:hover{color:#ccc}.give-nav h2,.profile-nav h2{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;font-size:48px;line-height:48px;margin:0;text-transform:uppercase;margin-bottom:20px}.give-nav h4,.profile-nav h4{font-size:11px;margin:0 0 10px;opacity:.5;text-transform:uppercase}.give-nav ul,.profile-nav ul{padding-left:0;margin-top:0}.give-nav ul li,.profile-nav ul li{list-style:none}.give-nav ul li.top-level a,.profile-nav ul li.top-level a{padding-left:0}\@media (min-width:992px){.give-nav,.profile-nav{height:auto;left:auto;margin-right:-15px;position:absolute;right:15px;width:375px}}\@media (min-width:1170px){.give-nav,.profile-nav{margin-right:0}}.give-nav::-webkit-scrollbar,.profile-nav::-webkit-scrollbar{width:0}.give-nav ul:last-of-type,.profile-nav ul:last-of-type{padding-bottom:30px}.give-nav{background-image:url(https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress)}.profile-nav:after{background-color:rgba(0,0,0,.75);content:\" \";z-index:-1}.profile-nav .profile-nav-img,.profile-nav:after{height:100%;left:0;position:absolute;top:0;width:100%}.profile-nav .profile-nav-img{background-position:top;background-repeat:no-repeat;background-size:contain;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-filter:blur(2px);filter:blur(2px);z-index:-2}\@media (min-width:992px){.profile-nav div{padding-bottom:0}}"; }, enumerable: !0, configurable: !0 }), e; }(), extendStatics = function (e, t) { return (extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var r in t)
    t.hasOwnProperty(r) && (e[r] = t[r]); })(e, t); };
exports.GiveNav = GiveMenu;
function __extends(e, t) { function r() { this.constructor = e; } extendStatics(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r); }
function isFunction(e) { return "function" == typeof e; }
var _enable_super_gross_mode_that_will_cause_bad_things = !1, config = { Promise: void 0, set useDeprecatedSynchronousErrorHandling(e) { _enable_super_gross_mode_that_will_cause_bad_things = e; }, get useDeprecatedSynchronousErrorHandling() { return _enable_super_gross_mode_that_will_cause_bad_things; } };
function hostReportError(e) { setTimeout(function () { throw e; }, 0); }
var empty = { closed: !0, next: function (e) { }, error: function (e) { if (config.useDeprecatedSynchronousErrorHandling)
        throw e; hostReportError(e); }, complete: function () { } }, isArray = Array.isArray || function (e) { return e && "number" == typeof e.length; };
function isObject(e) { return null !== e && "object" == typeof e; }
function UnsubscriptionErrorImpl(e) { return Error.call(this), this.message = e ? e.length + " errors occurred during unsubscription:\n" + e.map(function (e, t) { return t + 1 + ") " + e.toString(); }).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = e, this; }
UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
var UnsubscriptionError = UnsubscriptionErrorImpl, Subscription = function () { function e(e) { this.closed = !1, this._parentOrParents = null, this._subscriptions = null, e && (this._unsubscribe = e); } var t; return e.prototype.unsubscribe = function () { var t; if (!this.closed) {
    var r = this._parentOrParents, n = this._unsubscribe, o = this._subscriptions;
    if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, r instanceof e)
        r.remove(this);
    else if (null !== r)
        for (var i = 0; i < r.length; ++i)
            r[i].remove(this);
    if (isFunction(n))
        try {
            n.call(this);
        }
        catch (e) {
            t = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
        }
    if (isArray(o)) {
        i = -1;
        for (var s = o.length; ++i < s;) {
            var a = o[i];
            if (isObject(a))
                try {
                    a.unsubscribe();
                }
                catch (e) {
                    t = t || [], e instanceof UnsubscriptionError ? t = t.concat(flattenUnsubscriptionErrors(e.errors)) : t.push(e);
                }
        }
    }
    if (t)
        throw new UnsubscriptionError(t);
} }, e.prototype.add = function (t) { var r = t; switch (typeof t) {
    case "function": r = new e(t);
    case "object":
        if (r === this || r.closed || "function" != typeof r.unsubscribe)
            return r;
        if (this.closed)
            return r.unsubscribe(), r;
        if (!(r instanceof e)) {
            var n = r;
            (r = new e)._subscriptions = [n];
        }
        break;
    default:
        if (!t)
            return e.EMPTY;
        throw new Error("unrecognized teardown " + t + " added to Subscription.");
} var o = r._parentOrParents; if (null === o)
    r._parentOrParents = this;
else if (o instanceof e) {
    if (o === this)
        return r;
    r._parentOrParents = [o, this];
}
else {
    if (-1 !== o.indexOf(this))
        return r;
    o.push(this);
} var i = this._subscriptions; return null === i ? this._subscriptions = [r] : i.push(r), r; }, e.prototype.remove = function (e) { var t = this._subscriptions; if (t) {
    var r = t.indexOf(e);
    -1 !== r && t.splice(r, 1);
} }, e.EMPTY = ((t = new e).closed = !0, t), e; }();
function flattenUnsubscriptionErrors(e) { return e.reduce(function (e, t) { return e.concat(t instanceof UnsubscriptionError ? t.errors : t); }, []); }
var rxSubscriber = "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random(), Subscriber = function (e) { function t(r, n, o) { var i = e.call(this) || this; switch (i.syncErrorValue = null, i.syncErrorThrown = !1, i.syncErrorThrowable = !1, i.isStopped = !1, arguments.length) {
    case 0:
        i.destination = empty;
        break;
    case 1:
        if (!r) {
            i.destination = empty;
            break;
        }
        if ("object" == typeof r) {
            r instanceof t ? (i.syncErrorThrowable = r.syncErrorThrowable, i.destination = r, r.add(i)) : (i.syncErrorThrowable = !0, i.destination = new SafeSubscriber(i, r));
            break;
        }
    default: i.syncErrorThrowable = !0, i.destination = new SafeSubscriber(i, r, n, o);
} return i; } return __extends(t, e), t.prototype[rxSubscriber] = function () { return this; }, t.create = function (e, r, n) { var o = new t(e, r, n); return o.syncErrorThrowable = !1, o; }, t.prototype.next = function (e) { this.isStopped || this._next(e); }, t.prototype.error = function (e) { this.isStopped || (this.isStopped = !0, this._error(e)); }, t.prototype.complete = function () { this.isStopped || (this.isStopped = !0, this._complete()); }, t.prototype.unsubscribe = function () { this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this)); }, t.prototype._next = function (e) { this.destination.next(e); }, t.prototype._error = function (e) { this.destination.error(e), this.unsubscribe(); }, t.prototype._complete = function () { this.destination.complete(), this.unsubscribe(); }, t.prototype._unsubscribeAndRecycle = function () { var e = this._parentOrParents; return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = e, this; }, t; }(Subscription), SafeSubscriber = function (e) { function t(t, r, n, o) { var i, s = e.call(this) || this; s._parentSubscriber = t; var a = s; return isFunction(r) ? i = r : r && (i = r.next, n = r.error, o = r.complete, r !== empty && (isFunction((a = Object.create(r)).unsubscribe) && s.add(a.unsubscribe.bind(a)), a.unsubscribe = s.unsubscribe.bind(s))), s._context = a, s._next = i, s._error = n, s._complete = o, s; } return __extends(t, e), t.prototype.next = function (e) { if (!this.isStopped && this._next) {
    var t = this._parentSubscriber;
    config.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe() : this.__tryOrUnsub(this._next, e);
} }, t.prototype.error = function (e) { if (!this.isStopped) {
    var t = this._parentSubscriber, r = config.useDeprecatedSynchronousErrorHandling;
    if (this._error)
        r && t.syncErrorThrowable ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe()) : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
    else if (t.syncErrorThrowable)
        r ? (t.syncErrorValue = e, t.syncErrorThrown = !0) : hostReportError(e), this.unsubscribe();
    else {
        if (this.unsubscribe(), r)
            throw e;
        hostReportError(e);
    }
} }, t.prototype.complete = function () { var e = this; if (!this.isStopped) {
    var t = this._parentSubscriber;
    if (this._complete) {
        var r = function () { return e._complete.call(e._context); };
        config.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? (this.__tryOrSetError(t, r), this.unsubscribe()) : (this.__tryOrUnsub(r), this.unsubscribe());
    }
    else
        this.unsubscribe();
} }, t.prototype.__tryOrUnsub = function (e, t) { try {
    e.call(this._context, t);
}
catch (e) {
    if (this.unsubscribe(), config.useDeprecatedSynchronousErrorHandling)
        throw e;
    hostReportError(e);
} }, t.prototype.__tryOrSetError = function (e, t, r) { if (!config.useDeprecatedSynchronousErrorHandling)
    throw new Error("bad call"); try {
    t.call(this._context, r);
}
catch (t) {
    return config.useDeprecatedSynchronousErrorHandling ? (e.syncErrorValue = t, e.syncErrorThrown = !0, !0) : (hostReportError(t), !0);
} return !1; }, t.prototype._unsubscribe = function () { var e = this._parentSubscriber; this._context = null, this._parentSubscriber = null, e.unsubscribe(); }, t; }(Subscriber);
function canReportError(e) { for (; e;) {
    var t = e.destination;
    if (e.closed || e.isStopped)
        return !1;
    e = t && t instanceof Subscriber ? t : null;
} return !0; }
function toSubscriber(e, t, r) { if (e) {
    if (e instanceof Subscriber)
        return e;
    if (e[rxSubscriber])
        return e[rxSubscriber]();
} return e || t || r ? new Subscriber(e, t, r) : new Subscriber(empty); }
var observable = "function" == typeof Symbol && Symbol.observable || "@@observable";
function noop() { }
function pipeFromArray(e) { return e ? 1 === e.length ? e[0] : function (t) { return e.reduce(function (e, t) { return t(e); }, t); } : noop; }
var Observable = function () { function e(e) { this._isScalar = !1, e && (this._subscribe = e); } return e.prototype.lift = function (t) { var r = new e; return r.source = this, r.operator = t, r; }, e.prototype.subscribe = function (e, t, r) { var n = this.operator, o = toSubscriber(e, t, r); if (o.add(n ? n.call(o, this.source) : this.source || config.useDeprecatedSynchronousErrorHandling && !o.syncErrorThrowable ? this._subscribe(o) : this._trySubscribe(o)), config.useDeprecatedSynchronousErrorHandling && o.syncErrorThrowable && (o.syncErrorThrowable = !1, o.syncErrorThrown))
    throw o.syncErrorValue; return o; }, e.prototype._trySubscribe = function (e) { try {
    return this._subscribe(e);
}
catch (t) {
    config.useDeprecatedSynchronousErrorHandling && (e.syncErrorThrown = !0, e.syncErrorValue = t), canReportError(e) ? e.error(t) : console.warn(t);
} }, e.prototype.forEach = function (e, t) { var r = this; return new (t = getPromiseCtor(t))(function (t, n) { var o; o = r.subscribe(function (t) { try {
    e(t);
}
catch (e) {
    n(e), o && o.unsubscribe();
} }, n, t); }); }, e.prototype._subscribe = function (e) { var t = this.source; return t && t.subscribe(e); }, e.prototype[observable] = function () { return this; }, e.prototype.pipe = function () { for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t]; return 0 === e.length ? this : pipeFromArray(e)(this); }, e.prototype.toPromise = function (e) { var t = this; return new (e = getPromiseCtor(e))(function (e, r) { var n; t.subscribe(function (e) { return n = e; }, function (e) { return r(e); }, function () { return e(n); }); }); }, e.create = function (t) { return new e(t); }, e; }();
function getPromiseCtor(e) { if (e || (e = config.Promise || Promise), !e)
    throw new Error("no Promise impl found"); return e; }
function ObjectUnsubscribedErrorImpl() { return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this; }
ObjectUnsubscribedErrorImpl.prototype = Object.create(Error.prototype);
var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl, SubjectSubscription = function (e) { function t(t, r) { var n = e.call(this) || this; return n.subject = t, n.subscriber = r, n.closed = !1, n; } return __extends(t, e), t.prototype.unsubscribe = function () { if (!this.closed) {
    this.closed = !0;
    var e = this.subject, t = e.observers;
    if (this.subject = null, t && 0 !== t.length && !e.isStopped && !e.closed) {
        var r = t.indexOf(this.subscriber);
        -1 !== r && t.splice(r, 1);
    }
} }, t; }(Subscription), SubjectSubscriber = function (e) { function t(t) { var r = e.call(this, t) || this; return r.destination = t, r; } return __extends(t, e), t; }(Subscriber), Subject = function (e) { function t() { var t = e.call(this) || this; return t.observers = [], t.closed = !1, t.isStopped = !1, t.hasError = !1, t.thrownError = null, t; } return __extends(t, e), t.prototype[rxSubscriber] = function () { return new SubjectSubscriber(this); }, t.prototype.lift = function (e) { var t = new AnonymousSubject(this, this); return t.operator = e, t; }, t.prototype.next = function (e) { if (this.closed)
    throw new ObjectUnsubscribedError; if (!this.isStopped)
    for (var t = this.observers, r = t.length, n = t.slice(), o = 0; o < r; o++)
        n[o].next(e); }, t.prototype.error = function (e) { if (this.closed)
    throw new ObjectUnsubscribedError; this.hasError = !0, this.thrownError = e, this.isStopped = !0; for (var t = this.observers, r = t.length, n = t.slice(), o = 0; o < r; o++)
    n[o].error(e); this.observers.length = 0; }, t.prototype.complete = function () { if (this.closed)
    throw new ObjectUnsubscribedError; this.isStopped = !0; for (var e = this.observers, t = e.length, r = e.slice(), n = 0; n < t; n++)
    r[n].complete(); this.observers.length = 0; }, t.prototype.unsubscribe = function () { this.isStopped = !0, this.closed = !0, this.observers = null; }, t.prototype._trySubscribe = function (t) { if (this.closed)
    throw new ObjectUnsubscribedError; return e.prototype._trySubscribe.call(this, t); }, t.prototype._subscribe = function (e) { if (this.closed)
    throw new ObjectUnsubscribedError; return this.hasError ? (e.error(this.thrownError), Subscription.EMPTY) : this.isStopped ? (e.complete(), Subscription.EMPTY) : (this.observers.push(e), new SubjectSubscription(this, e)); }, t.prototype.asObservable = function () { var e = new Observable; return e.source = this, e; }, t.create = function (e, t) { return new AnonymousSubject(e, t); }, t; }(Observable), AnonymousSubject = function (e) { function t(t, r) { var n = e.call(this) || this; return n.destination = t, n.source = r, n; } return __extends(t, e), t.prototype.next = function (e) { var t = this.destination; t && t.next && t.next(e); }, t.prototype.error = function (e) { var t = this.destination; t && t.error && this.destination.error(e); }, t.prototype.complete = function () { var e = this.destination; e && e.complete && this.destination.complete(); }, t.prototype._subscribe = function (e) { return this.source ? this.source.subscribe(e) : Subscription.EMPTY; }, t; }(Subject);
function refCount() { return function (e) { return e.lift(new RefCountOperator(e)); }; }
var RefCountOperator = function () { function e(e) { this.connectable = e; } return e.prototype.call = function (e, t) { var r = this.connectable; r._refCount++; var n = new RefCountSubscriber(e, r), o = t.subscribe(n); return n.closed || (n.connection = r.connect()), o; }, e; }(), RefCountSubscriber = function (e) { function t(t, r) { var n = e.call(this, t) || this; return n.connectable = r, n; } return __extends(t, e), t.prototype._unsubscribe = function () { var e = this.connectable; if (e) {
    this.connectable = null;
    var t = e._refCount;
    if (t <= 0)
        this.connection = null;
    else if (e._refCount = t - 1, t > 1)
        this.connection = null;
    else {
        var r = this.connection, n = e._connection;
        this.connection = null, !n || r && n !== r || n.unsubscribe();
    }
}
else
    this.connection = null; }, t; }(Subscriber), ConnectableObservable = function (e) { function t(t, r) { var n = e.call(this) || this; return n.source = t, n.subjectFactory = r, n._refCount = 0, n._isComplete = !1, n; } return __extends(t, e), t.prototype._subscribe = function (e) { return this.getSubject().subscribe(e); }, t.prototype.getSubject = function () { var e = this._subject; return e && !e.isStopped || (this._subject = this.subjectFactory()), this._subject; }, t.prototype.connect = function () { var e = this._connection; return e || (this._isComplete = !1, (e = this._connection = new Subscription).add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this))), e.closed && (this._connection = null, e = Subscription.EMPTY)), e; }, t.prototype.refCount = function () { return refCount()(this); }, t; }(Observable), connectableProto = ConnectableObservable.prototype, connectableObservableDescriptor = { operator: { value: null }, _refCount: { value: 0, writable: !0 }, _subject: { value: null, writable: !0 }, _connection: { value: null, writable: !0 }, _subscribe: { value: connectableProto._subscribe }, _isComplete: { value: connectableProto._isComplete, writable: !0 }, getSubject: { value: connectableProto.getSubject }, connect: { value: connectableProto.connect }, refCount: { value: connectableProto.refCount } }, ConnectableSubscriber = function (e) { function t(t, r) { var n = e.call(this, t) || this; return n.connectable = r, n; } return __extends(t, e), t.prototype._error = function (t) { this._unsubscribe(), e.prototype._error.call(this, t); }, t.prototype._complete = function () { this.connectable._isComplete = !0, this._unsubscribe(), e.prototype._complete.call(this); }, t.prototype._unsubscribe = function () { var e = this.connectable; if (e) {
    this.connectable = null;
    var t = e._connection;
    e._refCount = 0, e._subject = null, e._connection = null, t && t.unsubscribe();
} }, t; }(SubjectSubscriber), BehaviorSubject = function (e) { function t(t) { var r = e.call(this) || this; return r._value = t, r; } return __extends(t, e), Object.defineProperty(t.prototype, "value", { get: function () { return this.getValue(); }, enumerable: !0, configurable: !0 }), t.prototype._subscribe = function (t) { var r = e.prototype._subscribe.call(this, t); return r && !r.closed && t.next(this._value), r; }, t.prototype.getValue = function () { if (this.hasError)
    throw this.thrownError; if (this.closed)
    throw new ObjectUnsubscribedError; return this._value; }, t.prototype.next = function (t) { e.prototype.next.call(this, this._value = t); }, t; }(Subject), EMPTY = new Observable(function (e) { return e.complete(); });
function empty$1(e) { return e ? emptyScheduled(e) : EMPTY; }
function emptyScheduled(e) { return new Observable(function (t) { return e.schedule(function () { return t.complete(); }); }); }
function isScheduler(e) { return e && "function" == typeof e.schedule; }
var subscribeToArray = function (e) { return function (t) { for (var r = 0, n = e.length; r < n && !t.closed; r++)
    t.next(e[r]); t.complete(); }; };
function scheduleArray(e, t) { return new Observable(function (r) { var n = new Subscription, o = 0; return n.add(t.schedule(function () { o !== e.length ? (r.next(e[o++]), r.closed || n.add(this.schedule())) : r.complete(); })), n; }); }
function fromArray(e, t) { return t ? scheduleArray(e, t) : new Observable(subscribeToArray(e)); }
function of() { for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t]; var r = e[e.length - 1]; return isScheduler(r) ? (e.pop(), scheduleArray(e, r)) : fromArray(e); }
function identity(e) { return e; }
function isObservable(e) { return !!e && (e instanceof Observable || "function" == typeof e.lift && "function" == typeof e.subscribe); }
function ArgumentOutOfRangeErrorImpl() { return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this; }
ArgumentOutOfRangeErrorImpl.prototype = Object.create(Error.prototype);
var ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;
function EmptyErrorImpl() { return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", this; }
EmptyErrorImpl.prototype = Object.create(Error.prototype);
var EmptyError = EmptyErrorImpl;
function map(e, t) { return function (r) { if ("function" != typeof e)
    throw new TypeError("argument is not a function. Are you looking for `mapTo()`?"); return r.lift(new MapOperator(e, t)); }; }
var MapOperator = function () { function e(e, t) { this.project = e, this.thisArg = t; } return e.prototype.call = function (e, t) { return t.subscribe(new MapSubscriber(e, this.project, this.thisArg)); }, e; }(), MapSubscriber = function (e) { function t(t, r, n) { var o = e.call(this, t) || this; return o.project = r, o.count = 0, o.thisArg = n || o, o; } return __extends(t, e), t.prototype._next = function (e) { var t; try {
    t = this.project.call(this.thisArg, e, this.count++);
}
catch (e) {
    return void this.destination.error(e);
} this.destination.next(t); }, t; }(Subscriber), OuterSubscriber = function (e) { function t() { return null !== e && e.apply(this, arguments) || this; } return __extends(t, e), t.prototype.notifyNext = function (e, t, r, n, o) { this.destination.next(t); }, t.prototype.notifyError = function (e, t) { this.destination.error(e); }, t.prototype.notifyComplete = function (e) { this.destination.complete(); }, t; }(Subscriber), InnerSubscriber = function (e) { function t(t, r, n) { var o = e.call(this) || this; return o.parent = t, o.outerValue = r, o.outerIndex = n, o.index = 0, o; } return __extends(t, e), t.prototype._next = function (e) { this.parent.notifyNext(this.outerValue, e, this.outerIndex, this.index++, this); }, t.prototype._error = function (e) { this.parent.notifyError(e, this), this.unsubscribe(); }, t.prototype._complete = function () { this.parent.notifyComplete(this), this.unsubscribe(); }, t; }(Subscriber), subscribeToPromise = function (e) { return function (t) { return e.then(function (e) { t.closed || (t.next(e), t.complete()); }, function (e) { return t.error(e); }).then(null, hostReportError), t; }; };
function getSymbolIterator() { return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"; }
var iterator = getSymbolIterator(), subscribeToIterable = function (e) { return function (t) { for (var r = e[iterator]();;) {
    var n = r.next();
    if (n.done) {
        t.complete();
        break;
    }
    if (t.next(n.value), t.closed)
        break;
} return "function" == typeof r.return && t.add(function () { r.return && r.return(); }), t; }; }, subscribeToObservable = function (e) { return function (t) { var r = e[observable](); if ("function" != typeof r.subscribe)
    throw new TypeError("Provided object does not correctly implement Symbol.observable"); return r.subscribe(t); }; }, isArrayLike = function (e) { return e && "number" == typeof e.length && "function" != typeof e; };
function isPromise(e) { return !!e && "function" != typeof e.subscribe && "function" == typeof e.then; }
var subscribeTo = function (e) { if (e && "function" == typeof e[observable])
    return subscribeToObservable(e); if (isArrayLike(e))
    return subscribeToArray(e); if (isPromise(e))
    return subscribeToPromise(e); if (e && "function" == typeof e[iterator])
    return subscribeToIterable(e); var t = isObject(e) ? "an invalid object" : "'" + e + "'"; throw new TypeError("You provided " + t + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable."); };
function subscribeToResult(e, t, r, n, o) { if (void 0 === o && (o = new InnerSubscriber(e, r, n)), !o.closed)
    return t instanceof Observable ? t.subscribe(o) : subscribeTo(t)(o); }
function scheduleObservable(e, t) { return new Observable(function (r) { var n = new Subscription; return n.add(t.schedule(function () { var o = e[observable](); n.add(o.subscribe({ next: function (e) { n.add(t.schedule(function () { return r.next(e); })); }, error: function (e) { n.add(t.schedule(function () { return r.error(e); })); }, complete: function () { n.add(t.schedule(function () { return r.complete(); })); } })); })), n; }); }
function schedulePromise(e, t) { return new Observable(function (r) { var n = new Subscription; return n.add(t.schedule(function () { return e.then(function (e) { n.add(t.schedule(function () { r.next(e), n.add(t.schedule(function () { return r.complete(); })); })); }, function (e) { n.add(t.schedule(function () { return r.error(e); })); }); })), n; }); }
function scheduleIterable(e, t) { if (!e)
    throw new Error("Iterable cannot be null"); return new Observable(function (r) { var n, o = new Subscription; return o.add(function () { n && "function" == typeof n.return && n.return(); }), o.add(t.schedule(function () { n = e[iterator](), o.add(t.schedule(function () { if (!r.closed) {
    var e, t;
    try {
        var o = n.next();
        e = o.value, t = o.done;
    }
    catch (e) {
        return void r.error(e);
    }
    t ? r.complete() : (r.next(e), this.schedule());
} })); })), o; }); }
function isInteropObservable(e) { return e && "function" == typeof e[observable]; }
function isIterable(e) { return e && "function" == typeof e[iterator]; }
function scheduled(e, t) { if (null != e) {
    if (isInteropObservable(e))
        return scheduleObservable(e, t);
    if (isPromise(e))
        return schedulePromise(e, t);
    if (isArrayLike(e))
        return scheduleArray(e, t);
    if (isIterable(e) || "string" == typeof e)
        return scheduleIterable(e, t);
} throw new TypeError((null !== e && typeof e || e) + " is not observable"); }
function from(e, t) { return t ? scheduled(e, t) : e instanceof Observable ? e : new Observable(subscribeTo(e)); }
function forkJoin() { for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t]; if (1 === e.length) {
    var r = e[0];
    if (isArray(r))
        return forkJoinInternal(r, null);
    if (isObject(r) && !isObservable(r)) {
        var n = Object.keys(r);
        return forkJoinInternal(n.map(function (e) { return r[e]; }), n);
    }
} if ("function" == typeof e[e.length - 1]) {
    var o = e.pop();
    return forkJoinInternal(e = 1 === e.length && isArray(e[0]) ? e[0] : e, null).pipe(map(function (e) { return o.apply(void 0, e); }));
} return forkJoinInternal(e, null); }
function forkJoinInternal(e, t) { return new Observable(function (r) { var n = e.length; if (0 !== n)
    for (var o = new Array(n), i = 0, s = 0, a = function (a) { var u = from(e[a]), c = !1; r.add(u.subscribe({ next: function (e) { c || (c = !0, s++), o[a] = e; }, error: function (e) { return r.error(e); }, complete: function () { ++i !== n && c || (s === n && r.next(t ? t.reduce(function (e, t, r) { return e[t] = o[r], e; }, {}) : o), r.complete()); } })); }, u = 0; u < n; u++)
        a(u);
else
    r.complete(); }); }
function filter(e, t) { return function (r) { return r.lift(new FilterOperator(e, t)); }; }
var CrdsAuthenticationProviders, FilterOperator = function () { function e(e, t) { this.predicate = e, this.thisArg = t; } return e.prototype.call = function (e, t) { return t.subscribe(new FilterSubscriber(e, this.predicate, this.thisArg)); }, e; }(), FilterSubscriber = function (e) { function t(t, r, n) { var o = e.call(this, t) || this; return o.predicate = r, o.thisArg = n, o.count = 0, o; } return __extends(t, e), t.prototype._next = function (e) { var t; try {
    t = this.predicate.call(this.thisArg, e, this.count++);
}
catch (e) {
    return void this.destination.error(e);
} t && this.destination.next(e); }, t; }(Subscriber);
function catchError(e) { return function (t) { var r = new CatchOperator(e), n = t.lift(r); return r.caught = n; }; }
!function (e) { e[e.Mp = 1] = "Mp", e[e.Okta = 2] = "Okta"; }(CrdsAuthenticationProviders || (CrdsAuthenticationProviders = {}));
var CatchOperator = function () { function e(e) { this.selector = e; } return e.prototype.call = function (e, t) { return t.subscribe(new CatchSubscriber(e, this.selector, this.caught)); }, e; }(), CatchSubscriber = function (e) { function t(t, r, n) { var o = e.call(this, t) || this; return o.selector = r, o.caught = n, o; } return __extends(t, e), t.prototype.error = function (t) { if (!this.isStopped) {
    var r = void 0;
    try {
        r = this.selector(t, this.caught);
    }
    catch (t) {
        return void e.prototype.error.call(this, t);
    }
    this._unsubscribeAndRecycle();
    var n = new InnerSubscriber(this, void 0, void 0);
    this.add(n), subscribeToResult(this, r, void 0, void 0, n);
} }, t; }(OuterSubscriber);
function defaultIfEmpty(e) { return void 0 === e && (e = null), function (t) { return t.lift(new DefaultIfEmptyOperator(e)); }; }
var DefaultIfEmptyOperator = function () { function e(e) { this.defaultValue = e; } return e.prototype.call = function (e, t) { return t.subscribe(new DefaultIfEmptySubscriber(e, this.defaultValue)); }, e; }(), DefaultIfEmptySubscriber = function (e) { function t(t, r) { var n = e.call(this, t) || this; return n.defaultValue = r, n.isEmpty = !0, n; } return __extends(t, e), t.prototype._next = function (e) { this.isEmpty = !1, this.destination.next(e); }, t.prototype._complete = function () { this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete(); }, t; }(Subscriber);
function throwIfEmpty(e) { return void 0 === e && (e = defaultErrorFactory), function (t) { return t.lift(new ThrowIfEmptyOperator(e)); }; }
var ThrowIfEmptyOperator = function () { function e(e) { this.errorFactory = e; } return e.prototype.call = function (e, t) { return t.subscribe(new ThrowIfEmptySubscriber(e, this.errorFactory)); }, e; }(), ThrowIfEmptySubscriber = function (e) { function t(t, r) { var n = e.call(this, t) || this; return n.errorFactory = r, n.hasValue = !1, n; } return __extends(t, e), t.prototype._next = function (e) { this.hasValue = !0, this.destination.next(e); }, t.prototype._complete = function () { if (this.hasValue)
    return this.destination.complete(); var e = void 0; try {
    e = this.errorFactory();
}
catch (t) {
    e = t;
} this.destination.error(e); }, t; }(Subscriber);
function defaultErrorFactory() { return new EmptyError; }
function take(e) { return function (t) { return 0 === e ? empty$1() : t.lift(new TakeOperator(e)); }; }
var TakeOperator = function () { function e(e) { if (this.total = e, this.total < 0)
    throw new ArgumentOutOfRangeError; } return e.prototype.call = function (e, t) { return t.subscribe(new TakeSubscriber(e, this.total)); }, e; }(), TakeSubscriber = function (e) { function t(t, r) { var n = e.call(this, t) || this; return n.total = r, n.count = 0, n; } return __extends(t, e), t.prototype._next = function (e) { var t = this.total, r = ++this.count; r <= t && (this.destination.next(e), r === t && (this.destination.complete(), this.unsubscribe())); }, t; }(Subscriber);
function first(e, t) { var r = arguments.length >= 2; return function (n) { return n.pipe(e ? filter(function (t, r) { return e(t, r, n); }) : identity, take(1), r ? defaultIfEmpty(t) : throwIfEmpty(function () { return new EmptyError; })); }; }
function switchMap(e, t) { return "function" == typeof t ? function (r) { return r.pipe(switchMap(function (r, n) { return from(e(r, n)).pipe(map(function (e, o) { return t(r, e, n, o); })); })); } : function (t) { return t.lift(new SwitchMapOperator(e)); }; }
var SwitchMapOperator = function () { function e(e) { this.project = e; } return e.prototype.call = function (e, t) { return t.subscribe(new SwitchMapSubscriber(e, this.project)); }, e; }(), SwitchMapSubscriber = function (e) { function t(t, r) { var n = e.call(this, t) || this; return n.project = r, n.index = 0, n; } return __extends(t, e), t.prototype._next = function (e) { var t, r = this.index++; try {
    t = this.project(e, r);
}
catch (e) {
    return void this.destination.error(e);
} this._innerSub(t, e, r); }, t.prototype._innerSub = function (e, t, r) { var n = this.innerSubscription; n && n.unsubscribe(); var o = new InnerSubscriber(this, void 0, void 0); this.destination.add(o), this.innerSubscription = subscribeToResult(this, e, t, r, o); }, t.prototype._complete = function () { var t = this.innerSubscription; t && !t.closed || e.prototype._complete.call(this), this.unsubscribe(); }, t.prototype._unsubscribe = function () { this.innerSubscription = null; }, t.prototype.notifyComplete = function (t) { this.destination.remove(t), this.innerSubscription = null, this.isStopped && e.prototype._complete.call(this); }, t.prototype.notifyNext = function (e, t, r, n, o) { this.destination.next(t); }, t; }(OuterSubscriber);
function tap(e, t, r) { return function (n) { return n.lift(new DoOperator(e, t, r)); }; }
var DoOperator = function () { function e(e, t, r) { this.nextOrObserver = e, this.error = t, this.complete = r; } return e.prototype.call = function (e, t) { return t.subscribe(new TapSubscriber(e, this.nextOrObserver, this.error, this.complete)); }, e; }(), TapSubscriber = function (e) { function t(t, r, n, o) { var i = e.call(this, t) || this; return i._tapNext = noop, i._tapError = noop, i._tapComplete = noop, i._tapError = n || noop, i._tapComplete = o || noop, isFunction(r) ? (i._context = i, i._tapNext = r) : r && (i._context = r, i._tapNext = r.next || noop, i._tapError = r.error || noop, i._tapComplete = r.complete || noop), i; } return __extends(t, e), t.prototype._next = function (e) { try {
    this._tapNext.call(this._context, e);
}
catch (e) {
    return void this.destination.error(e);
} this.destination.next(e); }, t.prototype._error = function (e) { try {
    this._tapError.call(this._context, e);
}
catch (e) {
    return void this.destination.error(e);
} this.destination.error(e); }, t.prototype._complete = function () { try {
    this._tapComplete.call(this._context);
}
catch (e) {
    return void this.destination.error(e);
} return this.destination.complete(); }, t; }(Subscriber), browserPonyfill = chunk_77ecfe7f_js_1.a(function (e, t) { var r = function (e) { function t() { this.fetch = !1; } return t.prototype = e, new t; }("undefined" != typeof self ? self : chunk_77ecfe7f_js_1.b); !function (e) { !function (t) { var r = { searchParams: "URLSearchParams" in e, iterable: "Symbol" in e && "iterator" in Symbol, blob: "FileReader" in e && "Blob" in e && function () { try {
        return new Blob, !0;
    }
    catch (e) {
        return !1;
    } }(), formData: "FormData" in e, arrayBuffer: "ArrayBuffer" in e }; if (r.arrayBuffer)
    var n = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"], o = ArrayBuffer.isView || function (e) { return e && n.indexOf(Object.prototype.toString.call(e)) > -1; }; function i(e) { if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))
    throw new TypeError("Invalid character in header field name"); return e.toLowerCase(); } function s(e) { return "string" != typeof e && (e = String(e)), e; } function a(e) { var t = { next: function () { var t = e.shift(); return { done: void 0 === t, value: t }; } }; return r.iterable && (t[Symbol.iterator] = function () { return t; }), t; } function u(e) { this.map = {}, e instanceof u ? e.forEach(function (e, t) { this.append(t, e); }, this) : Array.isArray(e) ? e.forEach(function (e) { this.append(e[0], e[1]); }, this) : e && Object.getOwnPropertyNames(e).forEach(function (t) { this.append(t, e[t]); }, this); } function c(e) { if (e.bodyUsed)
    return Promise.reject(new TypeError("Already read")); e.bodyUsed = !0; } function l(e) { return new Promise(function (t, r) { e.onload = function () { t(e.result); }, e.onerror = function () { r(e.error); }; }); } function h(e) { var t = new FileReader, r = l(t); return t.readAsArrayBuffer(e), r; } function p(e) { if (e.slice)
    return e.slice(0); var t = new Uint8Array(e.byteLength); return t.set(new Uint8Array(e)), t.buffer; } function f() { return this.bodyUsed = !1, this._initBody = function (e) { var t; this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : r.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : r.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : r.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : r.arrayBuffer && r.blob && (t = e) && DataView.prototype.isPrototypeOf(t) ? (this._bodyArrayBuffer = p(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : r.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || o(e)) ? this._bodyArrayBuffer = p(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : r.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8")); }, r.blob && (this.blob = function () { var e = c(this); if (e)
    return e; if (this._bodyBlob)
    return Promise.resolve(this._bodyBlob); if (this._bodyArrayBuffer)
    return Promise.resolve(new Blob([this._bodyArrayBuffer])); if (this._bodyFormData)
    throw new Error("could not read FormData body as blob"); return Promise.resolve(new Blob([this._bodyText])); }, this.arrayBuffer = function () { return this._bodyArrayBuffer ? c(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(h); }), this.text = function () { var e, t, r, n = c(this); if (n)
    return n; if (this._bodyBlob)
    return e = this._bodyBlob, r = l(t = new FileReader), t.readAsText(e), r; if (this._bodyArrayBuffer)
    return Promise.resolve(function (e) { for (var t = new Uint8Array(e), r = new Array(t.length), n = 0; n < t.length; n++)
        r[n] = String.fromCharCode(t[n]); return r.join(""); }(this._bodyArrayBuffer)); if (this._bodyFormData)
    throw new Error("could not read FormData body as text"); return Promise.resolve(this._bodyText); }, r.formData && (this.formData = function () { return this.text().then(g); }), this.json = function () { return this.text().then(JSON.parse); }, this; } u.prototype.append = function (e, t) { e = i(e), t = s(t); var r = this.map[e]; this.map[e] = r ? r + ", " + t : t; }, u.prototype.delete = function (e) { delete this.map[i(e)]; }, u.prototype.get = function (e) { return e = i(e), this.has(e) ? this.map[e] : null; }, u.prototype.has = function (e) { return this.map.hasOwnProperty(i(e)); }, u.prototype.set = function (e, t) { this.map[i(e)] = s(t); }, u.prototype.forEach = function (e, t) { for (var r in this.map)
    this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this); }, u.prototype.keys = function () { var e = []; return this.forEach(function (t, r) { e.push(r); }), a(e); }, u.prototype.values = function () { var e = []; return this.forEach(function (t) { e.push(t); }), a(e); }, u.prototype.entries = function () { var e = []; return this.forEach(function (t, r) { e.push([r, t]); }), a(e); }, r.iterable && (u.prototype[Symbol.iterator] = u.prototype.entries); var d = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"]; function v(e, t) { var r, n, o = (t = t || {}).body; if (e instanceof v) {
    if (e.bodyUsed)
        throw new TypeError("Already read");
    this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new u(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, o || null == e._bodyInit || (o = e._bodyInit, e.bodyUsed = !0);
}
else
    this.url = String(e); if (this.credentials = t.credentials || this.credentials || "same-origin", !t.headers && this.headers || (this.headers = new u(t.headers)), this.method = (n = (r = t.method || this.method || "GET").toUpperCase(), d.indexOf(n) > -1 ? n : r), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && o)
    throw new TypeError("Body not allowed for GET or HEAD requests"); this._initBody(o); } function g(e) { var t = new FormData; return e.trim().split("&").forEach(function (e) { if (e) {
    var r = e.split("="), n = r.shift().replace(/\+/g, " "), o = r.join("=").replace(/\+/g, " ");
    t.append(decodeURIComponent(n), decodeURIComponent(o));
} }), t; } function b(e, t) { t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new u(t.headers), this.url = t.url || "", this._initBody(e); } v.prototype.clone = function () { return new v(this, { body: this._bodyInit }); }, f.call(v.prototype), f.call(b.prototype), b.prototype.clone = function () { return new b(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new u(this.headers), url: this.url }); }, b.error = function () { var e = new b(null, { status: 0, statusText: "" }); return e.type = "error", e; }; var y = [301, 302, 303, 307, 308]; b.redirect = function (e, t) { if (-1 === y.indexOf(t))
    throw new RangeError("Invalid status code"); return new b(null, { status: t, headers: { location: e } }); }, t.DOMException = e.DOMException; try {
    new t.DOMException;
}
catch (e) {
    t.DOMException = function (e, t) { this.message = e, this.name = t; var r = Error(e); this.stack = r.stack; }, t.DOMException.prototype = Object.create(Error.prototype), t.DOMException.prototype.constructor = t.DOMException;
} function m(e, n) { return new Promise(function (o, i) { var s = new v(e, n); if (s.signal && s.signal.aborted)
    return i(new t.DOMException("Aborted", "AbortError")); var a = new XMLHttpRequest; function c() { a.abort(); } a.onload = function () { var e, t, r = { status: a.status, statusText: a.statusText, headers: (e = a.getAllResponseHeaders() || "", t = new u, e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (e) { var r = e.split(":"), n = r.shift().trim(); if (n) {
        var o = r.join(":").trim();
        t.append(n, o);
    } }), t) }; r.url = "responseURL" in a ? a.responseURL : r.headers.get("X-Request-URL"), o(new b("response" in a ? a.response : a.responseText, r)); }, a.onerror = function () { i(new TypeError("Network request failed")); }, a.ontimeout = function () { i(new TypeError("Network request failed")); }, a.onabort = function () { i(new t.DOMException("Aborted", "AbortError")); }, a.open(s.method, s.url, !0), "include" === s.credentials ? a.withCredentials = !0 : "omit" === s.credentials && (a.withCredentials = !1), "responseType" in a && r.blob && (a.responseType = "blob"), s.headers.forEach(function (e, t) { a.setRequestHeader(t, e); }), s.signal && (s.signal.addEventListener("abort", c), a.onreadystatechange = function () { 4 === a.readyState && s.signal.removeEventListener("abort", c); }), a.send(void 0 === s._bodyInit ? null : s._bodyInit); }); } m.polyfill = !0, e.fetch || (e.fetch = m, e.Headers = u, e.Request = v, e.Response = b), t.Headers = u, t.Request = v, t.Response = b, t.fetch = m; }({}); }(r), delete r.fetch.polyfill, (t = r.fetch).default = r.fetch, t.fetch = r.fetch, t.Headers = r.Headers, t.Request = r.Request, t.Response = r.Response, e.exports = t; }), browserPonyfill_1 = browserPonyfill.fetch, browserPonyfill_2 = browserPonyfill.Headers, browserPonyfill_3 = browserPonyfill.Request, browserPonyfill_4 = browserPonyfill.Response;
function fetchRequest(e, t, r) { var n = r.data, o = r.headers || {}; return "application/json" === (o["Content-Type"] || o["content-type"] || "") && n && "string" != typeof n && (n = JSON.stringify(n)), browserPonyfill(t, { method: e, headers: r.headers, body: n, credentials: !1 === r.withCredentials ? "omit" : "include" }).then(function (e) { var t = !e.ok, r = e.status, n = function (e) { var n = { responseText: e, status: r }; if (t)
    throw n; return n; }; return e.headers.get("Content-Type") && e.headers.get("Content-Type").toLowerCase().indexOf("application/json") >= 0 ? e.json().then(n) : e.text().then(n); }); }
var fetchRequest_1 = fetchRequest, js_cookie = chunk_77ecfe7f_js_1.a(function (e, t) { e.exports = function () { function e() { for (var e = 0, t = {}; e < arguments.length; e++) {
    var r = arguments[e];
    for (var n in r)
        t[n] = r[n];
} return t; } return function t(r) { function n(t, o, i) { var s; if ("undefined" != typeof document) {
    if (arguments.length > 1) {
        if ("number" == typeof (i = e({ path: "/" }, n.defaults, i)).expires) {
            var a = new Date;
            a.setMilliseconds(a.getMilliseconds() + 864e5 * i.expires), i.expires = a;
        }
        i.expires = i.expires ? i.expires.toUTCString() : "";
        try {
            s = JSON.stringify(o), /^[\{\[]/.test(s) && (o = s);
        }
        catch (e) { }
        o = r.write ? r.write(o, t) : encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = (t = (t = encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
        var u = "";
        for (var c in i)
            i[c] && (u += "; " + c, !0 !== i[c] && (u += "=" + i[c]));
        return document.cookie = t + "=" + o + u;
    }
    t || (s = {});
    for (var l = document.cookie ? document.cookie.split("; ") : [], h = /(%[0-9A-Z]{2})+/g, p = 0; p < l.length; p++) {
        var f = l[p].split("="), d = f.slice(1).join("=");
        this.json || '"' !== d.charAt(0) || (d = d.slice(1, -1));
        try {
            var v = f[0].replace(h, decodeURIComponent);
            if (d = r.read ? r.read(d, v) : r(d, v) || d.replace(h, decodeURIComponent), this.json)
                try {
                    d = JSON.parse(d);
                }
                catch (e) { }
            if (t === v) {
                s = d;
                break;
            }
            t || (s[v] = d);
        }
        catch (e) { }
    }
    return s;
} } return n.set = n, n.get = function (e) { return n.call(n, e); }, n.getJSON = function () { return n.apply({ json: !0 }, [].slice.call(arguments)); }, n.defaults = {}, n.remove = function (t, r) { n(t, "", e(r, { expires: -1 })); }, n.withConverter = t, n; }(function () { }); }(); });
function AuthSdkError(e, t) { this.name = "AuthSdkError", this.message = e, this.errorCode = "INTERNAL", this.errorSummary = e, this.errorLink = "INTERNAL", this.errorId = "INTERNAL", this.errorCauses = [], t && (this.xhr = t); }
AuthSdkError.prototype = new Error;
var AuthSdkError_1 = AuthSdkError;
function storageBuilder(e, t) { if ("string" != typeof t || !t.length)
    throw new AuthSdkError_1('"storageName" is required'); function r() { var r = e.getItem(t); r = r || "{}"; try {
    return JSON.parse(r);
}
catch (e) {
    throw new AuthSdkError_1("Unable to parse storage string: " + t);
} } function n(r) { try {
    var n = JSON.stringify(r);
    e.setItem(t, n);
}
catch (e) {
    throw new AuthSdkError_1("Unable to set storage: " + t);
} } return { getStorage: r, setStorage: n, clearStorage: function (e) { e || n({}); var t = r(); delete t[e], n(t); }, updateStorage: function (e, t) { var o = r(); o[e] = t, n(o); } }; }
var storageBuilder_1 = storageBuilder, config$1 = { STATE_TOKEN_KEY_NAME: "oktaStateToken", DEFAULT_POLLING_DELAY: 500, DEFAULT_MAX_CLOCK_SKEW: 300, DEFAULT_CACHE_DURATION: 86400, FRAME_ID: "okta-oauth-helper-frame", REDIRECT_OAUTH_PARAMS_COOKIE_NAME: "okta-oauth-redirect-params", REDIRECT_STATE_COOKIE_NAME: "okta-oauth-state", REDIRECT_NONCE_COOKIE_NAME: "okta-oauth-nonce", TOKEN_STORAGE_NAME: "okta-token-storage", CACHE_STORAGE_NAME: "okta-cache-storage", PKCE_STORAGE_NAME: "okta-pkce-storage", SDK_VERSION: "2.6.0" }, storageUtil = { browserHasLocalStorage: function () { try {
        var e = storageUtil.getLocalStorage();
        return storageUtil.testStorage(e);
    }
    catch (e) {
        return !1;
    } }, browserHasSessionStorage: function () { try {
        var e = storageUtil.getSessionStorage();
        return storageUtil.testStorage(e);
    }
    catch (e) {
        return !1;
    } }, getPKCEStorage: function () { return storageUtil.browserHasLocalStorage() ? storageBuilder_1(storageUtil.getLocalStorage(), config$1.PKCE_STORAGE_NAME) : storageUtil.browserHasSessionStorage() ? storageBuilder_1(storageUtil.getSessionStorage(), config$1.PKCE_STORAGE_NAME) : storageBuilder_1(storageUtil.getCookieStorage(), config$1.PKCE_STORAGE_NAME); }, getHttpCache: function () { return storageUtil.browserHasLocalStorage() ? storageBuilder_1(storageUtil.getLocalStorage(), config$1.CACHE_STORAGE_NAME) : storageUtil.browserHasSessionStorage() ? storageBuilder_1(storageUtil.getSessionStorage(), config$1.CACHE_STORAGE_NAME) : storageBuilder_1(storageUtil.getCookieStorage(), config$1.CACHE_STORAGE_NAME); }, getLocalStorage: function () { return localStorage; }, getSessionStorage: function () { return sessionStorage; }, getCookieStorage: function (e) { return e = e || {}, { getItem: storageUtil.storage.get, setItem: function (t, r) { storageUtil.storage.set(t, r, "2200-01-01T00:00:00.000Z", e.secure); } }; }, testStorage: function (e) { var t = "okta-test-storage"; try {
        return e.setItem(t, t), e.removeItem(t), !0;
    }
    catch (e) {
        return !1;
    } } };
storageUtil.storage = { set: function (e, t, r, n) { var o = { path: "/", secure: n }; return Date.parse(r) && (o.expires = new Date(r)), js_cookie.set(e, t, o), storageUtil.storage.get(e); }, get: function (e) { return js_cookie.get(e); }, delete: function (e) { return js_cookie.remove(e, { path: "/" }); } };
var browserStorage = storageUtil, base64 = chunk_77ecfe7f_js_1.a(function (e, t) { !function () { var e = t, r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; function n(e) { this.message = e; } (n.prototype = new Error).name = "InvalidCharacterError", e.btoa || (e.btoa = function (e) { for (var t, o, i = String(e), s = 0, a = r, u = ""; i.charAt(0 | s) || (a = "=", s % 1); u += a.charAt(63 & t >> 8 - s % 1 * 8)) {
    if ((o = i.charCodeAt(s += .75)) > 255)
        throw new n("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
    t = t << 8 | o;
} return u; }), e.atob || (e.atob = function (e) { var t = String(e).replace(/=+$/, ""); if (t.length % 4 == 1)
    throw new n("'atob' failed: The string to be decoded is not correctly encoded."); for (var o, i, s = 0, a = 0, u = ""; i = t.charAt(a++); ~i && (o = s % 4 ? 64 * o + i : i, s++ % 4) ? u += String.fromCharCode(255 & o >> (-2 * s & 6)) : 0)
    i = r.indexOf(i); return u; }); }(); });
Array.prototype.indexOf || (Array.prototype.indexOf = function (e, t) { var r; if (null == this)
    throw new TypeError('"this" is null or not defined'); var n = Object(this), o = n.length >>> 0; if (0 === o)
    return -1; var i = +t || 0; if (Math.abs(i) === 1 / 0 && (i = 0), i >= o)
    return -1; for (r = Math.max(i >= 0 ? i : o - Math.abs(i), 0); r < o;) {
    if (r in n && n[r] === e)
        return r;
    r++;
} return -1; }), Array.isArray || (Array.isArray = function (e) { return "[object Array]" === Object.prototype.toString.call(e); });
var util_1 = chunk_77ecfe7f_js_1.a(function (e) { var t = e.exports; t.stringToBase64Url = function (e) { var r = btoa(e); return t.base64ToBase64Url(r); }, t.base64ToBase64Url = function (e) { return e.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }, t.base64UrlToBase64 = function (e) { return e.replace(/-/g, "+").replace(/_/g, "/"); }, t.base64UrlToString = function (e) { var r = t.base64UrlToBase64(e); switch (r.length % 4) {
    case 0: break;
    case 2:
        r += "==";
        break;
    case 3:
        r += "=";
        break;
    default: throw "Not a valid Base64Url";
} var n = atob(r); try {
    return decodeURIComponent(escape(n));
}
catch (e) {
    return n;
} }, t.stringToBuffer = function (e) { for (var t = new Uint8Array(e.length), r = 0; r < e.length; r++)
    t[r] = e.charCodeAt(r); return t; }, t.base64UrlDecode = function (e) { return atob(t.base64UrlToBase64(e)); }, t.bind = function (e, t) { var r = Array.prototype.slice.call(arguments, 2); return function () { var n = Array.prototype.slice.call(arguments); return n = r.concat(n), e.apply(t, n); }; }, t.isAbsoluteUrl = function (e) { return /^(?:[a-z]+:)?\/\//i.test(e); }, t.isString = function (e) { return "[object String]" === Object.prototype.toString.call(e); }, t.isObject = function (e) { return "[object Object]" === Object.prototype.toString.call(e); }, t.isNumber = function (e) { return "[object Number]" === Object.prototype.toString.call(e); }, t.isArray = function (e) { return "[object Array]" === Object.prototype.toString.call(e); }, t.isoToUTCString = function (e) { var t = e.match(/\d+/g), r = Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]); return new Date(r).toUTCString(); }, t.toQueryParams = function (e) { var t = []; if (null !== e)
    for (var r in e)
        e.hasOwnProperty(r) && null != e[r] && t.push(r + "=" + encodeURIComponent(e[r])); return t.length ? "?" + t.join("&") : ""; }, t.genRandomString = function (e) { for (var t = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", r = "", n = 0, o = t.length; n < e; ++n)
    r += t[Math.floor(Math.random() * o)]; return r; }, t.extend = function () { var e = arguments[0]; [].slice.call(arguments, 1).forEach(function (t) { for (var r in t)
    t.hasOwnProperty(r) && (e[r] = t[r]); }); }, t.removeNils = function (e) { var t = {}; for (var r in e)
    if (e.hasOwnProperty(r)) {
        var n = e[r];
        null != n && (t[r] = n);
    } return t; }, t.clone = function (e) { if (e) {
    var t = JSON.stringify(e);
    if (t)
        return JSON.parse(t);
} return e; }, t.omit = function (e) { var r = Array.prototype.slice.call(arguments, 1), n = {}; for (var o in e)
    e.hasOwnProperty(o) && -1 == r.indexOf(o) && (n[o] = e[o]); return t.clone(n); }, t.find = function (e, t) { for (var r = e.length; r--;) {
    var n = e[r], o = !0;
    for (var i in t)
        if (t.hasOwnProperty(i) && n[i] !== t[i]) {
            o = !1;
            break;
        }
    if (o)
        return n;
} }, t.getLink = function (e, r, n) { if (e && e._links) {
    var o = t.clone(e._links[r]);
    return o && o.name && n ? o.name === n ? o : void 0 : o;
} }, t.getNativeConsole = function () { return "undefined" != typeof window ? window.console : "undefined" != typeof console ? console : void 0; }, t.getConsole = function () { var e = t.getNativeConsole(); return e && e.log ? e : { log: function () { } }; }, t.warn = function (e) { t.getConsole().log("[okta-auth-sdk] WARN: " + e); }, t.deprecate = function (e) { t.getConsole().log("[okta-auth-sdk] DEPRECATION: " + e); }, t.deprecateWrap = function (e, r) { return function () { return t.deprecate(e), r.apply(null, arguments); }; }, t.removeTrailingSlash = function (e) { if (e) {
    var t = e.replace(/^\s+|\s+$/gm, "");
    return "/" === t.slice(-1) ? t.slice(0, -1) : t;
} }, t.isIE11OrLess = function () { return !!document.documentMode && document.documentMode <= 11; }, t.isFunction = function (e) { return !!e && "[object Function]" === {}.toString.call(e); }; }), q = chunk_77ecfe7f_js_1.a(function (e, t) { var r; r = function () { var e = !1; try {
    throw new Error;
}
catch (t) {
    e = !!t.stack;
} var t, r = w(), n = function () { }, o = function () { var e = { task: void 0, next: null }, t = e, r = !1, n = void 0, i = !1, s = []; function a() { for (var t, n; e.next;)
    t = (e = e.next).task, e.task = void 0, (n = e.domain) && (e.domain = void 0, n.enter()), u(t, n); for (; s.length;)
    u(t = s.pop()); r = !1; } function u(e, t) { try {
    e();
}
catch (e) {
    if (i)
        throw t && t.exit(), setTimeout(a, 0), t && t.enter(), e;
    setTimeout(function () { throw e; }, 0);
} t && t.exit(); } if (o = function (e) { t = t.next = { task: e, domain: i && chunk_15914d3f_js_1.c.domain, next: null }, r || (r = !0, n()); }, "object" == typeof chunk_15914d3f_js_1.c && "[object process]" === chunk_15914d3f_js_1.c.toString() && chunk_15914d3f_js_1.d)
    i = !0, n = function () { chunk_15914d3f_js_1.d(a); };
else if ("function" == typeof setImmediate)
    n = "undefined" != typeof window ? setImmediate.bind(window, a) : function () { setImmediate(a); };
else if ("undefined" != typeof MessageChannel) {
    var c = new MessageChannel;
    c.port1.onmessage = function () { n = l, c.port1.onmessage = a, a(); };
    var l = function () { c.port2.postMessage(0); };
    n = function () { setTimeout(a, 0), l(); };
}
else
    n = function () { setTimeout(a, 0); }; return o.runAfter = function (e) { s.push(e), r || (r = !0, n()); }, o; }(), i = Function.call; function s(e) { return function () { return i.apply(e, arguments); }; } var a, u = s(Array.prototype.slice), c = s(Array.prototype.reduce || function (e, t) { var r = 0, n = this.length; if (1 === arguments.length)
    for (;;) {
        if (r in this) {
            t = this[r++];
            break;
        }
        if (++r >= n)
            throw new TypeError;
    } for (; r < n; r++)
    r in this && (t = e(t, this[r], r)); return t; }), l = s(Array.prototype.indexOf || function (e) { for (var t = 0; t < this.length; t++)
    if (this[t] === e)
        return t; return -1; }), h = s(Array.prototype.map || function (e, t) { var r = this, n = []; return c(r, function (o, i, s) { n.push(e.call(t, i, s, r)); }, void 0), n; }), p = Object.create || function (e) { function t() { } return t.prototype = e, new t; }, f = s(Object.prototype.hasOwnProperty), d = Object.keys || function (e) { var t = []; for (var r in e)
    f(e, r) && t.push(r); return t; }, v = s(Object.prototype.toString); a = "undefined" != typeof ReturnValue ? ReturnValue : function (e) { this.value = e; }; var g = "From previous event:"; function b(t, r) { if (e && r.stack && "object" == typeof t && null !== t && t.stack && -1 === t.stack.indexOf(g)) {
    for (var n = [], o = r; o; o = o.source)
        o.stack && n.unshift(o.stack);
    n.unshift(t.stack);
    var i = n.join("\n" + g + "\n");
    t.stack = function (e) { for (var t = i.split("\n"), r = [], n = 0; n < t.length; ++n) {
        var o = t[n];
        !m(o) && -1 === (s = o).indexOf("(module.js:") && -1 === s.indexOf("(node.js:") && o && r.push(o);
    } var s; return r.join("\n"); }();
} } function y(e) { var t = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(e); if (t)
    return [t[1], Number(t[2])]; var r = /at ([^ ]+):(\d+):(?:\d+)$/.exec(e); if (r)
    return [r[1], Number(r[2])]; var n = /.*@(.+):(\d+)$/.exec(e); return n ? [n[1], Number(n[2])] : void 0; } function m(e) { var n = y(e); if (!n)
    return !1; var o = n[1]; return n[0] === t && o >= r && o <= V; } function w() { if (e)
    try {
        throw new Error;
    }
    catch (e) {
        var r = e.stack.split("\n"), n = y(r[0].indexOf("@") > 0 ? r[1] : r[2]);
        if (!n)
            return;
        return t = n[0], n[1];
    } } function _(e) { return e instanceof T ? e : x(e) ? (t = e, r = S(), _.nextTick(function () { try {
    t.then(r.resolve, r.reject, r.notify);
}
catch (e) {
    r.reject(e);
} }), r.promise) : L(e); var t, r; } function S() { var t, r = [], n = [], o = p(S.prototype), i = p(T.prototype); if (i.promiseDispatch = function (e, o, i) { var s = u(arguments); r ? (r.push(s), "when" === o && i[1] && n.push(i[1])) : _.nextTick(function () { t.promiseDispatch.apply(t, s); }); }, i.valueOf = function () { if (r)
    return i; var e = O(t); return C(e) && (t = e), e; }, i.inspect = function () { return t ? t.inspect() : { state: "pending" }; }, _.longStackSupport && e)
    try {
        throw new Error;
    }
    catch (e) {
        i.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
    } function s(e) { t = e, i.source = e, c(r, function (t, r) { _.nextTick(function () { e.promiseDispatch.apply(e, r); }); }, void 0), r = void 0, n = void 0; } return o.promise = i, o.resolve = function (e) { t || s(_(e)); }, o.fulfill = function (e) { t || s(L(e)); }, o.reject = function (e) { t || s(N(e)); }, o.notify = function (e) { t || c(n, function (t, r) { _.nextTick(function () { r(e); }); }, void 0); }, o; } function k(e) { if ("function" != typeof e)
    throw new TypeError("resolver must be a function."); var t = S(); try {
    e(t.resolve, t.reject, t.notify);
}
catch (e) {
    t.reject(e);
} return t.promise; } function E(e) { return k(function (t, r) { for (var n = 0, o = e.length; n < o; n++)
    _(e[n]).then(t, r); }); } function T(e, t, r) { void 0 === t && (t = function (e) { return N(new Error("Promise does not support operation: " + e)); }), void 0 === r && (r = function () { return { state: "unknown" }; }); var n = p(T.prototype); if (n.promiseDispatch = function (r, o, i) { var s; try {
    s = e[o] ? e[o].apply(n, i) : t.call(n, o, i);
}
catch (e) {
    s = N(e);
} r && r(s); }, n.inspect = r, r) {
    var o = r();
    "rejected" === o.state && (n.exception = o.reason), n.valueOf = function () { var e = r(); return "pending" === e.state || "rejected" === e.state ? n : e.value; };
} return n; } function A(e, t, r, n) { return _(e).then(t, r, n); } function O(e) { if (C(e)) {
    var t = e.inspect();
    if ("fulfilled" === t.state)
        return t.value;
} return e; } function C(e) { return e instanceof T; } function x(e) { return (t = e) === Object(t) && "function" == typeof e.then; var t; } _.resolve = _, _.nextTick = o, _.longStackSupport = !1, "object" == typeof chunk_15914d3f_js_1.c && chunk_15914d3f_js_1.c && chunk_15914d3f_js_1.c.env && chunk_15914d3f_js_1.c.env.Q_DEBUG && (_.longStackSupport = !0), _.defer = S, S.prototype.makeNodeResolver = function () { var e = this; return function (t, r) { t ? e.reject(t) : e.resolve(arguments.length > 2 ? u(arguments, 1) : r); }; }, _.Promise = k, _.promise = k, k.race = E, k.all = F, k.reject = N, k.resolve = _, _.passByCopy = function (e) { return e; }, T.prototype.passByCopy = function () { return this; }, _.join = function (e, t) { return _(e).join(t); }, T.prototype.join = function (e) { return _([this, e]).spread(function (e, t) { if (e === t)
    return e; throw new Error("Can't join: not the same: " + e + " " + t); }); }, _.race = E, T.prototype.race = function () { return this.then(_.race); }, _.makePromise = T, T.prototype.toString = function () { return "[object Promise]"; }, T.prototype.then = function (e, t, r) { var n = this, o = S(), i = !1; return _.nextTick(function () { n.promiseDispatch(function (t) { i || (i = !0, o.resolve(function (t) { try {
    return "function" == typeof e ? e(t) : t;
}
catch (e) {
    return N(e);
} }(t))); }, "when", [function (e) { i || (i = !0, o.resolve(function (e) { if ("function" == typeof t) {
        b(e, n);
        try {
            return t(e);
        }
        catch (e) {
            return N(e);
        }
    } return N(e); }(e))); }]); }), n.promiseDispatch(void 0, "when", [void 0, function (e) { var t, n = !1; try {
        t = function (e) { return "function" == typeof r ? r(e) : e; }(e);
    }
    catch (e) {
        if (n = !0, !_.onerror)
            throw e;
        _.onerror(e);
    } n || o.notify(t); }]), o.promise; }, _.tap = function (e, t) { return _(e).tap(t); }, T.prototype.tap = function (e) { return e = _(e), this.then(function (t) { return e.fcall(t).thenResolve(t); }); }, _.when = A, T.prototype.thenResolve = function (e) { return this.then(function () { return e; }); }, _.thenResolve = function (e, t) { return _(e).thenResolve(t); }, T.prototype.thenReject = function (e) { return this.then(function () { throw e; }); }, _.thenReject = function (e, t) { return _(e).thenReject(t); }, _.nearer = O, _.isPromise = C, _.isPromiseAlike = x, _.isPending = function (e) { return C(e) && "pending" === e.inspect().state; }, T.prototype.isPending = function () { return "pending" === this.inspect().state; }, _.isFulfilled = function (e) { return !C(e) || "fulfilled" === e.inspect().state; }, T.prototype.isFulfilled = function () { return "fulfilled" === this.inspect().state; }, _.isRejected = function (e) { return C(e) && "rejected" === e.inspect().state; }, T.prototype.isRejected = function () { return "rejected" === this.inspect().state; }; var U, P = [], j = [], I = [], R = !0; function M() { P.length = 0, j.length = 0, R || (R = !0); } function N(e) { var t = T({ when: function (t) { return t && function (e) { if (R) {
        var t = l(j, e);
        -1 !== t && ("object" == typeof chunk_15914d3f_js_1.c && "function" == typeof chunk_15914d3f_js_1.c.emit && _.nextTick.runAfter(function () { var t = l(I, e); -1 !== t && I.splice(t, 1); }), j.splice(t, 1), P.splice(t, 1));
    } }(this), t ? t(e) : this; } }, function () { return this; }, function () { return { state: "rejected", reason: e }; }); return function (e, t) { R && ("object" == typeof chunk_15914d3f_js_1.c && "function" == typeof chunk_15914d3f_js_1.c.emit && _.nextTick.runAfter(function () { -1 !== l(j, e) && I.push(e); }), j.push(e), P.push(t && void 0 !== t.stack ? t.stack : "(no stack) " + t)); }(t, e), t; } function L(e) { return T({ when: function () { return e; }, get: function (t) { return e[t]; }, set: function (t, r) { e[t] = r; }, delete: function (t) { delete e[t]; }, post: function (t, r) { return null == t ? e.apply(void 0, r) : e[t].apply(e, r); }, apply: function (t, r) { return e.apply(t, r); }, keys: function () { return d(e); } }, void 0, function () { return { state: "fulfilled", value: e }; }); } function D(e, t, r) { return _(e).spread(t, r); } function H(e, t, r) { return _(e).dispatch(t, r); } function F(e) { return A(e, function (e) { var t = 0, r = S(); return c(e, function (n, o, i) { var s; C(o) && "fulfilled" === (s = o.inspect()).state ? e[i] = s.value : (++t, A(o, function (n) { e[i] = n, 0 == --t && r.resolve(e); }, r.reject, function (e) { r.notify({ index: i, value: e }); })); }, void 0), 0 === t && r.resolve(e), r.promise; }); } function B(e) { if (0 === e.length)
    return _.resolve(); var t = _.defer(), r = 0; return c(e, function (n, o, i) { r++, A(e[i], function (e) { t.resolve(e); }, function () { 0 == --r && t.reject(new Error("Can't get fulfillment value from any promise, all promises were rejected.")); }, function (e) { t.notify({ index: i, value: e }); }); }, void 0), t.promise; } function q(e) { return A(e, function (e) { return e = h(e, _), A(F(h(e, function (e) { return A(e, n, n); })), function () { return e; }); }); } _.resetUnhandledRejections = M, _.getUnhandledReasons = function () { return P.slice(); }, _.stopUnhandledRejectionTracking = function () { M(), R = !1; }, M(), _.reject = N, _.fulfill = L, _.master = function (e) { return T({ isDef: function () { } }, function (t, r) { return H(e, t, r); }, function () { return _(e).inspect(); }); }, _.spread = D, T.prototype.spread = function (e, t) { return this.all().then(function (t) { return e.apply(void 0, t); }, t); }, _.async = function (e) { return function () { function t(e, t) { var i; if ("undefined" == typeof StopIteration) {
    try {
        i = r[e](t);
    }
    catch (e) {
        return N(e);
    }
    return i.done ? _(i.value) : A(i.value, n, o);
} try {
    i = r[e](t);
}
catch (e) {
    return function (e) { return "[object StopIteration]" === v(e) || e instanceof a; }(e) ? _(e.value) : N(e);
} return A(i, n, o); } var r = e.apply(this, arguments), n = t.bind(t, "next"), o = t.bind(t, "throw"); return n(); }; }, _.spawn = function (e) { _.done(_.async(e)()); }, _.return = function (e) { throw new a(e); }, _.promised = function (e) { return function () { return D([this, F(arguments)], function (t, r) { return e.apply(t, r); }); }; }, _.dispatch = H, T.prototype.dispatch = function (e, t) { var r = this, n = S(); return _.nextTick(function () { r.promiseDispatch(n.resolve, e, t); }), n.promise; }, _.get = function (e, t) { return _(e).dispatch("get", [t]); }, T.prototype.get = function (e) { return this.dispatch("get", [e]); }, _.set = function (e, t, r) { return _(e).dispatch("set", [t, r]); }, T.prototype.set = function (e, t) { return this.dispatch("set", [e, t]); }, _.del = _.delete = function (e, t) { return _(e).dispatch("delete", [t]); }, T.prototype.del = T.prototype.delete = function (e) { return this.dispatch("delete", [e]); }, _.mapply = _.post = function (e, t, r) { return _(e).dispatch("post", [t, r]); }, T.prototype.mapply = T.prototype.post = function (e, t) { return this.dispatch("post", [e, t]); }, _.send = _.mcall = _.invoke = function (e, t) { return _(e).dispatch("post", [t, u(arguments, 2)]); }, T.prototype.send = T.prototype.mcall = T.prototype.invoke = function (e) { return this.dispatch("post", [e, u(arguments, 1)]); }, _.fapply = function (e, t) { return _(e).dispatch("apply", [void 0, t]); }, T.prototype.fapply = function (e) { return this.dispatch("apply", [void 0, e]); }, _.try = _.fcall = function (e) { return _(e).dispatch("apply", [void 0, u(arguments, 1)]); }, T.prototype.fcall = function () { return this.dispatch("apply", [void 0, u(arguments)]); }, _.fbind = function (e) { var t = _(e), r = u(arguments, 1); return function () { return t.dispatch("apply", [this, r.concat(u(arguments))]); }; }, T.prototype.fbind = function () { var e = this, t = u(arguments); return function () { return e.dispatch("apply", [this, t.concat(u(arguments))]); }; }, _.keys = function (e) { return _(e).dispatch("keys", []); }, T.prototype.keys = function () { return this.dispatch("keys", []); }, _.all = F, T.prototype.all = function () { return F(this); }, _.any = B, T.prototype.any = function () { return B(this); }, _.allResolved = (U = q, "allResolved", "allSettled", function () { return "undefined" != typeof console && "function" == typeof console.warn && console.warn("allResolved is deprecated, use allSettled instead.", new Error("").stack), U.apply(U, arguments); }), T.prototype.allResolved = function () { return q(this); }, _.allSettled = function (e) { return _(e).allSettled(); }, T.prototype.allSettled = function () { return this.then(function (e) { return F(h(e, function (e) { function t() { return e.inspect(); } return (e = _(e)).then(t, t); })); }); }, _.fail = _.catch = function (e, t) { return _(e).then(void 0, t); }, T.prototype.fail = T.prototype.catch = function (e) { return this.then(void 0, e); }, _.progress = function (e, t) { return _(e).then(void 0, void 0, t); }, T.prototype.progress = function (e) { return this.then(void 0, void 0, e); }, _.fin = _.finally = function (e, t) { return _(e).finally(t); }, T.prototype.fin = T.prototype.finally = function (e) { return e = _(e), this.then(function (t) { return e.fcall().then(function () { return t; }); }, function (t) { return e.fcall().then(function () { throw t; }); }); }, _.done = function (e, t, r, n) { return _(e).done(t, r, n); }, T.prototype.done = function (e, t, r) { var n = function (e) { _.nextTick(function () { if (b(e, o), !_.onerror)
    throw e; _.onerror(e); }); }, o = e || t || r ? this.then(e, t, r) : this; "object" == typeof chunk_15914d3f_js_1.c && chunk_15914d3f_js_1.c && chunk_15914d3f_js_1.c.domain && (n = chunk_15914d3f_js_1.c.domain.bind(n)), o.then(void 0, n); }, _.timeout = function (e, t, r) { return _(e).timeout(t, r); }, T.prototype.timeout = function (e, t) { var r = S(), n = setTimeout(function () { t && "string" != typeof t || ((t = new Error(t || "Timed out after " + e + " ms")).code = "ETIMEDOUT"), r.reject(t); }, e); return this.then(function (e) { clearTimeout(n), r.resolve(e); }, function (e) { clearTimeout(n), r.reject(e); }, r.notify), r.promise; }, _.delay = function (e, t) { return void 0 === t && (t = e, e = void 0), _(e).delay(t); }, T.prototype.delay = function (e) { return this.then(function (t) { var r = S(); return setTimeout(function () { r.resolve(t); }, e), r.promise; }); }, _.nfapply = function (e, t) { return _(e).nfapply(t); }, T.prototype.nfapply = function (e) { var t = S(), r = u(e); return r.push(t.makeNodeResolver()), this.fapply(r).fail(t.reject), t.promise; }, _.nfcall = function (e) { var t = u(arguments, 1); return _(e).nfapply(t); }, T.prototype.nfcall = function () { var e = u(arguments), t = S(); return e.push(t.makeNodeResolver()), this.fapply(e).fail(t.reject), t.promise; }, _.nfbind = _.denodeify = function (e) { var t = u(arguments, 1); return function () { var r = t.concat(u(arguments)), n = S(); return r.push(n.makeNodeResolver()), _(e).fapply(r).fail(n.reject), n.promise; }; }, T.prototype.nfbind = T.prototype.denodeify = function () { var e = u(arguments); return e.unshift(this), _.denodeify.apply(void 0, e); }, _.nbind = function (e, t) { var r = u(arguments, 2); return function () { var n = r.concat(u(arguments)), o = S(); return n.push(o.makeNodeResolver()), _(function () { return e.apply(t, arguments); }).fapply(n).fail(o.reject), o.promise; }; }, T.prototype.nbind = function () { var e = u(arguments, 0); return e.unshift(this), _.nbind.apply(void 0, e); }, _.nmapply = _.npost = function (e, t, r) { return _(e).npost(t, r); }, T.prototype.nmapply = T.prototype.npost = function (e, t) { var r = u(t || []), n = S(); return r.push(n.makeNodeResolver()), this.dispatch("post", [e, r]).fail(n.reject), n.promise; }, _.nsend = _.nmcall = _.ninvoke = function (e, t) { var r = u(arguments, 2), n = S(); return r.push(n.makeNodeResolver()), _(e).dispatch("post", [t, r]).fail(n.reject), n.promise; }, T.prototype.nsend = T.prototype.nmcall = T.prototype.ninvoke = function (e) { var t = u(arguments, 1), r = S(); return t.push(r.makeNodeResolver()), this.dispatch("post", [e, t]).fail(r.reject), r.promise; }, _.nodeify = function (e, t) { return _(e).nodeify(t); }, T.prototype.nodeify = function (e) { if (!e)
    return this; this.then(function (t) { _.nextTick(function () { e(null, t); }); }, function (t) { _.nextTick(function () { e(t); }); }); }, _.noConflict = function () { throw new Error("Q.noConflict only works when Q is used as a global"); }; var V = w(); return _; }, "function" == typeof bootstrap ? bootstrap("promise", r) : e.exports = r(); });
function AuthApiError(e, t) { this.name = "AuthApiError", this.message = e.errorSummary, this.errorSummary = e.errorSummary, this.errorCode = e.errorCode, this.errorLink = e.errorLink, this.errorId = e.errorId, this.errorCauses = e.errorCauses, t && (this.xhr = t); }
AuthApiError.prototype = new Error;
var AuthApiError_1 = AuthApiError;
function httpRequest(e, t) { var r = (t = t || {}).url, n = t.method, o = t.args, i = t.saveAuthnState, s = t.accessToken, a = !1 !== t.withCredentials, u = e.options.storageUtil, c = u.storage, l = u.getHttpCache(); if (t.cacheResponse) {
    var h = l.getStorage()[r];
    if (h && Date.now() / 1e3 < h.expiresAt)
        return q.resolve(h.response);
} var p, f, d = { Accept: "application/json", "Content-Type": "application/json", "X-Okta-User-Agent-Extended": e.userAgent }; return util_1.extend(d, e.options.headers, t.headers), s && util_1.isString(s) && (d.Authorization = "Bearer " + s), new q(e.options.httpRequestClient(n, r, { headers: d, data: o || void 0, withCredentials: a })).then(function (e) { return (f = e.responseText) && util_1.isString(f) && (f = JSON.parse(f)), i && (f.stateToken || c.delete(config$1.STATE_TOKEN_KEY_NAME)), f && f.stateToken && f.expiresAt && c.set(config$1.STATE_TOKEN_KEY_NAME, f.stateToken, f.expiresAt), f && t.cacheResponse && l.updateStorage(r, { expiresAt: Math.floor(Date.now() / 1e3) + config$1.DEFAULT_CACHE_DURATION, response: f }), f; }).fail(function (t) { var r = t.responseText || {}; if (util_1.isString(r))
    try {
        r = JSON.parse(r);
    }
    catch (e) {
        r = { errorSummary: "Unknown error" };
    } throw t.status >= 500 && (r.errorSummary = "Unknown error"), e.options.transformErrorXHR && (t = e.options.transformErrorXHR(util_1.clone(t))), "E0000011" === (p = new AuthApiError_1(r, t)).errorCode && c.delete(config$1.STATE_TOKEN_KEY_NAME), p; }); }
function get(e, t, r) { var n = { url: t = util_1.isAbsoluteUrl(t) ? t : e.options.url + t, method: "GET" }; return util_1.extend(n, r), httpRequest(e, n); }
function post(e, t, r, n) { var o = { url: t = util_1.isAbsoluteUrl(t) ? t : e.options.url + t, method: "POST", args: r, saveAuthnState: !0 }; return util_1.extend(o, n), httpRequest(e, o); }
var http = { get: get, post: post, httpRequest: httpRequest };
function AuthPollStopError() { this.name = "AuthPollStopError", this.message = "The poll was stopped by the sdk"; }
AuthPollStopError.prototype = new Error;
var AuthPollStopError_1 = AuthPollStopError;
function addStateToken(e, t) { var r = {}; return util_1.extend(r, t), !r.stateToken && e.stateToken && (r.stateToken = e.stateToken), r; }
function getStateToken(e) { return addStateToken(e); }
function transactionStatus(e, t) { return t = addStateToken(e, t), http.post(e, e.options.url + "/api/v1/authn", t); }
function resumeTransaction(e, t) { if (!t || !t.stateToken) {
    var r = e.tx.exists._get(config$1.STATE_TOKEN_KEY_NAME);
    if (!r)
        return q.reject(new AuthSdkError_1("No transaction to resume"));
    t = { stateToken: r };
} return e.tx.status(t).then(function (t) { return new AuthTransaction(e, t); }); }
function transactionExists(e) { return !!e.tx.exists._get(config$1.STATE_TOKEN_KEY_NAME); }
function postToTransaction(e, t, r, n) { return http.post(e, t, r, n).then(function (t) { return new AuthTransaction(e, t); }); }
function getPollFn(e, t, r) { return function (n) { var o, i, s; util_1.isNumber(n) ? o = n : util_1.isObject(n) && (o = n.delay, i = n.rememberDevice, s = n.autoPush), o || 0 === o || (o = config$1.DEFAULT_POLLING_DELAY); var a = util_1.getLink(t, "next", "poll"); r.isPolling = !0; var u = 0, c = function () { return r.isPolling ? function () { var r = {}; if ("function" == typeof s)
    try {
        r.autoPush = !!s();
    }
    catch (e) {
        return q.reject(new AuthSdkError_1("AutoPush resulted in an error."));
    }
else
    null != s && (r.autoPush = !!s); if ("function" == typeof i)
    try {
        r.rememberDevice = !!i();
    }
    catch (e) {
        return q.reject(new AuthSdkError_1("RememberDevice resulted in an error."));
    }
else
    null != i && (r.rememberDevice = !!i); var n = a.href + util_1.toQueryParams(r); return http.post(e, n, getStateToken(t), { saveAuthnState: !1 }); }().then(function (t) { if (u = 0, t.factorResult && "WAITING" === t.factorResult) {
    if (!r.isPolling)
        throw new AuthPollStopError_1;
    return q.delay(o).then(c);
} return r.isPolling = !1, new AuthTransaction(e, t); }).fail(function (e) { if (e.xhr && (0 === e.xhr.status || 429 === e.xhr.status) && u <= 4) {
    var t = 1e3 * Math.pow(2, u);
    return u++, q.delay(t).then(c);
} throw e; }) : q.reject(new AuthPollStopError_1); }; return c().fail(function (e) { throw r.isPolling = !1, e; }); }; }
function link2fn(e, t, r, n, o) { if (Array.isArray(n))
    return function (i, s) { if (!i)
        throw new AuthSdkError_1("Must provide a link name"); var a = util_1.find(n, { name: i }); if (!a)
        throw new AuthSdkError_1("No link found for that name"); return link2fn(e, t, r, a, o)(s); }; if (n.hints && n.hints.allow && 1 === n.hints.allow.length)
    switch (n.hints.allow[0]) {
        case "GET": return function () { return http.get(e, n.href); };
        case "POST": return function (i) { o && o.isPolling && (o.isPolling = !1); var s = addStateToken(t, i); "MFA_ENROLL" !== t.status && "FACTOR_ENROLL" !== t.status || util_1.extend(s, { factorType: r.factorType, provider: r.provider }); var a = {}, u = s.autoPush; if (void 0 !== u) {
            if ("function" == typeof u)
                try {
                    a.autoPush = !!u();
                }
                catch (e) {
                    return q.reject(new AuthSdkError_1("AutoPush resulted in an error."));
                }
            else
                null !== u && (a.autoPush = !!u);
            s = util_1.omit(s, "autoPush");
        } var c = s.rememberDevice; if (void 0 !== c) {
            if ("function" == typeof c)
                try {
                    a.rememberDevice = !!c();
                }
                catch (e) {
                    return q.reject(new AuthSdkError_1("RememberDevice resulted in an error."));
                }
            else
                null !== c && (a.rememberDevice = !!c);
            s = util_1.omit(s, "rememberDevice");
        }
        else
            s.profile && void 0 !== s.profile.updatePhone && (s.profile.updatePhone && (a.updatePhone = !0), s.profile = util_1.omit(s.profile, "updatePhone")); var l = n.href + util_1.toQueryParams(a); return postToTransaction(e, l, s); };
    } }
function links2fns(e, t, r, n) { var o = {}; for (var i in r._links)
    if (r._links.hasOwnProperty(i)) {
        var s = r._links[i];
        if ("next" === i && (i = s.name), s.type)
            o[i] = s;
        else
            switch (i) {
                case "poll":
                    o.poll = getPollFn(e, t, n);
                    break;
                default:
                    var a = link2fn(e, t, r, s, n);
                    a && (o[i] = a);
            }
    } return o; }
function flattenEmbedded(e, t, r, n) { if (r = util_1.clone(r = r || t), Array.isArray(r)) {
    for (var o = [], i = 0, s = r.length; i < s; i++)
        o.push(flattenEmbedded(e, t, r[i], n));
    return o;
} var a = r._embedded || {}; for (var u in a)
    a.hasOwnProperty(u) && (util_1.isObject(a[u]) || Array.isArray(a[u])) && (a[u] = flattenEmbedded(e, t, a[u], n)); var c = links2fns(e, t, r, n); return util_1.extend(a, c), r = util_1.omit(r, "_embedded", "_links"), util_1.extend(r, a), r; }
function AuthTransaction(e, t) { t && (this.data = t, util_1.extend(this, flattenEmbedded(e, t, t, {})), delete this.stateToken, "RECOVERY_CHALLENGE" !== t.status || t._links || (this.cancel = function () { return new q(new AuthTransaction(e)); })); }
var tx = { transactionStatus: transactionStatus, resumeTransaction: resumeTransaction, transactionExists: transactionExists, postToTransaction: postToTransaction };
function getValidUrl(e) { if (!e)
    throw new AuthSdkError_1("No arguments passed to constructor. Required usage: new OktaAuth(args)"); var t = e.url; if (!t) {
    var r = new RegExp("^http?s?://.+");
    if (!e.issuer || !r.test(e.issuer))
        throw new AuthSdkError_1('No url passed to constructor. Required usage: new OktaAuth({url: "https://{yourOktaDomain}.com"})');
    t = e.issuer.split("/oauth2/")[0];
} if (-1 !== t.indexOf("-admin."))
    throw new AuthSdkError_1('URL passed to constructor contains "-admin" in subdomain. Required usage: new OktaAuth({url: "https://{yourOktaDomain}.com})'); return t; }
function addSharedPrototypes(e) { e.forgotPassword = function (e) { return tx.postToTransaction(this, "/api/v1/authn/recovery/password", e); }, e.unlockAccount = function (e) { return tx.postToTransaction(this, "/api/v1/authn/recovery/unlock", e); }, e.verifyRecoveryToken = function (e) { return tx.postToTransaction(this, "/api/v1/authn/recovery/token", e); }; }
function buildOktaAuth(e) { return function (t, r) { function n(o) { if (!(this instanceof n))
    return new n(o); o && (o.storageUtil = t, o.ajaxRequest ? (util_1.deprecate("ajaxRequest is being deprecated, use httpRequestClient attribute instead."), o.httpRequestClient = o.ajaxRequest) : o.httpRequestClient || (o.httpRequestClient = r)), util_1.bind(e, this)(o); } return (n.prototype = e.prototype).constructor = n, n.features = e.prototype.features, n; }; }
var builderUtil = { addSharedPrototypes: addSharedPrototypes, buildOktaAuth: buildOktaAuth, getValidUrl: getValidUrl }, httpCache = browserStorage.getHttpCache();
function generateState() { return util_1.genRandomString(64); }
function generateNonce() { return util_1.genRandomString(64); }
function isToken(e) { return !(!e || !e.accessToken && !e.idToken || !Array.isArray(e.scopes)); }
function addListener(e, t, r) { e.addEventListener ? e.addEventListener(t, r) : e.attachEvent("on" + t, r); }
function removeListener(e, t, r) { e.removeEventListener ? e.removeEventListener(t, r) : e.detachEvent("on" + t, r); }
function loadFrame(e) { var t = document.createElement("iframe"); return t.style.display = "none", t.src = e, document.body.appendChild(t); }
function loadPopup(e, t) { var r = t.popupTitle || "External Identity Provider User Authentication", n = "toolbar=no, scrollbars=yes, resizable=yes, top=100, left=500, width=600, height=600"; if (util_1.isIE11OrLess()) {
    var o = window.open("/", r, n);
    return o.location.href = e, o;
} return window.open(e, r, n); }
function getWellKnown(e, t) { return http.get(e, (t || e.options.url) + "/.well-known/openid-configuration", { cacheResponse: !0 }); }
function getKey(e, t, r) { return getWellKnown(e, t).then(function (t) { var n = t.jwks_uri, o = httpCache.getStorage()[n]; if (o && Date.now() / 1e3 < o.expiresAt) {
    var i = util_1.find(o.response.keys, { kid: r });
    if (i)
        return i;
} return httpCache.clearStorage(n), http.get(e, n, { cacheResponse: !0 }).then(function (e) { var t = util_1.find(e.keys, { kid: r }); if (t)
    return t; throw new AuthSdkError_1("The key id, " + r + ", was not found in the server's keys"); }); }); }
function validateClaims(e, t, r) { var n = r.clientId, o = r.issuer, i = r.nonce; if (!t || !o || !n)
    throw new AuthSdkError_1("The jwt, iss, and aud arguments are all required"); if (i && t.nonce !== i)
    throw new AuthSdkError_1("OAuth flow response nonce doesn't match request nonce"); var s = Math.floor((new Date).getTime() / 1e3); if (t.iss !== o)
    throw new AuthSdkError_1("The issuer [" + t.iss + "] does not match [" + o + "]"); if (t.aud !== n)
    throw new AuthSdkError_1("The audience [" + t.aud + "] does not match [" + n + "]"); if (t.iat > t.exp)
    throw new AuthSdkError_1("The JWT expired before it was issued"); if (s - e.options.maxClockSkew > t.exp)
    throw new AuthSdkError_1("The JWT expired and is no longer valid"); if (t.iat > s + e.options.maxClockSkew)
    throw new AuthSdkError_1("The JWT was issued in the future"); }
function getOAuthUrls(e, t, r) { var n = util_1.removeTrailingSlash((r = r || {}).authorizeUrl) || e.options.authorizeUrl, o = util_1.removeTrailingSlash(r.issuer) || e.options.issuer, i = util_1.removeTrailingSlash(r.userinfoUrl) || e.options.userinfoUrl, s = util_1.removeTrailingSlash(r.tokenUrl) || e.options.tokenUrl; if (o && !/^https?:/.test(o) && (o = e.options.url + "/oauth2/" + o), !o && n && -1 !== t.responseType.indexOf("id_token"))
    throw new AuthSdkError_1("Cannot request idToken with an authorizeUrl without an issuer"); if (!o && -1 !== t.responseType.indexOf("token")) {
    if (n && !i)
        throw new AuthSdkError_1("Cannot request accessToken with an authorizeUrl without an issuer or userinfoUrl");
    if (i && !n)
        throw new AuthSdkError_1("Cannot request token with an userinfoUrl without an issuer or authorizeUrl");
} return new RegExp("^https?://.*?/oauth2/.+").test(o = o || e.options.url) ? (n = n || o + "/v1/authorize", i = i || o + "/v1/userinfo", s = s || o + "/v1/token") : (n = n || o + "/oauth2/v1/authorize", i = i || o + "/oauth2/v1/userinfo", s = s || o + "/oauth2/v1/token"), { issuer: o, authorizeUrl: n, userinfoUrl: i, tokenUrl: s }; }
function hashToObject(e) { for (var t, r = /\+/g, n = /([^&=]+)=?([^&]*)/g, o = e.substring(1), i = {}; t = n.exec(o);) {
    var s = t[1], a = t[2];
    i[s] = "id_token" === s || "access_token" === s || "code" === s ? a : decodeURIComponent(a.replace(r, " "));
} return i; }
var oauthUtil = { generateState: generateState, generateNonce: generateNonce, getWellKnown: getWellKnown, getKey: getKey, validateClaims: validateClaims, getOAuthUrls: getOAuthUrls, loadFrame: loadFrame, loadPopup: loadPopup, hashToObject: hashToObject, isToken: isToken, addListener: addListener, removeListener: removeListener };
function sessionExists(e) { return e.session.get().then(function (e) { return "ACTIVE" === e.status; }).fail(function () { return !1; }); }
function getSession(e) { return http.get(e, "/api/v1/sessions/me").then(function (t) { var r = util_1.omit(t, "_links"); return r.refresh = function () { return http.post(e, util_1.getLink(t, "refresh").href); }, r.user = function () { return http.get(e, util_1.getLink(t, "user").href); }, r; }).fail(function () { return { status: "INACTIVE" }; }); }
function closeSession(e) { return http.httpRequest(e, { url: e.options.url + "/api/v1/sessions/me", method: "DELETE" }); }
function refreshSession(e) { return http.post(e, "/api/v1/sessions/me/lifecycle/refresh"); }
function setCookieAndRedirect(e, t, r) { r = r || window.location.href, window.location = e.options.url + "/login/sessionCookieRedirect" + util_1.toQueryParams({ checkAccountSetupComplete: !0, token: t, redirectUrl: r }); }
var session = { sessionExists: sessionExists, getSession: getSession, closeSession: closeSession, refreshSession: refreshSession, setCookieAndRedirect: setCookieAndRedirect };
function verifyToken(e, t) { t = util_1.clone(t); var r = { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } }; return delete t.use, crypto.subtle.importKey("jwk", t, r, !0, ["verify"]).then(function (t) { var n = e.split("."), o = util_1.stringToBuffer(n[0] + "." + n[1]), i = util_1.base64UrlDecode(n[2]), s = util_1.stringToBuffer(i); return crypto.subtle.verify(r, t, s, o); }); }
var crypto_1 = { verifyToken: verifyToken };
function OAuthError(e, t) { this.name = "OAuthError", this.message = t, this.errorCode = e, this.errorSummary = t; }
OAuthError.prototype = new Error;
var OAuthError_1 = OAuthError, MIN_VERIFIER_LENGTH = 43, MAX_VERIFIER_LENGTH = 128, DEFAULT_CODE_CHALLENGE_METHOD = "S256";
function dec2hex(e) { return ("0" + e.toString(16)).substr(-2); }
function getRandomString(e) { var t = new Uint8Array(Math.ceil(e / 2)); return crypto.getRandomValues(t), Array.from(t, dec2hex).join("").slice(0, e); }
function generateVerifier(e) { var t = e || ""; return t.length < MIN_VERIFIER_LENGTH && (t += getRandomString(MIN_VERIFIER_LENGTH - t.length)), encodeURIComponent(t).slice(0, MAX_VERIFIER_LENGTH); }
function saveMeta(e, t) { e.options.storageUtil.getPKCEStorage().setStorage(t); }
function loadMeta(e) { return e.options.storageUtil.getPKCEStorage().getStorage(); }
function clearMeta(e) { e.options.storageUtil.getPKCEStorage().clearStorage(); }
function computeChallenge(e) { var t = (new TextEncoder).encode(e); return crypto.subtle.digest("SHA-256", t).then(function (e) { var t = String.fromCharCode.apply(null, new Uint8Array(e)); return util_1.stringToBase64Url(t); }); }
function validateOptions(e) { if (!e.clientId)
    throw new AuthSdkError_1("A clientId must be specified in the OktaAuth constructor to get a token"); if (!e.redirectUri)
    throw new AuthSdkError_1("The redirectUri passed to /authorize must also be passed to /token"); if (!e.authorizationCode)
    throw new AuthSdkError_1("An authorization code (returned from /authorize) must be passed to /token"); if (!e.codeVerifier)
    throw new AuthSdkError_1('The "codeVerifier" (generated and saved by your app) must be passed to /token'); if ("authorization_code" !== e.grantType)
    throw new AuthSdkError_1('Expecting "grantType" to equal "authorization_code"'); }
function getPostData(e) { var t = util_1.removeNils({ client_id: e.clientId, redirect_uri: e.redirectUri, grant_type: e.grantType, code: e.authorizationCode, code_verifier: e.codeVerifier }); return util_1.toQueryParams(t).slice(1); }
function getToken(e, t, r) { validateOptions(t); var n = getPostData(t); return http.httpRequest(e, { url: r.tokenUrl, method: "POST", args: n, withCredentials: !1, headers: { "Content-Type": "application/x-www-form-urlencoded" } }); }
var pkce = { DEFAULT_CODE_CHALLENGE_METHOD: DEFAULT_CODE_CHALLENGE_METHOD, generateVerifier: generateVerifier, clearMeta: clearMeta, saveMeta: saveMeta, loadMeta: loadMeta, computeChallenge: computeChallenge, getToken: getToken }, cookies = browserStorage.storage;
function decodeToken(e) { var t, r = e.split("."); try {
    t = { header: JSON.parse(util_1.base64UrlToString(r[0])), payload: JSON.parse(util_1.base64UrlToString(r[1])), signature: r[2] };
}
catch (e) {
    throw new AuthSdkError_1("Malformed token");
} return t; }
function verifyToken$1(e, t, r) { return (new q).then(function () { if (!t || !t.idToken)
    throw new AuthSdkError_1("Only idTokens may be verified"); var n = decodeToken(t.idToken), o = { clientId: e.options.clientId, issuer: e.options.issuer || e.options.url, ignoreSignature: e.options.ignoreSignature }; return util_1.extend(o, r), oauthUtil.validateClaims(e, n.payload, o), 1 != o.ignoreSignature && e.features.isTokenVerifySupported() ? oauthUtil.getKey(e, t.issuer, n.header.kid).then(function (e) { return crypto_1.verifyToken(t.idToken, e); }).then(function (e) { if (!e)
    throw new AuthSdkError_1("The token signature is not valid"); return t; }) : t; }); }
function addPostMessageListener(e, t, r) { var n = q.defer(); function o(t) { !t.data || t.origin !== e.options.url || t.data && util_1.isString(r) && t.data.state !== r || n.resolve(t.data); } return oauthUtil.addListener(window, "message", o), n.promise.timeout(t || 12e4, new AuthSdkError_1("OAuth flow timed out")).fin(function () { oauthUtil.removeListener(window, "message", o); }); }
function addFragmentListener(e, t, r) { var n = q.defer(); return function e() { try {
    t && t.location && t.location.hash ? n.resolve(oauthUtil.hashToObject(t.location.hash)) : t && !t.closed && setTimeout(e, 500);
}
catch (t) {
    setTimeout(e, 500);
} }(), n.promise.timeout(r || 12e4, new AuthSdkError_1("OAuth flow timed out")); }
function exchangeCodeForToken(e, t, r, n) { var o = pkce.loadMeta(e), i = { clientId: t.clientId, grantType: "authorization_code", authorizationCode: r, codeVerifier: o.codeVerifier, redirectUri: o.redirectUri }; return pkce.getToken(e, i, n).then(function (e) { return validateResponse(e, i), e; }).fin(function () { pkce.clearMeta(e); }); }
function validateResponse(e, t) { if (e.error || e.error_description)
    throw new OAuthError_1(e.error, e.error_description); if (e.state !== t.state)
    throw new AuthSdkError_1("OAuth flow response state doesn't match request state"); }
function handleOAuthResponse(e, t, r, n) { n = n || {}; var o = t.responseType, i = util_1.clone(t.scopes), s = t.clientId || e.options.clientId; return (new q).then(function () { return validateResponse(r, t), r.code ? (o = ["token", "id_token"], exchangeCodeForToken(e, t, r.code, n)) : r; }).then(function (r) { var o = {}; if (r.access_token && (o.token = { accessToken: r.access_token, expiresAt: Number(r.expires_in) + Math.floor(Date.now() / 1e3), tokenType: r.token_type, scopes: i, authorizeUrl: n.authorizeUrl, userinfoUrl: n.userinfoUrl }), r.id_token) {
    var a = e.token.decode(r.id_token), u = { idToken: r.id_token, claims: a.payload, expiresAt: a.payload.exp, scopes: i, authorizeUrl: n.authorizeUrl, issuer: n.issuer, clientId: s }, c = { clientId: s, issuer: n.issuer, nonce: t.nonce };
    return void 0 !== t.ignoreSignature && (c.ignoreSignature = t.ignoreSignature), verifyToken$1(e, u, c).then(function () { return o.id_token = u, o; });
} return o; }).then(function (e) { return Array.isArray(o) ? (["token", "id_token"].filter(function (e) { return -1 !== o.indexOf(e); }).forEach(function (t) { if (!e[t])
    throw new AuthSdkError_1("Unable to parse OAuth flow response: " + t + " was not returned."); }), o.map(function (t) { return e[t]; })) : e[o]; }); }
function getDefaultOAuthParams(e, t) { t = util_1.clone(t) || {}; var r = e.options.grantType || "implicit", n = { grantType: r, clientId: e.options.clientId, redirectUri: e.options.redirectUri || window.location.href, responseType: "authorization_code" === r ? "code" : "id_token", responseMode: "okta_post_message", state: oauthUtil.generateState(), nonce: oauthUtil.generateNonce(), scopes: ["openid", "email"], ignoreSignature: e.options.ignoreSignature }; return util_1.extend(n, t), "authorization_code" !== n.grantType || n.codeChallengeMethod || (n.codeChallengeMethod = pkce.DEFAULT_CODE_CHALLENGE_METHOD), n; }
function convertOAuthParamsToQueryParams(e) { if (!e.clientId)
    throw new AuthSdkError_1("A clientId must be specified in the OktaAuth constructor to get a token"); if (util_1.isString(e.responseType) && -1 !== e.responseType.indexOf(" "))
    throw new AuthSdkError_1("Multiple OAuth responseTypes must be defined as an array"); var t = util_1.removeNils({ client_id: e.clientId, redirect_uri: e.redirectUri, response_type: e.responseType, response_mode: e.responseMode, state: e.state, nonce: e.nonce, prompt: e.prompt, display: e.display, sessionToken: e.sessionToken, idp: e.idp, max_age: e.maxAge, code_challenge: e.codeChallenge, code_challenge_method: e.codeChallengeMethod }); if (Array.isArray(t.response_type) && (t.response_type = t.response_type.join(" ")), -1 !== e.responseType.indexOf("id_token") && -1 === e.scopes.indexOf("openid"))
    throw new AuthSdkError_1("openid scope must be specified in the scopes argument when requesting an id_token"); return t.scope = e.scopes.join(" "), t; }
function buildAuthorizeParams(e) { var t = convertOAuthParamsToQueryParams(e); return util_1.toQueryParams(t); }
function getToken$1(e, t, r) { return r = r || {}, prepareOauthParams(e, t = t || {}).then(function (n) { var o, i; t.sessionToken ? util_1.extend(n, { prompt: "none", responseMode: "okta_post_message", display: null }) : t.idp && util_1.extend(n, { display: "popup" }); try {
    i = oauthUtil.getOAuthUrls(e, n, r), o = (t.codeVerifier ? i.tokenUrl : i.authorizeUrl) + buildAuthorizeParams(n);
}
catch (e) {
    return q.reject(e);
} function s(e) { return /^(https?\:\/\/)?([^:\/?#]*(?:\:[0-9]+)?)/.exec(e)[0]; } switch (n.sessionToken || null === n.display ? "IFRAME" : "popup" === n.display ? "POPUP" : "IMPLICIT") {
    case "IFRAME":
        var a = addPostMessageListener(e, r.timeout, n.state), u = oauthUtil.loadFrame(o);
        return a.then(function (t) { return handleOAuthResponse(e, n, t, i); }).fin(function () { document.body.contains(u) && u.parentElement.removeChild(u); });
    case "POPUP":
        var c;
        if ("okta_post_message" === n.responseMode) {
            if (!e.features.isPopupPostMessageSupported())
                return q.reject(new AuthSdkError_1("This browser doesn't have full postMessage support"));
            c = addPostMessageListener(e, r.timeout, n.state);
        }
        var l = oauthUtil.loadPopup(o, { popupTitle: r.popupTitle });
        if ("fragment" === n.responseMode) {
            var h = s(e.idToken.authorize._getLocationHref()), p = s(n.redirectUri);
            if (h !== p)
                return q.reject(new AuthSdkError_1("Using fragment, the redirectUri origin (" + p + ") must match the origin of this page (" + h + ")"));
            c = addFragmentListener(e, l, r.timeout);
        }
        var f = q.defer(), d = setInterval(function () { l.closed && f.reject(new AuthSdkError_1("Unable to parse OAuth flow response")); }, 500);
        return c.then(function (e) { f.resolve(e); }).fail(function (e) { f.reject(e); }), f.promise.then(function (t) { return handleOAuthResponse(e, n, t, i); }).fin(function () { l.closed || (clearInterval(d), l.close()); });
    default: return q.reject(new AuthSdkError_1("The full page redirect flow is not supported"));
} }); }
function getWithoutPrompt(e, t, r) { var n = util_1.clone(t) || {}; return util_1.extend(n, { prompt: "none", responseMode: "okta_post_message", display: null }), getToken$1(e, n, r); }
function getWithPopup(e, t, r) { var n = util_1.clone(t) || {}; return util_1.extend(n, { display: "popup", responseMode: "okta_post_message" }), getToken$1(e, n, r); }
function prepareOauthParams(e, t) { var r = getDefaultOAuthParams(e, t), n = r.responseType; return "string" == typeof n && (n = [n]), "authorization_code" !== r.grantType ? n.includes("code") ? q.reject(new AuthSdkError_1('When responseType is "code", grantType should be "authorization_code"')) : q.resolve(r) : e.features.isPKCESupported() ? 1 !== n.length || "code" !== n[0] ? q.reject(new AuthSdkError_1('When grantType is "authorization_code", responseType should be "code"')) : oauthUtil.getWellKnown(e, null).then(function (e) { if (-1 === (e.code_challenge_methods_supported || []).indexOf(r.codeChallengeMethod))
    throw new AuthSdkError_1("Invalid code_challenge_method"); }).then(function () { var t = pkce.generateVerifier(r.codeVerifier); return pkce.saveMeta(e, { codeVerifier: t, redirectUri: r.redirectUri }), pkce.computeChallenge(t); }).then(function (e) { var t = util_1.clone(r) || {}; return util_1.extend(t, r, { codeChallenge: e }), t; }) : q.reject(new AuthSdkError_1("This browser doesn't support PKCE")); }
function getWithRedirect(e, t, r) { return (t = util_1.clone(t) || {}).responseMode || (t.responseMode = "fragment"), prepareOauthParams(e, t).then(function (t) { var n = oauthUtil.getOAuthUrls(e, t, r), o = n.authorizeUrl + buildAuthorizeParams(t); cookies.set(config$1.REDIRECT_OAUTH_PARAMS_COOKIE_NAME, JSON.stringify({ responseType: t.responseType, state: t.state, nonce: t.nonce, scopes: t.scopes, clientId: t.clientId, urls: n, ignoreSignature: t.ignoreSignature })), cookies.set(config$1.REDIRECT_NONCE_COOKIE_NAME, t.nonce), cookies.set(config$1.REDIRECT_STATE_COOKIE_NAME, t.state), e.token.getWithRedirect._setLocation(o); }); }
function renewToken(e, t) { return oauthUtil.isToken(t) ? e.token.getWithoutPrompt({ responseType: "authorization_code" === e.options.grantType ? "code" : t.accessToken ? "token" : "id_token", scopes: t.scopes }, { authorizeUrl: t.authorizeUrl, userinfoUrl: t.userinfoUrl, issuer: t.issuer }) : q.reject(new AuthSdkError_1("Renew must be passed a token with an array of scopes and an accessToken or idToken")); }
function removeHash(e) { var t = e.token.parseFromUrl._getHistory(), r = e.token.parseFromUrl._getDocument(), n = e.token.parseFromUrl._getLocation(); t && t.replaceState ? t.replaceState(null, r.title, n.pathname + n.search) : n.hash = ""; }
function parseFromUrl(e, t) { var r = e.token.parseFromUrl._getLocation().hash; if (t && (r = t.substring(t.indexOf("#"))), !r)
    return q.reject(new AuthSdkError_1("Unable to parse a token from the url")); var n = cookies.get(config$1.REDIRECT_OAUTH_PARAMS_COOKIE_NAME); if (!n)
    return q.reject(new AuthSdkError_1("Unable to retrieve OAuth redirect params cookie")); try {
    var o = JSON.parse(n), i = o.urls;
    delete o.urls, cookies.delete(config$1.REDIRECT_OAUTH_PARAMS_COOKIE_NAME);
}
catch (e) {
    return q.reject(new AuthSdkError_1("Unable to parse the " + config$1.REDIRECT_OAUTH_PARAMS_COOKIE_NAME + " cookie: " + e.message));
} return q.resolve(oauthUtil.hashToObject(r)).then(function (r) { return t || removeHash(e), handleOAuthResponse(e, o, r, i); }); }
function getUserInfo(e, t) { return t && (oauthUtil.isToken(t) || t.accessToken || t.userinfoUrl) ? http.httpRequest(e, { url: t.userinfoUrl, method: "GET", accessToken: t.accessToken }).fail(function (e) { var t; if (e.xhr && (401 === e.xhr.status || 403 === e.xhr.status) && (e.xhr.headers && util_1.isFunction(e.xhr.headers.get) && e.xhr.headers.get("WWW-Authenticate") ? t = e.xhr.headers.get("WWW-Authenticate") : util_1.isFunction(e.xhr.getResponseHeader) && (t = e.xhr.getResponseHeader("WWW-Authenticate")), t)) {
    var r = t.match(/error="(.*?)"/) || [], n = t.match(/error_description="(.*?)"/) || [], o = r[1], i = n[1];
    o && i && (e = new OAuthError_1(o, i));
} throw e; }) : q.reject(new AuthSdkError_1("getUserInfo requires an access token object")); }
var token = { getToken: getToken$1, getWithoutPrompt: getWithoutPrompt, getWithPopup: getWithPopup, getWithRedirect: getWithRedirect, parseFromUrl: parseFromUrl, decodeToken: decodeToken, renewToken: renewToken, getUserInfo: getUserInfo, verifyToken: verifyToken$1, handleOAuthResponse: handleOAuthResponse, prepareOauthParams: prepareOauthParams };
function E() { }
E.prototype = { on: function (e, t, r) { var n = this.e || (this.e = {}); return (n[e] || (n[e] = [])).push({ fn: t, ctx: r }), this; }, once: function (e, t, r) { var n = this; function o() { n.off(e, o), t.apply(r, arguments); } return o._ = t, this.on(e, o, r); }, emit: function (e) { for (var t = [].slice.call(arguments, 1), r = ((this.e || (this.e = {}))[e] || []).slice(), n = 0, o = r.length; n < o; n++)
        r[n].fn.apply(r[n].ctx, t); return this; }, off: function (e, t) { var r = this.e || (this.e = {}), n = r[e], o = []; if (n && t)
        for (var i = 0, s = n.length; i < s; i++)
            n[i].fn !== t && n[i].fn._ !== t && o.push(n[i]); return o.length ? r[e] = o : delete r[e], this; } };
var tinyEmitter = E;
function emitExpired(e, t, r) { e.emitter.emit("expired", t, r); }
function emitError(e, t) { e.emitter.emit("error", t); }
function clearExpireEventTimeout(e, t) { clearTimeout(e.expireTimeouts[t]), delete e.expireTimeouts[t], delete e.renewPromise[t]; }
function clearExpireEventTimeoutAll(e) { var t = e.expireTimeouts; for (var r in t)
    t.hasOwnProperty(r) && clearExpireEventTimeout(e, r); }
function setExpireEventTimeout(e, t, r, n) { var o = 1e3 * e.options.maxClockSkew, i = 1e3 * n.expiresAt - (Date.now() - o); clearExpireEventTimeout(t, r); var s = setTimeout(function () { emitExpired(t, r, n); }, i); t.expireTimeouts[r] = s; }
function setExpireEventTimeoutAll(e, t, r) { try {
    var n = r.getStorage();
}
catch (e) {
    return void emitError(t, e);
} for (var o in n)
    n.hasOwnProperty(o) && setExpireEventTimeout(e, t, o, n[o]); }
function add(e, t, r, n, o) { var i = r.getStorage(); if (!util_1.isObject(o) || !o.scopes || !o.expiresAt && 0 !== o.expiresAt || !o.idToken && !o.accessToken)
    throw new AuthSdkError_1("Token must be an Object with scopes, expiresAt, and an idToken or accessToken properties"); i[n] = o, r.setStorage(i), setExpireEventTimeout(e, t, n, o); }
function get$1(e, t) { return e.getStorage()[t]; }
function getAsync(e, t, r, n) { return q.Promise(function (o) { var i = get$1(r, n); return !i || 1e3 * i.expiresAt - 1e3 * e.options.maxClockSkew > Date.now() ? o(i) : o(t.autoRenew ? renew(e, t, r, n) : remove(t, r, n)); }); }
function remove(e, t, r) { clearExpireEventTimeout(e, r); var n = t.getStorage(); delete n[r], t.setStorage(n); }
function renew(e, t, r, n) { try {
    var o = get$1(r, n);
    if (!o)
        throw new AuthSdkError_1("The tokenManager has no token for the key: " + n);
}
catch (e) {
    return q.reject(e);
} return clearExpireEventTimeout(t, n), t.renewPromise[n] || (t.renewPromise[n] = e.token.renew(o).then(function (o) { var i = {}; return o instanceof Array == 0 && (o = [o]), o.forEach(function (o) { var s = o.idToken ? "idToken" : o.accessToken ? "accessToken" : n; i[s] = o; var a = get$1(r, s); a && (add(e, t, r, s, o), t.emitter.emit("renewed", s, o, a)); }), delete t.renewPromise[n], i[n]; }).fail(function (e) { throw "OAuthError" === e.name && (remove(t, r, n), emitError(t, e)), e; })), t.renewPromise[n]; }
function clear(e, t) { clearExpireEventTimeoutAll(e), t.clearStorage(); }
function TokenManager(e, t) { var r; switch ((t = t || {}).storage = t.storage || "localStorage", t.autoRenew || !1 === t.autoRenew || (t.autoRenew = !0), "localStorage" !== t.storage || browserStorage.browserHasLocalStorage() || (util_1.warn("This browser doesn't support localStorage. Switching to sessionStorage."), t.storage = "sessionStorage"), "sessionStorage" !== t.storage || browserStorage.browserHasSessionStorage() || (util_1.warn("This browser doesn't support sessionStorage. Switching to cookie-based storage."), t.storage = "cookie"), t.storage) {
    case "localStorage":
        r = storageBuilder_1(localStorage, config$1.TOKEN_STORAGE_NAME);
        break;
    case "sessionStorage":
        r = storageBuilder_1(sessionStorage, config$1.TOKEN_STORAGE_NAME);
        break;
    case "cookie":
        r = storageBuilder_1(browserStorage.getCookieStorage(t), config$1.TOKEN_STORAGE_NAME);
        break;
    default: throw new AuthSdkError_1("Unrecognized storage option");
} var n = { emitter: new tinyEmitter, autoRenew: t.autoRenew, expireTimeouts: {}, renewPromise: {} }; this.add = util_1.bind(add, this, e, n, r), this.get = util_1.bind(getAsync, this, e, n, r), this.remove = util_1.bind(remove, this, n, r), this.clear = util_1.bind(clear, this, n, r), this.renew = util_1.bind(renew, this, e, n, r), this.on = util_1.bind(n.emitter.on, n.emitter), this.off = util_1.bind(n.emitter.off, n.emitter), setExpireEventTimeoutAll(e, n, r); }
var TokenManager_1 = TokenManager, cookies$1 = browserStorage.storage;
function OktaAuthBuilder(e) { var t = this, r = builderUtil.getValidUrl(e); if (this.options = { url: util_1.removeTrailingSlash(r), clientId: e.clientId, issuer: util_1.removeTrailingSlash(e.issuer), authorizeUrl: util_1.removeTrailingSlash(e.authorizeUrl), userinfoUrl: util_1.removeTrailingSlash(e.userinfoUrl), tokenUrl: util_1.removeTrailingSlash(e.tokenUrl), grantType: e.grantType, redirectUri: e.redirectUri, httpRequestClient: e.httpRequestClient, storageUtil: e.storageUtil, transformErrorXHR: e.transformErrorXHR, headers: e.headers }, "authorization_code" === this.options.grantType && !t.features.isPKCESupported())
    throw new AuthSdkError_1("This browser doesn't support PKCE"); this.userAgent = "okta-auth-js-" + config$1.SDK_VERSION, this.options.maxClockSkew = e.maxClockSkew || 0 === e.maxClockSkew ? e.maxClockSkew : config$1.DEFAULT_MAX_CLOCK_SKEW, this.options.ignoreSignature = !!e.ignoreSignature, t.session = { close: util_1.bind(session.closeSession, null, t), exists: util_1.bind(session.sessionExists, null, t), get: util_1.bind(session.getSession, null, t), refresh: util_1.bind(session.refreshSession, null, t), setCookieAndRedirect: util_1.bind(session.setCookieAndRedirect, null, t) }, t.tx = { status: util_1.bind(tx.transactionStatus, null, t), resume: util_1.bind(tx.resumeTransaction, null, t), exists: util_1.bind(tx.transactionExists, null, t) }, t.tx.exists._get = function (e) { return cookies$1.get(e); }, t.idToken = { authorize: { _getLocationHref: function () { return window.location.href; } } }, t.token = { getWithoutPrompt: util_1.bind(token.getWithoutPrompt, null, t), getWithPopup: util_1.bind(token.getWithPopup, null, t), getWithRedirect: util_1.bind(token.getWithRedirect, null, t), parseFromUrl: util_1.bind(token.parseFromUrl, null, t), decode: token.decodeToken, renew: util_1.bind(token.renewToken, null, t), getUserInfo: util_1.bind(token.getUserInfo, null, t), verify: util_1.bind(token.verifyToken, null, t) }, t.token.getWithRedirect._setLocation = function (e) { window.location = e; }, t.token.parseFromUrl._getHistory = function () { return window.history; }, t.token.parseFromUrl._getLocation = function () { return window.location; }, t.token.parseFromUrl._getDocument = function () { return window.document; }, t.fingerprint._getUserAgent = function () { return navigator.userAgent; }; var n = /windows phone|iemobile|wpdesktop/i; t.features.isFingerprintSupported = function () { var e = t.fingerprint._getUserAgent(); return e && !n.test(e); }, t.tokenManager = new TokenManager_1(t, e.tokenManager); }
var proto = OktaAuthBuilder.prototype;
proto.features = {}, proto.features.isPopupPostMessageSupported = function () { var e = document.documentMode && document.documentMode < 10; return !(!window.postMessage || e); }, proto.features.isTokenVerifySupported = function () { return "undefined" != typeof crypto && crypto.subtle && "undefined" != typeof Uint8Array; }, proto.features.isPKCESupported = function () { return proto.features.isTokenVerifySupported(); }, proto.signIn = function (e) { var t = this; function r(r) { return delete e.sendFingerprint, tx.postToTransaction(t, "/api/v1/authn", e, r); } return (e = util_1.clone(e || {})).sendFingerprint ? t.fingerprint().then(function (e) { return r({ headers: { "X-Device-Fingerprint": e } }); }) : r(); }, proto.signOut = function () { return this.session.close(); }, builderUtil.addSharedPrototypes(proto), proto.webfinger = function (e) { var t = "/.well-known/webfinger" + util_1.toQueryParams(e); return http.get(this, t, { headers: { Accept: "application/jrd+json" } }); }, proto.fingerprint = function (e) { e = e || {}; var t = this; if (!t.features.isFingerprintSupported())
    return q.reject(new AuthSdkError_1("Fingerprinting is not supported on this device")); var r = q.defer(), n = document.createElement("iframe"); function o(e) { if (e && e.data && e.origin === t.options.url) {
    try {
        var n = JSON.parse(e.data);
    }
    catch (e) {
        return r.reject(new AuthSdkError_1("Unable to parse iframe response"));
    }
    if (n)
        return "FingerprintAvailable" === n.type ? r.resolve(n.fingerprint) : void ("FingerprintServiceReady" === n.type && e.source.postMessage(JSON.stringify({ type: "GetFingerprint" }), e.origin));
} } n.style.display = "none", oauthUtil.addListener(window, "message", o), n.src = t.options.url + "/auth/services/devicefingerprint", document.body.appendChild(n); var i = setTimeout(function () { r.reject(new AuthSdkError_1("Fingerprinting timed out")); }, e.timeout || 15e3); return r.promise.fin(function () { clearTimeout(i), oauthUtil.removeListener(window, "message", o), document.body.contains(n) && n.parentElement.removeChild(n); }); };
var Utilities, browser = builderUtil.buildOktaAuth(OktaAuthBuilder), browserIndex = browser(browserStorage, fetchRequest_1), CrdsOktaTokens = function () { function e(e, t) { void 0 === e && (e = null), void 0 === t && (t = null), this.provider = CrdsAuthenticationProviders.Okta, null != e && (this.access_token = e), null != t && (this.id_token = t); } return e.From = function (t) { return new e(t.access_token, t.id_token); }, e; }(), CrdsOktaService = function () { function e(e, t) { this.log = t, this.oktaAuthClient = new browserIndex(e); } return e.prototype.authenticated = function () { var e = this; return this.getTokenDictionary().pipe(switchMap(function (t) { return t ? of(t) : e.getTokensFromSession(); })); }, e.prototype.signOut = function () { var e = this; return from(this.oktaAuthClient.signOut()).pipe(first(), map(function () { return e.oktaAuthClient.tokenManager.clear(), e.log.Log("successfully logged out"), !0; }), catchError(function (t) { return e.log.Error("AUTHENTICATION SERICE: okta signout function returned error", t), of(!1); })); }, e.prototype.subscribeToTokenExpiration = function (e) { this.oktaAuthClient.tokenManager.on("expired", e); }, e.prototype.subscribeToTokenRenewed = function (e) { this.oktaAuthClient.tokenManager.on("renewed", e); }, e.prototype.subscribeToTokenError = function (e) { this.oktaAuthClient.tokenManager.on("error", e); }, e.prototype.getTokenDictionary = function () { var e = this; return forkJoin([from(this.oktaAuthClient.tokenManager.get("id_token")), from(this.oktaAuthClient.tokenManager.get("access_token"))]).pipe(first(), map(function (e) { var t = e[0], r = e[1]; return t && r ? CrdsOktaTokens.From({ id_token: t, access_token: r }) : null; }), catchError(function (t) { return e.log.Error("AUTHENTICATION SERICE: okta tokenManager get function returned error", t), of(null); })); }, e.prototype.getTokensFromSession = function () { var e = this; return from(this.oktaAuthClient.session.exists()).pipe(first(), switchMap(function (t) { return t ? from(e.oktaAuthClient.token.getWithoutPrompt({ scopes: ["openid", "profile", "email"], responseType: ["id_token", "token"] })).pipe(first(), tap(function (t) { e.oktaAuthClient.tokenManager.add("id_token", t[0]), e.oktaAuthClient.tokenManager.add("access_token", t[1]); }), map(function (e) { return CrdsOktaTokens.From({ id_token: e[0], access_token: e[1] }); }), catchError(function (t) { return e.log.Error("AUTHENTICATION SERICE: okta get without prompt function returned error", t), of(null); })) : of(null); }), catchError(function (t) { return e.log.Error("AUTHENTICATION SERICE: okta session exists function returned error", t), of(null); })); }, e; }(), CrdsMpTokens = function () { function e(e, t) { void 0 === e && (e = null), void 0 === t && (t = null), this.provider = CrdsAuthenticationProviders.Mp, null != e && (this.access_token = e), null != t && (this.refresh_token = t); } return e.From = function (t) { return new e(t.access_token, t.refresh_token); }, e; }();
!function (e) { e.getCookie = function (e) { for (var t = e + "=", r = decodeURIComponent(document.cookie).split(";"), n = 0; n < r.length; n++) {
    for (var o = r[n]; " " == o.charAt(0);)
        o = o.substring(1);
    if (0 == o.indexOf(t))
        return o.substring(t.length, o.length);
} return ""; }, e.deleteCookie = function (e, t) { document.cookie = e + "=; domain=" + t + "; Max-Age=-99999999;"; }; }(Utilities || (Utilities = {}));
var CrdsMpService = function () { function e(e, t) { this.accessTokenCookie = e, this.refreshTokenCookie = t; } return e.prototype.authenticated = function () { var e = Utilities.getCookie(this.accessTokenCookie), t = Utilities.getCookie(this.refreshTokenCookie); return of(e ? CrdsMpTokens.From({ access_token: { access_token: e }, refresh_token: t }) : null); }, e.prototype.signOut = function () { return Utilities.getCookie(this.accessTokenCookie) ? (Utilities.deleteCookie(this.accessTokenCookie, ".crossroads.net"), Utilities.deleteCookie(this.refreshTokenCookie, ".crossroads.net"), of(!0)) : of(!1); }, e; }(), CrdsLoggerService = function () { function e(e) { this.on = e; } return e.prototype.Error = function (e, t) { this.on && (null != t ? console.error("CRDS-OKTA-AUTH: " + e, t) : console.error("CRDS-OKTA-AUTH: " + e)); }, e.prototype.Warn = function (e, t) { this.on && (null != t ? console.warn("CRDS-OKTA-AUTH: " + e, t) : console.warn("CRDS-OKTA-AUTH: " + e)); }, e.prototype.Info = function (e, t) { this.on && (null != t ? console.info("CRDS-OKTA-AUTH: " + e, t) : console.info("CRDS-OKTA-AUTH: " + e)); }, e.prototype.Log = function (e, t) { this.on && (null != t ? console.log("CRDS-OKTA-AUTH: " + e, t) : console.log("CRDS-OKTA-AUTH: " + e)); }, e; }(), CrdsAuthenticationService = function () { function e(e) { var t = this; this.crdsAuthConfig = e, this.providerServiceKVP = {}, this.authenticationStatus$ = new BehaviorSubject(null), this.logService = new CrdsLoggerService(e.logging); var r, n = new CrdsOktaService(this.crdsAuthConfig.oktaConfig, this.logService); n.subscribeToTokenExpiration(function () { t.authenticate().pipe(first()).subscribe(); }), n.subscribeToTokenRenewed(function () { t.logService.Info("Token Renewed"); }), n.subscribeToTokenError(function () { t.authenticationStatus$.next(null); }), void 0 !== document.hidden ? r = "visibilitychange" : void 0 !== document.mozHidden ? r = "mozvisibilitychange" : void 0 !== document.msHidden ? r = "msvisibilitychange" : void 0 !== document.webkitHidden && (r = "webkitvisibilitychange"), document.addEventListener(r, function () { "visible" === document.visibilityState && t.authenticate().pipe(first()).subscribe(); }), this.providerServiceKVP[CrdsAuthenticationProviders.Okta] = new CrdsOktaService(e.oktaConfig, this.logService), this.providerServiceKVP[CrdsAuthenticationProviders.Mp] = new CrdsMpService(e.mpConfig.accessTokenCookie, e.mpConfig.refreshTokenCookie); } return e.prototype.authenticated = function () { var e = this; return this.authenticationStatus$.value ? this.authenticationStatus$.asObservable() : this.authenticate().pipe(first(), tap(function (t) { e.authenticationStatus$.next(t); }), switchMap(function (t) { return e.authenticationStatus$.asObservable(); })); }, e.prototype.authenticate = function () { var e = this; return this.AuthenticateByProvider(0).pipe(first(), tap(function (t) { e.authenticationStatus$.next(t); }), map(function (e) { return e; })); }, e.prototype.AuthenticateByProvider = function (e) { var t = this; return e >= Object.keys(this.providerServiceKVP).length ? of(null) : this.providerServiceKVP[this.crdsAuthConfig.providerPreference[e]].authenticated().pipe(first(), switchMap(function (r) { return null != r ? of(r) : t.AuthenticateByProvider(++e); })); }, e.prototype.signOut = function () { return this.SignOutByProvider(0); }, e.prototype.SignOutByProvider = function (e) { var t = this; return e >= Object.keys(this.providerServiceKVP).length ? of(!1) : this.providerServiceKVP[this.crdsAuthConfig.providerPreference[e]].signOut().pipe(first(), switchMap(function (r) { return r ? (t.authenticationStatus$.next(null), of(r)) : t.SignOutByProvider(++e); })); }, e; }(), Auth = function () { function e(e) { void 0 === e && (e = {}), this.authenticated = !1, this.subdomainMap = { prod: "www" }, this.config = e; var t = { oktaConfig: { clientId: e.okta_client_id, issuer: e.okta_issuer, tokenManager: { storage: "cookie" } }, mpConfig: { accessTokenCookie: e.mp_access_token_cookie, refreshTokenCookie: e.mp_refresh_token_cookie }, logging: e.logging || !1, providerPreference: [CrdsAuthenticationProviders.Okta, CrdsAuthenticationProviders.Mp] }; console.log(t), this.authService = new CrdsAuthenticationService(t); } return e.prototype.listen = function (e) { var t = this; this.authService.authenticated().subscribe(function (r) { if (!r)
    return t.authenticated = !1; t.authenticated = !0, t.token = r, t.isMp = r.provider == CrdsAuthenticationProviders.Mp, t.isOkta = r.provider == CrdsAuthenticationProviders.Okta, t.updateCurrentUser(), e(t); }); }, e.prototype.signOut = function (e) { var t = this; this.authService.signOut().subscribe(function (r) { r ? (t.authenticated = !1, t.updateCurrentUser(), e(t)) : console.log("log out failed"); }); }, e.prototype.updateCurrentUser = function () { return this.currentUser = this.authenticated ? { id: this.getUserId(), name: this.getUserName(), avatarUrl: this.getUserImageUrl() } : null; }, e.prototype.getUserId = function () { return this.authenticated ? this.isOkta ? this.token.id_token.claims.mpContactId : this.isMp ? chunk_e3f15c9a_js_1.a.getCookie("userId") : void 0 : null; }, e.prototype.getUserName = function () { return this.authenticated ? this.isOkta ? this.token.id_token.claims.name : this.isMp ? chunk_e3f15c9a_js_1.a.getCookie("username") : void 0 : null; }, e.prototype.getUserImageUrl = function () { if (!this.authenticated)
    return null; var e = this.getUserId(); return e ? "https://" + (this.subdomainMap[this.config.env] || this.config.env) + ".crossroads.net/proxy/gateway/api/image/profile/" + e : null; }, e; }(), GlobalNav = function () { function e() { this.giveNavIsShowing = !1, this.mainNavIsShowing = !1, this.profileNavIsShowing = !1, this.authenticated = !1, this.auth = {}, this.subdomainMap = { prod: "www" }; } return e.prototype.initAuth = function () { this.config && !this.auth.config && (this.auth = new Auth(Object.assign(this.config, { env: this.env })), this.auth.listen(this.authChangeCallback.bind(this))); }, e.prototype.authChangeCallback = function () { this.authenticated = this.auth.authenticated; }, e.prototype.handleSignOut = function () { this.auth.signOut(this.authChangeCallback.bind(this)); }, e.prototype.handleProfileClick = function (e) { return this.auth.authenticated ? this.navClickHandler(e, "profile-nav") : e.stopPropagation(); }, e.prototype.menuClasses = function () { var e = ["menu-container"]; return this.mainNavIsShowing && e.push("nav-is-showing"), e.join(" "); }, e.prototype.profileClasses = function () { var e = ["profile-container"]; return this.profileNavIsShowing && this.authenticated && e.push("nav-is-showing"), e.join(" "); }, e.prototype.giveClasses = function () { var e = ["give-container"]; return this.giveNavIsShowing && e.push("nav-is-showing"), e.join(" "); }, e.prototype.render = function () { var e = this; this.initAuth(); var t = '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>'; return crds_components_core_js_1.h(chunk_9d0e91ad_js_1.a, null, crds_components_core_js_1.h("header", { class: this.mainNavIsShowing || this.profileNavIsShowing || this.giveNavIsShowing ? "nav-is-showing" : "" }, crds_components_core_js_1.h("div", null, crds_components_core_js_1.h("div", { class: "global-nav-items" }, crds_components_core_js_1.h("div", { class: "global-actions" }, crds_components_core_js_1.h("a", { href: "", "data-automation-id": "sh-menu", "data-label": "menu", class: this.menuClasses(), onClick: function (t) { return e.navClickHandler(t, "main-nav"); } }, crds_components_core_js_1.h("div", { class: "menu", innerHTML: '<svg id="menu-thin" width="256" height="256" viewBox="0 0 256 256"><g><path d="M242.852679,47.6875 L14.1473214,47.6875 C12.4091038,47.6875 11,46.5915304 11,45.2395833 L11,35.4479167 C11,34.0959696 12.4091038,33 14.1473214,33 L242.852679,33 C244.590896,33 246,34.0959696 246,35.4479167 L246,45.2395833 C246,46.5915304 244.590896,47.6875 242.852679,47.6875 Z M242.852679,135.8125 L14.1473214,135.8125 C12.4091038,135.8125 11,134.71653 11,133.364583 L11,123.572917 C11,122.22097 12.4091038,121.125 14.1473214,121.125 L242.852679,121.125 C244.590896,121.125 246,122.22097 246,123.572917 L246,133.364583 C246,134.71653 244.590896,135.8125 242.852679,135.8125 Z M242.852679,223.9375 L14.1473214,223.9375 C12.4091038,223.9375 11,222.84153 11,221.489583 L11,211.697917 C11,210.34597 12.4091038,209.25 14.1473214,209.25 L242.852679,209.25 C244.590896,209.25 246,210.34597 246,211.697917 L246,221.489583 C246,222.84153 244.590896,223.9375 242.852679,223.9375 Z"/></g></svg>' }), crds_components_core_js_1.h("div", { class: "close", innerHTML: t })), crds_components_core_js_1.h("a", { href: "/search", class: "search-container", "data-automation-id": "sh-search", "data-label": "search" }, crds_components_core_js_1.h("div", { class: "search", innerHTML: '<svg id="search-thin" width="256" height="256" viewBox="0 0 256 256"><g><path d="M244.375275,231.976661 L184.91724,172.518627 C183.857136,171.458523 182.474391,170.905425 180.999463,170.905425 L176.252038,170.905425 C192.061423,153.805478 201.740638,130.990186 201.740638,105.870319 C201.740638,52.911186 158.829452,10 105.870319,10 C52.911186,10 10,52.911186 10,105.870319 C10,158.829452 52.911186,201.740638 105.870319,201.740638 C130.990186,201.740638 153.805478,192.061423 170.905425,176.29813 L170.905425,180.999463 C170.905425,182.474391 171.504614,183.857136 172.518627,184.91724 L231.976661,244.375275 C234.142962,246.541575 237.645916,246.541575 239.812216,244.375275 L244.375275,239.812216 C246.541575,237.645916 246.541575,234.142962 244.375275,231.976661 Z M105.870319,186.991358 C61.0232899,186.991358 24.7492798,150.717348 24.7492798,105.870319 C24.7492798,61.0232899 61.0232899,24.7492798 105.870319,24.7492798 C150.717348,24.7492798 186.991358,61.0232899 186.991358,105.870319 C186.991358,150.717348 150.717348,186.991358 105.870319,186.991358 Z"/></g></svg>' }))), crds_components_core_js_1.h("a", { href: "prod" === this.env ? "https://www.crossroads.net" : "https://" + this.env + ".crossroads.net", "data-automation-id": "sh-logo", class: "logo", innerHTML: '<svg width="308" height="81" viewBox="0 0 308 81" xmlns="http://www.w3.org/2000/svg"><path id="crossroads-church-logo" d="M211.9 52.2h3.3v10.5h.1c1.1-2.4 3.9-3.4 6.3-3.4 5.2 0 6.8 3 6.8 7.3v13H225V66.2c0-2.4-1.5-4-4-4-4 0-5.9 2.6-5.9 6.2v11.2h-3.3V52.2h.1zm-7.2 14c-.5-2.5-2.2-4-4.9-4-4.7 0-6.2 3.7-6.2 7.8 0 3.6 1.7 7.3 5.8 7.3 3.1 0 5-1.8 5.4-4.8h3.3c-.7 4.8-3.8 7.7-8.7 7.7-6.1 0-9.3-4.2-9.3-10.1 0-5.9 3.1-10.6 9.4-10.6 4.5 0 8.1 2.1 8.6 6.8h-3.4v-.1zm49.5-6.4h3.1V64h.1c1.6-3.2 3.8-4.8 7.3-4.6v3.5c-5.3 0-7.2 3-7.2 8v8.8h-3.3V59.8zm-4.8 19.8h-3.1v-3.1h-.1c-1.4 2.5-3.6 3.6-6.4 3.6-5.2 0-6.8-3-6.8-7.3v-13h3.3v13.4c0 2.4 1.5 4 4 4 4 0 5.9-2.6 5.9-6.2V59.8h3.3v19.8h-.1zm38.2-27.4h3.3v10.5h.1c1.1-2.4 3.9-3.4 6.3-3.4 5.2 0 6.8 3 6.8 7.3v13h-3.3V66.2c0-2.4-1.5-4-4-4-4 0-5.9 2.6-5.9 6.2v11.2h-3.3V52.2zm-7.2 14c-.5-2.5-2.2-4-4.9-4-4.7 0-6.2 3.7-6.2 7.8 0 3.6 1.7 7.3 5.8 7.3 3.1 0 5-1.8 5.4-4.8h3.3c-.7 4.8-3.8 7.7-8.7 7.7-6.1 0-9.3-4.2-9.3-10.1 0-5.9 3.1-10.6 9.4-10.6 4.5 0 8.1 2.1 8.6 6.8h-3.4v-.1zm7.6-45.7c0-1.6 1.4-2.2 3.6-2.2 1 0 1.9.2 2.5.8.7.5 1.1 1.3 1.2 2.3h11.4c-.7-8.4-8.8-10-15.7-10-6 0-13.6 2-14.8 8.6V.5h-12.6v15c-2.7-3.1-5.4-4.1-9.4-4.1-6.5 0-11.7 5-13 13 0-7.5-1-13-15.9-13-12.5 0-17.3 3.9-17.3 10.6h12.1c.3-2.7 2.7-3.1 4.4-3.1 1.3 0 4.1.3 4.1 2.6 0 4.7-14.5 1.5-20.2 7.4v-1.2c0-9.8-6.9-16.4-18-16.4-6.5 0-11.7 2.3-14.8 6.5v-6.3c-.5-.1-1.1-.2-1.6-.2-4.9 0-8 2.4-9.7 7.3l-.1-6.4h-11.4v17.6c-3.9-7.3-19.1-5.6-19.1-9.4 0-1.6 1.4-2.2 3.6-2.2 1 0 1.9.2 2.5.8.7.5 1.1 1.3 1.2 2.3h11.4c-.7-8.4-8.8-10-15.7-10-6.6 0-14.9 2.4-14.9 10.4 0 12.3 19.4 8.2 19.4 13.3 0 2.2-2.1 2.8-4 2.8-1.2 0-2.3-.3-3.1-1-.8-.7-1.3-1.6-1.3-2.9H123v-.3c0-11.8-20-8.9-20-13.3 0-1.6 1.4-2.2 3.6-2.2 1 0 1.9.2 2.5.8.7.5 1.1 1.3 1.2 2.3h11.4c-.7-8.4-8.8-10-15.7-10-6.6 0-15 2.4-15 10.4v.3c-2.2-6.6-8.3-10.7-17.1-10.7-6.5 0-11.7 2.3-14.8 6.5v-6.3c-.5-.1-1.1-.2-1.6-.2-4.9 0-8 2.4-9.7 7.3l-.1-6.4H36.3v19.4H23.8c-.4 2.5-1.6 4.7-4.9 4.7-3.7 0-5.5-3.1-5.5-7.9 0-3.7.8-8.6 5.5-8.6 1.4 0 2.5.4 3.2 1.3.8.8 1.3 1.9 1.3 3.3h12.7c-.9-9.4-8.9-13-17.3-13-10.4 0-18 6.2-18 17 0 10.7 7.8 16.4 18 16.4 8.4 0 15.8-3.3 17.4-12v11.1h12.5V33c0-6.8 2.6-9.2 7.7-9.2-.3 1.5-.5 3-.5 4.7 0 10.8 7.8 16.3 18 16.3 7.4 0 13.6-2.9 16.4-9 1.5 7.1 8.9 9 15.6 9 8.7 0 14-2.5 16-6.6 2.5 5.1 8.9 6.6 14.8 6.6 8.9 0 14.1-2.6 16.1-6.8v5.9h12.6V33c0-6.8 2.6-9.2 7.7-9.2-.3 1.5-.5 3-.5 4.7 0 10.8 7.8 16.3 18 16.3 6.9 0 12.8-2.5 15.8-7.8.9 5.4 5.7 7.8 11.1 7.8 4.7 0 8.3-1 11.9-4.3l.6 3.4h13v-.6c-1.6-1.3-1.7-2.2-1.7-4v-6.5c1.3 7 6 12.1 14 12.1 4 0 6.7-1.3 9.7-5.1V44h11.3v-5.6c2.6 5 8.9 6.5 14.7 6.5 11.6 0 17-4.5 17-11 0-11.9-20-9-20-13.4zM74 36.4c-3.2 0-5.4-2.6-5.4-8.6 0-3.5 1.3-8 5.6-8 3.3-.2 5.3 3.3 5.3 8-.1 6-2.1 8.6-5.5 8.6zm32.5 1.6c-1.2 0-2.3-.3-3.1-1-.8-.7-1.3-1.6-1.3-2.9h-11c.6-1.8.9-3.9.9-6.3 0-.8-.1-1.5-.1-2.2 3.6 7.7 18.6 5.1 18.6 9.6-.1 2.1-2.1 2.8-4 2.8zm84.1-1.6c-3.2 0-5.4-2.6-5.4-8.6 0-3.5 1.3-8 5.5-8 3.3-.2 5.3 3.3 5.3 8 0 6-2 8.6-5.4 8.6zm32.6 1.3c-2.5 0-4-1.1-4-2.7 0-4.1 5.4-3.1 9.5-5.1.3 4.4-1.1 7.8-5.5 7.8zm35.2-1.9c-4.1 0-4.9-3.9-4.9-7.2 0-3.5 1.1-7.5 5.3-7.5 4.2 0 5.4 3.8 5.4 7.3-.1 3.7-1.4 7.4-5.8 7.4zm33.1 2.2c-1.2 0-2.3-.3-3.1-1-.9-.7-1.3-1.6-1.3-2.9h-10.8V23.8c1.9 9.9 19.2 6.6 19.2 11.4 0 2.1-2.1 2.8-4 2.8z" fill-rule="nonzero" fill=""/></svg>' }), crds_components_core_js_1.h("div", { class: "user-actions" }, crds_components_core_js_1.h("a", { href: "", "data-automation-id": "sh-give", "data-label": "give", class: this.giveClasses(), onClick: function (t) { return e.navClickHandler(t, "give-nav"); } }, crds_components_core_js_1.h("div", { class: "donate", innerHTML: '<svg viewBox="0 0 244.36 244.36"><defs><mask id="a" x="-6" y="-6" width="256" height="256" maskUnits="userSpaceOnUse"><g transform="translate(-6 -6)"><rect width="256" height="256" style="fill:#fff"/></g></mask></defs><g style="mask:url(#a)"><path d="M113.39,109.09A27.82,27.82,0,0,1,100,100.74a25.23,25.23,0,0,1-6.2-14.08,24.08,24.08,0,0,1,6.44-19.09,24.39,24.39,0,0,1,18.85-8.12h1.44V48a4.09,4.09,0,0,1,3.81-3.82H132A4.11,4.11,0,0,1,135.82,48V59.45h.48a33.71,33.71,0,0,1,20.52,6.69,5.46,5.46,0,0,1,1.67,3.1,3.56,3.56,0,0,1-1.19,3.1l-5.25,5.25a4.29,4.29,0,0,1-2.39,1.19,2.6,2.6,0,0,1-2.39-.71,17.88,17.88,0,0,0-10.5-3.34H119.11A9.72,9.72,0,0,0,112,77.59,8.94,8.94,0,0,0,109.09,84,10.29,10.29,0,0,0,111,90.24a9.5,9.5,0,0,0,5.25,3.58l28.16,8.11a24.66,24.66,0,0,1,15.27,12.41,23.29,23.29,0,0,1,1.43,20,22.1,22.1,0,0,1-9.3,12.17,27.73,27.73,0,0,1-15.51,4.53h-.48v11.46a4.11,4.11,0,0,1-3.82,3.81h-7.64a4.09,4.09,0,0,1-3.81-3.81V151.09h-.48a32.24,32.24,0,0,1-20.52-7.16,3.64,3.64,0,0,1-1.68-2.62,3.58,3.58,0,0,1,1.2-3.11l5.25-5.25a4.29,4.29,0,0,1,2.38-1.19,2.58,2.58,0,0,1,2.39.72,18.71,18.71,0,0,0,11,3.34h17.18a9.72,9.72,0,0,0,7.16-2.87,8.87,8.87,0,0,0,2.86-6.44,10.2,10.2,0,0,0-1.91-6.2,9.45,9.45,0,0,0-5.25-3.58Zm121.7,34.36a15.49,15.49,0,0,1,15.27,15.28v76.36a15.47,15.47,0,0,1-15.27,15.27H21.27a14.71,14.71,0,0,1-10.74-4.53A14.68,14.68,0,0,1,6,235.09V158.73A14.68,14.68,0,0,1,10.53,148a14.72,14.72,0,0,1,10.74-4.54H36.55a97.2,97.2,0,0,1-7.64-38.18A96.4,96.4,0,0,1,42.27,55.4a100.25,100.25,0,0,1,36-36A96.4,96.4,0,0,1,128.18,6a96.43,96.43,0,0,1,49.88,13.36,100.3,100.3,0,0,1,36,36,96.4,96.4,0,0,1,13.36,49.87,97.37,97.37,0,0,1-7.63,38.18ZM128.18,21.27a83.6,83.6,0,0,0-84,84,83.57,83.57,0,0,0,84,84,83.57,83.57,0,0,0,84-84,83.6,83.6,0,0,0-84-84ZM235.09,235.09V158.73H211.7a99.76,99.76,0,0,1-30.54,30.54h19.57a4.11,4.11,0,0,1,3.81,3.82v7.64a4.09,4.09,0,0,1-3.81,3.81H55.64a4.09,4.09,0,0,1-3.82-3.81v-7.64a4.11,4.11,0,0,1,3.82-3.82h20a97.93,97.93,0,0,1-31-30.54H21.27v76.36Z" transform="translate(-6 -6)"/></g></svg>' }), crds_components_core_js_1.h("div", { class: "close", innerHTML: t })), crds_components_core_js_1.h("a", { href: "https://" + (this.subdomainMap[this.env] || this.env) + ".crossroads.net/signin", class: this.profileClasses(), onClick: function (t) { return e.handleProfileClick(t); }, "data-automation-id": "sh-profile", "data-label": this.authenticated ? "my account" : "sign in" }, this.authenticated ? crds_components_core_js_1.h("div", { class: "account" }, crds_components_core_js_1.h("div", { class: "account-authenticated", style: { backgroundImage: "url('" + this.auth.currentUser.avatarUrl + "')" } })) : crds_components_core_js_1.h("div", { class: "account", innerHTML: '<svg id="account-thin" width="256" height="256" viewBox="0 0 256 256"><g><path d="M128,10 C62.8145161,10 10,62.8145161 10,128 C10,193.185484 62.8145161,246 128,246 C193.185484,246 246,193.185484 246,128 C246,62.8145161 193.185484,10 128,10 Z M188.903226,210.6 C171.821774,223.208871 150.791129,230.774194 128,230.774194 C105.208871,230.774194 84.1782258,223.208871 67.0967742,210.6 L67.0967742,204.129032 C67.0967742,187.333065 80.7524194,173.677419 97.5483871,173.677419 C102.829839,173.677419 110.633065,179.101613 128,179.101613 C145.414516,179.101613 153.122581,173.677419 158.451613,173.677419 C175.247581,173.677419 188.903226,187.333065 188.903226,204.129032 L188.903226,210.6 Z M203.462903,197.515323 C200.227419,175.437903 181.433065,158.451613 158.451613,158.451613 C148.697581,158.451613 143.987097,163.875806 128,163.875806 C112.012903,163.875806 107.35,158.451613 97.5483871,158.451613 C74.5669355,158.451613 55.7725806,175.437903 52.5370968,197.515323 C35.6459677,179.196774 25.2258065,154.835484 25.2258065,128 C25.2258065,71.3314516 71.3314516,25.2258065 128,25.2258065 C184.668548,25.2258065 230.774194,71.3314516 230.774194,128 C230.774194,154.835484 220.354032,179.196774 203.462903,197.515323 Z M128,63.2903226 C104.875806,63.2903226 86.1290323,82.0370968 86.1290323,105.16129 C86.1290323,128.285484 104.875806,147.032258 128,147.032258 C151.124194,147.032258 169.870968,128.285484 169.870968,105.16129 C169.870968,82.0370968 151.124194,63.2903226 128,63.2903226 Z M128,131.806452 C113.297581,131.806452 101.354839,119.86371 101.354839,105.16129 C101.354839,90.458871 113.297581,78.516129 128,78.516129 C142.702419,78.516129 154.645161,90.458871 154.645161,105.16129 C154.645161,119.86371 142.702419,131.806452 128,131.806452 Z"/></g></svg>' }), crds_components_core_js_1.h("div", { class: "close", innerHTML: t })))), crds_components_core_js_1.h("profile-nav", { profileNavIsShowing: this.profileNavIsShowing && this.authenticated, onSignOut: this.handleSignOut.bind(this), currentUser: this.auth.currentUser, data: this.profileData }), crds_components_core_js_1.h("give-nav", { data: this.giveData, giveNavIsShowing: this.giveNavIsShowing })))); }, Object.defineProperty(e, "is", { get: function () { return "global-nav"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { authenticated: { state: !0 }, config: { type: "Any", attr: "config" }, env: { type: String, attr: "env" }, giveData: { type: "Any", attr: "give-data" }, giveNavIsShowing: { type: Boolean, attr: "give-nav-is-showing" }, href: { type: String, attr: "href" }, mainNavIsShowing: { type: Boolean, attr: "main-nav-is-showing" }, navClickHandler: { type: "Any", attr: "nav-click-handler" }, profileData: { type: "Any", attr: "profile-data" }, profileNavIsShowing: { type: Boolean, attr: "profile-nav-is-showing" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return "header{background-color:#0095d9;position:relative;top:0;width:100vw;z-index:2}\@supports ((position:-webkit-sticky) or (position:sticky)){header{position:-webkit-sticky;position:sticky}}header.nav-is-showing{position:fixed}header>div{margin:0 auto;max-width:1170px;padding:0 15px;position:relative}.global-nav-items{-ms-flex-pack:justify;justify-content:space-between}.global-actions,.global-nav-items,.user-actions{display:-ms-flexbox;display:flex}.global-actions a:first-of-type,.user-actions a:first-of-type{margin-right:18px}.logo{padding:7px}.logo svg{fill:#fff;height:29px;width:111px}.account,.donate,.menu,.search{height:22px;padding:12px 0;width:22px}.account svg,.donate svg,.menu svg,.search svg{height:22px;width:22px}.account .account-authenticated{background-color:#fff;background-position:50%;background-repeat:no-repeat;background-size:22px;border:1.5px solid #fff;border-radius:50%;-webkit-box-sizing:border-box;box-sizing:border-box;height:22px;width:22px}\@media (hover){.account .account-authenticated:hover{-webkit-filter:brightness(90%);filter:brightness(90%)}}.close{padding:9px 0}.close,.close svg{height:26px;width:26px}.account,.close,.donate,.menu,.search{display:block}.give-container,.menu-container,.profile-container,.search-container{color:#fff;display:-ms-flexbox;display:flex;text-decoration:none}\@media (min-width:768px){.give-container:after,.menu-container:after,.profile-container:after,.search-container:after{-ms-flex-item-align:center;align-self:center;bottom:2px;content:attr(data-label);display:inline-block;font-size:13px;margin-left:7px;position:relative;text-transform:capitalize}}.give-container svg,.menu-container svg,.profile-container svg,.search-container svg{fill:#fff}\@media (hover){.give-container:hover,.menu-container:hover,.profile-container:hover,.search-container:hover{color:#ccc}.give-container:hover svg,.menu-container:hover svg,.profile-container:hover svg,.search-container:hover svg{fill:#ccc}}.menu-container .close{display:none;margin-right:-4px}\@media (min-width:992px){.menu-container.nav-is-showing .menu{display:none}.menu-container.nav-is-showing .close{display:block}}.profile-container .close{display:none;margin-right:-4px}\@media (min-width:992px){.profile-container.nav-is-showing .account{display:none}.profile-container.nav-is-showing .close{display:block}}.give-container .close{display:none;margin-right:-4px}\@media (min-width:992px){.give-container.nav-is-showing .donate{display:none}.give-container.nav-is-showing .close{display:block}}"; }, enumerable: !0, configurable: !0 }), e; }(), isExtendable = function (e) { return null != e && ("object" == typeof e || "function" == typeof e); }, extendShallow = function (e) { isExtendable(e) || (e = {}); for (var t = arguments.length, r = 1; r < t; r++) {
    var n = arguments[r];
    isExtendable(n) && assign(e, n);
} return e; };
exports.GlobalNav = GlobalNav;
function assign(e, t) { for (var r in t)
    hasOwn(t, r) && (e[r] = t[r]); }
function hasOwn(e, t) { return Object.prototype.hasOwnProperty.call(e, t); }
var all, regexCache = {}, charSets = { default: { "&quot;": '"', "&#34;": '"', "&apos;": "'", "&#39;": "'", "&amp;": "&", "&#38;": "&", "&gt;": ">", "&#62;": ">", "&lt;": "<", "&#60;": "<" }, extras: { "&cent;": "¢", "&#162;": "¢", "&copy;": "©", "&#169;": "©", "&euro;": "€", "&#8364;": "€", "&pound;": "£", "&#163;": "£", "&reg;": "®", "&#174;": "®", "&yen;": "¥", "&#165;": "¥" } };
function unescape$1(e, t) { if (!isString(e))
    return ""; var r = charSets[t || "default"], n = toRegex(t, r); return e.replace(n, function (e) { return r[e]; }); }
function toRegex(e, t) { if (regexCache[e])
    return regexCache[e]; var r = Object.keys(t).join("|"), n = new RegExp("(?=(" + r + "))\\1", "g"); return regexCache[e] = n, n; }
function isString(e) { return e && "string" == typeof e; }
Object.defineProperty(charSets, "all", { get: function () { return all || (all = extendShallow({}, charSets.default, charSets.extras)); } }), unescape$1.chars = charSets.default, unescape$1.extras = charSets.extras, Object.defineProperty(unescape$1, "all", { get: function () { return charSets.all; } });
var _unescape = unescape$1, NavCtas = function () { function e() { } return e.prototype.decodedData = function () { return _unescape(this.data || ""); }, e.prototype.render = function () { return this.active ? null : crds_components_core_js_1.h("div", { class: "ctas", innerHTML: this.decodedData() }); }, Object.defineProperty(e, "is", { get: function () { return "nav-ctas"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { active: { type: String, attr: "active" }, data: { type: String, attr: "data" }, href: { type: String, attr: "href" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ".ctas{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;padding:40px 20px 0}\@media (max-width:992px){.ctas{width:calc(100vw - 40px)}}\@media (min-width:992px){.ctas{padding:70px 0 0}}.ctas h3{font-size:11px;margin-top:0;opacity:.5;text-transform:uppercase}.cta{background-color:rgba(21,21,21,.8);display:-ms-flexbox;display:flex;margin-bottom:10px;text-decoration:none}.cta-image{height:75px}.cta-image img{height:75px;width:100px}.cta-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;padding:0 20px;width:100%}.cta-content h4{color:#fff;font-size:14px;font-weight:600;text-transform:uppercase}.cta-content h4,.cta-content p{margin:0}.cta-content p{color:#979797;font-size:12px;font-weight:300;line-height:18px}.cta:hover-content h4{color:#ccc}.more-updates{color:#0095d9;font-size:12px;text-decoration:none;text-transform:capitalize}"; }, enumerable: !0, configurable: !0 }), e; }(), NavigationSection = function () { function e() { this.isActive = !1, this.debug = !0; } return e.prototype.componentWillLoad = function () { this.console = new chunk_e3f15c9a_js_1.b(this.debug), this.config = new chunk_e3f15c9a_js_1.c; }, e.prototype.render = function () { var e = this; return crds_components_core_js_1.h("li", null, crds_components_core_js_1.h("a", { onClick: function (t) { return e.onActivate(t, e.id); }, "data-automation-id": "sh-section-" + this.id, class: this.isActive ? "is-active" : "" }, crds_components_core_js_1.h("slot", null))); }, Object.defineProperty(e, "is", { get: function () { return "nav-section"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { activeSection: { type: "Any", attr: "active-section", mutable: !0 }, id: { type: String, attr: "id" }, isActive: { type: Boolean, attr: "is-active" }, onActivate: { type: "Any", attr: "on-activate" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return "nav-section a{cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin-bottom:10px;padding:15px 20px}\@media (min-width:992px){nav-section a{height:96px;-ms-flex-pack:center;justify-content:center;margin-bottom:0;position:relative;width:86%}}nav-section a:after{border-color:transparent transparent transparent #0095d9;border-style:solid;border-width:63px 0 63px 50px;content:\"\";height:0;left:0;position:absolute;top:0;visibility:hidden;width:0}nav-section a:before{background-color:#0095d9;content:\"\";display:inline-block;height:100%;left:0;position:absolute}\@media (min-width:992px){nav-section a:hover:before{width:4px}}\@media (min-width:992px){nav-section a.is-active:after{left:100%;-webkit-transition:left .4s ease;transition:left .4s ease;visibility:visible}nav-section a.is-active:before{-webkit-transition:width .4s ease;transition:width .4s ease;width:100%}}nav-section a h2{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;display:-ms-flexbox;display:flex;font-size:48px;-ms-flex-pack:justify;justify-content:space-between;line-height:.6;margin:0;position:relative;text-transform:uppercase}\@media (max-width:992px){nav-section a h2:after{background-image:url(/assets/images/chevron-right-light.svg);background-size:12px 22px;content:\"\";display:-ms-flexbox;display:flex;height:22px;position:absolute;right:0;top:20%;width:12px}}nav-section a p{font-size:14px;margin:12px 0 0;opacity:.7}"; }, enumerable: !0, configurable: !0 }), e; }(), NavSectionSubnav = function () { function e() { } return e.prototype.render = function () { var e = this; return crds_components_core_js_1.h("div", { class: this.active == this.id ? "" : " hidden" }, crds_components_core_js_1.h("a", { href: "", "data-automation-id": "sh-section-subnav-" + this.id, class: "back", onClick: function (t) { return e.onBack(t); } }, crds_components_core_js_1.h("span", { innerHTML: '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg>' }), "Back"), crds_components_core_js_1.h("slot", null)); }, Object.defineProperty(e, "is", { get: function () { return "nav-section-subnav"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { active: { type: String, attr: "active", mutable: !0 }, id: { type: String, attr: "id" }, onBack: { type: "Any", attr: "on-back" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ".hidden{display:none}nav-section-subnav{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;color:#fff}nav-section-subnav div{padding:30px 20px 0}nav-section-subnav a{color:#fff;display:inline-block;font-size:19px;margin-bottom:10px;padding-left:10px;text-decoration:none;text-transform:capitalize}nav-section-subnav a.all{margin-bottom:30px}nav-section-subnav a:hover{color:#ccc}nav-section-subnav h2{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;font-size:48px;line-height:48px;margin:0;text-transform:uppercase;margin-bottom:10px}nav-section-subnav h4{font-size:11px;margin:0 0 10px;opacity:.5;text-transform:uppercase}nav-section-subnav ul{padding-left:0;margin-top:0}nav-section-subnav ul li{list-style:none}nav-section-subnav ul li.top-level a{padding-left:0}\@media (min-width:992px){nav-section-subnav h2{display:none}}nav-section-subnav .back{font-size:14px;padding-left:0;position:relative}\@media (min-width:992px){nav-section-subnav .back{display:none}}nav-section-subnav .back span{display:inline-block;height:13px;margin-right:8px;padding:12px 0;position:relative;top:1px;width:7px}nav-section-subnav .back svg{fill:#fff;height:13px;width:7px}"; }, enumerable: !0, configurable: !0 }), e; }(), ProfileMenu = function () { function e() { var e = this; this.profileNavIsShowing = !0, this.renderSections = function (t) { var r = { value: !1 }, n = unescape(t.title.replace("%user_name%", e.currentUser.name || "")); return crds_components_core_js_1.h("div", null, crds_components_core_js_1.h("h2", null, " ", n, " "), t.children.map(function (t) { return e.renderChild(t, r); })); }, this.renderChild = function (t, r) { return r.value = r.value || "string" == typeof t, crds_components_core_js_1.h("div", { style: { padding: "0" } }, "string" == typeof t && crds_components_core_js_1.h("h4", null, t), "string" != typeof t && crds_components_core_js_1.h("ul", null, e.renderChildHTML(t, r))); }, this.renderChildHTML = function (t, r) { return t.map(function (t) { if ("string" != typeof t)
    return crds_components_core_js_1.h("li", { class: r.value ? "" : "top-level" }, crds_components_core_js_1.h("a", { href: t.href, "data-automation-id": t["automation-id"], onClick: function (r) { t["sign-out"] && e.onSignOut(r); } }, t.title)); }); }; } return e.prototype.envUrl = function (e) { return "" + chunk_15914d3f_js_1.c.env.CRDS_BASE_URL + e; }, e.prototype.handleClick = function (e) { e.stopPropagation(); }, e.prototype.render = function () { return this.profileNavIsShowing ? crds_components_core_js_1.h("div", { class: "profile-nav" }, crds_components_core_js_1.h("div", { class: "profile-nav-img", style: { backgroundImage: "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%),url('" + this.currentUser.avatarUrl + "')" } }), crds_components_core_js_1.h("div", null, this.renderSections(this.data))) : null; }, Object.defineProperty(e, "is", { get: function () { return "profile-nav"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { config: { type: "Any", attr: "config" }, currentUser: { type: "Any", attr: "current-user" }, data: { type: "Any", attr: "data" }, onSignOut: { type: "Any", attr: "on-sign-out" }, profileNavIsShowing: { type: Boolean, attr: "profile-nav-is-showing" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "listeners", { get: function () { return [{ name: "click", method: "handleClick" }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ".give-nav,.profile-nav{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;color:#fff;background-color:#000;background-repeat:no-repeat;background-size:100%;height:100vh;left:0;max-height:100vh;overflow-y:scroll;position:fixed;top:48px;width:100vw;z-index:2}.give-nav div,.profile-nav div{height:auto;padding:30px 20px 90px}.give-nav a,.profile-nav a{color:#fff;display:inline-block;font-size:19px;margin-bottom:10px;padding-left:10px;text-decoration:none;text-transform:capitalize}.give-nav a.all,.profile-nav a.all{margin-bottom:30px}.give-nav a:hover,.profile-nav a:hover{color:#ccc}.give-nav h2,.profile-nav h2{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;font-size:48px;line-height:48px;margin:0;text-transform:uppercase;margin-bottom:20px}.give-nav h4,.profile-nav h4{font-size:11px;margin:0 0 10px;opacity:.5;text-transform:uppercase}.give-nav ul,.profile-nav ul{padding-left:0;margin-top:0}.give-nav ul li,.profile-nav ul li{list-style:none}.give-nav ul li.top-level a,.profile-nav ul li.top-level a{padding-left:0}\@media (min-width:992px){.give-nav,.profile-nav{height:auto;left:auto;margin-right:-15px;position:absolute;right:15px;width:375px}}\@media (min-width:1170px){.give-nav,.profile-nav{margin-right:0}}.give-nav::-webkit-scrollbar,.profile-nav::-webkit-scrollbar{width:0}.give-nav ul:last-of-type,.profile-nav ul:last-of-type{padding-bottom:30px}.give-nav{background-image:url(https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress)}.profile-nav:after{background-color:rgba(0,0,0,.75);content:\" \";z-index:-1}.profile-nav .profile-nav-img,.profile-nav:after{height:100%;left:0;position:absolute;top:0;width:100%}.profile-nav .profile-nav-img{background-position:top;background-repeat:no-repeat;background-size:contain;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-filter:blur(2px);filter:blur(2px);z-index:-2}\@media (min-width:992px){.profile-nav div{padding-bottom:0}}"; }, enumerable: !0, configurable: !0 }), e; }(), SharedHeader = function () { function e() { this.env = "prod", this.mainNavIsShowing = !1, this.profileNavIsShowing = !1, this.giveNavIsShowing = !1, this.data = []; } return e.prototype.componentWillLoad = function () { var e = this; chunk_15914d3f_js_1.a.get(this.src || "https://crds-data.netlify.com/shared-header/" + this.env + ".json").then(function (t) { return e.data = t.data; }); }, e.prototype.componentDidLoad = function () { this.element.parentElement.classList.add("shared-header"), this.element.parentElement.classList.remove("shared-header-skeleton"); }, e.prototype.onClick = function (e, t) { e.preventDefault(), this.active = t; }, e.prototype.renderSections = function (e) { var t = this; return e ? e.map(function (e) { var r = chunk_e3f15c9a_js_1.a.parameterize(e.title); return crds_components_core_js_1.h("nav-section", { id: r, onActivate: t.onClick.bind(t), isActive: t.active == r }, crds_components_core_js_1.h("h2", null, e.title), crds_components_core_js_1.h("p", null, e.description)); }) : null; }, e.prototype.handleBackClick = function (e) { e.preventDefault(), this.active = null; }, e.prototype.renderSubnavs = function (e) { var t = this; if (!e)
    return null; var r = e.map(function (e) { return crds_components_core_js_1.h("nav-section-subnav", { onBack: t.handleBackClick.bind(t), active: t.active, id: chunk_e3f15c9a_js_1.a.parameterize(e.title) }, t.renderChildren(e)); }); return crds_components_core_js_1.h("div", { class: "subnavigation" }, r); }, e.prototype.renderChildren = function (e) { var t = e.children.map(function (e) { if ("string" == typeof e)
    return crds_components_core_js_1.h("h4", null, e); var t = e.map(function (e) { return crds_components_core_js_1.h("li", { class: e.top_level ? "top-level" : null }, crds_components_core_js_1.h("a", { href: e.href || "#", "data-automation-id": e["automation-id"] }, e.title)); }); return crds_components_core_js_1.h("ul", null, t); }); return crds_components_core_js_1.h(chunk_9d0e91ad_js_1.a, null, crds_components_core_js_1.h("h2", null, e.title), t); }, e.prototype.toggleMenu = function (e, t) { if (e.preventDefault(), e.stopPropagation(), "main-nav" == t)
    this.giveNavIsShowing = !1, this.mainNavIsShowing = !this.mainNavIsShowing, this.profileNavIsShowing = !1, this.mainNavIsShowing ? document.body.setAttribute("style", "overflow: hidden; position: absolute;") : document.body.setAttribute("style", "overflow: scroll;");
else {
    if ("profile-nav" == t)
        return this.giveNavIsShowing = !1, this.mainNavIsShowing = !1, this.profileNavIsShowing = !this.profileNavIsShowing, this.profileNavIsShowing ? document.body.setAttribute("style", "overflow: hidden; position: absolute; width: 100vw;") : document.body.setAttribute("style", "overflow: scroll;");
    if ("give-nav" == t)
        return this.giveNavIsShowing = !this.giveNavIsShowing, this.mainNavIsShowing = !1, this.profileNavIsShowing = !1, this.giveNavIsShowing ? document.body.setAttribute("style", "overflow: hidden; position: absolute; width: 100vw;") : document.body.setAttribute("style", "overflow: scroll; ");
} }, e.prototype.closeMenus = function (e) { return e.preventDefault(), this.giveNavIsShowing = !1, this.mainNavIsShowing = !1, this.profileNavIsShowing = !1, document.body.setAttribute("style", "overflow: scroll;"); }, e.prototype.navClasses = function () { var e = []; return this.mainNavIsShowing && e.push("is-showing"), this.active && e.push("section--" + this.active), (this.profileNavIsShowing || this.giveNavIsShowing) && (e = []), e.join(" "); }, e.prototype.navCloseClasses = function () { var e = ["close"]; return (this.mainNavIsShowing || this.profileNavIsShowing || this.giveNavIsShowing) && e.push("is-showing"), e.join(" "); }, e.prototype.handleScroll = function (e) { if (this.mainNavIsShowing || this.giveNavIsShowing || this.profileNavIsShowing)
    return document.body.setAttribute("style", "overflow: scroll;"), this.closeMenus(e); }, e.prototype.render = function () { return crds_components_core_js_1.h(chunk_9d0e91ad_js_1.a, null, crds_components_core_js_1.h("global-nav", { mainNavIsShowing: this.mainNavIsShowing, profileNavIsShowing: this.profileNavIsShowing, giveNavIsShowing: this.giveNavIsShowing, navClickHandler: this.toggleMenu.bind(this), giveData: this.data.give, profileData: this.data.profile, config: this.data.config, env: this.env }), crds_components_core_js_1.h("nav", { class: this.navClasses(), onClick: function (e) { return e.stopPropagation(); } }, crds_components_core_js_1.h("div", { class: "content" }, crds_components_core_js_1.h("div", { class: "navigation" }, crds_components_core_js_1.h("ul", null, this.renderSections(this.data.nav))), this.renderSubnavs(this.data.nav), crds_components_core_js_1.h("nav-ctas", { active: this.active, data: this.data.promos }))), crds_components_core_js_1.h("div", { class: this.navCloseClasses() }, crds_components_core_js_1.h("div", { class: "close-icon", innerHTML: '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>', onClick: this.closeMenus.bind(this) }))); }, Object.defineProperty(e, "is", { get: function () { return "shared-header"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { active: { state: !0 }, data: { state: !0 }, element: { elementRef: !0 }, env: { type: String, attr: "env" }, giveNavIsShowing: { state: !0 }, mainNavIsShowing: { state: !0 }, profileNavIsShowing: { state: !0 }, src: { type: String, attr: "src" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "listeners", { get: function () { return [{ name: "window:click", method: "handleScroll" }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return "\@media (max-width:992px){.subnavigation{left:100vw;padding-bottom:125px;position:absolute;top:0}}\@media (min-width:992px){.subnavigation{padding-top:47px}}.subnavigation h3{color:#fff;font-size:11px;opacity:.5;text-transform:uppercase}nav{background-color:#000;background-repeat:no-repeat;background-size:cover;color:#fff;display:none;font-family:acumin-pro,helvetica,arial,sans-serif;height:calc(100% - 47px);overflow-x:hidden;overflow-y:scroll;position:fixed;top:47px;-webkit-transform:translateX(0);transform:translateX(0);width:100vw;z-index:2;background-image:url(https://crds-media.imgix.net/7B6MoNNiWMZOtdusfRpipl/651049926b72990ae4f510a725cc2b26/nav-section-default-mobile.jpg?auto=format%2Ccompress)}nav.is-showing{display:block}\@media (min-width:768px){nav{height:100vh}}\@media (min-width:992px){nav{background-size:100%;background-image:url(https://crds-media.imgix.net/1OTqm9FjFl6wtjCXAkA04V/d44f06765e1fe0cf6a33ac3222b29302/nav-section-default.jpg?auto=format%2Ccompress)}}nav.section--come-visit{background-image:url(https://crds-media.imgix.net/7tP5INZjs0NUsWUlUDRpKv/6af5b40c0caf555a52876d51037de2a2/nav-section-locations-mobile.jpg?auto=format%2Ccompress)}\@media (min-width:992px){nav.section--come-visit{background-image:url(https://crds-media.imgix.net/49tv3Wjdt28dPnim7TbR89/6e9931a3700a3894510faa32d6dcea0f/nav-section-locations.jpg?auto=format%2Ccompress)}}nav.section--find-community{background-image:url(https://crds-media.imgix.net/67LrfkAcGom2zu23JncnA0/6e3c9b52f38f455d69f8b441d0d60726/nav-section-community-mobile.jpg?auto=format%2Ccompress)}\@media (min-width:992px){nav.section--find-community{background-image:url(https://crds-media.imgix.net/zEx1Ajg3dIlh5SpvzQ1qI/981c79df660b3dc5b393338a7640b2a1/nav-section-community.jpg?auto=format%2Ccompress)}}nav.section--get-support{background-image:url(https://crds-media.imgix.net/Cx02UnQr9sbVzjpXIcuqY/92b73ec270bf84af99c590bbd0173c54/nav-section-support-mobile.jpg?auto=format%2Ccompress)}\@media (min-width:992px){nav.section--get-support{background-image:url(https://crds-media.imgix.net/7i7YFUv6uY8MpwztZwIZE0/d093954885a5af29757040281c3b7e4c/nav-section-support.jpg?auto=format%2Ccompress)}}nav.section--watch-listen-read{background-image:url(https://crds-media.imgix.net/5lMvnR6A9cavGG4aS0zzO8/bcff1c0f42284f027a411b22a85bfb55/nav-section-media-mobile.jpg?auto=format%2Ccompress)}\@media (min-width:992px){nav.section--watch-listen-read{background-image:url(https://crds-media.imgix.net/59liSAMGW8dBCeUza5NUvj/b43c1e158ac599fd6debc40b916997d9/nav-section-media.jpg?auto=format%2Ccompress)}}nav .content{position:relative;width:200vw;z-index:3;margin:0 auto;max-width:1170px}\@media (max-width:992px){nav .content{padding-bottom:125px;-webkit-transform:translateX(0);transform:translateX(0);-webkit-transition:-webkit-transform .2s linear;transition:-webkit-transform .2s linear;transition:transform .2s linear;transition:transform .2s linear,-webkit-transform .2s linear}}\@media (min-width:992px){nav .content{display:-ms-flexbox;display:flex;padding-bottom:0}}\@media (max-width:992px){nav[class*=section--] .content{-webkit-transform:translateX(-100vw);transform:translateX(-100vw);-webkit-transition:-webkit-transform .2s linear;transition:-webkit-transform .2s linear;transition:transform .2s linear;transition:transform .2s linear,-webkit-transform .2s linear}}\@media (min-width:992px){nav[class*=section--] .ctas{display:none}}\@media (min-width:992px){nav[class*=section--] .subnavigation{width:calc(50% - 40px)}}.navigation{position:relative;width:100vw}\@media (min-width:992px){.navigation{margin-right:1.2%;width:50%}}.navigation ul{padding-left:0;margin:0;padding:30px 0 20px}.navigation ul li{list-style:none}\@media (min-width:992px){.navigation ul{padding:50px 20px 0;position:relative;z-index:1}}.navigation li{width:100%}.navigation:after{background-color:#d8d8d8;bottom:0;content:\"\";height:2px;left:20px;margin:0 auto;opacity:.2;position:absolute;width:calc(100vw - 40px)}\@media (min-width:992px){.navigation:after{background:-webkit-gradient(linear,left top,left bottom,from(#fff),to(hsla(0,0%,100%,0)));background:linear-gradient(180deg,#fff 0,hsla(0,0%,100%,0));height:100%;left:auto;right:56px;top:50px;width:2px}}.close{background:-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.9)));background:linear-gradient(180deg,transparent,rgba(0,0,0,.9));bottom:0;display:none;height:125px;padding-left:22px;position:fixed;width:100%;z-index:3}\@media (max-width:992px){.close.is-showing{display:block}}.close-icon{background-color:#0095d9;border-radius:50%;bottom:22px;-webkit-box-shadow:0 5px 24px -5px rgba(0,0,0,.75);box-shadow:0 5px 24px -5px rgba(0,0,0,.75);cursor:pointer;height:64px;position:absolute;width:64px}.close svg{fill:#fff;height:30px;left:50%;position:absolute;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:30px}"; }, enumerable: !0, configurable: !0 }), e; }();
exports.NavCtas = NavCtas;
exports.NavSection = NavigationSection;
exports.NavSectionSubnav = NavSectionSubnav;
exports.ProfileNav = ProfileMenu;
exports.SharedHeader = SharedHeader;
