import { r as registerInstance, h, c as getElement } from './chunk-baaaaca5.js';
import './chunk-950a1dca.js';
import { a as axios } from './chunk-bab4a87b.js';
import { F as Fragment } from './chunk-97d1cf70.js';

class SnailTrail {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
            return h("crds-subscribe", { src: item.src, label: item.title });
        if (!item.href)
            return h("strong", null, item.title);
        return (h("crds-snail-trail-link", { href: item.href, automationId: item['data-automation-id'] }, item.title));
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
        return (h(Fragment, null, h("nav", null, h("div", null, this.element.childElementCount > 0 && h("slot", null), this.element.childElementCount == 0 && h(Fragment, null, this.navSections())))));
    }
    get element() { return getElement(this); }
    static get style() { return "nav {\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif !important;\n  font-weight: 300 !important;\n  background-color: white;\n  -webkit-box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.14);\n  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.14);\n  font-size: 14px;\n  padding-left: 20px;\n  position: relative;\n}\n\@media (min-width: 1170px) {\n  nav {\n    padding-left: 0;\n  }\n}\nnav > div {\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-overflow-scrolling: touch;\n  overflow-x: auto;\n  overflow-y: hidden;\n  position: relative;\n  scrollbar-width: none;\n  margin: 0 auto;\n  max-width: 1170px;\n}\n\@media (max-width: 992px) {\n  nav::after {\n    background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), to(rgba(0, 0, 0, 0.8)));\n    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.8) 100%);\n    content: \"\";\n    display: inline-block;\n    height: 100%;\n    opacity: 0.3;\n    position: absolute;\n    right: 0;\n    top: 0;\n    width: 20px;\n  }\n}\n\nstrong {\n  color: #4d4d4d;\n  display: inline-block;\n  font-weight: 600;\n  margin-right: 15px;\n  padding: 11px 0;\n  text-transform: capitalize;\n  white-space: nowrap;\n}\n\nul {\n  padding-left: 0;\n  -ms-flex-align: center;\n  align-items: center;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 0;\n  margin-top: 0;\n}\nul li {\n  list-style: none;\n}\nul:not(:last-of-type)::after {\n  border-right: 1px solid #d8d8d8;\n  content: \"\";\n  height: calc(100% - 22px);\n  width: 1px;\n}\n\nli {\n  display: inline-block;\n  text-transform: capitalize;\n  white-space: nowrap;\n}"; }
}

export { SnailTrail as crds_snail_trail };
