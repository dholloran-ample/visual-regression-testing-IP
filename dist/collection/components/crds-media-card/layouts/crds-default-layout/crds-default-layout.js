// Stencil
import { h } from '@stencil/core';
export class CrdsDefaultLayout {
    constructor() {
        this.icons = {
            article: 'media-article',
            video: 'media-video',
            'podcast-episode': '',
            message: '',
            song: 'media-music'
        };
    }
    render() {
        const { imageSrc, heading, meta, metaPosition, body, buttonSrc, thumbnailSrc, url, contentType, icons } = this;
        return (h("div", { class: "card-wrapper" },
            h("div", { class: "card-image-wrapper" },
                imageSrc && h("crds-image", { src: imageSrc, size: "card" }),
                icons[contentType] && (h("div", { class: "card-stamp-container" },
                    h("crds-icon", { name: icons[contentType], size: '15', color: 'white' }),
                    h("span", { class: "card-stamp" }, contentType))),
                thumbnailSrc && (h("div", { class: "card-thumbnail" },
                    h("crds-image", { src: thumbnailSrc, size: "thumbnail" })))),
            metaPosition == 'top' && h("span", { class: "card-meta-top" }, meta),
            heading && h("h2", { class: `card-heading` },
                " ",
                heading,
                " "),
            metaPosition == 'bottom' && h("span", { class: "card-meta-bottom" }, meta),
            body && h("div", { class: "card-content", innerHTML: body }),
            buttonSrc && (h("a", { class: "card-button", href: buttonSrc, role: "button" }, "Learn more"))));
    }
    static get is() { return "crds-default-layout"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-default-layout.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-default-layout.css"]
    }; }
    static get properties() { return {
        "contentType": {
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
            "attribute": "content-type",
            "reflect": false
        },
        "imageSrc": {
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
            "attribute": "image-src",
            "reflect": false
        },
        "heading": {
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
            "attribute": "heading",
            "reflect": false
        },
        "meta": {
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
            "attribute": "meta",
            "reflect": false
        },
        "metaPosition": {
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
            "attribute": "meta-position",
            "reflect": false
        },
        "body": {
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
            "attribute": "body",
            "reflect": false
        },
        "buttonSrc": {
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
            "attribute": "button-src",
            "reflect": false
        },
        "thumbnailSrc": {
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
            "attribute": "thumbnail-src",
            "reflect": false
        },
        "url": {
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
            "attribute": "url",
            "reflect": false
        },
        "nearestMinute": {
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
            "attribute": "nearest-minute",
            "reflect": false
        },
        "author": {
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
            "attribute": "author",
            "reflect": false
        },
        "mediaTopic": {
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
            "attribute": "media-topic",
            "reflect": false
        },
        "contentCount": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "content-count",
            "reflect": false
        }
    }; }
}
