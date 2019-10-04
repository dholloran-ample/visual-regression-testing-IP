import { h } from "@stencil/core";
import { SimpleNavHelper } from '../profile-nav/simple-nav-helper';
export class NavSectionSubnav {
    constructor() {
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
        return (h("div", { class: this.isActive ? '' : 'hidden' },
            h("a", { "data-automation-id": `sh-section-subnav-${this.subNavName}`, class: "back", href: "", onClick: event => this.handleBackClick(event) },
                h("span", { innerHTML: chevronLeftLight }),
                "Back"),
            this.simpleNav.formatMenuTitle(this.data.title),
            this.simpleNav.maybeRenderNavEntries(this.data.children)));
    }
    static get is() { return "nav-section-subnav"; }
    static get originalStyleUrls() { return {
        "$": ["nav-section-subnav.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["nav-section-subnav.css"]
    }; }
    static get properties() { return {
        "subNavName": {
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
            "attribute": "sub-nav-name",
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
        "handleBackClick": {
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
        },
        "data": {
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
            "attribute": "data",
            "reflect": false,
            "defaultValue": "{}"
        }
    }; }
}
