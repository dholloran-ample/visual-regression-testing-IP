export class CrdsModal {
    constructor() {
        this.isActive = false;
        this.handleInnerClick = event => {
            event.stopPropagation();
        };
        this.closeModal = () => {
            this.isActive = false;
            if (typeof this.onClose == 'function')
                this.onClose();
        };
    }
    render() {
        return (h("div", { class: `modal ${this.isActive ? 'is-active' : ''}`, id: "subscribeModalForm", tabindex: "-1", onClick: this.closeModal },
            h("div", { class: "modal-content", onClick: this.handleInnerClick },
                h("div", { class: "modal-header" },
                    h("button", { type: "button", class: "modal-close", onClick: this.closeModal })),
                h("div", { class: "modal-body" },
                    this.title && h("h3", { class: "modal-title" }, this.title),
                    h("slot", null)))));
    }
    static get is() { return "crds-modal"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "isActive": {
            "type": Boolean,
            "attr": "is-active",
            "mutable": true
        },
        "onClose": {
            "type": "Any",
            "attr": "on-close"
        },
        "title": {
            "type": String,
            "attr": "title"
        }
    }; }
    static get style() { return "/**style-placeholder:crds-modal:**/"; }
}
