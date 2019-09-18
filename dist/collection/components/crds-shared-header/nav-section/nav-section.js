import { h } from "@stencil/core";
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
    render() {
        return (h("li", null,
            h("a", { onClick: e => this.onActivate(e, this.slug), "data-automation-id": `sh-section-${this.slug}`, class: this.isActive ? 'is-active' : '' },
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
        "slug": {
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
            "attribute": "slug",
            "reflect": false
        },
        "activeSection": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "active-section",
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
        "onActivate": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "on-activate",
            "reflect": false
        }
    }; }
}
