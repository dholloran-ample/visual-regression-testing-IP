import { h } from '@stencil/core';
import Fragment from 'stencil-fragment';
import iframeResizer from 'iframe-resizer';
export class CrdsSubscribe {
    constructor() {
        this.modalIsShowing = false;
        this.handleSubscribeClick = () => {
            this.modalIsShowing = true;
        };
        this.handleModalClose = () => {
            this.modalIsShowing = false;
        };
    }
    componentDidUpdate() {
        iframeResizer.iframeResizer({}, this.frame);
    }
    render() {
        return (h(Fragment, null,
            h("div", { class: "subscribe-script" }),
            h("button", { onClick: this.handleSubscribeClick, class: "subscribe-button" }, this.label),
            h("crds-modal", { label: this.label, isActive: this.modalIsShowing, onModalClose: this.handleModalClose },
                h("iframe", { ref: el => (this.frame = el), src: this.src, class: "subscribe-frame", frameborder: "0" }))));
    }
    static get is() { return "crds-subscribe"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-subscribe.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-subscribe.css"]
    }; }
    static get properties() { return {
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
        },
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
        }
    }; }
    static get states() { return {
        "modalIsShowing": {}
    }; }
}
