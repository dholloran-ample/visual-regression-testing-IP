import { h } from "@stencil/core";
import { SimpleNavHelper } from './simple-nav-helper';
export class ProfileMenu {
    constructor() {
        this.isNavShowing = true;
        this.data = {};
        this.simpleNav = new SimpleNavHelper(this.handleSignOut);
    }
    navTitle() {
        const title = (this.data && this.data.title) || '';
        return unescape(title.replace('%user_name%', this.currentUser.name || ''));
    }
    backgroundImageURL() {
        return (this.currentUser && this.currentUser.avatarUrl) || '';
    }
    render() {
        if (!this.isNavShowing || !this.simpleNav.isObjectTruthyNonArray(this.data))
            return null;
        return (h("div", { class: "profile-nav" },
            h("div", { class: "profile-nav-img", style: {
                    backgroundImage: `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%),url('${this.backgroundImageURL()}')`
                } }),
            this.simpleNav.renderNav(this.data, this.navTitle())));
    }
    static get is() { return "profile-nav"; }
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
        },
        "currentUser": {
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
            "attribute": "current-user",
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
