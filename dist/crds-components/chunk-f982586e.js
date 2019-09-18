import { h } from './chunk-67523e50.js';

class SimpleNavHelper {
    constructor(signOutCB) {
        this.handleSignOut = signOutCB;
    }
    renderSections(data, menuTitle) {
        let isTopLevelClass = true;
        return (h("div", null,
            h("h2", null,
                " ",
                menuTitle,
                " "),
            Array.isArray(data.children) && data.children.map(child => {
                let isSubHeader = typeof child === 'string';
                let element = isSubHeader ? this.renderSubHeader(child) : this.maybeRenderList(child, isTopLevelClass);
                isTopLevelClass = !isSubHeader; //Toggle if next rendered element should be top-level
                return element && (h("div", { style: { padding: '0' } }, element));
            })));
    }
    ;
    renderSubHeader(data) {
        return h("h4", null, data);
    }
    maybeRenderList(data, isTopLevel) {
        if (!Array.isArray(data))
            return;
        const listElements = data.map(child => this.maybeRenderListEntry(child, isTopLevel)).filter(Boolean);
        return listElements.length > 0 && (h("ul", null, listElements));
    }
    maybeRenderListEntry(data, isTopLevel) {
        return this.isObjectTruthyNonArray(data) && (h("li", { class: this.topLevelClassValue(data, isTopLevel) },
            h("nav-link", { href: data.href, automationId: data['automation-id'], handleSignOut: this.handleSignOut }, data.title)));
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

export { SimpleNavHelper as S };
