import { h } from '@stencil/core';
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
        return (h("div", { class: "give-nav", style: { backgroundImage: `url(${this.backgroundImageURL(this.data)})` } }, this.simpleNav.renderNav(this.data, this.navTitle())));
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
}
