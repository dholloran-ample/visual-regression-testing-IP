var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { r as registerInstance, h, g as getElement } from './chunk-a3f529aa.js';
import { p as process, n as nextTick, U as Utils, L as Logger, C as Config, a as axios } from './chunk-71586518.js';
var CrdsModal = /** @class */ (function () {
    function CrdsModal(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.isActive = false;
        this.handleInnerClick = function (event) {
            event.stopPropagation();
        };
        this.closeModal = function () {
            _this.isActive = false;
            if (typeof _this.onClose == 'function')
                _this.onClose();
        };
    }
    CrdsModal.prototype.componentDidUpdate = function () {
        document.body.appendChild(this.element);
    };
    CrdsModal.prototype.render = function () {
        return (h("div", { class: "modal " + (this.isActive ? 'is-active' : ''), id: "subscribeModalForm", tabindex: "-1", onClick: this.closeModal }, h("div", { class: "modal-content", onClick: this.handleInnerClick }, h("div", { class: "modal-header" }, h("button", { type: "button", class: "modal-close", onClick: this.closeModal })), h("div", { class: "modal-body" }, this.title && h("h3", { class: "modal-title" }, this.title), h("slot", null)))));
    };
    Object.defineProperty(CrdsModal.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrdsModal, "style", {
        get: function () { return ".modal{background-color:rgba(0,0,0,.8);bottom:0;left:0;opacity:0;position:fixed;right:0;top:0;-webkit-transition:opacity .3s ease,visibility .3s ease;transition:opacity .3s ease,visibility .3s ease;visibility:hidden;will-change:opacity,visibility}.modal.is-active{opacity:1;visibility:visible;z-index:11}.modal.is-active .modal-content{-webkit-transform:translateY(0);transform:translateY(0)}.modal-content{background:#fff;font-size:16px;margin:45px auto;max-width:600px;position:relative;-webkit-transform:translateY(-50px);transform:translateY(-50px);-webkit-transition:-webkit-transform .35s ease;transition:-webkit-transform .35s ease;transition:transform .35s ease;transition:transform .35s ease,-webkit-transform .35s ease;will-change:transform}.modal-body{padding:40px}.modal-title{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;font-size:36px!important;margin:0;text-transform:uppercase}\@media screen and (min-width:480px){.modal-title{font-size:52.2px!important}}input{background-image:none;-webkit-box-shadow:none;box-shadow:none}input[type=text]{background-color:#f4f4f4;border:1px solid #f4f4f4;border-radius:0;color:#4d4d4d;display:block;font-size:16px;line-height:1.5;padding:8px 10px;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;width:100%}input:focus{border-color:#8bceed;-webkit-box-shadow:inset 0 0 0 1px rgba(139,206,237,.5);box-shadow:inset 0 0 0 1px rgba(139,206,237,.5)}input[type=submit]{-webkit-appearance:button;-moz-appearance:button;appearance:button;background-color:#0095d9;border:1px solid #0095d9;border-radius:4px;color:#fff;cursor:pointer;font-size:16px;line-height:1;margin-top:24px;padding:14px 20px 16px}input[type=submit],label{display:inline-block;margin-bottom:5px}label{font-weight:700;max-width:100%}.modal-close{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:hsla(0,0%,73.3%,.6);-o-border-image:none;border-image:none;border-radius:50%;border-style:none;color:#fff;cursor:pointer;height:25px;position:absolute;right:15px;top:15px;width:25px}.modal-close:after{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;bottom:3px;content:\"x\";display:inline-block;font-size:16px;position:relative}.modal-close:focus{outline:none}"; },
        enumerable: true,
        configurable: true
    });
    return CrdsModal;
}());
var Fragment = function (props, children) { return children.slice(); };
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var iframeResizer = createCommonjsModule(function (module) {
    (function (undefined$1) {
        if (typeof window === 'undefined')
            return; // don't run for server side render
        var count = 0, logEnabled = false, hiddenCheckEnabled = false, msgHeader = 'message', msgHeaderLen = msgHeader.length, msgId = '[iFrameSizer]', // Must match iframe msg ID
        msgIdLen = msgId.length, pagePosition = null, requestAnimationFrame = window.requestAnimationFrame, resetRequiredMethods = {
            max: 1,
            scroll: 1,
            bodyScroll: 1,
            documentElementScroll: 1
        }, settings = {}, timer = null, defaults = {
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
            onClosed: function () { },
            onInit: function () { },
            onMessage: function () {
                warn('onMessage function not defined');
            },
            onResized: function () { },
            onScroll: function () {
                return true;
            }
        };
        function getMutationObserver() {
            return (window.MutationObserver ||
                window.WebKitMutationObserver ||
                window.MozMutationObserver);
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
                }
                else {
                    retStr = 'Nested host page: ' + iframeId;
                }
            }
            return retStr;
        }
        function formatLogHeader(iframeId) {
            return msgId + '[' + getMyID(iframeId) + ']';
        }
        function isLogEnabled(iframeId) {
            return settings[iframeId] ? settings[iframeId].log : logEnabled;
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
                };
            }
            function ensureInRange(Dimension) {
                var max = Number(settings[iframeId]['max' + Dimension]), min = Number(settings[iframeId]['min' + Dimension]), dimension = Dimension.toLowerCase(), size = Number(messageData[dimension]);
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
                        var i = 0, retCode = false;
                        log(iframeId, 'Checking connection is from allowed list of origins: ' +
                            checkOrigin);
                        for (; i < checkOrigin.length; i++) {
                            if (checkOrigin[i] === origin) {
                                retCode = true;
                                break;
                            }
                        }
                        return retCode;
                    }
                    function checkSingle() {
                        var remoteHost = settings[iframeId] && settings[iframeId].remoteHost;
                        log(iframeId, 'Checking connection is from: ' + remoteHost);
                        return origin === remoteHost;
                    }
                    return checkOrigin.constructor === Array ? checkList() : checkSingle();
                }
                var origin = event.origin, checkOrigin = settings[iframeId] && settings[iframeId].checkOrigin;
                if (checkOrigin && '' + origin !== 'null' && !checkAllowedOrigin()) {
                    throw new Error('Unexpected message received from: ' +
                        origin +
                        ' for ' +
                        messageData.iframe.id +
                        '. Message was: ' +
                        event.data +
                        '. This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.');
                }
                return true;
            }
            function isMessageForUs() {
                return (msgId === ('' + msg).substr(0, msgIdLen) &&
                    msg.substr(msgIdLen).split(':')[0] in settings); // ''+Protects against non-string msg
            }
            function isMessageFromMetaParent() {
                // Test if this message is from a parent above us. This is an ugly test, however, updating
                // the message format would break backwards compatibity.
                var retCode = messageData.type in { true: 1, false: 1, undefined: 1 };
                if (retCode) {
                    log(iframeId, 'Ignoring init message from meta parent page');
                }
                return retCode;
            }
            function getMsgBody(offset) {
                return msg.substr(msg.indexOf(':') + msgHeaderLen + offset);
            }
            function forwardMsgFromIFrame(msgBody) {
                log(iframeId, 'onMessage passed: {iframe: ' +
                    messageData.iframe.id +
                    ', message: ' +
                    msgBody +
                    '}');
                on('onMessage', {
                    iframe: messageData.iframe,
                    message: JSON.parse(msgBody)
                });
                log(iframeId, '--');
            }
            function getPageInfo() {
                var bodyPosition = document.body.getBoundingClientRect(), iFramePosition = messageData.iframe.getBoundingClientRect();
                return JSON.stringify({
                    iframeHeight: iFramePosition.height,
                    iframeWidth: iFramePosition.width,
                    clientHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                    clientWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                    offsetTop: parseInt(iFramePosition.top - bodyPosition.top, 10),
                    offsetLeft: parseInt(iFramePosition.left - bodyPosition.left, 10),
                    scrollTop: window.pageYOffset,
                    scrollLeft: window.pageXOffset,
                    documentHeight: document.documentElement.clientHeight,
                    documentWidth: document.documentElement.clientWidth,
                    windowHeight: window.innerHeight,
                    windowWidth: window.innerWidth
                });
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
                        }
                        else {
                            stop();
                        }
                    }
                    ['scroll', 'resize'].forEach(function (evt) {
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
                return retBool;
            }
            function getElementPosition(target) {
                var iFramePosition = target.getBoundingClientRect();
                getPagePosition(iframeId);
                return {
                    x: Math.floor(Number(iFramePosition.left) + Number(pagePosition.x)),
                    y: Math.floor(Number(iFramePosition.top) + Number(pagePosition.y))
                };
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
                    };
                }
                function scrollParent() {
                    if (window.parentIFrame) {
                        window.parentIFrame['scrollTo' + (addOffset ? 'Offset' : '')](newPosition.x, newPosition.y);
                    }
                    else {
                        warn(iframeId, 'Unable to scroll to requested position, window.parentIFrame not found');
                    }
                }
                var offset = addOffset
                    ? getElementPosition(messageData.iframe)
                    : { x: 0, y: 0 }, newPosition = calcOffset();
                log(iframeId, 'Reposition requested from iFrame (offset x:' +
                    offset.x +
                    ' y:' +
                    offset.y +
                    ')');
                if (window.top !== window.self) {
                    scrollParent();
                }
                else {
                    reposition();
                }
            }
            function scrollTo() {
                if (false !== on('onScroll', pagePosition)) {
                    setPagePosition(iframeId);
                }
                else {
                    unsetPagePosition();
                }
            }
            function findTarget(location) {
                function jumpToTarget() {
                    var jumpPosition = getElementPosition(target);
                    log(iframeId, 'Moving to in page link (#' +
                        hash +
                        ') at x: ' +
                        jumpPosition.x +
                        ' y: ' +
                        jumpPosition.y);
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
                    }
                    else {
                        log(iframeId, 'In page link #' +
                            hash +
                            ' not found and window.parentIFrame not found');
                    }
                }
                var hash = location.split('#')[1] || '', hashData = decodeURIComponent(hash), target = document.getElementById(hashData) ||
                    document.getElementsByName(hashData)[0];
                if (target) {
                    jumpToTarget();
                }
                else if (window.top !== window.self) {
                    jumpToParent();
                }
                else {
                    log(iframeId, 'In page link #' + hash + ' not found');
                }
            }
            function on(funcName, val) {
                return chkEvent(iframeId, funcName, val);
            }
            function actionMsg() {
                if (settings[iframeId] && settings[iframeId].firstRun)
                    firstRun();
                switch (messageData.type) {
                    case 'close':
                        if (settings[iframeId].closeRequeston)
                            chkEvent(iframeId, 'onCloseRequest', settings[iframeId].iframe);
                        else
                            closeIFrame(messageData.iframe);
                        break;
                    case 'message':
                        forwardMsgFromIFrame(getMsgBody(6));
                        break;
                    case 'scrollTo':
                        scrollRequestFromChild(false);
                        break;
                    case 'scrollToOffset':
                        scrollRequestFromChild(true);
                        break;
                    case 'pageInfo':
                        sendPageInfoToIframe(settings[iframeId] && settings[iframeId].iframe, iframeId);
                        startPageInfoMonitor();
                        break;
                    case 'pageInfoStop':
                        stopPageInfoMonitor();
                        break;
                    case 'inPageLink':
                        findTarget(getMsgBody(9));
                        break;
                    case 'reset':
                        resetIFrame(messageData);
                        break;
                    case 'init':
                        resizeIFrame();
                        on('onInit', messageData.iframe);
                        break;
                    default:
                        resizeIFrame();
                }
            }
            function hasSettings(iframeId) {
                var retBool = true;
                if (!settings[iframeId]) {
                    retBool = false;
                    warn(messageData.type +
                        ' No settings for ' +
                        iframeId +
                        '. Message was: ' +
                        msg);
                }
                return retBool;
            }
            function iFrameReadyMsgReceived() {
                // eslint-disable-next-line no-restricted-syntax, guard-for-in
                for (var iframeId in settings) {
                    trigger('iFrame requested init', createOutgoingMsg(iframeId), document.getElementById(iframeId), iframeId);
                }
            }
            function firstRun() {
                if (settings[iframeId]) {
                    settings[iframeId].firstRun = false;
                }
            }
            var msg = event.data, messageData = {}, iframeId = null;
            if ('[iFrameResizerChild]Ready' === msg) {
                iFrameReadyMsgReceived();
            }
            else if (isMessageForUs()) {
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
            }
            else {
                info(iframeId, 'Ignored: ' + msg);
            }
        }
        function chkEvent(iframeId, funcName, val) {
            var func = null, retVal = null;
            if (settings[iframeId]) {
                func = settings[iframeId][funcName];
                if ('function' === typeof func) {
                    retVal = func(val);
                }
                else {
                    throw new TypeError(funcName + ' on iFrame[' + iframeId + '] is not a function');
                }
            }
            return retVal;
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
            }
            catch (error) {
                warn(error);
            }
            chkEvent(iframeId, 'onClosed', iframeId);
            log(iframeId, '--');
            removeIframeListeners(iframe);
        }
        function getPagePosition(iframeId) {
            if (null === pagePosition) {
                pagePosition = {
                    x: window.pageXOffset !== undefined$1
                        ? window.pageXOffset
                        : document.documentElement.scrollLeft,
                    y: window.pageYOffset !== undefined$1
                        ? window.pageYOffset
                        : document.documentElement.scrollTop
                };
                log(iframeId, 'Get page position: ' + pagePosition.x + ',' + pagePosition.y);
            }
        }
        function setPagePosition(iframeId) {
            if (null !== pagePosition) {
                window.scrollTo(pagePosition.x, pagePosition.y);
                log(iframeId, 'Set page position: ' + pagePosition.x + ',' + pagePosition.y);
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
            log(messageData.id, 'Size reset requested by ' +
                ('init' === messageData.type ? 'host page' : 'iFrame'));
            getPagePosition(messageData.id);
            syncResize(reset, messageData, 'reset');
        }
        function setSize(messageData) {
            function setDimension(dimension) {
                if (!messageData.id) {
                    log('undefined', 'messageData id not set');
                    return;
                }
                messageData.iframe.style[dimension] = messageData[dimension] + 'px';
                log(messageData.id, 'IFrame (' +
                    iframeId +
                    ') ' +
                    dimension +
                    ' set to ' +
                    messageData[dimension] +
                    'px');
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
            }
            else {
                func();
            }
        }
        function trigger(calleeMsg, msg, iframe, id, noResponseWarning) {
            function postMessageToIFrame() {
                var target = settings[id] && settings[id].targetOrigin;
                log(id, '[' +
                    calleeMsg +
                    '] Sending msg to iframe[' +
                    id +
                    '] (' +
                    msg +
                    ') targetOrigin: ' +
                    target);
                iframe.contentWindow.postMessage(msgId + msg, target);
            }
            function iFrameNotFound() {
                warn(id, '[' + calleeMsg + '] IFrame(' + id + ') not found');
            }
            function chkAndSend() {
                if (iframe &&
                    'contentWindow' in iframe &&
                    null !== iframe.contentWindow) {
                    // Null test for PhantomJS
                    postMessageToIFrame();
                }
                else {
                    iFrameNotFound();
                }
            }
            function warnOnNoResponse() {
                function warning() {
                    if (settings[id] && !settings[id].loaded && !errorShown) {
                        errorShown = true;
                        warn(id, 'IFrame has not responded within ' +
                            settings[id].warningTimeout / 1000 +
                            ' seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning.');
                    }
                }
                if (!!noResponseWarning &&
                    settings[id] &&
                    !!settings[id].warningTimeout) {
                    settings[id].msgTimeout = setTimeout(warning, settings[id].warningTimeout);
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
            return (iframeId +
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
                settings[iframeId].widthCalculationMethod);
        }
        function setupIFrame(iframe, options) {
            function setLimits() {
                function addStyle(style) {
                    if (Infinity !== settings[iframeId][style] &&
                        0 !== settings[iframeId][style]) {
                        iframe.style[style] = settings[iframeId][style] + 'px';
                        log(iframeId, 'Set ' + style + ' = ' + settings[iframeId][style] + 'px');
                    }
                }
                function chkMinMax(dimension) {
                    if (settings[iframeId]['min' + dimension] >
                        settings[iframeId]['max' + dimension]) {
                        throw new Error('Value for min' +
                            dimension +
                            ' can not be greater than max' +
                            dimension);
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
                return id;
            }
            function ensureHasId(iframeId) {
                if ('' === iframeId) {
                    // eslint-disable-next-line no-multi-assign
                    iframe.id = iframeId = newId();
                    logEnabled = (options || {}).log;
                    log(iframeId, 'Added missing iframe ID: ' + iframeId + ' (' + iframe.src + ')');
                }
                return iframeId;
            }
            function setScrolling() {
                log(iframeId, 'IFrame scrolling ' +
                    (settings[iframeId] && settings[iframeId].scrolling
                        ? 'enabled'
                        : 'disabled') +
                    ' for ' +
                    iframeId);
                iframe.style.overflow =
                    false === (settings[iframeId] && settings[iframeId].scrolling)
                        ? 'hidden'
                        : 'auto';
                switch (settings[iframeId] && settings[iframeId].scrolling) {
                    case 'omit':
                        break;
                    case true:
                        iframe.scrolling = 'yes';
                        break;
                    case false:
                        iframe.scrolling = 'no';
                        break;
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
                if ('number' ===
                    typeof (settings[iframeId] && settings[iframeId].bodyMargin) ||
                    '0' === (settings[iframeId] && settings[iframeId].bodyMargin)) {
                    settings[iframeId].bodyMarginV1 = settings[iframeId].bodyMargin;
                    settings[iframeId].bodyMargin =
                        '' + settings[iframeId].bodyMargin + 'px';
                }
            }
            function checkReset() {
                // Reduce scope of firstRun to function, because IE8's JS execution
                // context stack is borked and this value gets externally
                // changed midway through running this function!!!
                var firstRun = settings[iframeId] && settings[iframeId].firstRun, resetRequertMethod = settings[iframeId] &&
                    settings[iframeId].heightCalculationMethod in resetRequiredMethods;
                if (!firstRun && resetRequertMethod) {
                    resetIFrame({ iframe: iframe, height: 0, width: 0, type: 'init' });
                }
            }
            function setupIFrameObject() {
                if (settings[iframeId]) {
                    settings[iframeId].iframe.iFrameResizer = {
                        close: closeIFrame.bind(null, settings[iframeId].iframe),
                        removeListeners: removeIframeListeners.bind(null, settings[iframeId].iframe),
                        resize: trigger.bind(null, 'Window resize', 'resize', settings[iframeId].iframe),
                        moveToAnchor: function (anchor) {
                            trigger('Move to anchor', 'moveToAnchor:' + anchor, settings[iframeId].iframe, iframeId);
                        },
                        sendMessage: function (message) {
                            message = JSON.stringify(message);
                            trigger('Send Message', 'message:' + message, settings[iframeId].iframe, iframeId);
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
                        return;
                    }
                    var destroyObserver = new MutationObserver(function (mutations) {
                        mutations.forEach(function (mutation) {
                            var removedNodes = Array.prototype.slice.call(mutation.removedNodes); // Transform NodeList into an Array
                            removedNodes.forEach(function (removedNode) {
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
                    throw new TypeError('Options is not an object');
                }
            }
            function copyOptions(options) {
                // eslint-disable-next-line no-restricted-syntax
                for (var option in defaults) {
                    if (Object.prototype.hasOwnProperty.call(defaults, option)) {
                        settings[iframeId][option] = Object.prototype.hasOwnProperty.call(options, option)
                            ? options[option]
                            : defaults[option];
                    }
                }
            }
            function getTargetOrigin(remoteHost) {
                return '' === remoteHost || 'file://' === remoteHost ? '*' : remoteHost;
            }
            function depricate(key) {
                var splitName = key.split('Callback');
                if (splitName.length === 2) {
                    var name = 'on' + splitName[0].charAt(0).toUpperCase() + splitName[0].slice(1);
                    this[name] = this[key];
                    delete this[key];
                    warn(iframeId, "Deprecated: '" +
                        key +
                        "' has been renamed '" +
                        name +
                        "'. The old method will be removed in the next major version.");
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
                return iframeId in settings && 'iFrameResizer' in iframe;
            }
            var iframeId = ensureHasId(iframe.id);
            if (!beenHere()) {
                processOptions(options);
                setScrolling();
                setLimits();
                setupBodyMarginValues();
                init(createOutgoingMsg(iframeId));
                setupIFrameObject();
            }
            else {
                warn(iframeId, 'Ignored iFrame, already setup.');
            }
        }
        function debouce(fn, time) {
            if (null === timer) {
                timer = setTimeout(function () {
                    timer = null;
                    fn();
                }, time);
            }
        }
        var frameTimer = {};
        function debounceFrameEvents(fn, time, frameId) {
            if (!frameTimer[frameId]) {
                frameTimer[frameId] = setTimeout(function () {
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
                        return ('0px' ===
                            (settings[settingId] && settings[settingId].iframe.style[dimension]));
                    }
                    function isVisible(el) {
                        return null !== el.offsetParent;
                    }
                    if (settings[settingId] &&
                        isVisible(settings[settingId].iframe) &&
                        (chkDimension('height') || chkDimension('width'))) {
                        trigger('Visibility change', 'resize', settings[settingId].iframe, settingId);
                    }
                }
                Object.keys(settings).forEach(function (key) {
                    checkIFrame(settings[key]);
                });
            }
            function mutationObserved(mutations) {
                log('window', 'Mutation observed: ' + mutations[0].target + ' ' + mutations[0].type);
                debouce(checkIFrames, 16);
            }
            function createMutationObserver() {
                var target = document.querySelector('body'), config = {
                    attributes: true,
                    attributeOldValue: false,
                    characterData: true,
                    characterDataOldValue: false,
                    childList: true,
                    subtree: true
                }, observer = new MutationObserver(mutationObserved);
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
                return (settings[iframeId] &&
                    'parent' === settings[iframeId].resizeFrom &&
                    settings[iframeId].autoResize &&
                    !settings[iframeId].firstRun);
            }
            Object.keys(settings).forEach(function (iframeId) {
                if (isIFrameResizeEnabled(iframeId)) {
                    trigger(eventName, event, document.getElementById(iframeId), iframeId);
                }
            });
        }
        function setupEventListeners() {
            addEventListener(window, 'message', iFrameListener);
            addEventListener(window, 'resize', function () {
                resizeIFrames('resize');
            });
            addEventListener(document, 'visibilitychange', tabVisible);
            addEventListener(document, '-webkit-visibilitychange', tabVisible);
        }
        function factory() {
            function init(options, element) {
                function chkType() {
                    if (!element.tagName) {
                        throw new TypeError('Object is not a valid DOM element');
                    }
                    else if ('IFRAME' !== element.tagName.toUpperCase()) {
                        throw new TypeError('Expected <IFRAME> tag, found <' + element.tagName + '>');
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
                    warn('enablePublicMethods option has been removed, public methods are now always available in the iFrame');
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
                        Array.prototype.forEach.call(document.querySelectorAll(target || 'iframe'), init.bind(undefined$1, options));
                        break;
                    case 'object':
                        init(options, target);
                        break;
                    default:
                        throw new TypeError('Unexpected data type (' + typeof target + ')');
                }
                return iFrames;
            };
        }
        function createJQueryPublicMethod($) {
            if (!$.fn) {
                info('', 'Unable to bind to jQuery, it is not fully loaded.');
            }
            else if (!$.fn.iFrameResize) {
                $.fn.iFrameResize = function $iFrameResizeF(options) {
                    function init(index, element) {
                        setupIFrame(element, options);
                    }
                    return this.filter('iframe')
                        .each(init)
                        .end();
                };
            }
        }
        if (window.jQuery) {
            createJQueryPublicMethod(window.jQuery);
        }
        if (typeof undefined$1 === 'function' && undefined$1.amd) {
            undefined$1([], factory);
        }
        else {
            // Node for browserfy
            module.exports = factory();
        }
        window.iFrameResize = window.iFrameResize || factory();
    })();
});
var iframeResizer_contentWindow = createCommonjsModule(function (module) {
    (function (undefined$1) {
        if (typeof window === 'undefined')
            return; // don't run for server side render
        var autoResize = true, base = 10, bodyBackground = '', bodyMargin = 0, bodyMarginStr = '', bodyObserver = null, bodyPadding = '', calculateWidth = false, doubleEventList = { resize: 1, click: 1 }, eventCancelTimer = 128, firstRun = true, height = 1, heightCalcModeDefault = 'bodyOffset', heightCalcMode = heightCalcModeDefault, initLock = true, initMsg = '', inPageLinks = {}, interval = 32, intervalTimer = null, logging = false, msgID = '[iFrameSizer]', // Must match host page msg ID
        msgIdLen = msgID.length, myID = '', resetRequiredMethods = {
            max: 1,
            min: 1,
            bodyScroll: 1,
            documentElementScroll: 1
        }, resizeFrom = 'child', sendPermit = true, target = window.parent, targetOriginDefault = '*', tolerance = 0, triggerLocked = false, triggerLockedTimer = null, throttledTimer = 16, width = 1, widthCalcModeDefault = 'scroll', widthCalcMode = widthCalcModeDefault, win = window, onMessage = function () {
            warn('onMessage function not defined');
        }, onReady = function () { }, onPageInfo = function () { }, customCalcMethods = {
            height: function () {
                warn('Custom height calculation function not defined');
                return document.documentElement.offsetHeight;
            },
            width: function () {
                warn('Custom width calculation function not defined');
                return document.body.scrollWidth;
            }
        }, eventHandlersByName = {}, passiveSupported = false;
        function noop() { }
        try {
            var options = Object.create({}, {
                passive: {
                    get: function () {
                        passiveSupported = true;
                    }
                }
            });
            window.addEventListener('test', noop, options);
            window.removeEventListener('test', noop, options);
        }
        catch (error) {
            /* */
        }
        function addEventListener(el, evt, func, options) {
            el.addEventListener(evt, func, passiveSupported ? options || {} : false);
        }
        function removeEventListener(el, evt, func) {
            el.removeEventListener(evt, func, false);
        }
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        // Based on underscore.js
        function throttle(func) {
            var context, args, result, timeout = null, previous = 0, later = function () {
                previous = getNow();
                timeout = null;
                result = func.apply(context, args);
                if (!timeout) {
                    // eslint-disable-next-line no-multi-assign
                    context = args = null;
                }
            };
            return function () {
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
                }
                else if (!timeout) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        }
        var getNow = Date.now ||
            function () {
                /* istanbul ignore next */ // Not testable in PhantonJS
                return new Date().getTime();
            };
        function formatLogMsg(msg) {
            return msgID + '[' + myID + '] ' + msg;
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
                return 'true' === str;
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
                var name = 'on' + splitName[0].charAt(0).toUpperCase() + splitName[0].slice(1);
                this[name] = this[key];
                delete this[key];
                warn("Deprecated: '" +
                    key +
                    "' has been renamed '" +
                    name +
                    "'. The old method will be removed in the next major version.");
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
                return calcMode;
            }
            if ('iFrameResizer' in window &&
                Object === window.iFrameResizer.constructor) {
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
            return value;
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
                add: function (eventName) {
                    function handleEvent() {
                        sendSize(options.eventName, options.eventType);
                    }
                    eventHandlersByName[eventName] = handleEvent;
                    addEventListener(window, eventName, handleEvent, { passive: true });
                },
                remove: function (eventName) {
                    var handleEvent = eventHandlersByName[eventName];
                    delete eventHandlersByName[eventName];
                    removeEventListener(window, eventName, handleEvent);
                }
            };
            if (options.eventNames && Array.prototype.map) {
                options.eventName = options.eventNames[0];
                options.eventNames.map(listener[options.method]);
            }
            else {
                listener[options.method](options.eventName);
            }
            log(capitalizeFirstLetter(options.method) +
                ' event listener: ' +
                options.eventType);
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
                    warn(calcMode + ' is not a valid option for ' + type + 'CalculationMethod.');
                    calcMode = calcModeDefault;
                }
                log(type + ' calculation method set to "' + calcMode + '"');
            }
            return calcMode;
        }
        function checkHeightMode() {
            heightCalcMode = checkCalcMode(heightCalcMode, heightCalcModeDefault, getHeight, 'height');
        }
        function checkWidthMode() {
            widthCalcMode = checkCalcMode(widthCalcMode, widthCalcModeDefault, getWidth, 'width');
        }
        function startEventListeners() {
            if (true === autoResize) {
                manageEventListeners('add');
                setupMutationObserver();
            }
            else {
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
            if (true === autoResize)
                stopEventListeners();
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
                    x: window.pageXOffset !== undefined$1
                        ? window.pageXOffset
                        : document.documentElement.scrollLeft,
                    y: window.pageYOffset !== undefined$1
                        ? window.pageYOffset
                        : document.documentElement.scrollTop
                };
            }
            function getElementPosition(el) {
                var elPosition = el.getBoundingClientRect(), pagePosition = getPagePosition();
                return {
                    x: parseInt(elPosition.left, 10) + parseInt(pagePosition.x, 10),
                    y: parseInt(elPosition.top, 10) + parseInt(pagePosition.y, 10)
                };
            }
            function findTarget(location) {
                function jumpToTarget(target) {
                    var jumpPosition = getElementPosition(target);
                    log('Moving to in page link (#' +
                        hash +
                        ') at x: ' +
                        jumpPosition.x +
                        ' y: ' +
                        jumpPosition.y);
                    sendMsg(jumpPosition.y, jumpPosition.x, 'scrollToOffset'); // X&Y reversed at sendMsg uses height/width
                }
                var hash = location.split('#')[1] || location, // Remove # if present
                hashData = decodeURIComponent(hash), target = document.getElementById(hashData) ||
                    document.getElementsByName(hashData)[0];
                if (undefined$1 !== target) {
                    jumpToTarget(target);
                }
                else {
                    log('In page link (#' +
                        hash +
                        ') not found in iFrame, so sending to parent');
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
                Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), setupLink);
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
                }
                else {
                    warn('In page linking not fully supported in this browser! (See README.md for IE8 workaround)');
                }
            }
            if (inPageLinks.enable) {
                enableInPageLinks();
            }
            else {
                log('In page linking not enabled');
            }
            return {
                findTarget: findTarget
            };
        }
        function setupPublicMethods() {
            log('Enable public methods');
            win.parentIFrame = {
                autoResize: function autoResizeF(resize) {
                    if (true === resize && false === autoResize) {
                        autoResize = true;
                        startEventListeners();
                    }
                    else if (false === resize && true === autoResize) {
                        autoResize = false;
                        stopEventListeners();
                    }
                    return autoResize;
                },
                close: function closeF() {
                    sendMsg(0, 0, 'close');
                    teardown();
                },
                getId: function getIdF() {
                    return myID;
                },
                getPageInfo: function getPageInfoF(callback) {
                    if ('function' === typeof callback) {
                        onPageInfo = callback;
                        sendMsg(0, 0, 'pageInfo');
                    }
                    else {
                        onPageInfo = function () { };
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
                setHeightCalculationMethod: function setHeightCalculationMethodF(heightCalculationMethod) {
                    heightCalcMode = heightCalculationMethod;
                    checkHeightMode();
                },
                setWidthCalculationMethod: function setWidthCalculationMethodF(widthCalculationMethod) {
                    widthCalcMode = widthCalculationMethod;
                    checkWidthMode();
                },
                setTargetOrigin: function setTargetOriginF(targetOrigin) {
                    log('Set targetOrigin: ' + targetOrigin);
                    targetOriginDefault = targetOrigin;
                },
                size: function sizeF(customHeight, customWidth) {
                    var valString = '' + (customHeight || '') + (customWidth ? ',' + customWidth : '');
                    sendSize('size', 'parentIFrame.size(' + valString + ')', customHeight, customWidth);
                }
            };
        }
        function initInterval() {
            if (0 !== interval) {
                log('setInterval: ' + interval + 'ms');
                intervalTimer = setInterval(function () {
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
                }
                else if (mutation.type === 'childList') {
                    Array.prototype.forEach.call(mutation.target.querySelectorAll('img'), addImageLoadListener);
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
                sendSize('mutationObserver', 'mutationObserver: ' + mutations[0].target + ' ' + mutations[0].type);
                // Deal with WebKit / Blink asyncing image loading when tags are injected into the page
                mutations.forEach(addImageLoadListners);
            }
            function createMutationObserver() {
                var target = document.querySelector('body'), config = {
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
                return observer;
            }
            var elements = [], MutationObserver = window.MutationObserver || window.WebKitMutationObserver, observer = createMutationObserver();
            return {
                disconnect: function () {
                    if ('disconnect' in observer) {
                        log('Disconnect body MutationObserver');
                        observer.disconnect();
                        elements.forEach(removeImageLoadListener);
                    }
                }
            };
        }
        function setupMutationObserver() {
            var forceIntervalTimer = 0 > interval;
            // Not testable in PhantomJS
            /* istanbul ignore if */ if (window.MutationObserver ||
                window.WebKitMutationObserver) {
                if (forceIntervalTimer) {
                    initInterval();
                }
                else {
                    bodyObserver = setupBodyMutationObserver();
                }
            }
            else {
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
            return parseInt(retVal, base);
        }
        function chkEventThottle(timer) {
            if (timer > throttledTimer / 2) {
                throttledTimer = 2 * timer;
                log('Event throttle increased to ' + throttledTimer + 'ms');
            }
        }
        // Idea from https://github.com/guardian/iframe-messenger
        function getMaxElement(side, elements) {
            var elementsLength = elements.length, elVal = 0, maxVal = 0, Side = capitalizeFirstLetter(side), timer = getNow();
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
            return maxVal;
        }
        function getAllMeasurements(dimention) {
            return [
                dimention.bodyOffset(),
                dimention.bodyScroll(),
                dimention.documentElementOffset(),
                dimention.documentElementScroll()
            ];
        }
        function getTaggedElements(side, tag) {
            function noTaggedElementsFound() {
                warn('No tagged elements (' + tag + ') found on page');
                return document.querySelectorAll('body *');
            }
            var elements = document.querySelectorAll('[' + tag + ']');
            if (0 === elements.length)
                noTaggedElementsFound();
            return getMaxElement(side, elements);
        }
        function getAllElements() {
            return document.querySelectorAll('body *');
        }
        var getHeight = {
            bodyOffset: function getBodyOffsetHeight() {
                return (document.body.offsetHeight +
                    getComputedStyle('marginTop') +
                    getComputedStyle('marginBottom'));
            },
            offset: function () {
                return getHeight.bodyOffset(); // Backwards compatability
            },
            bodyScroll: function getBodyScrollHeight() {
                return document.body.scrollHeight;
            },
            custom: function getCustomWidth() {
                return customCalcMethods.height();
            },
            documentElementOffset: function getDEOffsetHeight() {
                return document.documentElement.offsetHeight;
            },
            documentElementScroll: function getDEScrollHeight() {
                return document.documentElement.scrollHeight;
            },
            max: function getMaxHeight() {
                return Math.max.apply(null, getAllMeasurements(getHeight));
            },
            min: function getMinHeight() {
                return Math.min.apply(null, getAllMeasurements(getHeight));
            },
            grow: function growHeight() {
                return getHeight.max(); // Run max without the forced downsizing
            },
            lowestElement: function getBestHeight() {
                return Math.max(getHeight.bodyOffset() || getHeight.documentElementOffset(), getMaxElement('bottom', getAllElements()));
            },
            taggedElement: function getTaggedElementsHeight() {
                return getTaggedElements('bottom', 'data-iframe-height');
            }
        }, getWidth = {
            bodyScroll: function getBodyScrollWidth() {
                return document.body.scrollWidth;
            },
            bodyOffset: function getBodyOffsetWidth() {
                return document.body.offsetWidth;
            },
            custom: function getCustomWidth() {
                return customCalcMethods.width();
            },
            documentElementScroll: function getDEScrollWidth() {
                return document.documentElement.scrollWidth;
            },
            documentElementOffset: function getDEOffsetWidth() {
                return document.documentElement.offsetWidth;
            },
            scroll: function getMaxWidth() {
                return Math.max(getWidth.bodyScroll(), getWidth.documentElementScroll());
            },
            max: function getMaxWidth() {
                return Math.max.apply(null, getAllMeasurements(getWidth));
            },
            min: function getMinWidth() {
                return Math.min.apply(null, getAllMeasurements(getWidth));
            },
            rightMostElement: function rightMostElement() {
                return getMaxElement('right', getAllElements());
            },
            taggedElement: function getTaggedElementsWidth() {
                return getTaggedElements('right', 'data-iframe-width');
            }
        };
        function sizeIFrame(triggerEvent, triggerEventDesc, customHeight, customWidth) {
            function resizeIFrame() {
                height = currentHeight;
                width = currentWidth;
                sendMsg(height, width, triggerEvent);
            }
            function isSizeChangeDetected() {
                function checkTolarance(a, b) {
                    var retVal = Math.abs(a - b) <= tolerance;
                    return !retVal;
                }
                currentHeight =
                    undefined$1 !== customHeight ? customHeight : getHeight[heightCalcMode]();
                currentWidth =
                    undefined$1 !== customWidth ? customWidth : getWidth[widthCalcMode]();
                return (checkTolarance(height, currentHeight) ||
                    (calculateWidth && checkTolarance(width, currentWidth)));
            }
            function isForceResizableEvent() {
                return !(triggerEvent in { init: 1, interval: 1, size: 1 });
            }
            function isForceResizableCalcMode() {
                return (heightCalcMode in resetRequiredMethods ||
                    (calculateWidth && widthCalcMode in resetRequiredMethods));
            }
            function logIgnored() {
                log('No change in size detected');
            }
            function checkDownSizing() {
                if (isForceResizableEvent() && isForceResizableCalcMode()) {
                    resetIFrame(triggerEventDesc);
                }
                else if (!(triggerEvent in { interval: 1 })) {
                    logIgnored();
                }
            }
            var currentHeight, currentWidth;
            if (isSizeChangeDetected() || 'init' === triggerEvent) {
                lockTrigger();
                resizeIFrame();
            }
            else {
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
                return triggerLocked && triggerEvent in doubleEventList;
            }
            if (!isDoubleFiredEvent()) {
                recordTrigger();
                if (triggerEvent === 'init') {
                    sizeIFrame(triggerEvent, triggerEventDesc, customHeight, customWidth);
                }
                else {
                    sizeIFrameThrottled(triggerEvent, triggerEventDesc, customHeight, customWidth);
                }
            }
            else {
                log('Trigger event cancelled: ' + triggerEvent);
            }
        }
        function lockTrigger() {
            if (!triggerLocked) {
                triggerLocked = true;
                log('Trigger event lock on');
            }
            clearTimeout(triggerLockedTimer);
            triggerLockedTimer = setTimeout(function () {
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
                }
                else {
                    log('Message targetOrigin: ' + targetOrigin);
                }
            }
            function sendToParent() {
                var size = height + ':' + width, message = myID +
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
                    setTimeout(function () {
                        initLock = false;
                    }, eventCancelTimer);
                },
                reset: function resetFromParent() {
                    if (!initLock) {
                        log('Page size reset by host page');
                        triggerReset('resetPage');
                    }
                    else {
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
                },
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
                return msgID === ('' + event.data).substr(0, msgIdLen); // ''+ Protects against non-string messages
            }
            function getMessageType() {
                return event.data.split(']')[1].split(':')[0];
            }
            function getData() {
                return event.data.substr(event.data.indexOf(':') + 1);
            }
            function isMiddleTier() {
                return ((!(module.exports) &&
                    'iFrameResize' in window) ||
                    ('jQuery' in window && 'iFrameResize' in window.jQuery.prototype));
            }
            function isInitMsg() {
                // Test if this message is from a child below us. This is an ugly test, however, updating
                // the message format would break backwards compatibity.
                return event.data.split(':')[2] in { true: 1, false: 1 };
            }
            function callFromParent() {
                var messageType = getMessageType();
                if (messageType in processRequestFromParent) {
                    processRequestFromParent[messageType]();
                }
                else if (!isMiddleTier() && !isInitMsg()) {
                    warn('Unexpected message (' + event.data + ')');
                }
            }
            function processMessage() {
                if (false === firstRun) {
                    callFromParent();
                }
                else if (isInitMsg()) {
                    processRequestFromParent.init();
                }
                else {
                    log('Ignored message of type "' +
                        getMessageType() +
                        '". Received before initialization.');
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
var CrdsSubscribe = /** @class */ (function () {
    function CrdsSubscribe(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.modalIsShowing = false;
        this.handleSubscribeClick = function () {
            _this.modalIsShowing = true;
        };
        this.handleModalClose = function () {
            _this.modalIsShowing = false;
        };
    }
    CrdsSubscribe.prototype.componentDidUpdate = function () {
        iframeResizer$2.iframeResizer({}, this.frame);
    };
    CrdsSubscribe.prototype.render = function () {
        var _this = this;
        return (h(Fragment, null, h("div", { class: "subscribe-script" }), h("button", { onClick: this.handleSubscribeClick, class: "subscribe-button" }, this.title), h("crds-modal", { title: this.title, isActive: this.modalIsShowing, onClose: this.handleModalClose }, h("iframe", { ref: function (el) { return (_this.frame = el); }, src: this.src, class: "subscribe-frame", frameborder: "0" }))));
    };
    Object.defineProperty(CrdsSubscribe, "style", {
        get: function () { return ".subscribe-button{background-color:transparent;border:0;color:#0095d9;cursor:pointer;display:inline-block;font:inherit;font-weight:600;line-height:normal;margin:0;padding:11px 15px}.subscribe-button:focus{border:0;outline:none}.subscribe-frame{border:none;height:100%;width:100%}"; },
        enumerable: true,
        configurable: true
    });
    return CrdsSubscribe;
}());
var GiveMenu = /** @class */ (function () {
    function GiveMenu(hostRef) {
        registerInstance(this, hostRef);
        this.giveNavIsShowing = true;
        this.renderSections = function (payload) {
            var top_level = false;
            return (h("div", null, h("h2", null, " ", payload.title, " "), payload.children.map(function (child) {
                top_level = top_level || typeof child == 'string';
                return (h("div", { style: { padding: '0' } }, typeof child == 'string' && h("h4", null, child), typeof child != 'string' && (h("ul", null, child.map(function (el) {
                    if (typeof el != 'string')
                        return (h("li", { class: top_level ? '' : 'top-level' }, h("a", { href: el.href, "data-automation-id": el['automation-id'] }, el.title)));
                })))));
            })));
        };
    }
    GiveMenu.prototype.handleClick = function (event) {
        event.stopPropagation();
    };
    GiveMenu.prototype.render = function () {
        if (!this.giveNavIsShowing)
            return null;
        return (h("div", { class: "give-nav", style: { backgroundImage: "url(" + this.data.background_img + ")" } }, this.renderSections(this.data)));
    };
    Object.defineProperty(GiveMenu, "style", {
        get: function () { return ".give-nav,.profile-nav{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;color:#fff;background-color:#000;background-repeat:no-repeat;background-size:100%;height:100vh;left:0;max-height:100vh;overflow-y:scroll;position:fixed;top:48px;width:100vw;z-index:2}.give-nav div,.profile-nav div{height:auto;padding:30px 20px 90px}.give-nav a,.profile-nav a{color:#fff;display:inline-block;font-size:19px;margin-bottom:10px;padding-left:10px;text-decoration:none;text-transform:capitalize}.give-nav a.all,.profile-nav a.all{margin-bottom:30px}.give-nav a:hover,.profile-nav a:hover{color:#ccc}.give-nav h2,.profile-nav h2{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;font-size:48px;line-height:48px;margin:0;text-transform:uppercase;margin-bottom:20px}.give-nav h4,.profile-nav h4{font-size:11px;margin:0 0 10px;opacity:.5;text-transform:uppercase}.give-nav ul,.profile-nav ul{padding-left:0;margin-top:0}.give-nav ul li,.profile-nav ul li{list-style:none}.give-nav ul li.top-level a,.profile-nav ul li.top-level a{padding-left:0}\@media (min-width:992px){.give-nav,.profile-nav{height:auto;left:auto;margin-right:-15px;position:absolute;right:15px;width:375px}}\@media (min-width:1170px){.give-nav,.profile-nav{margin-right:0}}.give-nav::-webkit-scrollbar,.profile-nav::-webkit-scrollbar{width:0}.give-nav ul:last-of-type,.profile-nav ul:last-of-type{padding-bottom:30px}.give-nav{background-image:url(https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress)}.profile-nav:after{background-color:rgba(0,0,0,.75);content:\" \";z-index:-1}.profile-nav .profile-nav-img,.profile-nav:after{height:100%;left:0;position:absolute;top:0;width:100%}.profile-nav .profile-nav-img{background-position:top;background-repeat:no-repeat;background-size:contain;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-filter:blur(2px);filter:blur(2px);z-index:-2}\@media (min-width:992px){.profile-nav div{padding-bottom:0}}"; },
        enumerable: true,
        configurable: true
    });
    return GiveMenu;
}());
function isFunction(x) {
    return typeof x === 'function';
}
var _enable_super_gross_mode_that_will_cause_bad_things = false;
var config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
            var error_1 = new Error();
            console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error_1.stack);
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
    setTimeout(function () { throw err; }, 0);
}
var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
            throw err;
        }
        else {
            hostReportError(err);
        }
    },
    complete: function () { }
};
var isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
function isObject(x) {
    return x !== null && typeof x === 'object';
}
function UnsubscriptionErrorImpl(errors) {
    Error.call(this);
    this.message = errors ?
        errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
    return this;
}
UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
var UnsubscriptionError = UnsubscriptionErrorImpl;
var Subscription = /** @class */ (function () {
    function Subscription(unsubscribe) {
        this.closed = false;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        var errors;
        if (this.closed) {
            return;
        }
        var _b = this, _parentOrParents = _b._parentOrParents, _unsubscribe = _b._unsubscribe, _subscriptions = _b._subscriptions;
        this.closed = true;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (_parentOrParents instanceof Subscription) {
            _parentOrParents.remove(this);
        }
        else if (_parentOrParents !== null) {
            for (var index = 0; index < _parentOrParents.length; ++index) {
                var parent = _parentOrParents[index];
                parent.remove(this);
            }
        }
        if (isFunction(_unsubscribe)) {
            try {
                _unsubscribe.call(this);
            }
            catch (e) {
                errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
            }
        }
        if (isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject(sub)) {
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
    };
    Subscription.prototype.add = function (teardown) {
        var subscription = teardown;
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
                    var tmp = subscription;
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
        var _parentOrParents = subscription._parentOrParents;
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
        var subscriptions = this._subscriptions;
        if (subscriptions === null) {
            this._subscriptions = [subscription];
        }
        else {
            subscriptions.push(subscription);
        }
        return subscription;
    };
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    return Subscription;
}());
Subscription.EMPTY = (function (empty) {
    empty.closed = true;
    return empty;
}(new Subscription()));
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError) ? err.errors : err); }, []);
}
var rxSubscriber = typeof Symbol === 'function'
    ? Symbol('rxSubscriber')
    : '@@rxSubscriber_' + Math.random();
var Subscriber = /** @class */ (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        switch (arguments.length) {
            case 0:
                _this.destination = empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        _this.destination = destinationOrNext;
                        destinationOrNext.add(_this);
                    }
                    else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }
    Subscriber.prototype[rxSubscriber] = function () { return this; };
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _parentOrParents = this._parentOrParents;
        this._parentOrParents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parentOrParents = _parentOrParents;
        return this;
    };
    return Subscriber;
}(Subscription));
var SafeSubscriber = /** @class */ (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== empty) {
                context = Object.create(observerOrNext);
                if (isFunction(context.unsubscribe)) {
                    _this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = _this.unsubscribe.bind(_this);
            }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
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
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
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
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
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
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
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
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
function canReportError(observer) {
    while (observer) {
        var closed = observer.closed, destination = observer.destination, isStopped = observer.isStopped;
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
var observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';
function noop() { }
function pipeFromArray(fns) {
    if (!fns) {
        return noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
var Observable = /** @class */ (function () {
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber(observerOrNext, error, complete);
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
    };
    Observable.prototype._trySubscribe = function (sink) {
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
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
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
    };
    Observable.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
    };
    Observable.prototype[observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    return Observable;
}());
Observable.create = function (subscribe) {
    return new Observable(subscribe);
};
function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = Promise;
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
var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;
var SubjectSubscription = /** @class */ (function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        var _this = _super.call(this) || this;
        _this.subject = subject;
        _this.subscriber = subscriber;
        _this.closed = false;
        return _this;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription));
var SubjectSubscriber = /** @class */ (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        return _this;
    }
    return SubjectSubscriber;
}(Subscriber));
var Subject = /** @class */ (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.observers = [];
        _this.closed = false;
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype[rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
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
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable();
        observable.source = this;
        return observable;
    };
    return Subject;
}(Observable));
Subject.create = function (destination, source) {
    return new AnonymousSubject(destination, source);
};
var AnonymousSubject = /** @class */ (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
var BehaviorSubject = /** @class */ (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else {
            return this._value;
        }
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject;
}(Subject));
var EMPTY = new Observable(function (subscriber) { return subscriber.complete(); });
function empty$1(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
    return new Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
var subscribeToArray = function (array) { return function (subscriber) {
    for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
        subscriber.next(array[i]);
    }
    subscriber.complete();
}; };
function scheduleArray(input, scheduler) {
    return new Observable(function (subscriber) {
        var sub = new Subscription();
        var i = 0;
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
function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args[args.length - 1];
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
var ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;
function EmptyErrorImpl() {
    Error.call(this);
    this.message = 'no elements in sequence';
    this.name = 'EmptyError';
    return this;
}
EmptyErrorImpl.prototype = Object.create(Error.prototype);
var EmptyError = EmptyErrorImpl;
function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
var MapOperator = /** @class */ (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
var MapSubscriber = /** @class */ (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber));
var OuterSubscriber = /** @class */ (function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber));
var InnerSubscriber = /** @class */ (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        _this.index = 0;
        return _this;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber));
var subscribeToPromise = function (promise) { return function (subscriber) {
    promise.then(function (value) {
        if (!subscriber.closed) {
            subscriber.next(value);
            subscriber.complete();
        }
    }, function (err) { return subscriber.error(err); })
        .then(null, hostReportError);
    return subscriber;
}; };
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();
var subscribeToIterable = function (iterable) { return function (subscriber) {
    var iterator$1 = iterable[iterator]();
    do {
        var item = iterator$1.next();
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
        subscriber.add(function () {
            if (iterator$1.return) {
                iterator$1.return();
            }
        });
    }
    return subscriber;
}; };
var subscribeToObservable = function (obj) { return function (subscriber) {
    var obs = obj[observable]();
    if (typeof obs.subscribe !== 'function') {
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    }
    else {
        return obs.subscribe(subscriber);
    }
}; };
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
function isPromise(value) {
    return !!value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
var subscribeTo = function (result) {
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
        var value = isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = "You provided " + value + " where a stream was expected."
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
    }
};
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination) {
    if (destination === void 0) { destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex); }
    if (destination.closed) {
        return undefined;
    }
    if (result instanceof Observable) {
        return result.subscribe(destination);
    }
    return subscribeTo(result)(destination);
}
function scheduleObservable(input, scheduler) {
    return new Observable(function (subscriber) {
        var sub = new Subscription();
        sub.add(scheduler.schedule(function () {
            var observable$1 = input[observable]();
            sub.add(observable$1.subscribe({
                next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
                error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
                complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
            }));
        }));
        return sub;
    });
}
function schedulePromise(input, scheduler) {
    return new Observable(function (subscriber) {
        var sub = new Subscription();
        sub.add(scheduler.schedule(function () { return input.then(function (value) {
            sub.add(scheduler.schedule(function () {
                subscriber.next(value);
                sub.add(scheduler.schedule(function () { return subscriber.complete(); }));
            }));
        }, function (err) {
            sub.add(scheduler.schedule(function () { return subscriber.error(err); }));
        }); }));
        return sub;
    });
}
function scheduleIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable(function (subscriber) {
        var sub = new Subscription();
        var iterator$1;
        sub.add(function () {
            if (iterator$1 && typeof iterator$1.return === 'function') {
                iterator$1.return();
            }
        });
        sub.add(scheduler.schedule(function () {
            iterator$1 = input[iterator]();
            sub.add(scheduler.schedule(function () {
                if (subscriber.closed) {
                    return;
                }
                var value;
                var done;
                try {
                    var result = iterator$1.next();
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
function from(input, scheduler) {
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
function forkJoin() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    if (sources.length === 1) {
        var first_1 = sources[0];
        if (isArray(first_1)) {
            return forkJoinInternal(first_1, null);
        }
        if (isObject(first_1) && !isObservable(first_1)) {
            var keys = Object.keys(first_1);
            return forkJoinInternal(keys.map(function (key) { return first_1[key]; }), keys);
        }
    }
    if (typeof sources[sources.length - 1] === 'function') {
        var resultSelector_1 = sources.pop();
        sources = (sources.length === 1 && isArray(sources[0])) ? sources[0] : sources;
        return forkJoinInternal(sources, null).pipe(map(function (args) { return resultSelector_1.apply(void 0, args); }));
    }
    return forkJoinInternal(sources, null);
}
function forkJoinInternal(sources, keys) {
    return new Observable(function (subscriber) {
        var len = sources.length;
        if (len === 0) {
            subscriber.complete();
            return;
        }
        var values = new Array(len);
        var completed = 0;
        var emitted = 0;
        var _loop_1 = function (i) {
            var source = from(sources[i]);
            var hasValue = false;
            subscriber.add(source.subscribe({
                next: function (value) {
                    if (!hasValue) {
                        hasValue = true;
                        emitted++;
                    }
                    values[i] = value;
                },
                error: function (err) { return subscriber.error(err); },
                complete: function () {
                    completed++;
                    if (completed === len || !hasValue) {
                        if (emitted === len) {
                            subscriber.next(keys ?
                                keys.reduce(function (result, key, i) { return (result[key] = values[i], result); }, {}) :
                                values);
                        }
                        subscriber.complete();
                    }
                }
            }));
        };
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
    });
}
function filter(predicate, thisArg) {
    return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
    };
}
var FilterOperator = /** @class */ (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
var FilterSubscriber = /** @class */ (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        return _this;
    }
    FilterSubscriber.prototype._next = function (value) {
        var result;
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
    };
    return FilterSubscriber;
}(Subscriber));
var CrdsAuthenticationProviders;
(function (CrdsAuthenticationProviders) {
    CrdsAuthenticationProviders[CrdsAuthenticationProviders["Mp"] = 1] = "Mp";
    CrdsAuthenticationProviders[CrdsAuthenticationProviders["Okta"] = 2] = "Okta";
})(CrdsAuthenticationProviders || (CrdsAuthenticationProviders = {}));
function catchError(selector) {
    return function catchErrorOperatorFunction(source) {
        var operator = new CatchOperator(selector);
        var caught = source.lift(operator);
        return (operator.caught = caught);
    };
}
var CatchOperator = /** @class */ (function () {
    function CatchOperator(selector) {
        this.selector = selector;
    }
    CatchOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
    };
    return CatchOperator;
}());
var CatchSubscriber = /** @class */ (function (_super) {
    __extends(CatchSubscriber, _super);
    function CatchSubscriber(destination, selector, caught) {
        var _this = _super.call(this, destination) || this;
        _this.selector = selector;
        _this.caught = caught;
        return _this;
    }
    CatchSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var result = void 0;
            try {
                result = this.selector(err, this.caught);
            }
            catch (err2) {
                _super.prototype.error.call(this, err2);
                return;
            }
            this._unsubscribeAndRecycle();
            var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
            this.add(innerSubscriber);
            subscribeToResult(this, result, undefined, undefined, innerSubscriber);
        }
    };
    return CatchSubscriber;
}(OuterSubscriber));
function defaultIfEmpty(defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return function (source) { return source.lift(new DefaultIfEmptyOperator(defaultValue)); };
}
var DefaultIfEmptyOperator = /** @class */ (function () {
    function DefaultIfEmptyOperator(defaultValue) {
        this.defaultValue = defaultValue;
    }
    DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    };
    return DefaultIfEmptyOperator;
}());
var DefaultIfEmptySubscriber = /** @class */ (function (_super) {
    __extends(DefaultIfEmptySubscriber, _super);
    function DefaultIfEmptySubscriber(destination, defaultValue) {
        var _this = _super.call(this, destination) || this;
        _this.defaultValue = defaultValue;
        _this.isEmpty = true;
        return _this;
    }
    DefaultIfEmptySubscriber.prototype._next = function (value) {
        this.isEmpty = false;
        this.destination.next(value);
    };
    DefaultIfEmptySubscriber.prototype._complete = function () {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    };
    return DefaultIfEmptySubscriber;
}(Subscriber));
function throwIfEmpty(errorFactory) {
    if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
    return function (source) {
        return source.lift(new ThrowIfEmptyOperator(errorFactory));
    };
}
var ThrowIfEmptyOperator = /** @class */ (function () {
    function ThrowIfEmptyOperator(errorFactory) {
        this.errorFactory = errorFactory;
    }
    ThrowIfEmptyOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ThrowIfEmptySubscriber(subscriber, this.errorFactory));
    };
    return ThrowIfEmptyOperator;
}());
var ThrowIfEmptySubscriber = /** @class */ (function (_super) {
    __extends(ThrowIfEmptySubscriber, _super);
    function ThrowIfEmptySubscriber(destination, errorFactory) {
        var _this = _super.call(this, destination) || this;
        _this.errorFactory = errorFactory;
        _this.hasValue = false;
        return _this;
    }
    ThrowIfEmptySubscriber.prototype._next = function (value) {
        this.hasValue = true;
        this.destination.next(value);
    };
    ThrowIfEmptySubscriber.prototype._complete = function () {
        if (!this.hasValue) {
            var err = void 0;
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
    };
    return ThrowIfEmptySubscriber;
}(Subscriber));
function defaultErrorFactory() {
    return new EmptyError();
}
function take(count) {
    return function (source) {
        if (count === 0) {
            return empty$1();
        }
        else {
            return source.lift(new TakeOperator(count));
        }
    };
}
var TakeOperator = /** @class */ (function () {
    function TakeOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError;
        }
    }
    TakeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeSubscriber(subscriber, this.total));
    };
    return TakeOperator;
}());
var TakeSubscriber = /** @class */ (function (_super) {
    __extends(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.count = 0;
        return _this;
    }
    TakeSubscriber.prototype._next = function (value) {
        var total = this.total;
        var count = ++this.count;
        if (count <= total) {
            this.destination.next(value);
            if (count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    };
    return TakeSubscriber;
}(Subscriber));
function first(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) { return source.pipe(predicate ? filter(function (v, i) { return predicate(v, i, source); }) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new EmptyError(); })); };
}
function switchMap(project, resultSelector) {
    if (typeof resultSelector === 'function') {
        return function (source) { return source.pipe(switchMap(function (a, i) { return from(project(a, i)).pipe(map(function (b, ii) { return resultSelector(a, b, i, ii); })); })); };
    }
    return function (source) { return source.lift(new SwitchMapOperator(project)); };
}
var SwitchMapOperator = /** @class */ (function () {
    function SwitchMapOperator(project) {
        this.project = project;
    }
    SwitchMapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SwitchMapSubscriber(subscriber, this.project));
    };
    return SwitchMapOperator;
}());
var SwitchMapSubscriber = /** @class */ (function (_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.index = 0;
        return _this;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
        var destination = this.destination;
        destination.add(innerSubscriber);
        this.innerSubscription = subscribeToResult(this, result, value, index, innerSubscriber);
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
        this.unsubscribe();
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var destination = this.destination;
        destination.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    return SwitchMapSubscriber;
}(OuterSubscriber));
function tap(nextOrObserver, error, complete) {
    return function tapOperatorFunction(source) {
        return source.lift(new DoOperator(nextOrObserver, error, complete));
    };
}
var DoOperator = /** @class */ (function () {
    function DoOperator(nextOrObserver, error, complete) {
        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }
    DoOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TapSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    };
    return DoOperator;
}());
var TapSubscriber = /** @class */ (function (_super) {
    __extends(TapSubscriber, _super);
    function TapSubscriber(destination, observerOrNext, error, complete) {
        var _this = _super.call(this, destination) || this;
        _this._tapNext = noop;
        _this._tapError = noop;
        _this._tapComplete = noop;
        _this._tapError = error || noop;
        _this._tapComplete = complete || noop;
        if (isFunction(observerOrNext)) {
            _this._context = _this;
            _this._tapNext = observerOrNext;
        }
        else if (observerOrNext) {
            _this._context = observerOrNext;
            _this._tapNext = observerOrNext.next || noop;
            _this._tapError = observerOrNext.error || noop;
            _this._tapComplete = observerOrNext.complete || noop;
        }
        return _this;
    }
    TapSubscriber.prototype._next = function (value) {
        try {
            this._tapNext.call(this._context, value);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(value);
    };
    TapSubscriber.prototype._error = function (err) {
        try {
            this._tapError.call(this._context, err);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.error(err);
    };
    TapSubscriber.prototype._complete = function () {
        try {
            this._tapComplete.call(this._context);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        return this.destination.complete();
    };
    return TapSubscriber;
}(Subscriber));
var browserPonyfill = createCommonjsModule(function (module, exports) {
    var __self__ = (function (root) {
        function F() { this.fetch = false; }
        F.prototype = root;
        return new F();
    })(typeof self !== 'undefined' ? self : commonjsGlobal);
    (function (self) {
        var irrelevant = (function (exports) {
            var support = {
                searchParams: 'URLSearchParams' in self,
                iterable: 'Symbol' in self && 'iterator' in Symbol,
                blob: 'FileReader' in self &&
                    'Blob' in self &&
                    (function () {
                        try {
                            new Blob();
                            return true;
                        }
                        catch (e) {
                            return false;
                        }
                    })(),
                formData: 'FormData' in self,
                arrayBuffer: 'ArrayBuffer' in self
            };
            function isDataView(obj) {
                return obj && DataView.prototype.isPrototypeOf(obj);
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
                var isArrayBufferView = ArrayBuffer.isView ||
                    function (obj) {
                        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
                    };
            }
            function normalizeName(name) {
                if (typeof name !== 'string') {
                    name = String(name);
                }
                if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
                    throw new TypeError('Invalid character in header field name');
                }
                return name.toLowerCase();
            }
            function normalizeValue(value) {
                if (typeof value !== 'string') {
                    value = String(value);
                }
                return value;
            }
            // Build a destructive iterator for the value list
            function iteratorFor(items) {
                var iterator = {
                    next: function () {
                        var value = items.shift();
                        return { done: value === undefined, value: value };
                    }
                };
                if (support.iterable) {
                    iterator[Symbol.iterator] = function () {
                        return iterator;
                    };
                }
                return iterator;
            }
            function Headers(headers) {
                this.map = {};
                if (headers instanceof Headers) {
                    headers.forEach(function (value, name) {
                        this.append(name, value);
                    }, this);
                }
                else if (Array.isArray(headers)) {
                    headers.forEach(function (header) {
                        this.append(header[0], header[1]);
                    }, this);
                }
                else if (headers) {
                    Object.getOwnPropertyNames(headers).forEach(function (name) {
                        this.append(name, headers[name]);
                    }, this);
                }
            }
            Headers.prototype.append = function (name, value) {
                name = normalizeName(name);
                value = normalizeValue(value);
                var oldValue = this.map[name];
                this.map[name] = oldValue ? oldValue + ', ' + value : value;
            };
            Headers.prototype['delete'] = function (name) {
                delete this.map[normalizeName(name)];
            };
            Headers.prototype.get = function (name) {
                name = normalizeName(name);
                return this.has(name) ? this.map[name] : null;
            };
            Headers.prototype.has = function (name) {
                return this.map.hasOwnProperty(normalizeName(name));
            };
            Headers.prototype.set = function (name, value) {
                this.map[normalizeName(name)] = normalizeValue(value);
            };
            Headers.prototype.forEach = function (callback, thisArg) {
                for (var name in this.map) {
                    if (this.map.hasOwnProperty(name)) {
                        callback.call(thisArg, this.map[name], name, this);
                    }
                }
            };
            Headers.prototype.keys = function () {
                var items = [];
                this.forEach(function (value, name) {
                    items.push(name);
                });
                return iteratorFor(items);
            };
            Headers.prototype.values = function () {
                var items = [];
                this.forEach(function (value) {
                    items.push(value);
                });
                return iteratorFor(items);
            };
            Headers.prototype.entries = function () {
                var items = [];
                this.forEach(function (value, name) {
                    items.push([name, value]);
                });
                return iteratorFor(items);
            };
            if (support.iterable) {
                Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
            }
            function consumed(body) {
                if (body.bodyUsed) {
                    return Promise.reject(new TypeError('Already read'));
                }
                body.bodyUsed = true;
            }
            function fileReaderReady(reader) {
                return new Promise(function (resolve, reject) {
                    reader.onload = function () {
                        resolve(reader.result);
                    };
                    reader.onerror = function () {
                        reject(reader.error);
                    };
                });
            }
            function readBlobAsArrayBuffer(blob) {
                var reader = new FileReader();
                var promise = fileReaderReady(reader);
                reader.readAsArrayBuffer(blob);
                return promise;
            }
            function readBlobAsText(blob) {
                var reader = new FileReader();
                var promise = fileReaderReady(reader);
                reader.readAsText(blob);
                return promise;
            }
            function readArrayBufferAsText(buf) {
                var view = new Uint8Array(buf);
                var chars = new Array(view.length);
                for (var i = 0; i < view.length; i++) {
                    chars[i] = String.fromCharCode(view[i]);
                }
                return chars.join('');
            }
            function bufferClone(buf) {
                if (buf.slice) {
                    return buf.slice(0);
                }
                else {
                    var view = new Uint8Array(buf.byteLength);
                    view.set(new Uint8Array(buf));
                    return view.buffer;
                }
            }
            function Body() {
                this.bodyUsed = false;
                this._initBody = function (body) {
                    this._bodyInit = body;
                    if (!body) {
                        this._bodyText = '';
                    }
                    else if (typeof body === 'string') {
                        this._bodyText = body;
                    }
                    else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                        this._bodyBlob = body;
                    }
                    else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                        this._bodyFormData = body;
                    }
                    else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                        this._bodyText = body.toString();
                    }
                    else if (support.arrayBuffer && support.blob && isDataView(body)) {
                        this._bodyArrayBuffer = bufferClone(body.buffer);
                        // IE 10-11 can't handle a DataView body.
                        this._bodyInit = new Blob([this._bodyArrayBuffer]);
                    }
                    else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                        this._bodyArrayBuffer = bufferClone(body);
                    }
                    else {
                        this._bodyText = body = Object.prototype.toString.call(body);
                    }
                    if (!this.headers.get('content-type')) {
                        if (typeof body === 'string') {
                            this.headers.set('content-type', 'text/plain;charset=UTF-8');
                        }
                        else if (this._bodyBlob && this._bodyBlob.type) {
                            this.headers.set('content-type', this._bodyBlob.type);
                        }
                        else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                            this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
                        }
                    }
                };
                if (support.blob) {
                    this.blob = function () {
                        var rejected = consumed(this);
                        if (rejected) {
                            return rejected;
                        }
                        if (this._bodyBlob) {
                            return Promise.resolve(this._bodyBlob);
                        }
                        else if (this._bodyArrayBuffer) {
                            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                        }
                        else if (this._bodyFormData) {
                            throw new Error('could not read FormData body as blob');
                        }
                        else {
                            return Promise.resolve(new Blob([this._bodyText]));
                        }
                    };
                    this.arrayBuffer = function () {
                        if (this._bodyArrayBuffer) {
                            return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
                        }
                        else {
                            return this.blob().then(readBlobAsArrayBuffer);
                        }
                    };
                }
                this.text = function () {
                    var rejected = consumed(this);
                    if (rejected) {
                        return rejected;
                    }
                    if (this._bodyBlob) {
                        return readBlobAsText(this._bodyBlob);
                    }
                    else if (this._bodyArrayBuffer) {
                        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
                    }
                    else if (this._bodyFormData) {
                        throw new Error('could not read FormData body as text');
                    }
                    else {
                        return Promise.resolve(this._bodyText);
                    }
                };
                if (support.formData) {
                    this.formData = function () {
                        return this.text().then(decode);
                    };
                }
                this.json = function () {
                    return this.text().then(JSON.parse);
                };
                return this;
            }
            // HTTP methods whose capitalization should be normalized
            var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
            function normalizeMethod(method) {
                var upcased = method.toUpperCase();
                return methods.indexOf(upcased) > -1 ? upcased : method;
            }
            function Request(input, options) {
                options = options || {};
                var body = options.body;
                if (input instanceof Request) {
                    if (input.bodyUsed) {
                        throw new TypeError('Already read');
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
                }
                else {
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
                    throw new TypeError('Body not allowed for GET or HEAD requests');
                }
                this._initBody(body);
            }
            Request.prototype.clone = function () {
                return new Request(this, { body: this._bodyInit });
            };
            function decode(body) {
                var form = new FormData();
                body
                    .trim()
                    .split('&')
                    .forEach(function (bytes) {
                    if (bytes) {
                        var split = bytes.split('=');
                        var name = split.shift().replace(/\+/g, ' ');
                        var value = split.join('=').replace(/\+/g, ' ');
                        form.append(decodeURIComponent(name), decodeURIComponent(value));
                    }
                });
                return form;
            }
            function parseHeaders(rawHeaders) {
                var headers = new Headers();
                // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
                // https://tools.ietf.org/html/rfc7230#section-3.2
                var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
                preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
                    var parts = line.split(':');
                    var key = parts.shift().trim();
                    if (key) {
                        var value = parts.join(':').trim();
                        headers.append(key, value);
                    }
                });
                return headers;
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
            Response.prototype.clone = function () {
                return new Response(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new Headers(this.headers),
                    url: this.url
                });
            };
            Response.error = function () {
                var response = new Response(null, { status: 0, statusText: '' });
                response.type = 'error';
                return response;
            };
            var redirectStatuses = [301, 302, 303, 307, 308];
            Response.redirect = function (url, status) {
                if (redirectStatuses.indexOf(status) === -1) {
                    throw new RangeError('Invalid status code');
                }
                return new Response(null, { status: status, headers: { location: url } });
            };
            exports.DOMException = self.DOMException;
            try {
                new exports.DOMException();
            }
            catch (err) {
                exports.DOMException = function (message, name) {
                    this.message = message;
                    this.name = name;
                    var error = Error(message);
                    this.stack = error.stack;
                };
                exports.DOMException.prototype = Object.create(Error.prototype);
                exports.DOMException.prototype.constructor = exports.DOMException;
            }
            function fetch(input, init) {
                return new Promise(function (resolve, reject) {
                    var request = new Request(input, init);
                    if (request.signal && request.signal.aborted) {
                        return reject(new exports.DOMException('Aborted', 'AbortError'));
                    }
                    var xhr = new XMLHttpRequest();
                    function abortXhr() {
                        xhr.abort();
                    }
                    xhr.onload = function () {
                        var options = {
                            status: xhr.status,
                            statusText: xhr.statusText,
                            headers: parseHeaders(xhr.getAllResponseHeaders() || '')
                        };
                        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
                        var body = 'response' in xhr ? xhr.response : xhr.responseText;
                        resolve(new Response(body, options));
                    };
                    xhr.onerror = function () {
                        reject(new TypeError('Network request failed'));
                    };
                    xhr.ontimeout = function () {
                        reject(new TypeError('Network request failed'));
                    };
                    xhr.onabort = function () {
                        reject(new exports.DOMException('Aborted', 'AbortError'));
                    };
                    xhr.open(request.method, request.url, true);
                    if (request.credentials === 'include') {
                        xhr.withCredentials = true;
                    }
                    else if (request.credentials === 'omit') {
                        xhr.withCredentials = false;
                    }
                    if ('responseType' in xhr && support.blob) {
                        xhr.responseType = 'blob';
                    }
                    request.headers.forEach(function (value, name) {
                        xhr.setRequestHeader(name, value);
                    });
                    if (request.signal) {
                        request.signal.addEventListener('abort', abortXhr);
                        xhr.onreadystatechange = function () {
                            // DONE (success or failure)
                            if (xhr.readyState === 4) {
                                request.signal.removeEventListener('abort', abortXhr);
                            }
                        };
                    }
                    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
                });
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
        .then(function (response) {
        var error = !response.ok;
        var status = response.status;
        var respHandler = function (resp) {
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
        }
        else {
            return response.text().then(respHandler);
        }
    });
    return fetchPromise;
}
var fetchRequest_1 = fetchRequest;
var js_cookie = createCommonjsModule(function (module, exports) {
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
        function extend() {
            var i = 0;
            var result = {};
            for (; i < arguments.length; i++) {
                var attributes = arguments[i];
                for (var key in attributes) {
                    result[key] = attributes[key];
                }
            }
            return result;
        }
        function init(converter) {
            function api(key, value, attributes) {
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
                    }
                    catch (e) { }
                    if (!converter.write) {
                        value = encodeURIComponent(String(value))
                            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                    }
                    else {
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
                            }
                            catch (e) { }
                        }
                        if (key === name) {
                            result = cookie;
                            break;
                        }
                        if (!key) {
                            result[name] = cookie;
                        }
                    }
                    catch (e) { }
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
        return init(function () { });
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
        }
        catch (e) {
            throw new AuthSdkError_1('Unable to parse storage string: ' + storageName);
        }
    }
    function setStorage(storage) {
        try {
            var storageString = JSON.stringify(storage);
            webstorage.setItem(storageName, storageString);
        }
        catch (e) {
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
    "SDK_VERSION": "2.6.0"
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
storageUtil.browserHasLocalStorage = function () {
    try {
        var storage = storageUtil.getLocalStorage();
        return storageUtil.testStorage(storage);
    }
    catch (e) {
        return false;
    }
};
storageUtil.browserHasSessionStorage = function () {
    try {
        var storage = storageUtil.getSessionStorage();
        return storageUtil.testStorage(storage);
    }
    catch (e) {
        return false;
    }
};
storageUtil.getPKCEStorage = function () {
    if (storageUtil.browserHasLocalStorage()) {
        return storageBuilder_1(storageUtil.getLocalStorage(), config$1.PKCE_STORAGE_NAME);
    }
    else if (storageUtil.browserHasSessionStorage()) {
        return storageBuilder_1(storageUtil.getSessionStorage(), config$1.PKCE_STORAGE_NAME);
    }
    else {
        return storageBuilder_1(storageUtil.getCookieStorage(), config$1.PKCE_STORAGE_NAME);
    }
};
storageUtil.getHttpCache = function () {
    if (storageUtil.browserHasLocalStorage()) {
        return storageBuilder_1(storageUtil.getLocalStorage(), config$1.CACHE_STORAGE_NAME);
    }
    else if (storageUtil.browserHasSessionStorage()) {
        return storageBuilder_1(storageUtil.getSessionStorage(), config$1.CACHE_STORAGE_NAME);
    }
    else {
        return storageBuilder_1(storageUtil.getCookieStorage(), config$1.CACHE_STORAGE_NAME);
    }
};
storageUtil.getLocalStorage = function () {
    return localStorage;
};
storageUtil.getSessionStorage = function () {
    return sessionStorage;
};
// Provides webStorage-like interface for cookies
storageUtil.getCookieStorage = function (options) {
    options = options || {};
    return {
        getItem: storageUtil.storage.get,
        setItem: function (key, value) {
            // Cookie shouldn't expire
            storageUtil.storage.set(key, value, '2200-01-01T00:00:00.000Z', options.secure);
        }
    };
};
storageUtil.testStorage = function (storage) {
    var key = 'okta-test-storage';
    try {
        storage.setItem(key, key);
        storage.removeItem(key);
        return true;
    }
    catch (e) {
        return false;
    }
};
storageUtil.storage = {
    set: function (name, value, expiresAt, secure) {
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
        js_cookie.set(name, value, cookieOptions);
        return storageUtil.storage.get(name);
    },
    get: function (name) {
        return js_cookie.get(name);
    },
    delete: function (name) {
        return js_cookie.remove(name, { path: '/' });
    }
};
var browserStorage = storageUtil;
var base64 = createCommonjsModule(function (module, exports) {
    (function () {
        var object = exports; // #8: web workers
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        function InvalidCharacterError(message) {
            this.message = message;
        }
        InvalidCharacterError.prototype = new Error;
        InvalidCharacterError.prototype.name = 'InvalidCharacterError';
        // encoder
        // [https://gist.github.com/999166] by [https://github.com/nignag]
        object.btoa || (object.btoa = function (input) {
            var str = String(input);
            for (
            // initialize result and counter
            var block, charCode, idx = 0, map = chars, output = ''; 
            // if the next str index does not exist:
            //   change the mapping table to "="
            //   check if d has no fractional digits
            str.charAt(idx | 0) || (map = '=', idx % 1); 
            // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
            output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
                charCode = str.charCodeAt(idx += 3 / 4);
                if (charCode > 0xFF) {
                    throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                }
                block = block << 8 | charCode;
            }
            return output;
        });
        // decoder
        // [https://gist.github.com/1020396] by [https://github.com/atk]
        object.atob || (object.atob = function (input) {
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
                bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
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
    Array.prototype.indexOf = function (searchElement, fromIndex) {
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
    Array.isArray = function (obj) {
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
    util.stringToBase64Url = function (str) {
        var b64 = btoa(str);
        return util.base64ToBase64Url(b64);
    };
    // converts a standard base64-encoded string to a "url/filename safe" variant
    util.base64ToBase64Url = function (b64) {
        return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    };
    // converts a "url/filename safe" base64 string to a "standard" base64 string
    util.base64UrlToBase64 = function (b64u) {
        return b64u.replace(/-/g, '+').replace(/_/g, '/');
    };
    util.base64UrlToString = function (b64u) {
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
        }
        catch (e) {
            return utf8;
        }
    };
    util.stringToBuffer = function (str) {
        var buffer = new Uint8Array(str.length);
        for (var i = 0; i < str.length; i++) {
            buffer[i] = str.charCodeAt(i);
        }
        return buffer;
    };
    util.base64UrlDecode = function (str) {
        return atob(util.base64UrlToBase64(str));
    };
    util.bind = function (fn, ctx) {
        var additionalArgs = Array.prototype.slice.call(arguments, 2);
        return function () {
            var args = Array.prototype.slice.call(arguments);
            args = additionalArgs.concat(args);
            return fn.apply(ctx, args);
        };
    };
    util.isAbsoluteUrl = function (url) {
        return /^(?:[a-z]+:)?\/\//i.test(url);
    };
    util.isString = function (obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    };
    util.isObject = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };
    util.isNumber = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Number]';
    };
    util.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    util.isoToUTCString = function (str) {
        var parts = str.match(/\d+/g), isoTime = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]), isoDate = new Date(isoTime);
        return isoDate.toUTCString();
    };
    util.toQueryParams = function (obj) {
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
        }
        else {
            return '';
        }
    };
    util.genRandomString = function (length) {
        var randomCharset = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var random = '';
        for (var c = 0, cl = randomCharset.length; c < length; ++c) {
            random += randomCharset[Math.floor(Math.random() * cl)];
        }
        return random;
    };
    util.extend = function () {
        var obj1 = arguments[0];
        var objArray = [].slice.call(arguments, 1);
        objArray.forEach(function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    obj1[prop] = obj[prop];
                }
            }
        });
    };
    util.removeNils = function (obj) {
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
    util.clone = function (obj) {
        if (obj) {
            var str = JSON.stringify(obj);
            if (str) {
                return JSON.parse(str);
            }
        }
        return obj;
    };
    // Analogous to _.omit
    util.omit = function (obj) {
        var props = Array.prototype.slice.call(arguments, 1);
        var newobj = {};
        for (var p in obj) {
            if (obj.hasOwnProperty(p) && props.indexOf(p) == -1) {
                newobj[p] = obj[p];
            }
        }
        return util.clone(newobj);
    };
    util.find = function (collection, searchParams) {
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
    util.getLink = function (obj, linkName, altName) {
        if (!obj || !obj._links) {
            return;
        }
        var link = util.clone(obj._links[linkName]);
        // If a link has a name and we have an altName, return if they match
        if (link && link.name && altName) {
            if (link.name === altName) {
                return link;
            }
        }
        else {
            return link;
        }
    };
    util.getNativeConsole = function () {
        if (typeof window !== 'undefined') {
            return window.console;
        }
        else if (typeof console !== 'undefined') {
            return console;
        }
        else {
            return undefined;
        }
    };
    util.getConsole = function () {
        var nativeConsole = util.getNativeConsole();
        if (nativeConsole && nativeConsole.log) {
            return nativeConsole;
        }
        return {
            log: function () { }
        };
    };
    util.warn = function (text) {
        /* eslint-disable no-console */
        util.getConsole().log('[okta-auth-sdk] WARN: ' + text);
        /* eslint-enable */
    };
    util.deprecate = function (text) {
        /* eslint-disable no-console */
        util.getConsole().log('[okta-auth-sdk] DEPRECATION: ' + text);
        /* eslint-enable */
    };
    util.deprecateWrap = function (text, fn) {
        return function () {
            util.deprecate(text);
            return fn.apply(null, arguments);
        };
    };
    util.removeTrailingSlash = function (path) {
        if (!path) {
            return;
        }
        // Remove any whitespace before or after string
        var trimmed = path.replace(/^\s+|\s+$/gm, '');
        if (trimmed.slice(-1) === '/') {
            return trimmed.slice(0, -1);
        }
        return trimmed;
    };
    util.isIE11OrLess = function () {
        return !!document.documentMode && document.documentMode <= 11;
    };
    util.isFunction = function (fn) {
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
        }
        else {
            module.exports = definition();
            // RequireJS
        }
    })(function () {
        var hasStacks = false;
        try {
            throw new Error();
        }
        catch (e) {
            hasStacks = !!e.stack;
        }
        // All code after this point will be filtered from stack traces reported
        // by Q.
        var qStartingLine = captureLine();
        var qFileName;
        // shims
        // used for fallback in "allResolved"
        var noop = function () { };
        // Use the fastest possible means to execute a task in a future turn
        // of the event loop.
        var nextTick$1 = (function () {
            // linked list of tasks (single, with head node)
            var head = { task: void 0, next: null };
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
                }
                catch (e) {
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
                    }
                    else {
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
            }
            else if (typeof setImmediate === "function") {
                // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
                if (typeof window !== "undefined") {
                    requestTick = setImmediate.bind(window, flush);
                }
                else {
                    requestTick = function () {
                        setImmediate(flush);
                    };
                }
            }
            else if (typeof MessageChannel !== "undefined") {
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
            }
            else {
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
        var array_reduce = uncurryThis(Array.prototype.reduce || function (callback, basis) {
            var index = 0, length = this.length;
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
        });
        var array_indexOf = uncurryThis(Array.prototype.indexOf || function (value) {
            // not a very good shim, but good enough for our one use of it
            for (var i = 0; i < this.length; i++) {
                if (this[i] === value) {
                    return i;
                }
            }
            return -1;
        });
        var array_map = uncurryThis(Array.prototype.map || function (callback, thisp) {
            var self = this;
            var collect = [];
            array_reduce(self, function (undefined, value, index) {
                collect.push(callback.call(thisp, value, index, self));
            }, void 0);
            return collect;
        });
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
            return (object_toString(exception) === "[object StopIteration]" ||
                exception instanceof QReturnValue);
        }
        // FIXME: Remove this helper and Q.return once ES6 generators are in
        // SpiderMonkey.
        var QReturnValue;
        if (typeof ReturnValue !== "undefined") {
            QReturnValue = ReturnValue;
        }
        else {
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
                error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1) {
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
            }
            catch (e) {
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
            }
            else {
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
                }
                else {
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
                }
                catch (e) {
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
                array_reduce(messages, function (undefined, message) {
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
                array_reduce(progressListeners, function (undefined, progressListener) {
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
                }
                else if (arguments.length > 2) {
                    self.resolve(array_slice(arguments, 1));
                }
                else {
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
            }
            catch (reason) {
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
                }
                else {
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
                    return reject(new Error("Promise does not support operation: " + op));
                };
            }
            if (inspect === void 0) {
                inspect = function () {
                    return { state: "unknown" };
                };
            }
            var promise = object_create(Promise.prototype);
            promise.promiseDispatch = function (resolve, op, args) {
                var result;
                try {
                    if (descriptor[op]) {
                        result = descriptor[op].apply(promise, args);
                    }
                    else {
                        result = fallback.call(promise, op, args);
                    }
                }
                catch (exception) {
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
            var done = false; // ensure the untrusted promise makes at most a
            // single call to one of the callbacks
            function _fulfilled(value) {
                try {
                    return typeof fulfilled === "function" ? fulfilled(value) : value;
                }
                catch (exception) {
                    return reject(exception);
                }
            }
            function _rejected(exception) {
                if (typeof rejected === "function") {
                    makeStackTraceLong(exception, self);
                    try {
                        return rejected(exception);
                    }
                    catch (newException) {
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
                    }
                    catch (e) {
                        threw = true;
                        if (Q.onerror) {
                            Q.onerror(e);
                        }
                        else {
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
                        reportedUnhandledRejections.push(promise);
                    }
                });
            }
            unhandledRejections.push(promise);
            if (reason && typeof reason.stack !== "undefined") {
                unhandledReasons.push(reason.stack);
            }
            else {
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
                    }
                    else {
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
                }
                catch (exception) {
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
                "isDef": function () { }
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
                        }
                        catch (exception) {
                            return reject(exception);
                        }
                        if (result.done) {
                            return Q(result.value);
                        }
                        else {
                            return when(result.value, callback, errback);
                        }
                    }
                    else {
                        // SpiderMonkey Generators
                        // FIXME: Remove this case when SM does ES6 generators.
                        try {
                            result = generator[verb](arg);
                        }
                        catch (exception) {
                            if (isStopIteration(exception)) {
                                return Q(exception.value);
                            }
                            else {
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
        Promise.prototype.fcall = function ( /*...args*/) {
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
        Promise.prototype.fbind = function ( /*...args*/) {
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
                array_reduce(promises, function (undefined, promise, index) {
                    var snapshot;
                    if (isPromise(promise) &&
                        (snapshot = promise.inspect()).state === "fulfilled") {
                        promises[index] = snapshot.value;
                    }
                    else {
                        ++pendingCount;
                        when(promise, function (value) {
                            promises[index] = value;
                            if (--pendingCount === 0) {
                                deferred.resolve(promises);
                            }
                        }, deferred.reject, function (progress) {
                            deferred.notify({ index: index, value: progress });
                        });
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
                        deferred.reject(new Error("Can't get fulfillment value from any promise, all " +
                            "promises were rejected."));
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
                    }
                    else {
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
        Promise.prototype.nfcall = function ( /*...args*/) {
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
            Promise.prototype.denodeify = function ( /*...args*/) {
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
        Promise.prototype.nbind = function ( /*thisp, ...args*/) {
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
            }
            else {
                return this;
            }
        };
        Q.noConflict = function () {
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
    var url = options.url, method = options.method, args = options.args, saveAuthnState = options.saveAuthnState, accessToken = options.accessToken, withCredentials = options.withCredentials !== false, // default value is true
    storageUtil = sdk.options.storageUtil, storage = storageUtil.storage, httpCache = storageUtil.getHttpCache();
    if (options.cacheResponse) {
        var cacheContents = httpCache.getStorage();
        var cachedResponse = cacheContents[url];
        if (cachedResponse && Date.now() / 1000 < cachedResponse.expiresAt) {
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
        .then(function (resp) {
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
                expiresAt: Math.floor(Date.now() / 1000) + config$1.DEFAULT_CACHE_DURATION,
                response: res
            });
        }
        return res;
    })
        .fail(function (resp) {
        var serverErr = resp.responseText || {};
        if (util_1.isString(serverErr)) {
            try {
                serverErr = JSON.parse(serverErr);
            }
            catch (e) {
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
        }
        else {
            return q.reject(new AuthSdkError_1('No transaction to resume'));
        }
    }
    return sdk.tx.status(args)
        .then(function (res) {
        return new AuthTransaction(sdk, res);
    });
}
function transactionExists(sdk) {
    // We have a cookie state token
    return !!sdk.tx.exists._get(config$1.STATE_TOKEN_KEY_NAME);
}
function postToTransaction(sdk, url, args, options) {
    return http.post(sdk, url, args, options)
        .then(function (res) {
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
        }
        else if (util_1.isObject(options)) {
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
                }
                else {
                    // Any non-waiting result, even if polling was stopped
                    // during a request, will return
                    ref.isPolling = false;
                    return new AuthTransaction(sdk, pollRes);
                }
            })
                .fail(function (err) {
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
            .fail(function (err) {
            ref.isPolling = false;
            throw err;
        });
    };
}
function link2fn(sdk, res, obj, link, ref) {
    if (Array.isArray(link)) {
        return function (name, opts) {
            if (!name) {
                throw new AuthSdkError_1('Must provide a link name');
            }
            var lk = util_1.find(link, { name: name });
            if (!lk) {
                throw new AuthSdkError_1('No link found for that name');
            }
            return link2fn(sdk, res, obj, lk, ref)(opts);
        };
    }
    else if (link.hints &&
        link.hints.allow &&
        link.hints.allow.length === 1) {
        var method = link.hints.allow[0];
        switch (method) {
            case 'GET':
                return function () {
                    return http.get(sdk, link.href);
                };
            case 'POST':
                return function (opts) {
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
                    }
                    else if (data.profile &&
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
            this.cancel = function () {
                return new q(new AuthTransaction(sdk));
            };
        }
    }
}
var tx = {
    transactionStatus: transactionStatus,
    resumeTransaction: resumeTransaction,
    transactionExists: transactionExists,
    postToTransaction: postToTransaction
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
        }
        else {
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
    return function (storageUtil, httpRequestClient) {
        function OktaAuth(args) {
            if (!(this instanceof OktaAuth)) {
                return new OktaAuth(args);
            }
            if (args) {
                args.storageUtil = storageUtil;
                if (args.ajaxRequest) {
                    util_1.deprecate('ajaxRequest is being deprecated, use httpRequestClient attribute instead.');
                    args.httpRequestClient = args.ajaxRequest;
                }
                else if (!args.httpRequestClient) {
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
    }
    else {
        eventTarget.attachEvent('on' + name, fn);
    }
}
function removeListener(eventTarget, name, fn) {
    if (eventTarget.removeEventListener) {
        eventTarget.removeEventListener(name, fn);
    }
    else {
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
    }
    else {
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
        .then(function (wellKnown) {
        var jwksUri = wellKnown['jwks_uri'];
        // Check our kid against the cached version (if it exists and isn't expired)
        var cacheContents = httpCache.getStorage();
        var cachedResponse = cacheContents[jwksUri];
        if (cachedResponse && Date.now() / 1000 < cachedResponse.expiresAt) {
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
            .then(function (res) {
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
    var now = Math.floor(new Date().getTime() / 1000);
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
    }
    else {
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
        if (!param) {
            break;
        }
        var key = param[1];
        var value = param[2];
        // id_token should remain base64url encoded
        if (key === 'id_token' || key === 'access_token' || key === 'code') {
            obj[key] = value;
        }
        else {
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
        .then(function (res) {
        if (res.status === 'ACTIVE') {
            return true;
        }
        return false;
    })
        .fail(function () {
        return false;
    });
}
function getSession(sdk) {
    return http.get(sdk, '/api/v1/sessions/me')
        .then(function (session) {
        var res = util_1.omit(session, '_links');
        res.refresh = function () {
            return http.post(sdk, util_1.getLink(session, 'refresh').href);
        };
        res.user = function () {
            return http.get(sdk, util_1.getLink(session, 'user').href);
        };
        return res;
    })
        .fail(function () {
        // Return INACTIVE status on failure
        return { status: 'INACTIVE' };
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
    return crypto.subtle.importKey(format, key, algo, extractable, usages)
        .then(function (cryptoKey) {
        var jwt = idToken.split('.');
        var payload = util_1.stringToBuffer(jwt[0] + '.' + jwt[1]);
        var b64Signature = util_1.base64UrlDecode(jwt[2]);
        var signature = util_1.stringToBuffer(b64Signature);
        return crypto.subtle.verify(algo, cryptoKey, signature, payload);
    });
}
var crypto_1 = {
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
function dec2hex(dec) {
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
    return crypto.subtle.digest('SHA-256', buffer).then(function (arrayBuffer) {
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
    if (oauthOptions.grantType !== 'authorization_code') {
        throw new AuthSdkError_1('Expecting "grantType" to equal "authorization_code"');
    }
}
function getPostData(options) {
    // Convert options to OAuth params
    var params = util_1.removeNils({
        'client_id': options.clientId,
        'redirect_uri': options.redirectUri,
        'grant_type': options.grantType,
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
var cookies = browserStorage.storage;
function decodeToken(token) {
    var jwt = token.split('.');
    var decodedToken;
    try {
        decodedToken = {
            header: JSON.parse(util_1.base64UrlToString(jwt[0])),
            payload: JSON.parse(util_1.base64UrlToString(jwt[1])),
            signature: jwt[2]
        };
    }
    catch (e) {
        throw new AuthSdkError_1('Malformed token');
    }
    return decodedToken;
}
function verifyToken$1(sdk, token, validationParams) {
    return new q()
        .then(function () {
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
            .then(function (key) {
            return crypto_1.verifyToken(token.idToken, key);
        })
            .then(function (valid) {
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
        .fin(function () {
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
            }
            else if (windowEl && !windowEl.closed) {
                setTimeout(hashChangeHandler, 500);
            }
        }
        catch (err) {
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
        grantType: 'authorization_code',
        authorizationCode: authorizationCode,
        codeVerifier: meta.codeVerifier,
        redirectUri: meta.redirectUri
    };
    return pkce.getToken(sdk, getTokenParams, urls)
        .then(function (res) {
        validateResponse(res, getTokenParams);
        return res;
    })
        .fin(function () {
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
        .then(function () {
        validateResponse(res, oauthParams);
        // We do not support "hybrid" scenarios where the response includes both a code and a token.
        // If the response contains a code it is used immediately to obtain new tokens.
        if (res['code']) {
            responseType = ['token', 'id_token']; // what we expect the code to provide us
            return exchangeCodeForToken(sdk, oauthParams, res['code'], urls);
        }
        return res;
    }).then(function (res) {
        var tokenDict = {};
        if (res['access_token']) {
            tokenDict['token'] = {
                accessToken: res['access_token'],
                expiresAt: Number(res['expires_in']) + Math.floor(Date.now() / 1000),
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
                .then(function () {
                tokenDict['id_token'] = idToken;
                return tokenDict;
            });
        }
        return tokenDict;
    })
        .then(function (tokenDict) {
        if (!Array.isArray(responseType)) {
            return tokenDict[responseType];
        }
        // Validate response against tokenTypes
        var validateTokenTypes = ['token', 'id_token'];
        validateTokenTypes.filter(function (key) {
            return (responseType.indexOf(key) !== -1);
        }).forEach(function (key) {
            if (!tokenDict[key]) {
                throw new AuthSdkError_1('Unable to parse OAuth flow response: ' + key + ' was not returned.');
            }
        });
        // Create token array in the order of the responseType array
        return responseType.map(function (item) {
            return tokenDict[item];
        });
    });
}
function getDefaultOAuthParams(sdk, oauthOptions) {
    oauthOptions = util_1.clone(oauthOptions) || {};
    var grantType = sdk.options.grantType || 'implicit';
    var responseType = grantType === 'authorization_code' ? 'code' : 'id_token';
    var defaults = {
        grantType: grantType,
        clientId: sdk.options.clientId,
        redirectUri: sdk.options.redirectUri || window.location.href,
        responseType: responseType,
        responseMode: 'okta_post_message',
        state: oauthUtil.generateState(),
        nonce: oauthUtil.generateNonce(),
        scopes: ['openid', 'email'],
        ignoreSignature: sdk.options.ignoreSignature
    };
    util_1.extend(defaults, oauthOptions);
    if (defaults.grantType === 'authorization_code' && !defaults.codeChallengeMethod) {
        defaults.codeChallengeMethod = pkce.DEFAULT_CODE_CHALLENGE_METHOD;
    }
    return defaults;
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
        'redirect_uri': oauthParams.redirectUri,
        'response_type': oauthParams.responseType,
        'response_mode': oauthParams.responseMode,
        'state': oauthParams.state,
        'nonce': oauthParams.nonce,
        'prompt': oauthParams.prompt,
        'display': oauthParams.display,
        'sessionToken': oauthParams.sessionToken,
        'idp': oauthParams.idp,
        'max_age': oauthParams.maxAge,
        'code_challenge': oauthParams.codeChallenge,
        'code_challenge_method': oauthParams.codeChallengeMethod
    });
    if (Array.isArray(oauthQueryParams['response_type'])) {
        oauthQueryParams['response_type'] = oauthQueryParams['response_type'].join(' ');
    }
    if (oauthParams.responseType.indexOf('id_token') !== -1 &&
        oauthParams.scopes.indexOf('openid') === -1) {
        throw new AuthSdkError_1('openid scope must be specified in the scopes argument when requesting an id_token');
    }
    else {
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
        .then(function (oauthParams) {
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
        }
        else if (oauthOptions.idp) {
            util_1.extend(oauthParams, idpOverrides);
        }
        // Use the query params to build the authorize url
        var requestUrl, endpoint, urls;
        try {
            // Get authorizeUrl and issuer
            urls = oauthUtil.getOAuthUrls(sdk, oauthParams, options);
            endpoint = oauthOptions.codeVerifier ? urls.tokenUrl : urls.authorizeUrl;
            requestUrl = endpoint + buildAuthorizeParams(oauthParams);
        }
        catch (e) {
            return q.reject(e);
        }
        // Determine the flow type
        var flowType;
        if (oauthParams.sessionToken || oauthParams.display === null) {
            flowType = 'IFRAME';
        }
        else if (oauthParams.display === 'popup') {
            flowType = 'POPUP';
        }
        else {
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
                    .then(function (res) {
                    return handleOAuthResponse(sdk, oauthParams, res, urls);
                })
                    .fin(function () {
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
                var closePoller = setInterval(function () {
                    hasClosed(windowEl);
                }, 500);
                // Proxy the promise results into the deferred
                popupPromise
                    .then(function (res) {
                    popupDeferred.resolve(res);
                })
                    .fail(function (err) {
                    popupDeferred.reject(err);
                });
                return popupDeferred.promise
                    .then(function (res) {
                    return handleOAuthResponse(sdk, oauthParams, res, urls);
                })
                    .fin(function () {
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
    var oauthParams = getDefaultOAuthParams(sdk, oauthOptions);
    var responseType = oauthParams.responseType;
    if (typeof responseType === 'string') {
        responseType = [responseType];
    }
    if (oauthParams.grantType !== 'authorization_code') {
        if (responseType.includes('code')) {
            return q.reject(new AuthSdkError_1('When responseType is "code", grantType should be "authorization_code"'));
        }
        return q.resolve(oauthParams);
    }
    if (!sdk.features.isPKCESupported()) {
        return q.reject(new AuthSdkError_1('This browser doesn\'t support PKCE'));
    }
    if (responseType.length !== 1 || responseType[0] !== 'code') {
        return q.reject(new AuthSdkError_1('When grantType is "authorization_code", responseType should be "code"'));
    }
    return oauthUtil.getWellKnown(sdk, null)
        .then(function (res) {
        var methods = res['code_challenge_methods_supported'] || [];
        if (methods.indexOf(oauthParams.codeChallengeMethod) === -1) {
            throw new AuthSdkError_1('Invalid code_challenge_method');
        }
    })
        .then(function () {
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
        .then(function (codeChallenge) {
        // Clone/copy the params. Set codeChallenge and responseType for authorization_code
        var clonedParams = util_1.clone(oauthParams) || {};
        util_1.extend(clonedParams, oauthParams, {
            codeChallenge: codeChallenge,
        });
        return clonedParams;
    });
}
function getWithRedirect(sdk, oauthOptions, options) {
    oauthOptions = util_1.clone(oauthOptions) || {};
    if (!oauthOptions.responseMode) {
        oauthOptions.responseMode = 'fragment';
    }
    return prepareOauthParams(sdk, oauthOptions)
        .then(function (oauthParams) {
        var urls = oauthUtil.getOAuthUrls(sdk, oauthParams, options);
        var requestUrl = urls.authorizeUrl + buildAuthorizeParams(oauthParams);
        // Set session cookie to store the oauthParams
        cookies.set(config$1.REDIRECT_OAUTH_PARAMS_COOKIE_NAME, JSON.stringify({
            responseType: oauthParams.responseType,
            state: oauthParams.state,
            nonce: oauthParams.nonce,
            scopes: oauthParams.scopes,
            clientId: oauthParams.clientId,
            urls: urls,
            ignoreSignature: oauthParams.ignoreSignature
        }));
        // Set nonce cookie for servers to validate nonce in id_token
        cookies.set(config$1.REDIRECT_NONCE_COOKIE_NAME, oauthParams.nonce);
        // Set state cookie for servers to validate state
        cookies.set(config$1.REDIRECT_STATE_COOKIE_NAME, oauthParams.state);
        sdk.token.getWithRedirect._setLocation(requestUrl);
    });
}
function renewToken(sdk, token) {
    if (!oauthUtil.isToken(token)) {
        return q.reject(new AuthSdkError_1('Renew must be passed a token with ' +
            'an array of scopes and an accessToken or idToken'));
    }
    var responseType;
    if (sdk.options.grantType === 'authorization_code') {
        responseType = 'code';
    }
    else if (token.accessToken) {
        responseType = 'token';
    }
    else {
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
    }
    else {
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
    var oauthParamsCookie = cookies.get(config$1.REDIRECT_OAUTH_PARAMS_COOKIE_NAME);
    if (!oauthParamsCookie) {
        return q.reject(new AuthSdkError_1('Unable to retrieve OAuth redirect params cookie'));
    }
    try {
        var oauthParams = JSON.parse(oauthParamsCookie);
        var urls = oauthParams.urls;
        delete oauthParams.urls;
        cookies.delete(config$1.REDIRECT_OAUTH_PARAMS_COOKIE_NAME);
    }
    catch (e) {
        return q.reject(new AuthSdkError_1('Unable to parse the ' +
            config$1.REDIRECT_OAUTH_PARAMS_COOKIE_NAME + ' cookie: ' + e.message));
    }
    return q.resolve(oauthUtil.hashToObject(hash))
        .then(function (res) {
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
        .fail(function (err) {
        if (err.xhr && (err.xhr.status === 401 || err.xhr.status === 403)) {
            var authenticateHeader;
            if (err.xhr.headers && util_1.isFunction(err.xhr.headers.get) && err.xhr.headers.get('WWW-Authenticate')) {
                authenticateHeader = err.xhr.headers.get('WWW-Authenticate');
            }
            else if (util_1.isFunction(err.xhr.getResponseHeader)) {
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
function E() {
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
        function listener() {
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
    var clockSkew = sdk.options.maxClockSkew * 1000;
    var expireEventWait = (token.expiresAt * 1000) - (Date.now() - clockSkew);
    // Clear any existing timeout
    clearExpireEventTimeout(tokenMgmtRef, key);
    var expireEventTimeout = setTimeout(function () {
        emitExpired(tokenMgmtRef, key, token);
    }, expireEventWait);
    // Add a new timeout
    tokenMgmtRef.expireTimeouts[key] = expireEventTimeout;
}
function setExpireEventTimeoutAll(sdk, tokenMgmtRef, storage) {
    try {
        var tokenStorage = storage.getStorage();
    }
    catch (e) {
        // Any errors thrown on instantiation will not be caught,
        // because there are no listeners yet
        emitError(tokenMgmtRef, e);
        return;
    }
    for (var key in tokenStorage) {
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
    return q.Promise(function (resolve) {
        var token = get$1(storage, key);
        var clockSkew = sdk.options.maxClockSkew * 1000;
        if (!token || (token.expiresAt * 1000 - clockSkew) > Date.now()) {
            return resolve(token);
        }
        var tokenPromise = tokenMgmtRef.autoRenew
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
    }
    catch (e) {
        return q.reject(e);
    }
    // Remove existing autoRenew timeout for this key
    clearExpireEventTimeout(tokenMgmtRef, key);
    // Store the renew promise state, to avoid renewing again
    if (!tokenMgmtRef.renewPromise[key]) {
        tokenMgmtRef.renewPromise[key] = sdk.token.renew(token)
            .then(function (freshTokens) {
            // We may receive more tokens than we requested
            var map = {};
            if (freshTokens instanceof Array === false) {
                freshTokens = [freshTokens];
            }
            freshTokens.forEach(function (freshToken) {
                var inferredKey = freshToken.idToken ? 'idToken' : freshToken.accessToken ? 'accessToken' : key;
                map[inferredKey] = freshToken;
                var oldToken = get$1(storage, inferredKey);
                if (!oldToken) {
                    // It is possible to enter a state where the tokens have been cleared
                    // after a renewal request was triggered. To ensure we do not store a
                    // renewed token, we verify the promise key doesn't exist and return.
                    return;
                }
                add(sdk, tokenMgmtRef, storage, inferredKey, freshToken);
                tokenMgmtRef.emitter.emit('renewed', inferredKey, freshToken, oldToken);
            });
            // Remove existing promise key
            delete tokenMgmtRef.renewPromise[key];
            return map[key]; // return the specific token requested
        })
            .fail(function (err) {
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
    options = options || {};
    options.storage = options.storage || 'localStorage';
    if (!options.autoRenew && options.autoRenew !== false) {
        options.autoRenew = true;
    }
    if (options.storage === 'localStorage' && !browserStorage.browserHasLocalStorage()) {
        util_1.warn('This browser doesn\'t support localStorage. Switching to sessionStorage.');
        options.storage = 'sessionStorage';
    }
    if (options.storage === 'sessionStorage' && !browserStorage.browserHasSessionStorage()) {
        util_1.warn('This browser doesn\'t support sessionStorage. Switching to cookie-based storage.');
        options.storage = 'cookie';
    }
    var storage;
    switch (options.storage) {
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
    var tokenMgmtRef = {
        emitter: new tinyEmitter(),
        autoRenew: options.autoRenew,
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
var cookies$1 = browserStorage.storage;
function OktaAuthBuilder(args) {
    var sdk = this;
    var url = builderUtil.getValidUrl(args);
    this.options = {
        url: util_1.removeTrailingSlash(url),
        clientId: args.clientId,
        issuer: util_1.removeTrailingSlash(args.issuer),
        authorizeUrl: util_1.removeTrailingSlash(args.authorizeUrl),
        userinfoUrl: util_1.removeTrailingSlash(args.userinfoUrl),
        tokenUrl: util_1.removeTrailingSlash(args.tokenUrl),
        grantType: args.grantType,
        redirectUri: args.redirectUri,
        httpRequestClient: args.httpRequestClient,
        storageUtil: args.storageUtil,
        transformErrorXHR: args.transformErrorXHR,
        headers: args.headers
    };
    if (this.options.grantType === 'authorization_code' && !sdk.features.isPKCESupported()) {
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
    }
    else {
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
        exists: util_1.bind(tx.transactionExists, null, sdk)
    };
    // This is exposed so we can mock document.cookie in our tests
    sdk.tx.exists._get = function (name) {
        return cookies$1.get(name);
    };
    // This is exposed so we can mock window.location.href in our tests
    sdk.idToken = {
        authorize: {
            _getLocationHref: function () {
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
    sdk.token.getWithRedirect._setLocation = function (url) {
        window.location = url;
    };
    // This is exposed so we can mock getting window.history in our tests
    sdk.token.parseFromUrl._getHistory = function () {
        return window.history;
    };
    // This is exposed so we can mock getting window.location in our tests
    sdk.token.parseFromUrl._getLocation = function () {
        return window.location;
    };
    // This is exposed so we can mock getting window.document in our tests
    sdk.token.parseFromUrl._getDocument = function () {
        return window.document;
    };
    sdk.fingerprint._getUserAgent = function () {
        return navigator.userAgent;
    };
    var isWindowsPhone = /windows phone|iemobile|wpdesktop/i;
    sdk.features.isFingerprintSupported = function () {
        var agent = sdk.fingerprint._getUserAgent();
        return agent && !isWindowsPhone.test(agent);
    };
    sdk.tokenManager = new TokenManager_1(sdk, args.tokenManager);
}
var proto = OktaAuthBuilder.prototype;
proto.features = {};
proto.features.isPopupPostMessageSupported = function () {
    var isIE8or9 = document.documentMode && document.documentMode < 10;
    if (window.postMessage && !isIE8or9) {
        return true;
    }
    return false;
};
proto.features.isTokenVerifySupported = function () {
    return typeof crypto !== 'undefined' && crypto.subtle && typeof Uint8Array !== 'undefined';
};
proto.features.isPKCESupported = function () {
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
        .then(function (fingerprint) {
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
proto.fingerprint = function (options) {
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
        }
        catch (err) {
            return deferred.reject(new AuthSdkError_1('Unable to parse iframe response'));
        }
        if (!msg) {
            return;
        }
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
    var timeout = setTimeout(function () {
        deferred.reject(new AuthSdkError_1('Fingerprinting timed out'));
    }, options.timeout || 15000);
    return deferred.promise.fin(function () {
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
var CrdsOktaTokens = /** @class */ (function () {
    function CrdsOktaTokens(accessToken, idToken) {
        if (accessToken === void 0) { accessToken = null; }
        if (idToken === void 0) { idToken = null; }
        this.provider = CrdsAuthenticationProviders.Okta;
        if (accessToken != null) {
            this.access_token = accessToken;
        }
        if (idToken != null) {
            this.id_token = idToken;
        }
    }
    CrdsOktaTokens.From = function (inc) {
        var access_token = inc.access_token, id_token = inc.id_token;
        return new CrdsOktaTokens(access_token, id_token);
    };
    return CrdsOktaTokens;
}());
var CrdsOktaService = /** @class */ (function () {
    function CrdsOktaService(oktaConfig, log) {
        this.log = log;
        this.oktaAuthClient = new browserIndex(oktaConfig);
    }
    CrdsOktaService.prototype.authenticated = function () {
        var _this = this;
        return this.getTokenDictionary().pipe(switchMap(function (tokens) {
            if (!!tokens) {
                return of(tokens);
            }
            else {
                return _this.getTokensFromSession();
            }
        }));
    };
    CrdsOktaService.prototype.signOut = function () {
        var _this = this;
        return from(this.oktaAuthClient.signOut()).pipe(first(), map(function () {
            _this.oktaAuthClient.tokenManager.clear();
            _this.log.Log('successfully logged out');
            return true;
        }), catchError(function (err) {
            _this.log.Error('AUTHENTICATION SERICE: okta signout function returned error', err);
            return of(false);
        }));
    };
    CrdsOktaService.prototype.subscribeToTokenExpiration = function (callback) {
        this.oktaAuthClient.tokenManager.on('expired', callback);
    };
    CrdsOktaService.prototype.subscribeToTokenRenewed = function (callback) {
        this.oktaAuthClient.tokenManager.on('renewed', callback);
    };
    CrdsOktaService.prototype.subscribeToTokenError = function (callback) {
        this.oktaAuthClient.tokenManager.on('error', callback);
    };
    CrdsOktaService.prototype.getTokenDictionary = function () {
        var _this = this;
        var idToken$ = from(this.oktaAuthClient.tokenManager.get('id_token'));
        var accessToken$ = from(this.oktaAuthClient.tokenManager.get('access_token'));
        return forkJoin([idToken$, accessToken$]).pipe(first(), map(function (_b) {
            var id = _b[0], access = _b[1];
            if (!!id && !!access) {
                return CrdsOktaTokens.From({ id_token: id, access_token: access });
            }
            else {
                return null;
            }
        }), catchError(function (err) {
            _this.log.Error('AUTHENTICATION SERICE: okta tokenManager get function returned error', err);
            return of(null);
        }));
    };
    CrdsOktaService.prototype.getTokensFromSession = function () {
        var _this = this;
        return from(this.oktaAuthClient.session.exists()).pipe(first(), switchMap(function (exists) {
            if (exists) {
                return from(_this.oktaAuthClient.token.getWithoutPrompt({
                    scopes: ['openid', 'profile', 'email'],
                    responseType: ['id_token', 'token']
                })).pipe(first(), tap(function (tokens) {
                    _this.oktaAuthClient.tokenManager.add('id_token', tokens[0]);
                    _this.oktaAuthClient.tokenManager.add('access_token', tokens[1]);
                }), map(function (tokens) {
                    return CrdsOktaTokens.From({ id_token: tokens[0], access_token: tokens[1] });
                }), catchError(function (err) {
                    _this.log.Error('AUTHENTICATION SERICE: okta get without prompt function returned error', err);
                    return of(null);
                }));
            }
            else {
                return of(null);
            }
        }), catchError(function (err) {
            _this.log.Error('AUTHENTICATION SERICE: okta session exists function returned error', err);
            return of(null);
        }));
    };
    return CrdsOktaService;
}());
var CrdsMpTokens = /** @class */ (function () {
    function CrdsMpTokens(accessToken, refreshToken) {
        if (accessToken === void 0) { accessToken = null; }
        if (refreshToken === void 0) { refreshToken = null; }
        this.provider = CrdsAuthenticationProviders.Mp;
        if (accessToken != null) {
            this.access_token = accessToken;
        }
        if (refreshToken != null) {
            this.refresh_token = refreshToken;
        }
    }
    CrdsMpTokens.From = function (inc) {
        var access_token = inc.access_token, refresh_token = inc.refresh_token;
        return new CrdsMpTokens(access_token, refresh_token);
    };
    return CrdsMpTokens;
}());
var Utilities;
(function (Utilities) {
    function getCookie(cname) {
        var name = cname + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }
    Utilities.getCookie = getCookie;
    function deleteCookie(cname, domain) {
        document.cookie = cname + '=; domain=' + domain + '; Max-Age=-99999999;';
    }
    Utilities.deleteCookie = deleteCookie;
})(Utilities || (Utilities = {}));
var CrdsMpService = /** @class */ (function () {
    function CrdsMpService(accessTokenCookie, refreshTokenCookie) {
        this.accessTokenCookie = accessTokenCookie;
        this.refreshTokenCookie = refreshTokenCookie;
    }
    CrdsMpService.prototype.authenticated = function () {
        // Just check for the presence of a cookie
        var accessToken = Utilities.getCookie(this.accessTokenCookie);
        var refreshToken = Utilities.getCookie(this.refreshTokenCookie);
        if (accessToken)
            return of(CrdsMpTokens.From({ access_token: { 'access_token': accessToken }, refresh_token: refreshToken }));
        else
            return of(null);
    };
    CrdsMpService.prototype.signOut = function () {
        var accessToken = Utilities.getCookie(this.accessTokenCookie);
        if (accessToken) {
            // clear both the access and refresh tokens
            Utilities.deleteCookie(this.accessTokenCookie, '.crossroads.net');
            Utilities.deleteCookie(this.refreshTokenCookie, '.crossroads.net');
            return of(true);
        }
        else {
            return of(false);
        }
    };
    return CrdsMpService;
}());
var CrdsLoggerService = /** @class */ (function () {
    function CrdsLoggerService(on) {
        this.on = on;
    }
    CrdsLoggerService.prototype.Error = function (header, detail) {
        if (this.on) {
            if (detail != null) {
                console.error("CRDS-OKTA-AUTH: " + header, detail);
            }
            else {
                console.error("CRDS-OKTA-AUTH: " + header);
            }
        }
    };
    CrdsLoggerService.prototype.Warn = function (header, detail) {
        if (this.on) {
            if (detail != null) {
                console.warn("CRDS-OKTA-AUTH: " + header, detail);
            }
            else {
                console.warn("CRDS-OKTA-AUTH: " + header);
            }
        }
    };
    CrdsLoggerService.prototype.Info = function (header, detail) {
        if (this.on) {
            if (detail != null) {
                console.info("CRDS-OKTA-AUTH: " + header, detail);
            }
            else {
                console.info("CRDS-OKTA-AUTH: " + header);
            }
        }
    };
    CrdsLoggerService.prototype.Log = function (header, detail) {
        if (this.on) {
            if (detail != null) {
                console.log("CRDS-OKTA-AUTH: " + header, detail);
            }
            else {
                console.log("CRDS-OKTA-AUTH: " + header);
            }
        }
    };
    return CrdsLoggerService;
}());
var CrdsAuthenticationService = /** @class */ (function () {
    function CrdsAuthenticationService(crdsAuthConfig) {
        var _this = this;
        this.crdsAuthConfig = crdsAuthConfig;
        this.providerServiceKVP = {};
        this.authenticationStatus$ = new BehaviorSubject(null);
        this.logService = new CrdsLoggerService(crdsAuthConfig.logging);
        var oktaService = new CrdsOktaService(this.crdsAuthConfig.oktaConfig, this.logService);
        oktaService.subscribeToTokenExpiration(function () {
            _this.authenticate().pipe(first()).subscribe(); //Force a token update
        });
        oktaService.subscribeToTokenRenewed(function () {
            _this.logService.Info("Token Renewed");
        });
        oktaService.subscribeToTokenError(function () {
            _this.authenticationStatus$.next(null);
        });
        var visibilityChange;
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
        document.addEventListener(visibilityChange, function () {
            if (document.visibilityState === 'visible') {
                _this.authenticate().pipe(first()).subscribe();
            }
        });
        this.providerServiceKVP[CrdsAuthenticationProviders.Okta] = new CrdsOktaService(crdsAuthConfig.oktaConfig, this.logService);
        this.providerServiceKVP[CrdsAuthenticationProviders.Mp] = new CrdsMpService(crdsAuthConfig.mpConfig.accessTokenCookie, crdsAuthConfig.mpConfig.refreshTokenCookie);
    }
    CrdsAuthenticationService.prototype.authenticated = function () {
        var _this = this;
        if (this.authenticationStatus$.value) {
            return this.authenticationStatus$.asObservable();
        }
        else {
            return this.authenticate().pipe(first(), tap(function (tokens) {
                _this.authenticationStatus$.next(tokens);
            }), switchMap(function (tokens) {
                return _this.authenticationStatus$.asObservable();
            }));
        }
    };
    CrdsAuthenticationService.prototype.authenticate = function () {
        var _this = this;
        return this.AuthenticateByProvider(0).pipe(first(), tap(function (tokens) {
            _this.authenticationStatus$.next(tokens);
        }), map(function (tokens) {
            return tokens;
        }));
    };
    CrdsAuthenticationService.prototype.AuthenticateByProvider = function (iterator) {
        var _this = this;
        if (iterator >= Object.keys(this.providerServiceKVP).length)
            return of(null);
        return this.providerServiceKVP[this.crdsAuthConfig.providerPreference[iterator]].authenticated().pipe(first(), switchMap(function (tokens) {
            if (tokens != null) {
                return of(tokens);
            }
            else {
                return _this.AuthenticateByProvider(++iterator);
            }
        }));
    };
    CrdsAuthenticationService.prototype.signOut = function () {
        return this.SignOutByProvider(0);
    };
    CrdsAuthenticationService.prototype.SignOutByProvider = function (iterator) {
        var _this = this;
        if (iterator >= Object.keys(this.providerServiceKVP).length)
            return of(false);
        var provider = this.crdsAuthConfig.providerPreference[iterator];
        return this.providerServiceKVP[provider].signOut().pipe(first(), switchMap(function (success) {
            if (success) {
                _this.authenticationStatus$.next(null);
                return of(success);
            }
            else {
                return _this.SignOutByProvider(++iterator);
            }
        }));
    };
    return CrdsAuthenticationService;
}());
var Auth = /** @class */ (function () {
    function Auth(config) {
        if (config === void 0) { config = {}; }
        this.authenticated = false;
        this.subdomainMap = {
            prod: 'www'
        };
        this.config = config;
        var oktaConfig = {
            clientId: config.okta_client_id,
            issuer: config.okta_issuer,
            tokenManager: {
                storage: 'cookie'
            }
        };
        var mpConfig = {
            accessTokenCookie: config.mp_access_token_cookie,
            refreshTokenCookie: config.mp_refresh_token_cookie
        };
        var authConfig = {
            oktaConfig: oktaConfig,
            mpConfig: mpConfig,
            logging: config.logging || false,
            providerPreference: [CrdsAuthenticationProviders.Okta, CrdsAuthenticationProviders.Mp]
        };
        console.log(authConfig);
        this.authService = new CrdsAuthenticationService(authConfig);
    }
    Auth.prototype.listen = function (callback) {
        var _this = this;
        this.authService.authenticated().subscribe(function (token) {
            if (!token)
                return (_this.authenticated = false);
            _this.authenticated = true;
            _this.token = token;
            _this.isMp = token.provider == CrdsAuthenticationProviders.Mp;
            _this.isOkta = token.provider == CrdsAuthenticationProviders.Okta;
            _this.updateCurrentUser();
            callback(_this);
        });
    };
    Auth.prototype.signOut = function (callback) {
        var _this = this;
        this.authService.signOut().subscribe(function (success) {
            if (success) {
                _this.authenticated = false;
                _this.updateCurrentUser();
                callback(_this);
            }
            else {
                console.log('log out failed');
            }
        });
    };
    Auth.prototype.updateCurrentUser = function () {
        if (!this.authenticated)
            return (this.currentUser = null);
        return (this.currentUser = {
            id: this.getUserId(),
            name: this.getUserName(),
            avatarUrl: this.getUserImageUrl()
        });
    };
    Auth.prototype.getUserId = function () {
        if (!this.authenticated)
            return null;
        if (this.isOkta)
            return this.token.id_token.claims.mpContactId;
        if (this.isMp)
            return Utils.getCookie('userId');
    };
    Auth.prototype.getUserName = function () {
        if (!this.authenticated)
            return null;
        if (this.isOkta)
            return this.token.id_token.claims.name;
        if (this.isMp)
            return Utils.getCookie('username');
    };
    Auth.prototype.getUserImageUrl = function () {
        if (!this.authenticated)
            return null;
        var userId = this.getUserId();
        if (!userId)
            return null;
        var subdomain = this.subdomainMap[this.config.env] || this.config.env;
        return "https://" + subdomain + ".crossroads.net/proxy/gateway/api/image/profile/" + userId;
    };
    return Auth;
}());
var GlobalNav = /** @class */ (function () {
    function GlobalNav(hostRef) {
        registerInstance(this, hostRef);
        this.giveNavIsShowing = false;
        this.mainNavIsShowing = false;
        this.profileNavIsShowing = false;
        this.authenticated = false;
        this.auth = {};
        this.subdomainMap = {
            prod: 'www'
        };
    }
    GlobalNav.prototype.initAuth = function () {
        if (!this.config || this.auth.config)
            return;
        this.auth = new Auth(Object.assign(this.config, { env: this.env }));
        this.auth.listen(this.authChangeCallback.bind(this));
    };
    GlobalNav.prototype.authChangeCallback = function () {
        this.authenticated = this.auth.authenticated;
    };
    GlobalNav.prototype.handleSignOut = function () {
        this.auth.signOut(this.authChangeCallback.bind(this));
    };
    GlobalNav.prototype.handleProfileClick = function (event) {
        if (!this.auth.authenticated)
            return event.stopPropagation();
        return this.navClickHandler(event, 'profile-nav');
    };
    // TODO: consoliate menuClasses, profileClasses, and  giveClasses
    // ------------------------------------------------------
    GlobalNav.prototype.menuClasses = function () {
        var classes = ['menu-container'];
        if (this.mainNavIsShowing)
            classes.push('nav-is-showing');
        return classes.join(' ');
    };
    GlobalNav.prototype.profileClasses = function () {
        var classes = ['profile-container'];
        if (this.profileNavIsShowing && this.authenticated)
            classes.push('nav-is-showing');
        return classes.join(' ');
    };
    GlobalNav.prototype.giveClasses = function () {
        var classes = ['give-container'];
        if (this.giveNavIsShowing)
            classes.push('nav-is-showing');
        return classes.join(' ');
    };
    GlobalNav.prototype.render = function () {
        var _this = this;
        this.initAuth();
        var logo = '<svg width="308" height="81" viewBox="0 0 308 81" xmlns="http://www.w3.org/2000/svg"><path id="crossroads-church-logo" d="M211.9 52.2h3.3v10.5h.1c1.1-2.4 3.9-3.4 6.3-3.4 5.2 0 6.8 3 6.8 7.3v13H225V66.2c0-2.4-1.5-4-4-4-4 0-5.9 2.6-5.9 6.2v11.2h-3.3V52.2h.1zm-7.2 14c-.5-2.5-2.2-4-4.9-4-4.7 0-6.2 3.7-6.2 7.8 0 3.6 1.7 7.3 5.8 7.3 3.1 0 5-1.8 5.4-4.8h3.3c-.7 4.8-3.8 7.7-8.7 7.7-6.1 0-9.3-4.2-9.3-10.1 0-5.9 3.1-10.6 9.4-10.6 4.5 0 8.1 2.1 8.6 6.8h-3.4v-.1zm49.5-6.4h3.1V64h.1c1.6-3.2 3.8-4.8 7.3-4.6v3.5c-5.3 0-7.2 3-7.2 8v8.8h-3.3V59.8zm-4.8 19.8h-3.1v-3.1h-.1c-1.4 2.5-3.6 3.6-6.4 3.6-5.2 0-6.8-3-6.8-7.3v-13h3.3v13.4c0 2.4 1.5 4 4 4 4 0 5.9-2.6 5.9-6.2V59.8h3.3v19.8h-.1zm38.2-27.4h3.3v10.5h.1c1.1-2.4 3.9-3.4 6.3-3.4 5.2 0 6.8 3 6.8 7.3v13h-3.3V66.2c0-2.4-1.5-4-4-4-4 0-5.9 2.6-5.9 6.2v11.2h-3.3V52.2zm-7.2 14c-.5-2.5-2.2-4-4.9-4-4.7 0-6.2 3.7-6.2 7.8 0 3.6 1.7 7.3 5.8 7.3 3.1 0 5-1.8 5.4-4.8h3.3c-.7 4.8-3.8 7.7-8.7 7.7-6.1 0-9.3-4.2-9.3-10.1 0-5.9 3.1-10.6 9.4-10.6 4.5 0 8.1 2.1 8.6 6.8h-3.4v-.1zm7.6-45.7c0-1.6 1.4-2.2 3.6-2.2 1 0 1.9.2 2.5.8.7.5 1.1 1.3 1.2 2.3h11.4c-.7-8.4-8.8-10-15.7-10-6 0-13.6 2-14.8 8.6V.5h-12.6v15c-2.7-3.1-5.4-4.1-9.4-4.1-6.5 0-11.7 5-13 13 0-7.5-1-13-15.9-13-12.5 0-17.3 3.9-17.3 10.6h12.1c.3-2.7 2.7-3.1 4.4-3.1 1.3 0 4.1.3 4.1 2.6 0 4.7-14.5 1.5-20.2 7.4v-1.2c0-9.8-6.9-16.4-18-16.4-6.5 0-11.7 2.3-14.8 6.5v-6.3c-.5-.1-1.1-.2-1.6-.2-4.9 0-8 2.4-9.7 7.3l-.1-6.4h-11.4v17.6c-3.9-7.3-19.1-5.6-19.1-9.4 0-1.6 1.4-2.2 3.6-2.2 1 0 1.9.2 2.5.8.7.5 1.1 1.3 1.2 2.3h11.4c-.7-8.4-8.8-10-15.7-10-6.6 0-14.9 2.4-14.9 10.4 0 12.3 19.4 8.2 19.4 13.3 0 2.2-2.1 2.8-4 2.8-1.2 0-2.3-.3-3.1-1-.8-.7-1.3-1.6-1.3-2.9H123v-.3c0-11.8-20-8.9-20-13.3 0-1.6 1.4-2.2 3.6-2.2 1 0 1.9.2 2.5.8.7.5 1.1 1.3 1.2 2.3h11.4c-.7-8.4-8.8-10-15.7-10-6.6 0-15 2.4-15 10.4v.3c-2.2-6.6-8.3-10.7-17.1-10.7-6.5 0-11.7 2.3-14.8 6.5v-6.3c-.5-.1-1.1-.2-1.6-.2-4.9 0-8 2.4-9.7 7.3l-.1-6.4H36.3v19.4H23.8c-.4 2.5-1.6 4.7-4.9 4.7-3.7 0-5.5-3.1-5.5-7.9 0-3.7.8-8.6 5.5-8.6 1.4 0 2.5.4 3.2 1.3.8.8 1.3 1.9 1.3 3.3h12.7c-.9-9.4-8.9-13-17.3-13-10.4 0-18 6.2-18 17 0 10.7 7.8 16.4 18 16.4 8.4 0 15.8-3.3 17.4-12v11.1h12.5V33c0-6.8 2.6-9.2 7.7-9.2-.3 1.5-.5 3-.5 4.7 0 10.8 7.8 16.3 18 16.3 7.4 0 13.6-2.9 16.4-9 1.5 7.1 8.9 9 15.6 9 8.7 0 14-2.5 16-6.6 2.5 5.1 8.9 6.6 14.8 6.6 8.9 0 14.1-2.6 16.1-6.8v5.9h12.6V33c0-6.8 2.6-9.2 7.7-9.2-.3 1.5-.5 3-.5 4.7 0 10.8 7.8 16.3 18 16.3 6.9 0 12.8-2.5 15.8-7.8.9 5.4 5.7 7.8 11.1 7.8 4.7 0 8.3-1 11.9-4.3l.6 3.4h13v-.6c-1.6-1.3-1.7-2.2-1.7-4v-6.5c1.3 7 6 12.1 14 12.1 4 0 6.7-1.3 9.7-5.1V44h11.3v-5.6c2.6 5 8.9 6.5 14.7 6.5 11.6 0 17-4.5 17-11 0-11.9-20-9-20-13.4zM74 36.4c-3.2 0-5.4-2.6-5.4-8.6 0-3.5 1.3-8 5.6-8 3.3-.2 5.3 3.3 5.3 8-.1 6-2.1 8.6-5.5 8.6zm32.5 1.6c-1.2 0-2.3-.3-3.1-1-.8-.7-1.3-1.6-1.3-2.9h-11c.6-1.8.9-3.9.9-6.3 0-.8-.1-1.5-.1-2.2 3.6 7.7 18.6 5.1 18.6 9.6-.1 2.1-2.1 2.8-4 2.8zm84.1-1.6c-3.2 0-5.4-2.6-5.4-8.6 0-3.5 1.3-8 5.5-8 3.3-.2 5.3 3.3 5.3 8 0 6-2 8.6-5.4 8.6zm32.6 1.3c-2.5 0-4-1.1-4-2.7 0-4.1 5.4-3.1 9.5-5.1.3 4.4-1.1 7.8-5.5 7.8zm35.2-1.9c-4.1 0-4.9-3.9-4.9-7.2 0-3.5 1.1-7.5 5.3-7.5 4.2 0 5.4 3.8 5.4 7.3-.1 3.7-1.4 7.4-5.8 7.4zm33.1 2.2c-1.2 0-2.3-.3-3.1-1-.9-.7-1.3-1.6-1.3-2.9h-10.8V23.8c1.9 9.9 19.2 6.6 19.2 11.4 0 2.1-2.1 2.8-4 2.8z" fill-rule="nonzero" fill=""/></svg>';
        var menu = '<svg id="menu-thin" width="256" height="256" viewBox="0 0 256 256"><g><path d="M242.852679,47.6875 L14.1473214,47.6875 C12.4091038,47.6875 11,46.5915304 11,45.2395833 L11,35.4479167 C11,34.0959696 12.4091038,33 14.1473214,33 L242.852679,33 C244.590896,33 246,34.0959696 246,35.4479167 L246,45.2395833 C246,46.5915304 244.590896,47.6875 242.852679,47.6875 Z M242.852679,135.8125 L14.1473214,135.8125 C12.4091038,135.8125 11,134.71653 11,133.364583 L11,123.572917 C11,122.22097 12.4091038,121.125 14.1473214,121.125 L242.852679,121.125 C244.590896,121.125 246,122.22097 246,123.572917 L246,133.364583 C246,134.71653 244.590896,135.8125 242.852679,135.8125 Z M242.852679,223.9375 L14.1473214,223.9375 C12.4091038,223.9375 11,222.84153 11,221.489583 L11,211.697917 C11,210.34597 12.4091038,209.25 14.1473214,209.25 L242.852679,209.25 C244.590896,209.25 246,210.34597 246,211.697917 L246,221.489583 C246,222.84153 244.590896,223.9375 242.852679,223.9375 Z"/></g></svg>';
        var search = '<svg id="search-thin" width="256" height="256" viewBox="0 0 256 256"><g><path d="M244.375275,231.976661 L184.91724,172.518627 C183.857136,171.458523 182.474391,170.905425 180.999463,170.905425 L176.252038,170.905425 C192.061423,153.805478 201.740638,130.990186 201.740638,105.870319 C201.740638,52.911186 158.829452,10 105.870319,10 C52.911186,10 10,52.911186 10,105.870319 C10,158.829452 52.911186,201.740638 105.870319,201.740638 C130.990186,201.740638 153.805478,192.061423 170.905425,176.29813 L170.905425,180.999463 C170.905425,182.474391 171.504614,183.857136 172.518627,184.91724 L231.976661,244.375275 C234.142962,246.541575 237.645916,246.541575 239.812216,244.375275 L244.375275,239.812216 C246.541575,237.645916 246.541575,234.142962 244.375275,231.976661 Z M105.870319,186.991358 C61.0232899,186.991358 24.7492798,150.717348 24.7492798,105.870319 C24.7492798,61.0232899 61.0232899,24.7492798 105.870319,24.7492798 C150.717348,24.7492798 186.991358,61.0232899 186.991358,105.870319 C186.991358,150.717348 150.717348,186.991358 105.870319,186.991358 Z"/></g></svg>';
        var account = '<svg id="account-thin" width="256" height="256" viewBox="0 0 256 256"><g><path d="M128,10 C62.8145161,10 10,62.8145161 10,128 C10,193.185484 62.8145161,246 128,246 C193.185484,246 246,193.185484 246,128 C246,62.8145161 193.185484,10 128,10 Z M188.903226,210.6 C171.821774,223.208871 150.791129,230.774194 128,230.774194 C105.208871,230.774194 84.1782258,223.208871 67.0967742,210.6 L67.0967742,204.129032 C67.0967742,187.333065 80.7524194,173.677419 97.5483871,173.677419 C102.829839,173.677419 110.633065,179.101613 128,179.101613 C145.414516,179.101613 153.122581,173.677419 158.451613,173.677419 C175.247581,173.677419 188.903226,187.333065 188.903226,204.129032 L188.903226,210.6 Z M203.462903,197.515323 C200.227419,175.437903 181.433065,158.451613 158.451613,158.451613 C148.697581,158.451613 143.987097,163.875806 128,163.875806 C112.012903,163.875806 107.35,158.451613 97.5483871,158.451613 C74.5669355,158.451613 55.7725806,175.437903 52.5370968,197.515323 C35.6459677,179.196774 25.2258065,154.835484 25.2258065,128 C25.2258065,71.3314516 71.3314516,25.2258065 128,25.2258065 C184.668548,25.2258065 230.774194,71.3314516 230.774194,128 C230.774194,154.835484 220.354032,179.196774 203.462903,197.515323 Z M128,63.2903226 C104.875806,63.2903226 86.1290323,82.0370968 86.1290323,105.16129 C86.1290323,128.285484 104.875806,147.032258 128,147.032258 C151.124194,147.032258 169.870968,128.285484 169.870968,105.16129 C169.870968,82.0370968 151.124194,63.2903226 128,63.2903226 Z M128,131.806452 C113.297581,131.806452 101.354839,119.86371 101.354839,105.16129 C101.354839,90.458871 113.297581,78.516129 128,78.516129 C142.702419,78.516129 154.645161,90.458871 154.645161,105.16129 C154.645161,119.86371 142.702419,131.806452 128,131.806452 Z"/></g></svg>';
        var give = '<svg viewBox="0 0 244.36 244.36"><defs><mask id="a" x="-6" y="-6" width="256" height="256" maskUnits="userSpaceOnUse"><g transform="translate(-6 -6)"><rect width="256" height="256" style="fill:#fff"/></g></mask></defs><g style="mask:url(#a)"><path d="M113.39,109.09A27.82,27.82,0,0,1,100,100.74a25.23,25.23,0,0,1-6.2-14.08,24.08,24.08,0,0,1,6.44-19.09,24.39,24.39,0,0,1,18.85-8.12h1.44V48a4.09,4.09,0,0,1,3.81-3.82H132A4.11,4.11,0,0,1,135.82,48V59.45h.48a33.71,33.71,0,0,1,20.52,6.69,5.46,5.46,0,0,1,1.67,3.1,3.56,3.56,0,0,1-1.19,3.1l-5.25,5.25a4.29,4.29,0,0,1-2.39,1.19,2.6,2.6,0,0,1-2.39-.71,17.88,17.88,0,0,0-10.5-3.34H119.11A9.72,9.72,0,0,0,112,77.59,8.94,8.94,0,0,0,109.09,84,10.29,10.29,0,0,0,111,90.24a9.5,9.5,0,0,0,5.25,3.58l28.16,8.11a24.66,24.66,0,0,1,15.27,12.41,23.29,23.29,0,0,1,1.43,20,22.1,22.1,0,0,1-9.3,12.17,27.73,27.73,0,0,1-15.51,4.53h-.48v11.46a4.11,4.11,0,0,1-3.82,3.81h-7.64a4.09,4.09,0,0,1-3.81-3.81V151.09h-.48a32.24,32.24,0,0,1-20.52-7.16,3.64,3.64,0,0,1-1.68-2.62,3.58,3.58,0,0,1,1.2-3.11l5.25-5.25a4.29,4.29,0,0,1,2.38-1.19,2.58,2.58,0,0,1,2.39.72,18.71,18.71,0,0,0,11,3.34h17.18a9.72,9.72,0,0,0,7.16-2.87,8.87,8.87,0,0,0,2.86-6.44,10.2,10.2,0,0,0-1.91-6.2,9.45,9.45,0,0,0-5.25-3.58Zm121.7,34.36a15.49,15.49,0,0,1,15.27,15.28v76.36a15.47,15.47,0,0,1-15.27,15.27H21.27a14.71,14.71,0,0,1-10.74-4.53A14.68,14.68,0,0,1,6,235.09V158.73A14.68,14.68,0,0,1,10.53,148a14.72,14.72,0,0,1,10.74-4.54H36.55a97.2,97.2,0,0,1-7.64-38.18A96.4,96.4,0,0,1,42.27,55.4a100.25,100.25,0,0,1,36-36A96.4,96.4,0,0,1,128.18,6a96.43,96.43,0,0,1,49.88,13.36,100.3,100.3,0,0,1,36,36,96.4,96.4,0,0,1,13.36,49.87,97.37,97.37,0,0,1-7.63,38.18ZM128.18,21.27a83.6,83.6,0,0,0-84,84,83.57,83.57,0,0,0,84,84,83.57,83.57,0,0,0,84-84,83.6,83.6,0,0,0-84-84ZM235.09,235.09V158.73H211.7a99.76,99.76,0,0,1-30.54,30.54h19.57a4.11,4.11,0,0,1,3.81,3.82v7.64a4.09,4.09,0,0,1-3.81,3.81H55.64a4.09,4.09,0,0,1-3.82-3.81v-7.64a4.11,4.11,0,0,1,3.82-3.82h20a97.93,97.93,0,0,1-31-30.54H21.27v76.36Z" transform="translate(-6 -6)"/></g></svg>';
        var close = '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>';
        var navIsShowing = this.mainNavIsShowing || this.profileNavIsShowing || this.giveNavIsShowing;
        return (h(Fragment, null, h("header", { class: navIsShowing ? 'nav-is-showing' : '' }, h("div", null, h("div", { class: "global-nav-items" }, h("div", { class: "global-actions" }, h("a", { href: "", "data-automation-id": "sh-menu", "data-label": "menu", class: this.menuClasses(), onClick: function (event) { return _this.navClickHandler(event, 'main-nav'); } }, h("div", { class: "menu", innerHTML: menu }), h("div", { class: "close", innerHTML: close })), h("a", { href: "/search", class: "search-container", "data-automation-id": "sh-search", "data-label": "search" }, h("div", { class: "search", innerHTML: search }))), h("a", { href: this.env === 'prod' ? 'https://www.crossroads.net' : "https://" + this.env + ".crossroads.net", "data-automation-id": "sh-logo", class: "logo", innerHTML: logo }), h("div", { class: "user-actions" }, h("a", { href: "", "data-automation-id": "sh-give", "data-label": "give", class: this.giveClasses(), onClick: function (event) { return _this.navClickHandler(event, 'give-nav'); } }, h("div", { class: "donate", innerHTML: give }), h("div", { class: "close", innerHTML: close })), h("a", { href: "https://" + (this.subdomainMap[this.env] || this.env) + ".crossroads.net/signin", class: this.profileClasses(), onClick: function (event) { return _this.handleProfileClick(event); }, "data-automation-id": "sh-profile", "data-label": this.authenticated ? 'my account' : 'sign in' }, this.authenticated ? (h("div", { class: "account" }, h("div", { class: "account-authenticated", style: { backgroundImage: "url('" + this.auth.currentUser.avatarUrl + "')" } }))) : (h("div", { class: "account", innerHTML: account })), h("div", { class: "close", innerHTML: close })))), h("profile-nav", { profileNavIsShowing: this.profileNavIsShowing && this.authenticated, onSignOut: this.handleSignOut.bind(this), currentUser: this.auth.currentUser, data: this.profileData }), h("give-nav", { data: this.giveData, giveNavIsShowing: this.giveNavIsShowing })))));
    };
    Object.defineProperty(GlobalNav, "style", {
        get: function () { return "header{background-color:#0095d9;position:relative;top:0;width:100vw;z-index:2}\@supports ((position:-webkit-sticky) or (position:sticky)){header{position:-webkit-sticky;position:sticky}}header.nav-is-showing{position:fixed}header>div{margin:0 auto;max-width:1170px;padding:0 15px;position:relative}.global-nav-items{-ms-flex-pack:justify;justify-content:space-between}.global-actions,.global-nav-items,.user-actions{display:-ms-flexbox;display:flex}.global-actions a:first-of-type,.user-actions a:first-of-type{margin-right:18px}.logo{padding:7px}.logo svg{fill:#fff;height:29px;width:111px}.account,.donate,.menu,.search{height:22px;padding:12px 0;width:22px}.account svg,.donate svg,.menu svg,.search svg{height:22px;width:22px}.account .account-authenticated{background-color:#fff;background-position:50%;background-repeat:no-repeat;background-size:22px;border:1.5px solid #fff;border-radius:50%;-webkit-box-sizing:border-box;box-sizing:border-box;height:22px;width:22px}\@media (hover){.account .account-authenticated:hover{-webkit-filter:brightness(90%);filter:brightness(90%)}}.close{padding:9px 0}.close,.close svg{height:26px;width:26px}.account,.close,.donate,.menu,.search{display:block}.give-container,.menu-container,.profile-container,.search-container{color:#fff;display:-ms-flexbox;display:flex;text-decoration:none}\@media (min-width:768px){.give-container:after,.menu-container:after,.profile-container:after,.search-container:after{-ms-flex-item-align:center;align-self:center;bottom:2px;content:attr(data-label);display:inline-block;font-size:13px;margin-left:7px;position:relative;text-transform:capitalize}}.give-container svg,.menu-container svg,.profile-container svg,.search-container svg{fill:#fff}\@media (hover){.give-container:hover,.menu-container:hover,.profile-container:hover,.search-container:hover{color:#ccc}.give-container:hover svg,.menu-container:hover svg,.profile-container:hover svg,.search-container:hover svg{fill:#ccc}}.menu-container .close{display:none;margin-right:-4px}\@media (min-width:992px){.menu-container.nav-is-showing .menu{display:none}.menu-container.nav-is-showing .close{display:block}}.profile-container .close{display:none;margin-right:-4px}\@media (min-width:992px){.profile-container.nav-is-showing .account{display:none}.profile-container.nav-is-showing .close{display:block}}.give-container .close{display:none;margin-right:-4px}\@media (min-width:992px){.give-container.nav-is-showing .donate{display:none}.give-container.nav-is-showing .close{display:block}}"; },
        enumerable: true,
        configurable: true
    });
    return GlobalNav;
}());
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
var extendShallow = function extend(o /*, objects*/) {
    if (!isExtendable(o)) {
        o = {};
    }
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
    get: function () {
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
    if (!isString(str))
        return '';
    var chars = charSets[type || 'default'];
    var regex = toRegex(type, chars);
    return str.replace(regex, function (m) {
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
unescape$1.chars = charSets.default;
unescape$1.extras = charSets.extras;
// don't trip the "charSets" getter unless it's explicitly called
Object.defineProperty(unescape$1, 'all', {
    get: function () {
        return charSets.all;
    }
});
/**
 * Expose `unescape`
 */
var _unescape = unescape$1;
var NavCtas = /** @class */ (function () {
    function NavCtas(hostRef) {
        registerInstance(this, hostRef);
    }
    NavCtas.prototype.decodedData = function () {
        return _unescape(this.data || '');
    };
    NavCtas.prototype.render = function () {
        if (this.active)
            return null;
        return h("div", { class: "ctas", innerHTML: this.decodedData() });
    };
    Object.defineProperty(NavCtas, "style", {
        get: function () { return ".ctas{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;padding:40px 20px 0}\@media (max-width:992px){.ctas{width:calc(100vw - 40px)}}\@media (min-width:992px){.ctas{padding:70px 0 0}}.ctas h3{font-size:11px;margin-top:0;opacity:.5;text-transform:uppercase}.cta{background-color:rgba(21,21,21,.8);display:-ms-flexbox;display:flex;margin-bottom:10px;text-decoration:none}.cta-image{height:75px}.cta-image img{height:75px;width:100px}.cta-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;padding:0 20px;width:100%}.cta-content h4{color:#fff;font-size:14px;font-weight:600;text-transform:uppercase}.cta-content h4,.cta-content p{margin:0}.cta-content p{color:#979797;font-size:12px;font-weight:300;line-height:18px}.cta:hover-content h4{color:#ccc}.more-updates{color:#0095d9;font-size:12px;text-decoration:none;text-transform:capitalize}"; },
        enumerable: true,
        configurable: true
    });
    return NavCtas;
}());
var NavigationSection = /** @class */ (function () {
    function NavigationSection(hostRef) {
        registerInstance(this, hostRef);
        this.isActive = false;
        /**
         * Print log messages?
         */
        this.debug = true;
    }
    NavigationSection.prototype.componentWillLoad = function () {
        this.console = new Logger(this.debug);
        this.config = new Config();
    };
    NavigationSection.prototype.render = function () {
        var _this = this;
        return (h("li", null, h("a", { onClick: function (e) { return _this.onActivate(e, _this.id); }, "data-automation-id": "sh-section-" + this.id, class: this.isActive ? 'is-active' : '' }, h("slot", null))));
    };
    Object.defineProperty(NavigationSection, "style", {
        get: function () { return "nav-section a{cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin-bottom:10px;padding:15px 20px}\@media (min-width:992px){nav-section a{height:96px;-ms-flex-pack:center;justify-content:center;margin-bottom:0;position:relative;width:86%}}nav-section a:after{border-color:transparent transparent transparent #0095d9;border-style:solid;border-width:63px 0 63px 50px;content:\"\";height:0;left:0;position:absolute;top:0;visibility:hidden;width:0}nav-section a:before{background-color:#0095d9;content:\"\";display:inline-block;height:100%;left:0;position:absolute}\@media (min-width:992px){nav-section a:hover:before{width:4px}}\@media (min-width:992px){nav-section a.is-active:after{left:100%;-webkit-transition:left .4s ease;transition:left .4s ease;visibility:visible}nav-section a.is-active:before{-webkit-transition:width .4s ease;transition:width .4s ease;width:100%}}nav-section a h2{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;display:-ms-flexbox;display:flex;font-size:48px;-ms-flex-pack:justify;justify-content:space-between;line-height:.6;margin:0;position:relative;text-transform:uppercase}\@media (max-width:992px){nav-section a h2:after{background-image:url(/assets/images/chevron-right-light.svg);background-size:12px 22px;content:\"\";display:-ms-flexbox;display:flex;height:22px;position:absolute;right:0;top:20%;width:12px}}nav-section a p{font-size:14px;margin:12px 0 0;opacity:.7}"; },
        enumerable: true,
        configurable: true
    });
    return NavigationSection;
}());
var NavSectionSubnav = /** @class */ (function () {
    function NavSectionSubnav(hostRef) {
        registerInstance(this, hostRef);
    }
    NavSectionSubnav.prototype.render = function () {
        var _this = this;
        var chevronLeftLight = '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg>';
        return (h("div", { class: this.active == this.id ? '' : ' hidden' }, h("a", { href: "", "data-automation-id": "sh-section-subnav-" + this.id, class: "back", onClick: function (event) { return _this.onBack(event); } }, h("span", { innerHTML: chevronLeftLight }), "Back"), h("slot", null)));
    };
    Object.defineProperty(NavSectionSubnav, "style", {
        get: function () { return ".hidden{display:none}nav-section-subnav{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;color:#fff}nav-section-subnav div{padding:30px 20px 0}nav-section-subnav a{color:#fff;display:inline-block;font-size:19px;margin-bottom:10px;padding-left:10px;text-decoration:none;text-transform:capitalize}nav-section-subnav a.all{margin-bottom:30px}nav-section-subnav a:hover{color:#ccc}nav-section-subnav h2{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;font-size:48px;line-height:48px;margin:0;text-transform:uppercase;margin-bottom:10px}nav-section-subnav h4{font-size:11px;margin:0 0 10px;opacity:.5;text-transform:uppercase}nav-section-subnav ul{padding-left:0;margin-top:0}nav-section-subnav ul li{list-style:none}nav-section-subnav ul li.top-level a{padding-left:0}\@media (min-width:992px){nav-section-subnav h2{display:none}}nav-section-subnav .back{font-size:14px;padding-left:0;position:relative}\@media (min-width:992px){nav-section-subnav .back{display:none}}nav-section-subnav .back span{display:inline-block;height:13px;margin-right:8px;padding:12px 0;position:relative;top:1px;width:7px}nav-section-subnav .back svg{fill:#fff;height:13px;width:7px}"; },
        enumerable: true,
        configurable: true
    });
    return NavSectionSubnav;
}());
var ProfileMenu = /** @class */ (function () {
    function ProfileMenu(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.profileNavIsShowing = true;
        this.renderSections = function (payload) {
            var topLevel = { value: false };
            var title = unescape(payload.title.replace('%user_name%', _this.currentUser.name || ''));
            return (h("div", null, h("h2", null, " ", title, " "), payload.children.map(function (child) { return _this.renderChild(child, topLevel); })));
        };
        this.renderChild = function (child, topLevel) {
            topLevel.value = topLevel.value || typeof child == 'string';
            return (h("div", { style: { padding: '0' } }, typeof child == 'string' && h("h4", null, child), typeof child != 'string' && h("ul", null, _this.renderChildHTML(child, topLevel))));
        };
        this.renderChildHTML = function (child, topLevel) {
            return child.map(function (el) {
                if (typeof el != 'string')
                    return (h("li", { class: topLevel.value ? '' : 'top-level' }, h("a", { href: el.href, "data-automation-id": el['automation-id'], onClick: function (e) {
                            if (el['sign-out'])
                                _this.onSignOut(e);
                        } }, el.title)));
            });
        };
    }
    ProfileMenu.prototype.envUrl = function (path) {
        return "" + process.env.CRDS_BASE_URL + path;
    };
    ProfileMenu.prototype.handleClick = function (event) {
        event.stopPropagation();
    };
    ProfileMenu.prototype.render = function () {
        if (!this.profileNavIsShowing)
            return null;
        return (h("div", { class: "profile-nav" }, h("div", { class: "profile-nav-img", style: {
                backgroundImage: "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%),url('" + this.currentUser.avatarUrl + "')"
            } }), h("div", null, this.renderSections(this.data))));
    };
    Object.defineProperty(ProfileMenu, "style", {
        get: function () { return ".give-nav,.profile-nav{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;color:#fff;background-color:#000;background-repeat:no-repeat;background-size:100%;height:100vh;left:0;max-height:100vh;overflow-y:scroll;position:fixed;top:48px;width:100vw;z-index:2}.give-nav div,.profile-nav div{height:auto;padding:30px 20px 90px}.give-nav a,.profile-nav a{color:#fff;display:inline-block;font-size:19px;margin-bottom:10px;padding-left:10px;text-decoration:none;text-transform:capitalize}.give-nav a.all,.profile-nav a.all{margin-bottom:30px}.give-nav a:hover,.profile-nav a:hover{color:#ccc}.give-nav h2,.profile-nav h2{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important;font-size:48px;line-height:48px;margin:0;text-transform:uppercase;margin-bottom:20px}.give-nav h4,.profile-nav h4{font-size:11px;margin:0 0 10px;opacity:.5;text-transform:uppercase}.give-nav ul,.profile-nav ul{padding-left:0;margin-top:0}.give-nav ul li,.profile-nav ul li{list-style:none}.give-nav ul li.top-level a,.profile-nav ul li.top-level a{padding-left:0}\@media (min-width:992px){.give-nav,.profile-nav{height:auto;left:auto;margin-right:-15px;position:absolute;right:15px;width:375px}}\@media (min-width:1170px){.give-nav,.profile-nav{margin-right:0}}.give-nav::-webkit-scrollbar,.profile-nav::-webkit-scrollbar{width:0}.give-nav ul:last-of-type,.profile-nav ul:last-of-type{padding-bottom:30px}.give-nav{background-image:url(https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress)}.profile-nav:after{background-color:rgba(0,0,0,.75);content:\" \";z-index:-1}.profile-nav .profile-nav-img,.profile-nav:after{height:100%;left:0;position:absolute;top:0;width:100%}.profile-nav .profile-nav-img{background-position:top;background-repeat:no-repeat;background-size:contain;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-filter:blur(2px);filter:blur(2px);z-index:-2}\@media (min-width:992px){.profile-nav div{padding-bottom:0}}"; },
        enumerable: true,
        configurable: true
    });
    return ProfileMenu;
}());
var SharedFooter = /** @class */ (function () {
    function SharedFooter(hostRef) {
        registerInstance(this, hostRef);
        this.env = 'prod';
        this.data = [];
    }
    SharedFooter.prototype.componentWillLoad = function () {
        var _this = this;
        var url = this.src || "https://crds-data.netlify.com/shared-footer/" + this.env + ".json";
        axios.get(url).then(function (response) { return (_this.data = response.data); });
    };
    SharedFooter.prototype.componentDidLoad = function () {
        this.element.parentElement.classList.add('shared-footer');
        this.element.parentElement.classList.remove('shared-footer-skeleton');
    };
    SharedFooter.prototype.renderElement = function (el) {
        if (!el.href)
            return el.title;
        var attrs = {
            target: el.href.match(/:\/\//) ? '_blank' : '',
            href: el.href
        };
        if (el['automation-id'])
            attrs['data-automation-id'] = el['automation-id'];
        return h("a", Object.assign({}, attrs), el.img ? h("img", { src: el.img, alt: el.title, title: el.title }) : el.title);
    };
    SharedFooter.prototype.renderGroups = function (groups) {
        var _this = this;
        var groupMarkup = groups.map(function (group) {
            if (!group.children)
                return h("li", null, _this.renderElement(group));
            return (h(Fragment, null, h("p", null, group.title), h("ul", null, group.children.map(function (el) { return (h("li", null, _this.renderElement(el))); }))));
        });
        var Tag = groups.filter(function (g) { return g.children; }).length > 0 ? 'Fragment' : 'ul';
        return h(Tag, null, groupMarkup);
    };
    SharedFooter.prototype.renderColumns = function () {
        var _this = this;
        return this.data.map(function (column) { return (h("div", { class: column.class }, h("h5", null, _this.renderElement(column)), _this.renderGroups(column.children))); });
    };
    SharedFooter.prototype.render = function () {
        if (this.data.length === 0)
            return null;
        return (h("footer", null, h("div", { class: "container" }, this.renderColumns())));
    };
    Object.defineProperty(SharedFooter.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedFooter, "style", {
        get: function () { return "footer{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;color:#737373;background-color:#e7e7e7;overflow:hidden;padding:3.125rem 0}footer .container{margin:0 auto;max-width:1170px}\@media only screen and (min-width:768px){footer .container{display:-ms-flexbox;display:flex}}footer .container div{padding-left:15px;padding-right:15px;margin-bottom:24px;vertical-align:top}\@media only screen and (min-width:768px){footer .container div{-ms-flex:1;flex:1;width:16.66667%}}footer .container div p{margin-bottom:0;font-weight:700}footer .container div ul{list-style-type:none;margin:0;padding-left:0}footer .container div.social-icons{padding-left:0}\@media only screen and (min-width:768px){footer .container div.social-icons{-ms-flex:2;flex:2;text-align:right;width:33.33333%}}footer .container div.social-icons li{display:inline}footer .container div.social-icons li a{-webkit-box-sizing:border-box;box-sizing:border-box;margin-left:.75rem;background:#737373;border-radius:50%;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;height:36px;width:36px;padding:10px}footer .container div.social-icons li a img{max-width:100%}footer .container a{color:#737373;text-decoration:none}footer .container h5{font-size:16.1px!important;line-height:1.1;margin:12px 0}"; },
        enumerable: true,
        configurable: true
    });
    return SharedFooter;
}());
var SharedHeader = /** @class */ (function () {
    function SharedHeader(hostRef) {
        registerInstance(this, hostRef);
        this.env = 'prod';
        this.mainNavIsShowing = false;
        this.profileNavIsShowing = false;
        this.giveNavIsShowing = false;
        this.data = [];
    }
    /**
     * Fires before render...
     */
    SharedHeader.prototype.componentWillLoad = function () {
        var _this = this;
        var url = this.src || "https://crds-data.netlify.com/shared-header/" + this.env + ".json";
        axios.get(url).then(function (response) { return (_this.data = response.data); });
    };
    SharedHeader.prototype.componentDidLoad = function () {
        this.element.parentElement.classList.add('shared-header');
        this.element.parentElement.classList.remove('shared-header-skeleton');
    };
    /**
     * Section onClick event handler
     * @param e Event
     * @param id string
     */
    SharedHeader.prototype.onClick = function (e, id) {
        e.preventDefault();
        this.active = id;
    };
    /**
     * Renders all sections from payload
     */
    SharedHeader.prototype.renderSections = function (payload) {
        var _this = this;
        if (!payload)
            return null;
        return payload.map(function (section) {
            var id = Utils.parameterize(section.title);
            return (h("nav-section", { id: id, onActivate: _this.onClick.bind(_this), isActive: _this.active == id }, h("h2", null, section.title), h("p", null, section.description)));
        });
    };
    SharedHeader.prototype.handleBackClick = function (event) {
        event.preventDefault();
        this.active = null;
    };
    /**
     * Returns all subnav elements
     * @param payload
     */
    // TODO: refactor renderSubnavs to work with
    // nav-section-subnav, profile nav, and give nav
    // ------------------------------------------------------
    SharedHeader.prototype.renderSubnavs = function (payload) {
        var _this = this;
        if (!payload)
            return null;
        var sections = payload.map(function (section) {
            return (h("nav-section-subnav", { onBack: _this.handleBackClick.bind(_this), active: _this.active, id: Utils.parameterize(section.title) }, _this.renderChildren(section)));
        });
        return h("div", { class: "subnavigation" }, sections);
    };
    /**
     * Returns header or unordered list
     * @param section
     */
    SharedHeader.prototype.renderChildren = function (section) {
        var sectionChildren = section.children.map(function (child) {
            if (typeof child == 'string') {
                return h("h4", null, child);
            }
            else {
                var listItems = child.map(function (link) {
                    return (h("li", { class: link.top_level ? 'top-level' : null }, h("a", { href: link.href || '#', "data-automation-id": link['automation-id'] }, link.title)));
                });
                return h("ul", null, listItems);
            }
        });
        return (h(Fragment, null, h("h2", null, section.title), sectionChildren));
    };
    SharedHeader.prototype.toggleMenu = function (event, navType) {
        event.preventDefault();
        event.stopPropagation();
        if (navType == 'main-nav') {
            this.giveNavIsShowing = false;
            this.mainNavIsShowing = !this.mainNavIsShowing;
            this.profileNavIsShowing = false;
            if (this.mainNavIsShowing) {
                document.body.setAttribute('style', 'overflow: hidden; position: absolute;');
            }
            else {
                document.body.setAttribute('style', 'overflow: scroll;');
            }
        }
        else if (navType == 'profile-nav') {
            this.giveNavIsShowing = false;
            this.mainNavIsShowing = false;
            this.profileNavIsShowing = !this.profileNavIsShowing;
            return this.profileNavIsShowing
                ? document.body.setAttribute('style', 'overflow: hidden; position: absolute; width: 100vw;')
                : document.body.setAttribute('style', 'overflow: scroll;');
        }
        else if (navType == 'give-nav') {
            this.giveNavIsShowing = !this.giveNavIsShowing;
            this.mainNavIsShowing = false;
            this.profileNavIsShowing = false;
            return this.giveNavIsShowing
                ? document.body.setAttribute('style', 'overflow: hidden; position: absolute; width: 100vw;')
                : document.body.setAttribute('style', 'overflow: scroll; ');
        }
    };
    SharedHeader.prototype.closeMenus = function (event) {
        event.preventDefault();
        this.giveNavIsShowing = false;
        this.mainNavIsShowing = false;
        this.profileNavIsShowing = false;
        return document.body.setAttribute('style', 'overflow: scroll;');
    };
    SharedHeader.prototype.navClasses = function () {
        var classes = [];
        if (this.mainNavIsShowing)
            classes.push('is-showing');
        if (this.active)
            classes.push("section--" + this.active);
        if (this.profileNavIsShowing || this.giveNavIsShowing)
            classes = [];
        return classes.join(' ');
    };
    SharedHeader.prototype.navCloseClasses = function () {
        var classes = ['close'];
        if (this.mainNavIsShowing || this.profileNavIsShowing || this.giveNavIsShowing)
            classes.push('is-showing');
        return classes.join(' ');
    };
    SharedHeader.prototype.handleScroll = function (event) {
        if (this.mainNavIsShowing || this.giveNavIsShowing || this.profileNavIsShowing) {
            return document.body.setAttribute('style', 'overflow: scroll;'), this.closeMenus(event);
        }
    };
    /**
     * HTML
     */
    SharedHeader.prototype.render = function () {
        var close = '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>';
        return (h(Fragment, null, h("global-nav", { mainNavIsShowing: this.mainNavIsShowing, profileNavIsShowing: this.profileNavIsShowing, giveNavIsShowing: this.giveNavIsShowing, navClickHandler: this.toggleMenu.bind(this), giveData: this.data.give, profileData: this.data.profile, config: this.data.config, env: this.env }), h("nav", { class: this.navClasses(), onClick: function (event) { return event.stopPropagation(); } }, h("div", { class: "content" }, h("div", { class: "navigation" }, h("ul", null, this.renderSections(this.data.nav))), this.renderSubnavs(this.data.nav), h("nav-ctas", { active: this.active, data: this.data.promos }))), h("div", { class: this.navCloseClasses() }, h("div", { class: "close-icon", innerHTML: close, onClick: this.closeMenus.bind(this) }))));
    };
    Object.defineProperty(SharedHeader.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedHeader, "style", {
        get: function () { return "\@media (max-width:992px){.subnavigation{left:100vw;padding-bottom:125px;position:absolute;top:0}}\@media (min-width:992px){.subnavigation{padding-top:47px}}.subnavigation h3{color:#fff;font-size:11px;opacity:.5;text-transform:uppercase}nav{background-color:#000;background-repeat:no-repeat;background-size:cover;color:#fff;display:none;font-family:acumin-pro,helvetica,arial,sans-serif;height:calc(100% - 47px);overflow-x:hidden;overflow-y:scroll;position:fixed;top:47px;-webkit-transform:translateX(0);transform:translateX(0);width:100vw;z-index:2;background-image:url(https://crds-media.imgix.net/7B6MoNNiWMZOtdusfRpipl/651049926b72990ae4f510a725cc2b26/nav-section-default-mobile.jpg?auto=format%2Ccompress)}nav.is-showing{display:block}\@media (min-width:768px){nav{height:100vh}}\@media (min-width:992px){nav{background-size:100%;background-image:url(https://crds-media.imgix.net/1OTqm9FjFl6wtjCXAkA04V/d44f06765e1fe0cf6a33ac3222b29302/nav-section-default.jpg?auto=format%2Ccompress)}}nav.section--come-visit{background-image:url(https://crds-media.imgix.net/7tP5INZjs0NUsWUlUDRpKv/6af5b40c0caf555a52876d51037de2a2/nav-section-locations-mobile.jpg?auto=format%2Ccompress)}\@media (min-width:992px){nav.section--come-visit{background-image:url(https://crds-media.imgix.net/49tv3Wjdt28dPnim7TbR89/6e9931a3700a3894510faa32d6dcea0f/nav-section-locations.jpg?auto=format%2Ccompress)}}nav.section--find-community{background-image:url(https://crds-media.imgix.net/67LrfkAcGom2zu23JncnA0/6e3c9b52f38f455d69f8b441d0d60726/nav-section-community-mobile.jpg?auto=format%2Ccompress)}\@media (min-width:992px){nav.section--find-community{background-image:url(https://crds-media.imgix.net/zEx1Ajg3dIlh5SpvzQ1qI/981c79df660b3dc5b393338a7640b2a1/nav-section-community.jpg?auto=format%2Ccompress)}}nav.section--get-support{background-image:url(https://crds-media.imgix.net/Cx02UnQr9sbVzjpXIcuqY/92b73ec270bf84af99c590bbd0173c54/nav-section-support-mobile.jpg?auto=format%2Ccompress)}\@media (min-width:992px){nav.section--get-support{background-image:url(https://crds-media.imgix.net/7i7YFUv6uY8MpwztZwIZE0/d093954885a5af29757040281c3b7e4c/nav-section-support.jpg?auto=format%2Ccompress)}}nav.section--watch-listen-read{background-image:url(https://crds-media.imgix.net/5lMvnR6A9cavGG4aS0zzO8/bcff1c0f42284f027a411b22a85bfb55/nav-section-media-mobile.jpg?auto=format%2Ccompress)}\@media (min-width:992px){nav.section--watch-listen-read{background-image:url(https://crds-media.imgix.net/59liSAMGW8dBCeUza5NUvj/b43c1e158ac599fd6debc40b916997d9/nav-section-media.jpg?auto=format%2Ccompress)}}nav .content{position:relative;width:200vw;z-index:3;margin:0 auto;max-width:1170px}\@media (max-width:992px){nav .content{padding-bottom:125px;-webkit-transform:translateX(0);transform:translateX(0);-webkit-transition:-webkit-transform .2s linear;transition:-webkit-transform .2s linear;transition:transform .2s linear;transition:transform .2s linear,-webkit-transform .2s linear}}\@media (min-width:992px){nav .content{display:-ms-flexbox;display:flex;padding-bottom:0}}\@media (max-width:992px){nav[class*=section--] .content{-webkit-transform:translateX(-100vw);transform:translateX(-100vw);-webkit-transition:-webkit-transform .2s linear;transition:-webkit-transform .2s linear;transition:transform .2s linear;transition:transform .2s linear,-webkit-transform .2s linear}}\@media (min-width:992px){nav[class*=section--] .ctas{display:none}}\@media (min-width:992px){nav[class*=section--] .subnavigation{width:calc(50% - 40px)}}.navigation{position:relative;width:100vw}\@media (min-width:992px){.navigation{margin-right:1.2%;width:50%}}.navigation ul{padding-left:0;margin:0;padding:30px 0 20px}.navigation ul li{list-style:none}\@media (min-width:992px){.navigation ul{padding:50px 20px 0;position:relative;z-index:1}}.navigation li{width:100%}.navigation:after{background-color:#d8d8d8;bottom:0;content:\"\";height:2px;left:20px;margin:0 auto;opacity:.2;position:absolute;width:calc(100vw - 40px)}\@media (min-width:992px){.navigation:after{background:-webkit-gradient(linear,left top,left bottom,from(#fff),to(hsla(0,0%,100%,0)));background:linear-gradient(180deg,#fff 0,hsla(0,0%,100%,0));height:100%;left:auto;right:56px;top:50px;width:2px}}.close{background:-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.9)));background:linear-gradient(180deg,transparent,rgba(0,0,0,.9));bottom:0;display:none;height:125px;padding-left:22px;position:fixed;width:100%;z-index:3}\@media (max-width:992px){.close.is-showing{display:block}}.close-icon{background-color:#0095d9;border-radius:50%;bottom:22px;-webkit-box-shadow:0 5px 24px -5px rgba(0,0,0,.75);box-shadow:0 5px 24px -5px rgba(0,0,0,.75);cursor:pointer;height:64px;position:absolute;width:64px}.close svg{fill:#fff;height:30px;left:50%;position:absolute;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:30px}"; },
        enumerable: true,
        configurable: true
    });
    return SharedHeader;
}());
var SnailTrail = /** @class */ (function () {
    function SnailTrail(hostRef) {
        registerInstance(this, hostRef);
        this.env = 'prod';
        this.data = {};
    }
    SnailTrail.prototype.componentWillLoad = function () {
        var _this = this;
        if (this.src || (this.name && this.env)) {
            var url = this.src || "https://crds-data.netlify.com/snail-trails/" + this.name + "/" + this.env + ".json";
            axios.get(url).then(function (response) { return (_this.data = response.data); });
        }
    };
    SnailTrail.prototype.listItem = function (item) {
        if (item.subscribe && item.src)
            return h("crds-subscribe", { src: item.src, title: item.title });
        if (!item.href)
            return h("strong", null, item.title);
        return (h("snail-trail-link", { href: item.href, automationId: item['data-automation-id'] }, item.title));
    };
    SnailTrail.prototype.list = function (section) {
        var _this = this;
        return section.map(function (item) {
            return h("li", null, _this.listItem(item));
        });
    };
    SnailTrail.prototype.navSections = function () {
        var _this = this;
        if (!this.data.nav)
            return;
        return this.data.nav.map(function (section) { return h("ul", null, _this.list(section)); });
    };
    SnailTrail.prototype.render = function () {
        if (!this.data.nav && this.element.childElementCount == 0)
            return;
        return (h(Fragment, null, h("nav", null, h("div", null, this.element.childElementCount > 0 && h("slot", null), this.element.childElementCount == 0 && h(Fragment, null, this.navSections())))));
    };
    Object.defineProperty(SnailTrail.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SnailTrail, "style", {
        get: function () { return "nav{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important;background-color:#fff;-webkit-box-shadow:0 1px 6px 0 rgba(0,0,0,.14);box-shadow:0 1px 6px 0 rgba(0,0,0,.14);font-size:14px;padding-left:20px;position:relative}\@media (min-width:1170px){nav{padding-left:0}}nav>div{display:-ms-flexbox;display:flex;-webkit-overflow-scrolling:touch;overflow-x:auto;overflow-y:hidden;position:relative;scrollbar-width:none;margin:0 auto;max-width:1170px}\@media (max-width:992px){nav:after{background:-webkit-gradient(linear,left top,right top,from(hsla(0,0%,100%,0)),to(rgba(0,0,0,.8)));background:linear-gradient(90deg,hsla(0,0%,100%,0),rgba(0,0,0,.8));content:\"\";display:inline-block;height:100%;opacity:.3;position:absolute;right:0;top:0;width:20px}}strong{color:#4d4d4d;display:inline-block;font-weight:600;margin-right:15px;padding:11px 0;text-transform:capitalize;white-space:nowrap}ul{padding-left:0;-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;margin-bottom:0;margin-top:0}ul li{list-style:none}ul:not(:last-of-type):after{border-right:1px solid #d8d8d8;content:\"\";height:calc(100% - 22px);width:1px}li{display:inline-block;text-transform:capitalize;white-space:nowrap}"; },
        enumerable: true,
        configurable: true
    });
    return SnailTrail;
}());
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
function map$1(array, fn) {
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
    var encoded = map$1(labels, fn).join('.');
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
    var output = [], counter = 0, length = string.length, value, extra;
    while (counter < length) {
        value = string.charCodeAt(counter++);
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
            // high surrogate, and there is a next character
            extra = string.charCodeAt(counter++);
            if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
            }
            else {
                // unmatched surrogate; only append this code unit, in case the next
                // code unit is the high surrogate of a surrogate pair
                output.push(value);
                counter--;
            }
        }
        else {
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
    for ( /* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
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
function encode(input) {
    var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], 
    /** `inputLength` will hold the number of code points in `input`. */
    inputLength, 
    /** Cached calculation results */
    handledCPCountPlusOne, baseMinusT, qMinusT;
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
                for (q = delta, k = base; /* no condition */; k += base) {
                    t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                    if (q < t) {
                        break;
                    }
                    qMinusT = q - t;
                    baseMinusT = base - t;
                    output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
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
    return mapDomain(input, function (string) {
        return regexNonASCII.test(string) ?
            'xn--' + encode(string) :
            string;
    });
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
var isArray$1 = Array.isArray || function (xs) {
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
function stringify(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
        obj = undefined;
    }
    if (typeof obj === 'object') {
        return map$2(objectKeys(obj), function (k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
            if (isArray$1(obj[k])) {
                return map$2(obj[k], function (v) {
                    return ks + encodeURIComponent(stringifyPrimitive(v));
                }).join(sep);
            }
            else {
                return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }
        }).join(sep);
    }
    if (!name)
        return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
        encodeURIComponent(stringifyPrimitive(obj));
}
function map$2(xs, f) {
    if (xs.map)
        return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        res.push(f(xs[i], i));
    }
    return res;
}
var objectKeys = Object.keys || function (obj) {
    var res = [];
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
            res.push(key);
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
        var x = qs[i].replace(regexp, '%20'), idx = x.indexOf(eq), kstr, vstr, k, v;
        if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
        }
        else {
            kstr = x;
            vstr = '';
        }
        k = decodeURIComponent(kstr);
        v = decodeURIComponent(vstr);
        if (!hasOwnProperty(obj, k)) {
            obj[k] = v;
        }
        else if (isArray$1(obj[k])) {
            obj[k].push(v);
        }
        else {
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
var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, 
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
nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape), hostEndingChars = ['/', '?', '#'], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, 
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
    if (url && isObject$1(url) && url instanceof Url)
        return url;
    var u = new Url;
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
}
Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
    return parse$1(this, url, parseQueryString, slashesDenoteHost);
};
function parse$1(self, url, parseQueryString, slashesDenoteHost) {
    if (!isString$1(url)) {
        throw new TypeError('Parameter \'url\' must be a string, not ' + typeof url);
    }
    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    var queryIndex = url.indexOf('?'), splitter = (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#', uSplit = url.split(splitter), slashRegex = /\\/g;
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
                }
                else {
                    self.query = self.search.substr(1);
                }
            }
            else if (parseQueryString) {
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
        }
        else {
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
                if (!part)
                    continue;
                if (!part.match(hostnamePartPattern)) {
                    var newpart = '';
                    for (var j = 0, k = part.length; j < k; j++) {
                        if (part.charCodeAt(j) > 127) {
                            // we replace non-ASCII char with a temporary placeholder
                            // we need this to make sure size of hostname is not
                            // broken by replacing non-ASCII by nothing
                            newpart += 'x';
                        }
                        else {
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
        }
        else {
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
    }
    else if (parseQueryString) {
        // no query string, but parseQueryString still requested
        self.search = '';
        self.query = {};
    }
    if (rest)
        self.pathname = rest;
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
    var protocol = self.protocol || '', pathname = self.pathname || '', hash = self.hash || '', host = false, query = '';
    if (self.host) {
        host = auth + self.host;
    }
    else if (self.hostname) {
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
    if (protocol && protocol.substr(-1) !== ':')
        protocol += ':';
    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (self.slashes ||
        (!protocol || slashedProtocol[protocol]) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname.charAt(0) !== '/')
            pathname = '/' + pathname;
    }
    else if (!host) {
        host = '';
    }
    if (hash && hash.charAt(0) !== '#')
        hash = '#' + hash;
    if (search && search.charAt(0) !== '?')
        search = '?' + search;
    pathname = pathname.replace(/[?#]/g, function (match) {
        return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');
    return protocol + host + pathname + search + hash;
}
Url.prototype.format = function () {
    return format(this);
};
Url.prototype.resolve = function (relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
};
Url.prototype.resolveObject = function (relative) {
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
            while (relPath.length && !(relative.host = relPath.shift()))
                ;
            if (!relative.host)
                relative.host = '';
            if (!relative.hostname)
                relative.hostname = '';
            if (relPath[0] !== '')
                relPath.unshift('');
            if (relPath.length < 2)
                relPath.unshift('');
            result.pathname = relPath.join('/');
        }
        else {
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
    var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'), isRelAbs = (relative.host ||
        relative.pathname && relative.pathname.charAt(0) === '/'), mustEndAbs = (isRelAbs || isSourceAbs ||
        (result.host && relative.pathname)), removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split('/') || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
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
            if (srcPath[0] === '')
                srcPath[0] = result.host;
            else
                srcPath.unshift(result.host);
        }
        result.host = '';
        if (relative.protocol) {
            relative.hostname = null;
            relative.port = null;
            if (relative.host) {
                if (relPath[0] === '')
                    relPath[0] = relative.host;
                else
                    relPath.unshift(relative.host);
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
    }
    else if (relPath.length) {
        // it's relative
        // throw away the existing file, and take the new path instead.
        if (!srcPath)
            srcPath = [];
        srcPath.pop();
        srcPath = srcPath.concat(relPath);
        result.search = relative.search;
        result.query = relative.query;
    }
    else if (!isNullOrUndefined(relative.search)) {
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
        }
        else {
            result.path = null;
        }
        result.href = result.format();
        return result;
    }
    // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = ((result.host || relative.host || srcPath.length > 1) &&
        (last === '.' || last === '..') || last === '');
    // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = srcPath.length; i >= 0; i--) {
        last = srcPath[i];
        if (last === '.') {
            srcPath.splice(i, 1);
        }
        else if (last === '..') {
            srcPath.splice(i, 1);
            up++;
        }
        else if (up) {
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
    }
    else {
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
Url.prototype.parseHost = function () {
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
    if (host)
        self.hostname = host;
}
var SnailTrailLink = /** @class */ (function () {
    function SnailTrailLink(hostRef) {
        registerInstance(this, hostRef);
        this.href = '#';
    }
    SnailTrailLink.prototype.componentWillLoad = function () {
        var url = urlParse(this.href);
        var elPath = this.stripTrailingSlash(url.pathname);
        var currentPath = this.stripTrailingSlash(window.location.pathname);
        this.isActive = this.isActive == undefined ? elPath == currentPath : this.isActive;
    };
    SnailTrailLink.prototype.stripTrailingSlash = function (str) {
        try {
            return str.replace(/^(.+?)\/*?$/, '$1');
        }
        catch (_a) {
            return str;
        }
    };
    SnailTrailLink.prototype.clicked = function () {
        var siblings = this.element.parentNode.parentElement.querySelectorAll('snail-trail-link');
        siblings.forEach(function (el) { return (el.isActive = false); });
        this.isActive = true;
    };
    SnailTrailLink.prototype.render = function () {
        var props = {
            href: this.href,
            onClick: this.clicked.bind(this),
            class: this.isActive ? 'active' : ''
        };
        return (h("a", Object.assign({ "data-automation-id": this.automationId }, props), h("slot", null)));
    };
    Object.defineProperty(SnailTrailLink.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SnailTrailLink, "style", {
        get: function () { return "a{color:#4d4d4d;display:block;font-weight:300;padding:11px 15px;position:relative;text-decoration:none}a.active:before{border:10px solid transparent;border-bottom:0;border-top-color:#0095d9;content:\"\";left:50%;position:absolute;top:0;-webkit-transform:translateX(-50%);transform:translateX(-50%)}\@media (hover){a:hover:after{background-color:#0095d9;bottom:0;content:\"\";display:inline-block;height:2px;left:15px;position:absolute;width:calc(100% - 30px)}}"; },
        enumerable: true,
        configurable: true
    });
    return SnailTrailLink;
}());
export { CrdsModal as crds_modal, CrdsSubscribe as crds_subscribe, GiveMenu as give_nav, GlobalNav as global_nav, NavCtas as nav_ctas, NavigationSection as nav_section, NavSectionSubnav as nav_section_subnav, ProfileMenu as profile_nav, SharedFooter as shared_footer, SharedHeader as shared_header, SnailTrail as snail_trail, SnailTrailLink as snail_trail_link };
