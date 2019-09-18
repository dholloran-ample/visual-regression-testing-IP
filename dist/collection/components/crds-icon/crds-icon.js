import { h } from '@stencil/core';
// icons
import icons from './icons.svg';
import colors from './crds-icon-colors.js';
export class CrdsIcon {
    render() {
        const domparser = new DOMParser();
        const doc = domparser.parseFromString(icons, 'text/html');
        const svg = doc.getElementById(this.name);
        svg.setAttribute('preserveAspectRatio', `none`);
        svg.setAttribute('height', `${this.size}px`);
        svg.setAttribute('width', `${this.size}px`);
        svg.getElementsByTagName('path')[0].setAttribute('fill', colors[this.color]);
        return h("div", { class: "svg-container", innerHTML: svg.outerHTML });
    }
    static get is() { return "crds-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-icon.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-icon.css"]
    }; }
    static get properties() { return {
        "name": {
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
            "attribute": "name",
            "reflect": false
        },
        "color": {
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
            "attribute": "color",
            "reflect": false
        },
        "size": {
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
            "attribute": "size",
            "reflect": false
        }
    }; }
}
