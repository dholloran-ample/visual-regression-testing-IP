export declare class SimpleNavHelper {
    private handleSignOut;
    constructor(signOutCB?: Function);
    renderSections(data: any, menuTitle: any): any;
    renderSubHeader(data: any): any;
    maybeRenderList(data: any, isTopLevel: any): any;
    maybeRenderListEntry(data: any, isTopLevel: any): any;
    private topLevelClassValue;
    isObjectTruthyNonArray(maybeObject: any): boolean;
}
