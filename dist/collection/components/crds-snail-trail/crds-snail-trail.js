<<<<<<< HEAD
import { h } from "@stencil/core";
import axios from 'axios';
import Fragment from '../../shared/fragment';
=======
import { h } from '@stencil/core';
import axios from 'axios';
import Fragment from 'stencil-fragment';
>>>>>>> development
export class SnailTrail {
    constructor() {
        this.env = 'prod';
        this.data = {};
    }
    componentWillLoad() {
        if (this.src || (this.name && this.env)) {
            const url = this.src || `https://crds-data.netlify.com/snail-trails/${this.name}/${this.env}.json`;
            axios.get(url).then(response => (this.data = response.data));
        }
    }
    listItem(item) {
        if (item.subscribe && item.src)
            return h("crds-subscribe", { src: item.src, label: item.title });
        if (!item.href)
            return h("strong", null, item.title);
        return (h("crds-snail-trail-link", { href: item.href, automationId: item['data-automation-id'] }, item.title));
    }
    list(section) {
        return section.map(item => {
            return h("li", null, this.listItem(item));
        });
    }
    navSections() {
        if (!this.data.nav)
            return;
        return this.data.nav.map(section => h("ul", null, this.list(section)));
    }
    render() {
        if (!this.data.nav && this.element.childElementCount == 0)
            return;
        return (h(Fragment, null,
            h("nav", null,
                h("div", null,
                    this.element.childElementCount > 0 && h("slot", null),
                    this.element.childElementCount == 0 && h(Fragment, null, this.navSections())))));
    }
    static get is() { return "crds-snail-trail"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-snail-trail.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-snail-trail.css"]
    }; }
    static get properties() { return {
        "src": {
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
            "attribute": "src",
            "reflect": false
        },
        "env": {
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
            "attribute": "env",
            "reflect": false,
            "defaultValue": "'prod'"
        },
        "name": {
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
            "attribute": "name",
            "reflect": false
        }
    }; }
    static get states() { return {
        "data": {}
    }; }
    static get elementRef() { return "element"; }
}
