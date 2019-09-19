import { r as registerInstance, h } from './chunk-baaaaca5.js';
import { U as Utils } from './chunk-4786bf9d.js';
import { S as SimpleNavHelper } from './chunk-f7535199.js';

class MainMenu {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.mainNavIsShowing = true;
        this.simpleNav = new SimpleNavHelper();
        this.simpleNav.formatMenuEntry = (element) => { return element; }; //Don't add extra formatting to entries
    }
    navClasses() {
        let classes = [];
        if (this.mainNavIsShowing)
            classes.push('is-showing');
        if (this.activeSection)
            classes.push(`section--${this.activeSection}`);
        return classes.join(' ');
    }
    handleBackClick(event) {
        event.preventDefault();
        this.activeSection = null;
    }
    /**
    * Section handleSectionClick event handler
    * @param event Event
    * @param sectionName string
    */
    handleSectionClick(event, sectionName) {
        event.preventDefault();
        this.activeSection = sectionName;
    }
    /**
    * Renders all sections from payload
    */
    maybeRenderSections(data) {
        if (!Array.isArray(data))
            return;
        return data.map(section => {
            const sectionName = Utils.parameterize(section.title);
            return (h("nav-section", { sectionName: sectionName, handleClick: this.handleSectionClick.bind(this), isActive: this.activeSection === sectionName }, h("h2", null, section.title), h("p", null, section.description)));
        });
    }
    /**
     * Returns all subnav elements
     * @param data
     */
    // TODO: refactor renderSubnavs to work with
    // nav-section-subnav, profile nav, and give nav
    // ------------------------------------------------------
    maybeRenderSubnavs(data) {
        if (!Array.isArray(data))
            return;
        return data.map(section => {
            const subNavName = Utils.parameterize(section.title);
            return (h("nav-section-subnav", { subNavName: subNavName, handleBackClick: this.handleBackClick.bind(this), isActive: this.activeSection === subNavName }, this.simpleNav.formatMenuTitle(section.title), this.simpleNav.maybeRenderNavEntries(section.children)));
        });
    }
    maybeRenderCtas() {
        if (this.activeSection)
            return;
        return (h("nav-ctas", { data: this.promoData }));
    }
    render() {
        if (!this.mainNavIsShowing || !Array.isArray(this.data))
            return null;
        return (h("nav", { class: this.navClasses(), onClick: event => event.stopPropagation() }, h("div", { class: "content" }, h("div", { class: "navigation" }, h("ul", null, this.maybeRenderSections(this.data))), h("div", { class: "subnavigation" }, this.maybeRenderSubnavs(this.data)), this.maybeRenderCtas())));
    }
}

export { MainMenu as main_nav };
