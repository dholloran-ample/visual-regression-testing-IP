import { r as registerInstance, h } from './chunk-791a1318.js';

class CrdsModal {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h("div", { class: `modal ${this.isActive ? 'is-active' : ''}`, id: "subscribeModalForm", tabindex: "-1", onClick: this.closeModal }, h("div", { class: "modal-content", onClick: this.handleInnerClick }, h("div", { class: "modal-header" }, h("button", { type: "button", class: "modal-close", onClick: this.closeModal })), h("div", { class: "modal-body" }, this.title && h("h3", { class: "modal-title" }, this.title), h("slot", null)))));
    }
    static get style() { return ".modal {\n  background-color: rgba(0, 0, 0, 0.8);\n  bottom: 0;\n  left: 0;\n  opacity: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  -webkit-transition: opacity 300ms ease, visibility 300ms ease;\n  transition: opacity 300ms ease, visibility 300ms ease;\n  visibility: hidden;\n  will-change: opacity, visibility;\n}\n.modal.is-active {\n  opacity: 1;\n  visibility: visible;\n  z-index: 11;\n}\n.modal.is-active .modal-content {\n  -webkit-transform: translateY(0);\n  transform: translateY(0);\n}\n\n.modal-content {\n  background: white;\n  font-size: 16px;\n  margin: 45px auto;\n  max-width: 600px;\n  position: relative;\n  -webkit-transform: translateY(-50px);\n  transform: translateY(-50px);\n  -webkit-transition: -webkit-transform 0.35s ease;\n  transition: -webkit-transform 0.35s ease;\n  transition: transform 0.35s ease;\n  transition: transform 0.35s ease, -webkit-transform 0.35s ease;\n  will-change: transform;\n}\n\n.modal-body {\n  padding: 40px;\n}\n\n.modal-title {\n  font-family: \"acumin-pro-extra-condensed\", sans-serif !important;\n  font-weight: 500 !important;\n  font-size: 36px !important;\n  margin: 0;\n  text-transform: uppercase;\n}\n\@media screen and (min-width: 480px) {\n  .modal-title {\n    font-size: 52.2px !important;\n  }\n}\n\ninput {\n  background-image: none;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\ninput[type=text] {\n  background-color: #f4f4f4;\n  border: 1px solid #f4f4f4;\n  border-radius: 0;\n  color: #4d4d4d;\n  display: block;\n  font-size: 16px;\n  line-height: 1.5;\n  padding: 8px 10px;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  width: 100%;\n}\ninput:focus {\n  border-color: #8bceed;\n  -webkit-box-shadow: inset 0 0 0 1px rgba(139, 206, 237, 0.5);\n  box-shadow: inset 0 0 0 1px rgba(139, 206, 237, 0.5);\n}\ninput[type=submit] {\n  -webkit-appearance: button;\n  -moz-appearance: button;\n  appearance: button;\n  background-color: #0095d9;\n  border: 1px solid #0095d9;\n  border-radius: 4px;\n  color: #fff;\n  cursor: pointer;\n  display: inline-block;\n  font-size: 16px;\n  line-height: 1;\n  margin-bottom: 5px;\n  margin-top: 24px;\n  padding: 14px 20px 16px;\n}\n\nlabel {\n  display: inline-block;\n  font-weight: 700;\n  margin-bottom: 5px;\n  max-width: 100%;\n}\n\n.modal-close {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  background-color: rgba(187, 187, 187, 0.6);\n  -o-border-image: none;\n  border-image: none;\n  border-radius: 50%;\n  border-style: none;\n  color: #fff;\n  cursor: pointer;\n  height: 25px;\n  position: absolute;\n  right: 15px;\n  top: 15px;\n  width: 25px;\n}\n.modal-close:after {\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif !important;\n  font-weight: 300 !important;\n  bottom: 3px;\n  content: \"x\";\n  display: inline-block;\n  font-size: 16px;\n  position: relative;\n}\n.modal-close:focus {\n  outline: none;\n}"; }
}

export { CrdsModal as crds_modal };
