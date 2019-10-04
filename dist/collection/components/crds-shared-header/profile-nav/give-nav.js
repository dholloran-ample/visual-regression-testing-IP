import { h } from "@stencil/core";
import { SimpleNavHelper } from './simple-nav-helper';
export class GiveMenu {
    constructor() {
        this.isNavShowing = true;
        this.data = {};
        this.simpleNav = new SimpleNavHelper();
    }
    navTitle() {
        return (this.data && this.data.title) || '';
    }
    backgroundImageURL(data) {
        return data.background_img || '';
    }
    render() {
        if (!this.isNavShowing || !this.simpleNav.isObjectTruthyNonArray(this.data))
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
        "isNavShowing": {
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
            "attribute": "is-nav-showing",
            "reflect": false,
            "defaultValue": "true"
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
