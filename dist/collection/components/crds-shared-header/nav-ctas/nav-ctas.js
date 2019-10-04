import { h } from "@stencil/core";
import decode from 'unescape';
export class NavCtas {
    decodedData() {
        return decode(this.data || '');
    }
    render() {
        return h("div", { class: "ctas", innerHTML: this.decodedData() });
    }
    static get is() { return "nav-ctas"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["nav-ctas.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["nav-ctas.css"]
    }; }
    static get properties() { return {
        "data": {
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
            "attribute": "data",
            "reflect": false
        }
    }; }
}
