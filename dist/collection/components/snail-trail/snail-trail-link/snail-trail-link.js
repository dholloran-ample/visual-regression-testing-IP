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
        let siblings = this.element.parentNode.parentElement.querySelectorAll('snail-trail-link');
        siblings.forEach(el => (el.isActive = false));
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
    static get is() { return "snail-trail-link"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "automationId": {
            "type": String,
            "attr": "automation-id"
        },
        "element": {
            "elementRef": true
        },
        "href": {
            "type": String,
            "attr": "href"
        },
        "isActive": {
            "type": Boolean,
            "attr": "is-active",
            "mutable": true
        }
    }; }
    static get style() { return "/**style-placeholder:snail-trail-link:**/"; }
}
