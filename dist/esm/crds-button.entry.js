import { r as registerInstance, h } from './core-9036992e.js';

const CrdsButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("a", { class: "crds-button", href: this.href }, this.label));
    }
    static get style() { return ".crds-button{display:inline-block;background-color:#3b6e8f;color:#fff;border-radius:4px;margin-top:1.375rem;text-decoration:none;cursor:pointer;height:43px;vertical-align:middle;line-height:43px;padding:0 1rem;font-size:.875rem}"; }
};

export { CrdsButton as crds_button };
