import { h } from '@stencil/core';
export class CrdsImage {
    constructor() {
        this.imgDidLoad = false;
        this.sizes = ['card', 'thumbnail', 'overlay', 'media-object'];
    }
    validateSize() {
        if (this.sizes.indexOf(this.size) == -1) {
            throw new Error(`${this.size} is an invalid value for crds-image size`);
        }
    }
    connectedCallback() {
        this.validateSize();
    }
    addObserver() {
        // Cache Image
        const img = new Image();
        img.classList.add('crds-img');
        img.onload = () => {
            this.imgDidLoad = true;
            this.cachedImg = img;
            img.classList.add('loaded');
        };
        // Create observer
        const options = {
            threshold: 0
        };
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0) {
                    img.src = this.src;
                }
            });
        }, options);
        observer.observe(this.imgWrapper);
    }
    componentDidLoad() {
        this.addObserver();
    }
    render() {
        const { imgDidLoad, cachedImg, size } = this;
        return (h("div", { class: `crds-img-container ${size}`, "data-instrinsic": "4:3", innerHTML: imgDidLoad ? cachedImg.outerHTML : '', ref: el => (this.imgWrapper = el) }));
    }
    static get is() { return "crds-image"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-image.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-image.css"]
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
    static get states() { return {
        "imgDidLoad": {},
        "cachedImg": {}
    }; }
}
