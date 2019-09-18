import { r as registerInstance, h } from './chunk-67523e50.js';

class CrdsDefaultLayout {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h("div", { class: "card-wrapper" }, h("div", { class: "card-image-wrapper" }, imageSrc && h("crds-image", { src: imageSrc, size: "card" }), icons[contentType] && (h("div", { class: "card-stamp-container" }, h("crds-icon", { name: icons[contentType], size: '15', color: 'white' }), h("span", { class: "card-stamp" }, contentType))), thumbnailSrc && (h("div", { class: "card-thumbnail" }, h("crds-image", { src: thumbnailSrc, size: "thumbnail" })))), metaPosition == 'top' && h("span", { class: "card-meta-top" }, meta), heading && h("h2", { class: `card-heading` }, " ", heading, " "), metaPosition == 'bottom' && h("span", { class: "card-meta-bottom" }, meta), body && h("div", { class: "card-content", innerHTML: body }), buttonSrc && (h("a", { class: "card-button", href: buttonSrc, role: "button" }, "Learn more"))));
    }
    static get style() { return ".card-wrapper {\n  margin-bottom: 2.75rem;\n  max-width: 360px;\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif;\n}\n\n.card-image-wrapper {\n  margin-bottom: 0.5rem;\n  overflow: hidden;\n  position: relative;\n}\n\n.card-stamp-container {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  background-color: rgba(23, 23, 23, 0.9);\n  top: 1em;\n  padding: 0.5rem;\n  position: absolute;\n  left: 1em;\n  display: -ms-flexbox;\n  display: flex;\n  max-height: 28px;\n}\n.card-stamp-container .card-stamp {\n  margin-left: 0.25rem;\n}\n\n.card-stamp {\n  display: inline-block;\n  color: #ffffff;\n  font-size: 0.625rem;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n\n.card-meta-top {\n  color: #737373;\n  display: block;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  line-height: 1.67;\n  text-transform: uppercase;\n}\n\n.card-heading {\n  color: #4d4d4d;\n  font-family: \"acumin-pro-extra-condensed\", sans-serif;\n  font-size: 38px;\n  font-weight: 500;\n  line-height: 0.89;\n  margin: 0 0 0.5rem;\n  text-transform: uppercase;\n  -webkit-transition: color 300ms;\n  transition: color 300ms;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.card-heading:hover {\n  color: black;\n}\n\n.card-meta-bottom {\n  color: #979797;\n  display: block;\n  font-size: 0.8125rem;\n  font-weight: 300;\n  line-height: 1;\n  margin: 0;\n  margin-bottom: 0.5rem;\n}\n\n.card-content {\n  overflow-y: hidden;\n}\n.card-content p {\n  display: block;\n  font-size: 1rem;\n  font-weight: 300;\n  line-height: 24px;\n  color: #4d4d4d;\n  margin: 0;\n}\n.card-content p a {\n  text-decoration: none;\n  color: #0095d9;\n}\n\n.hover:hover {\n  cursor: pointer;\n}\n\n.inactive {\n  display: none;\n}\n\n.card-button {\n  display: inline-block;\n  background-color: #3b6e8f;\n  color: #ffffff;\n  border-radius: 4px;\n  margin-top: 1.375em;\n  text-decoration: none;\n  cursor: pointer;\n  height: 43px;\n  vertical-align: middle;\n  line-height: 43px;\n  padding: 0 1rem;\n  font-size: 0.875rem;\n}\n\n.card-thumbnail {\n  background-color: rgba(23, 23, 23, 0.9);\n  top: 1em;\n  position: absolute;\n  right: 1em;\n  max-width: 65px;\n  max-height: 65px;\n}"; }
}

export { CrdsDefaultLayout as crds_default_layout };
