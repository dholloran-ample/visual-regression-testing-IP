// Stencil
import { h } from "@stencil/core";
export class CrdsMediaCard {
    constructor() {
        this.contentLayout = 'default';
        // state
        this.isVisible = false;
        this.childProps = {};
        this.propNames = [
            'imageSrc',
            'heading',
            'meta',
            'metaPosition',
            'body',
            'url',
            'buttonSrc',
            'nearestMinute',
            'author',
            'mediaTopic',
            'thumbnailSrc',
            'contentCount',
            'contentType'
        ];
        this.contentLayouts = ['default', 'overlay', 'media-object'];
        this.contentTypes = ['article', 'video', 'podcast-episode', 'message', 'song', 'series', 'album', 'podcast'];
        this.metaPositions = ['top', 'bottom'];
        this.getLayout = () => {
            return {
                default: h("crds-default-layout", Object.assign({}, this.childProps)),
                overlay: h("crds-overlay-layout", Object.assign({}, this.childProps)),
                'media-object': h("crds-media-object-layout", Object.assign({}, this.childProps))
            }[this.contentLayout];
        };
    }
    // ----------------------------------------------- | Validations
    validateContentType() {
        if (typeof this.contentType != 'undefined' && this.contentTypes.indexOf(this.contentType) == -1) {
            throw new Error(`${this.contentType} is not a valid value for contentType`);
        }
    }
    validateContentLayout() {
        if (typeof this.contentLayout != 'undefined' && this.contentLayouts.indexOf(this.contentLayout) == -1) {
            throw new Error(`${this.contentLayout} is not a valid value for contentLayout`);
        }
    }
    validateImage() {
        const isEmpty = typeof this.imageSrc == 'undefined';
        if (isEmpty) {
            throw new Error('imageSrc property is required on all media cards');
        }
    }
    validateMeta() {
        if (typeof this.meta != 'undefined' && typeof this.metaPosition == 'undefined') {
            throw new Error(`metaPosition is required if you want to provide a meta`);
        }
    }
    validateMetaPosition() {
        if (typeof this.metaPosition != 'undefined' && this.metaPositions.indexOf(this.metaPosition) == -1) {
            throw new Error(`${this.metaPosition} is not a valid value for metaPosition`);
        }
        else if (typeof this.meta == 'undefined' && typeof this.metaPosition != 'undefined') {
            throw new Error(`Meta is required if you want to provide a meta posittion`);
        }
    }
    // ----------------------------------------------- | Methods
    componentWillLoad() {
        // Set props for child component
        this.propNames
            .filter(prop => this[prop] != undefined)
            .forEach(prop => {
            this.childProps[prop] = this[prop];
        });
    }
    runValidations() {
        this.validateImage();
        this.validateContentLayout();
        this.validateContentType();
        this.validateMeta();
        this.validateMetaPosition();
    }
    connectedCallback() {
        this.runValidations();
    }
    render() {
        return this.getLayout();
    }
    static get is() { return "crds-media-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-media-card.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-media-card.css"]
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
        "contentLayout": {
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
            "attribute": "content-layout",
            "reflect": false,
            "defaultValue": "'default'"
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
    static get states() { return {
        "isVisible": {},
        "childProps": {}
    }; }
}
