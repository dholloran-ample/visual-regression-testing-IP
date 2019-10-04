import { h } from "@stencil/core";
import { Utils } from '../../../shared/utils';
export class MainMenu {
    constructor() {
        this.isNavShowing = true;
        this.data = [];
    }
    handleBackClick(event) {
        event.preventDefault();
        this.activeSection = null;
    }
    handleSectionClick(event, sectionName) {
        event.preventDefault();
        this.activeSection = sectionName;
    }
    maybeRenderSections() {
        const sectionList = this.data.map(section => {
            const sectionName = Utils.parameterize(section.title);
            return (h("nav-section", { sectionName: sectionName, handleClick: this.handleSectionClick.bind(this), isActive: this.activeSection === sectionName },
                h("h2", null, section.title),
                h("p", null, section.description)));
        });
        return sectionList.length > 0 && (h("ul", null, sectionList));
    }
    renderSubNavOrCtas() {
        return this.activeSection ?
            (h("div", { class: "subnavigation" }, this.maybeRenderActiveSubNav())) : (h("nav-ctas", { data: this.promoData }));
    }
    maybeRenderActiveSubNav() {
        const activeSectionData = this.data.find((section) => {
            section.subNavName = Utils.parameterize(section.title);
            return section.subNavName === this.activeSection;
        });
        return activeSectionData &&
            (h("nav-section-subnav", { subNavName: activeSectionData.subNavName, data: activeSectionData, handleBackClick: this.handleBackClick.bind(this), isActive: true }));
    }
    getNavClass() {
        let classes = [];
        if (this.isNavShowing)
            classes.push('is-showing');
        if (this.activeSection)
            classes.push(`section--${this.activeSection}`);
        return classes.join(' ');
    }
    render() {
        if (!this.isNavShowing || !Array.isArray(this.data))
            return null;
        return (h("nav", { class: this.getNavClass(), onClick: event => event.stopPropagation() },
            h("div", { class: "content" },
                h("div", { class: "navigation" }, this.maybeRenderSections()),
                this.renderSubNavOrCtas())));
    }
    static get is() { return "main-nav"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["main-nav.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["main-nav.css"]
    }; }
    static get properties() { return {
        "isNavShowing": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "is-nav-showing",
            "reflect": false,
            "defaultValue": "true"
        },
        "data": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "data",
            "reflect": false,
            "defaultValue": "[]"
        },
        "promoData": {
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
            "attribute": "promo-data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "activeSection": {}
    }; }
}
