// Stencil
import { h } from "@stencil/core";
export class CrdsDefaultLayout {
    constructor() {
        this.icons = {
            article: 'media-article',
            video: 'media-video',
            message: 'media-video',
            series: 'media-video',
            episode: 'media-podcast',
            song: 'media-music'
        };
    }
    render() {
        const { imageSrc, heading, meta, metaPosition, thumbnailSrc, url, contentType, icons } = this;
        return (h("div", { class: "card-wrapper" },
            h("a", { class: "card-image-wrapper", href: url },
                imageSrc && h("crds-image", { src: imageSrc, size: "card" }),
                icons[contentType] && (h("div", { class: "card-stamp-container" },
                    h("crds-icon", { name: icons[contentType], size: '15', color: 'white' }),
                    h("span", { class: "card-stamp" }, contentType))),
                thumbnailSrc && (h("div", { class: "card-thumbnail" },
                    h("crds-image", { src: thumbnailSrc, size: "thumbnail" })))),
            metaPosition == 'top' && h("span", { class: "card-meta-top" }, meta),
            heading && (h("a", { class: `card-heading`, href: url }, heading)),
            metaPosition == 'bottom' && h("span", { class: "card-meta-bottom" }, meta),
            h("div", { class: "card-content" },
                h("slot", null))));
    }
    static get is() { return "crds-default-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-default-card.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-default-card.css"]
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
        }
    }; }
    static get elementRef() { return "element"; }
}
