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
            h("button", { onClick: this.handleSubscribeClick, class: "subscribe-button" }, this.title),
            h("crds-modal", { title: this.title, isActive: this.modalIsShowing, onClose: this.handleModalClose },
                h("iframe", { ref: el => (this.frame = el), src: this.src, class: "subscribe-frame" }))));
    }
    static get is() { return "crds-subscribe"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "modalIsShowing": {
            "state": true
        },
        "src": {
            "type": String,
            "attr": "src"
        },
        "title": {
            "type": String,
            "attr": "title"
        }
    }; }
    static get style() { return "/**style-placeholder:crds-subscribe:**/"; }
}
