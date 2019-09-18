export declare class SimpleNavHelper {
    private handleSignOut;
    constructor(signOutCB?: Function);
    renderNav(data: any, menuTitle: any): any;
    formatMenuTitle(title: any): any;
    formatMenuEntry(element: any): any;
    formatSubHeader(header: any): any;
    formatList(listElements: any): any;
    formatListEntry(data: any, classValue: any): any;
    maybeRenderNavEntries(data: any): any[];
    maybeRenderList(data: any, isTopLevel: any): any;
    maybeRenderListEntry(data: any, isTopLevel: any): any;
    private topLevelClassValue;
    isObjectTruthyNonArray(maybeObject: any): boolean;
}
