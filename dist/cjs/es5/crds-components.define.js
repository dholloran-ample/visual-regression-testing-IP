"use strict";
// CrdsComponents: Custom Elements Define Library, ES Module/es5 Target
Object.defineProperty(exports, "__esModule", { value: true });
var crds_components_core_js_1 = require("./crds-components.core.js");
var crds_components_components_js_1 = require("./crds-components.components.js");
function defineCustomElements(win, opts) {
    return crds_components_core_js_1.defineCustomElement(win, crds_components_components_js_1.COMPONENTS, opts);
}
exports.defineCustomElements = defineCustomElements;
