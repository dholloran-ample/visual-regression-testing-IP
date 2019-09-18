import { h } from '@stencil/core';
import { GET_USER } from './crds-greeting.graphql';
import { CrdsApollo } from '../../shared/apollo';
export class CrdsGreeting {
    constructor() {
        this.user = null;
        this.displayName = null;
    }
    authTokenHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.apolloClient = CrdsApollo(newValue);
            this.getUser();
        }
    }
    componentWillLoad() {
        this.apolloClient = CrdsApollo(this.authToken);
    }
    componentWillRender() {
        if (this.authToken)
            return this.getUser();
    }
    componentDidRender() {
        const renderedEvent = new CustomEvent('component rendered', {
            detail: this.host
        });
        document.dispatchEvent(renderedEvent);
        setTimeout(() => {
            this.host.shadowRoot.querySelector('.greeting').classList.add('fade-in');
        }, 0);
    }
    getUser() {
        return this.apolloClient
            .query({ query: GET_USER })
            .then(success => {
            this.user = success.data.user;
            this.getDisplayName();
            return;
        })
            .catch(err => {
            this.getDisplayName();
            this.logError(err);
        });
    }
    getDisplayName() {
        this.displayName = (this.user && (this.user.nickName || this.user.firstName)) || this.defaultName || '';
    }
    parseTimeBasedGreetings(hour) {
        if (hour >= 17)
            return 'Good evening';
        if (hour >= 12)
            return 'Good afternoon';
        return 'Good morning';
    }
    renderGreeting() {
        const date = new Date();
        const greeting = this.parseTimeBasedGreetings(date.getHours());
        return `${greeting}, ${this.displayName}`;
    }
    logError(err) {
        console.error(err);
    }
    render() {
        if (!this.displayName)
            return '';
        return (h("div", { class: "greeting" },
            h("h3", { class: "font-size-large flush" }, this.renderGreeting()),
            h("p", { class: "flush" }, "This place was made for you!")));
    }
    static get is() { return "crds-greeting"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-greeting.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-greeting.css"]
    }; }
    static get properties() { return {
        "authToken": {
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
            "attribute": "auth-token",
            "reflect": false
        },
        "defaultName": {
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
            "attribute": "default-name",
            "reflect": false
        }
    }; }
    static get states() { return {
        "displayName": {}
    }; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "authToken",
            "methodName": "authTokenHandler"
        }]; }
}
