import axios from 'axios';
import Fragment from 'stencil-fragment';
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
            return h("crds-subscribe", { src: item.src, title: item.title });
        if (!item.href)
            return h("strong", null, item.title);
        return (h("snail-trail-link", { href: item.href, automationId: item['data-automation-id'] }, item.title));
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
    static get is() { return "snail-trail"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "data": {
            "state": true
        },
        "element": {
            "elementRef": true
        },
        "env": {
            "type": String,
            "attr": "env"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "src": {
            "type": String,
            "attr": "src"
        }
    }; }
    static get style() { return "/**style-placeholder:snail-trail:**/"; }
}
