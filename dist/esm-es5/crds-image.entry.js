import { r as registerInstance, h } from './core-9036992e.js';
var CrdsImage = /** @class */ (function () {
    function CrdsImage(hostRef) {
        registerInstance(this, hostRef);
        this.imgDidLoad = false;
        this.sizes = ['card', 'thumbnail', 'overlay', 'media-object'];
    }
    CrdsImage.prototype.validateSize = function () {
        if (this.sizes.indexOf(this.size) == -1) {
            throw new Error(this.size + " is an invalid value for crds-image size");
        }
    };
    CrdsImage.prototype.connectedCallback = function () {
        this.validateSize();
    };
    CrdsImage.prototype.addObserver = function () {
        var _this = this;
        // Cache Image
        var img = new Image();
        img.classList.add('crds-img');
        img.onload = function () {
            _this.imgDidLoad = true;
            _this.cachedImg = img;
            img.classList.add('loaded');
        };
        // Create observer
        var options = {
            threshold: 0
        };
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && entry.intersectionRatio >= 0) {
                    img.src = _this.src;
                }
            });
        }, options);
        observer.observe(this.imgWrapper);
    };
    CrdsImage.prototype.componentDidLoad = function () {
        this.addObserver();
    };
    CrdsImage.prototype.render = function () {
        var _this = this;
        var _a = this, imgDidLoad = _a.imgDidLoad, cachedImg = _a.cachedImg, size = _a.size;
        return (h("div", { class: "crds-img-container " + size, "data-instrinsic": "4:3", innerHTML: imgDidLoad ? cachedImg.outerHTML : '', ref: function (el) { return (_this.imgWrapper = el); } }));
    };
    Object.defineProperty(CrdsImage, "style", {
        get: function () { return ".crds-img-container{display:block;background-color:#e7e7e7;position:relative;overflow:hidden}.crds-img-container.card{height:202px}.crds-img-container.thumbnail{height:65px}.crds-img-container .crds-img{height:100%}.crds-img-container .crds-img.loaded{-webkit-animation-name:fade-in;animation-name:fade-in;-webkit-animation-duration:1s;animation-duration:1s}\@-webkit-keyframes fade-in{0%{visibility:hidden;-webkit-filter:blur(20px);filter:blur(20px)}50%{-webkit-filter:blur(20px);filter:blur(20px)}to{-webkit-filter:blur(.1px);filter:blur(.1px)}}\@keyframes fade-in{0%{visibility:hidden;-webkit-filter:blur(20px);filter:blur(20px)}50%{-webkit-filter:blur(20px);filter:blur(20px)}to{-webkit-filter:blur(.1px);filter:blur(.1px)}}"; },
        enumerable: true,
        configurable: true
    });
    return CrdsImage;
}());
export { CrdsImage as crds_image };
