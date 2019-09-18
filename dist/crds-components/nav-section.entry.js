import { r as registerInstance, h } from './chunk-67523e50.js';
import { L as Logger, C as Config } from './chunk-3e094fcc.js';
import './chunk-4786bf9d.js';

class NavigationSection {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isActive = false;
        /**
         * Print log messages?
         */
        this.debug = true;
    }
    componentWillLoad() {
        this.console = new Logger(this.debug);
        this.config = new Config();
    }
    render() {
        return (h("li", null, h("a", { onClick: e => this.onActivate(e, this.slug), "data-automation-id": `sh-section-${this.slug}`, class: this.isActive ? 'is-active' : '' }, h("slot", null))));
    }
    static get style() { return "nav-section a {\n  cursor: pointer;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  margin-bottom: 10px;\n  padding: 15px 20px;\n}\n\@media (min-width: 992px) {\n  nav-section a {\n    height: 96px;\n    -ms-flex-pack: center;\n    justify-content: center;\n    margin-bottom: 0;\n    position: relative;\n    width: 86%;\n  }\n}\nnav-section a::after {\n  border-color: transparent transparent transparent #0095d9;\n  border-style: solid;\n  border-width: 63px 0 63px 50px;\n  content: \"\";\n  height: 0;\n  left: 0;\n  position: absolute;\n  top: 0;\n  visibility: hidden;\n  width: 0;\n}\nnav-section a::before {\n  background-color: #0095d9;\n  content: \"\";\n  display: inline-block;\n  height: 100%;\n  left: 0;\n  position: absolute;\n}\n\@media (min-width: 992px) {\n  nav-section a:hover::before {\n    width: 4px;\n  }\n}\n\@media (min-width: 992px) {\n  nav-section a.is-active::after {\n    left: 100%;\n    -webkit-transition: left 0.4s ease;\n    transition: left 0.4s ease;\n    visibility: visible;\n  }\n  nav-section a.is-active::before {\n    -webkit-transition: width 0.4s ease;\n    transition: width 0.4s ease;\n    width: 100%;\n  }\n}\nnav-section a h2 {\n  font-family: \"acumin-pro-extra-condensed\", sans-serif !important;\n  font-weight: 500 !important;\n  display: -ms-flexbox;\n  display: flex;\n  font-size: 48px;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  line-height: 0.6;\n  margin: 0;\n  position: relative;\n  text-transform: uppercase;\n}\n\@media (max-width: 992px) {\n  nav-section a h2::after {\n    background-image: url(\"/assets/images/chevron-right-light.svg\");\n    background-size: 12px 22px;\n    content: \"\";\n    display: -ms-flexbox;\n    display: flex;\n    height: 22px;\n    position: absolute;\n    right: 0;\n    top: 20%;\n    width: 12px;\n  }\n}\nnav-section a p {\n  font-size: 14px;\n  margin: 12px 0 0;\n  opacity: 0.7;\n}"; }
}

export { NavigationSection as nav_section };
