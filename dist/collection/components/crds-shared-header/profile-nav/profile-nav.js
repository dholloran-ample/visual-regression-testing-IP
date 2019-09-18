<<<<<<< HEAD
import { h } from "@stencil/core";
import { SimpleNavHelper } from './simple-nav-helper';
export class ProfileMenu {
    constructor() {
        this.profileNavIsShowing = true;
        this.simpleNav = new SimpleNavHelper(this.handleSignOut);
    }
    navTitle() {
        const data = this.data;
        const title = (data && data.title) || '';
        return unescape(title.replace('%user_name%', this.currentUser.name || ''));
    }
    backgroundImageURL() {
        return (this.currentUser && this.currentUser.avatarUrl) || '';
    }
    render() {
        if (!this.profileNavIsShowing || !this.simpleNav.isObjectTruthyNonArray(this.data))
            return null;
        return (h("div", { class: "profile-nav" },
            h("div", { class: "profile-nav-img", style: {
                    backgroundImage: `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%),url('${this.backgroundImageURL()}')`
                } }),
            h("div", null, this.simpleNav.renderSections(this.data, this.navTitle()))));
=======
import { h } from '@stencil/core';
export class ProfileMenu {
    constructor() {
        this.profileNavIsShowing = true;
        this.renderSections = payload => {
            let topLevel = { value: false };
            const title = unescape(payload.title.replace('%user_name%', this.currentUser.name || ''));
            return (h("div", null,
                h("h2", null,
                    " ",
                    title,
                    " "),
                payload.children.map(child => this.renderChild(child, topLevel))));
        };
        this.renderChild = (child, topLevel) => {
            topLevel.value = topLevel.value || typeof child == 'string';
            return (h("div", { style: { padding: '0' } },
                typeof child == 'string' && h("h4", null, child),
                typeof child != 'string' && h("ul", null, this.renderChildHTML(child, topLevel))));
        };
        this.renderChildHTML = (child, topLevel) => {
            return child.map(el => {
                if (typeof el != 'string')
                    return (h("li", { class: topLevel.value ? '' : 'top-level' },
                        h("a", { href: el.href, "data-automation-id": el['automation-id'], onClick: e => {
                                if (el['sign-out'])
                                    this.onSignOut(e);
                            } }, el.title)));
            });
        };
    }
    envUrl(path) {
        return `${process.env.CRDS_BASE_URL}${path}`;
    }
    handleClick(event) {
        event.stopPropagation();
    }
    render() {
        if (!this.profileNavIsShowing)
            return null;
        return (h("div", { class: "profile-nav" },
            h("div", { class: "profile-nav-img", style: {
                    backgroundImage: `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%),url('${this.currentUser.avatarUrl}')`
                } }),
            h("div", null, this.renderSections(this.data))));
>>>>>>> development
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
<<<<<<< HEAD
        "profileNavIsShowing": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
=======
        "config": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
>>>>>>> development
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
<<<<<<< HEAD
            "attribute": "profile-nav-is-showing",
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
=======
            "attribute": "config",
            "reflect": false
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
        "onSignOut": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Function",
                "resolved": "Function",
                "references": {
                    "Function": {
>>>>>>> development
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
<<<<<<< HEAD
        "currentUser": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
=======
        "profileNavIsShowing": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
>>>>>>> development
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
<<<<<<< HEAD
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
=======
            "attribute": "profile-nav-is-showing",
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
>>>>>>> development
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
