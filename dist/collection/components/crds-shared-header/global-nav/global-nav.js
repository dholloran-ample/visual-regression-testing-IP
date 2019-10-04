import { h } from "@stencil/core";
import Fragment from '../../../shared/fragment';
import { Auth } from '../../../shared/auth';
import { Utils } from '../../../shared/utils';
import * as iconData from './global-nav-icons.json';
export class GlobalNav {
    constructor() {
        this.data = {};
        this.openNavName = '';
        this.isAuthenticated = false;
        this.auth = {};
    }
    componentWillLoad() {
        if (!this.data.config || this.auth.config)
            return;
        this.auth = new Auth(Object.assign(this.data.config, { env: this.env }));
        this.auth.listen(this.authChangeCallback.bind(this));
    }
    componentDidLoad() {
        this.topOffset = this.element.getBoundingClientRect().top + window.scrollY;
    }
    /* Handle authentication */
    handleSignOut() {
        this.auth.signOut(this.authChangeCallback.bind(this));
    }
    authChangeCallback() {
        this.isAuthenticated = this.auth.authenticated;
        if (!this.isAuthenticated) {
            this.redirectToRoot();
        }
    }
    redirectToRoot() {
        window.location.replace(this.rootURL());
    }
    /* Handle nav open/close */
    isNavOpen() {
        const navNames = ['main-nav', 'give-nav', 'profile-nav'];
        return navNames.includes(this.openNavName);
    }
    toggleNav(event, navName, navRequiresAuth = false) {
        event.stopPropagation();
        if (this.openNavName === navName) {
            event.preventDefault();
            this.openNavName = '';
        }
        else if (navRequiresAuth) {
            if (this.isAuthenticated) {
                event.preventDefault();
                this.openNavName = navName;
            }
        }
        else {
            event.preventDefault();
            this.openNavName = navName;
        }
        const docStyle = this.isNavOpen() ? 'overflow: hidden; position: absolute; width: 100vw;' : 'overflow: scroll;';
        document.body.setAttribute('style', docStyle);
    }
    closeNav(event) {
        if (this.isNavOpen()) {
            event.preventDefault();
        }
        this.openNavName = '';
        document.body.setAttribute('style', 'overflow: scroll;');
    }
    /* Misc */
    rootURL() {
        return `https://${Utils.getSubdomain(this.env)}.crossroads.net`;
    }
    authProfileIcon() {
        const avatarUrl = this.auth.currentUser && this.auth.currentUser.avatarUrl;
        return `<div class="account-authenticated" style="background-image: url('${avatarUrl || ''}');"/>`;
    }
    /* Render elements */
    render() {
        return (h(Fragment, null,
            h("header", { ref: el => (this.element = el), class: this.isNavOpen() ? 'nav-is-showing' : '', style: { top: `${this.openNavName === 'profile-nav' || this.openNavName === 'give-nav' ? this.topOffset : 0}px` } },
                h("div", null,
                    h("div", { class: "global-nav-items" },
                        h("div", { class: "global-actions" },
                            h("a", { class: `menu-container ${this.openNavName === 'main-nav' ? 'nav-is-showing' : ''}`, onClick: event => this.toggleNav(event, 'main-nav'), "data-label": "menu", "data-automation-id": "sh-menu" },
                                h("div", { class: iconData.main.class, innerHTML: iconData.main.innerHTML }),
                                h("div", { class: iconData.close.class, innerHTML: iconData.close.innerHTML })),
                            h("a", { href: `${this.rootURL()}/search`, class: "search-container", "data-automation-id": "sh-search", "data-label": "search" },
                                h("div", { class: iconData.search.class, innerHTML: iconData.search.innerHTML }))),
                        h("a", { href: this.rootURL(), "data-automation-id": "sh-logo", class: iconData.logo.class, innerHTML: iconData.logo.innerHTML }),
                        h("div", { class: "user-actions" },
                            h("a", { class: `give-container ${this.openNavName === 'give-nav' ? 'nav-is-showing' : ''}`, onClick: event => this.toggleNav(event, 'give-nav'), "data-label": "give", "data-automation-id": "sh-give" },
                                h("div", { class: iconData.give.class, innerHTML: iconData.give.innerHTML }),
                                h("div", { class: iconData.close.class, innerHTML: iconData.close.innerHTML })),
                            h("a", { class: `profile-container ${this.openNavName === 'profile-nav' ? 'nav-is-showing' : ''}`, onClick: event => this.toggleNav(event, 'profile-nav', true), "data-label": this.isAuthenticated ? 'my account' : 'sign in', href: `${this.rootURL()}/signin`, "data-automation-id": "sh-profile" },
                                h("div", { class: iconData.profile.class, innerHTML: this.isAuthenticated ? this.authProfileIcon() : iconData.profile.innerHTML }),
                                h("div", { class: iconData.close.class, innerHTML: iconData.close.innerHTML })))),
                    h("give-nav", { isNavShowing: this.openNavName === 'give-nav', data: this.data.give }),
                    h("profile-nav", { isNavShowing: this.openNavName === 'profile-nav' && this.isAuthenticated, handleSignOut: this.handleSignOut.bind(this), currentUser: this.auth.currentUser, data: this.data.profile }))),
            h("main-nav", { isNavShowing: this.openNavName === 'main-nav', data: this.data.nav, promoData: this.data.promos }),
            h("div", { class: `close-nav ${this.isNavOpen() ? 'is-showing' : ''}` },
                h("div", { class: "close-nav-icon", innerHTML: iconData.close.innerHTML, onClick: this.closeNav.bind(this) }))));
    }
    static get is() { return "global-nav"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["global-nav.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["global-nav.css"]
    }; }
    static get properties() { return {
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
            "reflect": false
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
    static get states() { return {
        "openNavName": {},
        "isAuthenticated": {},
        "topOffset": {}
    }; }
    static get listeners() { return [{
            "name": "click",
            "method": "closeNav",
            "target": "window",
            "capture": false,
            "passive": false
        }]; }
}
