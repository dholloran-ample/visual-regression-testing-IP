import { h } from '@stencil/core';
import { Logger } from '../../../shared/logger';
import { Config } from '../../../shared/config';
export class NavigationSection {
    constructor() {
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
        return (h("li", null,
            h("a", { class: this.isActive ? 'is-active' : '', "data-automation-id": `sh-section-${this.sectionName}`, onClick: this.onClick.bind(this) },
                h("slot", null))));
    }
    static get is() { return "nav-section"; }
    static get originalStyleUrls() { return {
        "$": ["nav-section.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["nav-section.css"]
    }; }
    static get properties() { return {
        "sectionName": {
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
            "attribute": "section-name",
            "reflect": false
        },
        "isActive": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "is-active",
            "reflect": false,
            "defaultValue": "false"
        },
        "handleClick": {
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
