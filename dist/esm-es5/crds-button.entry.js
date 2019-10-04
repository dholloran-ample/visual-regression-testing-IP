import { r as registerInstance, h } from './core-9036992e.js';
var CrdsButton = /** @class */ (function () {
    function CrdsButton(hostRef) {
        registerInstance(this, hostRef);
    }
    CrdsButton.prototype.render = function () {
        return (h("a", { class: "crds-button", href: this.href }, this.label));
    };
    Object.defineProperty(CrdsButton, "style", {
        get: function () { return ".crds-button{display:inline-block;background-color:#3b6e8f;color:#fff;border-radius:4px;margin-top:1.375rem;text-decoration:none;cursor:pointer;height:43px;vertical-align:middle;line-height:43px;padding:0 1rem;font-size:.875rem}"; },
        enumerable: true,
        configurable: true
    });
    return CrdsButton;
}());
export { CrdsButton as crds_button };
