import { h } from "@stencil/core";
import axios from 'axios';
export class SharedHeader {
    constructor() {
        this.env = 'prod';
        this.data = {};
    }
    componentWillLoad() {
        const url = this.src || `https://crds-data.netlify.com/shared-header/${this.env}.json`;
        return axios
            .get(url)
            .then(response => {
            this.data = response.data;
        })
            .catch(err => console.error(err));
    }
    componentDidLoad() {
        const svgChildNode = this.element.parentElement.getElementsByTagName('svg')[0];
        svgChildNode.remove();
        this.element.parentElement.classList.remove('shared-header-skeleton');
        this.element.parentElement.classList.add('shared-header');
    }
    render() {
        return h("global-nav", { env: this.env, data: this.data });
    }
    static get is() { return "crds-shared-header"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-shared-header.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-shared-header.css"]
    }; }
    static get properties() { return {
        "src": {
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
            "attribute": "src",
            "reflect": false
        },
        "env": {
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
            "attribute": "env",
            "reflect": false,
            "defaultValue": "'prod'"
        }
    }; }
    static get states() { return {
        "active": {},
        "data": {}
    }; }
    static get elementRef() { return "element"; }
}
