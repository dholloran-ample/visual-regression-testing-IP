'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-c7c01652.js');

const CrdsButton = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return (core.h("a", { class: "crds-button", href: this.href }, this.label));
    }
    static get style() { return ".crds-button{display:inline-block;background-color:#3b6e8f;color:#fff;border-radius:4px;margin-top:1.375rem;text-decoration:none;cursor:pointer;height:43px;vertical-align:middle;line-height:43px;padding:0 1rem;font-size:.875rem}"; }
};

exports.crds_button = CrdsButton;
