import { h } from "@stencil/core";
export class CrdsButton {
    render() {
        return (h("a", { class: "crds-button", href: this.href }, this.label));
    }
    static get is() { return "crds-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-button.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-button.css"]
    }; }
    static get properties() { return {
        "href": {
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
            "attribute": "href",
            "reflect": false
        },
        "label": {
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
            "attribute": "label",
            "reflect": false
        }
    }; }
}
