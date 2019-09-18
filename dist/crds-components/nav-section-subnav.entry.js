import { r as registerInstance, h } from './chunk-67523e50.js';

class NavSectionSubnav {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isActive = false;
    }
    onClick(event) {
        if (typeof this.handleBackClick === 'function') {
            this.handleBackClick(event);
        }
        else {
            console.error('Function to handle nav-section-subnav click not provided');
        }
    }
    render() {
        let chevronLeftLight = '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg>';
        return (h("div", { class: this.isActive ? '' : 'hidden', "data-automation-id": `sh-section-subnav-${this.subNavName}` }, h("a", { class: "back", href: "", onClick: event => this.handleBackClick(event) }, h("span", { innerHTML: chevronLeftLight }), "Back"), h("slot", null)));
    }
    static get style() { return ".hidden {\n  display: none;\n}\n\nnav-section-subnav {\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif !important;\n  font-weight: 300 !important;\n  color: white;\n}\nnav-section-subnav div {\n  padding: 30px 20px 0;\n}\nnav-section-subnav a {\n  color: white;\n  display: inline-block;\n  font-size: 19px;\n  margin-bottom: 10px;\n  padding-left: 10px;\n  text-decoration: none;\n  text-transform: capitalize;\n}\nnav-section-subnav a.all {\n  margin-bottom: 30px;\n}\nnav-section-subnav a:hover {\n  color: #cccccc;\n}\nnav-section-subnav h2 {\n  font-family: \"acumin-pro-extra-condensed\", sans-serif !important;\n  font-weight: 500 !important;\n  font-size: 48px;\n  line-height: 48px;\n  margin: 0;\n  text-transform: uppercase;\n  margin-bottom: 10px;\n}\nnav-section-subnav h4 {\n  font-size: 11px;\n  margin: 0 0 10px;\n  opacity: 0.5;\n  text-transform: uppercase;\n}\nnav-section-subnav ul {\n  padding-left: 0;\n  margin-top: 0;\n}\nnav-section-subnav ul li {\n  list-style: none;\n}\nnav-section-subnav ul li.top-level a {\n  padding-left: 0;\n}\n\@media (min-width: 992px) {\n  nav-section-subnav h2 {\n    display: none;\n  }\n}\nnav-section-subnav .back {\n  font-size: 14px;\n  padding-left: 0;\n  position: relative;\n}\n\@media (min-width: 992px) {\n  nav-section-subnav .back {\n    display: none;\n  }\n}\nnav-section-subnav .back span {\n  display: inline-block;\n  height: 13px;\n  margin-right: 8px;\n  padding: 12px 0;\n  position: relative;\n  top: 1px;\n  width: 7px;\n}\nnav-section-subnav .back svg {\n  fill: white;\n  height: 13px;\n  width: 7px;\n}"; }
}

export { NavSectionSubnav as nav_section_subnav };
