import { h } from '@stencil/core';
export class CrdsModal {
    constructor() {
        this.isActive = false;
        this.handleInnerClick = event => {
            event.stopPropagation();
        };
        this.closeModal = () => {
            this.isActive = false;
            if (typeof this.onClose == 'function')
                this.onClose();
        };
    }
    render() {
        return (h("div", { class: `modal ${this.isActive ? 'is-active' : ''}`, id: "subscribeModalForm", tabindex: "-1", onClick: this.closeModal },
            h("div", { class: "modal-content", onClick: this.handleInnerClick },
                h("div", { class: "modal-header" },
                    h("button", { type: "button", class: "modal-close", onClick: this.closeModal })),
                h("div", { class: "modal-body" },
                    this.title && h("h3", { class: "modal-title" }, this.title),
                    h("slot", null)))));
    }
    static get is() { return "crds-modal"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-modal.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-modal.css"]
    }; }
    static get properties() { return {
        "isActive": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "is-active",
            "reflect": false,
            "defaultValue": "false"
        },
        "onClose": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Function",
                "resolved": "Function",
                "references": {
                    "Function": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "title": {
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
            "attribute": "title",
            "reflect": false
        }
    }; }
}
