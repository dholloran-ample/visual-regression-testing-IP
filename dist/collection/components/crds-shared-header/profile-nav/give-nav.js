<<<<<<< HEAD
import { h } from "@stencil/core";
import { SimpleNavHelper } from './simple-nav-helper';
export class GiveMenu {
    constructor() {
        this.giveNavIsShowing = true;
        this.simpleNav = new SimpleNavHelper();
    }
    navTitle() {
        const data = this.data;
        return (data && data.title) || '';
    }
    backgroundImageURL(data) {
        return data.background_img || '';
    }
    render() {
        if (!this.giveNavIsShowing || !this.simpleNav.isObjectTruthyNonArray(this.data))
            return null;
        return (h("div", { class: "give-nav", style: { backgroundImage: `url(${this.backgroundImageURL(this.data)})` } }, this.simpleNav.renderSections(this.data, this.navTitle())));
=======
import { h } from '@stencil/core';
export class GiveMenu {
    constructor() {
        this.giveNavIsShowing = true;
        this.renderSections = payload => {
            let top_level = false;
            return (h("div", null,
                h("h2", null,
                    " ",
                    payload.title,
                    " "),
                payload.children.map(child => {
                    top_level = top_level || typeof child == 'string';
                    return (h("div", { style: { padding: '0' } },
                        typeof child == 'string' && h("h4", null, child),
                        typeof child != 'string' && (h("ul", null, child.map(el => {
                            if (typeof el != 'string')
                                return (h("li", { class: top_level ? '' : 'top-level' },
                                    h("a", { href: el.href, "data-automation-id": el['automation-id'] }, el.title)));
                        })))));
                })));
        };
    }
    handleClick(event) {
        event.stopPropagation();
    }
    render() {
        if (!this.giveNavIsShowing)
            return null;
        return (h("div", { class: "give-nav", style: { backgroundImage: `url(${this.data.background_img})` } }, this.renderSections(this.data)));
>>>>>>> development
    }
    static get is() { return "give-nav"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["profile-nav.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["profile-nav.css"]
    }; }
    static get properties() { return {
        "giveNavIsShowing": {
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
            "attribute": "give-nav-is-showing",
            "reflect": false,
            "defaultValue": "true"
        },
        "data": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "JSON",
                "resolved": "JSON",
                "references": {
                    "JSON": {
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
<<<<<<< HEAD
=======
    static get listeners() { return [{
            "name": "click",
            "method": "handleClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
>>>>>>> development
}
