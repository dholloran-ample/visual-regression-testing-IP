'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-c7c01652.js');
const config$3 = require('./config-6ed65d3f.js');

const NavigationLink = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /**
         * Print log messages?
         */
        this.debug = true;
    }
    componentWillLoad() {
        this.console = new config$3.Logger(this.debug);
        this.config = new config$3.Config();
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
        return (core.h("a", { href: this.href, "data-automation-id": this.automationId, onClick: this.onClick.bind(this) }, core.h("slot", null)));
    }
};

exports.nav_link = NavigationLink;
