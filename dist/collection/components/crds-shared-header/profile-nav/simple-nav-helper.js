import { h } from "@stencil/core";
export class SimpleNavHelper {
    constructor(signOutCB) {
        this.handleSignOut = signOutCB;
    }
    renderNav(data, menuTitle) {
        return (h("div", null,
            this.formatMenuTitle(menuTitle),
            this.maybeRenderNavEntries(data.children)));
    }
    ;
    formatMenuTitle(title) {
        return h("h2", null, title);
    }
    formatMenuEntry(element) {
        return (h("div", { style: { padding: '0' } }, element));
    }
    formatSubHeader(header) {
        return h("h4", null, header);
    }
    formatList(listElements) {
        return (h("ul", null, listElements));
    }
    handleOnClick(event, automationId) {
        const isSignOutLink = automationId === 'sh-sign-out';
        if (isSignOutLink) {
            this.handleSignOut(event);
            event.preventDefault();
        }
        //navigates by default
        event.stopPropagation();
    }
    formatListEntry(data, classValue) {
        return (h("li", { class: classValue },
            h("a", { href: data.href || "#", "data-automation-id": data['automation-id'], onClick: (event) => this.handleOnClick(event, data['automation-id']), innerHTML: data.title })));
    }
    maybeRenderNavEntries(data) {
        if (!Array.isArray(data))
            return;
        let isTopLevelClass = true;
        const menuElements = data.map(child => {
            let isSubHeader = typeof child === 'string';
            let element = isSubHeader ? this.formatSubHeader(child) : this.maybeRenderList(child, isTopLevelClass);
            isTopLevelClass = !isSubHeader; //Toggle if next rendered element should be top-level
            return this.formatMenuEntry(element);
        });
        return menuElements.length > 0 && menuElements;
    }
    maybeRenderList(data, isTopLevel) {
        if (!Array.isArray(data))
            return;
        const listElements = data.map(child => this.maybeRenderListEntry(child, isTopLevel)).filter(entry => entry);
        return listElements.length > 0 && this.formatList(listElements);
    }
    maybeRenderListEntry(data, isTopLevel) {
        return this.isObjectTruthyNonArray(data) &&
            this.formatListEntry(data, this.topLevelClassValue(data, isTopLevel));
    }
    topLevelClassValue(data, isTopLevel) {
        const topLevel = typeof data.top_level === 'boolean' ?
            data.top_level : isTopLevel;
        return topLevel ? 'top-level' : '';
    }
    //TODO this may be valuable as a Util function
    isObjectTruthyNonArray(maybeObject) {
        return maybeObject && typeof maybeObject === 'object' && !Array.isArray(maybeObject);
    }
}
