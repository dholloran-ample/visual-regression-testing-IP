'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-c7c01652.js');

const CrdsImage = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
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
        return (core.h("div", { class: `crds-img-container ${size}`, "data-instrinsic": "4:3", innerHTML: imgDidLoad ? cachedImg.outerHTML : '', ref: el => (this.imgWrapper = el) }));
    }
    static get style() { return ".crds-img-container{display:block;background-color:#e7e7e7;position:relative;overflow:hidden}.crds-img-container.card{height:202px}.crds-img-container.thumbnail{height:65px}.crds-img-container .crds-img{height:100%}.crds-img-container .crds-img.loaded{-webkit-animation-name:fade-in;animation-name:fade-in;-webkit-animation-duration:1s;animation-duration:1s}\@-webkit-keyframes fade-in{0%{visibility:hidden;-webkit-filter:blur(20px);filter:blur(20px)}50%{-webkit-filter:blur(20px);filter:blur(20px)}to{-webkit-filter:blur(.1px);filter:blur(.1px)}}\@keyframes fade-in{0%{visibility:hidden;-webkit-filter:blur(20px);filter:blur(20px)}50%{-webkit-filter:blur(20px);filter:blur(20px)}to{-webkit-filter:blur(.1px);filter:blur(.1px)}}"; }
};

exports.crds_image = CrdsImage;
