import { r as registerInstance, h } from './chunk-baaaaca5.js';
import { L as Logger, C as Config } from './chunk-4288f781.js';
import './chunk-4786bf9d.js';

class NavigationLink {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h("a", { href: this.href || "#", "data-automation-id": this.automationId, onClick: this.onClick.bind(this) }, h("slot", null)));
    }
}

export { NavigationLink as nav_link };
