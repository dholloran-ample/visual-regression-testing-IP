import { h } from "@stencil/core";
import { GET_NAMES } from './crds-greeting.graphql';
import { CrdsApollo } from '../../shared/apollo';
export class CrdsGreeting {
    constructor() {
        this.user = {
            contact: {
                firstName: null,
                nickName: null
            }
        };
    }
    authTokenHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.apolloClient = CrdsApollo(newValue);
            this.getUser();
        }
    }
    componentWillLoad() {
        this.authTokenHandler(this.authToken, null);
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
            .query({ query: GET_NAMES })
            .then(success => {
            this.user = success.data.user;
        })
            .catch(err => {
            this.logError(err);
        });
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
        const name = this.user.contact.nickName || this.user.contact.firstName || this.defaultName;
        return `${greeting}, ${name}`;
    }
    logError(err) {
        console.error(err);
    }
    render() {
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
        "user": {}
    }; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "authToken",
            "methodName": "authTokenHandler"
        }]; }
}
