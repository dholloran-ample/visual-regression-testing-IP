import { h } from "@stencil/core";
import { parse } from 'url';
export class SnailTrailLink {
    constructor() {
        this.href = '#';
    }
    componentWillLoad() {
        const url = parse(this.href);
        const elPath = this.stripTrailingSlash(url.pathname);
        const currentPath = this.stripTrailingSlash(window.location.pathname);
        this.isActive = this.isActive == undefined ? elPath == currentPath : this.isActive;
    }
    stripTrailingSlash(str) {
        try {
            return str.replace(/^(.+?)\/*?$/, '$1');
        }
        catch (_a) {
            return str;
        }
    }
    clicked() {
        let siblings = this.element.parentNode.parentElement.querySelectorAll('crds-snail-trail-link');
        siblings.forEach(el => (el['isActive'] = false));
        this.isActive = true;
    }
    render() {
        let props = {
            href: this.href,
            onClick: this.clicked.bind(this),
            class: this.isActive ? 'active' : ''
        };
        return (h("a", Object.assign({ "data-automation-id": this.automationId }, props),
            h("slot", null)));
    }
    static get is() { return "crds-snail-trail-link"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-snail-trail-link.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-snail-trail-link.css"]
    }; }
    static get properties() { return {
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
            "reflect": false,
            "defaultValue": "'#'"
        },
        "isActive": {
            "type": "boolean",
            "mutable": true,
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
            "reflect": false
        }
    }; }
    static get elementRef() { return "element"; }
}
