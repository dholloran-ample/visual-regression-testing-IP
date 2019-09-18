import { h } from '@stencil/core';
import { Logger } from '../../../shared/logger';
import { Config } from '../../../shared/config';
export class NavigationLink {
    constructor() {
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
        return (h("a", { href: this.href || "#", "data-automation-id": this.automationId, onClick: this.onClick.bind(this) },
            h("slot", null)));
    }
    static get is() { return "nav-link"; }
    static get properties() { return {
        "href": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "href",
            "reflect": false
        },
        "automationId": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "automation-id",
            "reflect": false
        },
        "handleSignOut": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Function",
                "resolved": "Function",
                "references": {
                    "Function": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
}
