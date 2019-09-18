'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-2a61a957.js');
const __chunk_2 = require('./chunk-0ec5cafb.js');

class NavigationLink {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        /**
         * Print log messages?
         */
        this.debug = true;
    }
    componentWillLoad() {
        this.console = new __chunk_2.Logger(this.debug);
        this.config = new __chunk_2.Config();
    }
    onClick(event) {
        if (this.isSignOutLink()) {
            if (typeof this.handleSignOut === 'function') {
                this.handleSignOut();
                event.preventDefault();
            }
            else {
                console.error('Function to handle sign out not provided');
            }
        }
        else {
            window.location.href = this.href;
            event.stopPropagation();
        }
    }
    isSignOutLink() {
        return this.automationId === 'sh-sign-out';
    }
    render() {
        return (__chunk_1.h("a", { href: this.href, "data-automation-id": this.automationId, onClick: this.onClick.bind(this) }, __chunk_1.h("slot", null)));
    }
}

exports.nav_link = NavigationLink;
