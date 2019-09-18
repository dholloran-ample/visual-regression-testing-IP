import { r as registerInstance, h } from './chunk-67523e50.js';

class CrdsImage {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
    static get style() { return ".crds-img-container {\n  display: block;\n  background-color: #e7e7e7;\n  position: relative;\n  overflow: hidden;\n}\n.crds-img-container.card {\n  height: 202px;\n}\n.crds-img-container.thumbnail {\n  height: 65px;\n}\n.crds-img-container .crds-img {\n  height: 100%;\n}\n.crds-img-container .crds-img.loaded {\n  -webkit-animation-name: fade-in;\n  animation-name: fade-in;\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n}\n\n\@-webkit-keyframes fade-in {\n  0% {\n    visibility: hidden;\n    -webkit-filter: blur(20px);\n    filter: blur(20px);\n  }\n  50% {\n    -webkit-filter: blur(20px);\n    filter: blur(20px);\n  }\n  100% {\n    -webkit-filter: blur(0.1px);\n    filter: blur(0.1px);\n  }\n}\n\n\@keyframes fade-in {\n  0% {\n    visibility: hidden;\n    -webkit-filter: blur(20px);\n    filter: blur(20px);\n  }\n  50% {\n    -webkit-filter: blur(20px);\n    filter: blur(20px);\n  }\n  100% {\n    -webkit-filter: blur(0.1px);\n    filter: blur(0.1px);\n  }\n}"; }
}

export { CrdsImage as crds_image };
