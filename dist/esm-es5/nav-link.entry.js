import { r as registerInstance, h } from './core-9036992e.js';
import { L as Logger, C as Config } from './config-35cb01ab.js';
var NavigationLink = /** @class */ (function () {
    function NavigationLink(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Print log messages?
         */
        this.debug = true;
    }
    NavigationLink.prototype.componentWillLoad = function () {
        this.console = new Logger(this.debug);
        this.config = new Config();
    };
    NavigationLink.prototype.onClick = function (event) {
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
    };
    NavigationLink.prototype.isSignOutLink = function () {
        return this.automationId === 'sh-sign-out';
    };
    NavigationLink.prototype.render = function () {
        return (h("a", { href: this.href, "data-automation-id": this.automationId, onClick: this.onClick.bind(this) }, h("slot", null)));
    };
    return NavigationLink;
}());
export { NavigationLink as nav_link };
